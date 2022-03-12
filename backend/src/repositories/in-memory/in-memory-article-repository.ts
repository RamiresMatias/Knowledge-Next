import { Article } from "../../entities/Article"
import { ArticleRepository } from "../ArticleRepository"
import {randomUUID} from 'crypto'

export class InMemoryArticle implements ArticleRepository {
    public articles: Article[] = []

    async save(article: Article): Promise<Article> {
        const articleCreated = Article.create({
            id: randomUUID(),
            name: article.name,
            description: article.description,
            content: article.content,
            imageUrl: article.imageUrl,
            categoryId: article.categoryId,
            userId: article.userId,
            createdAt: new Date()
        })
        this.articles.push(article)
        return articleCreated
    }
    async delete(articleId?: string): Promise<string> {
        if(!articleId) {
            throw new Error('Informe o id do artigo a ser deletado!')
        }
        
        const indexArticle = this.articles.findIndex(articleBd => articleBd.id === articleId)
        this.articles.splice(indexArticle, 1)
        return 'Artigo deletado!'
    }

    async findById(id?: string): Promise<Article | null> {
        const article = this.articles.find(article => article.id === id)
        if(!article) throw new Error('Artigo não encontrado!')
        return article
    }

    async listAll(): Promise<Article[]> {
        return this.articles
    }
}