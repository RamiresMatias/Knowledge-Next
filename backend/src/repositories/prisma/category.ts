import { prismaClient } from "../../database/prismaClient";
import { Category } from "../../entities/Category";
import { CategoryRepository } from "../CategoryRepository";
import {randomUUID} from 'crypto'

export class CategoryService implements CategoryRepository {

    async findById(id: string): Promise<Category | null> {
        return await prismaClient.category.findUnique({
            where:{
                id,
            }
        })
    }

    async save({name, parentId}: Category): Promise<Category> {
        const isExists = await this.exists(name)
        if(isExists) {
            throw 'Já existe uma categoria com este nome!'
        }

        const category = await prismaClient.category.create({
            data: {
                id: randomUUID(),
                name,
                parentId: parentId || null,
                createdAt: new Date(),
            }
        })

        return category
    }
    async exists(name: string): Promise<boolean> {
        const findCategory = await prismaClient.category.findFirst({
            where:{
                name,
            }
        })

        return !!findCategory
    }

    async getTree(): Promise<any> {
        const categories = await this.listAll()
        console.log(categories)
        return Category.toTree(categories)
    }

    async listAll(): Promise<Category[]> {
        return prismaClient.category.findMany()
    }

    async getCategoriesPath() {
        throw new Error("Method not implemented.");
    }
}