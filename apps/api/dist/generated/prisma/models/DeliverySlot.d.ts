import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DeliverySlotModel = runtime.Types.Result.DefaultSelection<Prisma.$DeliverySlotPayload>;
export type AggregateDeliverySlot = {
    _count: DeliverySlotCountAggregateOutputType | null;
    _avg: DeliverySlotAvgAggregateOutputType | null;
    _sum: DeliverySlotSumAggregateOutputType | null;
    _min: DeliverySlotMinAggregateOutputType | null;
    _max: DeliverySlotMaxAggregateOutputType | null;
};
export type DeliverySlotAvgAggregateOutputType = {
    fee: number | null;
};
export type DeliverySlotSumAggregateOutputType = {
    fee: number | null;
};
export type DeliverySlotMinAggregateOutputType = {
    id: string | null;
    label: string | null;
    startTime: string | null;
    endTime: string | null;
    type: string | null;
    isActive: boolean | null;
    fee: number | null;
};
export type DeliverySlotMaxAggregateOutputType = {
    id: string | null;
    label: string | null;
    startTime: string | null;
    endTime: string | null;
    type: string | null;
    isActive: boolean | null;
    fee: number | null;
};
export type DeliverySlotCountAggregateOutputType = {
    id: number;
    label: number;
    startTime: number;
    endTime: number;
    type: number;
    isActive: number;
    fee: number;
    _all: number;
};
export type DeliverySlotAvgAggregateInputType = {
    fee?: true;
};
export type DeliverySlotSumAggregateInputType = {
    fee?: true;
};
export type DeliverySlotMinAggregateInputType = {
    id?: true;
    label?: true;
    startTime?: true;
    endTime?: true;
    type?: true;
    isActive?: true;
    fee?: true;
};
export type DeliverySlotMaxAggregateInputType = {
    id?: true;
    label?: true;
    startTime?: true;
    endTime?: true;
    type?: true;
    isActive?: true;
    fee?: true;
};
export type DeliverySlotCountAggregateInputType = {
    id?: true;
    label?: true;
    startTime?: true;
    endTime?: true;
    type?: true;
    isActive?: true;
    fee?: true;
    _all?: true;
};
export type DeliverySlotAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeliverySlotWhereInput;
    orderBy?: Prisma.DeliverySlotOrderByWithRelationInput | Prisma.DeliverySlotOrderByWithRelationInput[];
    cursor?: Prisma.DeliverySlotWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DeliverySlotCountAggregateInputType;
    _avg?: DeliverySlotAvgAggregateInputType;
    _sum?: DeliverySlotSumAggregateInputType;
    _min?: DeliverySlotMinAggregateInputType;
    _max?: DeliverySlotMaxAggregateInputType;
};
export type GetDeliverySlotAggregateType<T extends DeliverySlotAggregateArgs> = {
    [P in keyof T & keyof AggregateDeliverySlot]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDeliverySlot[P]> : Prisma.GetScalarType<T[P], AggregateDeliverySlot[P]>;
};
export type DeliverySlotGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeliverySlotWhereInput;
    orderBy?: Prisma.DeliverySlotOrderByWithAggregationInput | Prisma.DeliverySlotOrderByWithAggregationInput[];
    by: Prisma.DeliverySlotScalarFieldEnum[] | Prisma.DeliverySlotScalarFieldEnum;
    having?: Prisma.DeliverySlotScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DeliverySlotCountAggregateInputType | true;
    _avg?: DeliverySlotAvgAggregateInputType;
    _sum?: DeliverySlotSumAggregateInputType;
    _min?: DeliverySlotMinAggregateInputType;
    _max?: DeliverySlotMaxAggregateInputType;
};
export type DeliverySlotGroupByOutputType = {
    id: string;
    label: string;
    startTime: string;
    endTime: string;
    type: string;
    isActive: boolean;
    fee: number;
    _count: DeliverySlotCountAggregateOutputType | null;
    _avg: DeliverySlotAvgAggregateOutputType | null;
    _sum: DeliverySlotSumAggregateOutputType | null;
    _min: DeliverySlotMinAggregateOutputType | null;
    _max: DeliverySlotMaxAggregateOutputType | null;
};
export type GetDeliverySlotGroupByPayload<T extends DeliverySlotGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DeliverySlotGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DeliverySlotGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DeliverySlotGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DeliverySlotGroupByOutputType[P]>;
}>>;
export type DeliverySlotWhereInput = {
    AND?: Prisma.DeliverySlotWhereInput | Prisma.DeliverySlotWhereInput[];
    OR?: Prisma.DeliverySlotWhereInput[];
    NOT?: Prisma.DeliverySlotWhereInput | Prisma.DeliverySlotWhereInput[];
    id?: Prisma.StringFilter<"DeliverySlot"> | string;
    label?: Prisma.StringFilter<"DeliverySlot"> | string;
    startTime?: Prisma.StringFilter<"DeliverySlot"> | string;
    endTime?: Prisma.StringFilter<"DeliverySlot"> | string;
    type?: Prisma.StringFilter<"DeliverySlot"> | string;
    isActive?: Prisma.BoolFilter<"DeliverySlot"> | boolean;
    fee?: Prisma.FloatFilter<"DeliverySlot"> | number;
    orders?: Prisma.OrderListRelationFilter;
};
export type DeliverySlotOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    fee?: Prisma.SortOrder;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
};
export type DeliverySlotWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DeliverySlotWhereInput | Prisma.DeliverySlotWhereInput[];
    OR?: Prisma.DeliverySlotWhereInput[];
    NOT?: Prisma.DeliverySlotWhereInput | Prisma.DeliverySlotWhereInput[];
    label?: Prisma.StringFilter<"DeliverySlot"> | string;
    startTime?: Prisma.StringFilter<"DeliverySlot"> | string;
    endTime?: Prisma.StringFilter<"DeliverySlot"> | string;
    type?: Prisma.StringFilter<"DeliverySlot"> | string;
    isActive?: Prisma.BoolFilter<"DeliverySlot"> | boolean;
    fee?: Prisma.FloatFilter<"DeliverySlot"> | number;
    orders?: Prisma.OrderListRelationFilter;
}, "id">;
export type DeliverySlotOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    fee?: Prisma.SortOrder;
    _count?: Prisma.DeliverySlotCountOrderByAggregateInput;
    _avg?: Prisma.DeliverySlotAvgOrderByAggregateInput;
    _max?: Prisma.DeliverySlotMaxOrderByAggregateInput;
    _min?: Prisma.DeliverySlotMinOrderByAggregateInput;
    _sum?: Prisma.DeliverySlotSumOrderByAggregateInput;
};
export type DeliverySlotScalarWhereWithAggregatesInput = {
    AND?: Prisma.DeliverySlotScalarWhereWithAggregatesInput | Prisma.DeliverySlotScalarWhereWithAggregatesInput[];
    OR?: Prisma.DeliverySlotScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DeliverySlotScalarWhereWithAggregatesInput | Prisma.DeliverySlotScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DeliverySlot"> | string;
    label?: Prisma.StringWithAggregatesFilter<"DeliverySlot"> | string;
    startTime?: Prisma.StringWithAggregatesFilter<"DeliverySlot"> | string;
    endTime?: Prisma.StringWithAggregatesFilter<"DeliverySlot"> | string;
    type?: Prisma.StringWithAggregatesFilter<"DeliverySlot"> | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"DeliverySlot"> | boolean;
    fee?: Prisma.FloatWithAggregatesFilter<"DeliverySlot"> | number;
};
export type DeliverySlotCreateInput = {
    id?: string;
    label: string;
    startTime: string;
    endTime: string;
    type?: string;
    isActive?: boolean;
    fee?: number;
    orders?: Prisma.OrderCreateNestedManyWithoutDeliverySlotInput;
};
export type DeliverySlotUncheckedCreateInput = {
    id?: string;
    label: string;
    startTime: string;
    endTime: string;
    type?: string;
    isActive?: boolean;
    fee?: number;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutDeliverySlotInput;
};
export type DeliverySlotUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fee?: Prisma.FloatFieldUpdateOperationsInput | number;
    orders?: Prisma.OrderUpdateManyWithoutDeliverySlotNestedInput;
};
export type DeliverySlotUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fee?: Prisma.FloatFieldUpdateOperationsInput | number;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutDeliverySlotNestedInput;
};
export type DeliverySlotCreateManyInput = {
    id?: string;
    label: string;
    startTime: string;
    endTime: string;
    type?: string;
    isActive?: boolean;
    fee?: number;
};
export type DeliverySlotUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fee?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type DeliverySlotUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fee?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type DeliverySlotNullableScalarRelationFilter = {
    is?: Prisma.DeliverySlotWhereInput | null;
    isNot?: Prisma.DeliverySlotWhereInput | null;
};
export type DeliverySlotCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    fee?: Prisma.SortOrder;
};
export type DeliverySlotAvgOrderByAggregateInput = {
    fee?: Prisma.SortOrder;
};
export type DeliverySlotMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    fee?: Prisma.SortOrder;
};
export type DeliverySlotMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    fee?: Prisma.SortOrder;
};
export type DeliverySlotSumOrderByAggregateInput = {
    fee?: Prisma.SortOrder;
};
export type DeliverySlotCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.DeliverySlotCreateWithoutOrdersInput, Prisma.DeliverySlotUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.DeliverySlotCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.DeliverySlotWhereUniqueInput;
};
export type DeliverySlotUpdateOneWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.DeliverySlotCreateWithoutOrdersInput, Prisma.DeliverySlotUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.DeliverySlotCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.DeliverySlotUpsertWithoutOrdersInput;
    disconnect?: Prisma.DeliverySlotWhereInput | boolean;
    delete?: Prisma.DeliverySlotWhereInput | boolean;
    connect?: Prisma.DeliverySlotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DeliverySlotUpdateToOneWithWhereWithoutOrdersInput, Prisma.DeliverySlotUpdateWithoutOrdersInput>, Prisma.DeliverySlotUncheckedUpdateWithoutOrdersInput>;
};
export type DeliverySlotCreateWithoutOrdersInput = {
    id?: string;
    label: string;
    startTime: string;
    endTime: string;
    type?: string;
    isActive?: boolean;
    fee?: number;
};
export type DeliverySlotUncheckedCreateWithoutOrdersInput = {
    id?: string;
    label: string;
    startTime: string;
    endTime: string;
    type?: string;
    isActive?: boolean;
    fee?: number;
};
export type DeliverySlotCreateOrConnectWithoutOrdersInput = {
    where: Prisma.DeliverySlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeliverySlotCreateWithoutOrdersInput, Prisma.DeliverySlotUncheckedCreateWithoutOrdersInput>;
};
export type DeliverySlotUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.DeliverySlotUpdateWithoutOrdersInput, Prisma.DeliverySlotUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.DeliverySlotCreateWithoutOrdersInput, Prisma.DeliverySlotUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.DeliverySlotWhereInput;
};
export type DeliverySlotUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.DeliverySlotWhereInput;
    data: Prisma.XOR<Prisma.DeliverySlotUpdateWithoutOrdersInput, Prisma.DeliverySlotUncheckedUpdateWithoutOrdersInput>;
};
export type DeliverySlotUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fee?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type DeliverySlotUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    fee?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type DeliverySlotCountOutputType = {
    orders: number;
};
export type DeliverySlotCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    orders?: boolean | DeliverySlotCountOutputTypeCountOrdersArgs;
};
export type DeliverySlotCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliverySlotCountOutputTypeSelect<ExtArgs> | null;
};
export type DeliverySlotCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
export type DeliverySlotSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    label?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    type?: boolean;
    isActive?: boolean;
    fee?: boolean;
    orders?: boolean | Prisma.DeliverySlot$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.DeliverySlotCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deliverySlot"]>;
export type DeliverySlotSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    label?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    type?: boolean;
    isActive?: boolean;
    fee?: boolean;
}, ExtArgs["result"]["deliverySlot"]>;
export type DeliverySlotSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    label?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    type?: boolean;
    isActive?: boolean;
    fee?: boolean;
}, ExtArgs["result"]["deliverySlot"]>;
export type DeliverySlotSelectScalar = {
    id?: boolean;
    label?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    type?: boolean;
    isActive?: boolean;
    fee?: boolean;
};
export type DeliverySlotOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "label" | "startTime" | "endTime" | "type" | "isActive" | "fee", ExtArgs["result"]["deliverySlot"]>;
export type DeliverySlotInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    orders?: boolean | Prisma.DeliverySlot$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.DeliverySlotCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DeliverySlotIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type DeliverySlotIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $DeliverySlotPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DeliverySlot";
    objects: {
        orders: Prisma.$OrderPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        label: string;
        startTime: string;
        endTime: string;
        type: string;
        isActive: boolean;
        fee: number;
    }, ExtArgs["result"]["deliverySlot"]>;
    composites: {};
};
export type DeliverySlotGetPayload<S extends boolean | null | undefined | DeliverySlotDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DeliverySlotPayload, S>;
export type DeliverySlotCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DeliverySlotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DeliverySlotCountAggregateInputType | true;
};
export interface DeliverySlotDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DeliverySlot'];
        meta: {
            name: 'DeliverySlot';
        };
    };
    findUnique<T extends DeliverySlotFindUniqueArgs>(args: Prisma.SelectSubset<T, DeliverySlotFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DeliverySlotClient<runtime.Types.Result.GetResult<Prisma.$DeliverySlotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DeliverySlotFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DeliverySlotFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeliverySlotClient<runtime.Types.Result.GetResult<Prisma.$DeliverySlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DeliverySlotFindFirstArgs>(args?: Prisma.SelectSubset<T, DeliverySlotFindFirstArgs<ExtArgs>>): Prisma.Prisma__DeliverySlotClient<runtime.Types.Result.GetResult<Prisma.$DeliverySlotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DeliverySlotFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DeliverySlotFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeliverySlotClient<runtime.Types.Result.GetResult<Prisma.$DeliverySlotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DeliverySlotFindManyArgs>(args?: Prisma.SelectSubset<T, DeliverySlotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeliverySlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DeliverySlotCreateArgs>(args: Prisma.SelectSubset<T, DeliverySlotCreateArgs<ExtArgs>>): Prisma.Prisma__DeliverySlotClient<runtime.Types.Result.GetResult<Prisma.$DeliverySlotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DeliverySlotCreateManyArgs>(args?: Prisma.SelectSubset<T, DeliverySlotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DeliverySlotCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DeliverySlotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeliverySlotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DeliverySlotDeleteArgs>(args: Prisma.SelectSubset<T, DeliverySlotDeleteArgs<ExtArgs>>): Prisma.Prisma__DeliverySlotClient<runtime.Types.Result.GetResult<Prisma.$DeliverySlotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DeliverySlotUpdateArgs>(args: Prisma.SelectSubset<T, DeliverySlotUpdateArgs<ExtArgs>>): Prisma.Prisma__DeliverySlotClient<runtime.Types.Result.GetResult<Prisma.$DeliverySlotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DeliverySlotDeleteManyArgs>(args?: Prisma.SelectSubset<T, DeliverySlotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DeliverySlotUpdateManyArgs>(args: Prisma.SelectSubset<T, DeliverySlotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DeliverySlotUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DeliverySlotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeliverySlotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DeliverySlotUpsertArgs>(args: Prisma.SelectSubset<T, DeliverySlotUpsertArgs<ExtArgs>>): Prisma.Prisma__DeliverySlotClient<runtime.Types.Result.GetResult<Prisma.$DeliverySlotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DeliverySlotCountArgs>(args?: Prisma.Subset<T, DeliverySlotCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DeliverySlotCountAggregateOutputType> : number>;
    aggregate<T extends DeliverySlotAggregateArgs>(args: Prisma.Subset<T, DeliverySlotAggregateArgs>): Prisma.PrismaPromise<GetDeliverySlotAggregateType<T>>;
    groupBy<T extends DeliverySlotGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DeliverySlotGroupByArgs['orderBy'];
    } : {
        orderBy?: DeliverySlotGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DeliverySlotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeliverySlotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DeliverySlotFieldRefs;
}
export interface Prisma__DeliverySlotClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    orders<T extends Prisma.DeliverySlot$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DeliverySlot$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DeliverySlotFieldRefs {
    readonly id: Prisma.FieldRef<"DeliverySlot", 'String'>;
    readonly label: Prisma.FieldRef<"DeliverySlot", 'String'>;
    readonly startTime: Prisma.FieldRef<"DeliverySlot", 'String'>;
    readonly endTime: Prisma.FieldRef<"DeliverySlot", 'String'>;
    readonly type: Prisma.FieldRef<"DeliverySlot", 'String'>;
    readonly isActive: Prisma.FieldRef<"DeliverySlot", 'Boolean'>;
    readonly fee: Prisma.FieldRef<"DeliverySlot", 'Float'>;
}
export type DeliverySlotFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliverySlotSelect<ExtArgs> | null;
    omit?: Prisma.DeliverySlotOmit<ExtArgs> | null;
    include?: Prisma.DeliverySlotInclude<ExtArgs> | null;
    where: Prisma.DeliverySlotWhereUniqueInput;
};
export type DeliverySlotFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliverySlotSelect<ExtArgs> | null;
    omit?: Prisma.DeliverySlotOmit<ExtArgs> | null;
    include?: Prisma.DeliverySlotInclude<ExtArgs> | null;
    where: Prisma.DeliverySlotWhereUniqueInput;
};
export type DeliverySlotFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliverySlotSelect<ExtArgs> | null;
    omit?: Prisma.DeliverySlotOmit<ExtArgs> | null;
    include?: Prisma.DeliverySlotInclude<ExtArgs> | null;
    where?: Prisma.DeliverySlotWhereInput;
    orderBy?: Prisma.DeliverySlotOrderByWithRelationInput | Prisma.DeliverySlotOrderByWithRelationInput[];
    cursor?: Prisma.DeliverySlotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeliverySlotScalarFieldEnum | Prisma.DeliverySlotScalarFieldEnum[];
};
export type DeliverySlotFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliverySlotSelect<ExtArgs> | null;
    omit?: Prisma.DeliverySlotOmit<ExtArgs> | null;
    include?: Prisma.DeliverySlotInclude<ExtArgs> | null;
    where?: Prisma.DeliverySlotWhereInput;
    orderBy?: Prisma.DeliverySlotOrderByWithRelationInput | Prisma.DeliverySlotOrderByWithRelationInput[];
    cursor?: Prisma.DeliverySlotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeliverySlotScalarFieldEnum | Prisma.DeliverySlotScalarFieldEnum[];
};
export type DeliverySlotFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliverySlotSelect<ExtArgs> | null;
    omit?: Prisma.DeliverySlotOmit<ExtArgs> | null;
    include?: Prisma.DeliverySlotInclude<ExtArgs> | null;
    where?: Prisma.DeliverySlotWhereInput;
    orderBy?: Prisma.DeliverySlotOrderByWithRelationInput | Prisma.DeliverySlotOrderByWithRelationInput[];
    cursor?: Prisma.DeliverySlotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeliverySlotScalarFieldEnum | Prisma.DeliverySlotScalarFieldEnum[];
};
export type DeliverySlotCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliverySlotSelect<ExtArgs> | null;
    omit?: Prisma.DeliverySlotOmit<ExtArgs> | null;
    include?: Prisma.DeliverySlotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeliverySlotCreateInput, Prisma.DeliverySlotUncheckedCreateInput>;
};
export type DeliverySlotCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DeliverySlotCreateManyInput | Prisma.DeliverySlotCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DeliverySlotCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliverySlotSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeliverySlotOmit<ExtArgs> | null;
    data: Prisma.DeliverySlotCreateManyInput | Prisma.DeliverySlotCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DeliverySlotUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliverySlotSelect<ExtArgs> | null;
    omit?: Prisma.DeliverySlotOmit<ExtArgs> | null;
    include?: Prisma.DeliverySlotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeliverySlotUpdateInput, Prisma.DeliverySlotUncheckedUpdateInput>;
    where: Prisma.DeliverySlotWhereUniqueInput;
};
export type DeliverySlotUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DeliverySlotUpdateManyMutationInput, Prisma.DeliverySlotUncheckedUpdateManyInput>;
    where?: Prisma.DeliverySlotWhereInput;
    limit?: number;
};
export type DeliverySlotUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliverySlotSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeliverySlotOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeliverySlotUpdateManyMutationInput, Prisma.DeliverySlotUncheckedUpdateManyInput>;
    where?: Prisma.DeliverySlotWhereInput;
    limit?: number;
};
export type DeliverySlotUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliverySlotSelect<ExtArgs> | null;
    omit?: Prisma.DeliverySlotOmit<ExtArgs> | null;
    include?: Prisma.DeliverySlotInclude<ExtArgs> | null;
    where: Prisma.DeliverySlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeliverySlotCreateInput, Prisma.DeliverySlotUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DeliverySlotUpdateInput, Prisma.DeliverySlotUncheckedUpdateInput>;
};
export type DeliverySlotDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliverySlotSelect<ExtArgs> | null;
    omit?: Prisma.DeliverySlotOmit<ExtArgs> | null;
    include?: Prisma.DeliverySlotInclude<ExtArgs> | null;
    where: Prisma.DeliverySlotWhereUniqueInput;
};
export type DeliverySlotDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeliverySlotWhereInput;
    limit?: number;
};
export type DeliverySlot$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type DeliverySlotDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliverySlotSelect<ExtArgs> | null;
    omit?: Prisma.DeliverySlotOmit<ExtArgs> | null;
    include?: Prisma.DeliverySlotInclude<ExtArgs> | null;
};
