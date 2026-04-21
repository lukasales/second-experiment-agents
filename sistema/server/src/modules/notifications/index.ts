import { Router } from "express";
import {
	dispatchDailyNotifications,
	listNotificationsForDisplay,
} from "./notification.service";

const notificationsRouter = Router();

notificationsRouter.get("/notifications", async (_request, response) => {
	try {
		const notifications = await listNotificationsForDisplay();
		response.status(200).json(notifications);
	} catch {
		response.status(500).json({
			message: "Failed to load notifications.",
		});
	}
});

notificationsRouter.post("/notifications/daily-dispatch", async (request, response) => {
	try {
		const dateFromBody =
			typeof request.body?.date === "string" ? request.body.date : undefined;

		const result = await dispatchDailyNotifications({
			date: dateFromBody,
		});

		response.status(200).json(result);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Failed to dispatch notifications.";

		response.status(400).json({
			message,
		});
	}
});

export { notificationsRouter };