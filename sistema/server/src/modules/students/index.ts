import { Router } from "express";
import { listStudents } from "./student.repository";
import {
	createStudentWithValidation,
	updateStudentWithValidation,
} from "./student.service";

const studentsRouter = Router();

studentsRouter.get("/students", async (_request, response) => {
	try {
		const students = await listStudents();
		response.status(200).json(students);
	} catch {
		response.status(500).json({
			message: "Failed to load students.",
		});
	}
});

studentsRouter.post("/students", async (request, response) => {
	try {
		const result = await createStudentWithValidation(request.body);

		if (!result.ok) {
			if (result.kind === "invalid-payload") {
				response.status(400).json({
					message: "Invalid student payload.",
					errors: result.errors,
				});
				return;
			}

			response.status(409).json({
				message: "Student data conflicts with an existing record.",
				errors: result.errors,
			});
			return;
		}

		response.status(201).json(result.student);
	} catch {
		response.status(500).json({
			message: "Failed to create student.",
		});
	}
});

studentsRouter.put("/students/:id", async (request, response) => {
	try {
		const result = await updateStudentWithValidation(request.params.id, request.body);

		if (!result.ok) {
			if (result.kind === "invalid-payload") {
				response.status(400).json({
					message: "Invalid student payload.",
					errors: result.errors,
				});
				return;
			}

			if (result.kind === "not-found") {
				response.status(404).json({
					message: "Student not found.",
				});
				return;
			}

			response.status(409).json({
				message: "Student data conflicts with an existing record.",
				errors: result.errors,
			});
			return;
		}

		response.status(200).json(result.student);
	} catch {
		response.status(500).json({
			message: "Failed to update student.",
		});
	}
});

export { studentsRouter };