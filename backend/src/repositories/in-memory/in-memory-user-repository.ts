
import { User } from "../../entities/User";
import { UserRepository } from "../UserRepository";

export class InMemoryUser implements UserRepository {
    public users: User[] = []

    async findById(id?: string): Promise<User> {
        const user = this.users.find(user => user.id === id)
        if(!user) {
            throw new Error('Usuário não encontrado!')
        }
        return user
    }

    async save(user: User): Promise<User> {
        if(await this.exists(user.email)) {
            throw new Error("Já existe um usuário com este e-mail")
        }
        this.users.push(user)
        return user
    }

    async delete(userId?: string): Promise<string> {
        
        if(!userId) {
            throw new Error('ID do usuário não informado!')
        }

        const indexUser = this.users.findIndex(userRepository => userRepository.id === userId)
        this.users.splice(indexUser, 1)
        return userId
    }

    async exists(email: string): Promise<boolean> {
        return this.users.some(user => user.email === email)
    }
}