import { Router } from "express";
import { listClasses } from "./class.repository";
import { createClassWithValidation } from "./class.service";

const classesRouter = Router();

classesRouter.get("/classes", async (_request, response) => {
	try {
		const classes = await listClasses();
		response.status(200).json(classes);
	} catch {
		response.status(500).json({
			message: "Failed to load classes.",
		});
	}
});

classesRouter.post("/classes", async (request, response) => {
	try {
		const result = await createClassWithValidation(request.body);

		if (!result.ok) {
			response.status(400).json({
				message: "Invalid class payload.",
				errors: result.errors,
			});
			return;
		}

		response.status(201).json(result.classRoom);
	} catch {
		response.status(500).json({
			message: "Failed to create class.",
		});
	}
});

export { classesRouter };