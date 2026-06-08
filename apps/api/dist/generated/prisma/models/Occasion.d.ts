import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OccasionModel = runtime.Types.Result.DefaultSelection<Prisma.$OccasionPayload>;
export type AggregateOccasion = {
    _count: OccasionCountAggregateOutputType | null;
    _min: OccasionMinAggregateOutputType | null;
    _max: OccasionMaxAggregateOutputType | null;
};
export type OccasionMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    imageUrl: string | null;
    isActive: boolean | null;
};
export type OccasionMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    imageUrl: string | null;
    isActive: boolean | null;
};
export type OccasionCountAggregateOutputType = {
    id: number;
    name: number;
    slug: number;
    imageUrl: number;
    isActive: number;
    _all: number;
};
export type OccasionMinAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    imageUrl?: true;
    isActive?: true;
};
export type OccasionMaxAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    imageUrl?: true;
    isActive?: true;
};
export type OccasionCountAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    imageUrl?: true;
    isActive?: true;
    _all?: true;
};
export type OccasionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OccasionWhereInput;
    orderBy?: Prisma.OccasionOrderByWithRelationInput | Prisma.OccasionOrderByWithRelationInput[];
    cursor?: Prisma.OccasionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OccasionCountAggregateInputType;
    _min?: OccasionMinAggregateInputType;
    _max?: OccasionMaxAggregateInputType;
};
export type GetOccasionAggregateType<T extends OccasionAggregateArgs> = {
    [P in keyof T & keyof AggregateOccasion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOccasion[P]> : Prisma.GetScalarType<T[P], AggregateOccasion[P]>;
};
export type OccasionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OccasionWhereInput;
    orderBy?: Prisma.OccasionOrderByWithAggregationInput | Prisma.OccasionOrderByWithAggregationInput[];
    by: Prisma.OccasionScalarFieldEnum[] | Prisma.OccasionScalarFieldEnum;
    having?: Prisma.OccasionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OccasionCountAggregateInputType | true;
    _min?: OccasionMinAggregateInputType;
    _max?: OccasionMaxAggregateInputType;
};
export type OccasionGroupByOutputType = {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
    isActive: boolean;
    _count: OccasionCountAggregateOutputType | null;
    _min: OccasionMinAggregateOutputType | null;
    _max: OccasionMaxAggregateOutputType | null;
};
export type GetOccasionGroupByPayload<T extends OccasionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OccasionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OccasionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OccasionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OccasionGroupByOutputType[P]>;
}>>;
export type OccasionWhereInput = {
    AND?: Prisma.OccasionWhereInput | Prisma.OccasionWhereInput[];
    OR?: Prisma.OccasionWhereInput[];
    NOT?: Prisma.OccasionWhereInput | Prisma.OccasionWhereInput[];
    id?: Prisma.StringFilter<"Occasion"> | string;
    name?: Prisma.StringFilter<"Occasion"> | string;
    slug?: Prisma.StringFilter<"Occasion"> | string;
    imageUrl?: Prisma.StringNullableFilter<"Occasion"> | string | null;
    isActive?: Prisma.BoolFilter<"Occasion"> | boolean;
    products?: Prisma.ProductOccasionListRelationFilter;
};
export type OccasionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    products?: Prisma.ProductOccasionOrderByRelationAggregateInput;
};
export type OccasionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    slug?: string;
    AND?: Prisma.OccasionWhereInput | Prisma.OccasionWhereInput[];
    OR?: Prisma.OccasionWhereInput[];
    NOT?: Prisma.OccasionWhereInput | Prisma.OccasionWhereInput[];
    imageUrl?: Prisma.StringNullableFilter<"Occasion"> | string | null;
    isActive?: Prisma.BoolFilter<"Occasion"> | boolean;
    products?: Prisma.ProductOccasionListRelationFilter;
}, "id" | "name" | "slug">;
export type OccasionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    _count?: Prisma.OccasionCountOrderByAggregateInput;
    _max?: Prisma.OccasionMaxOrderByAggregateInput;
    _min?: Prisma.OccasionMinOrderByAggregateInput;
};
export type OccasionScalarWhereWithAggregatesInput = {
    AND?: Prisma.OccasionScalarWhereWithAggregatesInput | Prisma.OccasionScalarWhereWithAggregatesInput[];
    OR?: Prisma.OccasionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OccasionScalarWhereWithAggregatesInput | Prisma.OccasionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Occasion"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Occasion"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"Occasion"> | string;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"Occasion"> | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"Occasion"> | boolean;
};
export type OccasionCreateInput = {
    id?: string;
    name: string;
    slug: string;
    imageUrl?: string | null;
    isActive?: boolean;
    products?: Prisma.ProductOccasionCreateNestedManyWithoutOccasionInput;
};
export type OccasionUncheckedCreateInput = {
    id?: string;
    name: string;
    slug: string;
    imageUrl?: string | null;
    isActive?: boolean;
    products?: Prisma.ProductOccasionUncheckedCreateNestedManyWithoutOccasionInput;
};
export type OccasionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    products?: Prisma.ProductOccasionUpdateManyWithoutOccasionNestedInput;
};
export type OccasionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    products?: Prisma.ProductOccasionUncheckedUpdateManyWithoutOccasionNestedInput;
};
export type OccasionCreateManyInput = {
    id?: string;
    name: string;
    slug: string;
    imageUrl?: string | null;
    isActive?: boolean;
};
export type OccasionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type OccasionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type OccasionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type OccasionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type OccasionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type OccasionScalarRelationFilter = {
    is?: Prisma.OccasionWhereInput;
    isNot?: Prisma.OccasionWhereInput;
};
export type OccasionCreateNestedOneWithoutProductsInput = {
    create?: Prisma.XOR<Prisma.OccasionCreateWithoutProductsInput, Prisma.OccasionUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.OccasionCreateOrConnectWithoutProductsInput;
    connect?: Prisma.OccasionWhereUniqueInput;
};
export type OccasionUpdateOneRequiredWithoutProductsNestedInput = {
    create?: Prisma.XOR<Prisma.OccasionCreateWithoutProductsInput, Prisma.OccasionUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.OccasionCreateOrConnectWithoutProductsInput;
    upsert?: Prisma.OccasionUpsertWithoutProductsInput;
    connect?: Prisma.OccasionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OccasionUpdateToOneWithWhereWithoutProductsInput, Prisma.OccasionUpdateWithoutProductsInput>, Prisma.OccasionUncheckedUpdateWithoutProductsInput>;
};
export type OccasionCreateWithoutProductsInput = {
    id?: string;
    name: string;
    slug: string;
    imageUrl?: string | null;
    isActive?: boolean;
};
export type OccasionUncheckedCreateWithoutProductsInput = {
    id?: string;
    name: string;
    slug: string;
    imageUrl?: string | null;
    isActive?: boolean;
};
export type OccasionCreateOrConnectWithoutProductsInput = {
    where: Prisma.OccasionWhereUniqueInput;
    create: Prisma.XOR<Prisma.OccasionCreateWithoutProductsInput, Prisma.OccasionUncheckedCreateWithoutProductsInput>;
};
export type OccasionUpsertWithoutProductsInput = {
    update: Prisma.XOR<Prisma.OccasionUpdateWithoutProductsInput, Prisma.OccasionUncheckedUpdateWithoutProductsInput>;
    create: Prisma.XOR<Prisma.OccasionCreateWithoutProductsInput, Prisma.OccasionUncheckedCreateWithoutProductsInput>;
    where?: Prisma.OccasionWhereInput;
};
export type OccasionUpdateToOneWithWhereWithoutProductsInput = {
    where?: Prisma.OccasionWhereInput;
    data: Prisma.XOR<Prisma.OccasionUpdateWithoutProductsInput, Prisma.OccasionUncheckedUpdateWithoutProductsInput>;
};
export type OccasionUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type OccasionUncheckedUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type OccasionCountOutputType = {
    products: number;
};
export type OccasionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    products?: boolean | OccasionCountOutputTypeCountProductsArgs;
};
export type OccasionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OccasionCountOutputTypeSelect<ExtArgs> | null;
};
export type OccasionCountOutputTypeCountProductsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductOccasionWhereInput;
};
export type OccasionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    imageUrl?: boolean;
    isActive?: boolean;
    products?: boolean | Prisma.Occasion$productsArgs<ExtArgs>;
    _count?: boolean | Prisma.OccasionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["occasion"]>;
export type OccasionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    imageUrl?: boolean;
    isActive?: boolean;
}, ExtArgs["result"]["occasion"]>;
export type OccasionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    imageUrl?: boolean;
    isActive?: boolean;
}, ExtArgs["result"]["occasion"]>;
export type OccasionSelectScalar = {
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    imageUrl?: boolean;
    isActive?: boolean;
};
export type OccasionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "slug" | "imageUrl" | "isActive", ExtArgs["result"]["occasion"]>;
export type OccasionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    products?: boolean | Prisma.Occasion$productsArgs<ExtArgs>;
    _count?: boolean | Prisma.OccasionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type OccasionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type OccasionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $OccasionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Occasion";
    objects: {
        products: Prisma.$ProductOccasionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        slug: string;
        imageUrl: string | null;
        isActive: boolean;
    }, ExtArgs["result"]["occasion"]>;
    composites: {};
};
export type OccasionGetPayload<S extends boolean | null | undefined | OccasionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OccasionPayload, S>;
export type OccasionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OccasionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OccasionCountAggregateInputType | true;
};
export interface OccasionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Occasion'];
        meta: {
            name: 'Occasion';
        };
    };
    findUnique<T extends OccasionFindUniqueArgs>(args: Prisma.SelectSubset<T, OccasionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OccasionClient<runtime.Types.Result.GetResult<Prisma.$OccasionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OccasionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OccasionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OccasionClient<runtime.Types.Result.GetResult<Prisma.$OccasionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OccasionFindFirstArgs>(args?: Prisma.SelectSubset<T, OccasionFindFirstArgs<ExtArgs>>): Prisma.Prisma__OccasionClient<runtime.Types.Result.GetResult<Prisma.$OccasionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OccasionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OccasionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OccasionClient<runtime.Types.Result.GetResult<Prisma.$OccasionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OccasionFindManyArgs>(args?: Prisma.SelectSubset<T, OccasionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OccasionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OccasionCreateArgs>(args: Prisma.SelectSubset<T, OccasionCreateArgs<ExtArgs>>): Prisma.Prisma__OccasionClient<runtime.Types.Result.GetResult<Prisma.$OccasionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OccasionCreateManyArgs>(args?: Prisma.SelectSubset<T, OccasionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OccasionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OccasionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OccasionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OccasionDeleteArgs>(args: Prisma.SelectSubset<T, OccasionDeleteArgs<ExtArgs>>): Prisma.Prisma__OccasionClient<runtime.Types.Result.GetResult<Prisma.$OccasionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OccasionUpdateArgs>(args: Prisma.SelectSubset<T, OccasionUpdateArgs<ExtArgs>>): Prisma.Prisma__OccasionClient<runtime.Types.Result.GetResult<Prisma.$OccasionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OccasionDeleteManyArgs>(args?: Prisma.SelectSubset<T, OccasionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OccasionUpdateManyArgs>(args: Prisma.SelectSubset<T, OccasionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OccasionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OccasionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OccasionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OccasionUpsertArgs>(args: Prisma.SelectSubset<T, OccasionUpsertArgs<ExtArgs>>): Prisma.Prisma__OccasionClient<runtime.Types.Result.GetResult<Prisma.$OccasionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OccasionCountArgs>(args?: Prisma.Subset<T, OccasionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OccasionCountAggregateOutputType> : number>;
    aggregate<T extends OccasionAggregateArgs>(args: Prisma.Subset<T, OccasionAggregateArgs>): Prisma.PrismaPromise<GetOccasionAggregateType<T>>;
    groupBy<T extends OccasionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OccasionGroupByArgs['orderBy'];
    } : {
        orderBy?: OccasionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OccasionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOccasionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OccasionFieldRefs;
}
export interface Prisma__OccasionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    products<T extends Prisma.Occasion$productsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Occasion$productsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductOccasionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OccasionFieldRefs {
    readonly id: Prisma.FieldRef<"Occasion", 'String'>;
    readonly name: Prisma.FieldRef<"Occasion", 'String'>;
    readonly slug: Prisma.FieldRef<"Occasion", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"Occasion", 'String'>;
    readonly isActive: Prisma.FieldRef<"Occasion", 'Boolean'>;
}
export type OccasionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OccasionSelect<ExtArgs> | null;
    omit?: Prisma.OccasionOmit<ExtArgs> | null;
    include?: Prisma.OccasionInclude<ExtArgs> | null;
    where: Prisma.OccasionWhereUniqueInput;
};
export type OccasionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OccasionSelect<ExtArgs> | null;
    omit?: Prisma.OccasionOmit<ExtArgs> | null;
    include?: Prisma.OccasionInclude<ExtArgs> | null;
    where: Prisma.OccasionWhereUniqueInput;
};
export type OccasionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OccasionSelect<ExtArgs> | null;
    omit?: Prisma.OccasionOmit<ExtArgs> | null;
    include?: Prisma.OccasionInclude<ExtArgs> | null;
    where?: Prisma.OccasionWhereInput;
    orderBy?: Prisma.OccasionOrderByWithRelationInput | Prisma.OccasionOrderByWithRelationInput[];
    cursor?: Prisma.OccasionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OccasionScalarFieldEnum | Prisma.OccasionScalarFieldEnum[];
};
export type OccasionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OccasionSelect<ExtArgs> | null;
    omit?: Prisma.OccasionOmit<ExtArgs> | null;
    include?: Prisma.OccasionInclude<ExtArgs> | null;
    where?: Prisma.OccasionWhereInput;
    orderBy?: Prisma.OccasionOrderByWithRelationInput | Prisma.OccasionOrderByWithRelationInput[];
    cursor?: Prisma.OccasionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OccasionScalarFieldEnum | Prisma.OccasionScalarFieldEnum[];
};
export type OccasionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OccasionSelect<ExtArgs> | null;
    omit?: Prisma.OccasionOmit<ExtArgs> | null;
    include?: Prisma.OccasionInclude<ExtArgs> | null;
    where?: Prisma.OccasionWhereInput;
    orderBy?: Prisma.OccasionOrderByWithRelationInput | Prisma.OccasionOrderByWithRelationInput[];
    cursor?: Prisma.OccasionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OccasionScalarFieldEnum | Prisma.OccasionScalarFieldEnum[];
};
export type OccasionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OccasionSelect<ExtArgs> | null;
    omit?: Prisma.OccasionOmit<ExtArgs> | null;
    include?: Prisma.OccasionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OccasionCreateInput, Prisma.OccasionUncheckedCreateInput>;
};
export type OccasionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OccasionCreateManyInput | Prisma.OccasionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OccasionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OccasionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OccasionOmit<ExtArgs> | null;
    data: Prisma.OccasionCreateManyInput | Prisma.OccasionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OccasionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OccasionSelect<ExtArgs> | null;
    omit?: Prisma.OccasionOmit<ExtArgs> | null;
    include?: Prisma.OccasionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OccasionUpdateInput, Prisma.OccasionUncheckedUpdateInput>;
    where: Prisma.OccasionWhereUniqueInput;
};
export type OccasionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OccasionUpdateManyMutationInput, Prisma.OccasionUncheckedUpdateManyInput>;
    where?: Prisma.OccasionWhereInput;
    limit?: number;
};
export type OccasionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OccasionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OccasionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OccasionUpdateManyMutationInput, Prisma.OccasionUncheckedUpdateManyInput>;
    where?: Prisma.OccasionWhereInput;
    limit?: number;
};
export type OccasionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OccasionSelect<ExtArgs> | null;
    omit?: Prisma.OccasionOmit<ExtArgs> | null;
    include?: Prisma.OccasionInclude<ExtArgs> | null;
    where: Prisma.OccasionWhereUniqueInput;
    create: Prisma.XOR<Prisma.OccasionCreateInput, Prisma.OccasionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OccasionUpdateInput, Prisma.OccasionUncheckedUpdateInput>;
};
export type OccasionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OccasionSelect<ExtArgs> | null;
    omit?: Prisma.OccasionOmit<ExtArgs> | null;
    include?: Prisma.OccasionInclude<ExtArgs> | null;
    where: Prisma.OccasionWhereUniqueInput;
};
export type OccasionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OccasionWhereInput;
    limit?: number;
};
export type Occasion$productsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OccasionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OccasionSelect<ExtArgs> | null;
    omit?: Prisma.OccasionOmit<ExtArgs> | null;
    include?: Prisma.OccasionInclude<ExtArgs> | null;
};
