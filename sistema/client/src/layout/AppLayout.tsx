import { NavLink, Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Second Practical Experiment</p>
          <h1>Student Assessment Management</h1>
          <p className="subtitle">
            Base application for students, classes, assessments, and notifications.
          </p>
        </div>
      </header>

      <nav className="app-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Home
        </NavLink>

        <NavLink
          to="/students"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Students
        </NavLink>

        <NavLink
          to="/classes"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Classes
        </NavLink>

        <NavLink
          to="/assessments"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Assessments
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Notifications
        </NavLink>
      </nav>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}