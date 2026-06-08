import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RelationshipModel = runtime.Types.Result.DefaultSelection<Prisma.$RelationshipPayload>;
export type AggregateRelationship = {
    _count: RelationshipCountAggregateOutputType | null;
    _min: RelationshipMinAggregateOutputType | null;
    _max: RelationshipMaxAggregateOutputType | null;
};
export type RelationshipMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    imageUrl: string | null;
    isActive: boolean | null;
};
export type RelationshipMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    imageUrl: string | null;
    isActive: boolean | null;
};
export type RelationshipCountAggregateOutputType = {
    id: number;
    name: number;
    slug: number;
    imageUrl: number;
    isActive: number;
    _all: number;
};
export type RelationshipMinAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    imageUrl?: true;
    isActive?: true;
};
export type RelationshipMaxAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    imageUrl?: true;
    isActive?: true;
};
export type RelationshipCountAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    imageUrl?: true;
    isActive?: true;
    _all?: true;
};
export type RelationshipAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RelationshipWhereInput;
    orderBy?: Prisma.RelationshipOrderByWithRelationInput | Prisma.RelationshipOrderByWithRelationInput[];
    cursor?: Prisma.RelationshipWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RelationshipCountAggregateInputType;
    _min?: RelationshipMinAggregateInputType;
    _max?: RelationshipMaxAggregateInputType;
};
export type GetRelationshipAggregateType<T extends RelationshipAggregateArgs> = {
    [P in keyof T & keyof AggregateRelationship]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRelationship[P]> : Prisma.GetScalarType<T[P], AggregateRelationship[P]>;
};
export type RelationshipGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RelationshipWhereInput;
    orderBy?: Prisma.RelationshipOrderByWithAggregationInput | Prisma.RelationshipOrderByWithAggregationInput[];
    by: Prisma.RelationshipScalarFieldEnum[] | Prisma.RelationshipScalarFieldEnum;
    having?: Prisma.RelationshipScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RelationshipCountAggregateInputType | true;
    _min?: RelationshipMinAggregateInputType;
    _max?: RelationshipMaxAggregateInputType;
};
export type RelationshipGroupByOutputType = {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
    isActive: boolean;
    _count: RelationshipCountAggregateOutputType | null;
    _min: RelationshipMinAggregateOutputType | null;
    _max: RelationshipMaxAggregateOutputType | null;
};
export type GetRelationshipGroupByPayload<T extends RelationshipGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RelationshipGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RelationshipGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RelationshipGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RelationshipGroupByOutputType[P]>;
}>>;
export type RelationshipWhereInput = {
    AND?: Prisma.RelationshipWhereInput | Prisma.RelationshipWhereInput[];
    OR?: Prisma.RelationshipWhereInput[];
    NOT?: Prisma.RelationshipWhereInput | Prisma.RelationshipWhereInput[];
    id?: Prisma.StringFilter<"Relationship"> | string;
    name?: Prisma.StringFilter<"Relationship"> | string;
    slug?: Prisma.StringFilter<"Relationship"> | string;
    imageUrl?: Prisma.StringNullableFilter<"Relationship"> | string | null;
    isActive?: Prisma.BoolFilter<"Relationship"> | boolean;
    products?: Prisma.ProductRelationshipListRelationFilter;
};
export type RelationshipOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    products?: Prisma.ProductRelationshipOrderByRelationAggregateInput;
};
export type RelationshipWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    slug?: string;
    AND?: Prisma.RelationshipWhereInput | Prisma.RelationshipWhereInput[];
    OR?: Prisma.RelationshipWhereInput[];
    NOT?: Prisma.RelationshipWhereInput | Prisma.RelationshipWhereInput[];
    imageUrl?: Prisma.StringNullableFilter<"Relationship"> | string | null;
    isActive?: Prisma.BoolFilter<"Relationship"> | boolean;
    products?: Prisma.ProductRelationshipListRelationFilter;
}, "id" | "name" | "slug">;
export type RelationshipOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    _count?: Prisma.RelationshipCountOrderByAggregateInput;
    _max?: Prisma.RelationshipMaxOrderByAggregateInput;
    _min?: Prisma.RelationshipMinOrderByAggregateInput;
};
export type RelationshipScalarWhereWithAggregatesInput = {
    AND?: Prisma.RelationshipScalarWhereWithAggregatesInput | Prisma.RelationshipScalarWhereWithAggregatesInput[];
    OR?: Prisma.RelationshipScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RelationshipScalarWhereWithAggregatesInput | Prisma.RelationshipScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Relationship"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Relationship"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"Relationship"> | string;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"Relationship"> | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"Relationship"> | boolean;
};
export type RelationshipCreateInput = {
    id?: string;
    name: string;
    slug: string;
    imageUrl?: string | null;
    isActive?: boolean;
    products?: Prisma.ProductRelationshipCreateNestedManyWithoutRelationshipInput;
};
export type RelationshipUncheckedCreateInput = {
    id?: string;
    name: string;
    slug: string;
    imageUrl?: string | null;
    isActive?: boolean;
    products?: Prisma.ProductRelationshipUncheckedCreateNestedManyWithoutRelationshipInput;
};
export type RelationshipUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    products?: Prisma.ProductRelationshipUpdateManyWithoutRelationshipNestedInput;
};
export type RelationshipUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    products?: Prisma.ProductRelationshipUncheckedUpdateManyWithoutRelationshipNestedInput;
};
export type RelationshipCreateManyInput = {
    id?: string;
    name: string;
    slug: string;
    imageUrl?: string | null;
    isActive?: boolean;
};
export type RelationshipUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type RelationshipUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type RelationshipCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type RelationshipMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type RelationshipMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type RelationshipScalarRelationFilter = {
    is?: Prisma.RelationshipWhereInput;
    isNot?: Prisma.RelationshipWhereInput;
};
export type RelationshipCreateNestedOneWithoutProductsInput = {
    create?: Prisma.XOR<Prisma.RelationshipCreateWithoutProductsInput, Prisma.RelationshipUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.RelationshipCreateOrConnectWithoutProductsInput;
    connect?: Prisma.RelationshipWhereUniqueInput;
};
export type RelationshipUpdateOneRequiredWithoutProductsNestedInput = {
    create?: Prisma.XOR<Prisma.RelationshipCreateWithoutProductsInput, Prisma.RelationshipUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.RelationshipCreateOrConnectWithoutProductsInput;
    upsert?: Prisma.RelationshipUpsertWithoutProductsInput;
    connect?: Prisma.RelationshipWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RelationshipUpdateToOneWithWhereWithoutProductsInput, Prisma.RelationshipUpdateWithoutProductsInput>, Prisma.RelationshipUncheckedUpdateWithoutProductsInput>;
};
export type RelationshipCreateWithoutProductsInput = {
    id?: string;
    name: string;
    slug: string;
    imageUrl?: string | null;
    isActive?: boolean;
};
export type RelationshipUncheckedCreateWithoutProductsInput = {
    id?: string;
    name: string;
    slug: string;
    imageUrl?: string | null;
    isActive?: boolean;
};
export type RelationshipCreateOrConnectWithoutProductsInput = {
    where: Prisma.RelationshipWhereUniqueInput;
    create: Prisma.XOR<Prisma.RelationshipCreateWithoutProductsInput, Prisma.RelationshipUncheckedCreateWithoutProductsInput>;
};
export type RelationshipUpsertWithoutProductsInput = {
    update: Prisma.XOR<Prisma.RelationshipUpdateWithoutProductsInput, Prisma.RelationshipUncheckedUpdateWithoutProductsInput>;
    create: Prisma.XOR<Prisma.RelationshipCreateWithoutProductsInput, Prisma.RelationshipUncheckedCreateWithoutProductsInput>;
    where?: Prisma.RelationshipWhereInput;
};
export type RelationshipUpdateToOneWithWhereWithoutProductsInput = {
    where?: Prisma.RelationshipWhereInput;
    data: Prisma.XOR<Prisma.RelationshipUpdateWithoutProductsInput, Prisma.RelationshipUncheckedUpdateWithoutProductsInput>;
};
export type RelationshipUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type RelationshipUncheckedUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type RelationshipCountOutputType = {
    products: number;
};
export type RelationshipCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    products?: boolean | RelationshipCountOutputTypeCountProductsArgs;
};
export type RelationshipCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RelationshipCountOutputTypeSelect<ExtArgs> | null;
};
export type RelationshipCountOutputTypeCountProductsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductRelationshipWhereInput;
};
export type RelationshipSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    imageUrl?: boolean;
    isActive?: boolean;
    products?: boolean | Prisma.Relationship$productsArgs<ExtArgs>;
    _count?: boolean | Prisma.RelationshipCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["relationship"]>;
export type RelationshipSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    imageUrl?: boolean;
    isActive?: boolean;
}, ExtArgs["result"]["relationship"]>;
export type RelationshipSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    imageUrl?: boolean;
    isActive?: boolean;
}, ExtArgs["result"]["relationship"]>;
export type RelationshipSelectScalar = {
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    imageUrl?: boolean;
    isActive?: boolean;
};
export type RelationshipOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "slug" | "imageUrl" | "isActive", ExtArgs["result"]["relationship"]>;
export type RelationshipInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    products?: boolean | Prisma.Relationship$productsArgs<ExtArgs>;
    _count?: boolean | Prisma.RelationshipCountOutputTypeDefaultArgs<ExtArgs>;
};
export type RelationshipIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type RelationshipIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $RelationshipPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Relationship";
    objects: {
        products: Prisma.$ProductRelationshipPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        slug: string;
        imageUrl: string | null;
        isActive: boolean;
    }, ExtArgs["result"]["relationship"]>;
    composites: {};
};
export type RelationshipGetPayload<S extends boolean | null | undefined | RelationshipDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RelationshipPayload, S>;
export type RelationshipCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RelationshipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RelationshipCountAggregateInputType | true;
};
export interface RelationshipDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Relationship'];
        meta: {
            name: 'Relationship';
        };
    };
    findUnique<T extends RelationshipFindUniqueArgs>(args: Prisma.SelectSubset<T, RelationshipFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RelationshipClient<runtime.Types.Result.GetResult<Prisma.$RelationshipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RelationshipFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RelationshipFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RelationshipClient<runtime.Types.Result.GetResult<Prisma.$RelationshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RelationshipFindFirstArgs>(args?: Prisma.SelectSubset<T, RelationshipFindFirstArgs<ExtArgs>>): Prisma.Prisma__RelationshipClient<runtime.Types.Result.GetResult<Prisma.$RelationshipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RelationshipFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RelationshipFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RelationshipClient<runtime.Types.Result.GetResult<Prisma.$RelationshipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RelationshipFindManyArgs>(args?: Prisma.SelectSubset<T, RelationshipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RelationshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RelationshipCreateArgs>(args: Prisma.SelectSubset<T, RelationshipCreateArgs<ExtArgs>>): Prisma.Prisma__RelationshipClient<runtime.Types.Result.GetResult<Prisma.$RelationshipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RelationshipCreateManyArgs>(args?: Prisma.SelectSubset<T, RelationshipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RelationshipCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RelationshipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RelationshipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RelationshipDeleteArgs>(args: Prisma.SelectSubset<T, RelationshipDeleteArgs<ExtArgs>>): Prisma.Prisma__RelationshipClient<runtime.Types.Result.GetResult<Prisma.$RelationshipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RelationshipUpdateArgs>(args: Prisma.SelectSubset<T, RelationshipUpdateArgs<ExtArgs>>): Prisma.Prisma__RelationshipClient<runtime.Types.Result.GetResult<Prisma.$RelationshipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RelationshipDeleteManyArgs>(args?: Prisma.SelectSubset<T, RelationshipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RelationshipUpdateManyArgs>(args: Prisma.SelectSubset<T, RelationshipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RelationshipUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RelationshipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RelationshipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RelationshipUpsertArgs>(args: Prisma.SelectSubset<T, RelationshipUpsertArgs<ExtArgs>>): Prisma.Prisma__RelationshipClient<runtime.Types.Result.GetResult<Prisma.$RelationshipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RelationshipCountArgs>(args?: Prisma.Subset<T, RelationshipCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RelationshipCountAggregateOutputType> : number>;
    aggregate<T extends RelationshipAggregateArgs>(args: Prisma.Subset<T, RelationshipAggregateArgs>): Prisma.PrismaPromise<GetRelationshipAggregateType<T>>;
    groupBy<T extends RelationshipGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RelationshipGroupByArgs['orderBy'];
    } : {
        orderBy?: RelationshipGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RelationshipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRelationshipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RelationshipFieldRefs;
}
export interface Prisma__RelationshipClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    products<T extends Prisma.Relationship$productsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Relationship$productsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductRelationshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RelationshipFieldRefs {
    readonly id: Prisma.FieldRef<"Relationship", 'String'>;
    readonly name: Prisma.FieldRef<"Relationship", 'String'>;
    readonly slug: Prisma.FieldRef<"Relationship", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"Relationship", 'String'>;
    readonly isActive: Prisma.FieldRef<"Relationship", 'Boolean'>;
}
export type RelationshipFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RelationshipSelect<ExtArgs> | null;
    omit?: Prisma.RelationshipOmit<ExtArgs> | null;
    include?: Prisma.RelationshipInclude<ExtArgs> | null;
    where: Prisma.RelationshipWhereUniqueInput;
};
export type RelationshipFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RelationshipSelect<ExtArgs> | null;
    omit?: Prisma.RelationshipOmit<ExtArgs> | null;
    include?: Prisma.RelationshipInclude<ExtArgs> | null;
    where: Prisma.RelationshipWhereUniqueInput;
};
export type RelationshipFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RelationshipSelect<ExtArgs> | null;
    omit?: Prisma.RelationshipOmit<ExtArgs> | null;
    include?: Prisma.RelationshipInclude<ExtArgs> | null;
    where?: Prisma.RelationshipWhereInput;
    orderBy?: Prisma.RelationshipOrderByWithRelationInput | Prisma.RelationshipOrderByWithRelationInput[];
    cursor?: Prisma.RelationshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RelationshipScalarFieldEnum | Prisma.RelationshipScalarFieldEnum[];
};
export type RelationshipFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RelationshipSelect<ExtArgs> | null;
    omit?: Prisma.RelationshipOmit<ExtArgs> | null;
    include?: Prisma.RelationshipInclude<ExtArgs> | null;
    where?: Prisma.RelationshipWhereInput;
    orderBy?: Prisma.RelationshipOrderByWithRelationInput | Prisma.RelationshipOrderByWithRelationInput[];
    cursor?: Prisma.RelationshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RelationshipScalarFieldEnum | Prisma.RelationshipScalarFieldEnum[];
};
export type RelationshipFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RelationshipSelect<ExtArgs> | null;
    omit?: Prisma.RelationshipOmit<ExtArgs> | null;
    include?: Prisma.RelationshipInclude<ExtArgs> | null;
    where?: Prisma.RelationshipWhereInput;
    orderBy?: Prisma.RelationshipOrderByWithRelationInput | Prisma.RelationshipOrderByWithRelationInput[];
    cursor?: Prisma.RelationshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RelationshipScalarFieldEnum | Prisma.RelationshipScalarFieldEnum[];
};
export type RelationshipCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RelationshipSelect<ExtArgs> | null;
    omit?: Prisma.RelationshipOmit<ExtArgs> | null;
    include?: Prisma.RelationshipInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RelationshipCreateInput, Prisma.RelationshipUncheckedCreateInput>;
};
export type RelationshipCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RelationshipCreateManyInput | Prisma.RelationshipCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RelationshipCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RelationshipSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RelationshipOmit<ExtArgs> | null;
    data: Prisma.RelationshipCreateManyInput | Prisma.RelationshipCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RelationshipUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RelationshipSelect<ExtArgs> | null;
    omit?: Prisma.RelationshipOmit<ExtArgs> | null;
    include?: Prisma.RelationshipInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RelationshipUpdateInput, Prisma.RelationshipUncheckedUpdateInput>;
    where: Prisma.RelationshipWhereUniqueInput;
};
export type RelationshipUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RelationshipUpdateManyMutationInput, Prisma.RelationshipUncheckedUpdateManyInput>;
    where?: Prisma.RelationshipWhereInput;
    limit?: number;
};
export type RelationshipUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RelationshipSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RelationshipOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RelationshipUpdateManyMutationInput, Prisma.RelationshipUncheckedUpdateManyInput>;
    where?: Prisma.RelationshipWhereInput;
    limit?: number;
};
export type RelationshipUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RelationshipSelect<ExtArgs> | null;
    omit?: Prisma.RelationshipOmit<ExtArgs> | null;
    include?: Prisma.RelationshipInclude<ExtArgs> | null;
    where: Prisma.RelationshipWhereUniqueInput;
    create: Prisma.XOR<Prisma.RelationshipCreateInput, Prisma.RelationshipUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RelationshipUpdateInput, Prisma.RelationshipUncheckedUpdateInput>;
};
export type RelationshipDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RelationshipSelect<ExtArgs> | null;
    omit?: Prisma.RelationshipOmit<ExtArgs> | null;
    include?: Prisma.RelationshipInclude<ExtArgs> | null;
    where: Prisma.RelationshipWhereUniqueInput;
};
export type RelationshipDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RelationshipWhereInput;
    limit?: number;
};
export type Relationship$productsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RelationshipDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RelationshipSelect<ExtArgs> | null;
    omit?: Prisma.RelationshipOmit<ExtArgs> | null;
    include?: Prisma.RelationshipInclude<ExtArgs> | null;
};
