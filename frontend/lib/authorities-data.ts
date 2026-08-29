import { AuthorityItem } from "../types/rti";

export interface PublicAuthorityRecord extends AuthorityItem {
  commonTopics?: string[];
}

export type { AuthorityItem };

export const centralAuthorities: PublicAuthorityRecord[] = [
  {
    id: "dopt",
    name: "Department of Personnel & Training (DoPT)",
    ministry: "Ministry of Personnel, Public Grievances and Pensions",
    department: "Department of Personnel and Training",
    category: "Civil Services, Rules & Administration",
    keywords: ["dopt", "service rules", "ias", "ips", "recruitment rules", "central secretariat", "promotion", "seniority", "conduct rules"],
    nodalOfficerDesc: "RTI Nodal Officer, North Block, New Delhi. Routes requests across Estt, AIS, and Vigilance divisions.",
    commonTopics: ["Civil services rules", "IAS / IPS cadre", "Recruitment rules", "Central Secretariat seniority"]
  },
  {
    id: "mea-passport",
    name: "Consular, Passport & Visa (CPV) Division",
    ministry: "Ministry of External Affairs",
    department: "Department of External Affairs",
    category: "Passports, Visas & Consular",
    keywords: ["passport", "tatkaal", "rpo", "visa", "embassy", "consular", "passport delay", "police verification passport", "passport renewal"],
    nodalOfficerDesc: "RTI Cell, CPV Division, Patiala House Annex, New Delhi. Applications routed to Regional Passport Offices (RPOs).",
    commonTopics: ["Passport issuance", "Tatkaal processing", "Regional Passport Offices (RPO)", "Police verification logs"]
  },
  {
    id: "epfo",
    name: "Employees' Provident Fund Organisation (EPFO)",
    ministry: "Ministry of Labour and Employment",
    department: "Employees Provident Fund Organisation",
    category: "Pensions, PF & Social Security",
    keywords: ["epf", "epfo", "provident fund", "pf claim", "uan", "pf transfer", "pension", "eps", "pf withdrawal", "pf delay"],
    nodalOfficerDesc: "Central RTI Nodal Cell, Bhavishya Nidhi Bhawan, New Delhi. Forwards to concerned Regional PF Commissioner (RPFC).",
    commonTopics: ["EPF claim status", "UAN transfer", "Pension (EPS-95)", "Member balance settlement"]
  },
  {
    id: "cbse",
    name: "Central Board of Secondary Education (CBSE)",
    ministry: "Ministry of Education",
    department: "Department of School Education & Literacy",
    category: "Education & Examinations",
    keywords: ["cbse", "marksheet", "board exam", "10th certificate", "12th certificate", "re-evaluation", "answer sheet copy", "school affiliation"],
    nodalOfficerDesc: "RTI Cell, CBSE Headquarters, Preet Vihar, Delhi. Forwards to Regional Offices (Ajmer, Chennai, Delhi, etc.).",
    commonTopics: ["Evaluated answer sheet copies", "Marksheet verification", "School affiliation rules", "Re-evaluation status"]
  },
  {
    id: "railways-rb",
    name: "Railway Board / Ministry of Railways",
    ministry: "Ministry of Railways",
    department: "Railway Board",
    category: "Railways & Transportation",
    keywords: ["railway", "train", "irctc", "ticket refund", "tatkal quota", "railway recruitment", "rrb", "station amenity", "train delay"],
    nodalOfficerDesc: "RTI Nodal Officer, Rail Bhavan, New Delhi. Automatically distributed to respective Zonal Railways & RRBs.",
    commonTopics: ["Ticket refund rules", "Tatkal quota allocation", "RRB recruitment logs", "Station amenities expenditure"]
  },
  {
    id: "nhai",
    name: "National Highways Authority of India (NHAI)",
    ministry: "Ministry of Road Transport and Highways",
    department: "National Highways Authority of India",
    category: "Highways, Roads & Infrastructure",
    keywords: ["nhai", "highway", "toll", "fastag", "road construction", "toll plaza fee", "expressway", "land acquisition highway"],
    nodalOfficerDesc: "RTI Cell, NHAI HQ, Dwarka, New Delhi. Dispatched to Project Implementation Units (PIUs).",
    commonTopics: ["National highway tenders", "Toll collection data", "FASTag dispute rules", "Highway land acquisition"]
  },
  {
    id: "cbdt",
    name: "Central Board of Direct Taxes (CBDT) / Income Tax",
    ministry: "Ministry of Finance",
    department: "Department of Revenue",
    category: "Taxes & Revenue",
    keywords: ["income tax", "tax refund", "pan card", "itr", "cbdt", "tax deduction", "tds refund", "assessment order", "143 notice"],
    nodalOfficerDesc: "RTI Nodal Officer, North Block & Pr. CCIT RTI Cells nationwide.",
    commonTopics: ["Income tax refund status", "TDS credit mismatch", "Assessment orders", "PAN database verification"]
  },
  {
    id: "upsc",
    name: "Union Public Service Commission (UPSC)",
    ministry: "Union Public Service Commission",
    department: "Apex Body",
    category: "Recruitment & Examinations",
    keywords: ["upsc", "civil services exam", "cse", "nda", "cds", "cut off", "marksheet upsc", "interview marks", "answer key upsc"],
    nodalOfficerDesc: "RTI Cell, Dholpur House, Shahjahan Road, New Delhi.",
    commonTopics: ["Civil Services cut-off marks", "NDA / CDS answer keys", "Interview evaluation logs", "Recruitment notifications"]
  },
  {
    id: "mha",
    name: "Ministry of Home Affairs (MHA)",
    ministry: "Ministry of Home Affairs",
    department: "Ministry of Home Affairs",
    category: "Internal Security & Police",
    keywords: ["mha", "home affairs", "citizenship", "fcra", "central armed police", "crpf", "bsf", "cisf", "delhi police", "border security"],
    nodalOfficerDesc: "RTI Nodal Section, North Block, New Delhi.",
    commonTopics: ["Citizenship certificate records", "FCRA NGO compliance", "Central Armed Police (CAPF) rules", "Border security schemes"]
  },
  {
    id: "rbi",
    name: "Reserve Bank of India (RBI)",
    ministry: "Ministry of Finance",
    department: "Reserve Bank of India",
    category: "Banking & Financial Regulation",
    keywords: ["rbi", "bank", "reserve bank", "banking ombudsman", "currency", "bank fraud policy", "repo rate", "credit score cibil rules"],
    nodalOfficerDesc: "RTI Division, Central Office Building, Shahid Bhagat Singh Marg, Mumbai.",
    commonTopics: ["Banking Ombudsman orders", "Bank inspection reports", "Credit bureau regulations", "Defaulter list guidelines"]
  },
  {
    id: "indiapost",
    name: "Department of Posts (India Post)",
    ministry: "Ministry of Communications",
    department: "Department of Posts",
    category: "Postal & Parcels",
    keywords: ["speed post", "postal", "post office", "tracking post", "post parcel", "postal savings", "mis", "rd post office"],
    nodalOfficerDesc: "RTI Nodal Officer, Dak Bhawan, Sansad Marg, New Delhi.",
    commonTopics: ["Speed Post tracking logs", "Post Office Savings Bank", "Postal Insurance (PLI)", "Parcel loss compensation"]
  },
  {
    id: "aiims-delhi",
    name: "All India Institute of Medical Sciences (AIIMS, New Delhi)",
    ministry: "Ministry of Health and Family Welfare",
    department: "Department of Health & Family Welfare",
    category: "Health & Medical Institutions",
    keywords: ["aiims", "medical", "hospital", "aiims admission", "ini-cet", "health ministry", "opd waiting", "medical records"],
    nodalOfficerDesc: "RTI Cell, AIIMS, Ansari Nagar, New Delhi.",
    commonTopics: ["Medical entrance (INI-CET) cut-offs", "Hospital procurement tenders", "OPD appointment records"]
  }
];

export const publicAuthoritiesDatabase = centralAuthorities;

export interface SearchMatchResult {
  authority: PublicAuthorityRecord;
  score: number;
  matchedReason: string;
}

export function findMatchingAuthorities(query: string): SearchMatchResult[] {
  if (!query || query.trim().length === 0) {
    return centralAuthorities.map((auth) => ({
      authority: auth,
      score: 0,
      matchedReason: "Central Public Authority"
    }));
  }

  const cleanQuery = query.toLowerCase().trim();
  const queryTokens = cleanQuery.split(/\s+/);

  const results: SearchMatchResult[] = [];

  for (const auth of centralAuthorities) {
    let score = 0;
    const reasons: string[] = [];

    // Exact or partial name match
    if (auth.name.toLowerCase().includes(cleanQuery)) {
      score += 50;
      reasons.push("Matches authority name");
    }

    // Ministry/Department match
    if (auth.ministry.toLowerCase().includes(cleanQuery) || auth.department.toLowerCase().includes(cleanQuery)) {
      score += 40;
      reasons.push("Matches parent Ministry/Department");
    }

    // Keywords match
    for (const kw of auth.keywords) {
      if (cleanQuery.includes(kw) || kw.includes(cleanQuery)) {
        score += 35;
        reasons.push(`Matched topic: "${kw}"`);
        break;
      }
      for (const token of queryTokens) {
        if (token.length > 2 && kw.includes(token)) {
          score += 15;
          reasons.push(`Matched keyword: "${kw}"`);
          break;
        }
      }
    }

    if (score > 0) {
      results.push({
        authority: auth,
        score,
        matchedReason: reasons.slice(0, 2).join(" · ")
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}
