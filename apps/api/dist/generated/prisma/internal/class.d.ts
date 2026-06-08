import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get address(): Prisma.AddressDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get category(): Prisma.CategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get occasion(): Prisma.OccasionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get relationship(): Prisma.RelationshipDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get product(): Prisma.ProductDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productImage(): Prisma.ProductImageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productCategory(): Prisma.ProductCategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productOccasion(): Prisma.ProductOccasionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productRelationship(): Prisma.ProductRelationshipDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get cart(): Prisma.CartDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get cartItem(): Prisma.CartItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get order(): Prisma.OrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get orderItem(): Prisma.OrderItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get payment(): Prisma.PaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get refund(): Prisma.RefundDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get deliveryZone(): Prisma.DeliveryZoneDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get deliverySlot(): Prisma.DeliverySlotDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get deliveryPartner(): Prisma.DeliveryPartnerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get deliveryProof(): Prisma.DeliveryProofDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get vendor(): Prisma.VendorDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get vendorProduct(): Prisma.VendorProductDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get coupon(): Prisma.CouponDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get review(): Prisma.ReviewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get reminder(): Prisma.ReminderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get corporateEnquiry(): Prisma.CorporateEnquiryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get auditLog(): Prisma.AuditLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get adminSetting(): Prisma.AdminSettingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
