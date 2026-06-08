import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProductRelationshipModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductRelationshipPayload>;
export type AggregateProductRelationship = {
    _count: ProductRelationshipCountAggregateOutputType | null;
    _min: ProductRelationshipMinAggregateOutputType | null;
    _max: ProductRelationshipMaxAggregateOutputType | null;
};
export type ProductRelationshipMinAggregateOutputType = {
    productId: string | null;
    relationshipId: string | null;
};
export type ProductRelationshipMaxAggregateOutputType = {
    productId: string | null;
    relationshipId: string | null;
};
export type ProductRelationshipCountAggregateOutputType = {
    productId: number;
    relationshipId: number;
    _all: number;
};
export type ProductRelationshipMinAggregateInputType = {
    productId?: true;
    relationshipId?: true;
};
export type ProductRelationshipMaxAggregateInputType = {
    productId?: true;
    relationshipId?: true;
};
export type ProductRelationshipCountAggregateInputType = {
    productId?: true;
    relationshipId?: true;
    _all?: true;
};
export type ProductRelationshipAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductRelationshipWhereInput;
    orderBy?: Prisma.ProductRelationshipOrderByWithRelationInput | Prisma.ProductRelationshipOrderByWithRelationInput[];
    cursor?: Prisma.ProductRelationshipWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductRelationshipCountAggregateInputType;
    _min?: ProductRelationshipMinAggregateInputType;
    _max?: ProductRelationshipMaxAggregateInputType;
};
export type GetProductRelationshipAggregateType<T extends ProductRelationshipAggregateArgs> = {
    [P in keyof T & keyof AggregateProductRelationship]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductRelationship[P]> : Prisma.GetScalarType<T[P], AggregateProductRelationship[P]>;
};
export type ProductRelationshipGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductRelationshipWhereInput;
    orderBy?: Prisma.ProductRelationshipOrderByWithAggregationInput | Prisma.ProductRelationshipOrderByWithAggregationInput[];
    by: Prisma.ProductRelationshipScalarFieldEnum[] | Prisma.ProductRelationshipScalarFieldEnum;
    having?: Prisma.ProductRelationshipScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductRelationshipCountAggregateInputType | true;
    _min?: ProductRelationshipMinAggregateInputType;
    _max?: ProductRelationshipMaxAggregateInputType;
};
export type ProductRelationshipGroupByOutputType = {
    productId: string;
    relationshipId: string;
    _count: ProductRelationshipCountAggregateOutputType | null;
    _min: ProductRelationshipMinAggregateOutputType | null;
    _max: ProductRelationshipMaxAggregateOutputType | null;
};
export type GetProductRelationshipGroupByPayload<T extends ProductRelationshipGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductRelationshipGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductRelationshipGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductRelationshipGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductRelationshipGroupByOutputType[P]>;
}>>;
export type ProductRelationshipWhereInput = {
    AND?: Prisma.ProductRelationshipWhereInput | Prisma.ProductRelationshipWhereInput[];
    OR?: Prisma.ProductRelationshipWhereInput[];
    NOT?: Prisma.ProductRelationshipWhereInput | Prisma.ProductRelationshipWhereInput[];
    productId?: Prisma.StringFilter<"ProductRelationship"> | string;
    relationshipId?: Prisma.StringFilter<"ProductRelationship"> | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    relationship?: Prisma.XOR<Prisma.RelationshipScalarRelationFilter, Prisma.RelationshipWhereInput>;
};
export type ProductRelationshipOrderByWithRelationInput = {
    productId?: Prisma.SortOrder;
    relationshipId?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    relationship?: Prisma.RelationshipOrderByWithRelationInput;
};
export type ProductRelationshipWhereUniqueInput = Prisma.AtLeast<{
    productId_relationshipId?: Prisma.ProductRelationshipProductIdRelationshipIdCompoundUniqueInput;
    AND?: Prisma.ProductRelationshipWhereInput | Prisma.ProductRelationshipWhereInput[];
    OR?: Prisma.ProductRelationshipWhereInput[];
    NOT?: Prisma.ProductRelationshipWhereInput | Prisma.ProductRelationshipWhereInput[];
    productId?: Prisma.StringFilter<"ProductRelationship"> | string;
    relationshipId?: Prisma.StringFilter<"ProductRelationship"> | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    relationship?: Prisma.XOR<Prisma.RelationshipScalarRelationFilter, Prisma.RelationshipWhereInput>;
}, "productId_relationshipId">;
export type ProductRelationshipOrderByWithAggregationInput = {
    productId?: Prisma.SortOrder;
    relationshipId?: Prisma.SortOrder;
    _count?: Prisma.ProductRelationshipCountOrderByAggregateInput;
    _max?: Prisma.ProductRelationshipMaxOrderByAggregateInput;
    _min?: Prisma.ProductRelationshipMinOrderByAggregateInput;
};
export type ProductRelationshipScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductRelationshipScalarWhereWithAggregatesInput | Prisma.ProductRelationshipScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductRelationshipScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductRelationshipScalarWhereWithAggregatesInput | Prisma.ProductRelationshipScalarWhereWithAggregatesInput[];
    productId?: Prisma.StringWithAggregatesFilter<"ProductRelationship"> | string;
    relationshipId?: Prisma.StringWithAggregatesFilter<"ProductRelationship"> | string;
};
export type ProductRelationshipCreateInput = {
    product: Prisma.ProductCreateNestedOneWithoutRelationshipsInput;
    relationship: Prisma.RelationshipCreateNestedOneWithoutProductsInput;
};
export type ProductRelationshipUncheckedCreateInput = {
    productId: string;
    relationshipId: string;
};
export type ProductRelationshipUpdateInput = {
    product?: Prisma.ProductUpdateOneRequiredWithoutRelationshipsNestedInput;
    relationship?: Prisma.RelationshipUpdateOneRequiredWithoutProductsNestedInput;
};
export type ProductRelationshipUncheckedUpdateInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    relationshipId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductRelationshipCreateManyInput = {
    productId: string;
    relationshipId: string;
};
export type ProductRelationshipUpdateManyMutationInput = {};
export type ProductRelationshipUncheckedUpdateManyInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    relationshipId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductRelationshipListRelationFilter = {
    every?: Prisma.ProductRelationshipWhereInput;
    some?: Prisma.ProductRelationshipWhereInput;
    none?: Prisma.ProductRelationshipWhereInput;
};
export type ProductRelationshipOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductRelationshipProductIdRelationshipIdCompoundUniqueInput = {
    productId: string;
    relationshipId: string;
};
export type ProductRelationshipCountOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    relationshipId?: Prisma.SortOrder;
};
export type ProductRelationshipMaxOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    relationshipId?: Prisma.SortOrder;
};
export type ProductRelationshipMinOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    relationshipId?: Prisma.SortOrder;
};
export type ProductRelationshipCreateNestedManyWithoutRelationshipInput = {
    create?: Prisma.XOR<Prisma.ProductRelationshipCreateWithoutRelationshipInput, Prisma.ProductRelationshipUncheckedCreateWithoutRelationshipInput> | Prisma.ProductRelationshipCreateWithoutRelationshipInput[] | Prisma.ProductRelationshipUncheckedCreateWithoutRelationshipInput[];
    connectOrCreate?: Prisma.ProductRelationshipCreateOrConnectWithoutRelationshipInput | Prisma.ProductRelationshipCreateOrConnectWithoutRelationshipInput[];
    createMany?: Prisma.ProductRelationshipCreateManyRelationshipInputEnvelope;
    connect?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
};
export type ProductRelationshipUncheckedCreateNestedManyWithoutRelationshipInput = {
    create?: Prisma.XOR<Prisma.ProductRelationshipCreateWithoutRelationshipInput, Prisma.ProductRelationshipUncheckedCreateWithoutRelationshipInput> | Prisma.ProductRelationshipCreateWithoutRelationshipInput[] | Prisma.ProductRelationshipUncheckedCreateWithoutRelationshipInput[];
    connectOrCreate?: Prisma.ProductRelationshipCreateOrConnectWithoutRelationshipInput | Prisma.ProductRelationshipCreateOrConnectWithoutRelationshipInput[];
    createMany?: Prisma.ProductRelationshipCreateManyRelationshipInputEnvelope;
    connect?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
};
export type ProductRelationshipUpdateManyWithoutRelationshipNestedInput = {
    create?: Prisma.XOR<Prisma.ProductRelationshipCreateWithoutRelationshipInput, Prisma.ProductRelationshipUncheckedCreateWithoutRelationshipInput> | Prisma.ProductRelationshipCreateWithoutRelationshipInput[] | Prisma.ProductRelationshipUncheckedCreateWithoutRelationshipInput[];
    connectOrCreate?: Prisma.ProductRelationshipCreateOrConnectWithoutRelationshipInput | Prisma.ProductRelationshipCreateOrConnectWithoutRelationshipInput[];
    upsert?: Prisma.ProductRelationshipUpsertWithWhereUniqueWithoutRelationshipInput | Prisma.ProductRelationshipUpsertWithWhereUniqueWithoutRelationshipInput[];
    createMany?: Prisma.ProductRelationshipCreateManyRelationshipInputEnvelope;
    set?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    disconnect?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    delete?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    connect?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    update?: Prisma.ProductRelationshipUpdateWithWhereUniqueWithoutRelationshipInput | Prisma.ProductRelationshipUpdateWithWhereUniqueWithoutRelationshipInput[];
    updateMany?: Prisma.ProductRelationshipUpdateManyWithWhereWithoutRelationshipInput | Prisma.ProductRelationshipUpdateManyWithWhereWithoutRelationshipInput[];
    deleteMany?: Prisma.ProductRelationshipScalarWhereInput | Prisma.ProductRelationshipScalarWhereInput[];
};
export type ProductRelationshipUncheckedUpdateManyWithoutRelationshipNestedInput = {
    create?: Prisma.XOR<Prisma.ProductRelationshipCreateWithoutRelationshipInput, Prisma.ProductRelationshipUncheckedCreateWithoutRelationshipInput> | Prisma.ProductRelationshipCreateWithoutRelationshipInput[] | Prisma.ProductRelationshipUncheckedCreateWithoutRelationshipInput[];
    connectOrCreate?: Prisma.ProductRelationshipCreateOrConnectWithoutRelationshipInput | Prisma.ProductRelationshipCreateOrConnectWithoutRelationshipInput[];
    upsert?: Prisma.ProductRelationshipUpsertWithWhereUniqueWithoutRelationshipInput | Prisma.ProductRelationshipUpsertWithWhereUniqueWithoutRelationshipInput[];
    createMany?: Prisma.ProductRelationshipCreateManyRelationshipInputEnvelope;
    set?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    disconnect?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    delete?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    connect?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    update?: Prisma.ProductRelationshipUpdateWithWhereUniqueWithoutRelationshipInput | Prisma.ProductRelationshipUpdateWithWhereUniqueWithoutRelationshipInput[];
    updateMany?: Prisma.ProductRelationshipUpdateManyWithWhereWithoutRelationshipInput | Prisma.ProductRelationshipUpdateManyWithWhereWithoutRelationshipInput[];
    deleteMany?: Prisma.ProductRelationshipScalarWhereInput | Prisma.ProductRelationshipScalarWhereInput[];
};
export type ProductRelationshipCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductRelationshipCreateWithoutProductInput, Prisma.ProductRelationshipUncheckedCreateWithoutProductInput> | Prisma.ProductRelationshipCreateWithoutProductInput[] | Prisma.ProductRelationshipUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductRelationshipCreateOrConnectWithoutProductInput | Prisma.ProductRelationshipCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductRelationshipCreateManyProductInputEnvelope;
    connect?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
};
export type ProductRelationshipUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductRelationshipCreateWithoutProductInput, Prisma.ProductRelationshipUncheckedCreateWithoutProductInput> | Prisma.ProductRelationshipCreateWithoutProductInput[] | Prisma.ProductRelationshipUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductRelationshipCreateOrConnectWithoutProductInput | Prisma.ProductRelationshipCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductRelationshipCreateManyProductInputEnvelope;
    connect?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
};
export type ProductRelationshipUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductRelationshipCreateWithoutProductInput, Prisma.ProductRelationshipUncheckedCreateWithoutProductInput> | Prisma.ProductRelationshipCreateWithoutProductInput[] | Prisma.ProductRelationshipUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductRelationshipCreateOrConnectWithoutProductInput | Prisma.ProductRelationshipCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductRelationshipUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductRelationshipUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductRelationshipCreateManyProductInputEnvelope;
    set?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    disconnect?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    delete?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    connect?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    update?: Prisma.ProductRelationshipUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductRelationshipUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductRelationshipUpdateManyWithWhereWithoutProductInput | Prisma.ProductRelationshipUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductRelationshipScalarWhereInput | Prisma.ProductRelationshipScalarWhereInput[];
};
export type ProductRelationshipUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductRelationshipCreateWithoutProductInput, Prisma.ProductRelationshipUncheckedCreateWithoutProductInput> | Prisma.ProductRelationshipCreateWithoutProductInput[] | Prisma.ProductRelationshipUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductRelationshipCreateOrConnectWithoutProductInput | Prisma.ProductRelationshipCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductRelationshipUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductRelationshipUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductRelationshipCreateManyProductInputEnvelope;
    set?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    disconnect?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    delete?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    connect?: Prisma.ProductRelationshipWhereUniqueInput | Prisma.ProductRelationshipWhereUniqueInput[];
    update?: Prisma.ProductRelationshipUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductRelationshipUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductRelationshipUpdateManyWithWhereWithoutProductInput | Prisma.ProductRelationshipUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductRelationshipScalarWhereInput | Prisma.ProductRelationshipScalarWhereInput[];
};
export type ProductRelationshipCreateWithoutRelationshipInput = {
    product: Prisma.ProductCreateNestedOneWithoutRelationshipsInput;
};
export type ProductRelationshipUncheckedCreateWithoutRelationshipInput = {
    productId: string;
};
export type ProductRelationshipCreateOrConnectWithoutRelationshipInput = {
    where: Prisma.ProductRelationshipWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductRelationshipCreateWithoutRelationshipInput, Prisma.ProductRelationshipUncheckedCreateWithoutRelationshipInput>;
};
export type ProductRelationshipCreateManyRelationshipInputEnvelope = {
    data: Prisma.ProductRelationshipCreateManyRelationshipInput | Prisma.ProductRelationshipCreateManyRelationshipInput[];
    skipDuplicates?: boolean;
};
export type ProductRelationshipUpsertWithWhereUniqueWithoutRelationshipInput = {
    where: Prisma.ProductRelationshipWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductRelationshipUpdateWithoutRelationshipInput, Prisma.ProductRelationshipUncheckedUpdateWithoutRelationshipInput>;
    create: Prisma.XOR<Prisma.ProductRelationshipCreateWithoutRelationshipInput, Prisma.ProductRelationshipUncheckedCreateWithoutRelationshipInput>;
};
export type ProductRelationshipUpdateWithWhereUniqueWithoutRelationshipInput = {
    where: Prisma.ProductRelationshipWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductRelationshipUpdateWithoutRelationshipInput, Prisma.ProductRelationshipUncheckedUpdateWithoutRelationshipInput>;
};
export type ProductRelationshipUpdateManyWithWhereWithoutRelationshipInput = {
    where: Prisma.ProductRelationshipScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductRelationshipUpdateManyMutationInput, Prisma.ProductRelationshipUncheckedUpdateManyWithoutRelationshipInput>;
};
export type ProductRelationshipScalarWhereInput = {
    AND?: Prisma.ProductRelationshipScalarWhereInput | Prisma.ProductRelationshipScalarWhereInput[];
    OR?: Prisma.ProductRelationshipScalarWhereInput[];
    NOT?: Prisma.ProductRelationshipScalarWhereInput | Prisma.ProductRelationshipScalarWhereInput[];
    productId?: Prisma.StringFilter<"ProductRelationship"> | string;
    relationshipId?: Prisma.StringFilter<"ProductRelationship"> | string;
};
export type ProductRelationshipCreateWithoutProductInput = {
    relationship: Prisma.RelationshipCreateNestedOneWithoutProductsInput;
};
export type ProductRelationshipUncheckedCreateWithoutProductInput = {
    relationshipId: string;
};
export type ProductRelationshipCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductRelationshipWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductRelationshipCreateWithoutProductInput, Prisma.ProductRelationshipUncheckedCreateWithoutProductInput>;
};
export type ProductRelationshipCreateManyProductInputEnvelope = {
    data: Prisma.ProductRelationshipCreateManyProductInput | Prisma.ProductRelationshipCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductRelationshipUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductRelationshipWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductRelationshipUpdateWithoutProductInput, Prisma.ProductRelationshipUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductRelationshipCreateWithoutProductInput, Prisma.ProductRelationshipUncheckedCreateWithoutProductInput>;
};
export type ProductRelationshipUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductRelationshipWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductRelationshipUpdateWithoutProductInput, Prisma.ProductRelationshipUncheckedUpdateWithoutProductInput>;
};
export type ProductRelationshipUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductRelationshipScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductRelationshipUpdateManyMutationInput, Prisma.ProductRelationshipUncheckedUpdateManyWithoutProductInput>;
};
export type ProductRelationshipCreateManyRelationshipInput = {
    productId: string;
};
export type ProductRelationshipUpdateWithoutRelationshipInput = {
    product?: Prisma.ProductUpdateOneRequiredWithoutRelationshipsNestedInput;
};
export type ProductRelationshipUncheckedUpdateWithoutRelationshipInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductRelationshipUncheckedUpdateManyWithoutRelationshipInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductRelationshipCreateManyProductInput = {
    relationshipId: string;
};
export type ProductRelationshipUpdateWithoutProductInput = {
    relationship?: Prisma.RelationshipUpdateOneRequiredWithoutProductsNestedInput;
};
export type ProductRelationshipUncheckedUpdateWithoutProductInput = {
    relationshipId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductRelationshipUncheckedUpdateManyWithoutProductInput = {
    relationshipId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductRelationshipSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    relationshipId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    relationship?: boolean | Prisma.RelationshipDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productRelationship"]>;
export type ProductRelationshipSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    relationshipId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    relationship?: boolean | Prisma.RelationshipDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productRelationship"]>;
export type ProductRelationshipSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    relationshipId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    relationship?: boolean | Prisma.RelationshipDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productRelationship"]>;
export type ProductRelationshipSelectScalar = {
    productId?: boolean;
    relationshipId?: boolean;
};
export type ProductRelationshipOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"productId" | "relationshipId", ExtArgs["result"]["productRelationship"]>;
export type ProductRelationshipInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    relationship?: boolean | Prisma.RelationshipDefaultArgs<ExtArgs>;
};
export type ProductRelationshipIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    relationship?: boolean | Prisma.RelationshipDefaultArgs<ExtArgs>;
};
export type ProductRelationshipIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    relationship?: boolean | Prisma.RelationshipDefaultArgs<ExtArgs>;
};
export type $ProductRelationshipPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductRelationship";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        relationship: Prisma.$RelationshipPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        productId: string;
        relationshipId: string;
    }, ExtArgs["result"]["productRelationship"]>;
    composites: {};
};
export type ProductRelationshipGetPayload<S extends boolean | null | undefined | ProductRelationshipDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductRelationshipPayload, S>;
export type ProductRelationshipCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductRelationshipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductRelationshipCountAggregateInputType | true;
};
export interface ProductRelationshipDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductRelationship'];
        meta: {
            name: 'ProductRelationship';
        };
    };
    findUnique<T extends ProductRelationshipFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductRelationshipFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductRelationshipClient<runtime.Types.Result.GetResult<Prisma.$ProductRelationshipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductRelationshipFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductRelationshipFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductRelationshipClient<runtime.Types.Result.GetResult<Prisma.$ProductRelationshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductRelationshipFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductRelationshipFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductRelationshipClient<runtime.Types.Result.GetResult<Prisma.$ProductRelationshipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductRelationshipFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductRelationshipFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductRelationshipClient<runtime.Types.Result.GetResult<Prisma.$ProductRelationshipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductRelationshipFindManyArgs>(args?: Prisma.SelectSubset<T, ProductRelationshipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductRelationshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductRelationshipCreateArgs>(args: Prisma.SelectSubset<T, ProductRelationshipCreateArgs<ExtArgs>>): Prisma.Prisma__ProductRelationshipClient<runtime.Types.Result.GetResult<Prisma.$ProductRelationshipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductRelationshipCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductRelationshipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductRelationshipCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductRelationshipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductRelationshipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductRelationshipDeleteArgs>(args: Prisma.SelectSubset<T, ProductRelationshipDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductRelationshipClient<runtime.Types.Result.GetResult<Prisma.$ProductRelationshipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductRelationshipUpdateArgs>(args: Prisma.SelectSubset<T, ProductRelationshipUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductRelationshipClient<runtime.Types.Result.GetResult<Prisma.$ProductRelationshipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductRelationshipDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductRelationshipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductRelationshipUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductRelationshipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductRelationshipUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductRelationshipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductRelationshipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductRelationshipUpsertArgs>(args: Prisma.SelectSubset<T, ProductRelationshipUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductRelationshipClient<runtime.Types.Result.GetResult<Prisma.$ProductRelationshipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductRelationshipCountArgs>(args?: Prisma.Subset<T, ProductRelationshipCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductRelationshipCountAggregateOutputType> : number>;
    aggregate<T extends ProductRelationshipAggregateArgs>(args: Prisma.Subset<T, ProductRelationshipAggregateArgs>): Prisma.PrismaPromise<GetProductRelationshipAggregateType<T>>;
    groupBy<T extends ProductRelationshipGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductRelationshipGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductRelationshipGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductRelationshipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductRelationshipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductRelationshipFieldRefs;
}
export interface Prisma__ProductRelationshipClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    relationship<T extends Prisma.RelationshipDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RelationshipDefaultArgs<ExtArgs>>): Prisma.Prisma__RelationshipClient<runtime.Types.Result.GetResult<Prisma.$RelationshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductRelationshipFieldRefs {
    readonly productId: Prisma.FieldRef<"ProductRelationship", 'String'>;
    readonly relationshipId: Prisma.FieldRef<"ProductRelationship", 'String'>;
}
export type ProductRelationshipFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductRelationshipSelect<ExtArgs> | null;
    omit?: Prisma.ProductRelationshipOmit<ExtArgs> | null;
    include?: Prisma.ProductRelationshipInclude<ExtArgs> | null;
    where: Prisma.ProductRelationshipWhereUniqueInput;
};
export type ProductRelationshipFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductRelationshipSelect<ExtArgs> | null;
    omit?: Prisma.ProductRelationshipOmit<ExtArgs> | null;
    include?: Prisma.ProductRelationshipInclude<ExtArgs> | null;
    where: Prisma.ProductRelationshipWhereUniqueInput;
};
export type ProductRelationshipFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductRelationshipSelect<ExtArgs> | null;
    omit?: Prisma.ProductRelationshipOmit<ExtArgs> | null;
    include?: Prisma.ProductRelationshipInclude<ExtArgs> | null;
    where?: Prisma.ProductRelationshipWhereInput;
    orderBy?: Prisma.ProductRelationshipOrderByWithRelationInput | Prisma.ProductRelationshipOrderByWithRelationInput[];
    cursor?: Prisma.ProductRelationshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductRelationshipScalarFieldEnum | Prisma.ProductRelationshipScalarFieldEnum[];
};
export type ProductRelationshipFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductRelationshipSelect<ExtArgs> | null;
    omit?: Prisma.ProductRelationshipOmit<ExtArgs> | null;
    include?: Prisma.ProductRelationshipInclude<ExtArgs> | null;
    where?: Prisma.ProductRelationshipWhereInput;
    orderBy?: Prisma.ProductRelationshipOrderByWithRelationInput | Prisma.ProductRelationshipOrderByWithRelationInput[];
    cursor?: Prisma.ProductRelationshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductRelationshipScalarFieldEnum | Prisma.ProductRelationshipScalarFieldEnum[];
};
export type ProductRelationshipFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductRelationshipSelect<ExtArgs> | null;
    omit?: Prisma.ProductRelationshipOmit<ExtArgs> | null;
    include?: Prisma.ProductRelationshipInclude<ExtArgs> | null;
    where?: Prisma.ProductRelationshipWhereInput;
    orderBy?: Prisma.ProductRelationshipOrderByWithRelationInput | Prisma.ProductRelationshipOrderByWithRelationInput[];
    cursor?: Prisma.ProductRelationshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductRelationshipScalarFieldEnum | Prisma.ProductRelationshipScalarFieldEnum[];
};
export type ProductRelationshipCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductRelationshipSelect<ExtArgs> | null;
    omit?: Prisma.ProductRelationshipOmit<ExtArgs> | null;
    include?: Prisma.ProductRelationshipInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductRelationshipCreateInput, Prisma.ProductRelationshipUncheckedCreateInput>;
};
export type ProductRelationshipCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductRelationshipCreateManyInput | Prisma.ProductRelationshipCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductRelationshipCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductRelationshipSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductRelationshipOmit<ExtArgs> | null;
    data: Prisma.ProductRelationshipCreateManyInput | Prisma.ProductRelationshipCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductRelationshipIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductRelationshipUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductRelationshipSelect<ExtArgs> | null;
    omit?: Prisma.ProductRelationshipOmit<ExtArgs> | null;
    include?: Prisma.ProductRelationshipInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductRelationshipUpdateInput, Prisma.ProductRelationshipUncheckedUpdateInput>;
    where: Prisma.ProductRelationshipWhereUniqueInput;
};
export type ProductRelationshipUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductRelationshipUpdateManyMutationInput, Prisma.ProductRelationshipUncheckedUpdateManyInput>;
    where?: Prisma.ProductRelationshipWhereInput;
    limit?: number;
};
export type ProductRelationshipUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductRelationshipSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductRelationshipOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductRelationshipUpdateManyMutationInput, Prisma.ProductRelationshipUncheckedUpdateManyInput>;
    where?: Prisma.ProductRelationshipWhereInput;
    limit?: number;
    include?: Prisma.ProductRelationshipIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductRelationshipUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductRelationshipSelect<ExtArgs> | null;
    omit?: Prisma.ProductRelationshipOmit<ExtArgs> | null;
    include?: Prisma.ProductRelationshipInclude<ExtArgs> | null;
    where: Prisma.ProductRelationshipWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductRelationshipCreateInput, Prisma.ProductRelationshipUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductRelationshipUpdateInput, Prisma.ProductRelationshipUncheckedUpdateInput>;
};
export type ProductRelationshipDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductRelationshipSelect<ExtArgs> | null;
    omit?: Prisma.ProductRelationshipOmit<ExtArgs> | null;
    include?: Prisma.ProductRelationshipInclude<ExtArgs> | null;
    where: Prisma.ProductRelationshipWhereUniqueInput;
};
export type ProductRelationshipDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductRelationshipWhereInput;
    limit?: number;
};
export type ProductRelationshipDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductRelationshipSelect<ExtArgs> | null;
    omit?: Prisma.ProductRelationshipOmit<ExtArgs> | null;
    include?: Prisma.ProductRelationshipInclude<ExtArgs> | null;
};
