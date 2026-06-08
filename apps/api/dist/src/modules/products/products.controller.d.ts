import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(query: any): Promise<({
        images: {
            url: string;
            order: number;
            id: string;
            productId: string;
            isPrimary: boolean;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        description: string | null;
        slug: string;
        whatsInside: string | null;
        price: number;
        compareAtPrice: number | null;
        stock: number;
        deliveryEstimate: string | null;
        sameDayAvailable: boolean;
        isPersonalizable: boolean;
        tags: string[];
    })[]>;
    findOne(slug: string): Promise<{
        images: {
            url: string;
            order: number;
            id: string;
            productId: string;
            isPrimary: boolean;
        }[];
        categories: ({
            category: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                description: string | null;
                slug: string;
                imageUrl: string | null;
            };
        } & {
            productId: string;
            categoryId: string;
        })[];
        occasions: ({
            occasion: {
                name: string;
                id: string;
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
                name: string;
                id: string;
                isActive: boolean;
                slug: string;
                imageUrl: string | null;
            };
        } & {
            productId: string;
            relationshipId: string;
        })[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        description: string | null;
        slug: string;
        whatsInside: string | null;
        price: number;
        compareAtPrice: number | null;
        stock: number;
        deliveryEstimate: string | null;
        sameDayAvailable: boolean;
        isPersonalizable: boolean;
        tags: string[];
    }>;
}
