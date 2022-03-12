import { prismaClient } from "../../database/prismaClient"
import { Article } from "../../entities/Article"
import { ArticleRepository } from "../ArticleRepository"
import {randomUUID} from 'crypto'


export class ArticleService implements ArticleRepository {

    async findById(id: string): Promise<Article | null> {

        const article = await prismaClient.article.findUnique({
            where:{
                id,
            }
        })

        if(!article) throw 'Artigo não encontrado!'
        return article
    }

    async save({name, description, content, imageUrl, userId, categoryId}: Article): Promise<Article> {
        const articleSave = await prismaClient.article.create({
            data: {
                id: randomUUID(),
                name, 
                description,
                content,
                imageUrl,
                userId,
                categoryId,
                createdAt: new Date(),
            }
        })
        return articleSave
    }

    async delete(articleId: string): Promise<string> {
        if(!articleId) {
            throw 'Informe o id do artigo a ser deletado!'
        }
        
        await prismaClient.article.delete({
            where:{
                id: articleId
            }
        })
        return 'Artigo deletado!'
    }

    async listAll(): Promise<Article[]> {
        return await prismaClient.article.findMany()
    }

}