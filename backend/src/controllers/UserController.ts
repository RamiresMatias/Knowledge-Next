import { Request, Response } from "express";
import {UserService} from '../repositories/prisma/user'

export class UserController {

    async save(request: Request, response: Response) {
        try {

            const userService = new UserService()
            const {name, email, admin} = request.body

            const userCreated = await userService.save({name, email, admin})
            response.json(userCreated)
        } catch (error) {
            return response.status(400).send(error)
        }
    }

    async update(request: Request, response: Response) {
        try {

            const userService = new UserService()
            const {name, email, admin} = request.body
            const id = request.params.id

            const userCreated = await userService.update({id, name, email, admin})
            response.json(userCreated)
        } catch (error) {
            return response.status(400).send("Erro ao alterar o usuário!")
        }
    }

    async findById(request: Request, response: Response) {
        try {
            const id = request.params.id
            const userService = new UserService()
            const user = await userService.findById(id)
            return response.json(user)
        } catch (error) {
            return response.status(400).send(error)
        }
    }

    async listAllUsers(request: Request, response: Response) {
        try {
            const userService = new UserService()
            const allUsers = await userService.listAllUsers()
            return response.json(allUsers)
        } catch (error) {
            return response.status(400).send(error)
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const id = request.params.id
            const userService = new UserService()
            const userDeleted = await userService.delete(id)
            return response.json(userDeleted)
        } catch (error) {
            return response.status(400).send(error)
        }
    }
}