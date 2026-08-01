const baseStages = [
  { id: 'scheduled', label: 'Scheduled', patientText: 'Your procedure is scheduled.', detail: 'Appointment details, preparation instructions, and location are available.', action: 'Review visit details', owner: 'Scheduling', completed: true },
  { id: 'verified', label: 'Insurance verified', patientText: 'Your insurance coverage has been confirmed.', detail: 'Eligibility, benefits, and deductible information were checked.', action: 'Review insurance', owner: 'Registration', completed: true },
  { id: 'authorization', label: 'Authorization approved', patientText: 'Required insurance approval has been received.', detail: 'Your care team submitted the request and your insurer approved it.', action: 'View authorization', owner: 'Utilization management', completed: true },
  { id: 'care', label: 'Care completed', patientText: 'Your visit and services are complete.', detail: 'Clinical documentation is being finalized by the participating care teams.', action: 'View visit summary', owner: 'Clinical teams', completed: true },
  { id: 'charges', label: 'Charges collected', patientText: 'We are gathering charges from everyone involved in your care.', detail: 'Facility, surgeon, anesthesia, imaging, and laboratory charges are being matched to this episode.', action: 'View collection progress', owner: 'Revenue cycle', completed: false },
  { id: 'claim', label: 'Claim submitted', patientText: 'Your claim will be sent to your insurance company.', detail: 'Professional and facility claims are created after coding and compliance review.', action: 'No action needed', owner: 'Billing', completed: false },
  { id: 'review', label: 'Insurance review', patientText: 'Your insurance company will review the claim.', detail: 'The payer evaluates coverage, medical necessity, and contracted rates.', action: 'No action needed', owner: 'Insurance company', completed: false },
  { id: 'paid', label: 'Insurance payment', patientText: 'Insurance payments and adjustments will be applied.', detail: 'The platform records the insurer payment and calculates your responsibility.', action: 'View explanation of benefits', owner: 'Payment posting', completed: false },
  { id: 'compiled', label: 'Bill compiled', patientText: 'We will combine all related charges into one bill.', detail: 'The platform verifies that all participating departments are included before publication.', action: 'No action needed', owner: 'Billing platform', completed: false },
  { id: 'ready', label: 'Bill ready', patientText: 'Your consolidated bill will be ready to view and pay.', detail: 'You can review the summary, drill into line items, and choose a payment option.', action: 'View and pay', owner: 'Patient portal', completed: false },
];

export const scenarios = {
  normal: {
    name: 'Normal processing',
    description: 'Charges are currently being collected from participating departments.',
    banner: 'No action is required. We will notify you when the claim is submitted.',
    currentStage: 4,
    stages: baseStages,
    missingProviders: ['Anesthesia Associates'],
    actionRequired: false,
    statusTone: 'info',
  },
  authorization: {
    name: 'Authorization delay',
    description: 'Your insurer requested additional clinical information before making a decision.',
    banner: 'Your care team is responding. You may be contacted if a consent form is needed.',
    currentStage: 2,
    stages: baseStages.map((stage, index) => ({
      ...stage,
      completed: index < 2,
      label: index === 2 ? 'Authorization pending' : stage.label,
      patientText: index === 2 ? 'We are waiting for insurance approval.' : stage.patientText,
      detail: index === 2 ? 'The insurer asked for additional records. Your care team submitted them on July 28.' : stage.detail,
      action: index === 2 ? 'View request status' : stage.action,
    })),
    missingProviders: [],
    actionRequired: false,
    statusTone: 'waiting',
  },
  denial: {
    name: 'Insurance denial and appeal',
    description: 'The claim was denied and the care team has initiated an appeal.',
    banner: 'No payment is due while the appeal is under review.',
    currentStage: 6,
    stages: baseStages.map((stage, index) => ({
      ...stage,
      completed: index < 6,
      label: index === 6 ? 'Appeal under review' : stage.label,
      patientText: index === 6 ? 'Your care team is appealing the insurance decision.' : stage.patientText,
      detail: index === 6 ? 'The insurer denied the claim for missing documentation. Corrected records and an appeal were submitted.' : stage.detail,
      action: index === 6 ? 'View appeal update' : stage.action,
    })),
    missingProviders: [],
    actionRequired: false,
    statusTone: 'alert',
  },
  patientAction: {
    name: 'Patient action required',
    description: 'The insurer could not verify the member information on file.',
    banner: 'Please confirm your insurance member ID to prevent a processing delay.',
    currentStage: 1,
    stages: baseStages.map((stage, index) => ({
      ...stage,
      completed: index < 1,
      label: index === 1 ? 'Insurance information needed' : stage.label,
      patientText: index === 1 ? 'We could not verify the insurance information on file.' : stage.patientText,
      detail: index === 1 ? 'The member ID did not match the insurer response. Confirm the card information or contact support.' : stage.detail,
      action: index === 1 ? 'Update insurance information' : stage.action,
    })),
    missingProviders: [],
    actionRequired: true,
    statusTone: 'alert',
  },
};

export const patient = {
  name: 'Jordan Taylor',
  initials: 'JT',
  memberSince: '2024',
};

export const episode = {
  id: 'EP-726384',
  title: 'Outpatient Knee Surgery',
  serviceDate: 'July 17, 2026',
  provider: 'Central Orthopedic Center',
  location: 'North Medical Campus',
  physician: 'Dr. Maya Chen',
};

export const bill = {
  providerCharges: 18742,
  insuranceDiscounts: 9280,
  insurancePaid: 7948,
  patientResponsibility: 1514,
  categories: [
    {
      id: 'facility', name: 'Facility services', patientAmount: 900, originalCharge: 9500, adjustment: 4700, insurancePaid: 3900,
      explanation: 'Operating room, recovery area, nursing support, equipment, and supplies used during your procedure.',
      items: [
        { id: 'operating-room', name: 'Operating room services', plain: 'Use of the operating room, clinical equipment, and support staff.', charge: 6400, adjustment: 3200, paid: 2600, patient: 600, code: '0360' },
        { id: 'recovery', name: 'Post-anesthesia recovery', plain: 'Monitoring and nursing care immediately after your procedure.', charge: 1900, adjustment: 900, paid: 800, patient: 200, code: '0710' },
        { id: 'supplies', name: 'Surgical supplies', plain: 'Single-use supplies and materials needed for the procedure.', charge: 1200, adjustment: 600, paid: 500, patient: 100, code: '0270' },
      ],
    },
    {
      id: 'surgeon', name: 'Surgeon services', patientAmount: 250, originalCharge: 4200, adjustment: 2350, insurancePaid: 1600,
      explanation: 'Professional services provided by your orthopedic surgeon before, during, and after the operation.',
      items: [
        { id: 'surgeon-professional', name: 'Surgeon professional fee', plain: 'Your surgeon’s evaluation, procedure, and routine follow-up care.', charge: 4200, adjustment: 2350, paid: 1600, patient: 250, code: '29881' },
      ],
    },
    {
      id: 'anesthesia', name: 'Anesthesia services', patientAmount: 200, originalCharge: 2100, adjustment: 1150, insurancePaid: 750,
      explanation: 'Anesthesia care and monitoring before, during, and immediately after surgery.',
      items: [
        { id: 'anesthesia-professional', name: 'Anesthesia professional fee', plain: 'The anesthesiologist who managed your comfort and safety throughout the procedure.', charge: 1600, adjustment: 900, paid: 550, patient: 150, code: '00170' },
        { id: 'anesthesia-supplies', name: 'Anesthesia supplies', plain: 'Medications and disposable supplies used to provide anesthesia.', charge: 500, adjustment: 250, paid: 200, patient: 50, code: 'J3490' },
      ],
    },
    {
      id: 'imaging', name: 'Imaging services', patientAmount: 90, originalCharge: 1400, adjustment: 700, insurancePaid: 610,
      explanation: 'Images taken and interpreted to support diagnosis and treatment.',
      items: [
        { id: 'xray', name: 'Knee X-ray and interpretation', plain: 'Images of your knee and the radiologist’s written interpretation.', charge: 1400, adjustment: 700, paid: 610, patient: 90, code: '73562' },
      ],
    },
    {
      id: 'laboratory', name: 'Laboratory services', patientAmount: 74, originalCharge: 742, adjustment: 380, insurancePaid: 288,
      explanation: 'Laboratory testing used to evaluate your condition and readiness for treatment.',
      items: [
        { id: 'blood-panel', name: 'Preoperative blood panel', plain: 'Routine blood tests used to check your health before surgery.', charge: 742, adjustment: 380, paid: 288, patient: 74, code: '80053' },
      ],
    },
    {
      id: 'other', name: 'Other services', patientAmount: 0, originalCharge: 800, adjustment: 0, insurancePaid: 800,
      explanation: 'Additional covered services associated with the episode of care.',
      items: [
        { id: 'care-coordination', name: 'Care coordination services', plain: 'Coordination among participating care teams before and after your procedure.', charge: 800, adjustment: 0, paid: 800, patient: 0, code: 'G9008' },
      ],
    },
  ],
};

export const messages = [
  { id: 1, date: 'July 29, 2026', subject: 'Charges are being compiled', body: 'We have received charges from the facility, surgeon, imaging, and laboratory. We are still waiting for anesthesia charges.', unread: true },
  { id: 2, date: 'July 18, 2026', subject: 'Visit summary available', body: 'Your visit summary and preparation follow-up documents are available.', unread: true },
  { id: 3, date: 'June 2, 2026', subject: 'Authorization approved', body: 'Your insurer approved the requested procedure. No action is required.', unread: false },
];

export const documents = [
  { id: 1, name: 'Visit summary', type: 'Clinical summary', date: 'July 18, 2026' },
  { id: 2, name: 'Insurance authorization', type: 'Insurance document', date: 'June 2, 2026' },
  { id: 3, name: 'Preliminary cost estimate', type: 'Cost document', date: 'June 10, 2026' },
];
