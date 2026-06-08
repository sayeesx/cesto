import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type VendorProductModel = runtime.Types.Result.DefaultSelection<Prisma.$VendorProductPayload>;
export type AggregateVendorProduct = {
    _count: VendorProductCountAggregateOutputType | null;
    _avg: VendorProductAvgAggregateOutputType | null;
    _sum: VendorProductSumAggregateOutputType | null;
    _min: VendorProductMinAggregateOutputType | null;
    _max: VendorProductMaxAggregateOutputType | null;
};
export type VendorProductAvgAggregateOutputType = {
    price: number | null;
    stock: number | null;
};
export type VendorProductSumAggregateOutputType = {
    price: number | null;
    stock: number | null;
};
export type VendorProductMinAggregateOutputType = {
    vendorId: string | null;
    productId: string | null;
    price: number | null;
    stock: number | null;
};
export type VendorProductMaxAggregateOutputType = {
    vendorId: string | null;
    productId: string | null;
    price: number | null;
    stock: number | null;
};
export type VendorProductCountAggregateOutputType = {
    vendorId: number;
    productId: number;
    price: number;
    stock: number;
    _all: number;
};
export type VendorProductAvgAggregateInputType = {
    price?: true;
    stock?: true;
};
export type VendorProductSumAggregateInputType = {
    price?: true;
    stock?: true;
};
export type VendorProductMinAggregateInputType = {
    vendorId?: true;
    productId?: true;
    price?: true;
    stock?: true;
};
export type VendorProductMaxAggregateInputType = {
    vendorId?: true;
    productId?: true;
    price?: true;
    stock?: true;
};
export type VendorProductCountAggregateInputType = {
    vendorId?: true;
    productId?: true;
    price?: true;
    stock?: true;
    _all?: true;
};
export type VendorProductAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorProductWhereInput;
    orderBy?: Prisma.VendorProductOrderByWithRelationInput | Prisma.VendorProductOrderByWithRelationInput[];
    cursor?: Prisma.VendorProductWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VendorProductCountAggregateInputType;
    _avg?: VendorProductAvgAggregateInputType;
    _sum?: VendorProductSumAggregateInputType;
    _min?: VendorProductMinAggregateInputType;
    _max?: VendorProductMaxAggregateInputType;
};
export type GetVendorProductAggregateType<T extends VendorProductAggregateArgs> = {
    [P in keyof T & keyof AggregateVendorProduct]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVendorProduct[P]> : Prisma.GetScalarType<T[P], AggregateVendorProduct[P]>;
};
export type VendorProductGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorProductWhereInput;
    orderBy?: Prisma.VendorProductOrderByWithAggregationInput | Prisma.VendorProductOrderByWithAggregationInput[];
    by: Prisma.VendorProductScalarFieldEnum[] | Prisma.VendorProductScalarFieldEnum;
    having?: Prisma.VendorProductScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VendorProductCountAggregateInputType | true;
    _avg?: VendorProductAvgAggregateInputType;
    _sum?: VendorProductSumAggregateInputType;
    _min?: VendorProductMinAggregateInputType;
    _max?: VendorProductMaxAggregateInputType;
};
export type VendorProductGroupByOutputType = {
    vendorId: string;
    productId: string;
    price: number | null;
    stock: number;
    _count: VendorProductCountAggregateOutputType | null;
    _avg: VendorProductAvgAggregateOutputType | null;
    _sum: VendorProductSumAggregateOutputType | null;
    _min: VendorProductMinAggregateOutputType | null;
    _max: VendorProductMaxAggregateOutputType | null;
};
export type GetVendorProductGroupByPayload<T extends VendorProductGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VendorProductGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VendorProductGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VendorProductGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VendorProductGroupByOutputType[P]>;
}>>;
export type VendorProductWhereInput = {
    AND?: Prisma.VendorProductWhereInput | Prisma.VendorProductWhereInput[];
    OR?: Prisma.VendorProductWhereInput[];
    NOT?: Prisma.VendorProductWhereInput | Prisma.VendorProductWhereInput[];
    vendorId?: Prisma.StringFilter<"VendorProduct"> | string;
    productId?: Prisma.StringFilter<"VendorProduct"> | string;
    price?: Prisma.FloatNullableFilter<"VendorProduct"> | number | null;
    stock?: Prisma.IntFilter<"VendorProduct"> | number;
    vendor?: Prisma.XOR<Prisma.VendorScalarRelationFilter, Prisma.VendorWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type VendorProductOrderByWithRelationInput = {
    vendorId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    price?: Prisma.SortOrderInput | Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    vendor?: Prisma.VendorOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
};
export type VendorProductWhereUniqueInput = Prisma.AtLeast<{
    vendorId_productId?: Prisma.VendorProductVendorIdProductIdCompoundUniqueInput;
    AND?: Prisma.VendorProductWhereInput | Prisma.VendorProductWhereInput[];
    OR?: Prisma.VendorProductWhereInput[];
    NOT?: Prisma.VendorProductWhereInput | Prisma.VendorProductWhereInput[];
    vendorId?: Prisma.StringFilter<"VendorProduct"> | string;
    productId?: Prisma.StringFilter<"VendorProduct"> | string;
    price?: Prisma.FloatNullableFilter<"VendorProduct"> | number | null;
    stock?: Prisma.IntFilter<"VendorProduct"> | number;
    vendor?: Prisma.XOR<Prisma.VendorScalarRelationFilter, Prisma.VendorWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "vendorId_productId">;
export type VendorProductOrderByWithAggregationInput = {
    vendorId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    price?: Prisma.SortOrderInput | Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    _count?: Prisma.VendorProductCountOrderByAggregateInput;
    _avg?: Prisma.VendorProductAvgOrderByAggregateInput;
    _max?: Prisma.VendorProductMaxOrderByAggregateInput;
    _min?: Prisma.VendorProductMinOrderByAggregateInput;
    _sum?: Prisma.VendorProductSumOrderByAggregateInput;
};
export type VendorProductScalarWhereWithAggregatesInput = {
    AND?: Prisma.VendorProductScalarWhereWithAggregatesInput | Prisma.VendorProductScalarWhereWithAggregatesInput[];
    OR?: Prisma.VendorProductScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VendorProductScalarWhereWithAggregatesInput | Prisma.VendorProductScalarWhereWithAggregatesInput[];
    vendorId?: Prisma.StringWithAggregatesFilter<"VendorProduct"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"VendorProduct"> | string;
    price?: Prisma.FloatNullableWithAggregatesFilter<"VendorProduct"> | number | null;
    stock?: Prisma.IntWithAggregatesFilter<"VendorProduct"> | number;
};
export type VendorProductCreateInput = {
    price?: number | null;
    stock?: number;
    vendor: Prisma.VendorCreateNestedOneWithoutProductsInput;
    product: Prisma.ProductCreateNestedOneWithoutVendorProductsInput;
};
export type VendorProductUncheckedCreateInput = {
    vendorId: string;
    productId: string;
    price?: number | null;
    stock?: number;
};
export type VendorProductUpdateInput = {
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    vendor?: Prisma.VendorUpdateOneRequiredWithoutProductsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutVendorProductsNestedInput;
};
export type VendorProductUncheckedUpdateInput = {
    vendorId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type VendorProductCreateManyInput = {
    vendorId: string;
    productId: string;
    price?: number | null;
    stock?: number;
};
export type VendorProductUpdateManyMutationInput = {
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type VendorProductUncheckedUpdateManyInput = {
    vendorId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type VendorProductListRelationFilter = {
    every?: Prisma.VendorProductWhereInput;
    some?: Prisma.VendorProductWhereInput;
    none?: Prisma.VendorProductWhereInput;
};
export type VendorProductOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VendorProductVendorIdProductIdCompoundUniqueInput = {
    vendorId: string;
    productId: string;
};
export type VendorProductCountOrderByAggregateInput = {
    vendorId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
};
export type VendorProductAvgOrderByAggregateInput = {
    price?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
};
export type VendorProductMaxOrderByAggregateInput = {
    vendorId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
};
export type VendorProductMinOrderByAggregateInput = {
    vendorId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
};
export type VendorProductSumOrderByAggregateInput = {
    price?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
};
export type VendorProductCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.VendorProductCreateWithoutProductInput, Prisma.VendorProductUncheckedCreateWithoutProductInput> | Prisma.VendorProductCreateWithoutProductInput[] | Prisma.VendorProductUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.VendorProductCreateOrConnectWithoutProductInput | Prisma.VendorProductCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.VendorProductCreateManyProductInputEnvelope;
    connect?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
};
export type VendorProductUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.VendorProductCreateWithoutProductInput, Prisma.VendorProductUncheckedCreateWithoutProductInput> | Prisma.VendorProductCreateWithoutProductInput[] | Prisma.VendorProductUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.VendorProductCreateOrConnectWithoutProductInput | Prisma.VendorProductCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.VendorProductCreateManyProductInputEnvelope;
    connect?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
};
export type VendorProductUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.VendorProductCreateWithoutProductInput, Prisma.VendorProductUncheckedCreateWithoutProductInput> | Prisma.VendorProductCreateWithoutProductInput[] | Prisma.VendorProductUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.VendorProductCreateOrConnectWithoutProductInput | Prisma.VendorProductCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.VendorProductUpsertWithWhereUniqueWithoutProductInput | Prisma.VendorProductUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.VendorProductCreateManyProductInputEnvelope;
    set?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    disconnect?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    delete?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    connect?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    update?: Prisma.VendorProductUpdateWithWhereUniqueWithoutProductInput | Prisma.VendorProductUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.VendorProductUpdateManyWithWhereWithoutProductInput | Prisma.VendorProductUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.VendorProductScalarWhereInput | Prisma.VendorProductScalarWhereInput[];
};
export type VendorProductUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.VendorProductCreateWithoutProductInput, Prisma.VendorProductUncheckedCreateWithoutProductInput> | Prisma.VendorProductCreateWithoutProductInput[] | Prisma.VendorProductUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.VendorProductCreateOrConnectWithoutProductInput | Prisma.VendorProductCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.VendorProductUpsertWithWhereUniqueWithoutProductInput | Prisma.VendorProductUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.VendorProductCreateManyProductInputEnvelope;
    set?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    disconnect?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    delete?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    connect?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    update?: Prisma.VendorProductUpdateWithWhereUniqueWithoutProductInput | Prisma.VendorProductUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.VendorProductUpdateManyWithWhereWithoutProductInput | Prisma.VendorProductUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.VendorProductScalarWhereInput | Prisma.VendorProductScalarWhereInput[];
};
export type VendorProductCreateNestedManyWithoutVendorInput = {
    create?: Prisma.XOR<Prisma.VendorProductCreateWithoutVendorInput, Prisma.VendorProductUncheckedCreateWithoutVendorInput> | Prisma.VendorProductCreateWithoutVendorInput[] | Prisma.VendorProductUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorProductCreateOrConnectWithoutVendorInput | Prisma.VendorProductCreateOrConnectWithoutVendorInput[];
    createMany?: Prisma.VendorProductCreateManyVendorInputEnvelope;
    connect?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
};
export type VendorProductUncheckedCreateNestedManyWithoutVendorInput = {
    create?: Prisma.XOR<Prisma.VendorProductCreateWithoutVendorInput, Prisma.VendorProductUncheckedCreateWithoutVendorInput> | Prisma.VendorProductCreateWithoutVendorInput[] | Prisma.VendorProductUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorProductCreateOrConnectWithoutVendorInput | Prisma.VendorProductCreateOrConnectWithoutVendorInput[];
    createMany?: Prisma.VendorProductCreateManyVendorInputEnvelope;
    connect?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
};
export type VendorProductUpdateManyWithoutVendorNestedInput = {
    create?: Prisma.XOR<Prisma.VendorProductCreateWithoutVendorInput, Prisma.VendorProductUncheckedCreateWithoutVendorInput> | Prisma.VendorProductCreateWithoutVendorInput[] | Prisma.VendorProductUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorProductCreateOrConnectWithoutVendorInput | Prisma.VendorProductCreateOrConnectWithoutVendorInput[];
    upsert?: Prisma.VendorProductUpsertWithWhereUniqueWithoutVendorInput | Prisma.VendorProductUpsertWithWhereUniqueWithoutVendorInput[];
    createMany?: Prisma.VendorProductCreateManyVendorInputEnvelope;
    set?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    disconnect?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    delete?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    connect?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    update?: Prisma.VendorProductUpdateWithWhereUniqueWithoutVendorInput | Prisma.VendorProductUpdateWithWhereUniqueWithoutVendorInput[];
    updateMany?: Prisma.VendorProductUpdateManyWithWhereWithoutVendorInput | Prisma.VendorProductUpdateManyWithWhereWithoutVendorInput[];
    deleteMany?: Prisma.VendorProductScalarWhereInput | Prisma.VendorProductScalarWhereInput[];
};
export type VendorProductUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: Prisma.XOR<Prisma.VendorProductCreateWithoutVendorInput, Prisma.VendorProductUncheckedCreateWithoutVendorInput> | Prisma.VendorProductCreateWithoutVendorInput[] | Prisma.VendorProductUncheckedCreateWithoutVendorInput[];
    connectOrCreate?: Prisma.VendorProductCreateOrConnectWithoutVendorInput | Prisma.VendorProductCreateOrConnectWithoutVendorInput[];
    upsert?: Prisma.VendorProductUpsertWithWhereUniqueWithoutVendorInput | Prisma.VendorProductUpsertWithWhereUniqueWithoutVendorInput[];
    createMany?: Prisma.VendorProductCreateManyVendorInputEnvelope;
    set?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    disconnect?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    delete?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    connect?: Prisma.VendorProductWhereUniqueInput | Prisma.VendorProductWhereUniqueInput[];
    update?: Prisma.VendorProductUpdateWithWhereUniqueWithoutVendorInput | Prisma.VendorProductUpdateWithWhereUniqueWithoutVendorInput[];
    updateMany?: Prisma.VendorProductUpdateManyWithWhereWithoutVendorInput | Prisma.VendorProductUpdateManyWithWhereWithoutVendorInput[];
    deleteMany?: Prisma.VendorProductScalarWhereInput | Prisma.VendorProductScalarWhereInput[];
};
export type VendorProductCreateWithoutProductInput = {
    price?: number | null;
    stock?: number;
    vendor: Prisma.VendorCreateNestedOneWithoutProductsInput;
};
export type VendorProductUncheckedCreateWithoutProductInput = {
    vendorId: string;
    price?: number | null;
    stock?: number;
};
export type VendorProductCreateOrConnectWithoutProductInput = {
    where: Prisma.VendorProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorProductCreateWithoutProductInput, Prisma.VendorProductUncheckedCreateWithoutProductInput>;
};
export type VendorProductCreateManyProductInputEnvelope = {
    data: Prisma.VendorProductCreateManyProductInput | Prisma.VendorProductCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type VendorProductUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.VendorProductWhereUniqueInput;
    update: Prisma.XOR<Prisma.VendorProductUpdateWithoutProductInput, Prisma.VendorProductUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.VendorProductCreateWithoutProductInput, Prisma.VendorProductUncheckedCreateWithoutProductInput>;
};
export type VendorProductUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.VendorProductWhereUniqueInput;
    data: Prisma.XOR<Prisma.VendorProductUpdateWithoutProductInput, Prisma.VendorProductUncheckedUpdateWithoutProductInput>;
};
export type VendorProductUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.VendorProductScalarWhereInput;
    data: Prisma.XOR<Prisma.VendorProductUpdateManyMutationInput, Prisma.VendorProductUncheckedUpdateManyWithoutProductInput>;
};
export type VendorProductScalarWhereInput = {
    AND?: Prisma.VendorProductScalarWhereInput | Prisma.VendorProductScalarWhereInput[];
    OR?: Prisma.VendorProductScalarWhereInput[];
    NOT?: Prisma.VendorProductScalarWhereInput | Prisma.VendorProductScalarWhereInput[];
    vendorId?: Prisma.StringFilter<"VendorProduct"> | string;
    productId?: Prisma.StringFilter<"VendorProduct"> | string;
    price?: Prisma.FloatNullableFilter<"VendorProduct"> | number | null;
    stock?: Prisma.IntFilter<"VendorProduct"> | number;
};
export type VendorProductCreateWithoutVendorInput = {
    price?: number | null;
    stock?: number;
    product: Prisma.ProductCreateNestedOneWithoutVendorProductsInput;
};
export type VendorProductUncheckedCreateWithoutVendorInput = {
    productId: string;
    price?: number | null;
    stock?: number;
};
export type VendorProductCreateOrConnectWithoutVendorInput = {
    where: Prisma.VendorProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorProductCreateWithoutVendorInput, Prisma.VendorProductUncheckedCreateWithoutVendorInput>;
};
export type VendorProductCreateManyVendorInputEnvelope = {
    data: Prisma.VendorProductCreateManyVendorInput | Prisma.VendorProductCreateManyVendorInput[];
    skipDuplicates?: boolean;
};
export type VendorProductUpsertWithWhereUniqueWithoutVendorInput = {
    where: Prisma.VendorProductWhereUniqueInput;
    update: Prisma.XOR<Prisma.VendorProductUpdateWithoutVendorInput, Prisma.VendorProductUncheckedUpdateWithoutVendorInput>;
    create: Prisma.XOR<Prisma.VendorProductCreateWithoutVendorInput, Prisma.VendorProductUncheckedCreateWithoutVendorInput>;
};
export type VendorProductUpdateWithWhereUniqueWithoutVendorInput = {
    where: Prisma.VendorProductWhereUniqueInput;
    data: Prisma.XOR<Prisma.VendorProductUpdateWithoutVendorInput, Prisma.VendorProductUncheckedUpdateWithoutVendorInput>;
};
export type VendorProductUpdateManyWithWhereWithoutVendorInput = {
    where: Prisma.VendorProductScalarWhereInput;
    data: Prisma.XOR<Prisma.VendorProductUpdateManyMutationInput, Prisma.VendorProductUncheckedUpdateManyWithoutVendorInput>;
};
export type VendorProductCreateManyProductInput = {
    vendorId: string;
    price?: number | null;
    stock?: number;
};
export type VendorProductUpdateWithoutProductInput = {
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    vendor?: Prisma.VendorUpdateOneRequiredWithoutProductsNestedInput;
};
export type VendorProductUncheckedUpdateWithoutProductInput = {
    vendorId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type VendorProductUncheckedUpdateManyWithoutProductInput = {
    vendorId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type VendorProductCreateManyVendorInput = {
    productId: string;
    price?: number | null;
    stock?: number;
};
export type VendorProductUpdateWithoutVendorInput = {
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    product?: Prisma.ProductUpdateOneRequiredWithoutVendorProductsNestedInput;
};
export type VendorProductUncheckedUpdateWithoutVendorInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type VendorProductUncheckedUpdateManyWithoutVendorInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type VendorProductSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    vendorId?: boolean;
    productId?: boolean;
    price?: boolean;
    stock?: boolean;
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendorProduct"]>;
export type VendorProductSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    vendorId?: boolean;
    productId?: boolean;
    price?: boolean;
    stock?: boolean;
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendorProduct"]>;
export type VendorProductSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    vendorId?: boolean;
    productId?: boolean;
    price?: boolean;
    stock?: boolean;
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendorProduct"]>;
export type VendorProductSelectScalar = {
    vendorId?: boolean;
    productId?: boolean;
    price?: boolean;
    stock?: boolean;
};
export type VendorProductOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"vendorId" | "productId" | "price" | "stock", ExtArgs["result"]["vendorProduct"]>;
export type VendorProductInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type VendorProductIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type VendorProductIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    vendor?: boolean | Prisma.VendorDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $VendorProductPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VendorProduct";
    objects: {
        vendor: Prisma.$VendorPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        vendorId: string;
        productId: string;
        price: number | null;
        stock: number;
    }, ExtArgs["result"]["vendorProduct"]>;
    composites: {};
};
export type VendorProductGetPayload<S extends boolean | null | undefined | VendorProductDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VendorProductPayload, S>;
export type VendorProductCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VendorProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VendorProductCountAggregateInputType | true;
};
export interface VendorProductDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VendorProduct'];
        meta: {
            name: 'VendorProduct';
        };
    };
    findUnique<T extends VendorProductFindUniqueArgs>(args: Prisma.SelectSubset<T, VendorProductFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VendorProductClient<runtime.Types.Result.GetResult<Prisma.$VendorProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VendorProductFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VendorProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VendorProductClient<runtime.Types.Result.GetResult<Prisma.$VendorProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VendorProductFindFirstArgs>(args?: Prisma.SelectSubset<T, VendorProductFindFirstArgs<ExtArgs>>): Prisma.Prisma__VendorProductClient<runtime.Types.Result.GetResult<Prisma.$VendorProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VendorProductFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VendorProductFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VendorProductClient<runtime.Types.Result.GetResult<Prisma.$VendorProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VendorProductFindManyArgs>(args?: Prisma.SelectSubset<T, VendorProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VendorProductCreateArgs>(args: Prisma.SelectSubset<T, VendorProductCreateArgs<ExtArgs>>): Prisma.Prisma__VendorProductClient<runtime.Types.Result.GetResult<Prisma.$VendorProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VendorProductCreateManyArgs>(args?: Prisma.SelectSubset<T, VendorProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends VendorProductCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VendorProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends VendorProductDeleteArgs>(args: Prisma.SelectSubset<T, VendorProductDeleteArgs<ExtArgs>>): Prisma.Prisma__VendorProductClient<runtime.Types.Result.GetResult<Prisma.$VendorProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VendorProductUpdateArgs>(args: Prisma.SelectSubset<T, VendorProductUpdateArgs<ExtArgs>>): Prisma.Prisma__VendorProductClient<runtime.Types.Result.GetResult<Prisma.$VendorProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VendorProductDeleteManyArgs>(args?: Prisma.SelectSubset<T, VendorProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VendorProductUpdateManyArgs>(args: Prisma.SelectSubset<T, VendorProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends VendorProductUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VendorProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends VendorProductUpsertArgs>(args: Prisma.SelectSubset<T, VendorProductUpsertArgs<ExtArgs>>): Prisma.Prisma__VendorProductClient<runtime.Types.Result.GetResult<Prisma.$VendorProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VendorProductCountArgs>(args?: Prisma.Subset<T, VendorProductCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VendorProductCountAggregateOutputType> : number>;
    aggregate<T extends VendorProductAggregateArgs>(args: Prisma.Subset<T, VendorProductAggregateArgs>): Prisma.PrismaPromise<GetVendorProductAggregateType<T>>;
    groupBy<T extends VendorProductGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VendorProductGroupByArgs['orderBy'];
    } : {
        orderBy?: VendorProductGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VendorProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VendorProductFieldRefs;
}
export interface Prisma__VendorProductClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    vendor<T extends Prisma.VendorDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VendorDefaultArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VendorProductFieldRefs {
    readonly vendorId: Prisma.FieldRef<"VendorProduct", 'String'>;
    readonly productId: Prisma.FieldRef<"VendorProduct", 'String'>;
    readonly price: Prisma.FieldRef<"VendorProduct", 'Float'>;
    readonly stock: Prisma.FieldRef<"VendorProduct", 'Int'>;
}
export type VendorProductFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorProductSelect<ExtArgs> | null;
    omit?: Prisma.VendorProductOmit<ExtArgs> | null;
    include?: Prisma.VendorProductInclude<ExtArgs> | null;
    where: Prisma.VendorProductWhereUniqueInput;
};
export type VendorProductFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorProductSelect<ExtArgs> | null;
    omit?: Prisma.VendorProductOmit<ExtArgs> | null;
    include?: Prisma.VendorProductInclude<ExtArgs> | null;
    where: Prisma.VendorProductWhereUniqueInput;
};
export type VendorProductFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorProductSelect<ExtArgs> | null;
    omit?: Prisma.VendorProductOmit<ExtArgs> | null;
    include?: Prisma.VendorProductInclude<ExtArgs> | null;
    where?: Prisma.VendorProductWhereInput;
    orderBy?: Prisma.VendorProductOrderByWithRelationInput | Prisma.VendorProductOrderByWithRelationInput[];
    cursor?: Prisma.VendorProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorProductScalarFieldEnum | Prisma.VendorProductScalarFieldEnum[];
};
export type VendorProductFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorProductSelect<ExtArgs> | null;
    omit?: Prisma.VendorProductOmit<ExtArgs> | null;
    include?: Prisma.VendorProductInclude<ExtArgs> | null;
    where?: Prisma.VendorProductWhereInput;
    orderBy?: Prisma.VendorProductOrderByWithRelationInput | Prisma.VendorProductOrderByWithRelationInput[];
    cursor?: Prisma.VendorProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorProductScalarFieldEnum | Prisma.VendorProductScalarFieldEnum[];
};
export type VendorProductFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorProductSelect<ExtArgs> | null;
    omit?: Prisma.VendorProductOmit<ExtArgs> | null;
    include?: Prisma.VendorProductInclude<ExtArgs> | null;
    where?: Prisma.VendorProductWhereInput;
    orderBy?: Prisma.VendorProductOrderByWithRelationInput | Prisma.VendorProductOrderByWithRelationInput[];
    cursor?: Prisma.VendorProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorProductScalarFieldEnum | Prisma.VendorProductScalarFieldEnum[];
};
export type VendorProductCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorProductSelect<ExtArgs> | null;
    omit?: Prisma.VendorProductOmit<ExtArgs> | null;
    include?: Prisma.VendorProductInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VendorProductCreateInput, Prisma.VendorProductUncheckedCreateInput>;
};
export type VendorProductCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VendorProductCreateManyInput | Prisma.VendorProductCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VendorProductCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorProductSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VendorProductOmit<ExtArgs> | null;
    data: Prisma.VendorProductCreateManyInput | Prisma.VendorProductCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.VendorProductIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type VendorProductUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorProductSelect<ExtArgs> | null;
    omit?: Prisma.VendorProductOmit<ExtArgs> | null;
    include?: Prisma.VendorProductInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VendorProductUpdateInput, Prisma.VendorProductUncheckedUpdateInput>;
    where: Prisma.VendorProductWhereUniqueInput;
};
export type VendorProductUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VendorProductUpdateManyMutationInput, Prisma.VendorProductUncheckedUpdateManyInput>;
    where?: Prisma.VendorProductWhereInput;
    limit?: number;
};
export type VendorProductUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorProductSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VendorProductOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VendorProductUpdateManyMutationInput, Prisma.VendorProductUncheckedUpdateManyInput>;
    where?: Prisma.VendorProductWhereInput;
    limit?: number;
    include?: Prisma.VendorProductIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type VendorProductUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorProductSelect<ExtArgs> | null;
    omit?: Prisma.VendorProductOmit<ExtArgs> | null;
    include?: Prisma.VendorProductInclude<ExtArgs> | null;
    where: Prisma.VendorProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorProductCreateInput, Prisma.VendorProductUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VendorProductUpdateInput, Prisma.VendorProductUncheckedUpdateInput>;
};
export type VendorProductDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorProductSelect<ExtArgs> | null;
    omit?: Prisma.VendorProductOmit<ExtArgs> | null;
    include?: Prisma.VendorProductInclude<ExtArgs> | null;
    where: Prisma.VendorProductWhereUniqueInput;
};
export type VendorProductDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorProductWhereInput;
    limit?: number;
};
export type VendorProductDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorProductSelect<ExtArgs> | null;
    omit?: Prisma.VendorProductOmit<ExtArgs> | null;
    include?: Prisma.VendorProductInclude<ExtArgs> | null;
};
