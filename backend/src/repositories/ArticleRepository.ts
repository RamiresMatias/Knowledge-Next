import { Article } from "../entities/Article";

export interface ArticleRepository {
    save(article: Article): Promise<Article>
    delete(articleId: string): Promise<string>
    findById(id: string): Promise<Article | null>
    listAll(): Promise<Article[]>
}