import { User } from "../entities/User";

export interface UserRepository {
    findById(id: string): Promise<User | null>
    save(user: User): Promise<User>
    delete(userId: string): Promise<string>
    exists(email: string): Promise<boolean>
}