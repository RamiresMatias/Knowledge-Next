import { Category } from "../../../entities/Category"
import { User } from "../../../entities/User"
import { Article } from "../../../entities/Article"
import {randomUUID} from 'crypto'
import { InMemoryArticle } from "../../../repositories/in-memory/in-memory-article-repository"

const createSutUser = (): User => {
    return User.create({
        id: randomUUID(),
        name: 'Ramires Matias',
        email: 'teste.teste@teste.com.br',
        admin: true,
        createdAt: new Date()
    })
}

const createSutCategory = () => {
    return Category.create({
        id: randomUUID(),
        name: 'tecnologia',
        createdAt: new Date()
    })
}

const createSutArticle = (category: Category, user: User) => {

    return Article.create({
        id: randomUUID(),
        name: 'React',
        description: 'Fundamentos de React',
        content: 'Fundamentos necessários para programar em React',
        categoryId: category.id || randomUUID(),
        imageUrl: 'https://images.hdqwalls.com/download/spiderman-miles-lost-in-space-4k-0f-2160x3840.jpg',
        userId: user.id || randomUUID(),
        createdAt: new Date()
    })
}



describe('Article tests', () => {
    it('should be a create article', async() => {
        const spy = jest.spyOn(Article, 'create')
        const sutUser = createSutUser()
        const sutCategory = createSutCategory()
        const sutArticle = createSutArticle(sutCategory, sutUser)
        const articleRepository = new InMemoryArticle()
                     
        await articleRepository.save(sutArticle)
        expect(spy).toHaveBeenCalled()
        expect(sutArticle).toBeInstanceOf(Article)
        expect(articleRepository.articles).toEqual(expect.arrayContaining([expect.objectContaining(sutArticle)]))
    })

    it('should be a find a article be id', async() => {
        const user = createSutUser()
        const category = createSutCategory()
        const article = createSutArticle(category, user)
        const articleRepository = new InMemoryArticle()
        
        await articleRepository.save(article)
        const findArticle = await articleRepository.findById(article.id)

        expect(findArticle).toBeTruthy()
    })


    it('should be have a property name, description, content, categoryId, imageUrl, userId', async() => {
        const sutUser = createSutUser()
        const sutCategory = createSutCategory()
        const sutArticle = createSutArticle(sutCategory, sutUser)
        
        expect(sutArticle).toHaveProperty('name', 'React')
        expect(sutArticle).toHaveProperty('description', 'Fundamentos de React')
        expect(sutArticle).toHaveProperty('categoryId', sutCategory.id)
        expect(sutArticle).toHaveProperty('imageUrl', 'https://images.hdqwalls.com/download/spiderman-miles-lost-in-space-4k-0f-2160x3840.jpg')
        expect(sutArticle).toHaveProperty('userId', sutUser.id)
    })

    it('should be a delete article', async() => {
        const sutUser = createSutUser()
        const sutCategory = createSutCategory()
        const sutArticle = createSutArticle(sutCategory, sutUser)
        const articleRepository = new InMemoryArticle()
        
        await articleRepository.delete(sutArticle.id)
        expect(articleRepository.articles).not.toEqual(expect.arrayContaining([expect.objectContaining(sutArticle)]))
    })

    it('should be list all articles', async() => {
        const sutUser = createSutUser()
        const sutCategory = createSutCategory()
        const sutArticle = createSutArticle(sutCategory, sutUser)
        const articleRepository = new InMemoryArticle()
        
        await articleRepository.save(sutArticle)
        const listArticles = await articleRepository.listAll()
        expect(listArticles).toContain(sutArticle)
        expect(listArticles.length).toBe(1)
    })
    
    it('should generate an error when trying to delete an article', async () => {
        const articleRepository = new InMemoryArticle()

        await expect(articleRepository.delete('')).rejects.toThrow(new Error('Informe o id do artigo a ser deletado!'))
    })

    it('should generate an error when trying to find an article', async () => {
        const articleRepository = new InMemoryArticle()

        await expect(articleRepository.findById('')).rejects.toThrow(new Error('Artigo não encontrado!'))
    })
})