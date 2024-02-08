import {
      Router
} from "express";

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {

      res.render('home')

})

viewsRouter.get("/getAllUsers", (req, res) => {

      res.render('getAllUsers')

})

export default viewsRouter;