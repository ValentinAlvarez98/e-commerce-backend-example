import {
      Router
} from "express";

import usersRouter from "./users/users.routes.js";
import viewsRouter from "./views/views.routes.js";

const router = Router();

router.use("/", viewsRouter);

router.get("/api/test", (req, res) => {

      try {

            res.status(200).json({
                  message: "Test route"
            });

      } catch (error) {

            res.status(400).json({
                  message: "Test route error"
            });

      }

})

router.use("/api/users", usersRouter);

router.use("*", (req, res) => {

      res.redirect("/home");

})

export default router;