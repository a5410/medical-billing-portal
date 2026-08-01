import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Timeline from '../components/Timeline';
import { episode } from '../data/portalData';

export default function EpisodePage({ scenario }) {
  const [selected, setSelected] = useState(scenario.currentStage);
  useEffect(() => setSelected(scenario.currentStage), [scenario]);
  const stage = scenario.stages[selected];
  return <>
    <PageHeader eyebrow={`Episode ${episode.id}`} title={episode.title} description={`${episode.serviceDate} · ${episode.provider} · ${episode.location}`} />
    <div className="two-column episode-layout">
      <section className="panel"><h2>Episode timeline</h2><p>Select a stage to see what is happening behind the scenes.</p><Timeline scenario={scenario} onSelect={setSelected} selectedIndex={selected} /></section>
      <aside className="panel sticky-detail">
        <span className="eyebrow">Selected stage</span><h2>{stage.label}</h2><span className={`state-pill ${selected < scenario.currentStage || stage.completed ? 'complete' : selected === scenario.currentStage ? (scenario.actionRequired ? 'action' : 'current') : 'future'}`}>{stage.completed ? 'Completed' : selected === scenario.currentStage ? (scenario.actionRequired ? 'Action needed' : 'In progress') : 'Not started'}</span>
        <div className="detail-block"><h3>What you see</h3><p>{stage.patientText}</p></div>
        <div className="detail-block"><h3>What is happening behind the scenes</h3><p>{stage.detail}</p></div>
        <div className="detail-block"><h3>Responsible team</h3><p>{stage.owner}</p></div>
        <div className="detail-block"><h3>Your next step</h3><p>{stage.action}</p></div>
        {stage.id === 'charges' && scenario.missingProviders.length > 0 && <div className="provider-progress"><h3>Charge collection</h3><div className="progress-row"><span>Facility</span><strong>Received</strong></div><div className="progress-row"><span>Surgeon</span><strong>Received</strong></div><div className="progress-row"><span>Imaging & laboratory</span><strong>Received</strong></div>{scenario.missingProviders.map(provider => <div className="progress-row waiting" key={provider}><span>{provider}</span><strong>Waiting</strong></div>)}</div>}
      </aside>
    </div>
  </>;
}
