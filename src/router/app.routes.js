import {
      Router
} from "express";

import usersRouter from "./users/users.routes.js";

const router = Router();

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

router.get("/users", (req, res) => {

      res.render('users')

})

router.use("/api/users", usersRouter);

export default router;