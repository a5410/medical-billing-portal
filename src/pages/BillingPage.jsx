import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import MoneySummary, { money } from '../components/MoneySummary';
import { bill, episode } from '../data/portalData';

export default function BillingPage() {
  const { categoryId, itemId } = useParams();
  const category = bill.categories.find(item => item.id === categoryId);
  const lineItem = category?.items.find(item => item.id === itemId);

  if (lineItem) return <>
    <PageHeader eyebrow={category.name} title={lineItem.name} description={`Service date: ${episode.serviceDate}`} actions={<Link className="secondary-button" to={`/billing/${category.id}`}>Back to category</Link>} />
    <div className="two-column">
      <section className="panel"><h2>Line-item detail</h2><div className="money-summary"><div><span>Original charge</span><strong>{money(lineItem.charge)}</strong></div><div><span>Insurance discount</span><strong>−{money(lineItem.adjustment)}</strong></div><div><span>Insurance paid</span><strong>−{money(lineItem.paid)}</strong></div><div className="patient-total"><span>Your responsibility</span><strong>{money(lineItem.patient)}</strong></div></div><div className="plain-language"><span className="info-icon">i</span><div><h3>What is this?</h3><p>{lineItem.plain}</p></div></div></section>
      <aside className="panel"><h2>Service information</h2><dl className="definition-list"><div><dt>Provider</dt><dd>{category.name}</dd></div><div><dt>Billing code</dt><dd>{lineItem.code}</dd></div><div><dt>Episode</dt><dd>{episode.id}</dd></div><div><dt>Status</dt><dd>Included in preliminary bill</dd></div></dl><button className="secondary-button full" type="button">Ask a billing question</button></aside>
    </div>
  </>;

  if (category) return <>
    <PageHeader eyebrow="Consolidated bill" title={category.name} description={category.explanation} actions={<Link className="secondary-button" to="/billing">Back to bill summary</Link>} />
    <div className="two-column">
      <section className="panel"><h2>Category summary</h2><div className="money-summary"><div><span>Total charges</span><strong>{money(category.originalCharge)}</strong></div><div><span>Insurance discounts</span><strong>−{money(category.adjustment)}</strong></div><div><span>Insurance paid</span><strong>−{money(category.insurancePaid)}</strong></div><div className="patient-total"><span>Your responsibility</span><strong>{money(category.patientAmount)}</strong></div></div></section>
      <section className="panel"><h2>Included line items</h2><div className="category-list">{category.items.map(item => <Link className="category-row" to={`/billing/${category.id}/${item.id}`} key={item.id}><span><strong>{item.name}</strong><small>{item.plain}</small></span><span>{money(item.patient)} ›</span></Link>)}</div></section>
    </div>
  </>;

  return <>
    <PageHeader eyebrow={`Episode ${episode.id}`} title="Consolidated bill summary" description="Review one total first, then expand service categories and individual line items." actions={<button className="primary-button" type="button">Payment options</button>} />
    <div className="two-column billing-layout"><section className="panel"><h2>Estimated balance</h2><MoneySummary /><div className="plain-language"><span className="info-icon">i</span><div><h3>Why is this preliminary?</h3><p>The platform is still gathering charges and waiting for insurance processing. Your final balance may change.</p></div></div></section><section className="panel"><h2>View by service category</h2><div className="category-list">{bill.categories.map(category => <Link className="category-row" to={`/billing/${category.id}`} key={category.id}><span><strong>{category.name}</strong><small>{category.explanation}</small></span><span>{money(category.patientAmount)} ›</span></Link>)}</div></section></div>
  </>;
}
