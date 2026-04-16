import { Router } from "express";
import { healthRouter } from "./health.routes";
import { studentsRouter } from "../modules/students";
import { classesRouter } from "../modules/classes";

const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(studentsRouter);
apiRouter.use(classesRouter);

export { apiRouter };