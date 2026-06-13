import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findMany(query: any): Promise<({
        images: {
            url: string;
            id: string;
            productId: string;
            isPrimary: boolean;
            order: number;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        description: string | null;
        whatsInside: string | null;
        price: number;
        compareAtPrice: number | null;
        stock: number;
        deliveryEstimate: string | null;
        sameDayAvailable: boolean;
        isPersonalizable: boolean;
        tags: string[];
        reservedStock: number;
    })[]>;
    findOne(slug: string): Promise<{
        categories: ({
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                slug: string;
                description: string | null;
                imageUrl: string | null;
            };
        } & {
            productId: string;
            categoryId: string;
        })[];
        images: {
            url: string;
            id: string;
            productId: string;
            isPrimary: boolean;
            order: number;
        }[];
        occasions: ({
            occasion: {
                id: string;
                name: string;
                isActive: boolean;
                slug: string;
                imageUrl: string | null;
            };
        } & {
            productId: string;
            occasionId: string;
        })[];
        relationships: ({
            relationship: {
                id: string;
                name: string;
                isActive: boolean;
                slug: string;
                imageUrl: string | null;
            };
        } & {
            productId: string;
            relationshipId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        description: string | null;
        whatsInside: string | null;
        price: number;
        compareAtPrice: number | null;
        stock: number;
        deliveryEstimate: string | null;
        sameDayAvailable: boolean;
        isPersonalizable: boolean;
        tags: string[];
        reservedStock: number;
    }>;
}
