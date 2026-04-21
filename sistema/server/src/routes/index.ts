import { Router } from "express";
import { healthRouter } from "./health.routes";
import { studentsRouter } from "../modules/students";
import { classesRouter } from "../modules/classes";
import { assessmentsRouter } from "../modules/assessments";
import { notificationsRouter } from "../modules/notifications";

const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(studentsRouter);
apiRouter.use(classesRouter);
apiRouter.use(assessmentsRouter);
apiRouter.use(notificationsRouter);

export { apiRouter };