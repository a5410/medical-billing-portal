import { bill } from '../data/portalData';
export const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function MoneySummary({ condensed = false }) {
  return (
    <div className={condensed ? 'money-summary condensed' : 'money-summary'}>
      <div><span>Total provider charges</span><strong>{money(bill.providerCharges)}</strong></div>
      <div><span>Insurance discounts</span><strong>−{money(bill.insuranceDiscounts)}</strong></div>
      <div><span>Insurance paid</span><strong>−{money(bill.insurancePaid)}</strong></div>
      <div className="patient-total"><span>Your responsibility</span><strong>{money(bill.patientResponsibility)}</strong></div>
    </div>
  );
}
