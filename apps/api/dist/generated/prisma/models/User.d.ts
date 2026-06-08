import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    phone: string | null;
    passwordHash: string | null;
    name: string | null;
    role: $Enums.Role | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    isActive: boolean | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    phone: string | null;
    passwordHash: string | null;
    name: string | null;
    role: $Enums.Role | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    isActive: boolean | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    phone: number;
    passwordHash: number;
    name: number;
    role: number;
    createdAt: number;
    updatedAt: number;
    isActive: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    phone?: true;
    passwordHash?: true;
    name?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
    isActive?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    phone?: true;
    passwordHash?: true;
    name?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
    isActive?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    phone?: true;
    passwordHash?: true;
    name?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
    isActive?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    phone: string | null;
    passwordHash: string;
    name: string | null;
    role: $Enums.Role;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    phone?: Prisma.StringNullableFilter<"User"> | string | null;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    isActive?: Prisma.BoolFilter<"User"> | boolean;
    addresses?: Prisma.AddressListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
    reminders?: Prisma.ReminderListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
    auditLogs?: Prisma.AuditLogListRelationFilter;
    deliveryPartner?: Prisma.XOR<Prisma.DeliveryPartnerNullableScalarRelationFilter, Prisma.DeliveryPartnerWhereInput> | null;
    vendor?: Prisma.XOR<Prisma.VendorNullableScalarRelationFilter, Prisma.VendorWhereInput> | null;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    addresses?: Prisma.AddressOrderByRelationAggregateInput;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
    reviews?: Prisma.ReviewOrderByRelationAggregateInput;
    reminders?: Prisma.ReminderOrderByRelationAggregateInput;
    notifications?: Prisma.NotificationOrderByRelationAggregateInput;
    auditLogs?: Prisma.AuditLogOrderByRelationAggregateInput;
    deliveryPartner?: Prisma.DeliveryPartnerOrderByWithRelationInput;
    vendor?: Prisma.VendorOrderByWithRelationInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    phone?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    passwordHash?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    isActive?: Prisma.BoolFilter<"User"> | boolean;
    addresses?: Prisma.AddressListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
    reminders?: Prisma.ReminderListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
    auditLogs?: Prisma.AuditLogListRelationFilter;
    deliveryPartner?: Prisma.XOR<Prisma.DeliveryPartnerNullableScalarRelationFilter, Prisma.DeliveryPartnerWhereInput> | null;
    vendor?: Prisma.XOR<Prisma.VendorNullableScalarRelationFilter, Prisma.VendorWhereInput> | null;
}, "id" | "email" | "phone">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    phone?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    passwordHash?: Prisma.StringWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    role?: Prisma.EnumRoleWithAggregatesFilter<"User"> | $Enums.Role;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerCreateNestedOneWithoutUserInput;
    vendor?: Prisma.VendorCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedCreateNestedOneWithoutUserInput;
    vendor?: Prisma.VendorUncheckedCreateNestedOneWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUpdateOneWithoutUserNestedInput;
    vendor?: Prisma.VendorUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedUpdateOneWithoutUserNestedInput;
    vendor?: Prisma.VendorUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type UserCreateNestedOneWithoutAddressesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAddressesInput, Prisma.UserUncheckedCreateWithoutAddressesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAddressesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutAddressesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAddressesInput, Prisma.UserUncheckedCreateWithoutAddressesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAddressesInput;
    upsert?: Prisma.UserUpsertWithoutAddressesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAddressesInput, Prisma.UserUpdateWithoutAddressesInput>, Prisma.UserUncheckedUpdateWithoutAddressesInput>;
};
export type UserCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.UserUpsertWithoutOrdersInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOrdersInput, Prisma.UserUpdateWithoutOrdersInput>, Prisma.UserUncheckedUpdateWithoutOrdersInput>;
};
export type UserCreateNestedOneWithoutDeliveryPartnerInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDeliveryPartnerInput, Prisma.UserUncheckedCreateWithoutDeliveryPartnerInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDeliveryPartnerInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutDeliveryPartnerNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDeliveryPartnerInput, Prisma.UserUncheckedCreateWithoutDeliveryPartnerInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDeliveryPartnerInput;
    upsert?: Prisma.UserUpsertWithoutDeliveryPartnerInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutDeliveryPartnerInput, Prisma.UserUpdateWithoutDeliveryPartnerInput>, Prisma.UserUncheckedUpdateWithoutDeliveryPartnerInput>;
};
export type UserCreateNestedOneWithoutVendorInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutVendorInput, Prisma.UserUncheckedCreateWithoutVendorInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutVendorInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutVendorNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutVendorInput, Prisma.UserUncheckedCreateWithoutVendorInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutVendorInput;
    upsert?: Prisma.UserUpsertWithoutVendorInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutVendorInput, Prisma.UserUpdateWithoutVendorInput>, Prisma.UserUncheckedUpdateWithoutVendorInput>;
};
export type UserCreateNestedOneWithoutReviewsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReviewsInput, Prisma.UserUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReviewsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReviewsInput, Prisma.UserUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReviewsInput;
    upsert?: Prisma.UserUpsertWithoutReviewsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutReviewsInput, Prisma.UserUpdateWithoutReviewsInput>, Prisma.UserUncheckedUpdateWithoutReviewsInput>;
};
export type UserCreateNestedOneWithoutRemindersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRemindersInput, Prisma.UserUncheckedCreateWithoutRemindersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRemindersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutRemindersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRemindersInput, Prisma.UserUncheckedCreateWithoutRemindersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRemindersInput;
    upsert?: Prisma.UserUpsertWithoutRemindersInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutRemindersInput, Prisma.UserUpdateWithoutRemindersInput>, Prisma.UserUncheckedUpdateWithoutRemindersInput>;
};
export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNotificationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNotificationsInput;
    upsert?: Prisma.UserUpsertWithoutNotificationsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutNotificationsInput, Prisma.UserUpdateWithoutNotificationsInput>, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
};
export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAuditLogsInput, Prisma.UserUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAuditLogsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAuditLogsInput, Prisma.UserUncheckedCreateWithoutAuditLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAuditLogsInput;
    upsert?: Prisma.UserUpsertWithoutAuditLogsInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAuditLogsInput, Prisma.UserUpdateWithoutAuditLogsInput>, Prisma.UserUncheckedUpdateWithoutAuditLogsInput>;
};
export type UserCreateWithoutAddressesInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerCreateNestedOneWithoutUserInput;
    vendor?: Prisma.VendorCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutAddressesInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedCreateNestedOneWithoutUserInput;
    vendor?: Prisma.VendorUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutAddressesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAddressesInput, Prisma.UserUncheckedCreateWithoutAddressesInput>;
};
export type UserUpsertWithoutAddressesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAddressesInput, Prisma.UserUncheckedUpdateWithoutAddressesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAddressesInput, Prisma.UserUncheckedCreateWithoutAddressesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAddressesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAddressesInput, Prisma.UserUncheckedUpdateWithoutAddressesInput>;
};
export type UserUpdateWithoutAddressesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUpdateOneWithoutUserNestedInput;
    vendor?: Prisma.VendorUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutAddressesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedUpdateOneWithoutUserNestedInput;
    vendor?: Prisma.VendorUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutOrdersInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerCreateNestedOneWithoutUserInput;
    vendor?: Prisma.VendorCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutOrdersInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressUncheckedCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedCreateNestedOneWithoutUserInput;
    vendor?: Prisma.VendorUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutOrdersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
};
export type UserUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOrdersInput, Prisma.UserUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOrdersInput, Prisma.UserUncheckedUpdateWithoutOrdersInput>;
};
export type UserUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUpdateOneWithoutUserNestedInput;
    vendor?: Prisma.VendorUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUncheckedUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedUpdateOneWithoutUserNestedInput;
    vendor?: Prisma.VendorUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutDeliveryPartnerInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    vendor?: Prisma.VendorCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutDeliveryPartnerInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    vendor?: Prisma.VendorUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutDeliveryPartnerInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutDeliveryPartnerInput, Prisma.UserUncheckedCreateWithoutDeliveryPartnerInput>;
};
export type UserUpsertWithoutDeliveryPartnerInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutDeliveryPartnerInput, Prisma.UserUncheckedUpdateWithoutDeliveryPartnerInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutDeliveryPartnerInput, Prisma.UserUncheckedCreateWithoutDeliveryPartnerInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutDeliveryPartnerInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutDeliveryPartnerInput, Prisma.UserUncheckedUpdateWithoutDeliveryPartnerInput>;
};
export type UserUpdateWithoutDeliveryPartnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    vendor?: Prisma.VendorUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutDeliveryPartnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    vendor?: Prisma.VendorUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutVendorInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutVendorInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutVendorInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutVendorInput, Prisma.UserUncheckedCreateWithoutVendorInput>;
};
export type UserUpsertWithoutVendorInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutVendorInput, Prisma.UserUncheckedUpdateWithoutVendorInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutVendorInput, Prisma.UserUncheckedCreateWithoutVendorInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutVendorInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutVendorInput, Prisma.UserUncheckedUpdateWithoutVendorInput>;
};
export type UserUpdateWithoutVendorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutVendorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutReviewsInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerCreateNestedOneWithoutUserInput;
    vendor?: Prisma.VendorCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutReviewsInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedCreateNestedOneWithoutUserInput;
    vendor?: Prisma.VendorUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutReviewsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutReviewsInput, Prisma.UserUncheckedCreateWithoutReviewsInput>;
};
export type UserUpsertWithoutReviewsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutReviewsInput, Prisma.UserUncheckedUpdateWithoutReviewsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutReviewsInput, Prisma.UserUncheckedCreateWithoutReviewsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutReviewsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutReviewsInput, Prisma.UserUncheckedUpdateWithoutReviewsInput>;
};
export type UserUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUpdateOneWithoutUserNestedInput;
    vendor?: Prisma.VendorUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedUpdateOneWithoutUserNestedInput;
    vendor?: Prisma.VendorUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutRemindersInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerCreateNestedOneWithoutUserInput;
    vendor?: Prisma.VendorCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutRemindersInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedCreateNestedOneWithoutUserInput;
    vendor?: Prisma.VendorUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutRemindersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutRemindersInput, Prisma.UserUncheckedCreateWithoutRemindersInput>;
};
export type UserUpsertWithoutRemindersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutRemindersInput, Prisma.UserUncheckedUpdateWithoutRemindersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutRemindersInput, Prisma.UserUncheckedCreateWithoutRemindersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutRemindersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutRemindersInput, Prisma.UserUncheckedUpdateWithoutRemindersInput>;
};
export type UserUpdateWithoutRemindersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUpdateOneWithoutUserNestedInput;
    vendor?: Prisma.VendorUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutRemindersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedUpdateOneWithoutUserNestedInput;
    vendor?: Prisma.VendorUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutNotificationsInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerCreateNestedOneWithoutUserInput;
    vendor?: Prisma.VendorCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderUncheckedCreateNestedManyWithoutUserInput;
    auditLogs?: Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedCreateNestedOneWithoutUserInput;
    vendor?: Prisma.VendorUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutNotificationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
};
export type UserUpsertWithoutNotificationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutNotificationsInput, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutNotificationsInput, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
};
export type UserUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUpdateOneWithoutUserNestedInput;
    vendor?: Prisma.VendorUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUncheckedUpdateManyWithoutUserNestedInput;
    auditLogs?: Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedUpdateOneWithoutUserNestedInput;
    vendor?: Prisma.VendorUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutAuditLogsInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerCreateNestedOneWithoutUserInput;
    vendor?: Prisma.VendorCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    name?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    isActive?: boolean;
    addresses?: Prisma.AddressUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderUncheckedCreateNestedManyWithoutUserInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedCreateNestedOneWithoutUserInput;
    vendor?: Prisma.VendorUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAuditLogsInput, Prisma.UserUncheckedCreateWithoutAuditLogsInput>;
};
export type UserUpsertWithoutAuditLogsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAuditLogsInput, Prisma.UserUncheckedUpdateWithoutAuditLogsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAuditLogsInput, Prisma.UserUncheckedCreateWithoutAuditLogsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAuditLogsInput, Prisma.UserUncheckedUpdateWithoutAuditLogsInput>;
};
export type UserUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUpdateOneWithoutUserNestedInput;
    vendor?: Prisma.VendorUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    addresses?: Prisma.AddressUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutUserNestedInput;
    reminders?: Prisma.ReminderUncheckedUpdateManyWithoutUserNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    deliveryPartner?: Prisma.DeliveryPartnerUncheckedUpdateOneWithoutUserNestedInput;
    vendor?: Prisma.VendorUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCountOutputType = {
    addresses: number;
    orders: number;
    reviews: number;
    reminders: number;
    notifications: number;
    auditLogs: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    addresses?: boolean | UserCountOutputTypeCountAddressesArgs;
    orders?: boolean | UserCountOutputTypeCountOrdersArgs;
    reviews?: boolean | UserCountOutputTypeCountReviewsArgs;
    reminders?: boolean | UserCountOutputTypeCountRemindersArgs;
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs;
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountAddressesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AddressWhereInput;
};
export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
export type UserCountOutputTypeCountReviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
};
export type UserCountOutputTypeCountRemindersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReminderWhereInput;
};
export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
};
export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    name?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    isActive?: boolean;
    addresses?: boolean | Prisma.User$addressesArgs<ExtArgs>;
    orders?: boolean | Prisma.User$ordersArgs<ExtArgs>;
    reviews?: boolean | Prisma.User$reviewsArgs<ExtArgs>;
    reminders?: boolean | Prisma.User$remindersArgs<ExtArgs>;
    notifications?: boolean | Prisma.User$notificationsArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.User$auditLogsArgs<ExtArgs>;
    deliveryPartner?: boolean | Prisma.User$deliveryPartnerArgs<ExtArgs>;
    vendor?: boolean | Prisma.User$vendorArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    name?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    isActive?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    name?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    isActive?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    name?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    isActive?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "phone" | "passwordHash" | "name" | "role" | "createdAt" | "updatedAt" | "isActive", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    addresses?: boolean | Prisma.User$addressesArgs<ExtArgs>;
    orders?: boolean | Prisma.User$ordersArgs<ExtArgs>;
    reviews?: boolean | Prisma.User$reviewsArgs<ExtArgs>;
    reminders?: boolean | Prisma.User$remindersArgs<ExtArgs>;
    notifications?: boolean | Prisma.User$notificationsArgs<ExtArgs>;
    auditLogs?: boolean | Prisma.User$auditLogsArgs<ExtArgs>;
    deliveryPartner?: boolean | Prisma.User$deliveryPartnerArgs<ExtArgs>;
    vendor?: boolean | Prisma.User$vendorArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        addresses: Prisma.$AddressPayload<ExtArgs>[];
        orders: Prisma.$OrderPayload<ExtArgs>[];
        reviews: Prisma.$ReviewPayload<ExtArgs>[];
        reminders: Prisma.$ReminderPayload<ExtArgs>[];
        notifications: Prisma.$NotificationPayload<ExtArgs>[];
        auditLogs: Prisma.$AuditLogPayload<ExtArgs>[];
        deliveryPartner: Prisma.$DeliveryPartnerPayload<ExtArgs> | null;
        vendor: Prisma.$VendorPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        name: string | null;
        role: $Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    addresses<T extends Prisma.User$addressesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orders<T extends Prisma.User$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reviews<T extends Prisma.User$reviewsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reminders<T extends Prisma.User$remindersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$remindersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    notifications<T extends Prisma.User$notificationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    auditLogs<T extends Prisma.User$auditLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    deliveryPartner<T extends Prisma.User$deliveryPartnerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$deliveryPartnerArgs<ExtArgs>>): Prisma.Prisma__DeliveryPartnerClient<runtime.Types.Result.GetResult<Prisma.$DeliveryPartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    vendor<T extends Prisma.User$vendorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$vendorArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly phone: Prisma.FieldRef<"User", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'Role'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly isActive: Prisma.FieldRef<"User", 'Boolean'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$addressesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AddressSelect<ExtArgs> | null;
    omit?: Prisma.AddressOmit<ExtArgs> | null;
    include?: Prisma.AddressInclude<ExtArgs> | null;
    where?: Prisma.AddressWhereInput;
    orderBy?: Prisma.AddressOrderByWithRelationInput | Prisma.AddressOrderByWithRelationInput[];
    cursor?: Prisma.AddressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AddressScalarFieldEnum | Prisma.AddressScalarFieldEnum[];
};
export type User$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderSelect<ExtArgs> | null;
    omit?: Prisma.OrderOmit<ExtArgs> | null;
    include?: Prisma.OrderInclude<ExtArgs> | null;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    cursor?: Prisma.OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
export type User$reviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type User$remindersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReminderSelect<ExtArgs> | null;
    omit?: Prisma.ReminderOmit<ExtArgs> | null;
    include?: Prisma.ReminderInclude<ExtArgs> | null;
    where?: Prisma.ReminderWhereInput;
    orderBy?: Prisma.ReminderOrderByWithRelationInput | Prisma.ReminderOrderByWithRelationInput[];
    cursor?: Prisma.ReminderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReminderScalarFieldEnum | Prisma.ReminderScalarFieldEnum[];
};
export type User$notificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
export type User$auditLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
export type User$deliveryPartnerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryPartnerSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryPartnerOmit<ExtArgs> | null;
    include?: Prisma.DeliveryPartnerInclude<ExtArgs> | null;
    where?: Prisma.DeliveryPartnerWhereInput;
};
export type User$vendorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorSelect<ExtArgs> | null;
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    include?: Prisma.VendorInclude<ExtArgs> | null;
    where?: Prisma.VendorWhereInput;
};
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
