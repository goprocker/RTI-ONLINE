export interface StatePortalInfo {
  state: string;
  hasOnlinePortal: boolean;
  portalUrl?: string;
  portalName?: string;
  feeMode: string;
  description: string;
}

export const allIndiaStatePortals: StatePortalInfo[] = [
  // STATES WITH OPERATIONAL ONLINE PORTALS
  {
    state: "Maharashtra",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.maharashtra.gov.in",
    portalName: "Maharashtra RTI Online Portal",
    feeMode: "Online Payment (NetBanking / UPI / Debit Card)",
    description: "Centralized portal for all Maharashtra state departments and collectorates."
  },
  {
    state: "Karnataka",
    hasOnlinePortal: true,
    portalUrl: "https://kic.karnataka.gov.in",
    portalName: "Karnataka Information Commission RTI Portal",
    feeMode: "Online Payment via KII Portal",
    description: "Online filing available for Secretariat departments and district offices."
  },
  {
    state: "Tamil Nadu",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.tn.gov.in",
    portalName: "Tamil Nadu RTI Online Portal",
    feeMode: "Online Payment (₹10 standard fee)",
    description: "State-wide portal for all Tamil Nadu state public authorities."
  },
  {
    state: "Delhi (NCT)",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.delhi.gov.in",
    portalName: "Delhi RTI Online Portal",
    feeMode: "Online Payment via Payment Gateway",
    description: "Covers Delhi Government departments, autonomous bodies, and municipal corporations."
  },
  {
    state: "Uttar Pradesh",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.up.gov.in",
    portalName: "Uttar Pradesh RTI Online Portal",
    feeMode: "Online Payment (UPI / NetBanking)",
    description: "Comprehensive portal for UP Secretariat and regional district authorities."
  },
  {
    state: "Rajasthan",
    hasOnlinePortal: true,
    portalUrl: "https://rti.rajasthan.gov.in",
    portalName: "Rajasthan RTI Portal",
    feeMode: "e-Mitra / Online Gateway",
    description: "State RTI portal integrated with Rajasthan e-Mitra payment system."
  },
  {
    state: "Kerala",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.kerala.gov.in",
    portalName: "Kerala RTI Online Portal",
    feeMode: "e-Treasury / Online Payment",
    description: "Online filing across Kerala state administrative departments."
  },
  {
    state: "Bihar",
    hasOnlinePortal: true,
    portalUrl: "http://jaankari.bihar.gov.in",
    portalName: "Jaankari Bihar RTI Facilitation",
    feeMode: "Phone-in / e-Payment / IPO",
    description: "Bihar state RTI facilitation center and portal."
  },
  {
    state: "Odisha",
    hasOnlinePortal: true,
    portalUrl: "https://rtiodisha.gov.in",
    portalName: "RTI Central Monitoring Mechanism Odisha",
    feeMode: "Odisha Treasury Online Gateway",
    description: "Online RTI tracking and submission across Odisha state departments."
  },
  {
    state: "Gujarat",
    hasOnlinePortal: true,
    portalUrl: "https://rti.gujarat.gov.in",
    portalName: "Gujarat RTI Portal",
    feeMode: "Cyber Treasury Gujarat",
    description: "Portal for Gujarat state secretariat and municipal departments."
  },
  {
    state: "Haryana",
    hasOnlinePortal: true,
    portalUrl: "https://rtiharyana.gov.in",
    portalName: "Haryana RTI Online Portal",
    feeMode: "Online Gateway (₹10 fee)",
    description: "Filing and tracking across Haryana public authorities."
  },
  {
    state: "Himachal Pradesh",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.hp.gov.in",
    portalName: "Himachal Pradesh RTI Online Portal",
    feeMode: "Himkosh Online Gateway",
    description: "State portal for HP government offices."
  },
  {
    state: "Madhya Pradesh",
    hasOnlinePortal: true,
    portalUrl: "http://rtionline.mp.gov.in",
    portalName: "MP RTI Online Portal",
    feeMode: "MP Online Gateway",
    description: "State portal across Madhya Pradesh departments."
  },
  {
    state: "West Bengal",
    hasOnlinePortal: true,
    portalUrl: "https://wbic.gov.in",
    portalName: "West Bengal Information Commission",
    feeMode: "GRIPS e-Challan / Court Fee",
    description: "Online resources and departmental RTI directory for West Bengal."
  },
  {
    state: "Telangana",
    hasOnlinePortal: true,
    portalUrl: "https://tsic.gov.in",
    portalName: "Telangana Information Commission Portal",
    feeMode: "Online Treasury Payment",
    description: "State commission portal and public authority directory."
  },
  {
    state: "Andhra Pradesh",
    hasOnlinePortal: true,
    portalUrl: "https://apic.gov.in",
    portalName: "Andhra Pradesh Information Commission",
    feeMode: "CFMS Online Payment",
    description: "State portal for Andhra Pradesh government bodies."
  },
  {
    state: "Punjab",
    hasOnlinePortal: true,
    portalUrl: "https://infocommpunjab.com",
    portalName: "Punjab State Information Commission",
    feeMode: "Treasury Challan / Postal Order",
    description: "Online guidance and physical submission directory for Punjab."
  },

  // STATES & UTs WITHOUT CENTRALIZED ONLINE PORTAL (REQUIRES OFFLINE SECTION 6(1) FILING)
  {
    state: "Goa",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order (IPO) / Court Fee Stamp",
    description: "Goa state departments currently accept physical applications under Section 6(1) with IPO or Court Fee Stamp."
  },
  {
    state: "Assam",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order (IPO) / Treasury Challan",
    description: "Physical submission to concerned SPIO with ₹10 Indian Postal Order or Court Fee Stamp."
  },
  {
    state: "Jharkhand",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order / Non-Judicial Stamp",
    description: "Physical submission to State Public Information Officer (SPIO)."
  },
  {
    state: "Chhattisgarh",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order / Cash at Counter",
    description: "Physical application submitted directly to the concerned departmental SPIO."
  },
  {
    state: "Uttarakhand",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order / Treasury Challan",
    description: "Physical application per Uttarakhand RTI Rules 2013."
  },
  {
    state: "Arunachal Pradesh",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order (IPO) of ₹10",
    description: "Physical submission to PIO at District Headquarters or Itanagar Secretariat."
  },
  {
    state: "Manipur",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order / Court Fee Stamp",
    description: "Physical filing with concerned Departmental SPIO."
  },
  {
    state: "Meghalaya",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order / Treasury Challan",
    description: "Physical filing with SPIO in Shillong or District offices."
  },
  {
    state: "Mizoram",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order (IPO)",
    description: "Physical submission to Mizoram State PIO."
  },
  {
    state: "Nagaland",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order / Treasury Receipt",
    description: "Physical submission to Kohima Secretariat or district PIO."
  },
  {
    state: "Sikkim",
    hasOnlinePortal: false,
    feeMode: "Bank Receipt / Indian Postal Order",
    description: "Physical submission under Sikkim RTI Rules."
  },
  {
    state: "Tripura",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order / Court Fee Stamp",
    description: "Physical submission to Tripura State PIO."
  },
  {
    state: "Jammu and Kashmir",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order / Court Fee Stamp",
    description: "Physical submission to UT Department PIO."
  },
  {
    state: "Ladakh",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order (IPO)",
    description: "Physical submission to Deputy Commissioner or UT PIO."
  },
  {
    state: "Puducherry",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order / Cash at Counter",
    description: "Physical submission to Departmental SPIO in Puducherry / Karaikal."
  },
  {
    state: "Chandigarh",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order / Court Fee Stamp",
    description: "Physical submission to UT Administration PIO."
  },
  {
    state: "Andaman and Nicobar Islands",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order (IPO)",
    description: "Physical submission to Port Blair Secretariat or DC Office."
  },
  {
    state: "Dadra and Nagar Haveli and Daman and Diu",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order (IPO)",
    description: "Physical submission to UT Collectorate PIO."
  },
  {
    state: "Lakshadweep",
    hasOnlinePortal: false,
    feeMode: "Indian Postal Order (IPO)",
    description: "Physical submission to Administrator Office, Kavaratti."
  }
];
