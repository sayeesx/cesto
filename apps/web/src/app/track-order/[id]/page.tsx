'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { BsArrowLeft, BsCheckCircleFill, BsBoxSeam, BsTruck, BsHouseCheck, BsHeartFill } from 'react-icons/bs';
import { apiClient } from '@/lib/api-client';
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';
import Link from 'next/link';
import { getThumbImage } from '@/lib/cloudinary';

const ORDER_STATUS_STEPS = [
  { status: 'PLACED', label: 'Placed', icon: <BsCheckCircleFill /> },
  { status: 'PAYMENT_CONFIRMED', label: 'Payment Confirmed', icon: <BsCheckCircleFill /> },
  { status: 'PREPARING', label: 'Preparing', icon: <BsBoxSeam /> },
  { status: 'READY_FOR_PICKUP', label: 'Ready for Pickup', icon: <BsBoxSeam /> },
  { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: <BsTruck /> },
  { status: 'DELIVERED', label: 'Delivered', icon: <BsHouseCheck /> },
];

export default function OrderTrackingPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success') === 'true';
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadOrder() {
      try {
        const data = await apiClient.getOrder(id as string);
        setOrder(data);
      } catch (err) {
        console.error('Failed to load order', err);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ProductCardSkeleton />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
        <p className="text-gray-500 mb-8 text-center text-sm">We couldn't find an order with this reference number.</p>
        <Link href="/" className="bg-[#b22153] text-white px-8 py-3 rounded-xl font-bold">Go Home</Link>
      </div>
    );
  }

  const currentStatusIndex = ORDER_STATUS_STEPS.findIndex(s => s.status === order.status);

  return (
    <div className="min-h-screen bg-[#FDFCFD] pb-10">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-50">
        <button onClick={() => router.back()} className="p-1"><BsArrowLeft size={20} /></button>
        <h1 className="text-lg font-bold text-gray-900">Track Order</h1>
      </div>

      <div className="max-w-xl mx-auto px-4 py-8">
        
        {isSuccess && (
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 height-20 bg-green-100 text-green-600 rounded-full mb-4 animate-bounce">
              <BsCheckCircleFill size={40} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-500 text-sm">Thank you for choosing Cesto. Your gift is in safe hands.</p>
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/[0.02] border border-gray-100 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
              <h3 className="text-lg font-black text-[#b22153]">{order.orderNumber}</h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
              <span className="px-3 py-1 bg-[#1a3a3a] text-white text-[10px] font-bold rounded-full">{order.status}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative space-y-8 mt-10">
            {ORDER_STATUS_STEPS.map((step, idx) => {
              const isPast = idx < currentStatusIndex;
              const isCurrent = idx === currentStatusIndex;
              const isFuture = idx > currentStatusIndex;

              return (
                <div key={step.status} className="flex gap-4 relative">
                  {idx !== ORDER_STATUS_STEPS.length - 1 && (
                    <div className={`absolute left-5 top-8 w-0.5 h-10 ${isPast ? 'bg-[#b22153]' : 'bg-gray-100'}`} />
                  )}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors ${
                    isPast || isCurrent ? 'bg-[#b22153] text-white shadow-lg shadow-[#b22153]/20' : 'bg-gray-50 text-gray-300'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className={`text-sm font-bold ${isFuture ? 'text-gray-300' : 'text-gray-900'}`}>{step.label}</span>
                    {isCurrent && <span className="text-[10px] text-[#b22153] font-bold uppercase tracking-wider animate-pulse">In Progress</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Items Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/[0.02] border border-gray-100">
           <h4 className="font-bold text-gray-900 mb-4">Summary</h4>
           <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
                    <img
                      src={getThumbImage(item.product?.imageUrl) ?? '/placeholder.png'}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{item.product?.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-[#b22153] mt-1">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
           </div>
           
           <div className="border-t border-gray-50 mt-6 pt-4 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-500">Total Paid</span>
              <span className="text-xl font-black text-gray-900">₹{order.totalAmount}</span>
           </div>
        </div>

        <Link href="/" className="flex items-center justify-center gap-2 mt-10 text-gray-400 font-bold text-sm hover:text-[#b22153] transition-colors">
          <BsHeartFill size={14} />
          <span>Shop more gifts</span>
        </Link>
      </div>
    </div>
  );
}
