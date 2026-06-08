import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AdminSettingModel = runtime.Types.Result.DefaultSelection<Prisma.$AdminSettingPayload>;
export type AggregateAdminSetting = {
    _count: AdminSettingCountAggregateOutputType | null;
    _min: AdminSettingMinAggregateOutputType | null;
    _max: AdminSettingMaxAggregateOutputType | null;
};
export type AdminSettingMinAggregateOutputType = {
    id: string | null;
    key: string | null;
    updatedAt: Date | null;
};
export type AdminSettingMaxAggregateOutputType = {
    id: string | null;
    key: string | null;
    updatedAt: Date | null;
};
export type AdminSettingCountAggregateOutputType = {
    id: number;
    key: number;
    value: number;
    updatedAt: number;
    _all: number;
};
export type AdminSettingMinAggregateInputType = {
    id?: true;
    key?: true;
    updatedAt?: true;
};
export type AdminSettingMaxAggregateInputType = {
    id?: true;
    key?: true;
    updatedAt?: true;
};
export type AdminSettingCountAggregateInputType = {
    id?: true;
    key?: true;
    value?: true;
    updatedAt?: true;
    _all?: true;
};
export type AdminSettingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AdminSettingWhereInput;
    orderBy?: Prisma.AdminSettingOrderByWithRelationInput | Prisma.AdminSettingOrderByWithRelationInput[];
    cursor?: Prisma.AdminSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AdminSettingCountAggregateInputType;
    _min?: AdminSettingMinAggregateInputType;
    _max?: AdminSettingMaxAggregateInputType;
};
export type GetAdminSettingAggregateType<T extends AdminSettingAggregateArgs> = {
    [P in keyof T & keyof AggregateAdminSetting]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAdminSetting[P]> : Prisma.GetScalarType<T[P], AggregateAdminSetting[P]>;
};
export type AdminSettingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AdminSettingWhereInput;
    orderBy?: Prisma.AdminSettingOrderByWithAggregationInput | Prisma.AdminSettingOrderByWithAggregationInput[];
    by: Prisma.AdminSettingScalarFieldEnum[] | Prisma.AdminSettingScalarFieldEnum;
    having?: Prisma.AdminSettingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AdminSettingCountAggregateInputType | true;
    _min?: AdminSettingMinAggregateInputType;
    _max?: AdminSettingMaxAggregateInputType;
};
export type AdminSettingGroupByOutputType = {
    id: string;
    key: string;
    value: runtime.JsonValue;
    updatedAt: Date;
    _count: AdminSettingCountAggregateOutputType | null;
    _min: AdminSettingMinAggregateOutputType | null;
    _max: AdminSettingMaxAggregateOutputType | null;
};
export type GetAdminSettingGroupByPayload<T extends AdminSettingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AdminSettingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AdminSettingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AdminSettingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AdminSettingGroupByOutputType[P]>;
}>>;
export type AdminSettingWhereInput = {
    AND?: Prisma.AdminSettingWhereInput | Prisma.AdminSettingWhereInput[];
    OR?: Prisma.AdminSettingWhereInput[];
    NOT?: Prisma.AdminSettingWhereInput | Prisma.AdminSettingWhereInput[];
    id?: Prisma.StringFilter<"AdminSetting"> | string;
    key?: Prisma.StringFilter<"AdminSetting"> | string;
    value?: Prisma.JsonFilter<"AdminSetting">;
    updatedAt?: Prisma.DateTimeFilter<"AdminSetting"> | Date | string;
};
export type AdminSettingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AdminSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    key?: string;
    AND?: Prisma.AdminSettingWhereInput | Prisma.AdminSettingWhereInput[];
    OR?: Prisma.AdminSettingWhereInput[];
    NOT?: Prisma.AdminSettingWhereInput | Prisma.AdminSettingWhereInput[];
    value?: Prisma.JsonFilter<"AdminSetting">;
    updatedAt?: Prisma.DateTimeFilter<"AdminSetting"> | Date | string;
}, "id" | "key">;
export type AdminSettingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AdminSettingCountOrderByAggregateInput;
    _max?: Prisma.AdminSettingMaxOrderByAggregateInput;
    _min?: Prisma.AdminSettingMinOrderByAggregateInput;
};
export type AdminSettingScalarWhereWithAggregatesInput = {
    AND?: Prisma.AdminSettingScalarWhereWithAggregatesInput | Prisma.AdminSettingScalarWhereWithAggregatesInput[];
    OR?: Prisma.AdminSettingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AdminSettingScalarWhereWithAggregatesInput | Prisma.AdminSettingScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AdminSetting"> | string;
    key?: Prisma.StringWithAggregatesFilter<"AdminSetting"> | string;
    value?: Prisma.JsonWithAggregatesFilter<"AdminSetting">;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"AdminSetting"> | Date | string;
};
export type AdminSettingCreateInput = {
    id?: string;
    key: string;
    value: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Date | string;
};
export type AdminSettingUncheckedCreateInput = {
    id?: string;
    key: string;
    value: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Date | string;
};
export type AdminSettingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminSettingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminSettingCreateManyInput = {
    id?: string;
    key: string;
    value: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Date | string;
};
export type AdminSettingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminSettingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminSettingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AdminSettingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AdminSettingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AdminSettingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    key?: boolean;
    value?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["adminSetting"]>;
export type AdminSettingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    key?: boolean;
    value?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["adminSetting"]>;
export type AdminSettingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    key?: boolean;
    value?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["adminSetting"]>;
export type AdminSettingSelectScalar = {
    id?: boolean;
    key?: boolean;
    value?: boolean;
    updatedAt?: boolean;
};
export type AdminSettingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "key" | "value" | "updatedAt", ExtArgs["result"]["adminSetting"]>;
export type $AdminSettingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AdminSetting";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        key: string;
        value: runtime.JsonValue;
        updatedAt: Date;
    }, ExtArgs["result"]["adminSetting"]>;
    composites: {};
};
export type AdminSettingGetPayload<S extends boolean | null | undefined | AdminSettingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AdminSettingPayload, S>;
export type AdminSettingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AdminSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AdminSettingCountAggregateInputType | true;
};
export interface AdminSettingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AdminSetting'];
        meta: {
            name: 'AdminSetting';
        };
    };
    findUnique<T extends AdminSettingFindUniqueArgs>(args: Prisma.SelectSubset<T, AdminSettingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AdminSettingClient<runtime.Types.Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AdminSettingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AdminSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AdminSettingClient<runtime.Types.Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AdminSettingFindFirstArgs>(args?: Prisma.SelectSubset<T, AdminSettingFindFirstArgs<ExtArgs>>): Prisma.Prisma__AdminSettingClient<runtime.Types.Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AdminSettingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AdminSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AdminSettingClient<runtime.Types.Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AdminSettingFindManyArgs>(args?: Prisma.SelectSubset<T, AdminSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AdminSettingCreateArgs>(args: Prisma.SelectSubset<T, AdminSettingCreateArgs<ExtArgs>>): Prisma.Prisma__AdminSettingClient<runtime.Types.Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AdminSettingCreateManyArgs>(args?: Prisma.SelectSubset<T, AdminSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AdminSettingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AdminSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AdminSettingDeleteArgs>(args: Prisma.SelectSubset<T, AdminSettingDeleteArgs<ExtArgs>>): Prisma.Prisma__AdminSettingClient<runtime.Types.Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AdminSettingUpdateArgs>(args: Prisma.SelectSubset<T, AdminSettingUpdateArgs<ExtArgs>>): Prisma.Prisma__AdminSettingClient<runtime.Types.Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AdminSettingDeleteManyArgs>(args?: Prisma.SelectSubset<T, AdminSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AdminSettingUpdateManyArgs>(args: Prisma.SelectSubset<T, AdminSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AdminSettingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AdminSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AdminSettingUpsertArgs>(args: Prisma.SelectSubset<T, AdminSettingUpsertArgs<ExtArgs>>): Prisma.Prisma__AdminSettingClient<runtime.Types.Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AdminSettingCountArgs>(args?: Prisma.Subset<T, AdminSettingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AdminSettingCountAggregateOutputType> : number>;
    aggregate<T extends AdminSettingAggregateArgs>(args: Prisma.Subset<T, AdminSettingAggregateArgs>): Prisma.PrismaPromise<GetAdminSettingAggregateType<T>>;
    groupBy<T extends AdminSettingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AdminSettingGroupByArgs['orderBy'];
    } : {
        orderBy?: AdminSettingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AdminSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AdminSettingFieldRefs;
}
export interface Prisma__AdminSettingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AdminSettingFieldRefs {
    readonly id: Prisma.FieldRef<"AdminSetting", 'String'>;
    readonly key: Prisma.FieldRef<"AdminSetting", 'String'>;
    readonly value: Prisma.FieldRef<"AdminSetting", 'Json'>;
    readonly updatedAt: Prisma.FieldRef<"AdminSetting", 'DateTime'>;
}
export type AdminSettingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSettingSelect<ExtArgs> | null;
    omit?: Prisma.AdminSettingOmit<ExtArgs> | null;
    where: Prisma.AdminSettingWhereUniqueInput;
};
export type AdminSettingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSettingSelect<ExtArgs> | null;
    omit?: Prisma.AdminSettingOmit<ExtArgs> | null;
    where: Prisma.AdminSettingWhereUniqueInput;
};
export type AdminSettingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSettingSelect<ExtArgs> | null;
    omit?: Prisma.AdminSettingOmit<ExtArgs> | null;
    where?: Prisma.AdminSettingWhereInput;
    orderBy?: Prisma.AdminSettingOrderByWithRelationInput | Prisma.AdminSettingOrderByWithRelationInput[];
    cursor?: Prisma.AdminSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AdminSettingScalarFieldEnum | Prisma.AdminSettingScalarFieldEnum[];
};
export type AdminSettingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSettingSelect<ExtArgs> | null;
    omit?: Prisma.AdminSettingOmit<ExtArgs> | null;
    where?: Prisma.AdminSettingWhereInput;
    orderBy?: Prisma.AdminSettingOrderByWithRelationInput | Prisma.AdminSettingOrderByWithRelationInput[];
    cursor?: Prisma.AdminSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AdminSettingScalarFieldEnum | Prisma.AdminSettingScalarFieldEnum[];
};
export type AdminSettingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSettingSelect<ExtArgs> | null;
    omit?: Prisma.AdminSettingOmit<ExtArgs> | null;
    where?: Prisma.AdminSettingWhereInput;
    orderBy?: Prisma.AdminSettingOrderByWithRelationInput | Prisma.AdminSettingOrderByWithRelationInput[];
    cursor?: Prisma.AdminSettingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AdminSettingScalarFieldEnum | Prisma.AdminSettingScalarFieldEnum[];
};
export type AdminSettingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSettingSelect<ExtArgs> | null;
    omit?: Prisma.AdminSettingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AdminSettingCreateInput, Prisma.AdminSettingUncheckedCreateInput>;
};
export type AdminSettingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AdminSettingCreateManyInput | Prisma.AdminSettingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AdminSettingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSettingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AdminSettingOmit<ExtArgs> | null;
    data: Prisma.AdminSettingCreateManyInput | Prisma.AdminSettingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AdminSettingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSettingSelect<ExtArgs> | null;
    omit?: Prisma.AdminSettingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AdminSettingUpdateInput, Prisma.AdminSettingUncheckedUpdateInput>;
    where: Prisma.AdminSettingWhereUniqueInput;
};
export type AdminSettingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AdminSettingUpdateManyMutationInput, Prisma.AdminSettingUncheckedUpdateManyInput>;
    where?: Prisma.AdminSettingWhereInput;
    limit?: number;
};
export type AdminSettingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSettingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AdminSettingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AdminSettingUpdateManyMutationInput, Prisma.AdminSettingUncheckedUpdateManyInput>;
    where?: Prisma.AdminSettingWhereInput;
    limit?: number;
};
export type AdminSettingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSettingSelect<ExtArgs> | null;
    omit?: Prisma.AdminSettingOmit<ExtArgs> | null;
    where: Prisma.AdminSettingWhereUniqueInput;
    create: Prisma.XOR<Prisma.AdminSettingCreateInput, Prisma.AdminSettingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AdminSettingUpdateInput, Prisma.AdminSettingUncheckedUpdateInput>;
};
export type AdminSettingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSettingSelect<ExtArgs> | null;
    omit?: Prisma.AdminSettingOmit<ExtArgs> | null;
    where: Prisma.AdminSettingWhereUniqueInput;
};
export type AdminSettingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AdminSettingWhereInput;
    limit?: number;
};
export type AdminSettingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminSettingSelect<ExtArgs> | null;
    omit?: Prisma.AdminSettingOmit<ExtArgs> | null;
};
