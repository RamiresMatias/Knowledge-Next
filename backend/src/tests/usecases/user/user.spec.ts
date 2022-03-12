import { User } from "../../../entities/User"
import { InMemoryUser } from "../../../repositories/in-memory/in-memory-user-repository"
import {randomUUID} from 'crypto'

const createSutUser = (): User => {
    return User.create({
        id: randomUUID(),
        name: 'Ramires Matias',
        email: 'teste.teste@teste.com.br',
        admin: true,
        createdAt: new Date()
    })
}

afterEach(() => jest.clearAllMocks())

describe('User tests', () => {
    it('should be create a user let it be an instance User', async () => {
        const userRepository = new InMemoryUser()

        const spy = jest.spyOn(User, 'create')
        const sutUser = createSutUser()
        await userRepository.save(sutUser)

        expect(sutUser).toBeInstanceOf(User)
        expect(spy).toHaveBeenCalled()
        expect(userRepository.users.length).toBe(1)
    })

    it('should generate an error when creating an existing user', async () => {
        const sutUser = createSutUser()
        const userRepository = new InMemoryUser()

        await userRepository.save(sutUser)
        await expect(userRepository.save(sutUser)).rejects.toThrow(new Error("Já existe um usuário com este e-mail"))
    })

    it('should be create a user and save in memory', async () => {
        const sutUser = createSutUser()
        const userRepository = new InMemoryUser()
        await userRepository.save(sutUser)

        expect(userRepository.users).toEqual(expect.arrayContaining([expect.objectContaining({id: sutUser.id})]))
    })

    it('should be have the properties name, email, admin', () => {
        const newDate = new Date()
        const sutUser = createSutUser()
        expect(sutUser).toHaveProperty('name', 'Ramires Matias')
        expect(sutUser).toHaveProperty('email', 'teste.teste@teste.com.br')
        expect(sutUser).toHaveProperty('admin', true)
        expect(sutUser).toHaveProperty('createdAt', newDate)
    })

    it('should be delete a user in memory', async () => {
        const sutUser = createSutUser()
        const userRepository = new InMemoryUser()

        await userRepository.save(sutUser)
        expect(userRepository.users.length).toBe(1)
        
        await userRepository.delete(sutUser.id)
        expect(userRepository.users.length).toBe(0)
    })

    it('should generate an error when a userId is missing', async () => {
        const userRepository = new InMemoryUser()

        await expect(userRepository.delete('')).rejects.toThrow(new Error('ID do usuário não informado!'))
    })

    it('should generate an error when not finding the user', async () => {
        const userRepository = new InMemoryUser()

        await expect(userRepository.findById('fake-user-id')).rejects.toThrow(new Error('Usuário não encontrado!'))
    })

    it('should find a user', async () => {
        const userRepository = new InMemoryUser()
        const sutUser = createSutUser()

        await userRepository.save(sutUser)

        expect(await userRepository.findById(sutUser.id)).toBeTruthy()
    })
})