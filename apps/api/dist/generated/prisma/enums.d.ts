export declare const Role: {
    readonly SUPER_ADMIN: "SUPER_ADMIN";
    readonly ADMIN: "ADMIN";
    readonly VENDOR: "VENDOR";
    readonly DELIVERY_PARTNER: "DELIVERY_PARTNER";
    readonly SUPPORT: "SUPPORT";
    readonly CUSTOMER: "CUSTOMER";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const OrderStatus: {
    readonly PLACED: "PLACED";
    readonly PAYMENT_PENDING: "PAYMENT_PENDING";
    readonly PAYMENT_CONFIRMED: "PAYMENT_CONFIRMED";
    readonly ACCEPTED: "ACCEPTED";
    readonly PREPARING: "PREPARING";
    readonly READY_FOR_PICKUP: "READY_FOR_PICKUP";
    readonly OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY";
    readonly DELIVERED: "DELIVERED";
    readonly CANCELLED: "CANCELLED";
    readonly REFUNDED: "REFUNDED";
    readonly FAILED: "FAILED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly SUCCESS: "SUCCESS";
    readonly FAILED: "FAILED";
    readonly REFUNDED: "REFUNDED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
