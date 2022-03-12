import { prismaClient } from "../../database/prismaClient";
import { User } from "../../entities/User";
import { UserRepository } from "../UserRepository";
import {randomUUID} from 'crypto'


export class UserService implements UserRepository{
    
    async save({name, email, admin}: User): Promise<User> {

        if(await this.exists(email)) 
            throw 'Usuário com o e-mail já cadastrado!'

        const userSave = await prismaClient.user.create({
            data: {
                id: randomUUID(),
                name, 
                email,
                admin,
                createdAt: new Date()
            }
        })
        return userSave
    }


    async update({name, email, admin, id}: User): Promise<User> {

        const userUpdated = await prismaClient.user.update({
            data: {
                name,
                email,
                admin
            },
            where:{
                id,
            }
        })
        return userUpdated
    }


    async delete(userId: string): Promise<string> {

        if(!await this.findById(userId)) 
            throw 'Usuário não encontrado!'

        const userDeleted = await prismaClient.user.delete({
            where:{
                id: userId
            }
        })

        return userDeleted.name
    }

    async findByEmail(email: string): Promise<User> {
        return await prismaClient.user.findFirst({
            where:{
                email,
            }
        })
    }

    async findById(id: string): Promise<User> {
        const user = await prismaClient.user.findUnique({
            where:{
                id,
            }
        })
        if(!user) throw 'Usuário não encontrado!'
        return user
    }

    async listAllUsers(): Promise<User[]> {
        return await prismaClient.user.findMany()
    }

    async exists(email: string): Promise<boolean> {
        return !!await this.findByEmail(email)
    }
}