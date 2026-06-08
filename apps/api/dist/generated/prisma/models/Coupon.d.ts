import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CouponModel = runtime.Types.Result.DefaultSelection<Prisma.$CouponPayload>;
export type AggregateCoupon = {
    _count: CouponCountAggregateOutputType | null;
    _avg: CouponAvgAggregateOutputType | null;
    _sum: CouponSumAggregateOutputType | null;
    _min: CouponMinAggregateOutputType | null;
    _max: CouponMaxAggregateOutputType | null;
};
export type CouponAvgAggregateOutputType = {
    discountValue: number | null;
    minOrderValue: number | null;
    maxDiscount: number | null;
    usageLimit: number | null;
    usageCount: number | null;
};
export type CouponSumAggregateOutputType = {
    discountValue: number | null;
    minOrderValue: number | null;
    maxDiscount: number | null;
    usageLimit: number | null;
    usageCount: number | null;
};
export type CouponMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    discountType: string | null;
    discountValue: number | null;
    minOrderValue: number | null;
    maxDiscount: number | null;
    validFrom: Date | null;
    validUntil: Date | null;
    isActive: boolean | null;
    usageLimit: number | null;
    usageCount: number | null;
};
export type CouponMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    discountType: string | null;
    discountValue: number | null;
    minOrderValue: number | null;
    maxDiscount: number | null;
    validFrom: Date | null;
    validUntil: Date | null;
    isActive: boolean | null;
    usageLimit: number | null;
    usageCount: number | null;
};
export type CouponCountAggregateOutputType = {
    id: number;
    code: number;
    discountType: number;
    discountValue: number;
    minOrderValue: number;
    maxDiscount: number;
    validFrom: number;
    validUntil: number;
    isActive: number;
    usageLimit: number;
    usageCount: number;
    _all: number;
};
export type CouponAvgAggregateInputType = {
    discountValue?: true;
    minOrderValue?: true;
    maxDiscount?: true;
    usageLimit?: true;
    usageCount?: true;
};
export type CouponSumAggregateInputType = {
    discountValue?: true;
    minOrderValue?: true;
    maxDiscount?: true;
    usageLimit?: true;
    usageCount?: true;
};
export type CouponMinAggregateInputType = {
    id?: true;
    code?: true;
    discountType?: true;
    discountValue?: true;
    minOrderValue?: true;
    maxDiscount?: true;
    validFrom?: true;
    validUntil?: true;
    isActive?: true;
    usageLimit?: true;
    usageCount?: true;
};
export type CouponMaxAggregateInputType = {
    id?: true;
    code?: true;
    discountType?: true;
    discountValue?: true;
    minOrderValue?: true;
    maxDiscount?: true;
    validFrom?: true;
    validUntil?: true;
    isActive?: true;
    usageLimit?: true;
    usageCount?: true;
};
export type CouponCountAggregateInputType = {
    id?: true;
    code?: true;
    discountType?: true;
    discountValue?: true;
    minOrderValue?: true;
    maxDiscount?: true;
    validFrom?: true;
    validUntil?: true;
    isActive?: true;
    usageLimit?: true;
    usageCount?: true;
    _all?: true;
};
export type CouponAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CouponWhereInput;
    orderBy?: Prisma.CouponOrderByWithRelationInput | Prisma.CouponOrderByWithRelationInput[];
    cursor?: Prisma.CouponWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CouponCountAggregateInputType;
    _avg?: CouponAvgAggregateInputType;
    _sum?: CouponSumAggregateInputType;
    _min?: CouponMinAggregateInputType;
    _max?: CouponMaxAggregateInputType;
};
export type GetCouponAggregateType<T extends CouponAggregateArgs> = {
    [P in keyof T & keyof AggregateCoupon]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCoupon[P]> : Prisma.GetScalarType<T[P], AggregateCoupon[P]>;
};
export type CouponGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CouponWhereInput;
    orderBy?: Prisma.CouponOrderByWithAggregationInput | Prisma.CouponOrderByWithAggregationInput[];
    by: Prisma.CouponScalarFieldEnum[] | Prisma.CouponScalarFieldEnum;
    having?: Prisma.CouponScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CouponCountAggregateInputType | true;
    _avg?: CouponAvgAggregateInputType;
    _sum?: CouponSumAggregateInputType;
    _min?: CouponMinAggregateInputType;
    _max?: CouponMaxAggregateInputType;
};
export type CouponGroupByOutputType = {
    id: string;
    code: string;
    discountType: string;
    discountValue: number;
    minOrderValue: number;
    maxDiscount: number | null;
    validFrom: Date;
    validUntil: Date;
    isActive: boolean;
    usageLimit: number | null;
    usageCount: number;
    _count: CouponCountAggregateOutputType | null;
    _avg: CouponAvgAggregateOutputType | null;
    _sum: CouponSumAggregateOutputType | null;
    _min: CouponMinAggregateOutputType | null;
    _max: CouponMaxAggregateOutputType | null;
};
export type GetCouponGroupByPayload<T extends CouponGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CouponGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CouponGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CouponGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CouponGroupByOutputType[P]>;
}>>;
export type CouponWhereInput = {
    AND?: Prisma.CouponWhereInput | Prisma.CouponWhereInput[];
    OR?: Prisma.CouponWhereInput[];
    NOT?: Prisma.CouponWhereInput | Prisma.CouponWhereInput[];
    id?: Prisma.StringFilter<"Coupon"> | string;
    code?: Prisma.StringFilter<"Coupon"> | string;
    discountType?: Prisma.StringFilter<"Coupon"> | string;
    discountValue?: Prisma.FloatFilter<"Coupon"> | number;
    minOrderValue?: Prisma.FloatFilter<"Coupon"> | number;
    maxDiscount?: Prisma.FloatNullableFilter<"Coupon"> | number | null;
    validFrom?: Prisma.DateTimeFilter<"Coupon"> | Date | string;
    validUntil?: Prisma.DateTimeFilter<"Coupon"> | Date | string;
    isActive?: Prisma.BoolFilter<"Coupon"> | boolean;
    usageLimit?: Prisma.IntNullableFilter<"Coupon"> | number | null;
    usageCount?: Prisma.IntFilter<"Coupon"> | number;
};
export type CouponOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    discountType?: Prisma.SortOrder;
    discountValue?: Prisma.SortOrder;
    minOrderValue?: Prisma.SortOrder;
    maxDiscount?: Prisma.SortOrderInput | Prisma.SortOrder;
    validFrom?: Prisma.SortOrder;
    validUntil?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrderInput | Prisma.SortOrder;
    usageCount?: Prisma.SortOrder;
};
export type CouponWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.CouponWhereInput | Prisma.CouponWhereInput[];
    OR?: Prisma.CouponWhereInput[];
    NOT?: Prisma.CouponWhereInput | Prisma.CouponWhereInput[];
    discountType?: Prisma.StringFilter<"Coupon"> | string;
    discountValue?: Prisma.FloatFilter<"Coupon"> | number;
    minOrderValue?: Prisma.FloatFilter<"Coupon"> | number;
    maxDiscount?: Prisma.FloatNullableFilter<"Coupon"> | number | null;
    validFrom?: Prisma.DateTimeFilter<"Coupon"> | Date | string;
    validUntil?: Prisma.DateTimeFilter<"Coupon"> | Date | string;
    isActive?: Prisma.BoolFilter<"Coupon"> | boolean;
    usageLimit?: Prisma.IntNullableFilter<"Coupon"> | number | null;
    usageCount?: Prisma.IntFilter<"Coupon"> | number;
}, "id" | "code">;
export type CouponOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    discountType?: Prisma.SortOrder;
    discountValue?: Prisma.SortOrder;
    minOrderValue?: Prisma.SortOrder;
    maxDiscount?: Prisma.SortOrderInput | Prisma.SortOrder;
    validFrom?: Prisma.SortOrder;
    validUntil?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrderInput | Prisma.SortOrder;
    usageCount?: Prisma.SortOrder;
    _count?: Prisma.CouponCountOrderByAggregateInput;
    _avg?: Prisma.CouponAvgOrderByAggregateInput;
    _max?: Prisma.CouponMaxOrderByAggregateInput;
    _min?: Prisma.CouponMinOrderByAggregateInput;
    _sum?: Prisma.CouponSumOrderByAggregateInput;
};
export type CouponScalarWhereWithAggregatesInput = {
    AND?: Prisma.CouponScalarWhereWithAggregatesInput | Prisma.CouponScalarWhereWithAggregatesInput[];
    OR?: Prisma.CouponScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CouponScalarWhereWithAggregatesInput | Prisma.CouponScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Coupon"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Coupon"> | string;
    discountType?: Prisma.StringWithAggregatesFilter<"Coupon"> | string;
    discountValue?: Prisma.FloatWithAggregatesFilter<"Coupon"> | number;
    minOrderValue?: Prisma.FloatWithAggregatesFilter<"Coupon"> | number;
    maxDiscount?: Prisma.FloatNullableWithAggregatesFilter<"Coupon"> | number | null;
    validFrom?: Prisma.DateTimeWithAggregatesFilter<"Coupon"> | Date | string;
    validUntil?: Prisma.DateTimeWithAggregatesFilter<"Coupon"> | Date | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"Coupon"> | boolean;
    usageLimit?: Prisma.IntNullableWithAggregatesFilter<"Coupon"> | number | null;
    usageCount?: Prisma.IntWithAggregatesFilter<"Coupon"> | number;
};
export type CouponCreateInput = {
    id?: string;
    code: string;
    discountType: string;
    discountValue: number;
    minOrderValue?: number;
    maxDiscount?: number | null;
    validFrom: Date | string;
    validUntil: Date | string;
    isActive?: boolean;
    usageLimit?: number | null;
    usageCount?: number;
};
export type CouponUncheckedCreateInput = {
    id?: string;
    code: string;
    discountType: string;
    discountValue: number;
    minOrderValue?: number;
    maxDiscount?: number | null;
    validFrom: Date | string;
    validUntil: Date | string;
    isActive?: boolean;
    usageLimit?: number | null;
    usageCount?: number;
};
export type CouponUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    discountType?: Prisma.StringFieldUpdateOperationsInput | string;
    discountValue?: Prisma.FloatFieldUpdateOperationsInput | number;
    minOrderValue?: Prisma.FloatFieldUpdateOperationsInput | number;
    maxDiscount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    validFrom?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usageCount?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CouponUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    discountType?: Prisma.StringFieldUpdateOperationsInput | string;
    discountValue?: Prisma.FloatFieldUpdateOperationsInput | number;
    minOrderValue?: Prisma.FloatFieldUpdateOperationsInput | number;
    maxDiscount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    validFrom?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usageCount?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CouponCreateManyInput = {
    id?: string;
    code: string;
    discountType: string;
    discountValue: number;
    minOrderValue?: number;
    maxDiscount?: number | null;
    validFrom: Date | string;
    validUntil: Date | string;
    isActive?: boolean;
    usageLimit?: number | null;
    usageCount?: number;
};
export type CouponUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    discountType?: Prisma.StringFieldUpdateOperationsInput | string;
    discountValue?: Prisma.FloatFieldUpdateOperationsInput | number;
    minOrderValue?: Prisma.FloatFieldUpdateOperationsInput | number;
    maxDiscount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    validFrom?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usageCount?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CouponUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    discountType?: Prisma.StringFieldUpdateOperationsInput | string;
    discountValue?: Prisma.FloatFieldUpdateOperationsInput | number;
    minOrderValue?: Prisma.FloatFieldUpdateOperationsInput | number;
    maxDiscount?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    validFrom?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    usageLimit?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usageCount?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type CouponCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    discountType?: Prisma.SortOrder;
    discountValue?: Prisma.SortOrder;
    minOrderValue?: Prisma.SortOrder;
    maxDiscount?: Prisma.SortOrder;
    validFrom?: Prisma.SortOrder;
    validUntil?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrder;
    usageCount?: Prisma.SortOrder;
};
export type CouponAvgOrderByAggregateInput = {
    discountValue?: Prisma.SortOrder;
    minOrderValue?: Prisma.SortOrder;
    maxDiscount?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrder;
    usageCount?: Prisma.SortOrder;
};
export type CouponMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    discountType?: Prisma.SortOrder;
    discountValue?: Prisma.SortOrder;
    minOrderValue?: Prisma.SortOrder;
    maxDiscount?: Prisma.SortOrder;
    validFrom?: Prisma.SortOrder;
    validUntil?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrder;
    usageCount?: Prisma.SortOrder;
};
export type CouponMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    discountType?: Prisma.SortOrder;
    discountValue?: Prisma.SortOrder;
    minOrderValue?: Prisma.SortOrder;
    maxDiscount?: Prisma.SortOrder;
    validFrom?: Prisma.SortOrder;
    validUntil?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrder;
    usageCount?: Prisma.SortOrder;
};
export type CouponSumOrderByAggregateInput = {
    discountValue?: Prisma.SortOrder;
    minOrderValue?: Prisma.SortOrder;
    maxDiscount?: Prisma.SortOrder;
    usageLimit?: Prisma.SortOrder;
    usageCount?: Prisma.SortOrder;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type CouponSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    discountType?: boolean;
    discountValue?: boolean;
    minOrderValue?: boolean;
    maxDiscount?: boolean;
    validFrom?: boolean;
    validUntil?: boolean;
    isActive?: boolean;
    usageLimit?: boolean;
    usageCount?: boolean;
}, ExtArgs["result"]["coupon"]>;
export type CouponSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    discountType?: boolean;
    discountValue?: boolean;
    minOrderValue?: boolean;
    maxDiscount?: boolean;
    validFrom?: boolean;
    validUntil?: boolean;
    isActive?: boolean;
    usageLimit?: boolean;
    usageCount?: boolean;
}, ExtArgs["result"]["coupon"]>;
export type CouponSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    discountType?: boolean;
    discountValue?: boolean;
    minOrderValue?: boolean;
    maxDiscount?: boolean;
    validFrom?: boolean;
    validUntil?: boolean;
    isActive?: boolean;
    usageLimit?: boolean;
    usageCount?: boolean;
}, ExtArgs["result"]["coupon"]>;
export type CouponSelectScalar = {
    id?: boolean;
    code?: boolean;
    discountType?: boolean;
    discountValue?: boolean;
    minOrderValue?: boolean;
    maxDiscount?: boolean;
    validFrom?: boolean;
    validUntil?: boolean;
    isActive?: boolean;
    usageLimit?: boolean;
    usageCount?: boolean;
};
export type CouponOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "discountType" | "discountValue" | "minOrderValue" | "maxDiscount" | "validFrom" | "validUntil" | "isActive" | "usageLimit" | "usageCount", ExtArgs["result"]["coupon"]>;
export type $CouponPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Coupon";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        discountType: string;
        discountValue: number;
        minOrderValue: number;
        maxDiscount: number | null;
        validFrom: Date;
        validUntil: Date;
        isActive: boolean;
        usageLimit: number | null;
        usageCount: number;
    }, ExtArgs["result"]["coupon"]>;
    composites: {};
};
export type CouponGetPayload<S extends boolean | null | undefined | CouponDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CouponPayload, S>;
export type CouponCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CouponFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CouponCountAggregateInputType | true;
};
export interface CouponDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Coupon'];
        meta: {
            name: 'Coupon';
        };
    };
    findUnique<T extends CouponFindUniqueArgs>(args: Prisma.SelectSubset<T, CouponFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CouponFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CouponFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CouponFindFirstArgs>(args?: Prisma.SelectSubset<T, CouponFindFirstArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CouponFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CouponFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CouponFindManyArgs>(args?: Prisma.SelectSubset<T, CouponFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CouponCreateArgs>(args: Prisma.SelectSubset<T, CouponCreateArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CouponCreateManyArgs>(args?: Prisma.SelectSubset<T, CouponCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CouponCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CouponCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CouponDeleteArgs>(args: Prisma.SelectSubset<T, CouponDeleteArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CouponUpdateArgs>(args: Prisma.SelectSubset<T, CouponUpdateArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CouponDeleteManyArgs>(args?: Prisma.SelectSubset<T, CouponDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CouponUpdateManyArgs>(args: Prisma.SelectSubset<T, CouponUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CouponUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CouponUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CouponUpsertArgs>(args: Prisma.SelectSubset<T, CouponUpsertArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CouponCountArgs>(args?: Prisma.Subset<T, CouponCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CouponCountAggregateOutputType> : number>;
    aggregate<T extends CouponAggregateArgs>(args: Prisma.Subset<T, CouponAggregateArgs>): Prisma.PrismaPromise<GetCouponAggregateType<T>>;
    groupBy<T extends CouponGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CouponGroupByArgs['orderBy'];
    } : {
        orderBy?: CouponGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CouponGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCouponGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CouponFieldRefs;
}
export interface Prisma__CouponClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CouponFieldRefs {
    readonly id: Prisma.FieldRef<"Coupon", 'String'>;
    readonly code: Prisma.FieldRef<"Coupon", 'String'>;
    readonly discountType: Prisma.FieldRef<"Coupon", 'String'>;
    readonly discountValue: Prisma.FieldRef<"Coupon", 'Float'>;
    readonly minOrderValue: Prisma.FieldRef<"Coupon", 'Float'>;
    readonly maxDiscount: Prisma.FieldRef<"Coupon", 'Float'>;
    readonly validFrom: Prisma.FieldRef<"Coupon", 'DateTime'>;
    readonly validUntil: Prisma.FieldRef<"Coupon", 'DateTime'>;
    readonly isActive: Prisma.FieldRef<"Coupon", 'Boolean'>;
    readonly usageLimit: Prisma.FieldRef<"Coupon", 'Int'>;
    readonly usageCount: Prisma.FieldRef<"Coupon", 'Int'>;
}
export type CouponFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    where: Prisma.CouponWhereUniqueInput;
};
export type CouponFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    where: Prisma.CouponWhereUniqueInput;
};
export type CouponFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    where?: Prisma.CouponWhereInput;
    orderBy?: Prisma.CouponOrderByWithRelationInput | Prisma.CouponOrderByWithRelationInput[];
    cursor?: Prisma.CouponWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CouponScalarFieldEnum | Prisma.CouponScalarFieldEnum[];
};
export type CouponFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    where?: Prisma.CouponWhereInput;
    orderBy?: Prisma.CouponOrderByWithRelationInput | Prisma.CouponOrderByWithRelationInput[];
    cursor?: Prisma.CouponWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CouponScalarFieldEnum | Prisma.CouponScalarFieldEnum[];
};
export type CouponFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    where?: Prisma.CouponWhereInput;
    orderBy?: Prisma.CouponOrderByWithRelationInput | Prisma.CouponOrderByWithRelationInput[];
    cursor?: Prisma.CouponWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CouponScalarFieldEnum | Prisma.CouponScalarFieldEnum[];
};
export type CouponCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CouponCreateInput, Prisma.CouponUncheckedCreateInput>;
};
export type CouponCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CouponCreateManyInput | Prisma.CouponCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CouponCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    data: Prisma.CouponCreateManyInput | Prisma.CouponCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CouponUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CouponUpdateInput, Prisma.CouponUncheckedUpdateInput>;
    where: Prisma.CouponWhereUniqueInput;
};
export type CouponUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CouponUpdateManyMutationInput, Prisma.CouponUncheckedUpdateManyInput>;
    where?: Prisma.CouponWhereInput;
    limit?: number;
};
export type CouponUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CouponUpdateManyMutationInput, Prisma.CouponUncheckedUpdateManyInput>;
    where?: Prisma.CouponWhereInput;
    limit?: number;
};
export type CouponUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    where: Prisma.CouponWhereUniqueInput;
    create: Prisma.XOR<Prisma.CouponCreateInput, Prisma.CouponUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CouponUpdateInput, Prisma.CouponUncheckedUpdateInput>;
};
export type CouponDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    where: Prisma.CouponWhereUniqueInput;
};
export type CouponDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CouponWhereInput;
    limit?: number;
};
export type CouponDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
};
