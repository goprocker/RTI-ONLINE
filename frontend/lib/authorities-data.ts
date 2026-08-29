import { AuthorityItem } from "../types/rti";
export type { AuthorityItem };

export interface PublicAuthority extends AuthorityItem {
  commonTopics: string[];
}

export const centralAuthorities: AuthorityItem[] = [
  {
    id: "dopt",
    name: "Department of Personnel & Training (DoPT)",
    ministry: "Ministry of Personnel, Public Grievances and Pensions",
    department: "Department of Personnel and Training",
    category: "Civil Services, Rules & Administration",
    keywords: ["dopt", "service rules", "ias", "ips", "recruitment rules", "central secretariat", "promotion", "seniority", "conduct rules"],
    nodalOfficerDesc: "RTI Nodal Officer, North Block, New Delhi. Routes requests across Estt, AIS, and Vigilance divisions."
  },
  {
    id: "mea-passport",
    name: "Consular, Passport & Visa (CPV) Division",
    ministry: "Ministry of External Affairs",
    department: "Department of External Affairs",
    category: "Passports, Visas & Consular",
    keywords: ["passport", "tatkaal", "rpo", "visa", "embassy", "consular", "passport delay", "police verification passport", "passport renewal"],
    nodalOfficerDesc: "RTI Cell, CPV Division, Patiala House Annex, New Delhi. Applications routed to Regional Passport Offices (RPOs)."
  },
  {
    id: "epfo",
    name: "Employees' Provident Fund Organisation (EPFO)",
    ministry: "Ministry of Labour and Employment",
    department: "Employees Provident Fund Organisation",
    category: "Pensions, PF & Social Security",
    keywords: ["epf", "epfo", "provident fund", "pf claim", "uan", "pf transfer", "pension", "eps", "pf withdrawal", "pf delay"],
    nodalOfficerDesc: "Central RTI Nodal Cell, Bhavishya Nidhi Bhawan, New Delhi. Forwards to concerned Regional PF Commissioner (RPFC)."
  },
  {
    id: "cbse",
    name: "Central Board of Secondary Education (CBSE)",
    ministry: "Ministry of Education",
    department: "Department of School Education & Literacy",
    category: "Education & Examinations",
    keywords: ["cbse", "marksheet", "board exam", "10th certificate", "12th certificate", "re-evaluation", "answer sheet copy", "school affiliation"],
    nodalOfficerDesc: "RTI Cell, CBSE Headquarters, Preet Vihar, Delhi. Forwards to Regional Offices (Ajmer, Chennai, Delhi, etc.)."
  },
  {
    id: "railways-rb",
    name: "Railway Board / Ministry of Railways",
    ministry: "Ministry of Railways",
    department: "Railway Board",
    category: "Railways & Transportation",
    keywords: ["railway", "train", "irctc", "ticket refund", "tatkal quota", "railway recruitment", "rrb", "station amenity", "train delay"],
    nodalOfficerDesc: "RTI Nodal Officer, Rail Bhavan, New Delhi. Automatically distributed to respective Zonal Railways & RRBs."
  },
  {
    id: "nhai",
    name: "National Highways Authority of India (NHAI)",
    ministry: "Ministry of Road Transport and Highways",
    department: "National Highways Authority of India",
    category: "Highways, Roads & Infrastructure",
    keywords: ["nhai", "highway", "toll", "fastag", "road construction", "toll plaza fee", "expressway", "land acquisition highway"],
    nodalOfficerDesc: "RTI Cell, NHAI HQ, Dwarka, New Delhi. Dispatched to Project Implementation Units (PIUs)."
  },
  {
    id: "cbdt",
    name: "Central Board of Direct Taxes (CBDT) / Income Tax",
    ministry: "Ministry of Finance",
    department: "Department of Revenue",
    category: "Taxes & Revenue",
    keywords: ["income tax", "tax refund", "pan card", "itr", "cbdt", "tax deduction", "tds refund", "assessment order", "143 notice"],
    nodalOfficerDesc: "RTI Nodal Officer, North Block & Pr. CCIT RTI Cells nationwide."
  },
  {
    id: "upsc",
    name: "Union Public Service Commission (UPSC)",
    ministry: "Union Public Service Commission",
    department: "Apex Body",
    category: "Recruitment & Examinations",
    keywords: ["upsc", "civil services exam", "cse", "nda", "cds", "cut off", "marksheet upsc", "interview marks", "answer key upsc"],
    nodalOfficerDesc: "RTI Cell, Dholpur House, Shahjahan Road, New Delhi."
  },
  {
    id: "mha",
    name: "Ministry of Home Affairs (MHA)",
    ministry: "Ministry of Home Affairs",
    department: "Ministry of Home Affairs",
    category: "Internal Security & Police",
    keywords: ["mha", "home affairs", "citizenship", "fcra", "central armed police", "crpf", "bsf", "cisf", "delhi police", "border security"],
    nodalOfficerDesc: "RTI Nodal Section, North Block, New Delhi."
  },
  {
    id: "rbi",
    name: "Reserve Bank of India (RBI)",
    ministry: "Ministry of Finance",
    department: "Reserve Bank of India",
    category: "Banking & Financial Regulation",
    keywords: ["rbi", "bank", "reserve bank", "banking ombudsman", "currency", "bank fraud policy", "repo rate", "credit score cibil rules"],
    nodalOfficerDesc: "RTI Division, Central Office Building, Shahid Bhagat Singh Marg, Mumbai."
  },
  {
    id: "indiapost",
    name: "Department of Posts (India Post)",
    ministry: "Ministry of Communications",
    department: "Department of Posts",
    category: "Postal & Parcels",
    keywords: ["speed post", "postal", "post office", "tracking post", "post parcel", "postal savings", "mis", "rd post office"],
    nodalOfficerDesc: "RTI Nodal Officer, Dak Bhawan, Sansad Marg, New Delhi."
  },
  {
    id: "aiims-delhi",
    name: "All India Institute of Medical Sciences (AIIMS, New Delhi)",
    ministry: "Ministry of Health and Family Welfare",
    department: "Department of Health & Family Welfare",
    category: "Health & Medical Institutions",
    keywords: ["aiims", "medical", "hospital", "aiims admission", "ini-cet", "health ministry", "opd waiting", "medical records"],
    nodalOfficerDesc: "RTI Cell, AIIMS, Ansari Nagar, New Delhi."
  }
];

export interface SearchMatchResult {
  authority: AuthorityItem;
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

export const centralPublicAuthorities: PublicAuthority[] = centralAuthorities.map((a) => ({
  ...a,
  commonTopics: a.keywords.slice(0, 4).map((k) => k.charAt(0).toUpperCase() + k.slice(1))
}));

