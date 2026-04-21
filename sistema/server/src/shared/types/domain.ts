export type AssessmentConcept = "MANA" | "MPA" | "MA";

export interface Student {
  id: string;
  name: string;
  cpf: string;
  email: string;
}

export interface ClassRoom {
  id: string;
  topic: string;
  year: number;
  semester: number;
  studentIds: string[];
  assessmentsByStudent: Record<string, unknown>;
}

export interface StudentAssessment {
  id: string;
  classId: string;
  studentId: string;
  goal: string;
  concept: AssessmentConcept;
}

export interface DailyNotificationChange {
  classId: string;
  goal: string;
  concept: AssessmentConcept;
}

export interface DailyNotification {
  id: string;
  studentId: string;
  date: string;
  changes: DailyNotificationChange[];
  sentAt: string | null;
}