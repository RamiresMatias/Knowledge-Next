import {Category} from '../entities/Category'

export interface CategoryRepository {
    findById(id: string): Promise<Category | null>
    save(category: Category): Promise<Category>
    exists(name: string): Promise<boolean>
    getTree(): Promise<any>
    listAll(): Promise<Category[]>
    getCategoriesPath(): any
}