import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Address: "Address";
    readonly Category: "Category";
    readonly Occasion: "Occasion";
    readonly Relationship: "Relationship";
    readonly Product: "Product";
    readonly ProductImage: "ProductImage";
    readonly ProductCategory: "ProductCategory";
    readonly ProductOccasion: "ProductOccasion";
    readonly ProductRelationship: "ProductRelationship";
    readonly Cart: "Cart";
    readonly CartItem: "CartItem";
    readonly Order: "Order";
    readonly OrderItem: "OrderItem";
    readonly Payment: "Payment";
    readonly Refund: "Refund";
    readonly DeliveryZone: "DeliveryZone";
    readonly DeliverySlot: "DeliverySlot";
    readonly DeliveryPartner: "DeliveryPartner";
    readonly DeliveryProof: "DeliveryProof";
    readonly Vendor: "Vendor";
    readonly VendorProduct: "VendorProduct";
    readonly Coupon: "Coupon";
    readonly Review: "Review";
    readonly Reminder: "Reminder";
    readonly Notification: "Notification";
    readonly CorporateEnquiry: "CorporateEnquiry";
    readonly AuditLog: "AuditLog";
    readonly AdminSetting: "AdminSetting";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly phone: "phone";
    readonly passwordHash: "passwordHash";
    readonly name: "name";
    readonly role: "role";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly isActive: "isActive";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const AddressScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly name: "name";
    readonly phone: "phone";
    readonly addressLine: "addressLine";
    readonly area: "area";
    readonly city: "city";
    readonly pincode: "pincode";
    readonly state: "state";
    readonly country: "country";
    readonly isDefault: "isDefault";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly description: "description";
    readonly imageUrl: "imageUrl";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const OccasionScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly imageUrl: "imageUrl";
    readonly isActive: "isActive";
};
export type OccasionScalarFieldEnum = (typeof OccasionScalarFieldEnum)[keyof typeof OccasionScalarFieldEnum];
export declare const RelationshipScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly imageUrl: "imageUrl";
    readonly isActive: "isActive";
};
export type RelationshipScalarFieldEnum = (typeof RelationshipScalarFieldEnum)[keyof typeof RelationshipScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly description: "description";
    readonly whatsInside: "whatsInside";
    readonly price: "price";
    readonly compareAtPrice: "compareAtPrice";
    readonly isActive: "isActive";
    readonly stock: "stock";
    readonly deliveryEstimate: "deliveryEstimate";
    readonly sameDayAvailable: "sameDayAvailable";
    readonly isPersonalizable: "isPersonalizable";
    readonly tags: "tags";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const ProductImageScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly url: "url";
    readonly isPrimary: "isPrimary";
    readonly order: "order";
};
export type ProductImageScalarFieldEnum = (typeof ProductImageScalarFieldEnum)[keyof typeof ProductImageScalarFieldEnum];
export declare const ProductCategoryScalarFieldEnum: {
    readonly productId: "productId";
    readonly categoryId: "categoryId";
};
export type ProductCategoryScalarFieldEnum = (typeof ProductCategoryScalarFieldEnum)[keyof typeof ProductCategoryScalarFieldEnum];
export declare const ProductOccasionScalarFieldEnum: {
    readonly productId: "productId";
    readonly occasionId: "occasionId";
};
export type ProductOccasionScalarFieldEnum = (typeof ProductOccasionScalarFieldEnum)[keyof typeof ProductOccasionScalarFieldEnum];
export declare const ProductRelationshipScalarFieldEnum: {
    readonly productId: "productId";
    readonly relationshipId: "relationshipId";
};
export type ProductRelationshipScalarFieldEnum = (typeof ProductRelationshipScalarFieldEnum)[keyof typeof ProductRelationshipScalarFieldEnum];
export declare const CartScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly session: "session";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CartScalarFieldEnum = (typeof CartScalarFieldEnum)[keyof typeof CartScalarFieldEnum];
export declare const CartItemScalarFieldEnum: {
    readonly id: "id";
    readonly cartId: "cartId";
    readonly productId: "productId";
    readonly quantity: "quantity";
    readonly variantData: "variantData";
};
export type CartItemScalarFieldEnum = (typeof CartItemScalarFieldEnum)[keyof typeof CartItemScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly orderNumber: "orderNumber";
    readonly userId: "userId";
    readonly status: "status";
    readonly totalAmount: "totalAmount";
    readonly deliveryFee: "deliveryFee";
    readonly discount: "discount";
    readonly finalAmount: "finalAmount";
    readonly recipientName: "recipientName";
    readonly recipientPhone: "recipientPhone";
    readonly deliveryAddress: "deliveryAddress";
    readonly deliverySlotId: "deliverySlotId";
    readonly deliveryDate: "deliveryDate";
    readonly giftMessage: "giftMessage";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly vendorId: "vendorId";
    readonly deliveryPartnerId: "deliveryPartnerId";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly productId: "productId";
    readonly quantity: "quantity";
    readonly priceAt: "priceAt";
    readonly variantData: "variantData";
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly razorpayOrderId: "razorpayOrderId";
    readonly razorpayPaymentId: "razorpayPaymentId";
    readonly amount: "amount";
    readonly status: "status";
    readonly method: "method";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const RefundScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly amount: "amount";
    readonly reason: "reason";
    readonly status: "status";
    readonly razorpayRefundId: "razorpayRefundId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RefundScalarFieldEnum = (typeof RefundScalarFieldEnum)[keyof typeof RefundScalarFieldEnum];
export declare const DeliveryZoneScalarFieldEnum: {
    readonly id: "id";
    readonly city: "city";
    readonly area: "area";
    readonly pincode: "pincode";
    readonly isActive: "isActive";
    readonly minOrder: "minOrder";
    readonly deliveryFee: "deliveryFee";
    readonly expressFee: "expressFee";
    readonly midnightFee: "midnightFee";
};
export type DeliveryZoneScalarFieldEnum = (typeof DeliveryZoneScalarFieldEnum)[keyof typeof DeliveryZoneScalarFieldEnum];
export declare const DeliverySlotScalarFieldEnum: {
    readonly id: "id";
    readonly label: "label";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly type: "type";
    readonly isActive: "isActive";
    readonly fee: "fee";
};
export type DeliverySlotScalarFieldEnum = (typeof DeliverySlotScalarFieldEnum)[keyof typeof DeliverySlotScalarFieldEnum];
export declare const DeliveryPartnerScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly vehicleType: "vehicleType";
    readonly vehicleNo: "vehicleNo";
    readonly isActive: "isActive";
};
export type DeliveryPartnerScalarFieldEnum = (typeof DeliveryPartnerScalarFieldEnum)[keyof typeof DeliveryPartnerScalarFieldEnum];
export declare const DeliveryProofScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly imageUrl: "imageUrl";
    readonly notes: "notes";
    readonly uploadedAt: "uploadedAt";
};
export type DeliveryProofScalarFieldEnum = (typeof DeliveryProofScalarFieldEnum)[keyof typeof DeliveryProofScalarFieldEnum];
export declare const VendorScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly storeName: "storeName";
    readonly address: "address";
    readonly isActive: "isActive";
};
export type VendorScalarFieldEnum = (typeof VendorScalarFieldEnum)[keyof typeof VendorScalarFieldEnum];
export declare const VendorProductScalarFieldEnum: {
    readonly vendorId: "vendorId";
    readonly productId: "productId";
    readonly price: "price";
    readonly stock: "stock";
};
export type VendorProductScalarFieldEnum = (typeof VendorProductScalarFieldEnum)[keyof typeof VendorProductScalarFieldEnum];
export declare const CouponScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly discountType: "discountType";
    readonly discountValue: "discountValue";
    readonly minOrderValue: "minOrderValue";
    readonly maxDiscount: "maxDiscount";
    readonly validFrom: "validFrom";
    readonly validUntil: "validUntil";
    readonly isActive: "isActive";
    readonly usageLimit: "usageLimit";
    readonly usageCount: "usageCount";
};
export type CouponScalarFieldEnum = (typeof CouponScalarFieldEnum)[keyof typeof CouponScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly productId: "productId";
    readonly rating: "rating";
    readonly comment: "comment";
    readonly isApproved: "isApproved";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const ReminderScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly title: "title";
    readonly date: "date";
    readonly relation: "relation";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
};
export type ReminderScalarFieldEnum = (typeof ReminderScalarFieldEnum)[keyof typeof ReminderScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly title: "title";
    readonly message: "message";
    readonly isRead: "isRead";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const CorporateEnquiryScalarFieldEnum: {
    readonly id: "id";
    readonly companyName: "companyName";
    readonly contactName: "contactName";
    readonly email: "email";
    readonly phone: "phone";
    readonly budget: "budget";
    readonly message: "message";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type CorporateEnquiryScalarFieldEnum = (typeof CorporateEnquiryScalarFieldEnum)[keyof typeof CorporateEnquiryScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly action: "action";
    readonly entity: "entity";
    readonly entityId: "entityId";
    readonly details: "details";
    readonly createdAt: "createdAt";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const AdminSettingScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly value: "value";
    readonly updatedAt: "updatedAt";
};
export type AdminSettingScalarFieldEnum = (typeof AdminSettingScalarFieldEnum)[keyof typeof AdminSettingScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
