'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BsBox, BsCart, BsPeople, BsGraphUp, BsArrowRight, BsClockHistory, BsCheckCircle } from 'react-icons/bs';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/ui/Loader';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/login?admin=true');
        return;
      }
      if (user?.role !== 'ADMIN' && user?.role !== 'SUPER_ADMIN') {
        router.push('/');
        return;
      }
    }

    async function loadStats() {
      try {
        const data = await apiClient.getAdminDashboard();
        setStats(data);
      } catch (err) {
        console.error('Failed to load admin stats', err);
      } finally {
        setLoading(false);
      }
    }

    if (isAuthenticated && (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN')) {
      loadStats();
    }
  }, [isAuthenticated, authLoading, user, router]);

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader color="#b22153" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Admin Nav */}
      <nav className="bg-[#1a3a3a] text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="font-black text-xl italic tracking-tighter">CESTO</span>
          <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">Admin</span>
        </div>
        <button onClick={() => router.push('/account')} className="text-sm font-bold opacity-80 hover:opacity-100">
          My Account
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">Executive Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Revenue" value={`₹${stats?.totalRevenue?.toLocaleString() || 0}`} icon={<BsGraphUp />} color="bg-blue-500" />
          <StatCard title="Total Orders" value={stats?.totalOrders || 0} icon={<BsCart />} color="bg-orange-500" />
          <StatCard title="Pending Orders" value={stats?.pendingOrders || 0} icon={<BsClockHistory />} color="bg-red-500" />
          <StatCard title="Total Products" value={stats?.totalProducts || 0} icon={<BsBox />} color="bg-green-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Recent Orders Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Recent Orders</h2>
                <Link href="/admin/orders" className="text-xs font-bold text-[#b22153] flex items-center gap-1">
                  View all <BsArrowRight />
                </Link>
             </div>
             
             <div className="space-y-4">
                {stats?.recentOrders?.length > 0 ? (
                  stats.recentOrders.map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <div>
                        <p className="text-xs font-bold text-gray-400 mb-1">{order.orderNumber}</p>
                        <p className="text-sm font-bold text-gray-900">{order.recipientName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-gray-900 mb-1">₹{order.totalAmount}</p>
                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-gray-200 text-gray-600 rounded">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-10 text-gray-400 text-sm font-medium italic">No recent orders found.</p>
                )}
             </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 italic-shadow">
             <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">Inventory Alerts</h2>
             <div className="space-y-4">
                {stats?.lowStockProducts?.length > 0 ? (
                  stats.lowStockProducts.map((prod: any) => (
                    <div key={prod.id} className="flex items-center justify-between p-4 border border-red-50 bg-red-50/30 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden">
                          <img src={prod.imageUrl || '/placeholder.png'} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 max-w-[150px] truncate">{prod.name}</p>
                          <p className="text-xs font-bold text-red-500 uppercase tracking-widest">Stock: {prod.stock}</p>
                        </div>
                      </div>
                      <Link href={`/admin/products/${prod.id}`} className="text-xs font-bold text-[#b22153]">Fix</Link>
                    </div>
                  ))
                ) : (
                  <div className="py-10 flex flex-col items-center justify-center text-gray-400">
                    <div className="text-green-500 mb-3">
                      <BsCheckCircle size={40} />
                    </div>
                    <p className="text-sm font-medium">All products well-stocked!</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: any, icon: React.ReactNode, color: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-12 h-12 ${color} text-white rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-black/5`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-1">{title}</p>
        <p className="text-xl font-black text-gray-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
