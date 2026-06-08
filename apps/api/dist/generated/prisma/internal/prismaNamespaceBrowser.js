"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.JsonNullValueInput = exports.NullableJsonNullValueInput = exports.SortOrder = exports.AdminSettingScalarFieldEnum = exports.AuditLogScalarFieldEnum = exports.CorporateEnquiryScalarFieldEnum = exports.NotificationScalarFieldEnum = exports.ReminderScalarFieldEnum = exports.ReviewScalarFieldEnum = exports.CouponScalarFieldEnum = exports.VendorProductScalarFieldEnum = exports.VendorScalarFieldEnum = exports.DeliveryProofScalarFieldEnum = exports.DeliveryPartnerScalarFieldEnum = exports.DeliverySlotScalarFieldEnum = exports.DeliveryZoneScalarFieldEnum = exports.RefundScalarFieldEnum = exports.PaymentScalarFieldEnum = exports.OrderItemScalarFieldEnum = exports.OrderScalarFieldEnum = exports.CartItemScalarFieldEnum = exports.CartScalarFieldEnum = exports.ProductRelationshipScalarFieldEnum = exports.ProductOccasionScalarFieldEnum = exports.ProductCategoryScalarFieldEnum = exports.ProductImageScalarFieldEnum = exports.ProductScalarFieldEnum = exports.RelationshipScalarFieldEnum = exports.OccasionScalarFieldEnum = exports.CategoryScalarFieldEnum = exports.AddressScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Address: 'Address',
    Category: 'Category',
    Occasion: 'Occasion',
    Relationship: 'Relationship',
    Product: 'Product',
    ProductImage: 'ProductImage',
    ProductCategory: 'ProductCategory',
    ProductOccasion: 'ProductOccasion',
    ProductRelationship: 'ProductRelationship',
    Cart: 'Cart',
    CartItem: 'CartItem',
    Order: 'Order',
    OrderItem: 'OrderItem',
    Payment: 'Payment',
    Refund: 'Refund',
    DeliveryZone: 'DeliveryZone',
    DeliverySlot: 'DeliverySlot',
    DeliveryPartner: 'DeliveryPartner',
    DeliveryProof: 'DeliveryProof',
    Vendor: 'Vendor',
    VendorProduct: 'VendorProduct',
    Coupon: 'Coupon',
    Review: 'Review',
    Reminder: 'Reminder',
    Notification: 'Notification',
    CorporateEnquiry: 'CorporateEnquiry',
    AuditLog: 'AuditLog',
    AdminSetting: 'AdminSetting'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    phone: 'phone',
    passwordHash: 'passwordHash',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isActive: 'isActive'
};
exports.AddressScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    name: 'name',
    phone: 'phone',
    addressLine: 'addressLine',
    area: 'area',
    city: 'city',
    pincode: 'pincode',
    state: 'state',
    country: 'country',
    isDefault: 'isDefault',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CategoryScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    imageUrl: 'imageUrl',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OccasionScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    imageUrl: 'imageUrl',
    isActive: 'isActive'
};
exports.RelationshipScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    imageUrl: 'imageUrl',
    isActive: 'isActive'
};
exports.ProductScalarFieldEnum = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    whatsInside: 'whatsInside',
    price: 'price',
    compareAtPrice: 'compareAtPrice',
    isActive: 'isActive',
    stock: 'stock',
    deliveryEstimate: 'deliveryEstimate',
    sameDayAvailable: 'sameDayAvailable',
    isPersonalizable: 'isPersonalizable',
    tags: 'tags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProductImageScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    url: 'url',
    isPrimary: 'isPrimary',
    order: 'order'
};
exports.ProductCategoryScalarFieldEnum = {
    productId: 'productId',
    categoryId: 'categoryId'
};
exports.ProductOccasionScalarFieldEnum = {
    productId: 'productId',
    occasionId: 'occasionId'
};
exports.ProductRelationshipScalarFieldEnum = {
    productId: 'productId',
    relationshipId: 'relationshipId'
};
exports.CartScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    session: 'session',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CartItemScalarFieldEnum = {
    id: 'id',
    cartId: 'cartId',
    productId: 'productId',
    quantity: 'quantity',
    variantData: 'variantData'
};
exports.OrderScalarFieldEnum = {
    id: 'id',
    orderNumber: 'orderNumber',
    userId: 'userId',
    status: 'status',
    totalAmount: 'totalAmount',
    deliveryFee: 'deliveryFee',
    discount: 'discount',
    finalAmount: 'finalAmount',
    recipientName: 'recipientName',
    recipientPhone: 'recipientPhone',
    deliveryAddress: 'deliveryAddress',
    deliverySlotId: 'deliverySlotId',
    deliveryDate: 'deliveryDate',
    giftMessage: 'giftMessage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    vendorId: 'vendorId',
    deliveryPartnerId: 'deliveryPartnerId'
};
exports.OrderItemScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    quantity: 'quantity',
    priceAt: 'priceAt',
    variantData: 'variantData'
};
exports.PaymentScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    razorpayOrderId: 'razorpayOrderId',
    razorpayPaymentId: 'razorpayPaymentId',
    amount: 'amount',
    status: 'status',
    method: 'method',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RefundScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    amount: 'amount',
    reason: 'reason',
    status: 'status',
    razorpayRefundId: 'razorpayRefundId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.DeliveryZoneScalarFieldEnum = {
    id: 'id',
    city: 'city',
    area: 'area',
    pincode: 'pincode',
    isActive: 'isActive',
    minOrder: 'minOrder',
    deliveryFee: 'deliveryFee',
    expressFee: 'expressFee',
    midnightFee: 'midnightFee'
};
exports.DeliverySlotScalarFieldEnum = {
    id: 'id',
    label: 'label',
    startTime: 'startTime',
    endTime: 'endTime',
    type: 'type',
    isActive: 'isActive',
    fee: 'fee'
};
exports.DeliveryPartnerScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    vehicleType: 'vehicleType',
    vehicleNo: 'vehicleNo',
    isActive: 'isActive'
};
exports.DeliveryProofScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    imageUrl: 'imageUrl',
    notes: 'notes',
    uploadedAt: 'uploadedAt'
};
exports.VendorScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    storeName: 'storeName',
    address: 'address',
    isActive: 'isActive'
};
exports.VendorProductScalarFieldEnum = {
    vendorId: 'vendorId',
    productId: 'productId',
    price: 'price',
    stock: 'stock'
};
exports.CouponScalarFieldEnum = {
    id: 'id',
    code: 'code',
    discountType: 'discountType',
    discountValue: 'discountValue',
    minOrderValue: 'minOrderValue',
    maxDiscount: 'maxDiscount',
    validFrom: 'validFrom',
    validUntil: 'validUntil',
    isActive: 'isActive',
    usageLimit: 'usageLimit',
    usageCount: 'usageCount'
};
exports.ReviewScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    productId: 'productId',
    rating: 'rating',
    comment: 'comment',
    isApproved: 'isApproved',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ReminderScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    title: 'title',
    date: 'date',
    relation: 'relation',
    isActive: 'isActive',
    createdAt: 'createdAt'
};
exports.NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message',
    isRead: 'isRead',
    createdAt: 'createdAt'
};
exports.CorporateEnquiryScalarFieldEnum = {
    id: 'id',
    companyName: 'companyName',
    contactName: 'contactName',
    email: 'email',
    phone: 'phone',
    budget: 'budget',
    message: 'message',
    status: 'status',
    createdAt: 'createdAt'
};
exports.AuditLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    details: 'details',
    createdAt: 'createdAt'
};
exports.AdminSettingScalarFieldEnum = {
    id: 'id',
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map