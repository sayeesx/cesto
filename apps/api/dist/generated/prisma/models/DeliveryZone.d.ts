import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DeliveryZoneModel = runtime.Types.Result.DefaultSelection<Prisma.$DeliveryZonePayload>;
export type AggregateDeliveryZone = {
    _count: DeliveryZoneCountAggregateOutputType | null;
    _avg: DeliveryZoneAvgAggregateOutputType | null;
    _sum: DeliveryZoneSumAggregateOutputType | null;
    _min: DeliveryZoneMinAggregateOutputType | null;
    _max: DeliveryZoneMaxAggregateOutputType | null;
};
export type DeliveryZoneAvgAggregateOutputType = {
    minOrder: number | null;
    deliveryFee: number | null;
    expressFee: number | null;
    midnightFee: number | null;
};
export type DeliveryZoneSumAggregateOutputType = {
    minOrder: number | null;
    deliveryFee: number | null;
    expressFee: number | null;
    midnightFee: number | null;
};
export type DeliveryZoneMinAggregateOutputType = {
    id: string | null;
    city: string | null;
    area: string | null;
    pincode: string | null;
    isActive: boolean | null;
    minOrder: number | null;
    deliveryFee: number | null;
    expressFee: number | null;
    midnightFee: number | null;
};
export type DeliveryZoneMaxAggregateOutputType = {
    id: string | null;
    city: string | null;
    area: string | null;
    pincode: string | null;
    isActive: boolean | null;
    minOrder: number | null;
    deliveryFee: number | null;
    expressFee: number | null;
    midnightFee: number | null;
};
export type DeliveryZoneCountAggregateOutputType = {
    id: number;
    city: number;
    area: number;
    pincode: number;
    isActive: number;
    minOrder: number;
    deliveryFee: number;
    expressFee: number;
    midnightFee: number;
    _all: number;
};
export type DeliveryZoneAvgAggregateInputType = {
    minOrder?: true;
    deliveryFee?: true;
    expressFee?: true;
    midnightFee?: true;
};
export type DeliveryZoneSumAggregateInputType = {
    minOrder?: true;
    deliveryFee?: true;
    expressFee?: true;
    midnightFee?: true;
};
export type DeliveryZoneMinAggregateInputType = {
    id?: true;
    city?: true;
    area?: true;
    pincode?: true;
    isActive?: true;
    minOrder?: true;
    deliveryFee?: true;
    expressFee?: true;
    midnightFee?: true;
};
export type DeliveryZoneMaxAggregateInputType = {
    id?: true;
    city?: true;
    area?: true;
    pincode?: true;
    isActive?: true;
    minOrder?: true;
    deliveryFee?: true;
    expressFee?: true;
    midnightFee?: true;
};
export type DeliveryZoneCountAggregateInputType = {
    id?: true;
    city?: true;
    area?: true;
    pincode?: true;
    isActive?: true;
    minOrder?: true;
    deliveryFee?: true;
    expressFee?: true;
    midnightFee?: true;
    _all?: true;
};
export type DeliveryZoneAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeliveryZoneWhereInput;
    orderBy?: Prisma.DeliveryZoneOrderByWithRelationInput | Prisma.DeliveryZoneOrderByWithRelationInput[];
    cursor?: Prisma.DeliveryZoneWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DeliveryZoneCountAggregateInputType;
    _avg?: DeliveryZoneAvgAggregateInputType;
    _sum?: DeliveryZoneSumAggregateInputType;
    _min?: DeliveryZoneMinAggregateInputType;
    _max?: DeliveryZoneMaxAggregateInputType;
};
export type GetDeliveryZoneAggregateType<T extends DeliveryZoneAggregateArgs> = {
    [P in keyof T & keyof AggregateDeliveryZone]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDeliveryZone[P]> : Prisma.GetScalarType<T[P], AggregateDeliveryZone[P]>;
};
export type DeliveryZoneGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeliveryZoneWhereInput;
    orderBy?: Prisma.DeliveryZoneOrderByWithAggregationInput | Prisma.DeliveryZoneOrderByWithAggregationInput[];
    by: Prisma.DeliveryZoneScalarFieldEnum[] | Prisma.DeliveryZoneScalarFieldEnum;
    having?: Prisma.DeliveryZoneScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DeliveryZoneCountAggregateInputType | true;
    _avg?: DeliveryZoneAvgAggregateInputType;
    _sum?: DeliveryZoneSumAggregateInputType;
    _min?: DeliveryZoneMinAggregateInputType;
    _max?: DeliveryZoneMaxAggregateInputType;
};
export type DeliveryZoneGroupByOutputType = {
    id: string;
    city: string;
    area: string;
    pincode: string;
    isActive: boolean;
    minOrder: number;
    deliveryFee: number;
    expressFee: number;
    midnightFee: number;
    _count: DeliveryZoneCountAggregateOutputType | null;
    _avg: DeliveryZoneAvgAggregateOutputType | null;
    _sum: DeliveryZoneSumAggregateOutputType | null;
    _min: DeliveryZoneMinAggregateOutputType | null;
    _max: DeliveryZoneMaxAggregateOutputType | null;
};
export type GetDeliveryZoneGroupByPayload<T extends DeliveryZoneGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DeliveryZoneGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DeliveryZoneGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DeliveryZoneGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DeliveryZoneGroupByOutputType[P]>;
}>>;
export type DeliveryZoneWhereInput = {
    AND?: Prisma.DeliveryZoneWhereInput | Prisma.DeliveryZoneWhereInput[];
    OR?: Prisma.DeliveryZoneWhereInput[];
    NOT?: Prisma.DeliveryZoneWhereInput | Prisma.DeliveryZoneWhereInput[];
    id?: Prisma.StringFilter<"DeliveryZone"> | string;
    city?: Prisma.StringFilter<"DeliveryZone"> | string;
    area?: Prisma.StringFilter<"DeliveryZone"> | string;
    pincode?: Prisma.StringFilter<"DeliveryZone"> | string;
    isActive?: Prisma.BoolFilter<"DeliveryZone"> | boolean;
    minOrder?: Prisma.FloatFilter<"DeliveryZone"> | number;
    deliveryFee?: Prisma.FloatFilter<"DeliveryZone"> | number;
    expressFee?: Prisma.FloatFilter<"DeliveryZone"> | number;
    midnightFee?: Prisma.FloatFilter<"DeliveryZone"> | number;
    addresses?: Prisma.AddressListRelationFilter;
};
export type DeliveryZoneOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    area?: Prisma.SortOrder;
    pincode?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    minOrder?: Prisma.SortOrder;
    deliveryFee?: Prisma.SortOrder;
    expressFee?: Prisma.SortOrder;
    midnightFee?: Prisma.SortOrder;
    addresses?: Prisma.AddressOrderByRelationAggregateInput;
};
export type DeliveryZoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    pincode?: string;
    AND?: Prisma.DeliveryZoneWhereInput | Prisma.DeliveryZoneWhereInput[];
    OR?: Prisma.DeliveryZoneWhereInput[];
    NOT?: Prisma.DeliveryZoneWhereInput | Prisma.DeliveryZoneWhereInput[];
    city?: Prisma.StringFilter<"DeliveryZone"> | string;
    area?: Prisma.StringFilter<"DeliveryZone"> | string;
    isActive?: Prisma.BoolFilter<"DeliveryZone"> | boolean;
    minOrder?: Prisma.FloatFilter<"DeliveryZone"> | number;
    deliveryFee?: Prisma.FloatFilter<"DeliveryZone"> | number;
    expressFee?: Prisma.FloatFilter<"DeliveryZone"> | number;
    midnightFee?: Prisma.FloatFilter<"DeliveryZone"> | number;
    addresses?: Prisma.AddressListRelationFilter;
}, "id" | "pincode">;
export type DeliveryZoneOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    area?: Prisma.SortOrder;
    pincode?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    minOrder?: Prisma.SortOrder;
    deliveryFee?: Prisma.SortOrder;
    expressFee?: Prisma.SortOrder;
    midnightFee?: Prisma.SortOrder;
    _count?: Prisma.DeliveryZoneCountOrderByAggregateInput;
    _avg?: Prisma.DeliveryZoneAvgOrderByAggregateInput;
    _max?: Prisma.DeliveryZoneMaxOrderByAggregateInput;
    _min?: Prisma.DeliveryZoneMinOrderByAggregateInput;
    _sum?: Prisma.DeliveryZoneSumOrderByAggregateInput;
};
export type DeliveryZoneScalarWhereWithAggregatesInput = {
    AND?: Prisma.DeliveryZoneScalarWhereWithAggregatesInput | Prisma.DeliveryZoneScalarWhereWithAggregatesInput[];
    OR?: Prisma.DeliveryZoneScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DeliveryZoneScalarWhereWithAggregatesInput | Prisma.DeliveryZoneScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DeliveryZone"> | string;
    city?: Prisma.StringWithAggregatesFilter<"DeliveryZone"> | string;
    area?: Prisma.StringWithAggregatesFilter<"DeliveryZone"> | string;
    pincode?: Prisma.StringWithAggregatesFilter<"DeliveryZone"> | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"DeliveryZone"> | boolean;
    minOrder?: Prisma.FloatWithAggregatesFilter<"DeliveryZone"> | number;
    deliveryFee?: Prisma.FloatWithAggregatesFilter<"DeliveryZone"> | number;
    expressFee?: Prisma.FloatWithAggregatesFilter<"DeliveryZone"> | number;
    midnightFee?: Prisma.FloatWithAggregatesFilter<"DeliveryZone"> | number;
};
export type DeliveryZoneCreateInput = {
    id?: string;
    city: string;
    area: string;
    pincode: string;
    isActive?: boolean;
    minOrder?: number;
    deliveryFee?: number;
    expressFee?: number;
    midnightFee?: number;
    addresses?: Prisma.AddressCreateNestedManyWithoutDeliveryZoneInput;
};
export type DeliveryZoneUncheckedCreateInput = {
    id?: string;
    city: string;
    area: string;
    pincode: string;
    isActive?: boolean;
    minOrder?: number;
    deliveryFee?: number;
    expressFee?: number;
    midnightFee?: number;
    addresses?: Prisma.AddressUncheckedCreateNestedManyWithoutDeliveryZoneInput;
};
export type DeliveryZoneUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    area?: Prisma.StringFieldUpdateOperationsInput | string;
    pincode?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    minOrder?: Prisma.FloatFieldUpdateOperationsInput | number;
    deliveryFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    expressFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    midnightFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    addresses?: Prisma.AddressUpdateManyWithoutDeliveryZoneNestedInput;
};
export type DeliveryZoneUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    area?: Prisma.StringFieldUpdateOperationsInput | string;
    pincode?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    minOrder?: Prisma.FloatFieldUpdateOperationsInput | number;
    deliveryFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    expressFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    midnightFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    addresses?: Prisma.AddressUncheckedUpdateManyWithoutDeliveryZoneNestedInput;
};
export type DeliveryZoneCreateManyInput = {
    id?: string;
    city: string;
    area: string;
    pincode: string;
    isActive?: boolean;
    minOrder?: number;
    deliveryFee?: number;
    expressFee?: number;
    midnightFee?: number;
};
export type DeliveryZoneUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    area?: Prisma.StringFieldUpdateOperationsInput | string;
    pincode?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    minOrder?: Prisma.FloatFieldUpdateOperationsInput | number;
    deliveryFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    expressFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    midnightFee?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type DeliveryZoneUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    area?: Prisma.StringFieldUpdateOperationsInput | string;
    pincode?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    minOrder?: Prisma.FloatFieldUpdateOperationsInput | number;
    deliveryFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    expressFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    midnightFee?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type DeliveryZoneNullableScalarRelationFilter = {
    is?: Prisma.DeliveryZoneWhereInput | null;
    isNot?: Prisma.DeliveryZoneWhereInput | null;
};
export type DeliveryZoneCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    area?: Prisma.SortOrder;
    pincode?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    minOrder?: Prisma.SortOrder;
    deliveryFee?: Prisma.SortOrder;
    expressFee?: Prisma.SortOrder;
    midnightFee?: Prisma.SortOrder;
};
export type DeliveryZoneAvgOrderByAggregateInput = {
    minOrder?: Prisma.SortOrder;
    deliveryFee?: Prisma.SortOrder;
    expressFee?: Prisma.SortOrder;
    midnightFee?: Prisma.SortOrder;
};
export type DeliveryZoneMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    area?: Prisma.SortOrder;
    pincode?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    minOrder?: Prisma.SortOrder;
    deliveryFee?: Prisma.SortOrder;
    expressFee?: Prisma.SortOrder;
    midnightFee?: Prisma.SortOrder;
};
export type DeliveryZoneMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    area?: Prisma.SortOrder;
    pincode?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    minOrder?: Prisma.SortOrder;
    deliveryFee?: Prisma.SortOrder;
    expressFee?: Prisma.SortOrder;
    midnightFee?: Prisma.SortOrder;
};
export type DeliveryZoneSumOrderByAggregateInput = {
    minOrder?: Prisma.SortOrder;
    deliveryFee?: Prisma.SortOrder;
    expressFee?: Prisma.SortOrder;
    midnightFee?: Prisma.SortOrder;
};
export type DeliveryZoneCreateNestedOneWithoutAddressesInput = {
    create?: Prisma.XOR<Prisma.DeliveryZoneCreateWithoutAddressesInput, Prisma.DeliveryZoneUncheckedCreateWithoutAddressesInput>;
    connectOrCreate?: Prisma.DeliveryZoneCreateOrConnectWithoutAddressesInput;
    connect?: Prisma.DeliveryZoneWhereUniqueInput;
};
export type DeliveryZoneUpdateOneWithoutAddressesNestedInput = {
    create?: Prisma.XOR<Prisma.DeliveryZoneCreateWithoutAddressesInput, Prisma.DeliveryZoneUncheckedCreateWithoutAddressesInput>;
    connectOrCreate?: Prisma.DeliveryZoneCreateOrConnectWithoutAddressesInput;
    upsert?: Prisma.DeliveryZoneUpsertWithoutAddressesInput;
    disconnect?: Prisma.DeliveryZoneWhereInput | boolean;
    delete?: Prisma.DeliveryZoneWhereInput | boolean;
    connect?: Prisma.DeliveryZoneWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DeliveryZoneUpdateToOneWithWhereWithoutAddressesInput, Prisma.DeliveryZoneUpdateWithoutAddressesInput>, Prisma.DeliveryZoneUncheckedUpdateWithoutAddressesInput>;
};
export type DeliveryZoneCreateWithoutAddressesInput = {
    id?: string;
    city: string;
    area: string;
    pincode: string;
    isActive?: boolean;
    minOrder?: number;
    deliveryFee?: number;
    expressFee?: number;
    midnightFee?: number;
};
export type DeliveryZoneUncheckedCreateWithoutAddressesInput = {
    id?: string;
    city: string;
    area: string;
    pincode: string;
    isActive?: boolean;
    minOrder?: number;
    deliveryFee?: number;
    expressFee?: number;
    midnightFee?: number;
};
export type DeliveryZoneCreateOrConnectWithoutAddressesInput = {
    where: Prisma.DeliveryZoneWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeliveryZoneCreateWithoutAddressesInput, Prisma.DeliveryZoneUncheckedCreateWithoutAddressesInput>;
};
export type DeliveryZoneUpsertWithoutAddressesInput = {
    update: Prisma.XOR<Prisma.DeliveryZoneUpdateWithoutAddressesInput, Prisma.DeliveryZoneUncheckedUpdateWithoutAddressesInput>;
    create: Prisma.XOR<Prisma.DeliveryZoneCreateWithoutAddressesInput, Prisma.DeliveryZoneUncheckedCreateWithoutAddressesInput>;
    where?: Prisma.DeliveryZoneWhereInput;
};
export type DeliveryZoneUpdateToOneWithWhereWithoutAddressesInput = {
    where?: Prisma.DeliveryZoneWhereInput;
    data: Prisma.XOR<Prisma.DeliveryZoneUpdateWithoutAddressesInput, Prisma.DeliveryZoneUncheckedUpdateWithoutAddressesInput>;
};
export type DeliveryZoneUpdateWithoutAddressesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    area?: Prisma.StringFieldUpdateOperationsInput | string;
    pincode?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    minOrder?: Prisma.FloatFieldUpdateOperationsInput | number;
    deliveryFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    expressFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    midnightFee?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type DeliveryZoneUncheckedUpdateWithoutAddressesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    area?: Prisma.StringFieldUpdateOperationsInput | string;
    pincode?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    minOrder?: Prisma.FloatFieldUpdateOperationsInput | number;
    deliveryFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    expressFee?: Prisma.FloatFieldUpdateOperationsInput | number;
    midnightFee?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type DeliveryZoneCountOutputType = {
    addresses: number;
};
export type DeliveryZoneCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    addresses?: boolean | DeliveryZoneCountOutputTypeCountAddressesArgs;
};
export type DeliveryZoneCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryZoneCountOutputTypeSelect<ExtArgs> | null;
};
export type DeliveryZoneCountOutputTypeCountAddressesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AddressWhereInput;
};
export type DeliveryZoneSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    city?: boolean;
    area?: boolean;
    pincode?: boolean;
    isActive?: boolean;
    minOrder?: boolean;
    deliveryFee?: boolean;
    expressFee?: boolean;
    midnightFee?: boolean;
    addresses?: boolean | Prisma.DeliveryZone$addressesArgs<ExtArgs>;
    _count?: boolean | Prisma.DeliveryZoneCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deliveryZone"]>;
export type DeliveryZoneSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    city?: boolean;
    area?: boolean;
    pincode?: boolean;
    isActive?: boolean;
    minOrder?: boolean;
    deliveryFee?: boolean;
    expressFee?: boolean;
    midnightFee?: boolean;
}, ExtArgs["result"]["deliveryZone"]>;
export type DeliveryZoneSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    city?: boolean;
    area?: boolean;
    pincode?: boolean;
    isActive?: boolean;
    minOrder?: boolean;
    deliveryFee?: boolean;
    expressFee?: boolean;
    midnightFee?: boolean;
}, ExtArgs["result"]["deliveryZone"]>;
export type DeliveryZoneSelectScalar = {
    id?: boolean;
    city?: boolean;
    area?: boolean;
    pincode?: boolean;
    isActive?: boolean;
    minOrder?: boolean;
    deliveryFee?: boolean;
    expressFee?: boolean;
    midnightFee?: boolean;
};
export type DeliveryZoneOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "city" | "area" | "pincode" | "isActive" | "minOrder" | "deliveryFee" | "expressFee" | "midnightFee", ExtArgs["result"]["deliveryZone"]>;
export type DeliveryZoneInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    addresses?: boolean | Prisma.DeliveryZone$addressesArgs<ExtArgs>;
    _count?: boolean | Prisma.DeliveryZoneCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DeliveryZoneIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type DeliveryZoneIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $DeliveryZonePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DeliveryZone";
    objects: {
        addresses: Prisma.$AddressPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        city: string;
        area: string;
        pincode: string;
        isActive: boolean;
        minOrder: number;
        deliveryFee: number;
        expressFee: number;
        midnightFee: number;
    }, ExtArgs["result"]["deliveryZone"]>;
    composites: {};
};
export type DeliveryZoneGetPayload<S extends boolean | null | undefined | DeliveryZoneDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DeliveryZonePayload, S>;
export type DeliveryZoneCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DeliveryZoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DeliveryZoneCountAggregateInputType | true;
};
export interface DeliveryZoneDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DeliveryZone'];
        meta: {
            name: 'DeliveryZone';
        };
    };
    findUnique<T extends DeliveryZoneFindUniqueArgs>(args: Prisma.SelectSubset<T, DeliveryZoneFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DeliveryZoneClient<runtime.Types.Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DeliveryZoneFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DeliveryZoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeliveryZoneClient<runtime.Types.Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DeliveryZoneFindFirstArgs>(args?: Prisma.SelectSubset<T, DeliveryZoneFindFirstArgs<ExtArgs>>): Prisma.Prisma__DeliveryZoneClient<runtime.Types.Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DeliveryZoneFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DeliveryZoneFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeliveryZoneClient<runtime.Types.Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DeliveryZoneFindManyArgs>(args?: Prisma.SelectSubset<T, DeliveryZoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DeliveryZoneCreateArgs>(args: Prisma.SelectSubset<T, DeliveryZoneCreateArgs<ExtArgs>>): Prisma.Prisma__DeliveryZoneClient<runtime.Types.Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DeliveryZoneCreateManyArgs>(args?: Prisma.SelectSubset<T, DeliveryZoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DeliveryZoneCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DeliveryZoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DeliveryZoneDeleteArgs>(args: Prisma.SelectSubset<T, DeliveryZoneDeleteArgs<ExtArgs>>): Prisma.Prisma__DeliveryZoneClient<runtime.Types.Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DeliveryZoneUpdateArgs>(args: Prisma.SelectSubset<T, DeliveryZoneUpdateArgs<ExtArgs>>): Prisma.Prisma__DeliveryZoneClient<runtime.Types.Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DeliveryZoneDeleteManyArgs>(args?: Prisma.SelectSubset<T, DeliveryZoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DeliveryZoneUpdateManyArgs>(args: Prisma.SelectSubset<T, DeliveryZoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DeliveryZoneUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DeliveryZoneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DeliveryZoneUpsertArgs>(args: Prisma.SelectSubset<T, DeliveryZoneUpsertArgs<ExtArgs>>): Prisma.Prisma__DeliveryZoneClient<runtime.Types.Result.GetResult<Prisma.$DeliveryZonePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DeliveryZoneCountArgs>(args?: Prisma.Subset<T, DeliveryZoneCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DeliveryZoneCountAggregateOutputType> : number>;
    aggregate<T extends DeliveryZoneAggregateArgs>(args: Prisma.Subset<T, DeliveryZoneAggregateArgs>): Prisma.PrismaPromise<GetDeliveryZoneAggregateType<T>>;
    groupBy<T extends DeliveryZoneGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DeliveryZoneGroupByArgs['orderBy'];
    } : {
        orderBy?: DeliveryZoneGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DeliveryZoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeliveryZoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DeliveryZoneFieldRefs;
}
export interface Prisma__DeliveryZoneClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    addresses<T extends Prisma.DeliveryZone$addressesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DeliveryZone$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DeliveryZoneFieldRefs {
    readonly id: Prisma.FieldRef<"DeliveryZone", 'String'>;
    readonly city: Prisma.FieldRef<"DeliveryZone", 'String'>;
    readonly area: Prisma.FieldRef<"DeliveryZone", 'String'>;
    readonly pincode: Prisma.FieldRef<"DeliveryZone", 'String'>;
    readonly isActive: Prisma.FieldRef<"DeliveryZone", 'Boolean'>;
    readonly minOrder: Prisma.FieldRef<"DeliveryZone", 'Float'>;
    readonly deliveryFee: Prisma.FieldRef<"DeliveryZone", 'Float'>;
    readonly expressFee: Prisma.FieldRef<"DeliveryZone", 'Float'>;
    readonly midnightFee: Prisma.FieldRef<"DeliveryZone", 'Float'>;
}
export type DeliveryZoneFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryZoneSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryZoneOmit<ExtArgs> | null;
    include?: Prisma.DeliveryZoneInclude<ExtArgs> | null;
    where: Prisma.DeliveryZoneWhereUniqueInput;
};
export type DeliveryZoneFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryZoneSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryZoneOmit<ExtArgs> | null;
    include?: Prisma.DeliveryZoneInclude<ExtArgs> | null;
    where: Prisma.DeliveryZoneWhereUniqueInput;
};
export type DeliveryZoneFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryZoneSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryZoneOmit<ExtArgs> | null;
    include?: Prisma.DeliveryZoneInclude<ExtArgs> | null;
    where?: Prisma.DeliveryZoneWhereInput;
    orderBy?: Prisma.DeliveryZoneOrderByWithRelationInput | Prisma.DeliveryZoneOrderByWithRelationInput[];
    cursor?: Prisma.DeliveryZoneWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeliveryZoneScalarFieldEnum | Prisma.DeliveryZoneScalarFieldEnum[];
};
export type DeliveryZoneFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryZoneSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryZoneOmit<ExtArgs> | null;
    include?: Prisma.DeliveryZoneInclude<ExtArgs> | null;
    where?: Prisma.DeliveryZoneWhereInput;
    orderBy?: Prisma.DeliveryZoneOrderByWithRelationInput | Prisma.DeliveryZoneOrderByWithRelationInput[];
    cursor?: Prisma.DeliveryZoneWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeliveryZoneScalarFieldEnum | Prisma.DeliveryZoneScalarFieldEnum[];
};
export type DeliveryZoneFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryZoneSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryZoneOmit<ExtArgs> | null;
    include?: Prisma.DeliveryZoneInclude<ExtArgs> | null;
    where?: Prisma.DeliveryZoneWhereInput;
    orderBy?: Prisma.DeliveryZoneOrderByWithRelationInput | Prisma.DeliveryZoneOrderByWithRelationInput[];
    cursor?: Prisma.DeliveryZoneWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeliveryZoneScalarFieldEnum | Prisma.DeliveryZoneScalarFieldEnum[];
};
export type DeliveryZoneCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryZoneSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryZoneOmit<ExtArgs> | null;
    include?: Prisma.DeliveryZoneInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeliveryZoneCreateInput, Prisma.DeliveryZoneUncheckedCreateInput>;
};
export type DeliveryZoneCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DeliveryZoneCreateManyInput | Prisma.DeliveryZoneCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DeliveryZoneCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryZoneSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeliveryZoneOmit<ExtArgs> | null;
    data: Prisma.DeliveryZoneCreateManyInput | Prisma.DeliveryZoneCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DeliveryZoneUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryZoneSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryZoneOmit<ExtArgs> | null;
    include?: Prisma.DeliveryZoneInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeliveryZoneUpdateInput, Prisma.DeliveryZoneUncheckedUpdateInput>;
    where: Prisma.DeliveryZoneWhereUniqueInput;
};
export type DeliveryZoneUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DeliveryZoneUpdateManyMutationInput, Prisma.DeliveryZoneUncheckedUpdateManyInput>;
    where?: Prisma.DeliveryZoneWhereInput;
    limit?: number;
};
export type DeliveryZoneUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryZoneSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeliveryZoneOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeliveryZoneUpdateManyMutationInput, Prisma.DeliveryZoneUncheckedUpdateManyInput>;
    where?: Prisma.DeliveryZoneWhereInput;
    limit?: number;
};
export type DeliveryZoneUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryZoneSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryZoneOmit<ExtArgs> | null;
    include?: Prisma.DeliveryZoneInclude<ExtArgs> | null;
    where: Prisma.DeliveryZoneWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeliveryZoneCreateInput, Prisma.DeliveryZoneUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DeliveryZoneUpdateInput, Prisma.DeliveryZoneUncheckedUpdateInput>;
};
export type DeliveryZoneDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryZoneSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryZoneOmit<ExtArgs> | null;
    include?: Prisma.DeliveryZoneInclude<ExtArgs> | null;
    where: Prisma.DeliveryZoneWhereUniqueInput;
};
export type DeliveryZoneDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeliveryZoneWhereInput;
    limit?: number;
};
export type DeliveryZone$addressesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AddressSelect<ExtArgs> | null;
    omit?: Prisma.AddressOmit<ExtArgs> | null;
    include?: Prisma.AddressInclude<ExtArgs> | null;
    where?: Prisma.AddressWhereInput;
    orderBy?: Prisma.AddressOrderByWithRelationInput | Prisma.AddressOrderByWithRelationInput[];
    cursor?: Prisma.AddressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AddressScalarFieldEnum | Prisma.AddressScalarFieldEnum[];
};
export type DeliveryZoneDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeliveryZoneSelect<ExtArgs> | null;
    omit?: Prisma.DeliveryZoneOmit<ExtArgs> | null;
    include?: Prisma.DeliveryZoneInclude<ExtArgs> | null;
};
