import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductOccasionModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductOccasionPayload>;
export type AggregateProductOccasion = {
    _count: ProductOccasionCountAggregateOutputType | null;
    _min: ProductOccasionMinAggregateOutputType | null;
    _max: ProductOccasionMaxAggregateOutputType | null;
};
export type ProductOccasionMinAggregateOutputType = {
    productId: string | null;
    occasionId: string | null;
};
export type ProductOccasionMaxAggregateOutputType = {
    productId: string | null;
    occasionId: string | null;
};
export type ProductOccasionCountAggregateOutputType = {
    productId: number;
    occasionId: number;
    _all: number;
};
export type ProductOccasionMinAggregateInputType = {
    productId?: true;
    occasionId?: true;
};
export type ProductOccasionMaxAggregateInputType = {
    productId?: true;
    occasionId?: true;
};
export type ProductOccasionCountAggregateInputType = {
    productId?: true;
    occasionId?: true;
    _all?: true;
};
export type ProductOccasionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductOccasionWhereInput;
    orderBy?: Prisma.ProductOccasionOrderByWithRelationInput | Prisma.ProductOccasionOrderByWithRelationInput[];
    cursor?: Prisma.ProductOccasionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductOccasionCountAggregateInputType;
    _min?: ProductOccasionMinAggregateInputType;
    _max?: ProductOccasionMaxAggregateInputType;
};
export type GetProductOccasionAggregateType<T extends ProductOccasionAggregateArgs> = {
    [P in keyof T & keyof AggregateProductOccasion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductOccasion[P]> : Prisma.GetScalarType<T[P], AggregateProductOccasion[P]>;
};
export type ProductOccasionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductOccasionWhereInput;
    orderBy?: Prisma.ProductOccasionOrderByWithAggregationInput | Prisma.ProductOccasionOrderByWithAggregationInput[];
    by: Prisma.ProductOccasionScalarFieldEnum[] | Prisma.ProductOccasionScalarFieldEnum;
    having?: Prisma.ProductOccasionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductOccasionCountAggregateInputType | true;
    _min?: ProductOccasionMinAggregateInputType;
    _max?: ProductOccasionMaxAggregateInputType;
};
export type ProductOccasionGroupByOutputType = {
    productId: string;
    occasionId: string;
    _count: ProductOccasionCountAggregateOutputType | null;
    _min: ProductOccasionMinAggregateOutputType | null;
    _max: ProductOccasionMaxAggregateOutputType | null;
};
export type GetProductOccasionGroupByPayload<T extends ProductOccasionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductOccasionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductOccasionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductOccasionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductOccasionGroupByOutputType[P]>;
}>>;
export type ProductOccasionWhereInput = {
    AND?: Prisma.ProductOccasionWhereInput | Prisma.ProductOccasionWhereInput[];
    OR?: Prisma.ProductOccasionWhereInput[];
    NOT?: Prisma.ProductOccasionWhereInput | Prisma.ProductOccasionWhereInput[];
    productId?: Prisma.StringFilter<"ProductOccasion"> | string;
    occasionId?: Prisma.StringFilter<"ProductOccasion"> | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    occasion?: Prisma.XOR<Prisma.OccasionScalarRelationFilter, Prisma.OccasionWhereInput>;
};
export type ProductOccasionOrderByWithRelationInput = {
    productId?: Prisma.SortOrder;
    occasionId?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    occasion?: Prisma.OccasionOrderByWithRelationInput;
};
export type ProductOccasionWhereUniqueInput = Prisma.AtLeast<{
    productId_occasionId?: Prisma.ProductOccasionProductIdOccasionIdCompoundUniqueInput;
    AND?: Prisma.ProductOccasionWhereInput | Prisma.ProductOccasionWhereInput[];
    OR?: Prisma.ProductOccasionWhereInput[];
    NOT?: Prisma.ProductOccasionWhereInput | Prisma.ProductOccasionWhereInput[];
    productId?: Prisma.StringFilter<"ProductOccasion"> | string;
    occasionId?: Prisma.StringFilter<"ProductOccasion"> | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    occasion?: Prisma.XOR<Prisma.OccasionScalarRelationFilter, Prisma.OccasionWhereInput>;
}, "productId_occasionId">;
export type ProductOccasionOrderByWithAggregationInput = {
    productId?: Prisma.SortOrder;
    occasionId?: Prisma.SortOrder;
    _count?: Prisma.ProductOccasionCountOrderByAggregateInput;
    _max?: Prisma.ProductOccasionMaxOrderByAggregateInput;
    _min?: Prisma.ProductOccasionMinOrderByAggregateInput;
};
export type ProductOccasionScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductOccasionScalarWhereWithAggregatesInput | Prisma.ProductOccasionScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductOccasionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductOccasionScalarWhereWithAggregatesInput | Prisma.ProductOccasionScalarWhereWithAggregatesInput[];
    productId?: Prisma.StringWithAggregatesFilter<"ProductOccasion"> | string;
    occasionId?: Prisma.StringWithAggregatesFilter<"ProductOccasion"> | string;
};
export type ProductOccasionCreateInput = {
    product: Prisma.ProductCreateNestedOneWithoutOccasionsInput;
    occasion: Prisma.OccasionCreateNestedOneWithoutProductsInput;
};
export type ProductOccasionUncheckedCreateInput = {
    productId: string;
    occasionId: string;
};
export type ProductOccasionUpdateInput = {
    product?: Prisma.ProductUpdateOneRequiredWithoutOccasionsNestedInput;
    occasion?: Prisma.OccasionUpdateOneRequiredWithoutProductsNestedInput;
};
export type ProductOccasionUncheckedUpdateInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    occasionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductOccasionCreateManyInput = {
    productId: string;
    occasionId: string;
};
export type ProductOccasionUpdateManyMutationInput = {};
export type ProductOccasionUncheckedUpdateManyInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    occasionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductOccasionListRelationFilter = {
    every?: Prisma.ProductOccasionWhereInput;
    some?: Prisma.ProductOccasionWhereInput;
    none?: Prisma.ProductOccasionWhereInput;
};
export type ProductOccasionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductOccasionProductIdOccasionIdCompoundUniqueInput = {
    productId: string;
    occasionId: string;
};
export type ProductOccasionCountOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    occasionId?: Prisma.SortOrder;
};
export type ProductOccasionMaxOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    occasionId?: Prisma.SortOrder;
};
export type ProductOccasionMinOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    occasionId?: Prisma.SortOrder;
};
export type ProductOccasionCreateNestedManyWithoutOccasionInput = {
    create?: Prisma.XOR<Prisma.ProductOccasionCreateWithoutOccasionInput, Prisma.ProductOccasionUncheckedCreateWithoutOccasionInput> | Prisma.ProductOccasionCreateWithoutOccasionInput[] | Prisma.ProductOccasionUncheckedCreateWithoutOccasionInput[];
    connectOrCreate?: Prisma.ProductOccasionCreateOrConnectWithoutOccasionInput | Prisma.ProductOccasionCreateOrConnectWithoutOccasionInput[];
    createMany?: Prisma.ProductOccasionCreateManyOccasionInputEnvelope;
    connect?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
};
export type ProductOccasionUncheckedCreateNestedManyWithoutOccasionInput = {
    create?: Prisma.XOR<Prisma.ProductOccasionCreateWithoutOccasionInput, Prisma.ProductOccasionUncheckedCreateWithoutOccasionInput> | Prisma.ProductOccasionCreateWithoutOccasionInput[] | Prisma.ProductOccasionUncheckedCreateWithoutOccasionInput[];
    connectOrCreate?: Prisma.ProductOccasionCreateOrConnectWithoutOccasionInput | Prisma.ProductOccasionCreateOrConnectWithoutOccasionInput[];
    createMany?: Prisma.ProductOccasionCreateManyOccasionInputEnvelope;
    connect?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
};
export type ProductOccasionUpdateManyWithoutOccasionNestedInput = {
    create?: Prisma.XOR<Prisma.ProductOccasionCreateWithoutOccasionInput, Prisma.ProductOccasionUncheckedCreateWithoutOccasionInput> | Prisma.ProductOccasionCreateWithoutOccasionInput[] | Prisma.ProductOccasionUncheckedCreateWithoutOccasionInput[];
    connectOrCreate?: Prisma.ProductOccasionCreateOrConnectWithoutOccasionInput | Prisma.ProductOccasionCreateOrConnectWithoutOccasionInput[];
    upsert?: Prisma.ProductOccasionUpsertWithWhereUniqueWithoutOccasionInput | Prisma.ProductOccasionUpsertWithWhereUniqueWithoutOccasionInput[];
    createMany?: Prisma.ProductOccasionCreateManyOccasionInputEnvelope;
    set?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    disconnect?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    delete?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    connect?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    update?: Prisma.ProductOccasionUpdateWithWhereUniqueWithoutOccasionInput | Prisma.ProductOccasionUpdateWithWhereUniqueWithoutOccasionInput[];
    updateMany?: Prisma.ProductOccasionUpdateManyWithWhereWithoutOccasionInput | Prisma.ProductOccasionUpdateManyWithWhereWithoutOccasionInput[];
    deleteMany?: Prisma.ProductOccasionScalarWhereInput | Prisma.ProductOccasionScalarWhereInput[];
};
export type ProductOccasionUncheckedUpdateManyWithoutOccasionNestedInput = {
    create?: Prisma.XOR<Prisma.ProductOccasionCreateWithoutOccasionInput, Prisma.ProductOccasionUncheckedCreateWithoutOccasionInput> | Prisma.ProductOccasionCreateWithoutOccasionInput[] | Prisma.ProductOccasionUncheckedCreateWithoutOccasionInput[];
    connectOrCreate?: Prisma.ProductOccasionCreateOrConnectWithoutOccasionInput | Prisma.ProductOccasionCreateOrConnectWithoutOccasionInput[];
    upsert?: Prisma.ProductOccasionUpsertWithWhereUniqueWithoutOccasionInput | Prisma.ProductOccasionUpsertWithWhereUniqueWithoutOccasionInput[];
    createMany?: Prisma.ProductOccasionCreateManyOccasionInputEnvelope;
    set?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    disconnect?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    delete?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    connect?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    update?: Prisma.ProductOccasionUpdateWithWhereUniqueWithoutOccasionInput | Prisma.ProductOccasionUpdateWithWhereUniqueWithoutOccasionInput[];
    updateMany?: Prisma.ProductOccasionUpdateManyWithWhereWithoutOccasionInput | Prisma.ProductOccasionUpdateManyWithWhereWithoutOccasionInput[];
    deleteMany?: Prisma.ProductOccasionScalarWhereInput | Prisma.ProductOccasionScalarWhereInput[];
};
export type ProductOccasionCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductOccasionCreateWithoutProductInput, Prisma.ProductOccasionUncheckedCreateWithoutProductInput> | Prisma.ProductOccasionCreateWithoutProductInput[] | Prisma.ProductOccasionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductOccasionCreateOrConnectWithoutProductInput | Prisma.ProductOccasionCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductOccasionCreateManyProductInputEnvelope;
    connect?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
};
export type ProductOccasionUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductOccasionCreateWithoutProductInput, Prisma.ProductOccasionUncheckedCreateWithoutProductInput> | Prisma.ProductOccasionCreateWithoutProductInput[] | Prisma.ProductOccasionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductOccasionCreateOrConnectWithoutProductInput | Prisma.ProductOccasionCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductOccasionCreateManyProductInputEnvelope;
    connect?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
};
export type ProductOccasionUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductOccasionCreateWithoutProductInput, Prisma.ProductOccasionUncheckedCreateWithoutProductInput> | Prisma.ProductOccasionCreateWithoutProductInput[] | Prisma.ProductOccasionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductOccasionCreateOrConnectWithoutProductInput | Prisma.ProductOccasionCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductOccasionUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductOccasionUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductOccasionCreateManyProductInputEnvelope;
    set?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    disconnect?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    delete?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    connect?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    update?: Prisma.ProductOccasionUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductOccasionUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductOccasionUpdateManyWithWhereWithoutProductInput | Prisma.ProductOccasionUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductOccasionScalarWhereInput | Prisma.ProductOccasionScalarWhereInput[];
};
export type ProductOccasionUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductOccasionCreateWithoutProductInput, Prisma.ProductOccasionUncheckedCreateWithoutProductInput> | Prisma.ProductOccasionCreateWithoutProductInput[] | Prisma.ProductOccasionUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductOccasionCreateOrConnectWithoutProductInput | Prisma.ProductOccasionCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductOccasionUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductOccasionUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductOccasionCreateManyProductInputEnvelope;
    set?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    disconnect?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    delete?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    connect?: Prisma.ProductOccasionWhereUniqueInput | Prisma.ProductOccasionWhereUniqueInput[];
    update?: Prisma.ProductOccasionUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductOccasionUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductOccasionUpdateManyWithWhereWithoutProductInput | Prisma.ProductOccasionUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductOccasionScalarWhereInput | Prisma.ProductOccasionScalarWhereInput[];
};
export type ProductOccasionCreateWithoutOccasionInput = {
    product: Prisma.ProductCreateNestedOneWithoutOccasionsInput;
};
export type ProductOccasionUncheckedCreateWithoutOccasionInput = {
    productId: string;
};
export type ProductOccasionCreateOrConnectWithoutOccasionInput = {
    where: Prisma.ProductOccasionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductOccasionCreateWithoutOccasionInput, Prisma.ProductOccasionUncheckedCreateWithoutOccasionInput>;
};
export type ProductOccasionCreateManyOccasionInputEnvelope = {
    data: Prisma.ProductOccasionCreateManyOccasionInput | Prisma.ProductOccasionCreateManyOccasionInput[];
    skipDuplicates?: boolean;
};
export type ProductOccasionUpsertWithWhereUniqueWithoutOccasionInput = {
    where: Prisma.ProductOccasionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductOccasionUpdateWithoutOccasionInput, Prisma.ProductOccasionUncheckedUpdateWithoutOccasionInput>;
    create: Prisma.XOR<Prisma.ProductOccasionCreateWithoutOccasionInput, Prisma.ProductOccasionUncheckedCreateWithoutOccasionInput>;
};
export type ProductOccasionUpdateWithWhereUniqueWithoutOccasionInput = {
    where: Prisma.ProductOccasionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductOccasionUpdateWithoutOccasionInput, Prisma.ProductOccasionUncheckedUpdateWithoutOccasionInput>;
};
export type ProductOccasionUpdateManyWithWhereWithoutOccasionInput = {
    where: Prisma.ProductOccasionScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductOccasionUpdateManyMutationInput, Prisma.ProductOccasionUncheckedUpdateManyWithoutOccasionInput>;
};
export type ProductOccasionScalarWhereInput = {
    AND?: Prisma.ProductOccasionScalarWhereInput | Prisma.ProductOccasionScalarWhereInput[];
    OR?: Prisma.ProductOccasionScalarWhereInput[];
    NOT?: Prisma.ProductOccasionScalarWhereInput | Prisma.ProductOccasionScalarWhereInput[];
    productId?: Prisma.StringFilter<"ProductOccasion"> | string;
    occasionId?: Prisma.StringFilter<"ProductOccasion"> | string;
};
export type ProductOccasionCreateWithoutProductInput = {
    occasion: Prisma.OccasionCreateNestedOneWithoutProductsInput;
};
export type ProductOccasionUncheckedCreateWithoutProductInput = {
    occasionId: string;
};
export type ProductOccasionCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductOccasionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductOccasionCreateWithoutProductInput, Prisma.ProductOccasionUncheckedCreateWithoutProductInput>;
};
export type ProductOccasionCreateManyProductInputEnvelope = {
    data: Prisma.ProductOccasionCreateManyProductInput | Prisma.ProductOccasionCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductOccasionUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductOccasionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductOccasionUpdateWithoutProductInput, Prisma.ProductOccasionUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductOccasionCreateWithoutProductInput, Prisma.ProductOccasionUncheckedCreateWithoutProductInput>;
};
export type ProductOccasionUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductOccasionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductOccasionUpdateWithoutProductInput, Prisma.ProductOccasionUncheckedUpdateWithoutProductInput>;
};
export type ProductOccasionUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductOccasionScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductOccasionUpdateManyMutationInput, Prisma.ProductOccasionUncheckedUpdateManyWithoutProductInput>;
};
export type ProductOccasionCreateManyOccasionInput = {
    productId: string;
};
export type ProductOccasionUpdateWithoutOccasionInput = {
    product?: Prisma.ProductUpdateOneRequiredWithoutOccasionsNestedInput;
};
export type ProductOccasionUncheckedUpdateWithoutOccasionInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductOccasionUncheckedUpdateManyWithoutOccasionInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductOccasionCreateManyProductInput = {
    occasionId: string;
};
export type ProductOccasionUpdateWithoutProductInput = {
    occasion?: Prisma.OccasionUpdateOneRequiredWithoutProductsNestedInput;
};
export type ProductOccasionUncheckedUpdateWithoutProductInput = {
    occasionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductOccasionUncheckedUpdateManyWithoutProductInput = {
    occasionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductOccasionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    occasionId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    occasion?: boolean | Prisma.OccasionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productOccasion"]>;
export type ProductOccasionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    occasionId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    occasion?: boolean | Prisma.OccasionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productOccasion"]>;
export type ProductOccasionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    occasionId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    occasion?: boolean | Prisma.OccasionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productOccasion"]>;
export type ProductOccasionSelectScalar = {
    productId?: boolean;
    occasionId?: boolean;
};
export type ProductOccasionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"productId" | "occasionId", ExtArgs["result"]["productOccasion"]>;
export type ProductOccasionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    occasion?: boolean | Prisma.OccasionDefaultArgs<ExtArgs>;
};
export type ProductOccasionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    occasion?: boolean | Prisma.OccasionDefaultArgs<ExtArgs>;
};
export type ProductOccasionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    occasion?: boolean | Prisma.OccasionDefaultArgs<ExtArgs>;
};
export type $ProductOccasionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductOccasion";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        occasion: Prisma.$OccasionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        productId: string;
        occasionId: string;
    }, ExtArgs["result"]["productOccasion"]>;
    composites: {};
};
export type ProductOccasionGetPayload<S extends boolean | null | undefined | ProductOccasionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductOccasionPayload, S>;
export type ProductOccasionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductOccasionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductOccasionCountAggregateInputType | true;
};
export interface ProductOccasionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductOccasion'];
        meta: {
            name: 'ProductOccasion';
        };
    };
    findUnique<T extends ProductOccasionFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductOccasionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductOccasionClient<runtime.Types.Result.GetResult<Prisma.$ProductOccasionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductOccasionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductOccasionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductOccasionClient<runtime.Types.Result.GetResult<Prisma.$ProductOccasionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductOccasionFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductOccasionFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductOccasionClient<runtime.Types.Result.GetResult<Prisma.$ProductOccasionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductOccasionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductOccasionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductOccasionClient<runtime.Types.Result.GetResult<Prisma.$ProductOccasionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductOccasionFindManyArgs>(args?: Prisma.SelectSubset<T, ProductOccasionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductOccasionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductOccasionCreateArgs>(args: Prisma.SelectSubset<T, ProductOccasionCreateArgs<ExtArgs>>): Prisma.Prisma__ProductOccasionClient<runtime.Types.Result.GetResult<Prisma.$ProductOccasionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductOccasionCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductOccasionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductOccasionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductOccasionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductOccasionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductOccasionDeleteArgs>(args: Prisma.SelectSubset<T, ProductOccasionDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductOccasionClient<runtime.Types.Result.GetResult<Prisma.$ProductOccasionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductOccasionUpdateArgs>(args: Prisma.SelectSubset<T, ProductOccasionUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductOccasionClient<runtime.Types.Result.GetResult<Prisma.$ProductOccasionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductOccasionDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductOccasionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductOccasionUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductOccasionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductOccasionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductOccasionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductOccasionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductOccasionUpsertArgs>(args: Prisma.SelectSubset<T, ProductOccasionUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductOccasionClient<runtime.Types.Result.GetResult<Prisma.$ProductOccasionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductOccasionCountArgs>(args?: Prisma.Subset<T, ProductOccasionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductOccasionCountAggregateOutputType> : number>;
    aggregate<T extends ProductOccasionAggregateArgs>(args: Prisma.Subset<T, ProductOccasionAggregateArgs>): Prisma.PrismaPromise<GetProductOccasionAggregateType<T>>;
    groupBy<T extends ProductOccasionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductOccasionGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductOccasionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductOccasionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductOccasionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductOccasionFieldRefs;
}
export interface Prisma__ProductOccasionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    occasion<T extends Prisma.OccasionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OccasionDefaultArgs<ExtArgs>>): Prisma.Prisma__OccasionClient<runtime.Types.Result.GetResult<Prisma.$OccasionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductOccasionFieldRefs {
    readonly productId: Prisma.FieldRef<"ProductOccasion", 'String'>;
    readonly occasionId: Prisma.FieldRef<"ProductOccasion", 'String'>;
}
export type ProductOccasionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductOccasionSelect<ExtArgs> | null;
    omit?: Prisma.ProductOccasionOmit<ExtArgs> | null;
    include?: Prisma.ProductOccasionInclude<ExtArgs> | null;
    where: Prisma.ProductOccasionWhereUniqueInput;
};
export type ProductOccasionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductOccasionSelect<ExtArgs> | null;
    omit?: Prisma.ProductOccasionOmit<ExtArgs> | null;
    include?: Prisma.ProductOccasionInclude<ExtArgs> | null;
    where: Prisma.ProductOccasionWhereUniqueInput;
};
export type ProductOccasionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductOccasionSelect<ExtArgs> | null;
    omit?: Prisma.ProductOccasionOmit<ExtArgs> | null;
    include?: Prisma.ProductOccasionInclude<ExtArgs> | null;
    where?: Prisma.ProductOccasionWhereInput;
    orderBy?: Prisma.ProductOccasionOrderByWithRelationInput | Prisma.ProductOccasionOrderByWithRelationInput[];
    cursor?: Prisma.ProductOccasionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductOccasionScalarFieldEnum | Prisma.ProductOccasionScalarFieldEnum[];
};
export type ProductOccasionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductOccasionSelect<ExtArgs> | null;
    omit?: Prisma.ProductOccasionOmit<ExtArgs> | null;
    include?: Prisma.ProductOccasionInclude<ExtArgs> | null;
    where?: Prisma.ProductOccasionWhereInput;
    orderBy?: Prisma.ProductOccasionOrderByWithRelationInput | Prisma.ProductOccasionOrderByWithRelationInput[];
    cursor?: Prisma.ProductOccasionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductOccasionScalarFieldEnum | Prisma.ProductOccasionScalarFieldEnum[];
};
export type ProductOccasionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductOccasionSelect<ExtArgs> | null;
    omit?: Prisma.ProductOccasionOmit<ExtArgs> | null;
    include?: Prisma.ProductOccasionInclude<ExtArgs> | null;
    where?: Prisma.ProductOccasionWhereInput;
    orderBy?: Prisma.ProductOccasionOrderByWithRelationInput | Prisma.ProductOccasionOrderByWithRelationInput[];
    cursor?: Prisma.ProductOccasionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductOccasionScalarFieldEnum | Prisma.ProductOccasionScalarFieldEnum[];
};
export type ProductOccasionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductOccasionSelect<ExtArgs> | null;
    omit?: Prisma.ProductOccasionOmit<ExtArgs> | null;
    include?: Prisma.ProductOccasionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductOccasionCreateInput, Prisma.ProductOccasionUncheckedCreateInput>;
};
export type ProductOccasionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductOccasionCreateManyInput | Prisma.ProductOccasionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductOccasionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductOccasionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductOccasionOmit<ExtArgs> | null;
    data: Prisma.ProductOccasionCreateManyInput | Prisma.ProductOccasionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductOccasionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductOccasionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductOccasionSelect<ExtArgs> | null;
    omit?: Prisma.ProductOccasionOmit<ExtArgs> | null;
    include?: Prisma.ProductOccasionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductOccasionUpdateInput, Prisma.ProductOccasionUncheckedUpdateInput>;
    where: Prisma.ProductOccasionWhereUniqueInput;
};
export type ProductOccasionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductOccasionUpdateManyMutationInput, Prisma.ProductOccasionUncheckedUpdateManyInput>;
    where?: Prisma.ProductOccasionWhereInput;
    limit?: number;
};
export type ProductOccasionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductOccasionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductOccasionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductOccasionUpdateManyMutationInput, Prisma.ProductOccasionUncheckedUpdateManyInput>;
    where?: Prisma.ProductOccasionWhereInput;
    limit?: number;
    include?: Prisma.ProductOccasionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductOccasionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductOccasionSelect<ExtArgs> | null;
    omit?: Prisma.ProductOccasionOmit<ExtArgs> | null;
    include?: Prisma.ProductOccasionInclude<ExtArgs> | null;
    where: Prisma.ProductOccasionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductOccasionCreateInput, Prisma.ProductOccasionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductOccasionUpdateInput, Prisma.ProductOccasionUncheckedUpdateInput>;
};
export type ProductOccasionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductOccasionSelect<ExtArgs> | null;
    omit?: Prisma.ProductOccasionOmit<ExtArgs> | null;
    include?: Prisma.ProductOccasionInclude<ExtArgs> | null;
    where: Prisma.ProductOccasionWhereUniqueInput;
};
export type ProductOccasionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductOccasionWhereInput;
    limit?: number;
};
export type ProductOccasionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductOccasionSelect<ExtArgs> | null;
    omit?: Prisma.ProductOccasionOmit<ExtArgs> | null;
    include?: Prisma.ProductOccasionInclude<ExtArgs> | null;
};
