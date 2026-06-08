"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.OrderStatus = exports.Role = void 0;
exports.Role = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    VENDOR: 'VENDOR',
    DELIVERY_PARTNER: 'DELIVERY_PARTNER',
    SUPPORT: 'SUPPORT',
    CUSTOMER: 'CUSTOMER'
};
exports.OrderStatus = {
    PLACED: 'PLACED',
    PAYMENT_PENDING: 'PAYMENT_PENDING',
    PAYMENT_CONFIRMED: 'PAYMENT_CONFIRMED',
    ACCEPTED: 'ACCEPTED',
    PREPARING: 'PREPARING',
    READY_FOR_PICKUP: 'READY_FOR_PICKUP',
    OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED',
    REFUNDED: 'REFUNDED',
    FAILED: 'FAILED'
};
exports.PaymentStatus = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED'
};
//# sourceMappingURL=enums.js.map