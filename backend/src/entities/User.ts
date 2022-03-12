export class User {
    id?: string
    name: string
    email: string
    admin: boolean
    createdAt?: Date

    private constructor(user: User) {
        this.id = user.id
        this.name = user.name
        this.email = user.email
        this.admin = user.admin
        this.createdAt = user.createdAt
    }

    static create(user: User): User {
        return new User(user)
    }
}
  
