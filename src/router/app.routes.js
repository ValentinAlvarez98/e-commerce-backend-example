import {
      Router
} from "express";

import usersRouter from "./users/users.routes.js";
import viewsRouter from "./views/views.routes.js";


const router = Router();

router.use("/views", viewsRouter);


router.use("/api/users", usersRouter);


export default router;