import { StateRTIPortal } from "../types/rti";

export interface StatePortalItem extends StateRTIPortal {
  hasOnlinePortal?: boolean;
  portalUrl?: string;
}

export const stateRTIPortals: StatePortalItem[] = [
  {
    stateName: "Maharashtra",
    portalName: "RTI Online Maharashtra (rti.maharashtra.gov.in)",
    url: "https://rtionline.maharashtra.gov.in",
    notes: "For Mumbai Police, BMC, Revenue Dept, MHADA, State Transport.",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.maharashtra.gov.in"
  },
  {
    stateName: "Delhi (NCT)",
    portalName: "e-RTI Portal Government of NCT of Delhi",
    url: "https://rtionline.delhi.gov.in",
    notes: "For Delhi Jal Board, MCD, DDA (State wings), Directorate of Education.",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.delhi.gov.in"
  },
  {
    stateName: "Tamil Nadu",
    portalName: "Tamil Nadu RTI Online (rtionline.tn.gov.in)",
    url: "https://rtionline.tn.gov.in",
    notes: "For TN Police, Greater Chennai Corporation, TNEB, Registration Dept.",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.tn.gov.in"
  },
  {
    stateName: "Karnataka",
    portalName: "RTI Online Karnataka / Mahiti Kanaja",
    url: "https://rtionline.karnataka.gov.in",
    notes: "For BBMP, Bengaluru Police, Bescom, BDA, Tahsildar offices.",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.karnataka.gov.in"
  },
  {
    stateName: "Uttar Pradesh",
    portalName: "RTI Online Uttar Pradesh (rtionline.up.gov.in)",
    url: "https://rtionline.up.gov.in",
    notes: "For UP Police, Noida Authority, Nagar Nigam, Basic Shiksha Parishad.",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.up.gov.in"
  },
  {
    stateName: "Kerala",
    portalName: "State RTI Portal Kerala",
    url: "https://rti.kerala.gov.in",
    notes: "For Kerala State Police, KSEB, KSRTC, Local Self Government Dept.",
    hasOnlinePortal: true,
    portalUrl: "https://rti.kerala.gov.in"
  },
  {
    stateName: "Rajasthan",
    portalName: "RTI Online Rajasthan",
    url: "https://rtionline.rajasthan.gov.in",
    notes: "For Rajasthan Police, Jaipur Development Authority, RIICO.",
    hasOnlinePortal: true,
    portalUrl: "https://rtionline.rajasthan.gov.in"
  },
  {
    stateName: "West Bengal",
    portalName: "West Bengal State RTI Portal",
    url: "https://wb.gov.in",
    notes: "For Kolkata Municipal Corporation, WB Police, WBSEDCL.",
    hasOnlinePortal: false,
    portalUrl: "https://wb.gov.in"
  }
];

export const stateRtiPortalsDatabase = stateRTIPortals;
