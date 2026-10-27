import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Bell, CalendarDays, MessageCircle, UserRound, Building2, Sparkles, ArrowRight, Menu, X, MapPin, Clock3, FileText, ShieldCheck, ChevronLeft, Send, Bookmark, Trophy, Users, GraduationCap, LogOut, LayoutDashboard, Settings, Plus, Edit3, Trash2, CheckCircle2, AlertTriangle, Flag, Upload, ChevronRight, Home as HomeIcon, ClipboardList, UserCog, Database, ShieldAlert, Inbox, Check, Filter, ExternalLink } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './styles.css';

const logo = '/assets/rvce-3d-logo-reference.png';
const logoModel = '/assets/rvce-logo.glb';
const DEMO = 'DEMO DATA — NOT OFFICIAL RVCE INFORMATION';

const initialInfo = [
  { id: 'bonafide', title: 'Bonafide Certificate', category: 'Student Services', place: 'Student Section', room: 'Administrative Block · Ground Floor', description: 'Procedure and documents required to request a bonafide certificate.', tags: ['certificate', 'document', 'student section'], verified: 'Verified', lastVerified: '12 Sep 2026', contact: 'Student Section', hours: '10:00 AM – 4:30 PM' },
  { id: 'cse-office', title: 'CSE Department Office', category: 'Departments', place: 'CSE Block', room: 'CSE Block · Department Office', description: 'Department office location, working hours and contact information.', tags: ['cse', 'office', 'department'], verified: 'Verified', lastVerified: '10 Sep 2026', contact: 'CSE Department Office', hours: '9:30 AM – 4:30 PM' },
  { id: 'hostel', title: 'Hostel Office', category: 'Offices', place: 'Hostel Administration', room: 'Hostel Office', description: 'General hostel assistance, forms and office contact information.', tags: ['hostel', 'office', 'fees'], verified: 'Needs verification', lastVerified: '01 Jul 2026', contact: 'Hostel Administration', hours: '10:00 AM – 5:00 PM' },
  { id: 'library', title: 'Central Library', category: 'Facilities', place: 'Library Building', room: 'Main Library', description: 'Library timings, services, membership and help desk information.', tags: ['library', 'books', 'hours'], verified: 'Verified', lastVerified: '05 Sep 2026', contact: 'Library Help Desk', hours: '8:00 AM – 8:00 PM' },
  { id: 'student-section', title: 'Student Section', category: 'Student Services', place: 'Administrative Block', room: 'Ground Floor', description: 'Academic records, certificates and student administrative support.', tags: ['student section', 'records', 'certificate'], verified: 'Verified', lastVerified: '08 Sep 2026', contact: 'Student Section', hours: '10:00 AM – 4:30 PM' },
  { id: 'exam-section', title: 'Examination Section', category: 'Student Services', place: 'Administrative Block', room: 'First Floor', description: 'Examination forms, academic records and exam-related assistance.', tags: ['exam', 'marks card', 'forms'], verified: 'Verified', lastVerified: '03 Sep 2026', contact: 'Examination Section', hours: '10:00 AM – 4:30 PM' }];
const initialEvents = [
  { id: 'e1', title: 'Campus Tech Workshop', date: '12 Oct 2026', type: 'Workshop', place: 'Demo Venue', desc: 'Hands-on technical workshop. Registration details are demo content.', status: 'Open' },
  { id: 'e2', title: 'Inter-College Hackathon', date: '19 Oct 2026', type: 'Hackathon', place: 'Demo Venue', desc: 'A demo hackathon listing for the RVCE CONNECT interface.', status: 'Open' },
  { id: 'e3', title: 'Student Innovation Showcase', date: '28 Oct 2026', type: 'Competition', place: 'Demo Venue', desc: 'Student projects and innovation showcase — demo listing.', status: 'Upcoming' }];
const initialHackathons = [{ id: 'h1', title: 'RVCE Build Challenge', date: '19 Oct 2026', prize: 'Demo prize', desc: 'Build a campus-focused technology solution with your team.', status: 'Open' }, { id: 'h2', title: 'AI for Campus Hack', date: '02 Nov 2026', prize: 'Demo prize', desc: 'Explore practical AI ideas for campus services.', status: 'Upcoming' }];
const initialActivities = [{ id: 'a1', title: 'Technical Workshop', points: 5, desc: 'Activity-point entry shown for demonstration.' }, { id: 'a2', title: 'Hackathon Participation', points: 10, desc: 'Activity-point entry shown for demonstration.' }, { id: 'a3', title: 'Club Activity', points: 3, desc: 'Activity-point entry shown for demonstration.' }];
const departments = [{ id: 'cse', name: 'Computer Science & Engineering', short: 'CSE', head: 'Demo Department Head', location: 'CSE Block' }, { id: 'ise', name: 'Information Science & Engineering', short: 'ISE', head: 'Demo Department Head', location: 'ISE Block' }, { id: 'ece', name: 'Electronics & Communication Engineering', short: 'ECE', head: 'Demo Department Head', location: 'ECE Block' }, { id: 'me', name: 'Mechanical Engineering', short: 'ME', head: 'Demo Department Head', location: 'Mechanical Block' }];
const offices = [{ id: 'student', name: 'Student Section', location: 'Administrative Block', services: 'Certificates, records, student requests' }, { id: 'exam', name: 'Examination Section', location: 'Administrative Block', services: 'Examination and academic records' }, { id: 'hostel', name: 'Hostel Office', location: 'Hostel Administration', services: 'Hostel assistance, forms and support' }, { id: 'library', name: 'Central Library', location: 'Library Building', services: 'Books, membership, reading rooms' }];

function useLocalState(key, initial) { const [v, setV] = useState(() => { try { return JSON.parse(localStorage.getItem(key)) ?? initial } catch { return initial } }); useEffect(() => localStorage.setItem(key, JSON.stringify(v)), [key, v]); return [v, setV] }

function Logo3D({ small = false }) {
  const host = useRef(null); useEffect(() => {
    const el = host.current; if (!el) return; const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100); camera.position.set(0, 0, 6.5); camera.lookAt(0, 0, 0); const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' }); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.5; renderer.setClearColor(0, 0); el.appendChild(renderer.domElement); scene.add(new THREE.AmbientLight(0xffffff, 2.5)); const key = new THREE.DirectionalLight(0xffffff, 4.5); key.position.set(3, 4, 6); scene.add(key); const fill = new THREE.DirectionalLight(0xcfe0ff, 3); fill.position.set(-3, 1, 4); scene.add(fill); const rim = new THREE.DirectionalLight(0xffffff, 3); rim.position.set(0, -2, -4); scene.add(rim); let model = null;
    let disposed = false;

    const loader = new GLTFLoader();

    loader.load(
      logoModel,
      (gltf) => {
        if (disposed) return;

        model = gltf.scene;

        model.traverse((o) => {
          if (!o.isMesh) return;

          o.material = new THREE.MeshPhysicalMaterial({
            //         color: 0xA8A8A8,
            //   metalness: 0.85,
            //   roughness: 0.18
            color: small ? 0xC8C8C8 : 0x9FA3A7,
            metalness: 0.89,
            roughness: 0.12
          });
        });

        // model.updateMatrixWorld(true);

        // const box = new THREE.Box3().setFromObject(model);
        // const center = box.getCenter(new THREE.Vector3());
        // const size = box.getSize(new THREE.Vector3());

        // model.position.set(0, 0, 0);

        // model.scale.set(0.55, 0.55, 0.55);

        // scene.add(model);
        //   model.position.set(0, 0, 0);

        if (small) {
          model.position.set(-0.7, 0.5, 0);
          model.scale.set(0.04, 0.04, 0.09);
        } else {
          model.position.set(-0.4, 1, 0);
          model.scale.set(0.035, 0.035, 0.05);
        }

        scene.add(model);
      },
      undefined,
      (e) => console.error('RVCE GLB load failed', e)
    );

    const resize = () => {
      const w = Math.max(1, el.clientWidth);
      const h = Math.max(1, el.clientHeight);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h, false);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(el);

    resize(); let raf; const clock = new THREE.Clock(); const animate = () => {
      raf = requestAnimationFrame(animate); if (model) {
        model.rotation.y += small ? 0.02 : 0.016;
      } renderer.render(scene, camera)
    }; animate(); return () => { disposed = true; cancelAnimationFrame(raf); ro.disconnect(); if (model) model.traverse(o => { if (o.isMesh) { o.geometry?.dispose(); if (Array.isArray(o.material)) o.material.forEach(m => m.dispose()); else o.material?.dispose() } }); renderer.dispose(); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement) }
  }, [small]); return <div ref={host} className={`logo3d ${small ? 'small' : ''}`} />
}

function Splash({ onDone }) { const [p, setP] = useState(0); useEffect(() => { const s = performance.now(); let f; const t = n => { const x = Math.min(100, (n - s) / 10000 * 100); setP(x); if (x < 100) f = requestAnimationFrame(t); else setTimeout(onDone, 200) }; f = requestAnimationFrame(t); return () => cancelAnimationFrame(f) }, [onDone]); return <div className="splash"><div className="grid-bg" /><div className="splash-center"><Logo3D /><div className="brand-big">RVCE <b>CONNECT</b></div><div className="tagline">YOUR CAMPUS. ONE PLACE.</div></div><div className="splash-progress"><div style={{ width: `${p}%` }} /></div><div className="splash-copy">INITIALIZING CAMPUS CONNECT <b>{Math.round(p)}%</b></div></div> }

function Button({ children, onClick, variant = 'primary', icon: Icon }) { return <button className={`btn ${variant}`} onClick={onClick}>{Icon && <Icon size={16} />} {children}</button> }
function PageTitle({ eyebrow, title, sub, onBack }) { return <div className="page-title">{onBack && <button className="back" onClick={onBack}><ChevronLeft size={16} />Back</button>}<span>{eyebrow}</span><h1>{title}</h1>{sub && <p>{sub}</p>}</div> }
function Badge({ children, type = 'blue' }) { return <span className={`badge ${type}`}>{children}</span> }
function Stat({ label, value, icon: Icon }) { return <div className="stat-card">{Icon && <Icon size={19} />}<div><span>{label}</span><strong>{value}</strong></div></div> }

function Home({ query, setQuery, search, navigate }) { return <><section className="hero"><div className="hero-orb a" /><div className="hero-orb b" /><div className="hero-copy"><Badge type="purple">✦ DIGITAL CAMPUS ASSISTANT</Badge><h1>Everything you need<br /><span>about your campus.</span></h1><p>Find the right office, person, procedure, document, event or help — from one intelligent search.</p><form className="searchbox" onSubmit={search}><Search size={21} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Try “bonafide certificate”, “CSE office” or “hackathons”…" /><kbd>Ctrl K</kbd><button>Search</button></form><div className="quick"><small>Quick access</small><button onClick={() => setQuery('Bonafide Certificate')}>Bonafide</button><button onClick={() => setQuery('Student Section')}>Student Section</button><button onClick={() => navigate('/hackathons')}>Hackathons</button><button onClick={() => navigate('/activity-points')}>Activity Points</button></div></div></section><section className="content"><div className="section-head"><div><span className="label">CAMPUS NOW</span><h2>What’s happening</h2></div><button className="text-btn" onClick={() => navigate('/events')}>View all <ArrowRight size={16} /></button></div><div className="feature-grid"><Feature icon={CalendarDays} label="UPCOMING" title="Events, workshops & competitions" text="Discover campus events and never miss a registration deadline." onClick={() => navigate('/events')} /><Feature icon={Building2} label="INFORMATION" title="Find the right place" text="Office locations, hours, responsible people and procedures." onClick={() => navigate('/offices')} /><Feature icon={MessageCircle} label="ASSISTANCE" title="Ask someone who knows" text="Connect with verified information providers and campus admins." onClick={() => navigate('/messages')} /></div><div className="home-lower"><div className="panel"><div className="panel-head"><h3>Popular information</h3><button onClick={() => navigate('/search')}>Explore</button></div>{initialInfo.slice(0, 4).map(x => <button className="list-row" key={x.id} onClick={() => navigate('/information/' + x.id)}><div className="row-icon"><FileText size={17} /></div><div><b>{x.title}</b><small>{x.category} · {x.place}</small></div><ChevronRight size={17} /></button>)}</div><div className="panel accent-panel"><span className="label">FOR STUDENTS</span><h3>Need campus assistance?</h3><p>Search first. If the answer is missing or outdated, report it or message an authorized provider.</p><Button icon={MessageCircle} onClick={() => navigate('/messages')}>Open messages</Button></div></div></section></> }
function Feature({ icon: Icon, label, title, text, onClick }) { return <button className="feature-card" onClick={onClick}><div className="feature-icon"><Icon /></div><span>{label}</span><h3>{title}</h3><p>{text}</p><b>Explore <ArrowRight size={15} /></b></button> }

function SearchPage({ query, setQuery, onSearch, onOpen, onBack }) { const results = useMemo(() => { const q = (query || '').toLowerCase().trim(); if (!q) return initialInfo; return initialInfo.filter(x => [x.title, x.category, x.place, x.description, ...x.tags].join(' ').toLowerCase().includes(q)) }, [query]); return <div className="page"><PageTitle eyebrow="DISCOVER" title="Search campus information" sub="Search people, departments, offices, procedures, documents and more." onBack={onBack} /><form className="wide-search" onSubmit={onSearch}><Search /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search…" /><button>Search</button></form><div className="result-meta"><span>{results.length} result{results.length !== 1 ? 's' : ''}</span><span>Information status is shown on every record.</span></div><div className="result-list">{results.map(x => <button className="result-card" key={x.id} onClick={() => onOpen('/information/' + x.id)}><div className="result-icon"><FileText /></div><div className="result-body"><div><Badge>{x.category}</Badge> <Badge type={x.verified === 'Verified' ? 'green' : 'yellow'}>{x.verified}</Badge></div><h3>{x.title}</h3><p>{x.description}</p><small><MapPin size={13} />{x.place} · {x.room}</small></div><ArrowRight /></button>)}</div>{!results.length && <div className="empty"><Search /><h3>No matching information</h3><p>Try another keyword or request the information through Messages.</p><Button onClick={() => onOpen('/messages')}>Request information</Button></div>}</div> }

function InformationDetail({ item, onBack, navigate }) { return <div className="page"><PageTitle eyebrow={item.category.toUpperCase()} title={item.title} sub={DEMO} onBack={onBack} /><div className="detail-layout"><div className="detail-main"><div className="verification"><ShieldCheck size={18} /><div><b>{item.verified}</b><span>Last verified: {item.lastVerified} · Verified by authorized demo provider</span></div></div><h2>Overview</h2><p>{item.description}</p><div className="two-col"><InfoBlock icon={MapPin} title="Where" text={`${item.place}\n${item.room}`} /><InfoBlock icon={Clock3} title="Hours" text={item.hours} /><InfoBlock icon={Users} title="Responsible" text={item.contact} /><InfoBlock icon={FileText} title="Documents" text="Required documents would be listed here by the provider." /></div><h2>Procedure</h2><ol className="steps"><li>Check eligibility and required documents.</li><li>Visit the responsible office or use the listed digital process.</li><li>Submit the request and retain acknowledgement.</li><li>Track the request or contact the responsible provider.</li></ol><div className="detail-actions"><Button icon={MessageCircle} onClick={() => navigate('/messages')}>Ask a provider</Button><Button variant="secondary" icon={Flag} onClick={() => navigate('/reports')}>Report outdated information</Button></div></div><aside className="side-card"><span className="label">CAMPUS LOCATION</span><div className="photo-placeholder"><Building2 size={32} /><span>Campus photo placeholder</span></div><h3>{item.place}</h3><p>{item.room}</p><Button variant="secondary" icon={MapPin}>How to reach</Button></aside></div></div> }
function InfoBlock({ icon: Icon, title, text }) { return <div className="info-block"><Icon size={18} /><div><b>{title}</b><p>{text}</p></div></div> }

function EventsPage({ navigate, onBack, items }) { return <div className="page"><PageTitle eyebrow="CAMPUS CALENDAR" title="Events" sub="Events are maintained by authorized information providers." onBack={onBack} /><div className="toolbar"><div><Badge>Upcoming</Badge><Badge type="gray">All categories</Badge></div><Button icon={CalendarDays} onClick={() => navigate('/provider/events')}>Provider view</Button></div><div className="event-grid">{items.map(e => <button className="event-card" key={e.id} onClick={() => navigate('/events/' + e.id)}><div className="date-box"><b>{e.date.split(' ')[0]}</b><span>{e.date.split(' ')[1]?.slice(0, 3)}</span></div><Badge type="purple">{e.type}</Badge><h3>{e.title}</h3><p>{e.desc}</p><small><MapPin size={13} />{e.place}</small><strong>{e.status}<ArrowRight size={15} /></strong></button>)}</div></div> }
// function HackathonsPage({navigate,onBack,items}){return <div className="page">
//   <section className="hackathon-hero">
//     <div className="hackathon-hero-content">
//       <PageTitle
//         eyebrow="BUILD & INNOVATE"
//         title="Hackathons"
//         sub="Dedicated listings for campus and external hackathons."
//         onBack={onBack}
//       />
//     </div>

//     <img
//       className="hackathon-image"
//       src="/backgrounds/hackathon.png"
//       alt=""
//     />
//   </section>

//   <div className="event-grid">
//     {items.map(h=>
//       <button
//         className="event-card"
//         key={h.id}
//         onClick={()=>navigate('/hackathons/'+h.id)}
//       >
//         <div className="big-icon"><Trophy/></div>
//         <Badge type="purple">HACKATHON</Badge>
//         <h3>{h.title}</h3>
//         <p>{h.desc}</p>

//         <div className="card-meta">
//           <span>{h.date}</span>
//           <span>{h.prize}</span>
//         </div>

//         <strong>
//           {h.status}
//           <ArrowRight size={15}/>
//         </strong>
//       </button>
//     )}
//   </div>
// </div>}function ActivitiesPage({onBack,navigate,items}){return <div className="page">
//   <section className="activity-hero">
//     <div className="activity-hero-content">
//       <PageTitle eyebrow="STUDENT RECORDS" title="Activity Points" sub="Rules and point values should always come from an authorized source." onBack={onBack}/>
//     </div>
//     <img className="activity-medal" src="/backgrounds/activity-medal.png" alt=""/>
//   </section>

//   <div className="points-summary">
//     <div><span>Your demo total</span><strong>18</strong><small>points</small></div>
//     <Sparkles size={40}/>
//   </div>

//   <div className="table-card">
//     <div className="table-head">
//       <b>Activity</b><b>Points</b><b>Action</b>
//     </div>
//     {items.map(a=>
//       <div className="table-row" key={a.id}>
//         <span>{a.title}</span>
//         <b>{a.points}</b>
//         <button onClick={()=>navigate('/activity-points/'+a.id)}>
//           View <ArrowRight size={14}/>
//         </button>
//       </div>
//     )}
//   </div>
// </div>}

function ActivitiesPage({onBack,navigate,items}){
  const safeItems = Array.isArray(items) ? items : [];

  const totalPoints = safeItems.reduce(
    (sum, item) => sum + (Number(item?.points) || 0),
    0
  );

  return (
    <div className="page activity-points-page">

      <PageTitle
        eyebrow="STUDENT RECORDS"
        title="Activity Points"
        sub="Rules and point values should always come from an authorized source."
        onBack={onBack}
      />

      <div className="points-summary">
        <div>
          <span>Your demo total</span>
          <strong>{totalPoints}</strong>
          <small>points</small>
        </div>

        <div className="activity-summary-icon">
          <Sparkles size={40}/>
        </div>
      </div>

      <div className="table-card activity-table">

        <div className="table-head">
          <b>Activity</b>
          <b>Points</b>
          <b>Action</b>
        </div>

        {safeItems.length > 0 ? (
          safeItems.map((a,index) => (
            <div
              className="table-row"
              key={a?.id || `activity-${index}`}
            >
              <div>
                <strong>{a?.title || 'Activity'}</strong>
                <small>
                  {a?.desc || 'Activity-point entry shown for demonstration.'}
                </small>
              </div>

              <b>{Number(a?.points) || 0}</b>

              <button
                type="button"
                onClick={() =>
                  navigate('/activity-points/' + (a?.id || ''))
                }
              >
                View <ArrowRight size={14}/>
              </button>
            </div>
          ))
        ) : (
          <div className="activity-empty">
            <Sparkles size={28}/>
            <h3>No activity records</h3>
            <p>No activity-point entries are currently available.</p>
          </div>
        )}

      </div>

    </div>
  );
}


function HackathonsPage({ navigate, onBack, items }) {

  const codeLines = [
    `const hackathon=await build();git commit -m "final";npm run build;01001000;function solve(){return innovation;}git push origin main;DEPLOYMENT_READY;lenge.accepted=true;return success;GitHub.push(repository);branch="main";pullRequest.open();code.review();merge();deploy.production();SYSTEM_READY;`,
    `import AI from "future";AI.generate(solution);while(team.ready){innovate();}npm install creativity;BUILDING_PROJECT;challenge.accepted=true;return success; const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();COMPILATION_Suc`,
    `class Hacker{solve(challenge){return code;}}ACCESS_GRANTED;system.online=true;security.check();MISSION_ACTIVE;01010101;server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();COMPILATION_SUCCESS;innovation;`,
    `server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();HACK`,
    `if(team.ready){startHackathon();}const idea=new Idea();idea.create();idea.test();idea.launch();MISSION_COMPLETE;team.status="READY";server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();level=MAX;hackathon;`,
    `const challenge=new Challenge();challenge.start();team.members++;debug(error);fix(solution);ship(product);WINNING_BUILD=true;launch();server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();start();level=`,
    `npm install react;npm install three;npm install lucide-react;npm run dev;DATABASE_CONNECTED;API_READY;SERVER_ONLINE;server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();innovation.level=MAX;hackathon.start();`,
    `GitHub.push(repository);branch="main";pullRequest.open();code.review();merge();deploy.production();SYSTEM_READY;server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();innovation.level=MAX;hackathon.start();`,
    `01001001010011100100111001001111010101100100000101010100;CODE;BUILD;CREATE;INNOVATE;COMPETE;WIN;server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();git status --short;COMPILING;COMPILATION_SUCCESS;innovatION;`,
    `function createFuture(){idea.generate();prototype.build();product.test();users.feedback();improve();launch();}SUCCESS=true;server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();start();level=MAX;hackathon;`,
    `ACCESS_GRANTED;SECURITY_ACTIVE;FIREWALL_ON;ENCRYPTION_ENABLED;SYSTEM_SECURE;NETWORK_READY;DATA_STREAM_ACTIVE;server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();git status --short;COMPILING;COMPILATION_;`,
    `const team=new Team();team.join();team.build();team.debug();team.compete();team.win();HACKATHON_COMPLETE;server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();git status --short;COMPILING;COMPILATION_SUCCESS;`,
    `React.createElement(App);Three.Scene();Camera.ready();Renderer.start();Animation.play();UI.render();EXPERIENCE_READY;server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();innovation.level=MAX;hackathon.start();`,
    `DEBUG_MODE=true;error.detect();error.fix();tests.run();tests.pass();BUILD_SUCCESS;RELEASE_READY;server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();git status --short;COMPILING;COMPILATION_SUCCESS;innovation;`,
    `while(project.alive){learn();build();fail();improve();repeat();}NEVER_STOP_BUILDING;server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();innovation.level=MAX;hackathon.start();innovation.level=MAX;hackathon.start();`,
    `HACKATHON_MODE=ON;TEAM_READY=TRUE;IDEAS=UNLIMITED;CODE=RUNNING;FUTURE=LOADING;WINNER=UNKNOWN;server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();innovation.level=MAX;hackathon.start();innovation.level=MAX;hack`,
    `const solution=await solve(problem);if(solution){submit(solution);celebrate();}CHALLENGE_SOLVED;server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();innovation.level=MAX;hackathon.start();innovation.level=MAX;`,
    `BUILD;CODE;CREATE;INNOVATE;COMPETE;WIN;BUILD;CODE;CREATE;INNOVATE;COMPETE;WIN;server.listen(3000);const future="BUILD";deploy(project);git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon.start();git status --short;COMPILING;COMPILATION_SUCCESS;innovation.level=MAX;hackathon;`
  ];

  return (
    <div className="page">

      {/* MOVING CODE BACKGROUND */}
      <div className="code-stream" aria-hidden="true">
        <div className="code-bar" />

        {/* <div className="code-wall">
          {codeLines.map((code, index) => (
            <div
              className={`code-line line-${(index % 18) + 1}`}
              key={index}
            >
              <span className="code-number">
                {String((index % 18) + 1).padStart(2, '0')}
              </span>

              <span className="code-text">
                {code}
              </span>
            </div>
          ))}
        </div> */}
        <div className="code-wall">
  {[...codeLines, ...codeLines].map((code, index) => (
    <div
      className={`code-line line-${(index % 18) + 1}`}
      key={index}
    >
      <span className="code-number">
        {String((index % 18) + 1).padStart(2, '0')}
      </span>

      <span className="code-text">
        {code}
      </span>
    </div>
  ))}
</div>
      </div>

      {/* HACKATHON CONTENT */}
      <div className="hackathon-content">

        <section className="hackathon-hero">

          <div className="hackathon-hero-content">
            <PageTitle
              eyebrow="BUILD & INNOVATE"
              title="Hackathons"
              sub="Dedicated listings for campus and external hackathons."
              onBack={onBack}
            />
          </div>

          <img
            className="hackathon-image"
            src="/backgrounds/hackathon.png"
            alt=""
          />

        </section>

        {/* HACKATHON CARDS */}
        <div className="event-grid">

          {items.map(h => (
            <button
              className="event-card"
              key={h.id}
              onClick={() => navigate('/hackathons/' + h.id)}
            >

              <div className="big-icon">
                <Trophy />
              </div>

              <Badge type="purple">
                HACKATHON
              </Badge>

              <h3>
                {h.title}
              </h3>

              <p>
                {h.desc}
              </p>

              <div className="card-meta">
                <span>{h.date}</span>
                <span>{h.prize}</span>
              </div>

              <strong>
                {h.status}
                <ArrowRight size={15} />
              </strong>

            </button>
          ))}

        </div>

      </div>

    </div>
  );
}
   
function Departments({ navigate, onBack }) { return <div className="page"><PageTitle eyebrow="ACADEMICS" title="Departments" sub="Department information, contacts and services." onBack={onBack} /><div className="directory-grid">{departments.map(d => <button className="directory-card" key={d.id} onClick={() => navigate('/departments/' + d.id)}><div className="directory-icon"><GraduationCap /></div><span>{d.short}</span><h3>{d.name}</h3><p>{d.location}</p><small>{d.head}</small><ArrowRight /></button>)}</div></div> }
function Offices({ navigate, onBack }) { return <div className="page"><PageTitle eyebrow="CAMPUS SERVICES" title="Offices" sub="Find the right office, its services and where to go." onBack={onBack} /><div className="directory-grid">{offices.map(o => <button className="directory-card" key={o.id} onClick={() => navigate('/offices/' + o.id)}><div className="directory-icon"><Building2 /></div><span>OFFICE</span><h3>{o.name}</h3><p>{o.location}</p><small>{o.services}</small><ArrowRight /></button>)}</div></div> }

function Messages({ onBack }) { const [text, setText] = useState(''); const [messages, setMessages] = useState([{ from: 'provider', text: 'Hello! How can I help with your campus query?' }, { from: 'admin', text: 'You can also report outdated information from any information page.' }]); const send = e => { e.preventDefault(); if (!text.trim()) return; setMessages(m => [...m, { from: 'me', text }]); setText('') }; return <div className="page"><PageTitle eyebrow="COMMUNICATION" title="Messages" sub="Internal conversations between students, providers and admins." onBack={onBack} /><div className="message-layout"><aside className="conversation-list"><button className="conversation active"><span className="avatar2">IP</span><div><b>Information Provider</b><small>Campus assistance</small></div><Badge>2</Badge></button><button className="conversation"><span className="avatar2">AD</span><div><b>Admin Support</b><small>General support</small></div></button></aside><section className="chat"><div className="chat-head"><span className="avatar2">IP</span><div><b>Information Provider</b><small>Available in demo</small></div></div><div className="chat-body">{messages.map((m, i) => <div className={`bubble ${m.from === 'me' ? 'mine' : ''}`} key={i}>{m.text}</div>)}</div><form className="composer" onSubmit={send}><input value={text} onChange={e => setText(e.target.value)} placeholder="Write a message…" /><button><Send size={17} /></button></form></section></div></div> }
function Reports({ onBack }) { const [reports, setReports] = useState([{ id: 1, title: 'Hostel Office information', status: 'Open', date: '26 Sep 2026' }, { id: 2, title: 'Request: scholarship procedure', status: 'Resolved', date: '20 Sep 2026' }]); return <div className="page"><PageTitle eyebrow="ASSISTANCE" title="Reports & requests" sub="Students can flag outdated information or request missing information." onBack={onBack} /><div className="panel"><div className="panel-head"><h3>Your reports</h3><Button icon={Plus} onClick={() => setReports(r => [{ id: Date.now(), title: 'New information request', status: 'Open', date: 'Today' }, ...r])}>New request</Button></div>{reports.map(r => <div className="report-row" key={r.id}><div><b>{r.title}</b><small>{r.date}</small></div><Badge type={r.status === 'Resolved' ? 'green' : 'yellow'}>{r.status}</Badge></div>)}</div></div> }

function Login({ onLogin, onBack }) {
  const [role, setRole] = useState('student'); const [email, setEmail] = useState(''); const [pass, setPass] = useState(''); const login = e => { e.preventDefault(); onLogin(role) }; return <div className="auth-page"><div className="auth-card"><button className="back" onClick={onBack}><ChevronLeft size={16} />Back</button><div className="auth-logo">
    <Logo3D small />
  </div><Badge type="purple">RVCE CONNECT</Badge><h1>Welcome back</h1><p>Choose your account type to continue.</p><div className="role-tabs">{[['student', 'Student', GraduationCap], ['provider', 'Info Provider / Senior', UserCog], ['admin', 'Admin', ShieldAlert]].map(([id, label, Icon]) => <button className={role === id ? 'active' : ''} key={id} onClick={() => setRole(id)}><Icon size={18} /><span>{label}</span></button>)}</div><form onSubmit={login}><label>Email / ID<input value={email} onChange={e => setEmail(e.target.value)} placeholder={role === 'student' ? 'student@rvce.edu.in' : role === 'provider' ? 'provider@rvce.edu.in' : 'admin@rvce.edu.in'} required /></label><label>Password<input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" required /></label><Button>Login as {role === 'student' ? 'Student' : role === 'provider' ? 'Info Provider' : 'Admin'}</Button></form><div className="demo-credentials"><b>Demo login</b><span>{role === 'student' ? 'student@rvce.edu.in / student123' : role === 'provider' ? 'provider@rvce.edu.in / provider123' : 'admin@rvce.edu.in / admin123'}</span></div></div></div>
}

const studentNav = [['/student/dashboard', 'Dashboard', LayoutDashboard], ['/search', 'Explore', Search], ['/events', 'Events', CalendarDays], ['/hackathons', 'Hackathons', Trophy], ['/activity-points', 'Activity Points', Sparkles], ['/messages', 'Messages', MessageCircle], ['/notifications', 'Notifications', Bell], ['/profile', 'Profile', UserRound]];
const providerNav = [['/provider/dashboard', 'Dashboard', LayoutDashboard], ['/provider/information', 'Information', Database], ['/provider/events', 'Events', CalendarDays], ['/provider/messages', 'Messages', MessageCircle], ['/provider/profile', 'Profile', UserRound]];
const adminNav = [['/admin/dashboard', 'Dashboard', LayoutDashboard], ['/admin/users', 'Users', Users], ['/admin/providers', 'Providers', UserCog], ['/admin/information', 'Information', Database], ['/admin/departments', 'Departments', GraduationCap], ['/admin/offices', 'Offices', Building2], ['/admin/events', 'Events', CalendarDays], ['/admin/hackathons', 'Hackathons', Trophy], ['/admin/activity-points', 'Activity Points', Sparkles], ['/admin/reports', 'Reports', Flag], ['/admin/messages', 'Messages', Inbox], ['/admin/categories', 'Categories', Filter], ['/admin/settings', 'Settings', Settings], ['/admin/audit-logs', 'Audit Logs', ClipboardList]];
function DashboardShell({ role, navigate, path, logout, children, title }) { const nav = role === 'student' ? studentNav : role === 'provider' ? providerNav : adminNav; return <div className={`dashboard-shell role-${role}`}><aside className="dash-sidebar"><button className="dash-brand" onClick={() => navigate('/')}><img src={logo} /><span>RVCE <b>CONNECT</b></span></button><div className="role-label">{role === 'student' ? 'STUDENT' : role === 'provider' ? 'INFO PROVIDER / SENIOR' : 'ADMIN'}</div><nav>{nav.map(([p, label, Icon]) => <button className={path === p ? 'active' : ''} key={p} onClick={() => navigate(p)}><Icon size={17} />{label}</button>)}</nav><button className="logout" onClick={logout}><LogOut size={17} />Logout</button></aside><section className="dash-main"><header className="dash-top"><div><span className="label">{role === 'student' ? 'STUDENT PORTAL' : role === 'provider' ? 'PROVIDER PORTAL' : 'ADMIN CONTROL CENTER'}</span><h2>{title}</h2></div><div className="dash-top-actions"><button onClick={() => navigate('/notifications')}><Bell size={18} /></button><span className="user-pill"><span>{role === 'student' ? 'S' : 'IP'}</span>{role === 'student' ? 'Student' : 'Demo ' + (role === 'provider' ? 'Provider' : 'Admin')}</span></div></header>{children}</section></div> }

// function StudentDashboard({navigate}){return <div className="dashboard-content"><div className="welcome"><div><Badge type="purple">STUDENT</Badge><h1>Good to see you.</h1><p>Your campus information, events, messages and activity record in one place.</p></div><Button icon={Search} onClick={()=>navigate('/search')}>Search campus</Button></div><div className="stats-grid"><Stat label="Saved information" value="4" icon={Bookmark}/><Stat label="Registered events" value="2" icon={CalendarDays}/><Stat label="Activity points" value="18" icon={Sparkles}/><Stat label="Open requests" value="1" icon={Flag}/></div><div className="dashboard-grid"><DashPanel title="Upcoming events" action="View all" onClick={()=>navigate('/events')}>{initialEvents.slice(0,3).map(e=><MiniRow key={e.id} title={e.title} sub={`${e.date} · ${e.type}`} icon={CalendarDays}/>)}</DashPanel><DashPanel title="Recent information" action="Explore" onClick={()=>navigate('/search')}>{initialInfo.slice(0,3).map(x=><MiniRow key={x.id} title={x.title} sub={`${x.category} · ${x.verified}`} icon={FileText}/>)}</DashPanel><DashPanel title="Recent messages" action="Open inbox" onClick={()=>navigate('/messages')}>{['Information Provider · 2 new','Admin Support · 1 reply'].map(x=><MiniRow key={x} title={x} sub="Demo conversation" icon={MessageCircle}/>)}</DashPanel></div></div>}
function StudentDashboard({ navigate }) {
  return (
    <div className="dashboard-content">

      <div className="welcome">
        <div className="welcome-text">
          <Badge type="purple">STUDENT</Badge>
          <h1>Good to see you.</h1>
          <p>Your campus information, events, messages and activity record in one place.</p>
        </div>

        <Button
          icon={Search}
          onClick={() => navigate('/search')}
        >
          Search campus
        </Button>
      </div>

      <div className="stats-grid">
        <Stat label="Saved information" value="4" icon={Bookmark} />
        <Stat label="Registered events" value="2" icon={CalendarDays} />
        <Stat label="Activity points" value="18" icon={Sparkles} />
        <Stat label="Open requests" value="1" icon={Flag} />
      </div>

      <div className="dashboard-grid">
        <DashPanel title="Upcoming events" action="View all" onClick={() => navigate('/events')}>
          {initialEvents.slice(0, 3).map(e =>
            <MiniRow
              key={e.id}
              title={e.title}
              sub={`${e.date} · ${e.type}`}
              icon={CalendarDays}
            />
          )}
        </DashPanel>

        <DashPanel title="Recent information" action="Explore" onClick={() => navigate('/search')}>
          {initialInfo.slice(0, 3).map(x =>
            <MiniRow
              key={x.id}
              title={x.title}
              sub={`${x.category} · ${x.verified}`}
              icon={FileText}
            />
          )}
        </DashPanel>

        <DashPanel title="Recent messages" action="Open inbox" onClick={() => navigate('/messages')}>
          {['Information Provider · 2 new', 'Admin Support · 1 reply'].map(x =>
            <MiniRow
              key={x}
              title={x}
              sub="Demo conversation"
              icon={MessageCircle}
            />
          )}
        </DashPanel>
      </div>

    </div>
  );
}
function DashPanel({ title, action, onClick, children }) { return <div className="dash-panel"><div className="panel-head"><h3>{title}</h3><button onClick={onClick}>{action}</button></div>{children}</div> }
function MiniRow({ title, sub, icon: Icon }) { return <div className="mini-row"><span className="mini-icon"><Icon size={16} /></span><div><b>{title}</b><small>{sub}</small></div><ChevronRight size={15} /></div> }

function ProviderDashboard({ navigate }) { return <div className="dashboard-content"><div className="welcome"><div><Badge type="green">VERIFIED PROVIDER</Badge><h1>Provider workspace.</h1><p>Maintain campus information, respond to students and keep your assigned records current.</p></div><Button icon={Plus} onClick={() => navigate('/provider/information/new')}>Add information</Button></div><div className="stats-grid"><Stat label="Assigned records" value="12" icon={Database} /><Stat label="Needs verification" value="3" icon={AlertTriangle} /><Stat label="Open messages" value="5" icon={MessageCircle} /><Stat label="Active events" value="4" icon={CalendarDays} /></div><div className="dashboard-grid"><DashPanel title="Information needing attention" action="Manage" onClick={() => navigate('/provider/information')}>{initialInfo.filter(x => x.verified !== 'Verified').map(x => <MiniRow key={x.id} title={x.title} sub="Needs verification" icon={AlertTriangle} />)}</DashPanel><DashPanel title="Recent student messages" action="Open inbox" onClick={() => navigate('/provider/messages')}>{['Student · Bonafide question', 'Student · Hostel update', 'Student · Missing form'].map(x => <MiniRow key={x} title={x} sub="Waiting for response" icon={MessageCircle} />)}</DashPanel><DashPanel title="Provider responsibilities" action="Profile" onClick={() => navigate('/provider/profile')}>{['CSE information', 'Student Section procedures', 'Department events'].map(x => <MiniRow key={x} title={x} sub="Assigned scope" icon={ShieldCheck} />)}</DashPanel></div></div> }

function AdminDashboard({ navigate }) { return <div className="dashboard-content"><div className="welcome"><div><Badge type="purple">ADMIN</Badge><h1>Control center.</h1><p>Manage users, providers, campus information, verification, reports and system activity.</p></div><Button icon={Settings} onClick={() => navigate('/admin/settings')}>System settings</Button></div><div className="stats-grid"><Stat label="Students" value="1,248" icon={Users} /><Stat label="Providers" value="38" icon={UserCog} /><Stat label="Information records" value="486" icon={Database} /><Stat label="Pending reports" value="14" icon={Flag} /></div><div className="admin-alert"><AlertTriangle /><div><b>Verification queue</b><p>14 records have reports or are due for verification. Review them before they become outdated.</p></div><Button variant="secondary" onClick={() => navigate('/admin/reports')}>Review queue</Button></div><div className="dashboard-grid"><DashPanel title="System activity" action="Audit logs" onClick={() => navigate('/admin/audit-logs')}>{['Provider updated Student Section', 'Admin approved event listing', 'Student reported Hostel Office'].map(x => <MiniRow key={x} title={x} sub="Today · Demo audit event" icon={ClipboardList} />)}</DashPanel><DashPanel title="Content health" action="Information" onClick={() => navigate('/admin/information')}>{['412 Verified', '51 Needs verification', '23 Outdated'].map((x, i) => <MiniRow key={x} title={x} sub="Current demo metrics" icon={i === 0 ? CheckCircle2 : AlertTriangle} />)}</DashPanel><DashPanel title="User management" action="Providers" onClick={() => navigate('/admin/providers')}>{['38 active providers', '3 expiring soon', '5 pending approval'].map(x => <MiniRow key={x} title={x} sub="Demo user data" icon={UserCog} />)}</DashPanel></div></div> }

function DataTable({ headers, rows }) { return <div className="data-table"><div className="dt-head">{headers.map(h => <b key={h}>{h}</b>)}</div>{rows.map((r, i) => <div className="dt-row" key={i}>{r.map((c, j) => <span key={j}>{c}</span>)}</div>)}</div> }
function ProviderInformation({ navigate, onBack }) { const [items, setItems] = useState(initialInfo); return <div className="dashboard-page"><div className="subhead"><div><span className="label">CONTENT MANAGEMENT</span><h1>My Information</h1><p>Records assigned to this information provider.</p></div><Button icon={Plus} onClick={() => navigate('/provider/information/new')}>Add information</Button></div><div className="filterbar"><Search /><input placeholder="Filter records" /><Badge>12 assigned</Badge></div><div className="data-table"><div className="dt-head"><b>Information</b><b>Category</b><b>Status</b><b>Last verified</b><b>Actions</b></div>{items.map(x => <div className="dt-row" key={x.id}><span><b>{x.title}</b><small>{x.place}</small></span><span>{x.category}</span><span><Badge type={x.verified === 'Verified' ? 'green' : 'yellow'}>{x.verified}</Badge></span><span>{x.lastVerified}</span><span className="actions"><button onClick={() => navigate('/information/' + x.id)}><ExternalLink size={15} /></button><button><Edit3 size={15} /></button></span></div>)}</div></div> }
function ProviderNewInformation({ navigate }) { const [saved, setSaved] = useState(false); return <div className="dashboard-page"><div className="subhead"><div><span className="label">CONTENT MANAGEMENT</span><h1>Add Information</h1><p>Create a record for students to discover.</p></div></div>{saved ? <div className="success-box"><CheckCircle2 /><div><b>Submitted for review</b><p>Your information record was saved and sent to admin approval in this demo.</p></div><Button onClick={() => navigate('/provider/information')}>Back to information</Button></div> : <div className="form-card"><Field label="Title" placeholder="e.g. Scholarship Cell" /><Field label="Category" placeholder="Student Services" /><Field label="Location" placeholder="Building / floor / room" /><Field label="Working hours" placeholder="10:00 AM – 4:30 PM" /><label>Description<textarea placeholder="Describe the service, procedure and relevant context." /></label><label>Required documents<textarea placeholder="List documents, forms and links." /></label><label>Upload photo / PDF<div className="upload-box"><Upload /><span>Drop files here or browse</span></div></label><Button onClick={() => setSaved(true)}>Submit for verification</Button></div>}</div> }
function Field({ label, placeholder }) { return <label>{label}<input placeholder={placeholder} /></label> }
function ProviderEvents({ navigate }) { return <div className="dashboard-page"><div className="subhead"><div><span className="label">CONTENT MANAGEMENT</span><h1>My Events</h1><p>Create, update and verify event listings.</p></div><Button icon={Plus}>Add event</Button></div><DataTable headers={['Event', 'Date', 'Status', 'Actions']} rows={initialEvents.map(e => [<><b>{e.title}</b><small>{e.type}</small></>, e.date, <Badge type="green">{e.status}</Badge>, <span className="actions"><button><Edit3 size={15} /></button><button><Trash2 size={15} /></button></span>])} /></div> }
function ProviderMessages() { return <div className="dashboard-page"><div className="subhead"><div><span className="label">COMMUNICATION</span><h1>Student Messages</h1><p>Respond to campus questions within your assigned scope.</p></div></div><div className="provider-msgs">{['Bonafide certificate question', 'Hostel office update', 'CSE department procedure', 'Missing form request'].map((x, i) => <div className="provider-msg" key={x}><span className="avatar2">S{i + 1}</span><div><b>{x}</b><small>Student · {i + 1} hour ago</small><p>Demo message content awaiting a provider response.</p></div><Button variant="secondary">Reply</Button></div>)}</div></div> }
function ProviderProfile() { return <div className="dashboard-page"><div className="subhead"><div><span className="label">ACCOUNT</span><h1>Provider Profile</h1><p>Access automatically deactivates at graduation or assigned end date.</p></div></div><div className="profile-grid"><div className="profile-big"><div className="profile-avatar">IP</div><h2>Demo Information Provider</h2><p>Senior · CSE · Graduation: 2028</p><Badge type="green">ACTIVE</Badge></div><div className="form-card"><Field label="Student ID" placeholder="RVCE-DEMO-001" /><Field label="Graduation year" placeholder="2028" /><Field label="Access end date" placeholder="31 May 2028" /><Field label="Assigned scope" placeholder="CSE + Student Services" /><Button>Save profile</Button></div></div></div> }

function AdminSection({ type, navigate }) { const configs = { users: ['Users', 'Manage student accounts, access and roles.', ['Student · CSE · 2nd Year', 'Student · ISE · 3rd Year', 'Student · ECE · 1st Year']], providers: ['Providers', 'Approve, assign and deactivate information providers.', ['Demo Provider · CSE · Active', 'Demo Provider · Student Services · Active', 'Pending Provider · ECE · Approval']], information: ['Information', 'Review every information record and verification state.', ['Bonafide Certificate · Verified', 'Hostel Office · Needs verification', 'Scholarship Cell · Outdated']], departments: ['Departments', 'Manage departments, heads and locations.', departments.map(x => x.name)], offices: ['Offices', 'Manage offices, services, rooms and hours.', offices.map(x => x.name)], events: ['Events', 'Approve and manage campus event listings.', initialEvents.map(x => x.title)], hackathons: ['Hackathons', 'Manage hackathon listings and registrations.', initialHackathons.map(x => x.title)], 'activity-points': ['Activity Points', 'Manage activities and authorized point values.', initialActivities.map(x => x.title)], reports: ['Reports', 'Review outdated-information reports and information requests.', ['Hostel Office information', 'Scholarship procedure request', 'Missing examination form']], messages: ['Messages', 'Monitor support conversations and escalations.', ['Student ↔ Provider', 'Student ↔ Admin', 'Provider ↔ Admin']], categories: ['Categories', 'Manage information categories and taxonomy.', ['Student Services', 'Departments', 'Offices', 'Facilities']], settings: ['Settings', 'Configure verification periods, notifications and system options.', ['Verification period · 90 days', 'Provider auto-expiry · Enabled', 'Student report workflow · Enabled']], 'audit-logs': ['Audit Logs', 'Immutable-style record of administrative and provider actions.', ['Provider updated Student Section', 'Admin approved event', 'Student reported outdated information']] }; const [title, sub, list] = configs[type] || configs.users; return <div className="dashboard-page"><div className="subhead"><div><span className="label">ADMINISTRATION</span><h1>{title}</h1><p>{sub}</p></div>{!['settings', 'audit-logs'].includes(type) && <Button icon={Plus}>Add new</Button>}</div><div className="filterbar"><Search /><input placeholder={`Search ${title.toLowerCase()}…`} /><Badge>{list.length} shown</Badge></div><div className="admin-list">{list.map((x, i) => <div className="admin-item" key={i}><div className="admin-item-icon">{type === 'reports' ? <Flag /> : type === 'providers' ? <UserCog /> : type === 'information' ? <Database /> : type === 'events' ? <CalendarDays /> : type === 'messages' ? <MessageCircle /> : type === 'audit-logs' ? <ClipboardList /> : <Settings />}</div><div><b>{typeof x === 'string' ? x : x.name}</b><small>{type === 'providers' ? 'Assigned scope · Demo data' : type === 'information' ? 'Verification status and provider assignment' : type === 'audit-logs' ? 'Timestamp · actor · action' : `Demo ${title.toLowerCase()} record`}</small></div><div className="item-actions">{type === 'reports' ? <Badge type={i === 1 ? 'green' : 'yellow'}>{i === 1 ? 'Resolved' : 'Open'}</Badge> : type === 'information' ? <Badge type={i === 1 ? 'yellow' : i === 2 ? 'red' : 'green'}>{i === 1 ? 'Needs verification' : i === 2 ? 'Outdated' : 'Verified'}</Badge> : <><button><Edit3 size={15} /></button><button><Trash2 size={15} /></button></>}</div></div>)}</div></div> }

function Notifications({ onBack }) { return <div className="page"><PageTitle eyebrow="UPDATES" title="Notifications" sub="System and campus updates." onBack={onBack} /><div className="notification-list">{['New campus event added', 'Your report was received', 'Activity points entry updated', 'Provider replied to your message'].map((x, i) => <div className="notification" key={x}><Bell /><div><b>{x}</b><p>Demo notification content. Official alerts would be generated by the platform.</p></div><small>{i + 1}h</small></div>)}</div></div> }
function Profile({ onBack, logout }) { return <div className="page"><PageTitle eyebrow="ACCOUNT" title="Profile" sub="Student account." onBack={onBack} /><div className="profile-card"><div className="profile-avatar">S</div><div><h2>RVCE Student</h2><p>CSE · 2nd Year · Demo profile</p></div><Button variant="secondary" icon={LogOut} onClick={logout}>Log out</Button></div><div className="stats-grid"><Stat label="Saved information" value="4" /><Stat label="Registered events" value="2" /><Stat label="Activity points" value="18" /></div></div> }
function DetailGeneric({ title, description, onBack }) { return <div className="page"><PageTitle eyebrow="DETAIL" title={title} sub={DEMO} onBack={onBack} /><div className="detail-main single"><div className="info-block"><FileText /><div><h2>Details</h2><p>{description}</p></div></div><h2>Procedure & contacts</h2><ol className="steps"><li>Check the official information maintained by the authorized provider.</li><li>Follow the listed procedure and required documents.</li><li>Contact the responsible office if clarification is needed.</li></ol></div></div> }

function App() {
  const [intro, setIntro] = useState(() => sessionStorage.getItem('rvce-intro') !== '1'); const [path, setPath] = useState(window.location.pathname || '/'); const [role, setRole] = useLocalState('rvce-role', null); const [query, setQuery] = useState(''); const [events, setEvents] = useLocalState('rvce-events', initialEvents); const [hackathons, setHackathons] = useLocalState('rvce-hackathons', initialHackathons); const [activities, setActivities] = useLocalState('rvce-activities', initialActivities); const [mobile, setMobile] = useState(false); useEffect(() => { const f = () => setPath(window.location.pathname || '/'); window.addEventListener('popstate', f); return () => window.removeEventListener('popstate', f) }, []); const navigate = to => { if (to === path) return; window.history.pushState({}, '', to); setPath(to); setMobile(false); window.scrollTo(0, 0) }; const finish = () => {
    sessionStorage.setItem('rvce-intro', '1');
    setIntro(false);
    navigate('/login');
  }; const logout = () => { setRole(null); navigate('/login') }; const login = r => { setRole(r); navigate(r === 'student' ? '/student/dashboard' : r === 'provider' ? '/provider/dashboard' : '/admin/dashboard') }; const search = e => { e?.preventDefault(); navigate('/search') }; if (intro) return <Splash onDone={finish} />; if (path === '/login') return <Login onLogin={login} onBack={() => navigate('/')} />; if (path.startsWith('/student/') && role === 'student') return <DashboardShell role="student" path={path} navigate={navigate} logout={logout} title={path === '/student/dashboard' ? 'Student Dashboard' : 'Student Portal'}><StudentDashboard navigate={navigate} /></DashboardShell>; if (path.startsWith('/provider/') && role === 'provider') { let body = path === '/provider/dashboard' ? <ProviderDashboard navigate={navigate} /> : path === '/provider/information' ? <ProviderInformation navigate={navigate} /> : path === '/provider/information/new' ? <ProviderNewInformation navigate={navigate} /> : path === '/provider/events' ? <ProviderEvents navigate={navigate} /> : path === '/provider/messages' ? <ProviderMessages /> : <ProviderProfile />; return <DashboardShell role="provider" path={path} navigate={navigate} logout={logout} title="Information Provider"><>{body}</></DashboardShell> } if (path.startsWith('/admin/') && role === 'admin') { const type = path.split('/')[2] || 'dashboard'; const body = type === 'dashboard' ? <AdminDashboard navigate={navigate} /> : <AdminSection type={type} navigate={navigate} />; return <DashboardShell role="admin" path={path} navigate={navigate} logout={logout} title="Admin Control Center">{body}</DashboardShell> }
  if (path.startsWith('/student/') || path.startsWith('/provider/') || path.startsWith('/admin/')) { return <div className="auth-page"><div className="auth-card"><div className="auth-logo"><img src={logo} /></div><h1>Sign in required</h1><p>This area is restricted to the selected member role.</p><Button onClick={() => navigate('/login')}>Go to login</Button></div></div> }
  let content; if (path === '/') content = <Home query={query} setQuery={setQuery} search={search} navigate={navigate} />; else if (path === '/search') content = <SearchPage query={query} setQuery={setQuery} onSearch={search} onOpen={navigate} onBack={() => navigate('/')} />; else if (path.startsWith('/information/')) { const item = initialInfo.find(x => x.id === path.split('/')[2]) || initialInfo[0]; content = <InformationDetail item={item} onBack={() => navigate('/search')} navigate={navigate} />; } else if (path === '/events') content = <EventsPage navigate={navigate} onBack={() => navigate('/')} items={events} />; else if (path.startsWith('/events/')) { const e = events.find(x => x.id === path.split('/')[2]) || events[0]; content = <DetailGeneric title={e.title} description={`${e.desc} Date: ${e.date}. Type: ${e.type}. Venue: ${e.place}. Registration and official details would be maintained by an authorized provider.`} onBack={() => navigate('/events')} />; } else if (path === '/hackathons') content = <HackathonsPage navigate={navigate} onBack={() => navigate('/')} items={hackathons} />; else if (path.startsWith('/hackathons/')) { const h = hackathons.find(x => x.id === path.split('/')[2]) || hackathons[0]; content = <DetailGeneric title={h.title} description={`${h.desc} Date: ${h.date}. ${h.prize}. Official rules, eligibility and registration would be added by an authorized provider.`} onBack={() => navigate('/hackathons')} />; } else if (path === '/activity-points') content = <ActivitiesPage onBack={() => navigate('/')} navigate={navigate} items={activities} />; else if (path.startsWith('/activity-points/')) { const a = activities.find(x => x.id === path.split('/')[2]) || activities[0]; content = <DetailGeneric title={a.title} description={`${a.desc} Demo value: ${a.points} points. Official activity-point criteria should be confirmed from the authorized campus source.`} onBack={() => navigate('/activity-points')} />; } else if (path === '/departments') content = <Departments navigate={navigate} onBack={() => navigate('/')} />; else if (path.startsWith('/departments/')) { const d = departments.find(x => x.id === path.split('/')[2]) || departments[0]; content = <DetailGeneric title={d.name} description={`Department: ${d.short}. Location: ${d.location}. Head: ${d.head}. This is demo directory data.`} onBack={() => navigate('/departments')} />; } else if (path === '/offices') content = <Offices navigate={navigate} onBack={() => navigate('/')} />; else if (path.startsWith('/offices/')) { const o = offices.find(x => x.id === path.split('/')[2]) || offices[0]; content = <DetailGeneric title={o.name} description={`Location: ${o.location}. Services: ${o.services}. Working hours and responsible-person data would be maintained by an authorized provider.`} onBack={() => navigate('/offices')} />; } else if (path === '/messages') content = <Messages onBack={() => navigate('/')} />; else if (path === '/reports') content = <Reports onBack={() => navigate('/')} />; else if (path === '/notifications') content = <Notifications onBack={() => navigate('/')} />; else if (path === '/profile') content = <Profile onBack={() => navigate('/')} logout={logout} />; else content = <Home query={query} setQuery={setQuery} search={search} navigate={navigate} />;
  return <div className="app"><header className="nav"><div className="nav-inner"><button className="brandmark" onClick={() => navigate('/')}><span className="mini-logo">
    <Logo3D small />
  </span><span>RVCE <b>CONNECT</b></span></button><nav><button onClick={() => navigate('/')}>Explore</button><button onClick={() => navigate('/events')}>Events</button><button onClick={() => navigate('/hackathons')}>Hackathons</button><button onClick={() => navigate('/activity-points')}>Activity Points</button><button onClick={() => navigate('/departments')}>Departments</button><button onClick={() => navigate('/offices')}>Offices</button></nav><div className="nav-actions"><button onClick={() => navigate('/notifications')}><Bell size={18} /></button>{role ? <button className="avatar" onClick={() => navigate(role === 'student' ? '/student/dashboard' : role === 'provider' ? '/provider/dashboard' : '/admin/dashboard')}>{role === 'student' ? 'S' : role === 'provider' ? 'IP' : 'A'}</button> : <button className="login-link" onClick={() => navigate('/login')}>Login</button>}<button className="hamb" onClick={() => setMobile(!mobile)}>{mobile ? <X /> : <Menu />}</button></div></div></header>{mobile && <div className="mobile-menu"><button onClick={() => navigate('/')}>Explore</button><button onClick={() => navigate('/events')}>Events</button><button onClick={() => navigate('/hackathons')}>Hackathons</button><button onClick={() => navigate('/activity-points')}>Activity Points</button><button onClick={() => navigate('/departments')}>Departments</button><button onClick={() => navigate('/offices')}>Offices</button><button onClick={() => navigate('/messages')}>Messages</button><button onClick={() => navigate('/login')}>Login</button></div>}<main className={`route-${(path || 'home').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '')}`}>{content}</main><footer><b>RVCE CONNECT</b><span>{DEMO}</span><span>Student · Information Provider · Admin</span></footer></div>
}

createRoot(document.getElementById('root')).render(<App />);
