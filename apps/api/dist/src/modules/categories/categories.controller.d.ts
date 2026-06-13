import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        description: string | null;
        imageUrl: string | null;
    }[]>;
    findOne(slug: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        slug: string;
        description: string | null;
        imageUrl: string | null;
    } | null>;
}
