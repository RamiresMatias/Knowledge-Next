import { Request, Response, NextFunction } from "express";
import firebase from "../firebase/config";


export class AuthorizationController {

    async verifyToken(request: Request, response: Response, next: NextFunction) {
        try {
            response.header("Access-Control-Allow-Origin", "*");
            const token = request.headers.token
            await firebase.auth().verifyIdToken(token)
            next()
        } catch (error) {
            return response.status(401).send({authenticate: false})
        }
    }

    async validateToken(request: Request, response: Response) {
        try {
            const token = request.headers.token
            await firebase.auth().verifyIdToken(token)
            return response.status(200).json({authenticate: true})
        } catch (error) {
            return response.status(401).send({authenticate: false})
        }
    }

    async signin(request: Request, response: Response) {
        try {
            const {email, password}  = request.body
            const user = await firebase.auth().signInWithEmailAndPassword(email, password)
            return response.status(200).send(user)
        } catch (error) {
            return response.status(401).send({authenticate: false})
        }
    }
}