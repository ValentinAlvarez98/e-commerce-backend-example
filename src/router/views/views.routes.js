import {
      Router
} from "express";

const viewsRouter = Router();

viewsRouter.get("/home", (req, res) => {

      res.render('home')

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

export default viewsRouter;