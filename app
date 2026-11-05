export default function App() {
  const features = [
    "AI Doubt Solver", "Mock Tests", "Digital Library", "Educational Newspaper",
    "Study Timetable", "Reminders", "Student Dashboard", "Teacher Dashboard", "Coupons & Rewards"
  ];

  return (
    <main className="page">
      <nav className="nav"><strong>Complex Learn</strong><span>Learn • Practise • Grow</span></nav>
     <section className="hero">
        <p className="eyebrow">YOUR LEARNING COMPANION</p>
        <h1>Make learning simpler and smarter.</h1>
        <p>One place for study resources, practice, reminders and academic progress.</p>
 </section>
      <section className="features">
        <h2>Explore learning tools</h2>
        <div className="grid">
          {features.map((feature) => <article className="feature" key={feature}>{feature}</article>)}
        </div>
      </section>
      <footer>Complex Learn · Learning for everyone</footer>
    </main>
  );
}
