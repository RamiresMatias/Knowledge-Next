import {Router} from 'express'
import { ArticleController } from '../controllers/ArticleController'
import { CategoryController } from '../controllers/CategoryController'
import { UserController } from '../controllers/UserController'

const router = Router()

const userController = new UserController()
const categoryController = new CategoryController()
const articleController = new ArticleController()

router.post('/users', userController.save)
router.delete('/users/:id', userController.delete)
router.put('/users/:id', userController.update)
router.get('/users/:id', userController.findById)
router.get('/users', userController.listAllUsers)

router.post('/category', categoryController.save)
router.get('/category/tree', categoryController.getTree)
router.get('/category/:id', categoryController.findById)
router.get('/category', categoryController.listAll)

router.post('/article', articleController.save)
router.delete('/article/:id', articleController.delete)
router.get('/article/:id', articleController.findById)
router.get('/article', articleController.listAll)

export {router}

