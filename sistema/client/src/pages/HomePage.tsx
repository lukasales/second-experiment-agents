export function HomePage() {
  return (
    <section className="page-card">
      <h2>Project Overview</h2>

      <p>
        This frontend will evolve into a simple web system for managing students,
        classes, assessments, and daily consolidated notifications.
      </p>

      <ul>
        <li>Student management page</li>
        <li>Class management page</li>
        <li>Assessment matrix page</li>
        <li>JSON-backed persistence through the server</li>
      </ul>

      <p>
        This is only the initial bootstrap. Functional implementation will start
        in the next controlled iterations.
      </p>
    </section>
  );
}