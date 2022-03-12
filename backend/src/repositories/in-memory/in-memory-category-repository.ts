import { Category } from "../../entities/Category"
import { CategoryRepository } from "../CategoryRepository"

export class InMemoryCategory implements CategoryRepository {

    public categories: Category[] = []

    async findById(id?: string): Promise<Category> {
        const category = this.categories.find(category => category.id === id)
        if(!category) throw new Error('Categoria não encontrada!')
        return category
    }

    async save(category: Category): Promise<Category> {
        if(await this.exists(category.name)) {
            throw new Error('Já existe uma categoria com este nome!')
        }

        this.categories.push(category)
        return category
    }

    async exists(name: string): Promise<boolean> {
        return this.categories.some(category => category.name.toLocaleLowerCase() === name.toLocaleLowerCase())
    }

    async getTree(): Promise<any> {
        return Category.toTree(this.categories)
    }

    async listAll(): Promise<Category[]> {
        return this.categories
    }

    async getCategoriesPath() {
        return Category.treePathString(this.categories)
    }
}