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
    .all(auth.verifyToken)
    .post(userController.save)
    .get(userController.listAllUsers)

router.route('/users/:id')
    .all(auth.verifyToken)
    .delete(userController.delete)
    .put(userController.update)
    .get(userController.findById)

router.route('/category')
    .all(auth.verifyToken)
    .post(categoryController.save)
    .get(categoryController.listAll)

router.route('/category/tree')
    .all(auth.verifyToken)
    .get(categoryController.getTree)


router.route('/category/:id')
    .all(auth.verifyToken)
    .get(categoryController.findById)


router.route('/article')
    .all(auth.verifyToken)
    .post(articleController.save)
    .get(articleController.listAll)

router.route('/article/:id')
    .all(auth.verifyToken)
    .delete(articleController.delete)
    .get(articleController.findById)


export {router}

