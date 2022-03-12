import { Request, Response } from "express";
import { ArticleService } from "../repositories/prisma/article";


export class ArticleController{

    async save(request: Request, response: Response) {
        try {

            const {name, description, content, imageUrl, userId, categoryId} = request.body
            const articleService = new ArticleService()

            const articleCreated = await articleService.save({name, description, content, imageUrl, userId, categoryId})
            response.json(articleCreated)
        } catch (error) {
            return response.status(400).send(error)
        }
    }

    async findById(request: Request, response: Response) {
        try {
            const id = request.params.id
            const articleService = new ArticleService()
            const article = await articleService.findById(id)
            return response.json(article)
        } catch (error) {
            return response.status(400).send(error)
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const id = request.params.id
            const articleService = new ArticleService()
            const msg = await articleService.delete(id)
            return response.json(msg)
        } catch (error) {
            return response.status(400).send(error)
        }
    }

    async listAll(request: Request, response: Response) {
        try {
            const articleService = new ArticleService()
            const list = await articleService.listAll()
            return response.json(list)
        } catch (error) {
            return response.status(400).send(error)
        }
    }
}