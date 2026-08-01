import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Timeline from '../components/Timeline';
import MoneySummary, { money } from '../components/MoneySummary';
import { bill, documents, episode, messages, patient } from '../data/portalData';

export default function DashboardPage({ scenario }) {
  return <>
    <PageHeader title={`Welcome, ${patient.name.split(' ')[0]}`} description="Here is the latest information about your care and billing." />
    <section className="episode-hero panel">
      <div className="episode-icon">◒</div>
      <div className="episode-main"><span className="eyebrow">Current episode</span><h2>{episode.title}</h2><p>{episode.serviceDate} · {episode.provider}</p></div>
      <div className="episode-status"><span className="status-label">Current status</span><strong>{scenario.stages[scenario.currentStage].label}</strong><p>{scenario.description}</p><Link className="primary-button" to="/episode">View episode</Link></div>
    </section>

    <section className="panel"><div className="section-heading"><div><h2>Billing progress</h2><p>Follow your care episode from scheduling through the final consolidated bill.</p></div><Link to="/episode">View details</Link></div><Timeline scenario={scenario} compact /></section>

    <div className="dashboard-grid">
      <section className="panel highlight-card"><span className="eyebrow">Estimated patient responsibility</span><strong className="large-money">{money(bill.patientResponsibility)}</strong><p>This is an estimate until insurance processing and all provider charges are complete.</p><Link to="/billing">View cost details</Link></section>
      <section className="panel"><div className="section-heading"><h2>Recent messages</h2><Link to="/messages">View all</Link></div>{messages.slice(0,2).map(message => <div className="mini-row" key={message.id}><span className="row-icon">✉</span><span><strong>{message.subject}</strong><small>{message.date}</small></span></div>)}</section>
      <section className="panel"><div className="section-heading"><h2>Documents</h2><Link to="/documents">View all</Link></div>{documents.slice(0,2).map(doc => <div className="mini-row" key={doc.id}><span className="row-icon">▤</span><span><strong>{doc.name}</strong><small>{doc.date}</small></span></div>)}</section>
    </div>
    <section className="panel dashboard-bill"><div><h2>Preliminary consolidated bill</h2><p>See how related facility and professional charges are grouped into one episode.</p><Link className="secondary-button" to="/billing">Explore the bill</Link></div><MoneySummary condensed /></section>
  </>;
}
