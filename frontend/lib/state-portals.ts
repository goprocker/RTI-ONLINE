export interface StatePortalItem {
  stateName: string;
  hasOnlinePortal: boolean;
  portalUrl?: string;
  portalName?: string;
  notes: string;
  feeAmount: number;
  ipoPayableTo: string;
}

export const allStatesAndUTs: StatePortalItem[] = [
  // ─── STATES WITH AN ACTIVE ONLINE PORTAL ───
  {
    stateName: "Delhi (NCT)",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.delhi.gov.in",
    portalName: "e-RTI Portal Government of NCT of Delhi",
    notes: "For Delhi Jal Board, MCD, DDA (State wings), Directorate of Education.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer, Concerned Department, Delhi"
  },
  {
    stateName: "Himachal Pradesh",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.hp.gov.in",
    portalName: "RTI Online Himachal Pradesh",
    notes: "For HP Police, HPSEB, Revenue Dept, Education Department.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer, Department of Personnel, HP"
  },
  {
    stateName: "Karnataka",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.karnataka.gov.in",
    portalName: "RTI Online Karnataka (Mahiti Kanaja)",
    notes: "For BBMP, Bengaluru Police, Bescom, BDA, Tahsildar offices.",
    feeAmount: 10,
    ipoPayableTo: "Public Information Officer / Accounts Officer"
  },
  {
    stateName: "Kerala",
    hasOnlinePortal: true,
    portalUrl: "https://rti.kerala.gov.in",
    portalName: "State RTI Portal Kerala",
    notes: "For Kerala State Police, KSEB, KSRTC, Local Self Government Dept.",
    feeAmount: 10,
    ipoPayableTo: "State Public Information Officer, Kerala"
  },
  {
    stateName: "Maharashtra",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.maharashtra.gov.in",
    portalName: "RTI Online Maharashtra",
    notes: "For Mumbai Police, BMC, Revenue Dept, MHADA, State Transport.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer, Concerned Department, Maharashtra"
  },
  {
    stateName: "Meghalaya",
    hasOnlinePortal: true,
    portalUrl: "https://megrti.gov.in",
    portalName: "Meghalaya RTI Portal",
    notes: "For Meghalaya Police, PWD, Health & Family Welfare.",
    feeAmount: 10,
    ipoPayableTo: "Public Information Officer, Meghalaya"
  },
  {
    stateName: "Odisha",
    hasOnlinePortal: true,
    portalUrl: "https://rtiodisha.gov.in",
    portalName: "RTI Odisha Central Portal",
    notes: "For Odisha Police, BMC Bhubaneswar, Revenue & Disaster Management.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer, Concerned Department, Odisha"
  },
  {
    stateName: "Puducherry",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.py.gov.in",
    portalName: "RTI Online Puducherry",
    notes: "For Puducherry Police, Electricity Department, Municipalities.",
    feeAmount: 10,
    ipoPayableTo: "Junior Accounts Officer, Puducherry"
  },
  {
    stateName: "Rajasthan",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.rajasthan.gov.in",
    portalName: "RTI Online Rajasthan",
    notes: "For Rajasthan Police, Jaipur Development Authority, RIICO, Discoms.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer, Government of Rajasthan"
  },
  {
    stateName: "Tamil Nadu",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.tn.gov.in",
    portalName: "Tamil Nadu RTI Online",
    notes: "For TN Police, Greater Chennai Corporation, TNEB, Registration Dept.",
    feeAmount: 10,
    ipoPayableTo: "Public Information Officer, Concerned Department, Tamil Nadu"
  },
  {
    stateName: "Uttar Pradesh",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.up.gov.in",
    portalName: "RTI Online Uttar Pradesh",
    notes: "For UP Police, Noida Authority, Nagar Nigam, Basic Shiksha Parishad.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer, Concerned Department, UP"
  },

  // ─── STATES & UNION TERRITORIES REQUIRING OFFLINE / POSTAL SUBMISSION ───
  {
    stateName: "Andaman and Nicobar Islands",
    hasOnlinePortal: false,
    notes: "Requires physical or postal submission with Indian Postal Order (IPO).",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer, Andaman & Nicobar Administration, Port Blair"
  },
  {
    stateName: "Andhra Pradesh",
    hasOnlinePortal: false,
    notes: "Requires physical submission or postal dispatch to the concerned State PIO.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer / Public Information Officer, Andhra Pradesh"
  },
  {
    stateName: "Arunachal Pradesh",
    hasOnlinePortal: false,
    notes: "Requires physical application or registered post with ₹10 IPO/Court Fee Stamp.",
    feeAmount: 10,
    ipoPayableTo: "Public Information Officer, Concerned Directorate, Itanagar"
  },
  {
    stateName: "Assam",
    hasOnlinePortal: false,
    notes: "Requires postal application addressed to the Departmental SPIO with ₹10 IPO.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer / SPIO, Assam Secretariat, Dispur"
  },
  {
    stateName: "Bihar",
    hasOnlinePortal: false,
    notes: "Requires physical postal application under Section 6(1) with ₹10 Court Fee Stamp/IPO.",
    feeAmount: 10,
    ipoPayableTo: "Public Information Officer, Government of Bihar, Patna"
  },
  {
    stateName: "Chandigarh",
    hasOnlinePortal: false,
    notes: "Requires postal application to Chandigarh Administration PIO.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer, Chandigarh Administration"
  },
  {
    stateName: "Chhattisgarh",
    hasOnlinePortal: false,
    notes: "Requires registered post application addressed to State PIO with ₹10 Non-Judicial Stamp/IPO.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer, Government of Chhattisgarh, Raipur"
  },
  {
    stateName: "Dadra and Nagar Haveli and Daman and Diu",
    hasOnlinePortal: false,
    notes: "Requires postal application to Resident Deputy Collector / PIO.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer, UT Administration of DNH & DD"
  },
  {
    stateName: "Goa",
    hasOnlinePortal: false,
    notes: "Requires application on plain paper to Department PIO with ₹10 Court Fee Stamp.",
    feeAmount: 10,
    ipoPayableTo: "Public Information Officer, Government of Goa, Panaji"
  },
  {
    stateName: "Gujarat",
    hasOnlinePortal: false,
    notes: "Requires physical submission or postal dispatch to the concerned Gandhinagar Directorate.",
    feeAmount: 20,
    ipoPayableTo: "Accounts Officer, Concerned Department, Gandhinagar"
  },
  {
    stateName: "Haryana",
    hasOnlinePortal: false,
    notes: "Requires registered postal application with ₹10 Indian Postal Order (IPO) or Treasury Challan.",
    feeAmount: 10,
    ipoPayableTo: "State Public Information Officer, Haryana Civil Secretariat, Chandigarh"
  },
  {
    stateName: "Jammu and Kashmir",
    hasOnlinePortal: false,
    notes: "Requires postal application addressed to the Central / UT PIO with ₹10 IPO.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer, J&K Administration"
  },
  {
    stateName: "Jharkhand",
    hasOnlinePortal: false,
    notes: "Requires physical application addressed to Department SPIO with ₹10 Court Fee Stamp.",
    feeAmount: 10,
    ipoPayableTo: "Public Information Officer, Government of Jharkhand, Ranchi"
  },
  {
    stateName: "Ladakh",
    hasOnlinePortal: false,
    notes: "Requires postal application to the Deputy Commissioner / UT PIO in Leh or Kargil.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer, UT Administration of Ladakh, Leh"
  },
  {
    stateName: "Lakshadweep",
    hasOnlinePortal: false,
    notes: "Requires postal application to the Lakshadweep Administration PIO in Kavaratti.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer, Lakshadweep Administration, Kavaratti"
  },
  {
    stateName: "Madhya Pradesh",
    hasOnlinePortal: false,
    notes: "Requires application to Department SPIO with ₹10 Non-Judicial Stamp or Postal Order.",
    feeAmount: 10,
    ipoPayableTo: "Public Information Officer, Vallabh Bhavan, Bhopal"
  },
  {
    stateName: "Manipur",
    hasOnlinePortal: false,
    notes: "Requires postal application to State PIO with ₹10 Court Fee Stamp.",
    feeAmount: 10,
    ipoPayableTo: "Public Information Officer, Manipur Secretariat, Imphal"
  },
  {
    stateName: "Mizoram",
    hasOnlinePortal: false,
    notes: "Requires postal application to Department SPIO with ₹10 Indian Postal Order.",
    feeAmount: 10,
    ipoPayableTo: "Public Information Officer, Mizoram Secretariat, Aizawl"
  },
  {
    stateName: "Nagaland",
    hasOnlinePortal: false,
    notes: "Requires postal application to Department PIO with ₹10 Treasury Receipt / IPO.",
    feeAmount: 10,
    ipoPayableTo: "Public Information Officer, Nagaland Civil Secretariat, Kohima"
  },
  {
    stateName: "Punjab",
    hasOnlinePortal: false,
    notes: "Requires postal application to Department PIO with ₹10 IPO or Court Fee Stamp.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer, Punjab Civil Secretariat, Chandigarh"
  },
  {
    stateName: "Sikkim",
    hasOnlinePortal: false,
    notes: "Requires postal application to State PIO with ₹10 Bank Receipt / IPO.",
    feeAmount: 10,
    ipoPayableTo: "Public Information Officer, Government of Sikkim, Gangtok"
  },
  {
    stateName: "Telangana",
    hasOnlinePortal: false,
    notes: "Requires postal application addressed to the concerned Department SPIO with ₹10 IPO.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer / State PIO, Telangana Secretariat, Hyderabad"
  },
  {
    stateName: "Tripura",
    hasOnlinePortal: false,
    notes: "Requires postal application with ₹10 Court Fee Stamp or IPO.",
    feeAmount: 10,
    ipoPayableTo: "Public Information Officer, New Secretariat Complex, Agartala"
  },
  {
    stateName: "Uttarakhand",
    hasOnlinePortal: false,
    notes: "Requires postal application addressed to Department SPIO with ₹10 IPO or Treasury Challan.",
    feeAmount: 10,
    ipoPayableTo: "Accounts Officer, Uttarakhand Secretariat, Dehradun"
  },
  {
    stateName: "West Bengal",
    hasOnlinePortal: false,
    notes: "Requires postal application with ₹10 Court Fee Stamp or IPO addressed to Department SPIO.",
    feeAmount: 10,
    ipoPayableTo: "Public Information Officer, Nabanna, Howrah / Kolkata"
  }
];

export const statesWithOnlinePortals = allStatesAndUTs.filter((s) => s.hasOnlinePortal);
export const statesRequiringOfflineFiling = allStatesAndUTs.filter((s) => !s.hasOnlinePortal);

export const stateRTIPortals = allStatesAndUTs;
export const stateRtiPortalsDatabase = allStatesAndUTs;
