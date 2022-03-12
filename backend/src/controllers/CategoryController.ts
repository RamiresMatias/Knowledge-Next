import { Request, Response } from "express";
import { CategoryService } from "../repositories/prisma/category";


export class CategoryController{

    async save(request: Request, response: Response) {
        try {

            const {name, parentId} = request.body
            const categoryService = new CategoryService()

            const categoryCreated = await categoryService.save({name, parentId})
            response.json(categoryCreated)
        } catch (error) {
            return response.status(400).send(error)
        }
    }

    async findById(request: Request, response: Response) {
        try {
            const id = request.params.id
            const categoryService = new CategoryService()
            const category = await categoryService.findById(id)
            return response.json(category)
        } catch (error) {
            return response.status(400).send(error)
        }
    }

    async listAll(request: Request, response: Response) {
        try {
            const categoryService = new CategoryService()
            const listCategories = await categoryService.listAll()
            return response.json(listCategories)
        } catch (error) {
            return response.status(400).send(error)
        }
    }

    async getTree(request: Request, response: Response) {
        try {
            const categoryService = new CategoryService()
            const tree = await categoryService.getTree()
            return response.json(tree)
        } catch (error) {
            return response.status(400).send(error)
        }
    }
}