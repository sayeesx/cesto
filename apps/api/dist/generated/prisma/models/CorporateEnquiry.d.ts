import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CorporateEnquiryModel = runtime.Types.Result.DefaultSelection<Prisma.$CorporateEnquiryPayload>;
export type AggregateCorporateEnquiry = {
    _count: CorporateEnquiryCountAggregateOutputType | null;
    _avg: CorporateEnquiryAvgAggregateOutputType | null;
    _sum: CorporateEnquirySumAggregateOutputType | null;
    _min: CorporateEnquiryMinAggregateOutputType | null;
    _max: CorporateEnquiryMaxAggregateOutputType | null;
};
export type CorporateEnquiryAvgAggregateOutputType = {
    budget: number | null;
};
export type CorporateEnquirySumAggregateOutputType = {
    budget: number | null;
};
export type CorporateEnquiryMinAggregateOutputType = {
    id: string | null;
    companyName: string | null;
    contactName: string | null;
    email: string | null;
    phone: string | null;
    budget: number | null;
    message: string | null;
    status: string | null;
    createdAt: Date | null;
};
export type CorporateEnquiryMaxAggregateOutputType = {
    id: string | null;
    companyName: string | null;
    contactName: string | null;
    email: string | null;
    phone: string | null;
    budget: number | null;
    message: string | null;
    status: string | null;
    createdAt: Date | null;
};
export type CorporateEnquiryCountAggregateOutputType = {
    id: number;
    companyName: number;
    contactName: number;
    email: number;
    phone: number;
    budget: number;
    message: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type CorporateEnquiryAvgAggregateInputType = {
    budget?: true;
};
export type CorporateEnquirySumAggregateInputType = {
    budget?: true;
};
export type CorporateEnquiryMinAggregateInputType = {
    id?: true;
    companyName?: true;
    contactName?: true;
    email?: true;
    phone?: true;
    budget?: true;
    message?: true;
    status?: true;
    createdAt?: true;
};
export type CorporateEnquiryMaxAggregateInputType = {
    id?: true;
    companyName?: true;
    contactName?: true;
    email?: true;
    phone?: true;
    budget?: true;
    message?: true;
    status?: true;
    createdAt?: true;
};
export type CorporateEnquiryCountAggregateInputType = {
    id?: true;
    companyName?: true;
    contactName?: true;
    email?: true;
    phone?: true;
    budget?: true;
    message?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type CorporateEnquiryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CorporateEnquiryWhereInput;
    orderBy?: Prisma.CorporateEnquiryOrderByWithRelationInput | Prisma.CorporateEnquiryOrderByWithRelationInput[];
    cursor?: Prisma.CorporateEnquiryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CorporateEnquiryCountAggregateInputType;
    _avg?: CorporateEnquiryAvgAggregateInputType;
    _sum?: CorporateEnquirySumAggregateInputType;
    _min?: CorporateEnquiryMinAggregateInputType;
    _max?: CorporateEnquiryMaxAggregateInputType;
};
export type GetCorporateEnquiryAggregateType<T extends CorporateEnquiryAggregateArgs> = {
    [P in keyof T & keyof AggregateCorporateEnquiry]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCorporateEnquiry[P]> : Prisma.GetScalarType<T[P], AggregateCorporateEnquiry[P]>;
};
export type CorporateEnquiryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CorporateEnquiryWhereInput;
    orderBy?: Prisma.CorporateEnquiryOrderByWithAggregationInput | Prisma.CorporateEnquiryOrderByWithAggregationInput[];
    by: Prisma.CorporateEnquiryScalarFieldEnum[] | Prisma.CorporateEnquiryScalarFieldEnum;
    having?: Prisma.CorporateEnquiryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CorporateEnquiryCountAggregateInputType | true;
    _avg?: CorporateEnquiryAvgAggregateInputType;
    _sum?: CorporateEnquirySumAggregateInputType;
    _min?: CorporateEnquiryMinAggregateInputType;
    _max?: CorporateEnquiryMaxAggregateInputType;
};
export type CorporateEnquiryGroupByOutputType = {
    id: string;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    budget: number | null;
    message: string;
    status: string;
    createdAt: Date;
    _count: CorporateEnquiryCountAggregateOutputType | null;
    _avg: CorporateEnquiryAvgAggregateOutputType | null;
    _sum: CorporateEnquirySumAggregateOutputType | null;
    _min: CorporateEnquiryMinAggregateOutputType | null;
    _max: CorporateEnquiryMaxAggregateOutputType | null;
};
export type GetCorporateEnquiryGroupByPayload<T extends CorporateEnquiryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CorporateEnquiryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CorporateEnquiryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CorporateEnquiryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CorporateEnquiryGroupByOutputType[P]>;
}>>;
export type CorporateEnquiryWhereInput = {
    AND?: Prisma.CorporateEnquiryWhereInput | Prisma.CorporateEnquiryWhereInput[];
    OR?: Prisma.CorporateEnquiryWhereInput[];
    NOT?: Prisma.CorporateEnquiryWhereInput | Prisma.CorporateEnquiryWhereInput[];
    id?: Prisma.StringFilter<"CorporateEnquiry"> | string;
    companyName?: Prisma.StringFilter<"CorporateEnquiry"> | string;
    contactName?: Prisma.StringFilter<"CorporateEnquiry"> | string;
    email?: Prisma.StringFilter<"CorporateEnquiry"> | string;
    phone?: Prisma.StringFilter<"CorporateEnquiry"> | string;
    budget?: Prisma.FloatNullableFilter<"CorporateEnquiry"> | number | null;
    message?: Prisma.StringFilter<"CorporateEnquiry"> | string;
    status?: Prisma.StringFilter<"CorporateEnquiry"> | string;
    createdAt?: Prisma.DateTimeFilter<"CorporateEnquiry"> | Date | string;
};
export type CorporateEnquiryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    companyName?: Prisma.SortOrder;
    contactName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    budget?: Prisma.SortOrderInput | Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CorporateEnquiryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CorporateEnquiryWhereInput | Prisma.CorporateEnquiryWhereInput[];
    OR?: Prisma.CorporateEnquiryWhereInput[];
    NOT?: Prisma.CorporateEnquiryWhereInput | Prisma.CorporateEnquiryWhereInput[];
    companyName?: Prisma.StringFilter<"CorporateEnquiry"> | string;
    contactName?: Prisma.StringFilter<"CorporateEnquiry"> | string;
    email?: Prisma.StringFilter<"CorporateEnquiry"> | string;
    phone?: Prisma.StringFilter<"CorporateEnquiry"> | string;
    budget?: Prisma.FloatNullableFilter<"CorporateEnquiry"> | number | null;
    message?: Prisma.StringFilter<"CorporateEnquiry"> | string;
    status?: Prisma.StringFilter<"CorporateEnquiry"> | string;
    createdAt?: Prisma.DateTimeFilter<"CorporateEnquiry"> | Date | string;
}, "id">;
export type CorporateEnquiryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    companyName?: Prisma.SortOrder;
    contactName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    budget?: Prisma.SortOrderInput | Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CorporateEnquiryCountOrderByAggregateInput;
    _avg?: Prisma.CorporateEnquiryAvgOrderByAggregateInput;
    _max?: Prisma.CorporateEnquiryMaxOrderByAggregateInput;
    _min?: Prisma.CorporateEnquiryMinOrderByAggregateInput;
    _sum?: Prisma.CorporateEnquirySumOrderByAggregateInput;
};
export type CorporateEnquiryScalarWhereWithAggregatesInput = {
    AND?: Prisma.CorporateEnquiryScalarWhereWithAggregatesInput | Prisma.CorporateEnquiryScalarWhereWithAggregatesInput[];
    OR?: Prisma.CorporateEnquiryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CorporateEnquiryScalarWhereWithAggregatesInput | Prisma.CorporateEnquiryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CorporateEnquiry"> | string;
    companyName?: Prisma.StringWithAggregatesFilter<"CorporateEnquiry"> | string;
    contactName?: Prisma.StringWithAggregatesFilter<"CorporateEnquiry"> | string;
    email?: Prisma.StringWithAggregatesFilter<"CorporateEnquiry"> | string;
    phone?: Prisma.StringWithAggregatesFilter<"CorporateEnquiry"> | string;
    budget?: Prisma.FloatNullableWithAggregatesFilter<"CorporateEnquiry"> | number | null;
    message?: Prisma.StringWithAggregatesFilter<"CorporateEnquiry"> | string;
    status?: Prisma.StringWithAggregatesFilter<"CorporateEnquiry"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CorporateEnquiry"> | Date | string;
};
export type CorporateEnquiryCreateInput = {
    id?: string;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    budget?: number | null;
    message: string;
    status?: string;
    createdAt?: Date | string;
};
export type CorporateEnquiryUncheckedCreateInput = {
    id?: string;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    budget?: number | null;
    message: string;
    status?: string;
    createdAt?: Date | string;
};
export type CorporateEnquiryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    budget?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CorporateEnquiryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    budget?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CorporateEnquiryCreateManyInput = {
    id?: string;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    budget?: number | null;
    message: string;
    status?: string;
    createdAt?: Date | string;
};
export type CorporateEnquiryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    budget?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CorporateEnquiryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    companyName?: Prisma.StringFieldUpdateOperationsInput | string;
    contactName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.StringFieldUpdateOperationsInput | string;
    budget?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CorporateEnquiryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyName?: Prisma.SortOrder;
    contactName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    budget?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CorporateEnquiryAvgOrderByAggregateInput = {
    budget?: Prisma.SortOrder;
};
export type CorporateEnquiryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyName?: Prisma.SortOrder;
    contactName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    budget?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CorporateEnquiryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyName?: Prisma.SortOrder;
    contactName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    budget?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CorporateEnquirySumOrderByAggregateInput = {
    budget?: Prisma.SortOrder;
};
export type CorporateEnquirySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    companyName?: boolean;
    contactName?: boolean;
    email?: boolean;
    phone?: boolean;
    budget?: boolean;
    message?: boolean;
    status?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["corporateEnquiry"]>;
export type CorporateEnquirySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    companyName?: boolean;
    contactName?: boolean;
    email?: boolean;
    phone?: boolean;
    budget?: boolean;
    message?: boolean;
    status?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["corporateEnquiry"]>;
export type CorporateEnquirySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    companyName?: boolean;
    contactName?: boolean;
    email?: boolean;
    phone?: boolean;
    budget?: boolean;
    message?: boolean;
    status?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["corporateEnquiry"]>;
export type CorporateEnquirySelectScalar = {
    id?: boolean;
    companyName?: boolean;
    contactName?: boolean;
    email?: boolean;
    phone?: boolean;
    budget?: boolean;
    message?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type CorporateEnquiryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "companyName" | "contactName" | "email" | "phone" | "budget" | "message" | "status" | "createdAt", ExtArgs["result"]["corporateEnquiry"]>;
export type $CorporateEnquiryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CorporateEnquiry";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        companyName: string;
        contactName: string;
        email: string;
        phone: string;
        budget: number | null;
        message: string;
        status: string;
        createdAt: Date;
    }, ExtArgs["result"]["corporateEnquiry"]>;
    composites: {};
};
export type CorporateEnquiryGetPayload<S extends boolean | null | undefined | CorporateEnquiryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CorporateEnquiryPayload, S>;
export type CorporateEnquiryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CorporateEnquiryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CorporateEnquiryCountAggregateInputType | true;
};
export interface CorporateEnquiryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CorporateEnquiry'];
        meta: {
            name: 'CorporateEnquiry';
        };
    };
    findUnique<T extends CorporateEnquiryFindUniqueArgs>(args: Prisma.SelectSubset<T, CorporateEnquiryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CorporateEnquiryClient<runtime.Types.Result.GetResult<Prisma.$CorporateEnquiryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CorporateEnquiryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CorporateEnquiryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CorporateEnquiryClient<runtime.Types.Result.GetResult<Prisma.$CorporateEnquiryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CorporateEnquiryFindFirstArgs>(args?: Prisma.SelectSubset<T, CorporateEnquiryFindFirstArgs<ExtArgs>>): Prisma.Prisma__CorporateEnquiryClient<runtime.Types.Result.GetResult<Prisma.$CorporateEnquiryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CorporateEnquiryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CorporateEnquiryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CorporateEnquiryClient<runtime.Types.Result.GetResult<Prisma.$CorporateEnquiryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CorporateEnquiryFindManyArgs>(args?: Prisma.SelectSubset<T, CorporateEnquiryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CorporateEnquiryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CorporateEnquiryCreateArgs>(args: Prisma.SelectSubset<T, CorporateEnquiryCreateArgs<ExtArgs>>): Prisma.Prisma__CorporateEnquiryClient<runtime.Types.Result.GetResult<Prisma.$CorporateEnquiryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CorporateEnquiryCreateManyArgs>(args?: Prisma.SelectSubset<T, CorporateEnquiryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CorporateEnquiryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CorporateEnquiryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CorporateEnquiryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CorporateEnquiryDeleteArgs>(args: Prisma.SelectSubset<T, CorporateEnquiryDeleteArgs<ExtArgs>>): Prisma.Prisma__CorporateEnquiryClient<runtime.Types.Result.GetResult<Prisma.$CorporateEnquiryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CorporateEnquiryUpdateArgs>(args: Prisma.SelectSubset<T, CorporateEnquiryUpdateArgs<ExtArgs>>): Prisma.Prisma__CorporateEnquiryClient<runtime.Types.Result.GetResult<Prisma.$CorporateEnquiryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CorporateEnquiryDeleteManyArgs>(args?: Prisma.SelectSubset<T, CorporateEnquiryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CorporateEnquiryUpdateManyArgs>(args: Prisma.SelectSubset<T, CorporateEnquiryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CorporateEnquiryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CorporateEnquiryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CorporateEnquiryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CorporateEnquiryUpsertArgs>(args: Prisma.SelectSubset<T, CorporateEnquiryUpsertArgs<ExtArgs>>): Prisma.Prisma__CorporateEnquiryClient<runtime.Types.Result.GetResult<Prisma.$CorporateEnquiryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CorporateEnquiryCountArgs>(args?: Prisma.Subset<T, CorporateEnquiryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CorporateEnquiryCountAggregateOutputType> : number>;
    aggregate<T extends CorporateEnquiryAggregateArgs>(args: Prisma.Subset<T, CorporateEnquiryAggregateArgs>): Prisma.PrismaPromise<GetCorporateEnquiryAggregateType<T>>;
    groupBy<T extends CorporateEnquiryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CorporateEnquiryGroupByArgs['orderBy'];
    } : {
        orderBy?: CorporateEnquiryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CorporateEnquiryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCorporateEnquiryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CorporateEnquiryFieldRefs;
}
export interface Prisma__CorporateEnquiryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CorporateEnquiryFieldRefs {
    readonly id: Prisma.FieldRef<"CorporateEnquiry", 'String'>;
    readonly companyName: Prisma.FieldRef<"CorporateEnquiry", 'String'>;
    readonly contactName: Prisma.FieldRef<"CorporateEnquiry", 'String'>;
    readonly email: Prisma.FieldRef<"CorporateEnquiry", 'String'>;
    readonly phone: Prisma.FieldRef<"CorporateEnquiry", 'String'>;
    readonly budget: Prisma.FieldRef<"CorporateEnquiry", 'Float'>;
    readonly message: Prisma.FieldRef<"CorporateEnquiry", 'String'>;
    readonly status: Prisma.FieldRef<"CorporateEnquiry", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CorporateEnquiry", 'DateTime'>;
}
export type CorporateEnquiryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CorporateEnquirySelect<ExtArgs> | null;
    omit?: Prisma.CorporateEnquiryOmit<ExtArgs> | null;
    where: Prisma.CorporateEnquiryWhereUniqueInput;
};
export type CorporateEnquiryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CorporateEnquirySelect<ExtArgs> | null;
    omit?: Prisma.CorporateEnquiryOmit<ExtArgs> | null;
    where: Prisma.CorporateEnquiryWhereUniqueInput;
};
export type CorporateEnquiryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CorporateEnquirySelect<ExtArgs> | null;
    omit?: Prisma.CorporateEnquiryOmit<ExtArgs> | null;
    where?: Prisma.CorporateEnquiryWhereInput;
    orderBy?: Prisma.CorporateEnquiryOrderByWithRelationInput | Prisma.CorporateEnquiryOrderByWithRelationInput[];
    cursor?: Prisma.CorporateEnquiryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CorporateEnquiryScalarFieldEnum | Prisma.CorporateEnquiryScalarFieldEnum[];
};
export type CorporateEnquiryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CorporateEnquirySelect<ExtArgs> | null;
    omit?: Prisma.CorporateEnquiryOmit<ExtArgs> | null;
    where?: Prisma.CorporateEnquiryWhereInput;
    orderBy?: Prisma.CorporateEnquiryOrderByWithRelationInput | Prisma.CorporateEnquiryOrderByWithRelationInput[];
    cursor?: Prisma.CorporateEnquiryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CorporateEnquiryScalarFieldEnum | Prisma.CorporateEnquiryScalarFieldEnum[];
};
export type CorporateEnquiryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CorporateEnquirySelect<ExtArgs> | null;
    omit?: Prisma.CorporateEnquiryOmit<ExtArgs> | null;
    where?: Prisma.CorporateEnquiryWhereInput;
    orderBy?: Prisma.CorporateEnquiryOrderByWithRelationInput | Prisma.CorporateEnquiryOrderByWithRelationInput[];
    cursor?: Prisma.CorporateEnquiryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CorporateEnquiryScalarFieldEnum | Prisma.CorporateEnquiryScalarFieldEnum[];
};
export type CorporateEnquiryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CorporateEnquirySelect<ExtArgs> | null;
    omit?: Prisma.CorporateEnquiryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CorporateEnquiryCreateInput, Prisma.CorporateEnquiryUncheckedCreateInput>;
};
export type CorporateEnquiryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CorporateEnquiryCreateManyInput | Prisma.CorporateEnquiryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CorporateEnquiryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CorporateEnquirySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CorporateEnquiryOmit<ExtArgs> | null;
    data: Prisma.CorporateEnquiryCreateManyInput | Prisma.CorporateEnquiryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CorporateEnquiryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CorporateEnquirySelect<ExtArgs> | null;
    omit?: Prisma.CorporateEnquiryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CorporateEnquiryUpdateInput, Prisma.CorporateEnquiryUncheckedUpdateInput>;
    where: Prisma.CorporateEnquiryWhereUniqueInput;
};
export type CorporateEnquiryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CorporateEnquiryUpdateManyMutationInput, Prisma.CorporateEnquiryUncheckedUpdateManyInput>;
    where?: Prisma.CorporateEnquiryWhereInput;
    limit?: number;
};
export type CorporateEnquiryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CorporateEnquirySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CorporateEnquiryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CorporateEnquiryUpdateManyMutationInput, Prisma.CorporateEnquiryUncheckedUpdateManyInput>;
    where?: Prisma.CorporateEnquiryWhereInput;
    limit?: number;
};
export type CorporateEnquiryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CorporateEnquirySelect<ExtArgs> | null;
    omit?: Prisma.CorporateEnquiryOmit<ExtArgs> | null;
    where: Prisma.CorporateEnquiryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CorporateEnquiryCreateInput, Prisma.CorporateEnquiryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CorporateEnquiryUpdateInput, Prisma.CorporateEnquiryUncheckedUpdateInput>;
};
export type CorporateEnquiryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CorporateEnquirySelect<ExtArgs> | null;
    omit?: Prisma.CorporateEnquiryOmit<ExtArgs> | null;
    where: Prisma.CorporateEnquiryWhereUniqueInput;
};
export type CorporateEnquiryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CorporateEnquiryWhereInput;
    limit?: number;
};
export type CorporateEnquiryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CorporateEnquirySelect<ExtArgs> | null;
    omit?: Prisma.CorporateEnquiryOmit<ExtArgs> | null;
};
