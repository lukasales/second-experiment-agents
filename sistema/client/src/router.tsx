import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { HomePage } from "./pages/HomePage";
import { StudentsPage } from "./pages/StudentsPage";
import { ClassesPage } from "./pages/ClassesPage";
import { AssessmentsPage } from "./pages/AssessmentsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "students",
        element: <StudentsPage />,
      },
      {
        path: "classes",
        element: <ClassesPage />,
      },
      {
        path: "assessments",
        element: <AssessmentsPage />,
      },
    ],
  },
]);