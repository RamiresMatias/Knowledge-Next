import {randomUUID} from 'crypto'

export class Article {
    id?: string
    name: string
    description: string
    imageUrl: string
    content: string
    userId: string
    categoryId: string
    createdAt?: Date = new Date()

    private constructor({name, description, imageUrl, content, userId, categoryId, id, createdAt}: Article) {
        this.id = id
        this.name = name
        this.description = description
        this.content = content
        this.imageUrl = imageUrl
        this.userId = userId
        this.categoryId = categoryId
    }

    static create(article: Article): Article {
        return new Article(article)
    }
}