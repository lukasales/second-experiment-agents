import { Router } from "express";
import {
	getClassAssessments,
	updateAssessmentWithValidation,
} from "./assessment.service";

const assessmentsRouter = Router();

assessmentsRouter.get("/assessments/class/:classId", async (request, response) => {
	try {
		const result = await getClassAssessments(request.params.classId);

		if (!result.ok) {
			response.status(404).json({
				message: "Class not found.",
			});
			return;
		}

		response.status(200).json(result.data);
	} catch {
		response.status(500).json({
			message: "Failed to load class assessments.",
		});
	}
});

assessmentsRouter.put("/assessments", async (request, response) => {
	try {
		const result = await updateAssessmentWithValidation(request.body);

		if (!result.ok) {
			if (result.kind === "invalid-payload") {
				response.status(400).json({
					message: "Invalid assessment payload.",
					errors: result.errors,
				});
				return;
			}

			if (result.kind === "student-not-enrolled") {
				response.status(400).json({
					message: "Student is not enrolled in the class.",
				});
				return;
			}

			response.status(404).json({
				message: "Class not found.",
			});
			return;
		}

		response.status(200).json(result.data);
	} catch {
		response.status(500).json({
			message: "Failed to update assessment.",
		});
	}
});

export { assessmentsRouter };