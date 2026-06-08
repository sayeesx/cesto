import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DeliveryProofModel = runtime.Types.Result.DefaultSelection<Prisma.$DeliveryProofPayload>;
export type AggregateDeliveryProof = {
    _count: DeliveryProofCountAggregateOutputType | null;
    _min: DeliveryProofMinAggregateOutputType | null;
    _max: DeliveryProofMaxAggregateOutputType | null;
};
export type DeliveryProofMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    imageUrl: string | null;
    notes: string | null;
    uploadedAt: Date | null;
};
export type DeliveryProofMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    imageUrl: string | null;
    notes: string | null;
    uploadedAt: Date | null;
};
export type DeliveryProofCountAggregateOutputType = {
    id: number;
    orderId: number;
    imageUrl: number;
    notes: number;
    uploadedAt: number;
    _all: number;
};
export type DeliveryProofMinAggregateInputType = {
    id?: true;
    orderId?: true;
    imageUrl?: true;
    notes?: true;
    uploadedAt?: true;
};
export type DeliveryProofMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    imageUrl?: true;
    notes?: true;
    uploadedAt?: true;
};
export type DeliveryProofCountAggregateInputType = {
    id?: true;
    orderId?: true;
    imageUrl?: true;
    notes?: true;
    uploadedAt?: true;
    _all?: true;
};
export type DeliveryProofAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeliveryProofWhereInput;
    orderBy?: Prisma.DeliveryProofOrderByWithRelationInput | Prisma.DeliveryProofOrderByWithRelationInput[];
    cursor?: Prisma.DeliveryProofWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DeliveryProofCountAggregateInputType;
    _min?: DeliveryProofMinAggregateInputType;
    _max?: DeliveryProofMaxAggregateInputType;
};
export type GetDeliveryProofAggregateType<T extends DeliveryProofAggregateArgs> = {
    [P in keyof T & keyof AggregateDeliveryProof]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDeliveryProof[P]> : Prisma.GetScalarType<T[P], AggregateDeliveryProof[P]>;
};
export type DeliveryProofGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeliveryProofWhereInput;
    orderBy?: Prisma.DeliveryProofOrderByWithAggregationInput | Prisma.DeliveryProofOrderByWithAggregationInput[];
    by: Prisma.DeliveryProofScalarFieldEnum[] | Prisma.DeliveryProofScalarFieldEnum;
    having?: Prisma.DeliveryProofScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DeliveryProofCountAggregateInputType | true;
    _min?: DeliveryProofMinAggregateInputType;
    _max?: DeliveryProofMaxAggregateInputType;
};
export type DeliveryProofGroupByOutputType = {
    id: string;
    orderId: string;
    imageUrl: string;
    notes: string | null;
    uploadedAt: Date;
    _count: DeliveryProofCountAggregateOutputType | null;
    _min: DeliveryProofMinAggregateOutputType | null;
    _max: DeliveryProofMaxAggregateOutputType | null;
};
export type GetDeliveryProofGroupByPayload<T extends DeliveryProofGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DeliveryProofGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DeliveryProofGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DeliveryProofGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DeliveryProofGroupByOutputType[P]>;
}>>;
export type DeliveryProofWhereInput = {
    AND?: Prisma.DeliveryProofWhereInput | Prisma.DeliveryProofWhereInput[];
    OR?: Prisma.DeliveryProofWhereInput[];
    NOT?: Prisma.DeliveryProofWhereInput | Prisma.DeliveryProofWhereInput[];
    id?: Prisma.StringFilter<"DeliveryProof"> | string;
    orderId?: Prisma.StringFilter<"DeliveryProof"> | string;
    imageUrl?: Prisma.StringFilter<"DeliveryProof"> | string;
    notes?: Prisma.StringNullableFilter<"DeliveryProof"> | string | null;
    uploadedAt?: Prisma.DateTimeFilter<"DeliveryProof"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
};
export type DeliveryProofOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
    order?: Prisma.OrderOrderByWithRelationInput;
};
export type DeliveryProofWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    orderId?: string;
    AND?: Prisma.DeliveryProofWhereInput | Prisma.DeliveryProofWhereInput[];
    OR?: Prisma.DeliveryProofWhereInput[];
    NOT?: Prisma.DeliveryProofWhereInput | Prisma.DeliveryProofWhereInput[];
    imageUrl?: Prisma.StringFilter<"DeliveryProof"> | string;
    notes?: Prisma.StringNullableFilter<"DeliveryProof"> | string | null;
    uploadedAt?: Prisma.DateTimeFilter<"DeliveryProof"> | Date | string;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
}, "id" | "orderId">;
export type DeliveryProofOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
    _count?: Prisma.DeliveryProofCountOrderByAggregateInput;
    _max?: Prisma.DeliveryProofMaxOrderByAggregateInput;
    _min?: Prisma.DeliveryProofMinOrderByAggregateInput;
};
export type DeliveryProofScalarWhereWithAggregatesInput = {
    AND?: Prisma.DeliveryProofScalarWhereWithAggregatesInput | Prisma.DeliveryProofScalarWhereWithAggregatesInput[];
    OR?: Prisma.DeliveryProofScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DeliveryProofScalarWhereWithAggregatesInput | Prisma.DeliveryProofScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DeliveryProof"> | string;
    orderId?: Prisma.StringWithAggregatesFilter<"DeliveryProof"> | string;
    imageUrl?: Prisma.StringWithAggregatesFilter<"DeliveryProof"> | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"DeliveryProof"> | string | null;
    uploadedAt?: Prisma.DateTimeWithAggregatesFilter<"DeliveryProof"> | Date | string;
};
export type DeliveryProofCreateInput = {
    id?: string;
    imageUrl: string;
    notes?: string | null;
    uploadedAt?: Date | string;
    order: Prisma.OrderCreateNestedOneWithoutDeliveryProofInput;
};
export type DeliveryProofUncheckedCreateInput = {
    id?: string;
    orderId: string;
    imageUrl: string;
    notes?: string | null;
    uploadedAt?: Date | string;
};
export type DeliveryProofUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    order?: Prisma.OrderUpdateOneRequiredWithoutDeliveryProofNestedInput;
};
export type DeliveryProofUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeliveryProofCreateManyInput = {
    id?: string;
    orderId: string;
    imageUrl: string;
    notes?: string | null;
    uploadedAt?: Date | string;
};
export type DeliveryProofUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeliveryProofUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeliveryProofNullableScalarRelationFilter = {
    is?: Prisma.DeliveryProofWhereInput | null;
    isNot?: Prisma.DeliveryProofWhereInput | null;
};
export type DeliveryProofCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
};
export type DeliveryProofMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
};
export type DeliveryProofMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
};
export type DeliveryProofCreateNestedOneWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.DeliveryProofCreateWithoutOrderInput, Prisma.DeliveryProofUncheckedCreateWithoutOrderInput>;
    connectOrCreate?: Prisma.DeliveryProofCreateOrConnectWithoutOrderInput;
    connect?: Prisma.DeliveryProofWhereUniqueInput;
};
export type DeliveryProofUncheckedCreateNestedOneWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.DeliveryProofCreateWithoutOrderInput, Prisma.DeliveryProofUncheckedCreateWithoutOrderInput>;
    connectOrCreate?: Prisma.DeliveryProofCreateOrConnectWithoutOrderInput;
    connect?: Prisma.DeliveryProofWhereUniqueInput;
};
export type DeliveryProofUpdateOneWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.DeliveryProofCreateWithoutOrderInput, Prisma.DeliveryProofUncheckedCreateWithoutOrderInput>;
    connectOrCreate?: Prisma.DeliveryProofCreateOrConnectWithoutOrderInput;
    upsert?: Prisma.DeliveryProofUpsertWithoutOrderInput;
    disconnect?: Prisma.DeliveryProofWhereInput | boolean;
    delete?: Prisma.DeliveryProofWhereInput | boolean;
    connect?: Prisma.DeliveryProofWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DeliveryProofUpdateToOneWithWhereWithoutOrderInput, Prisma.DeliveryProofUpdateWithoutOrderInput>, Prisma.DeliveryProofUncheckedUpdateWithoutOrderInput>;
};
export type DeliveryProofUncheckedUpdateOneWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.DeliveryProofCreateWithoutOrderInput, Prisma.DeliveryProofUncheckedCreateWithoutOrderInput>;
    connectOrCreate?: Prisma.DeliveryProofCreateOrConnectWithoutOrderInput;
    upsert?: Prisma.DeliveryProofUpsertWithoutOrderInput;
    disconnect?: Prisma.DeliveryProofWhereInput | boolean;
    delete?: Prisma.DeliveryProofWhereInput | boolean;
    connect?: Prisma.DeliveryProofWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DeliveryProofUpdateToOneWithWhereWithoutOrderInput, Prisma.DeliveryProofUpdateWithoutOrderInput>, Prisma.DeliveryProofUncheckedUpdateWithoutOrderInput>;
};
export type DeliveryProofCreateWithoutOrderInput = {
    id?: string;
    imageUrl: string;
    notes?: string | null;
    uploadedAt?: Date | string;
};
export type DeliveryProofUncheckedCreateWithoutOrderInput = {
    id?: string;
    imageUrl: string;
    notes?: string | null;
    uploadedAt?: Date | string;
};
export type DeliveryProofCreateOrConnectWithoutOrderInput = {
    where: Prisma.DeliveryProofWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeliveryProofCreateWithoutOrderInput, Prisma.DeliveryProofUncheckedCreateWithoutOrderInput>;
};
export type DeliveryProofUpsertWithoutOrderInput = {
    update: Prisma.XOR<Prisma.DeliveryProofUpdateWithoutOrderInput, Prisma.DeliveryProofUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.DeliveryProofCreateWithoutOrderInput, Prisma.DeliveryProofUncheckedCreateWithoutOrderInput>;
    where?: Prisma.DeliveryProofWhereInput;
};
export type DeliveryProofUpdateToOneWithWhereWithoutOrderInput = {
    where?: Prisma.DeliveryProofWhereInput;
    data: Prisma.XOR<Prisma.DeliveryProofUpdateWithoutOrderInput, Prisma.DeliveryProofUncheckedUpdateWithoutOrderInput>;
};
export type DeliveryProofUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeliveryProofUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DeliveryProofSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    imageUrl?: boolean;
    notes?: boolean;
    uploadedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deliveryProof"]>;
export type DeliveryProofSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    imageUrl?: boolean;
    notes?: boolean;
    uploadedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deliveryProof"]>;
export type DeliveryProofSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    imageUrl?: boolean;
    notes?: boolean;
    uploadedAt?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deliveryProof"]>;
export type DeliveryProofSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    imageUrl?: boolean;
    notes?: boolean;
    uploadedAt?: boolean;
};
export type DeliveryProofOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "orderId" | "imageUrl" | "notes" | "uploadedAt", ExtArgs["result"]["deliveryProof"]>;
export type DeliveryProofInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type DeliveryProofIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type DeliveryProofIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type $DeliveryProofPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DeliveryProof";
    objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        orderId: string;
        imageUrl: string;
        notes: string | null;
        uploadedAt: Date;
    }, ExtArgs["result"]["deliveryProof"]>;
    composites: {};
};
export type DeliveryProofGetPayload<S extends boolean | null | undefined | DeliveryProofDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DeliveryProofPayload, S>;
export type DeliveryProofCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DeliveryProofFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DeliveryProofCountAggregateInputType | true;
};
export interface DeliveryProofDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DeliveryProof'];
        meta: {
            name: 'DeliveryProof';
        };
    };
    findUnique<T extends DeliveryProofFindUniqueArgs>(args: Prisma.SelectSubset<T, DeliveryProofFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DeliveryProofClient<runtime.Types.Result.GetResult<Prisma.$DeliveryProofPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DeliveryProofFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DeliveryProofFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeliveryProofClient<runtime.Types.Result.GetResult<Prisma.$DeliveryProofPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DeliveryProofFindFirstArgs>(args?: Prisma.SelectSubset<T, DeliveryProofFindFirstArgs<ExtArgs>>): Prisma.Prisma__DeliveryProofClient<runtime.Types.Result.GetResult<Prisma.$DeliveryProofPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DeliveryProofFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DeliveryProofFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeliveryProofClient<runtime.Types.Result.GetResult<Prisma.$DeliveryProofPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DeliveryProofFindManyArgs>(args?: Prisma.SelectSubset<T, DeliveryProofFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeliveryProofPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DeliveryProofCreateArgs>(args: Prisma.SelectSubset<T, DeliveryProofCreateArgs<ExtArgs>>): Prisma.Prisma__DeliveryProofClient<runtime.Types.Result.GetResult<Prisma.$DeliveryProofPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DeliveryProofCreateManyArgs>(args?: Prisma.SelectSubset<T, DeliveryProofCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DeliveryProofCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DeliveryProofCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeliveryProofPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DeliveryProofDeleteArgs>(args: Prisma.SelectSubset<T, DeliveryProofDeleteArgs<ExtArgs>>): Prisma.Prisma__DeliveryProofClient<runtime.Types.Result.GetResult<Prisma.$DeliveryProofPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DeliveryProofUpdateArgs>(args: Prisma.SelectSubset<T, DeliveryProofUpdateArgs<ExtArgs>>): Prisma.Prisma__DeliveryProofClient<runtime.Types.Result.GetResult<Prisma.$DeliveryProofPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DeliveryProofDeleteManyArgs>(args?: Prisma.SelectSubset<T, DeliveryProofDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DeliveryProofUpdateManyArgs>(args: Prisma.SelectSubset<T, DeliveryProofUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DeliveryProofUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DeliveryProofUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeliveryProofPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DeliveryProofUpsertArgs>(args: Prisma.SelectSubset<T, DeliveryProofUpsertArgs<ExtArgs>>): Prisma.Prisma__DeliveryProofClient<runtime.Types.Result.GetResult<Prisma.$DeliveryProofPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DeliveryProofCountArgs>(args?: Prisma.Subset<T, DeliveryProofCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DeliveryProofCountAggregateOutputType> : number>;
    aggregate<T extends DeliveryProofAggregateArgs>(args: Prisma.Subset<T, DeliveryProofAggregateArgs>): Prisma.PrismaPromise<GetDeliveryProofAggregateType<T>>;
    groupBy<T extends DeliveryProofGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DeliveryProofGroupByArgs['orderBy'];
    } : {
        orderBy?: DeliveryProofGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DeliveryProofGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeliveryProofGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DeliveryProofFieldRefs;
}
export interface Prisma__DeliveryProofClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DeliveryProofFieldRefs {
    readonly id: Prisma.FieldRef<"DeliveryProof", 'String'>;
    readonly orderId: Prisma.FieldRef<"DeliveryProof", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"DeliveryProof", 'String'>;
    readonly notes: Prisma.FieldRef<"DeliveryProof", 'String'>;
    readonly uploadedAt: Prisma.FieldRef<"DeliveryProof", 'DateTime'>;
}
export type DeliveryProofFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryProofSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryProofOmit<ExtArgs> | null;
    include?: Prisma.DeliveryProofInclude<ExtArgs> | null;
    where: Prisma.DeliveryProofWhereUniqueInput;
};
export type DeliveryProofFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryProofSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryProofOmit<ExtArgs> | null;
    include?: Prisma.DeliveryProofInclude<ExtArgs> | null;
    where: Prisma.DeliveryProofWhereUniqueInput;
};
export type DeliveryProofFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryProofSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryProofOmit<ExtArgs> | null;
    include?: Prisma.DeliveryProofInclude<ExtArgs> | null;
    where?: Prisma.DeliveryProofWhereInput;
    orderBy?: Prisma.DeliveryProofOrderByWithRelationInput | Prisma.DeliveryProofOrderByWithRelationInput[];
    cursor?: Prisma.DeliveryProofWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeliveryProofScalarFieldEnum | Prisma.DeliveryProofScalarFieldEnum[];
};
export type DeliveryProofFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryProofSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryProofOmit<ExtArgs> | null;
    include?: Prisma.DeliveryProofInclude<ExtArgs> | null;
    where?: Prisma.DeliveryProofWhereInput;
    orderBy?: Prisma.DeliveryProofOrderByWithRelationInput | Prisma.DeliveryProofOrderByWithRelationInput[];
    cursor?: Prisma.DeliveryProofWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeliveryProofScalarFieldEnum | Prisma.DeliveryProofScalarFieldEnum[];
};
export type DeliveryProofFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryProofSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryProofOmit<ExtArgs> | null;
    include?: Prisma.DeliveryProofInclude<ExtArgs> | null;
    where?: Prisma.DeliveryProofWhereInput;
    orderBy?: Prisma.DeliveryProofOrderByWithRelationInput | Prisma.DeliveryProofOrderByWithRelationInput[];
    cursor?: Prisma.DeliveryProofWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeliveryProofScalarFieldEnum | Prisma.DeliveryProofScalarFieldEnum[];
};
export type DeliveryProofCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryProofSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryProofOmit<ExtArgs> | null;
    include?: Prisma.DeliveryProofInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeliveryProofCreateInput, Prisma.DeliveryProofUncheckedCreateInput>;
};
export type DeliveryProofCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DeliveryProofCreateManyInput | Prisma.DeliveryProofCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DeliveryProofCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryProofSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeliveryProofOmit<ExtArgs> | null;
    data: Prisma.DeliveryProofCreateManyInput | Prisma.DeliveryProofCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DeliveryProofIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DeliveryProofUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryProofSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryProofOmit<ExtArgs> | null;
    include?: Prisma.DeliveryProofInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeliveryProofUpdateInput, Prisma.DeliveryProofUncheckedUpdateInput>;
    where: Prisma.DeliveryProofWhereUniqueInput;
};
export type DeliveryProofUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DeliveryProofUpdateManyMutationInput, Prisma.DeliveryProofUncheckedUpdateManyInput>;
    where?: Prisma.DeliveryProofWhereInput;
    limit?: number;
};
export type DeliveryProofUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryProofSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeliveryProofOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeliveryProofUpdateManyMutationInput, Prisma.DeliveryProofUncheckedUpdateManyInput>;
    where?: Prisma.DeliveryProofWhereInput;
    limit?: number;
    include?: Prisma.DeliveryProofIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DeliveryProofUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryProofSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryProofOmit<ExtArgs> | null;
    include?: Prisma.DeliveryProofInclude<ExtArgs> | null;
    where: Prisma.DeliveryProofWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeliveryProofCreateInput, Prisma.DeliveryProofUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DeliveryProofUpdateInput, Prisma.DeliveryProofUncheckedUpdateInput>;
};
export type DeliveryProofDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryProofSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryProofOmit<ExtArgs> | null;
    include?: Prisma.DeliveryProofInclude<ExtArgs> | null;
    where: Prisma.DeliveryProofWhereUniqueInput;
};
export type DeliveryProofDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeliveryProofWhereInput;
    limit?: number;
};
export type DeliveryProofDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryProofSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryProofOmit<ExtArgs> | null;
    include?: Prisma.DeliveryProofInclude<ExtArgs> | null;
};
