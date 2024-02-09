import {
      Router
} from "express";

const viewsRouter = Router();

viewsRouter.get("/home", (req, res) => {

      res.render('home')

})

viewsRouter.get('/users', (req, res) => {

      res.render('users')

})

viewsRouter.get("/getAllUsers", (req, res) => {

      res.render('getAllUsers')

})

viewsRouter.get("/getOneUser", (req, res) => {

      res.render('getOneUser')

})

viewsRouter.get("/addOneUser", (req, res) => {

      res.render('addOneUser')

})

viewsRouter.get("/updateOneUser", (req, res) => {

      res.render('updateOneUser')

})

viewsRouter.get("/deleteOneUser", (req, res) => {

      res.render('deleteOneUser')

})

viewsRouter.get("/deleteInactiveUsers", (req, res) => {

      res.render('deleteInactiveUsers')

})

viewsRouter.get("/login", (req, res) => {

      res.render('login')

})

viewsRouter.get("/logout", (req, res) => {

      res.render('logout')

})

export default viewsRouter;