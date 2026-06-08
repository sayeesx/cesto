import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type VendorModel = runtime.Types.Result.DefaultSelection<Prisma.$VendorPayload>;
export type AggregateVendor = {
    _count: VendorCountAggregateOutputType | null;
    _min: VendorMinAggregateOutputType | null;
    _max: VendorMaxAggregateOutputType | null;
};
export type VendorMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    storeName: string | null;
    address: string | null;
    isActive: boolean | null;
};
export type VendorMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    storeName: string | null;
    address: string | null;
    isActive: boolean | null;
};
export type VendorCountAggregateOutputType = {
    id: number;
    userId: number;
    storeName: number;
    address: number;
    isActive: number;
    _all: number;
};
export type VendorMinAggregateInputType = {
    id?: true;
    userId?: true;
    storeName?: true;
    address?: true;
    isActive?: true;
};
export type VendorMaxAggregateInputType = {
    id?: true;
    userId?: true;
    storeName?: true;
    address?: true;
    isActive?: true;
};
export type VendorCountAggregateInputType = {
    id?: true;
    userId?: true;
    storeName?: true;
    address?: true;
    isActive?: true;
    _all?: true;
};
export type VendorAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorWhereInput;
    orderBy?: Prisma.VendorOrderByWithRelationInput | Prisma.VendorOrderByWithRelationInput[];
    cursor?: Prisma.VendorWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VendorCountAggregateInputType;
    _min?: VendorMinAggregateInputType;
    _max?: VendorMaxAggregateInputType;
};
export type GetVendorAggregateType<T extends VendorAggregateArgs> = {
    [P in keyof T & keyof AggregateVendor]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVendor[P]> : Prisma.GetScalarType<T[P], AggregateVendor[P]>;
};
export type VendorGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorWhereInput;
    orderBy?: Prisma.VendorOrderByWithAggregationInput | Prisma.VendorOrderByWithAggregationInput[];
    by: Prisma.VendorScalarFieldEnum[] | Prisma.VendorScalarFieldEnum;
    having?: Prisma.VendorScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VendorCountAggregateInputType | true;
    _min?: VendorMinAggregateInputType;
    _max?: VendorMaxAggregateInputType;
};
export type VendorGroupByOutputType = {
    id: string;
    userId: string;
    storeName: string;
    address: string | null;
    isActive: boolean;
    _count: VendorCountAggregateOutputType | null;
    _min: VendorMinAggregateOutputType | null;
    _max: VendorMaxAggregateOutputType | null;
};
export type GetVendorGroupByPayload<T extends VendorGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VendorGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VendorGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VendorGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VendorGroupByOutputType[P]>;
}>>;
export type VendorWhereInput = {
    AND?: Prisma.VendorWhereInput | Prisma.VendorWhereInput[];
    OR?: Prisma.VendorWhereInput[];
    NOT?: Prisma.VendorWhereInput | Prisma.VendorWhereInput[];
    id?: Prisma.StringFilter<"Vendor"> | string;
    userId?: Prisma.StringFilter<"Vendor"> | string;
    storeName?: Prisma.StringFilter<"Vendor"> | string;
    address?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    isActive?: Prisma.BoolFilter<"Vendor"> | boolean;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    products?: Prisma.VendorProductListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
};
export type VendorOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    storeName?: Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    products?: Prisma.VendorProductOrderByRelationAggregateInput;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
};
export type VendorWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.VendorWhereInput | Prisma.VendorWhereInput[];
    OR?: Prisma.VendorWhereInput[];
    NOT?: Prisma.VendorWhereInput | Prisma.VendorWhereInput[];
    storeName?: Prisma.StringFilter<"Vendor"> | string;
    address?: Prisma.StringNullableFilter<"Vendor"> | string | null;
    isActive?: Prisma.BoolFilter<"Vendor"> | boolean;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    products?: Prisma.VendorProductListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
}, "id" | "userId">;
export type VendorOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    storeName?: Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    _count?: Prisma.VendorCountOrderByAggregateInput;
    _max?: Prisma.VendorMaxOrderByAggregateInput;
    _min?: Prisma.VendorMinOrderByAggregateInput;
};
export type VendorScalarWhereWithAggregatesInput = {
    AND?: Prisma.VendorScalarWhereWithAggregatesInput | Prisma.VendorScalarWhereWithAggregatesInput[];
    OR?: Prisma.VendorScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VendorScalarWhereWithAggregatesInput | Prisma.VendorScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Vendor"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Vendor"> | string;
    storeName?: Prisma.StringWithAggregatesFilter<"Vendor"> | string;
    address?: Prisma.StringNullableWithAggregatesFilter<"Vendor"> | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"Vendor"> | boolean;
};
export type VendorCreateInput = {
    id?: string;
    storeName: string;
    address?: string | null;
    isActive?: boolean;
    user: Prisma.UserCreateNestedOneWithoutVendorInput;
    products?: Prisma.VendorProductCreateNestedManyWithoutVendorInput;
    orders?: Prisma.OrderCreateNestedManyWithoutVendorInput;
};
export type VendorUncheckedCreateInput = {
    id?: string;
    userId: string;
    storeName: string;
    address?: string | null;
    isActive?: boolean;
    products?: Prisma.VendorProductUncheckedCreateNestedManyWithoutVendorInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutVendorInput;
};
export type VendorUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    storeName?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    user?: Prisma.UserUpdateOneRequiredWithoutVendorNestedInput;
    products?: Prisma.VendorProductUpdateManyWithoutVendorNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutVendorNestedInput;
};
export type VendorUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    storeName?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    products?: Prisma.VendorProductUncheckedUpdateManyWithoutVendorNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutVendorNestedInput;
};
export type VendorCreateManyInput = {
    id?: string;
    userId: string;
    storeName: string;
    address?: string | null;
    isActive?: boolean;
};
export type VendorUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    storeName?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type VendorUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    storeName?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type VendorNullableScalarRelationFilter = {
    is?: Prisma.VendorWhereInput | null;
    isNot?: Prisma.VendorWhereInput | null;
};
export type VendorCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    storeName?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type VendorMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    storeName?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type VendorMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    storeName?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type VendorScalarRelationFilter = {
    is?: Prisma.VendorWhereInput;
    isNot?: Prisma.VendorWhereInput;
};
export type VendorCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutUserInput, Prisma.VendorUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutUserInput;
    connect?: Prisma.VendorWhereUniqueInput;
};
export type VendorUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutUserInput, Prisma.VendorUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutUserInput;
    connect?: Prisma.VendorWhereUniqueInput;
};
export type VendorUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutUserInput, Prisma.VendorUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutUserInput;
    upsert?: Prisma.VendorUpsertWithoutUserInput;
    disconnect?: Prisma.VendorWhereInput | boolean;
    delete?: Prisma.VendorWhereInput | boolean;
    connect?: Prisma.VendorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VendorUpdateToOneWithWhereWithoutUserInput, Prisma.VendorUpdateWithoutUserInput>, Prisma.VendorUncheckedUpdateWithoutUserInput>;
};
export type VendorUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutUserInput, Prisma.VendorUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutUserInput;
    upsert?: Prisma.VendorUpsertWithoutUserInput;
    disconnect?: Prisma.VendorWhereInput | boolean;
    delete?: Prisma.VendorWhereInput | boolean;
    connect?: Prisma.VendorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VendorUpdateToOneWithWhereWithoutUserInput, Prisma.VendorUpdateWithoutUserInput>, Prisma.VendorUncheckedUpdateWithoutUserInput>;
};
export type VendorCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutOrdersInput, Prisma.VendorUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.VendorWhereUniqueInput;
};
export type VendorUpdateOneWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutOrdersInput, Prisma.VendorUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.VendorUpsertWithoutOrdersInput;
    disconnect?: Prisma.VendorWhereInput | boolean;
    delete?: Prisma.VendorWhereInput | boolean;
    connect?: Prisma.VendorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VendorUpdateToOneWithWhereWithoutOrdersInput, Prisma.VendorUpdateWithoutOrdersInput>, Prisma.VendorUncheckedUpdateWithoutOrdersInput>;
};
export type VendorCreateNestedOneWithoutProductsInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutProductsInput, Prisma.VendorUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutProductsInput;
    connect?: Prisma.VendorWhereUniqueInput;
};
export type VendorUpdateOneRequiredWithoutProductsNestedInput = {
    create?: Prisma.XOR<Prisma.VendorCreateWithoutProductsInput, Prisma.VendorUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.VendorCreateOrConnectWithoutProductsInput;
    upsert?: Prisma.VendorUpsertWithoutProductsInput;
    connect?: Prisma.VendorWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.VendorUpdateToOneWithWhereWithoutProductsInput, Prisma.VendorUpdateWithoutProductsInput>, Prisma.VendorUncheckedUpdateWithoutProductsInput>;
};
export type VendorCreateWithoutUserInput = {
    id?: string;
    storeName: string;
    address?: string | null;
    isActive?: boolean;
    products?: Prisma.VendorProductCreateNestedManyWithoutVendorInput;
    orders?: Prisma.OrderCreateNestedManyWithoutVendorInput;
};
export type VendorUncheckedCreateWithoutUserInput = {
    id?: string;
    storeName: string;
    address?: string | null;
    isActive?: boolean;
    products?: Prisma.VendorProductUncheckedCreateNestedManyWithoutVendorInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutVendorInput;
};
export type VendorCreateOrConnectWithoutUserInput = {
    where: Prisma.VendorWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorCreateWithoutUserInput, Prisma.VendorUncheckedCreateWithoutUserInput>;
};
export type VendorUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.VendorUpdateWithoutUserInput, Prisma.VendorUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.VendorCreateWithoutUserInput, Prisma.VendorUncheckedCreateWithoutUserInput>;
    where?: Prisma.VendorWhereInput;
};
export type VendorUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.VendorWhereInput;
    data: Prisma.XOR<Prisma.VendorUpdateWithoutUserInput, Prisma.VendorUncheckedUpdateWithoutUserInput>;
};
export type VendorUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    storeName?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    products?: Prisma.VendorProductUpdateManyWithoutVendorNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutVendorNestedInput;
};
export type VendorUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    storeName?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    products?: Prisma.VendorProductUncheckedUpdateManyWithoutVendorNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutVendorNestedInput;
};
export type VendorCreateWithoutOrdersInput = {
    id?: string;
    storeName: string;
    address?: string | null;
    isActive?: boolean;
    user: Prisma.UserCreateNestedOneWithoutVendorInput;
    products?: Prisma.VendorProductCreateNestedManyWithoutVendorInput;
};
export type VendorUncheckedCreateWithoutOrdersInput = {
    id?: string;
    userId: string;
    storeName: string;
    address?: string | null;
    isActive?: boolean;
    products?: Prisma.VendorProductUncheckedCreateNestedManyWithoutVendorInput;
};
export type VendorCreateOrConnectWithoutOrdersInput = {
    where: Prisma.VendorWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorCreateWithoutOrdersInput, Prisma.VendorUncheckedCreateWithoutOrdersInput>;
};
export type VendorUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.VendorUpdateWithoutOrdersInput, Prisma.VendorUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.VendorCreateWithoutOrdersInput, Prisma.VendorUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.VendorWhereInput;
};
export type VendorUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.VendorWhereInput;
    data: Prisma.XOR<Prisma.VendorUpdateWithoutOrdersInput, Prisma.VendorUncheckedUpdateWithoutOrdersInput>;
};
export type VendorUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    storeName?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    user?: Prisma.UserUpdateOneRequiredWithoutVendorNestedInput;
    products?: Prisma.VendorProductUpdateManyWithoutVendorNestedInput;
};
export type VendorUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    storeName?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    products?: Prisma.VendorProductUncheckedUpdateManyWithoutVendorNestedInput;
};
export type VendorCreateWithoutProductsInput = {
    id?: string;
    storeName: string;
    address?: string | null;
    isActive?: boolean;
    user: Prisma.UserCreateNestedOneWithoutVendorInput;
    orders?: Prisma.OrderCreateNestedManyWithoutVendorInput;
};
export type VendorUncheckedCreateWithoutProductsInput = {
    id?: string;
    userId: string;
    storeName: string;
    address?: string | null;
    isActive?: boolean;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutVendorInput;
};
export type VendorCreateOrConnectWithoutProductsInput = {
    where: Prisma.VendorWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorCreateWithoutProductsInput, Prisma.VendorUncheckedCreateWithoutProductsInput>;
};
export type VendorUpsertWithoutProductsInput = {
    update: Prisma.XOR<Prisma.VendorUpdateWithoutProductsInput, Prisma.VendorUncheckedUpdateWithoutProductsInput>;
    create: Prisma.XOR<Prisma.VendorCreateWithoutProductsInput, Prisma.VendorUncheckedCreateWithoutProductsInput>;
    where?: Prisma.VendorWhereInput;
};
export type VendorUpdateToOneWithWhereWithoutProductsInput = {
    where?: Prisma.VendorWhereInput;
    data: Prisma.XOR<Prisma.VendorUpdateWithoutProductsInput, Prisma.VendorUncheckedUpdateWithoutProductsInput>;
};
export type VendorUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    storeName?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    user?: Prisma.UserUpdateOneRequiredWithoutVendorNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutVendorNestedInput;
};
export type VendorUncheckedUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    storeName?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutVendorNestedInput;
};
export type VendorCountOutputType = {
    products: number;
    orders: number;
};
export type VendorCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    products?: boolean | VendorCountOutputTypeCountProductsArgs;
    orders?: boolean | VendorCountOutputTypeCountOrdersArgs;
};
export type VendorCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorCountOutputTypeSelect<ExtArgs> | null;
};
export type VendorCountOutputTypeCountProductsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorProductWhereInput;
};
export type VendorCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
export type VendorSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    storeName?: boolean;
    address?: boolean;
    isActive?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    products?: boolean | Prisma.Vendor$productsArgs<ExtArgs>;
    orders?: boolean | Prisma.Vendor$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.VendorCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendor"]>;
export type VendorSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    storeName?: boolean;
    address?: boolean;
    isActive?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendor"]>;
export type VendorSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    storeName?: boolean;
    address?: boolean;
    isActive?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vendor"]>;
export type VendorSelectScalar = {
    id?: boolean;
    userId?: boolean;
    storeName?: boolean;
    address?: boolean;
    isActive?: boolean;
};
export type VendorOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "storeName" | "address" | "isActive", ExtArgs["result"]["vendor"]>;
export type VendorInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    products?: boolean | Prisma.Vendor$productsArgs<ExtArgs>;
    orders?: boolean | Prisma.Vendor$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.VendorCountOutputTypeDefaultArgs<ExtArgs>;
};
export type VendorIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type VendorIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $VendorPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Vendor";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        products: Prisma.$VendorProductPayload<ExtArgs>[];
        orders: Prisma.$OrderPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        storeName: string;
        address: string | null;
        isActive: boolean;
    }, ExtArgs["result"]["vendor"]>;
    composites: {};
};
export type VendorGetPayload<S extends boolean | null | undefined | VendorDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VendorPayload, S>;
export type VendorCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VendorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VendorCountAggregateInputType | true;
};
export interface VendorDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Vendor'];
        meta: {
            name: 'Vendor';
        };
    };
    findUnique<T extends VendorFindUniqueArgs>(args: Prisma.SelectSubset<T, VendorFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VendorFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VendorFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VendorFindFirstArgs>(args?: Prisma.SelectSubset<T, VendorFindFirstArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VendorFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VendorFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VendorFindManyArgs>(args?: Prisma.SelectSubset<T, VendorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VendorCreateArgs>(args: Prisma.SelectSubset<T, VendorCreateArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VendorCreateManyArgs>(args?: Prisma.SelectSubset<T, VendorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends VendorCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VendorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends VendorDeleteArgs>(args: Prisma.SelectSubset<T, VendorDeleteArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VendorUpdateArgs>(args: Prisma.SelectSubset<T, VendorUpdateArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VendorDeleteManyArgs>(args?: Prisma.SelectSubset<T, VendorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VendorUpdateManyArgs>(args: Prisma.SelectSubset<T, VendorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends VendorUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VendorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends VendorUpsertArgs>(args: Prisma.SelectSubset<T, VendorUpsertArgs<ExtArgs>>): Prisma.Prisma__VendorClient<runtime.Types.Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VendorCountArgs>(args?: Prisma.Subset<T, VendorCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VendorCountAggregateOutputType> : number>;
    aggregate<T extends VendorAggregateArgs>(args: Prisma.Subset<T, VendorAggregateArgs>): Prisma.PrismaPromise<GetVendorAggregateType<T>>;
    groupBy<T extends VendorGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VendorGroupByArgs['orderBy'];
    } : {
        orderBy?: VendorGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VendorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VendorFieldRefs;
}
export interface Prisma__VendorClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    products<T extends Prisma.Vendor$productsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Vendor$productsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VendorProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orders<T extends Prisma.Vendor$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Vendor$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VendorFieldRefs {
    readonly id: Prisma.FieldRef<"Vendor", 'String'>;
    readonly userId: Prisma.FieldRef<"Vendor", 'String'>;
    readonly storeName: Prisma.FieldRef<"Vendor", 'String'>;
    readonly address: Prisma.FieldRef<"Vendor", 'String'>;
    readonly isActive: Prisma.FieldRef<"Vendor", 'Boolean'>;
}
export type VendorFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorSelect<ExtArgs> | null;
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    include?: Prisma.VendorInclude<ExtArgs> | null;
    where: Prisma.VendorWhereUniqueInput;
};
export type VendorFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorSelect<ExtArgs> | null;
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    include?: Prisma.VendorInclude<ExtArgs> | null;
    where: Prisma.VendorWhereUniqueInput;
};
export type VendorFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorSelect<ExtArgs> | null;
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    include?: Prisma.VendorInclude<ExtArgs> | null;
    where?: Prisma.VendorWhereInput;
    orderBy?: Prisma.VendorOrderByWithRelationInput | Prisma.VendorOrderByWithRelationInput[];
    cursor?: Prisma.VendorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorScalarFieldEnum | Prisma.VendorScalarFieldEnum[];
};
export type VendorFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorSelect<ExtArgs> | null;
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    include?: Prisma.VendorInclude<ExtArgs> | null;
    where?: Prisma.VendorWhereInput;
    orderBy?: Prisma.VendorOrderByWithRelationInput | Prisma.VendorOrderByWithRelationInput[];
    cursor?: Prisma.VendorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorScalarFieldEnum | Prisma.VendorScalarFieldEnum[];
};
export type VendorFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorSelect<ExtArgs> | null;
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    include?: Prisma.VendorInclude<ExtArgs> | null;
    where?: Prisma.VendorWhereInput;
    orderBy?: Prisma.VendorOrderByWithRelationInput | Prisma.VendorOrderByWithRelationInput[];
    cursor?: Prisma.VendorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VendorScalarFieldEnum | Prisma.VendorScalarFieldEnum[];
};
export type VendorCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorSelect<ExtArgs> | null;
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    include?: Prisma.VendorInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VendorCreateInput, Prisma.VendorUncheckedCreateInput>;
};
export type VendorCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VendorCreateManyInput | Prisma.VendorCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VendorCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    data: Prisma.VendorCreateManyInput | Prisma.VendorCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.VendorIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type VendorUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorSelect<ExtArgs> | null;
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    include?: Prisma.VendorInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VendorUpdateInput, Prisma.VendorUncheckedUpdateInput>;
    where: Prisma.VendorWhereUniqueInput;
};
export type VendorUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VendorUpdateManyMutationInput, Prisma.VendorUncheckedUpdateManyInput>;
    where?: Prisma.VendorWhereInput;
    limit?: number;
};
export type VendorUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VendorUpdateManyMutationInput, Prisma.VendorUncheckedUpdateManyInput>;
    where?: Prisma.VendorWhereInput;
    limit?: number;
    include?: Prisma.VendorIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type VendorUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorSelect<ExtArgs> | null;
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    include?: Prisma.VendorInclude<ExtArgs> | null;
    where: Prisma.VendorWhereUniqueInput;
    create: Prisma.XOR<Prisma.VendorCreateInput, Prisma.VendorUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VendorUpdateInput, Prisma.VendorUncheckedUpdateInput>;
};
export type VendorDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorSelect<ExtArgs> | null;
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    include?: Prisma.VendorInclude<ExtArgs> | null;
    where: Prisma.VendorWhereUniqueInput;
};
export type VendorDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VendorWhereInput;
    limit?: number;
};
export type Vendor$productsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Vendor$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type VendorDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VendorSelect<ExtArgs> | null;
    omit?: Prisma.VendorOmit<ExtArgs> | null;
    include?: Prisma.VendorInclude<ExtArgs> | null;
};
