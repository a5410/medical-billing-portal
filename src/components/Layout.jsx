import { NavLink } from 'react-router-dom';
import { patient, scenarios } from '../data/portalData';

const navItems = [
  ['/', 'Dashboard', '⌂'],
  ['/episode', 'My episode', '◎'],
  ['/billing', 'Billing & payments', '$'],
  ['/insurance', 'Insurance', '◇'],
  ['/messages', 'Messages', '✉'],
  ['/documents', 'Documents', '▤'],
  ['/support', 'Help & support', '?'],
];

export default function Layout({ children, scenarioKey, setScenarioKey, scenario }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">+</div>
          <div><strong>ClearBill</strong><span>Health Portal</span></div>
        </div>
        <nav aria-label="Primary navigation">
          {navItems.map(([to, label, icon]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon">{icon}</span>{label}
            </NavLink>
          ))}
        </nav>
        <div className="prototype-note">
          <strong>Demonstration only</strong>
          <span>All names, charges, and records are fictional.</span>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <button className="mobile-brand" type="button" aria-label="Portal home">CB</button>
          <div className="scenario-control">
            <label htmlFor="scenario">Prototype scenario</label>
            <select id="scenario" value={scenarioKey} onChange={(event) => setScenarioKey(event.target.value)}>
              {Object.entries(scenarios).map(([key, value]) => <option value={key} key={key}>{value.name}</option>)}
            </select>
          </div>
          <div className="profile-chip"><span className="avatar">{patient.initials}</span><span><strong>{patient.name}</strong><small>Patient account</small></span></div>
        </header>
        <div className={`scenario-banner ${scenario.statusTone}`}>
          <strong>{scenario.name}:</strong> {scenario.banner}
        </div>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
