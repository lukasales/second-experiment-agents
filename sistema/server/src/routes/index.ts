import { Router } from "express";
import { healthRouter } from "./health.routes";
import { studentsRouter } from "../modules/students";

const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(studentsRouter);

export { apiRouter };