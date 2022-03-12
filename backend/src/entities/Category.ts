
export class Category{
    id?: string 
    name: string
    parentId?: string
    createdAt?: Date = new Date()

    private constructor({name, id, parentId, createdAt}: Category) {
        this.id = id
        this.name = name
        this.parentId = parentId
        this.createdAt = createdAt
    }

    static create(category: Category): Category {
        return new Category(category)
    }

    static toTree(categories: Category[], tree?: any[]): any {
        let treeLocal = tree

        if (!treeLocal) treeLocal = categories.filter((c: Category) => !c.parentId);
        treeLocal = treeLocal.map((parentNode) => {
            const isChild = (node: Category) => node.parentId == parentNode.id;
            parentNode.children = this.toTree(categories, categories.filter(isChild))
            return parentNode
        })

        return treeLocal;
    }

    static getParent(categories: Category[], parentId?: string): Category | null {
        const parent = categories.filter(parent => parent.id === parentId)
        return parent.length ? parent[0] : null
    }

    static treePathString (categories: Category[]) {

        const categoriesWithPath = categories.map((categ: Category) => {
            let path = categ.name
            let parent = this.getParent(categories, categ.parentId)

            while (parent) {
                path = `${parent.name} > ${path}`
                parent = this.getParent(categories, parent.parentId);
            }

            return { ...categ, path }
        })

        /* Função para retornar as categorias ordenadas */
        categoriesWithPath.sort((a, b) => {
            if (a.path < b.path) return -1
            if (a.path > b.path) return 1
            return 0
        })
        return categoriesWithPath
    }
}