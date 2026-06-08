import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DeliveryPartnerModel = runtime.Types.Result.DefaultSelection<Prisma.$DeliveryPartnerPayload>;
export type AggregateDeliveryPartner = {
    _count: DeliveryPartnerCountAggregateOutputType | null;
    _min: DeliveryPartnerMinAggregateOutputType | null;
    _max: DeliveryPartnerMaxAggregateOutputType | null;
};
export type DeliveryPartnerMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    vehicleType: string | null;
    vehicleNo: string | null;
    isActive: boolean | null;
};
export type DeliveryPartnerMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    vehicleType: string | null;
    vehicleNo: string | null;
    isActive: boolean | null;
};
export type DeliveryPartnerCountAggregateOutputType = {
    id: number;
    userId: number;
    vehicleType: number;
    vehicleNo: number;
    isActive: number;
    _all: number;
};
export type DeliveryPartnerMinAggregateInputType = {
    id?: true;
    userId?: true;
    vehicleType?: true;
    vehicleNo?: true;
    isActive?: true;
};
export type DeliveryPartnerMaxAggregateInputType = {
    id?: true;
    userId?: true;
    vehicleType?: true;
    vehicleNo?: true;
    isActive?: true;
};
export type DeliveryPartnerCountAggregateInputType = {
    id?: true;
    userId?: true;
    vehicleType?: true;
    vehicleNo?: true;
    isActive?: true;
    _all?: true;
};
export type DeliveryPartnerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeliveryPartnerWhereInput;
    orderBy?: Prisma.DeliveryPartnerOrderByWithRelationInput | Prisma.DeliveryPartnerOrderByWithRelationInput[];
    cursor?: Prisma.DeliveryPartnerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DeliveryPartnerCountAggregateInputType;
    _min?: DeliveryPartnerMinAggregateInputType;
    _max?: DeliveryPartnerMaxAggregateInputType;
};
export type GetDeliveryPartnerAggregateType<T extends DeliveryPartnerAggregateArgs> = {
    [P in keyof T & keyof AggregateDeliveryPartner]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDeliveryPartner[P]> : Prisma.GetScalarType<T[P], AggregateDeliveryPartner[P]>;
};
export type DeliveryPartnerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeliveryPartnerWhereInput;
    orderBy?: Prisma.DeliveryPartnerOrderByWithAggregationInput | Prisma.DeliveryPartnerOrderByWithAggregationInput[];
    by: Prisma.DeliveryPartnerScalarFieldEnum[] | Prisma.DeliveryPartnerScalarFieldEnum;
    having?: Prisma.DeliveryPartnerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DeliveryPartnerCountAggregateInputType | true;
    _min?: DeliveryPartnerMinAggregateInputType;
    _max?: DeliveryPartnerMaxAggregateInputType;
};
export type DeliveryPartnerGroupByOutputType = {
    id: string;
    userId: string;
    vehicleType: string | null;
    vehicleNo: string | null;
    isActive: boolean;
    _count: DeliveryPartnerCountAggregateOutputType | null;
    _min: DeliveryPartnerMinAggregateOutputType | null;
    _max: DeliveryPartnerMaxAggregateOutputType | null;
};
export type GetDeliveryPartnerGroupByPayload<T extends DeliveryPartnerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DeliveryPartnerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DeliveryPartnerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DeliveryPartnerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DeliveryPartnerGroupByOutputType[P]>;
}>>;
export type DeliveryPartnerWhereInput = {
    AND?: Prisma.DeliveryPartnerWhereInput | Prisma.DeliveryPartnerWhereInput[];
    OR?: Prisma.DeliveryPartnerWhereInput[];
    NOT?: Prisma.DeliveryPartnerWhereInput | Prisma.DeliveryPartnerWhereInput[];
    id?: Prisma.StringFilter<"DeliveryPartner"> | string;
    userId?: Prisma.StringFilter<"DeliveryPartner"> | string;
    vehicleType?: Prisma.StringNullableFilter<"DeliveryPartner"> | string | null;
    vehicleNo?: Prisma.StringNullableFilter<"DeliveryPartner"> | string | null;
    isActive?: Prisma.BoolFilter<"DeliveryPartner"> | boolean;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    orders?: Prisma.OrderListRelationFilter;
};
export type DeliveryPartnerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    vehicleType?: Prisma.SortOrderInput | Prisma.SortOrder;
    vehicleNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
};
export type DeliveryPartnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.DeliveryPartnerWhereInput | Prisma.DeliveryPartnerWhereInput[];
    OR?: Prisma.DeliveryPartnerWhereInput[];
    NOT?: Prisma.DeliveryPartnerWhereInput | Prisma.DeliveryPartnerWhereInput[];
    vehicleType?: Prisma.StringNullableFilter<"DeliveryPartner"> | string | null;
    vehicleNo?: Prisma.StringNullableFilter<"DeliveryPartner"> | string | null;
    isActive?: Prisma.BoolFilter<"DeliveryPartner"> | boolean;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    orders?: Prisma.OrderListRelationFilter;
}, "id" | "userId">;
export type DeliveryPartnerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    vehicleType?: Prisma.SortOrderInput | Prisma.SortOrder;
    vehicleNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    _count?: Prisma.DeliveryPartnerCountOrderByAggregateInput;
    _max?: Prisma.DeliveryPartnerMaxOrderByAggregateInput;
    _min?: Prisma.DeliveryPartnerMinOrderByAggregateInput;
};
export type DeliveryPartnerScalarWhereWithAggregatesInput = {
    AND?: Prisma.DeliveryPartnerScalarWhereWithAggregatesInput | Prisma.DeliveryPartnerScalarWhereWithAggregatesInput[];
    OR?: Prisma.DeliveryPartnerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DeliveryPartnerScalarWhereWithAggregatesInput | Prisma.DeliveryPartnerScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DeliveryPartner"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"DeliveryPartner"> | string;
    vehicleType?: Prisma.StringNullableWithAggregatesFilter<"DeliveryPartner"> | string | null;
    vehicleNo?: Prisma.StringNullableWithAggregatesFilter<"DeliveryPartner"> | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"DeliveryPartner"> | boolean;
};
export type DeliveryPartnerCreateInput = {
    id?: string;
    vehicleType?: string | null;
    vehicleNo?: string | null;
    isActive?: boolean;
    user: Prisma.UserCreateNestedOneWithoutDeliveryPartnerInput;
    orders?: Prisma.OrderCreateNestedManyWithoutDeliveryPartnerInput;
};
export type DeliveryPartnerUncheckedCreateInput = {
    id?: string;
    userId: string;
    vehicleType?: string | null;
    vehicleNo?: string | null;
    isActive?: boolean;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutDeliveryPartnerInput;
};
export type DeliveryPartnerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vehicleNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    user?: Prisma.UserUpdateOneRequiredWithoutDeliveryPartnerNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutDeliveryPartnerNestedInput;
};
export type DeliveryPartnerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vehicleNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutDeliveryPartnerNestedInput;
};
export type DeliveryPartnerCreateManyInput = {
    id?: string;
    userId: string;
    vehicleType?: string | null;
    vehicleNo?: string | null;
    isActive?: boolean;
};
export type DeliveryPartnerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vehicleNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type DeliveryPartnerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vehicleNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type DeliveryPartnerNullableScalarRelationFilter = {
    is?: Prisma.DeliveryPartnerWhereInput | null;
    isNot?: Prisma.DeliveryPartnerWhereInput | null;
};
export type DeliveryPartnerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    vehicleType?: Prisma.SortOrder;
    vehicleNo?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type DeliveryPartnerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    vehicleType?: Prisma.SortOrder;
    vehicleNo?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type DeliveryPartnerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    vehicleType?: Prisma.SortOrder;
    vehicleNo?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type DeliveryPartnerCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DeliveryPartnerCreateWithoutUserInput, Prisma.DeliveryPartnerUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DeliveryPartnerCreateOrConnectWithoutUserInput;
    connect?: Prisma.DeliveryPartnerWhereUniqueInput;
};
export type DeliveryPartnerUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DeliveryPartnerCreateWithoutUserInput, Prisma.DeliveryPartnerUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DeliveryPartnerCreateOrConnectWithoutUserInput;
    connect?: Prisma.DeliveryPartnerWhereUniqueInput;
};
export type DeliveryPartnerUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DeliveryPartnerCreateWithoutUserInput, Prisma.DeliveryPartnerUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DeliveryPartnerCreateOrConnectWithoutUserInput;
    upsert?: Prisma.DeliveryPartnerUpsertWithoutUserInput;
    disconnect?: Prisma.DeliveryPartnerWhereInput | boolean;
    delete?: Prisma.DeliveryPartnerWhereInput | boolean;
    connect?: Prisma.DeliveryPartnerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DeliveryPartnerUpdateToOneWithWhereWithoutUserInput, Prisma.DeliveryPartnerUpdateWithoutUserInput>, Prisma.DeliveryPartnerUncheckedUpdateWithoutUserInput>;
};
export type DeliveryPartnerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DeliveryPartnerCreateWithoutUserInput, Prisma.DeliveryPartnerUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DeliveryPartnerCreateOrConnectWithoutUserInput;
    upsert?: Prisma.DeliveryPartnerUpsertWithoutUserInput;
    disconnect?: Prisma.DeliveryPartnerWhereInput | boolean;
    delete?: Prisma.DeliveryPartnerWhereInput | boolean;
    connect?: Prisma.DeliveryPartnerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DeliveryPartnerUpdateToOneWithWhereWithoutUserInput, Prisma.DeliveryPartnerUpdateWithoutUserInput>, Prisma.DeliveryPartnerUncheckedUpdateWithoutUserInput>;
};
export type DeliveryPartnerCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.DeliveryPartnerCreateWithoutOrdersInput, Prisma.DeliveryPartnerUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.DeliveryPartnerCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.DeliveryPartnerWhereUniqueInput;
};
export type DeliveryPartnerUpdateOneWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.DeliveryPartnerCreateWithoutOrdersInput, Prisma.DeliveryPartnerUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.DeliveryPartnerCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.DeliveryPartnerUpsertWithoutOrdersInput;
    disconnect?: Prisma.DeliveryPartnerWhereInput | boolean;
    delete?: Prisma.DeliveryPartnerWhereInput | boolean;
    connect?: Prisma.DeliveryPartnerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DeliveryPartnerUpdateToOneWithWhereWithoutOrdersInput, Prisma.DeliveryPartnerUpdateWithoutOrdersInput>, Prisma.DeliveryPartnerUncheckedUpdateWithoutOrdersInput>;
};
export type DeliveryPartnerCreateWithoutUserInput = {
    id?: string;
    vehicleType?: string | null;
    vehicleNo?: string | null;
    isActive?: boolean;
    orders?: Prisma.OrderCreateNestedManyWithoutDeliveryPartnerInput;
};
export type DeliveryPartnerUncheckedCreateWithoutUserInput = {
    id?: string;
    vehicleType?: string | null;
    vehicleNo?: string | null;
    isActive?: boolean;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutDeliveryPartnerInput;
};
export type DeliveryPartnerCreateOrConnectWithoutUserInput = {
    where: Prisma.DeliveryPartnerWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeliveryPartnerCreateWithoutUserInput, Prisma.DeliveryPartnerUncheckedCreateWithoutUserInput>;
};
export type DeliveryPartnerUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.DeliveryPartnerUpdateWithoutUserInput, Prisma.DeliveryPartnerUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.DeliveryPartnerCreateWithoutUserInput, Prisma.DeliveryPartnerUncheckedCreateWithoutUserInput>;
    where?: Prisma.DeliveryPartnerWhereInput;
};
export type DeliveryPartnerUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.DeliveryPartnerWhereInput;
    data: Prisma.XOR<Prisma.DeliveryPartnerUpdateWithoutUserInput, Prisma.DeliveryPartnerUncheckedUpdateWithoutUserInput>;
};
export type DeliveryPartnerUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vehicleNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    orders?: Prisma.OrderUpdateManyWithoutDeliveryPartnerNestedInput;
};
export type DeliveryPartnerUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vehicleNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutDeliveryPartnerNestedInput;
};
export type DeliveryPartnerCreateWithoutOrdersInput = {
    id?: string;
    vehicleType?: string | null;
    vehicleNo?: string | null;
    isActive?: boolean;
    user: Prisma.UserCreateNestedOneWithoutDeliveryPartnerInput;
};
export type DeliveryPartnerUncheckedCreateWithoutOrdersInput = {
    id?: string;
    userId: string;
    vehicleType?: string | null;
    vehicleNo?: string | null;
    isActive?: boolean;
};
export type DeliveryPartnerCreateOrConnectWithoutOrdersInput = {
    where: Prisma.DeliveryPartnerWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeliveryPartnerCreateWithoutOrdersInput, Prisma.DeliveryPartnerUncheckedCreateWithoutOrdersInput>;
};
export type DeliveryPartnerUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.DeliveryPartnerUpdateWithoutOrdersInput, Prisma.DeliveryPartnerUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.DeliveryPartnerCreateWithoutOrdersInput, Prisma.DeliveryPartnerUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.DeliveryPartnerWhereInput;
};
export type DeliveryPartnerUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.DeliveryPartnerWhereInput;
    data: Prisma.XOR<Prisma.DeliveryPartnerUpdateWithoutOrdersInput, Prisma.DeliveryPartnerUncheckedUpdateWithoutOrdersInput>;
};
export type DeliveryPartnerUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vehicleNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    user?: Prisma.UserUpdateOneRequiredWithoutDeliveryPartnerNestedInput;
};
export type DeliveryPartnerUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vehicleNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type DeliveryPartnerCountOutputType = {
    orders: number;
};
export type DeliveryPartnerCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    orders?: boolean | DeliveryPartnerCountOutputTypeCountOrdersArgs;
};
export type DeliveryPartnerCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryPartnerCountOutputTypeSelect<ExtArgs> | null;
};
export type DeliveryPartnerCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
export type DeliveryPartnerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    vehicleType?: boolean;
    vehicleNo?: boolean;
    isActive?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    orders?: boolean | Prisma.DeliveryPartner$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.DeliveryPartnerCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deliveryPartner"]>;
export type DeliveryPartnerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    vehicleType?: boolean;
    vehicleNo?: boolean;
    isActive?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deliveryPartner"]>;
export type DeliveryPartnerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    vehicleType?: boolean;
    vehicleNo?: boolean;
    isActive?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deliveryPartner"]>;
export type DeliveryPartnerSelectScalar = {
    id?: boolean;
    userId?: boolean;
    vehicleType?: boolean;
    vehicleNo?: boolean;
    isActive?: boolean;
};
export type DeliveryPartnerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "vehicleType" | "vehicleNo" | "isActive", ExtArgs["result"]["deliveryPartner"]>;
export type DeliveryPartnerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    orders?: boolean | Prisma.DeliveryPartner$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.DeliveryPartnerCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DeliveryPartnerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DeliveryPartnerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $DeliveryPartnerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DeliveryPartner";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        orders: Prisma.$OrderPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        vehicleType: string | null;
        vehicleNo: string | null;
        isActive: boolean;
    }, ExtArgs["result"]["deliveryPartner"]>;
    composites: {};
};
export type DeliveryPartnerGetPayload<S extends boolean | null | undefined | DeliveryPartnerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DeliveryPartnerPayload, S>;
export type DeliveryPartnerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DeliveryPartnerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DeliveryPartnerCountAggregateInputType | true;
};
export interface DeliveryPartnerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DeliveryPartner'];
        meta: {
            name: 'DeliveryPartner';
        };
    };
    findUnique<T extends DeliveryPartnerFindUniqueArgs>(args: Prisma.SelectSubset<T, DeliveryPartnerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DeliveryPartnerClient<runtime.Types.Result.GetResult<Prisma.$DeliveryPartnerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DeliveryPartnerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DeliveryPartnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeliveryPartnerClient<runtime.Types.Result.GetResult<Prisma.$DeliveryPartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DeliveryPartnerFindFirstArgs>(args?: Prisma.SelectSubset<T, DeliveryPartnerFindFirstArgs<ExtArgs>>): Prisma.Prisma__DeliveryPartnerClient<runtime.Types.Result.GetResult<Prisma.$DeliveryPartnerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DeliveryPartnerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DeliveryPartnerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeliveryPartnerClient<runtime.Types.Result.GetResult<Prisma.$DeliveryPartnerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DeliveryPartnerFindManyArgs>(args?: Prisma.SelectSubset<T, DeliveryPartnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeliveryPartnerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DeliveryPartnerCreateArgs>(args: Prisma.SelectSubset<T, DeliveryPartnerCreateArgs<ExtArgs>>): Prisma.Prisma__DeliveryPartnerClient<runtime.Types.Result.GetResult<Prisma.$DeliveryPartnerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DeliveryPartnerCreateManyArgs>(args?: Prisma.SelectSubset<T, DeliveryPartnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DeliveryPartnerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DeliveryPartnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeliveryPartnerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DeliveryPartnerDeleteArgs>(args: Prisma.SelectSubset<T, DeliveryPartnerDeleteArgs<ExtArgs>>): Prisma.Prisma__DeliveryPartnerClient<runtime.Types.Result.GetResult<Prisma.$DeliveryPartnerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DeliveryPartnerUpdateArgs>(args: Prisma.SelectSubset<T, DeliveryPartnerUpdateArgs<ExtArgs>>): Prisma.Prisma__DeliveryPartnerClient<runtime.Types.Result.GetResult<Prisma.$DeliveryPartnerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DeliveryPartnerDeleteManyArgs>(args?: Prisma.SelectSubset<T, DeliveryPartnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DeliveryPartnerUpdateManyArgs>(args: Prisma.SelectSubset<T, DeliveryPartnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DeliveryPartnerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DeliveryPartnerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeliveryPartnerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DeliveryPartnerUpsertArgs>(args: Prisma.SelectSubset<T, DeliveryPartnerUpsertArgs<ExtArgs>>): Prisma.Prisma__DeliveryPartnerClient<runtime.Types.Result.GetResult<Prisma.$DeliveryPartnerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DeliveryPartnerCountArgs>(args?: Prisma.Subset<T, DeliveryPartnerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DeliveryPartnerCountAggregateOutputType> : number>;
    aggregate<T extends DeliveryPartnerAggregateArgs>(args: Prisma.Subset<T, DeliveryPartnerAggregateArgs>): Prisma.PrismaPromise<GetDeliveryPartnerAggregateType<T>>;
    groupBy<T extends DeliveryPartnerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DeliveryPartnerGroupByArgs['orderBy'];
    } : {
        orderBy?: DeliveryPartnerGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DeliveryPartnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeliveryPartnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DeliveryPartnerFieldRefs;
}
export interface Prisma__DeliveryPartnerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    orders<T extends Prisma.DeliveryPartner$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DeliveryPartner$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DeliveryPartnerFieldRefs {
    readonly id: Prisma.FieldRef<"DeliveryPartner", 'String'>;
    readonly userId: Prisma.FieldRef<"DeliveryPartner", 'String'>;
    readonly vehicleType: Prisma.FieldRef<"DeliveryPartner", 'String'>;
    readonly vehicleNo: Prisma.FieldRef<"DeliveryPartner", 'String'>;
    readonly isActive: Prisma.FieldRef<"DeliveryPartner", 'Boolean'>;
}
export type DeliveryPartnerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryPartnerSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryPartnerOmit<ExtArgs> | null;
    include?: Prisma.DeliveryPartnerInclude<ExtArgs> | null;
    where: Prisma.DeliveryPartnerWhereUniqueInput;
};
export type DeliveryPartnerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryPartnerSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryPartnerOmit<ExtArgs> | null;
    include?: Prisma.DeliveryPartnerInclude<ExtArgs> | null;
    where: Prisma.DeliveryPartnerWhereUniqueInput;
};
export type DeliveryPartnerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryPartnerSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryPartnerOmit<ExtArgs> | null;
    include?: Prisma.DeliveryPartnerInclude<ExtArgs> | null;
    where?: Prisma.DeliveryPartnerWhereInput;
    orderBy?: Prisma.DeliveryPartnerOrderByWithRelationInput | Prisma.DeliveryPartnerOrderByWithRelationInput[];
    cursor?: Prisma.DeliveryPartnerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeliveryPartnerScalarFieldEnum | Prisma.DeliveryPartnerScalarFieldEnum[];
};
export type DeliveryPartnerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryPartnerSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryPartnerOmit<ExtArgs> | null;
    include?: Prisma.DeliveryPartnerInclude<ExtArgs> | null;
    where?: Prisma.DeliveryPartnerWhereInput;
    orderBy?: Prisma.DeliveryPartnerOrderByWithRelationInput | Prisma.DeliveryPartnerOrderByWithRelationInput[];
    cursor?: Prisma.DeliveryPartnerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeliveryPartnerScalarFieldEnum | Prisma.DeliveryPartnerScalarFieldEnum[];
};
export type DeliveryPartnerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryPartnerSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryPartnerOmit<ExtArgs> | null;
    include?: Prisma.DeliveryPartnerInclude<ExtArgs> | null;
    where?: Prisma.DeliveryPartnerWhereInput;
    orderBy?: Prisma.DeliveryPartnerOrderByWithRelationInput | Prisma.DeliveryPartnerOrderByWithRelationInput[];
    cursor?: Prisma.DeliveryPartnerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeliveryPartnerScalarFieldEnum | Prisma.DeliveryPartnerScalarFieldEnum[];
};
export type DeliveryPartnerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryPartnerSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryPartnerOmit<ExtArgs> | null;
    include?: Prisma.DeliveryPartnerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeliveryPartnerCreateInput, Prisma.DeliveryPartnerUncheckedCreateInput>;
};
export type DeliveryPartnerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DeliveryPartnerCreateManyInput | Prisma.DeliveryPartnerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DeliveryPartnerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryPartnerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeliveryPartnerOmit<ExtArgs> | null;
    data: Prisma.DeliveryPartnerCreateManyInput | Prisma.DeliveryPartnerCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DeliveryPartnerIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DeliveryPartnerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryPartnerSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryPartnerOmit<ExtArgs> | null;
    include?: Prisma.DeliveryPartnerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeliveryPartnerUpdateInput, Prisma.DeliveryPartnerUncheckedUpdateInput>;
    where: Prisma.DeliveryPartnerWhereUniqueInput;
};
export type DeliveryPartnerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DeliveryPartnerUpdateManyMutationInput, Prisma.DeliveryPartnerUncheckedUpdateManyInput>;
    where?: Prisma.DeliveryPartnerWhereInput;
    limit?: number;
};
export type DeliveryPartnerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryPartnerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeliveryPartnerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeliveryPartnerUpdateManyMutationInput, Prisma.DeliveryPartnerUncheckedUpdateManyInput>;
    where?: Prisma.DeliveryPartnerWhereInput;
    limit?: number;
    include?: Prisma.DeliveryPartnerIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DeliveryPartnerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryPartnerSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryPartnerOmit<ExtArgs> | null;
    include?: Prisma.DeliveryPartnerInclude<ExtArgs> | null;
    where: Prisma.DeliveryPartnerWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeliveryPartnerCreateInput, Prisma.DeliveryPartnerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DeliveryPartnerUpdateInput, Prisma.DeliveryPartnerUncheckedUpdateInput>;
};
export type DeliveryPartnerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryPartnerSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryPartnerOmit<ExtArgs> | null;
    include?: Prisma.DeliveryPartnerInclude<ExtArgs> | null;
    where: Prisma.DeliveryPartnerWhereUniqueInput;
};
export type DeliveryPartnerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeliveryPartnerWhereInput;
    limit?: number;
};
export type DeliveryPartner$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type DeliveryPartnerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryPartnerSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryPartnerOmit<ExtArgs> | null;
    include?: Prisma.DeliveryPartnerInclude<ExtArgs> | null;
};
