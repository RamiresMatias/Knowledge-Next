import { Category } from "../../../entities/Category"
import { InMemoryCategory } from "../../../repositories/in-memory/in-memory-category-repository"
import {randomUUID} from 'crypto'

const createSutCategory = (data?: Date, parentId?: string): Category => {
    return Category.create({
        id: randomUUID(),
        name: 'Tecnologia',
        parentId,
        createdAt: data ?? new Date()
    })
}

const createSutCategory2 = (name: string, parentId?: string): Category => {
    return Category.create({
        id: randomUUID(),
        name,
        parentId,
        createdAt: new Date()
    })
}

describe('Category tests', () => {
    it('should be a create category', () => {
        const spy = jest.spyOn(Category, 'create')
        const sutCategory = createSutCategory(new Date())

        expect(sutCategory).toBeInstanceOf(Category)
        expect(spy).toHaveBeenCalled()
    })

    it('should be have the properties name and parentId', () => {
        const sutCategoryFather = createSutCategory(new Date())
        const sutCategoryChildren = createSutCategory(new Date(), sutCategoryFather.id)
        
        expect(sutCategoryChildren).toHaveProperty('parentId', sutCategoryFather.id)
        expect(sutCategoryChildren).toHaveProperty('name', 'Tecnologia')
    })

    it('should be a create category instance and save in memomy', async () => {
        const sutCategory = createSutCategory(new Date())
        const categoryRepository = new InMemoryCategory()

        await categoryRepository.save(sutCategory)
        expect(categoryRepository.categories).toEqual(expect.arrayContaining([expect.objectContaining(sutCategory)]))
    })

    it('should check if there is a saved category', async () => {
        const sutCategory = createSutCategory(new Date())   
        const categoryRepository = new InMemoryCategory()

        await categoryRepository.save(sutCategory)
        expect(await categoryRepository.exists(sutCategory.name)).toBeTruthy()
    })

    it('should generate an error when creating a duplicate category', async () => {
        const sutCategory = createSutCategory(new Date())
        const categoryRepository = new InMemoryCategory()

        await categoryRepository.save(sutCategory)
        await expect(categoryRepository.save(sutCategory)).rejects.toThrow(new Error("Já existe uma categoria com este nome!"))
    })

    it('should generate an error when not finding the category', async () => {
        const categoryRepository = new InMemoryCategory()

        await expect(categoryRepository.findById('fake-user-category')).rejects.toThrow(new Error('Categoria não encontrada!'))
    })

    it('should find a category', async () => {
        const categoryRepository = new InMemoryCategory()
        const sutCategory = createSutCategory()

        await categoryRepository.save(sutCategory)

        expect(await categoryRepository.findById(sutCategory.id)).toBeTruthy()
    })

    it('should be build categories tree', async () => {
        const categoryRepository = new InMemoryCategory()
        const sutCategory = createSutCategory()
        const sutCategoryChild = createSutCategory2('React', sutCategory.id)

        await categoryRepository.save(sutCategory)
        await categoryRepository.save(sutCategoryChild)

        const tree = await categoryRepository.getTree()
        expect(tree).toEqual(expect.arrayContaining([expect.objectContaining(sutCategory)]))
        expect(tree[0]).toEqual(expect.objectContaining({children: [sutCategoryChild]}))
        expect(tree[0]).toHaveProperty('children', [sutCategoryChild])
    })

    it('should be list all categories', async () => {
        const categoryRepository = new InMemoryCategory()
        const sutCategory = createSutCategory()
        const sutCategoryChild = createSutCategory2('React', sutCategory.id)

        await categoryRepository.save(sutCategory)
        await categoryRepository.save(sutCategoryChild)

        const list = await categoryRepository.listAll()
        expect(list).toEqual(expect.arrayContaining(
            [
                expect.objectContaining(sutCategory),
                expect.objectContaining(sutCategoryChild),
            ]
        ))
    })

    it('should bring the path of all categories', async () => {
        const categoryRepository = new InMemoryCategory()
        const sutCategory = createSutCategory()
        const sutCategoryChild = createSutCategory2('React', sutCategory.id)

        await categoryRepository.save(sutCategory)
        await categoryRepository.save(sutCategoryChild)

        const paths = await categoryRepository.getCategoriesPath()
        expect(paths).toEqual(expect.arrayContaining([
            expect.objectContaining({path: 'Tecnologia'}),
            expect.objectContaining({path: 'Tecnologia > React'}),
        ]))
    })
})