import { useState } from "react";
import {
  GraduationCap, Home, Brain, ClipboardList, Gift, BookOpen, Newspaper,
  CalendarDays, Bell, Search, Menu, ChevronRight, Crown, UserRound,
  Users, FilePlus2, Upload, ChartNoAxesCombined, Sparkles, Clock,
  CheckCircle2, CircleHelp, LogOut, X
} from "lucide-react";
import "./App.css";


const studentItems = [
  { label: "Home", icon: Home, key: "Home" },
  { label: "AI Doubt Solver", icon: Brain, key: "AI Doubt Solver" },
  { label: "Mock Tests", icon: ClipboardList, key: "Mock Tests" },
  { label: "Coupons & Rewards", icon: Gift, key: "Coupons & Rewards" },
  { label: "Digital Library", icon: BookOpen, key: "Digital Library" },
  { label: "Newspaper", icon: Newspaper, key: "Newspaper" },
  { label: "Study Timetable", icon: CalendarDays, key: "Study Timetable" },
  { label: "Reminders & Alarms", icon: Bell, key: "Reminders & Alarms" },
];

const teacherItems = [
  { label: "Dashboard", icon: Home, key: "Dashboard" },
  { label: "Manage Students", icon: Users, key: "Manage Students" },
  { label: "Create Tests", icon: FilePlus2, key: "Create Tests" },
  { label: "Upload Materials", icon: Upload, key: "Upload Materials" },
  { label: "View Results", icon: ChartNoAxesCombined, key: "View Results" },
];

const featureCards = [
  { title: "AI Doubt Solver", description: "Ask questions and understand concepts", icon: Brain, tone: "purple" },
  { title: "Mock Tests", description: "Practice and improve your scores", icon: ClipboardList, tone: "blue" },
  { title: "Coupons & Rewards", description: "Earn coins through learning", icon: Gift, tone: "gold" },
  { title: "Digital Library", description: "Explore books and study notes", icon: BookOpen, tone: "blue" },
  { title: "Newspaper", description: "Read learning-friendly news", icon: Newspaper, tone: "purple" },
  { title: "Study Timetable", description: "Plan your study schedule", icon: CalendarDays, tone: "blue" },
  { title: "Reminders & Alarms", description: "Stay on track with tasks", icon: Bell, tone: "gold" },
];

function App() {
  const [role, setRole] = useState("student");
  const [active, setActive] = useState("Home");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [notice, setNotice] = useState("");

  const isStudent = role === "student";
  const navItems = isStudent ? studentItems : teacherItems;

  function selectPage(page) {
    setActive(page);
    setSidebarOpen(false);
    setNotice("");
  }

  function toggleRole() {
    setRole(isStudent ? "teacher" : "student");
    setActive(isStudent ? "Dashboard" : "Home");
    setSidebarOpen(false);
    setNotice("");
  }

  function showNotice(message) {
    setNotice(message);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
          {sidebarOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <div className="brand">
          <span className="brand-mark"><GraduationCap size={31} fill="currentColor" /></span>
          <span>COMPLEX <b>LEARN</b></span>
        </div>
        <nav className="topnav">
          <button className="topnav-active" onClick={() => selectPage(isStudent ? "Home" : "Dashboard")}><Home size={16}/> Dashboard</button>
          {isStudent ? <>
            <button onClick={() => selectPage("AI Doubt Solver")}><Brain size={16}/> AI Doubt Solver</button>
            <button onClick={() => selectPage("Mock Tests")}><ClipboardList size={16}/> Mock Tests</button>
            <button onClick={() => selectPage("Digital Library")}><BookOpen size={16}/> Library</button>
            <button onClick={() => selectPage("Newspaper")}><Newspaper size={16}/> Newspaper</button>
          </> : <>
            <button onClick={() => selectPage("Manage Students")}><Users size={16}/> Manage Students</button>
            <button onClick={() => selectPage("Create Tests")}><FilePlus2 size={16}/> Create Tests</button>
            <button onClick={() => selectPage("Upload Materials")}><Upload size={16}/> Materials</button>
          </>}
        </nav>
        <div className="top-actions">
          {isStudent && <div className="coin-pill"><span>★</span> 250</div>}
          <button className="icon-button" aria-label="Notifications" onClick={() => selectPage(isStudent ? "Reminders & Alarms" : "Dashboard")}><Bell size={19}/><i>2</i></button>
          <button className="avatar" onClick={toggleRole} title="Switch demo role">{isStudent ? "S" : "T"}</button>
        </div>
      </header>

      <div className="layout">
        <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
          <div className="side-label">{isStudent ? "STUDENT MENU" : "TEACHER MENU"}</div>
          {navItems.map(({ label, icon: Icon, key }) => (
            <button key={key} className={`side-link ${active === key ? "selected" : ""}`} onClick={() => selectPage(key)}>
              <Icon size={19}/><span>{label}</span>
            </button>
          ))}
          <div className="sidebar-bottom">
            {isStudent ? <div className="premium-mini">
              <Crown size={22}/><strong>Go Premium!</strong><p>Unlock more learning tools.</p>
              <button onClick={() => showNotice("Premium plan screen is a demo. Connect your payment provider before accepting payments.")}>Explore Premium <ChevronRight size={14}/></button>
            </div> : <div className="teacher-mini"><GraduationCap size={25}/><strong>Teacher Tools</strong><span>Empower learning</span></div>}
            <button className="switch-role" onClick={toggleRole}><UserRound size={16}/> Switch to {isStudent ? "Teacher" : "Student"} demo <LogOut size={15}/></button>
          </div>
        </aside>

        <main className="main-content">
          <div className="page-heading">
            <div><p className="eyebrow">LEARN · PRACTICE · ACHIEVE</p><h1>{pageTitle(active, isStudent)}</h1><p className="subheading">{isStudent ? "Your learning journey, all in one place." : "Manage your classroom and support student progress."}</p></div>
            <div className="search-box"><Search size={17}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tools..." /></div>
          </div>

          {notice && <div className="notice"><CheckCircle2 size={17}/>{notice}<button onClick={() => setNotice("")}><X size={15}/></button></div>}

          {isStudent ? renderStudentPage(active, { selectPage, question, setQuestion, asked, setAsked, testStarted, setTestStarted, showNotice }) : renderTeacherPage(active, { showNotice, search })}
        </main>
      </div>
      <footer className="footer">© 2026 Complex Learn <span>Making education simple, smart and fun.</span></footer>
    </div>
  );
}


function pageTitle(active, isStudent) {
  if (active === "Home") return "Welcome to Complex Learn!";
  if (active === "Dashboard") return "Welcome, Teacher!";
  return active;
}


function renderStudentPage(active, props) {
  if (active === "AI Doubt Solver") return <section className="content-grid one-column"><div className="panel ai-panel"><div className="panel-icon purple"><Brain size={27}/></div><h2>Ask Complex Learn AI</h2><p>Ask a school subject question and get a learning explanation.</p><textarea value={props.question} onChange={(e) => { props.setQuestion(e.target.value); props.setAsked(false); }} placeholder="Type your question here..."/><button className="primary-button" disabled={!props.question.trim()} onClick={() => props.setAsked(true)}><Sparkles size={17}/> Get Explanation</button>{props.asked && <div className="demo-answer"><strong>Demo response</strong><p>This frontend is ready for an AI API connection. Your backend should securely call the AI provider and return a helpful, age-appropriate explanation.</p></div>}</div></section>;
  if (active === "Mock Tests") return <section className="content-grid one-column"><div className="panel"><PanelTitle title="Available Mock Tests" subtitle="Practice, submit, and review your progress."/><div className="test-row"><div className="test-icon blue"><ClipboardList/></div><div className="grow"><strong>Science — Practice Test</strong><span>Class 10 · 20 questions · 30 minutes</span></div><span className="tag">Available</span><button className="outline-button" onClick={() => props.setTestStarted(!props.testStarted)}>{props.testStarted ? "Close Test" : "Start Test"}</button></div>{props.testStarted && <div className="demo-answer"><strong>Practice test preview</strong><p>Question 1: Which process do plants use to make food?</p><label className="choice"><input type="radio" name="q1"/> Photosynthesis</label><label className="choice"><input type="radio" name="q1"/> Respiration</label><button className="primary-button small" onClick={() => props.showNotice("Practice preview submitted. Connect the test API to save actual scores.")}>Submit Preview</button></div>}</div></section>;
  if (active === "Coupons & Rewards") return <section className="content-grid one-column"><div className="panel rewards-panel"><div className="reward-hero"><div><span className="eyebrow">YOUR LEARNING REWARDS</span><h2>Keep learning. Earn coins.</h2><p>Coins and coupons are demo data until connected to your backend.</p></div><div className="big-coin">★<strong>250</strong><small>COINS</small></div></div><div className="section-title"><h3>Available coupons</h3><span className="tag gold-tag">2 rewards</span></div><div className="coupon-grid"><Coupon title="Study Star" detail="Complete a practice test" code="LEARN10"/><Coupon title="Weekly Achiever" detail="Finish your weekly goals" code="WEEKLY"/></div></div></section>;
  if (active === "Digital Library") return <LibraryPage />;
  if (active === "Newspaper") return <section className="content-grid one-column"><div className="panel"><PanelTitle title="Learning News" subtitle="A sample reading area for educational articles."/><article className="article-card"><span className="tag">Science</span><h3>How curiosity helps us learn</h3><p>Asking questions, reading carefully, and explaining ideas in your own words are useful ways to build understanding.</p><button className="text-button" onClick={() => props.showNotice("Article opened in demo mode.")}>Read article <ChevronRight size={15}/></button></article><article className="article-card"><span className="tag">Study Skills</span><h3>Make a simple study plan</h3><p>Choose one goal, divide it into small tasks, and take short breaks between focused sessions.</p><button className="text-button" onClick={() => props.showNotice("Article opened in demo mode.")}>Read article <ChevronRight size={15}/></button></article></div></section>;
  if (active === "Study Timetable") return <TimetablePage showNotice={props.showNotice}/>;
  if (active === "Reminders & Alarms") return <RemindersPage showNotice={props.showNotice}/>;
  return <StudentDashboard selectPage={props.selectPage}/>;
}


function StudentDashboard({ selectPage }) {
  return <>
    <section className="hero-row">
      <div className="welcome-banner"><div className="hero-copy"><span className="eyebrow">YOUR LEARNING PARTNER</span><h2>Learn more.<br/><em>Achieve more.</em></h2><p>Learn · Practice · Achieve</p><button className="yellow-button" onClick={() => selectPage("Mock Tests")}>Start Learning <ChevronRight size={16}/></button></div><div className="hero-art"><div className="book-stack"><BookOpen size={64}/><GraduationCap size={58}/><Sparkles size={24}/></div></div></div>
      <div className="profile-card"><div className="profile-top"><div className="profile-avatar">S</div><div><h3>Hello, Student!</h3><p>Keep going, you're doing great.</p></div></div><div className="stats"><Stat value="12" label="Tests Taken"/><Stat value="85%" label="Avg Score"/><Stat value="250" label="Coins"/></div></div>
    </section>
    <section className="feature-grid">{featureCards.map(({title, description, icon: Icon, tone}) => <button className="feature-card" key={title} onClick={() => selectPage(title)}><div className={`feature-icon ${tone}`}><Icon size={27}/></div><div className="feature-copy"><strong>{title}</strong><span>{description}</span></div><span className="circle-arrow"><ChevronRight size={16}/></span></button>)}</section>
    <section className="lower-grid"><div className="panel progress-panel"><PanelTitle title="Learning Progress" subtitle="Your weekly learning activity"/><div className="chart"><div className="chart-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="chart-area"><div className="gridline g1"/><div className="gridline g2"/><div className="gridline g3"/><div className="gridline g4"/><svg viewBox="0 0 500 170" preserveAspectRatio="none" aria-label="Weekly progress line chart"><polyline points="0,130 125,82 250,65 375,42 500,15" fill="none" stroke="#713bfa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="0" cy="130" r="5"/><circle cx="125" cy="82" r="5"/><circle cx="250" cy="65" r="5"/><circle cx="375" cy="42" r="5"/><circle cx="500" cy="15" r="5"/></svg><div className="chart-labels"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span></div></div></div></div><div className="panel quick-panel"><PanelTitle title="Quick Actions" subtitle="Jump into your learning"/><button className="quick-action primary" onClick={() => selectPage("Mock Tests")}><ClipboardList size={17}/> Take a Mock Test <ChevronRight size={15}/></button><button className="quick-action" onClick={() => selectPage("AI Doubt Solver")}><Brain size={17}/> Ask AI a Question <ChevronRight size={15}/></button><button className="quick-action" onClick={() => selectPage("Study Timetable")}><CalendarDays size={17}/> View Timetable <ChevronRight size={15}/></button></div><div className="panel activity-panel"><PanelTitle title="Recent Activity" subtitle="Your latest learning updates"/><Activity icon={ClipboardList} title="Science Practice Test" time="Today · 10:30 AM"/><Activity icon={BookOpen} title="Study notes opened" time="Yesterday · 4:20 PM"/><Activity icon={Gift} title="Learning coins earned" time="Yesterday · 1:15 PM"/></div></section>
  </>;
}

function renderTeacherPage(active, props) {
  if (active === "Manage Students") return <section className="content-grid one-column"><div className="panel"><PanelTitle title="Manage Students" subtitle="Sample classroom list · connect the student API to load real records."/><div className="table-wrap"><table><thead><tr><th>Student</th><th>Class</th><th>Progress</th><th>Status</th></tr></thead><tbody>{[ ["Aarav Sharma","10-A","88%"],["Diya Patel","10-A","92%"],["Kabir Singh","10-B","76%"],["Anaya Rao","10-B","95%"]].filter(row=>row.join(" ").toLowerCase().includes(props.search.toLowerCase())).map(row=><tr key={row[0]}><td><div className="student-cell"><span className="small-avatar">{row[0][0]}</span>{row[0]}</div></td><td>{row[1]}</td><td><strong>{row[2]}</strong></td><td><span className="status">Active</span></td></tr>)}</tbody></table></div></div></section>;
  if (active === "Create Tests") return <CreateTestPage showNotice={props.showNotice}/>;
  if (active === "Upload Materials") return <UploadPage showNotice={props.showNotice}/>;
  if (active === "View Results") return <section className="content-grid one-column"><div className="panel"><PanelTitle title="Student Results" subtitle="Demo result summary; real results will come from MongoDB."/><div className="result-summary"><div><span>Average score</span><strong>82%</strong></div><div><span>Tests completed</span><strong>148</strong></div><div><span>Students improving</span><strong>76%</strong></div></div><div className="result-bar"><span style={{width:"82%"}}/></div><p className="muted">Use the backend result endpoint to show individual scores and class reports.</p></div></section>;
  return <TeacherDashboard showNotice={props.showNotice} selectPage={(page)=>{window.dispatchEvent(new CustomEvent("complexlearn-nav",{detail:page}));}}/>;
}


function TeacherDashboard({ showNotice }) {
  return <><section className="teacher-welcome"><div className="teacher-illustration"><GraduationCap size={42}/></div><div className="grow"><span className="eyebrow">TEACHER WORKSPACE</span><h2>Welcome, Teacher!</h2><p>Manage your classes and track student progress.</p></div><button className="outline-button" onClick={() => showNotice("Teacher profile is a frontend demo.")}><UserRound size={16}/> Profile</button></section><section className="teacher-stat-grid"><TeacherStat icon={Users} value="120" label="Total Students" tone="blue"/><TeacherStat icon={ClipboardList} value="8" label="Active Tests" tone="purple"/><TeacherStat icon={CheckCircle2} value="92%" label="Avg Performance" tone="gold"/></section><section className="lower-grid teacher-lower"><div className="panel progress-panel"><PanelTitle title="Student Progress Overview" subtitle="Class performance over recent weeks"/><div className="chart"><div className="chart-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="chart-area"><div className="gridline g1"/><div className="gridline g2"/><div className="gridline g3"/><div className="gridline g4"/><svg viewBox="0 0 500 170" preserveAspectRatio="none"><polyline points="0,120 125,80 250,62 375,38 500,15" fill="none" stroke="#713bfa" strokeWidth="4" strokeLinecap="round"/><circle cx="0" cy="120" r="5"/><circle cx="125" cy="80" r="5"/><circle cx="250" cy="62" r="5"/><circle cx="375" cy="38" r="5"/><circle cx="500" cy="15" r="5"/></svg><div className="chart-labels"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span></div></div></div></div><div className="panel quick-panel"><PanelTitle title="Quick Actions" subtitle="Manage classroom activities"/><button className="quick-action primary" onClick={() => showNotice("Create Test form is ready to connect to the test API.")}><FilePlus2 size={17}/> Create Mock Test <ChevronRight size={15}/></button><button className="quick-action" onClick={() => showNotice("Material upload requires backend storage setup.")}><Upload size={17}/> Upload Study Material <ChevronRight size={15}/></button><button className="quick-action" onClick={() => showNotice("Results page can load from the result API.")}><ChartNoAxesCombined size={17}/> View Results <ChevronRight size={15}/></button></div><div className="panel activity-panel"><PanelTitle title="Recent Activities" subtitle="Latest classroom updates"/><Activity icon={ClipboardList} title="Math Test — Class 10" time="Today · 10:30 AM"/><Activity icon={BookOpen} title="Science notes uploaded" time="Yesterday · 4:20 PM"/><Activity icon={Users} title="New student registered" time="Yesterday · 1:15 PM"/></div></section></>;
}

function CreateTestPage({ showNotice }) { const [title,setTitle]=useState(""); const [subject,setSubject]=useState("Science"); const [questions,setQuestions]=useState("20"); return <section className="content-grid one-column"><div className="panel form-panel"><PanelTitle title="Create Mock Test" subtitle="Build a test for your students. This demo does not save yet."/><label>Test title<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Science Chapter 3"/></label><label>Subject<select value={subject} onChange={e=>setSubject(e.target.value)}><option>Science</option><option>Mathematics</option><option>English</option><option>Social Studies</option></select></label><label>Number of questions<input type="number" min="1" max="100" value={questions} onChange={e=>setQuestions(e.target.value)}/></label><button className="primary-button" onClick={()=>showNotice(`Demo test prepared: ${title || "Untitled Test"} · ${subject} · ${questions} questions. Connect the test API to publish.`)}><FilePlus2 size={17}/> Prepare Test</button></div></section>; }
function UploadPage({ showNotice }) { const [file,setFile]=useState(null); return <section className="content-grid one-column"><div className="panel form-panel"><PanelTitle title="Upload Study Materials" subtitle="Choose a document to preview its name. Upload storage will be added in the backend."/><label className="upload-drop"><Upload size={30}/><strong>Choose a study material</strong><span>PDF, DOC, or image files</span><input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={e=>setFile(e.target.files?.[0]||null)}/></label>{file && <div className="file-selected"><BookOpen size={18}/>{file.name}</div>}<button className="primary-button" disabled={!file} onClick={()=>showNotice(`Selected ${file?.name}. Connect secure file storage to upload it.`)}><Upload size={17}/> Upload Material</button></div></section>; }
function LibraryPage() { return <section className="content-grid one-column"><div className="panel"><PanelTitle title="Digital Library" subtitle="Sample learning resources. Add your licensed materials here."/><div className="library-grid"><Resource icon={BookOpen} title="Science Notes" detail="Class 10 · PDF"/><Resource icon={BookOpen} title="Mathematics Practice" detail="Algebra · Worksheet"/><Resource icon={BookOpen} title="English Grammar" detail="Grammar · Notes"/><Resource icon={BookOpen} title="Social Studies" detail="History · Reading"/></div></div></section>; }
function TimetablePage({ showNotice }) { const [subject,setSubject]=useState("Mathematics"); const [time,setTime]=useState("5:00 PM"); return <section className="content-grid one-column"><div className="panel form-panel"><PanelTitle title="Study Timetable" subtitle="Plan a balanced study session."/><div className="schedule-item"><span className="schedule-dot purple-dot"/><div><strong>Mathematics</strong><span>Today · 4:00 PM</span></div><span className="tag">45 min</span></div><div className="schedule-item"><span className="schedule-dot blue-dot"/><div><strong>Science Revision</strong><span>Today · 5:00 PM</span></div><span className="tag">30 min</span></div><label>New subject<input value={subject} onChange={e=>setSubject(e.target.value)}/></label><label>Study time<input value={time} onChange={e=>setTime(e.target.value)}/></label><button className="primary-button" onClick={()=>showNotice(`Demo timetable entry: ${subject} at ${time}. Connect the timetable API to save.`)}><CalendarDays size={17}/> Add to Timetable</button></div></section>; }
function RemindersPage({ showNotice }) { const [task,setTask]=useState(""); return <section className="content-grid one-column"><div className="panel form-panel"><PanelTitle title="Reminders & Alarms" subtitle="Create a reminder for your next learning task."/><div className="schedule-item"><span className="schedule-dot gold-dot"/><div><strong>Review Science notes</strong><span>Today · 6:00 PM</span></div><span className="tag gold-tag">Upcoming</span></div><label>Reminder title<input value={task} onChange={e=>setTask(e.target.value)} placeholder="e.g. Complete English homework"/></label><button className="primary-button" disabled={!task.trim()} onClick={()=>showNotice(`Reminder preview created: ${task}. Browser notifications and backend scheduling are not connected yet.`)}><Bell size={17}/> Create Reminder</button></div></section>; }

function PanelTitle({title,subtitle}) { return <div className="panel-title"><div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div><button className="dots" aria-label="More options">•••</button></div>; }
function Stat({value,label}) { return <div className="stat"><strong>{value}</strong><span>{label}</span></div>; }
function TeacherStat({icon:Icon,value,label,tone}) { return <div className="teacher-stat"><div className={`teacher-stat-icon ${tone}`}><Icon size={24}/></div><div><strong>{value}</strong><span>{label}</span></div></div>; }
function Activity({icon:Icon,title,time}) { return <div className="activity-row"><div className="activity-icon"><Icon size={18}/></div><div className="grow"><strong>{title}</strong><span>{time}</span></div></div>; }
function Coupon({title,detail,code}) { return <div className="coupon"><div className="coupon-badge"><Gift size={20}/></div><div className="grow"><strong>{title}</strong><span>{detail}</span><code>{code}</code></div><button className="outline-button" onClick={()=>navigator.clipboard?.writeText(code)}>Copy</button></div>; }
function Resource({icon:Icon,title,detail}) { return <div className="resource-card"><div className="resource-icon"><Icon size={22}/></div><strong>{title}</strong><span>{detail}</span><button className="text-button">Open <ChevronRight size={14}/></button></div>; }

export default App;
import rewardRoutes from "./rewardroutes/rewardRoutes.js";

app.use("/api/rewards", rewardRoutes);