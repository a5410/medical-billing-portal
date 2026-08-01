export default function Timeline({ scenario, compact = false, onSelect, selectedIndex }) {
  return (
    <ol className={compact ? 'timeline compact' : 'timeline'}>
      {scenario.stages.map((stage, index) => {
        const state = stage.completed ? 'complete' : index === scenario.currentStage ? (scenario.actionRequired ? 'action' : 'current') : 'future';
        return (
          <li key={stage.id} className={`${state} ${selectedIndex === index ? 'selected' : ''}`}>
            <button type="button" onClick={() => onSelect?.(index)} disabled={!onSelect}>
              <span className="timeline-dot">{state === 'complete' ? '✓' : index + 1}</span>
              <span className="timeline-copy"><strong>{stage.label}</strong>{!compact && <small>{state === 'complete' ? 'Completed' : state === 'current' ? 'In progress' : state === 'action' ? 'Action needed' : 'Not started'}</small>}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
