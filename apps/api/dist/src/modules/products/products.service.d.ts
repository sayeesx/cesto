import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findMany(query: any): Promise<any>;
    findOne(slug: string): Promise<any>;
}
