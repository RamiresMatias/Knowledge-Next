import {Router} from 'express'
import { ArticleController } from '../controllers/ArticleController'
import { AuthorizationController } from '../controllers/AuthorizationController'
import { CategoryController } from '../controllers/CategoryController'
import { UserController } from '../controllers/UserController'

const router = Router()

const userController = new UserController()
const categoryController = new CategoryController()
const articleController = new ArticleController()
const auth = new AuthorizationController()

router.post('/validateToken', auth.validateToken)
router.post('signin', auth.signin)

router.route('/users')
    .post(userController.save)
    .get(userController.listAllUsers)

router.route('/users/:id')
    .delete(userController.delete)
    .put(userController.update)
    .get(userController.findById)

router.route('/category')
    .post(categoryController.save)
    .get(categoryController.listAll)

router.route('/category/tree')
    .get(categoryController.getTree)


router.route('/category/:id')
    .get(categoryController.findById)


router.route('/article')
    .post(articleController.save)
    .get(articleController.listAll)

router.route('/article/:id')
    .delete(articleController.delete)
    .get(articleController.findById)


export {router}

