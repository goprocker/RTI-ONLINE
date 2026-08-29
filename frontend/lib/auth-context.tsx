"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CitizenUser, RTIApplication, FirstAppeal, PaymentReconciliationResult } from "../types/rti";

interface AuthContextType {
  user: CitizenUser | null;
  applications: RTIApplication[];
  appeals: FirstAppeal[];
  loginWithPassword: (username: string, pass: string) => boolean;
  loginWithOTP: (mobileOrEmail: string, otp: string) => boolean;
  registerCitizen: (data: Omit<CitizenUser, "id" | "isVerified">) => void;
  logout: () => void;
  submitRTI: (appData: Partial<RTIApplication>) => RTIApplication;
  submitAppeal: (appealData: Partial<FirstAppeal>) => FirstAppeal;
  reconcilePayment: (txRef: string, emailOrMobile: string) => PaymentReconciliationResult;
  getApplicationByRegNo: (regNo: string) => RTIApplication | undefined;
  payAdditionalFee: (appId: string, amount: number) => void;
  uploadClarificationDoc: (appId: string, docName: string) => void;
  markSatisfaction: (appId: string, satisfied: boolean) => void;
}

const defaultCitizen: CitizenUser = {
  id: "CITIZEN-9842",
  name: "Rajesh Sharma",
  email: "rajesh.sharma@example.gov.in",
  mobile: "9876543210",
  address: "Flat 402, Kaveri Apartments, 5th Cross, Indiranagar",
  city: "Bengaluru",
  state: "Karnataka",
  pincode: "560038",
  gender: "Male",
  isVerified: true,
  isBPL: false,
};

const initialApplications: RTIApplication[] = [
  {
    id: "app-1",
    regNo: "DOPT/R/2026/04812",
    filingDate: "29 August 2026",
    ministry: "Ministry of External Affairs",
    department: "Passport Division",
    publicAuthority: "Consular, Passport & Visa (CPV) Division",
    nodalOfficerRouting: "RTI Cell, CPV Division, Patiala House Annex, New Delhi",
    cpioName: "Shri A. K. Verma (Deputy Secretary & CPIO)",
    subject: "Passport application processing status & police verification dispatch records",
    queryText: "Please provide the following information regarding Passport Application No. BLR08941029:\n1. Current processing status and physical location of file.\n2. Date on which police verification report was received from Indiranagar Police Station.\n3. Copy of the internal dispatch tracking log.",
    status: "UNDER_PROCESS",
    statusLabel: "Under Processing with CPIO",
    statutoryWindowDays: 30,
    remainingDays: 21,
    expectedDate: "28 September 2026",
    feePaid: 10,
    paymentMode: "UPI (BHIM SBI)",
    paymentRef: "SBI-UPI-884910294",
    isBPL: false,
    applicantName: "Rajesh Sharma",
    applicantEmail: "rajesh.sharma@example.gov.in",
    applicantMobile: "9876543210",
    applicantAddress: "Flat 402, Kaveri Apartments, Indiranagar, Bengaluru - 560038",
    timeline: [
      {
        stage: "SUBMITTED",
        title: "29 AUG · RTI submitted online",
        description: "Application filed electronically with ₹10 online payment.",
        date: "29 Aug 2026, 10:30 AM",
        completed: true
      },
      {
        stage: "RECEIVED_BY_NODAL",
        title: "29 AUG · Received by Ministry RTI Nodal Officer",
        description: "Application scrutinized for jurisdiction and electronically routed.",
        date: "29 Aug 2026, 02:15 PM",
        completed: true
      },
      {
        stage: "FORWARDED_TO_CPIO",
        title: "30 AUG · Forwarded to concerned CPIO",
        description: "Assigned to CPIO, Regional Passport Office, Koramangala, Bengaluru.",
        date: "30 Aug 2026, 11:00 AM",
        completed: true
      },
      {
        stage: "UNDER_PROCESS",
        title: "NOW · Under processing",
        description: "CPIO retrieving official records and drafting statutory response.",
        date: "Expected by 28 Sep 2026 (Typical 30-day statutory window)",
        completed: false,
        current: true
      },
      {
        stage: "RESPONSE_ISSUED",
        title: "Response & Order",
        description: "Final statutory reply to be dispatched electronically.",
        date: "Pending",
        completed: false
      }
    ]
  },
  {
    id: "app-2",
    regNo: "MOF/R/2026/03910",
    filingDate: "22 August 2026",
    ministry: "Ministry of Finance",
    department: "Department of Revenue",
    publicAuthority: "Department of Revenue / GST Council Secretariat",
    nodalOfficerRouting: "RTI Nodal Officer, North Block, New Delhi",
    cpioName: "Smt. Manisha Gupta (Director & CPIO)",
    subject: "State-wise GST compensation cess collection and release records",
    queryText: "Details of total GST compensation cess collected from Karnataka state for Q1 FY 2026-27 and corresponding release schedule.",
    status: "TRANSFERRED",
    statusLabel: "Transferred under Section 6(3)",
    statutoryWindowDays: 35,
    remainingDays: 28,
    expectedDate: "26 September 2026",
    feePaid: 10,
    paymentMode: "Net Banking (SBI)",
    paymentRef: "INB-339102847",
    isBPL: false,
    isTransferred: true,
    transferFrom: "Ministry of Finance (Department of Economic Affairs)",
    transferTo: "Department of Revenue (GST Secretariat)",
    transferReason: "Subject matter pertains to revenue distribution handled by GST Secretariat.",
    applicantName: "Rajesh Sharma",
    applicantEmail: "rajesh.sharma@example.gov.in",
    applicantMobile: "9876543210",
    applicantAddress: "Flat 402, Kaveri Apartments, Indiranagar, Bengaluru - 560038",
    timeline: [
      {
        stage: "SUBMITTED",
        title: "22 AUG · RTI submitted online",
        description: "Initial application filed with Department of Economic Affairs.",
        date: "22 Aug 2026, 03:20 PM",
        completed: true
      },
      {
        stage: "TRANSFERRED",
        title: "25 AUG · Transferred under Sec 6(3)",
        description: "Transferred from Dept of Economic Affairs to Dept of Revenue. No action required from applicant.",
        date: "25 Aug 2026, 12:45 PM",
        completed: true,
        current: true
      },
      {
        stage: "UNDER_PROCESS",
        title: "Assigned to CPIO (GST Secretariat)",
        description: "Under active review with transferred public authority.",
        date: "Expected by 26 Sep 2026",
        completed: false
      }
    ]
  },
  {
    id: "app-3",
    regNo: "MHA/R/2026/01923",
    filingDate: "15 August 2026",
    ministry: "Ministry of Home Affairs",
    department: "Ministry of Home Affairs",
    publicAuthority: "Ministry of Home Affairs (MHA)",
    nodalOfficerRouting: "RTI Nodal Section, North Block, New Delhi",
    cpioName: "Shri S. Ramanathan (Deputy Secretary & CPIO)",
    subject: "Border Area Development Programme (BADP) road connectivity sanctions",
    queryText: "Certified copies of sanction orders and inspection reports for rural border road projects under BADP in financial year 2024-25.",
    status: "ADDITIONAL_FEE_REQUIRED",
    statusLabel: "Action Required: Additional Fee Demanded",
    statutoryWindowDays: 30,
    remainingDays: 16,
    expectedDate: "14 September 2026",
    feePaid: 10,
    additionalFeeRequired: true,
    photocopyPages: 12,
    additionalFeeAmount: 24,
    additionalFeePaid: false,
    paymentMode: "RuPay Debit Card",
    paymentRef: "RUPAY-88291048",
    isBPL: false,
    applicantName: "Rajesh Sharma",
    applicantEmail: "rajesh.sharma@example.gov.in",
    applicantMobile: "9876543210",
    applicantAddress: "Flat 402, Kaveri Apartments, Indiranagar, Bengaluru - 560038",
    timeline: [
      {
        stage: "SUBMITTED",
        title: "15 AUG · Application Submitted",
        description: "RTI filed online.",
        date: "15 Aug 2026, 11:00 AM",
        completed: true
      },
      {
        stage: "FORWARDED_TO_CPIO",
        title: "18 AUG · Assigned to CPIO",
        description: "Forwarded to CPIO (Border Management Section).",
        date: "18 Aug 2026, 04:00 PM",
        completed: true
      },
      {
        stage: "ADDITIONAL_FEE_REQUIRED",
        title: "28 AUG · Additional Fee Demanded by CPIO",
        description: "CPIO requests ₹24 for 12 pages of certified copies (@ ₹2/page under RTI Rules 2012). Statutory clock pauses until fee received.",
        date: "28 Aug 2026, 02:30 PM",
        completed: true,
        current: true
      },
      {
        stage: "RESPONSE_ISSUED",
        title: "Dispatch of Certified Copies",
        description: "Records will be transmitted upon payment confirmation.",
        date: "Pending citizen payment",
        completed: false
      }
    ]
  },
  {
    id: "app-4",
    regNo: "CBSE/R/2026/00881",
    filingDate: "10 August 2026",
    ministry: "Ministry of Education",
    department: "Department of School Education & Literacy",
    publicAuthority: "Central Board of Secondary Education (CBSE)",
    nodalOfficerRouting: "RTI Cell, CBSE HQ, Preet Vihar, Delhi",
    cpioName: "Shri D. K. Sharma (Assistant Secretary & CPIO)",
    subject: "Class 12 Physics evaluation mark-sheet breakdown and examiner comments",
    queryText: "Certified photocopy of answer script and step-wise marking evaluation sheet for Roll No. 12948102 (Class XII Board Examination 2026).",
    status: "ACTION_DOC_REQUIRED",
    statusLabel: "Action Required: Supporting Document Requested",
    statutoryWindowDays: 30,
    remainingDays: 12,
    expectedDate: "09 September 2026",
    feePaid: 10,
    paymentMode: "UPI (Paytm)",
    paymentRef: "PAYTM-99881029",
    isBPL: false,
    docRequested: true,
    docRequestReason: "CPIO requests candidate admit card copy / school identity card to verify roll number ownership.",
    applicantName: "Rajesh Sharma",
    applicantEmail: "rajesh.sharma@example.gov.in",
    applicantMobile: "9876543210",
    applicantAddress: "Flat 402, Kaveri Apartments, Indiranagar, Bengaluru - 560038",
    timeline: [
      {
        stage: "SUBMITTED",
        title: "10 AUG · Application Submitted",
        description: "RTI request filed with CBSE.",
        date: "10 Aug 2026, 09:15 AM",
        completed: true
      },
      {
        stage: "FORWARDED_TO_CPIO",
        title: "12 AUG · Assigned to CBSE Exam Branch CPIO",
        description: "Under scrutiny by CPIO (Secret Cell).",
        date: "12 Aug 2026, 03:30 PM",
        completed: true
      },
      {
        stage: "ACTION_DOC_REQUIRED",
        title: "26 AUG · CPIO requested supporting document",
        description: "Admit card copy requested to establish identity.",
        date: "26 Aug 2026, 01:15 PM",
        completed: true,
        current: true
      },
      {
        stage: "RESPONSE_ISSUED",
        title: "Furnishing of Evaluated Answer Sheet",
        description: "Answer sheet will be prepared upon receipt of identity proof.",
        date: "Pending candidate document upload",
        completed: false
      }
    ]
  },
  {
    id: "app-5",
    regNo: "MEA/R/2026/00741",
    filingDate: "18 July 2026",
    ministry: "Ministry of External Affairs",
    department: "Department of External Affairs",
    publicAuthority: "Consular, Passport & Visa (CPV) Division",
    nodalOfficerRouting: "RTI Cell, CPV Division, Patiala House Annex, New Delhi",
    cpioName: "Shri Vikramaditya (RPO Bangalore CPIO)",
    subject: "Policy on maximum permissible delay for reissue of tatkaal passports",
    queryText: "Copy of citizen charter and official escalation guidelines applicable when tatkaal passport dispatch exceeds 7 working days.",
    status: "RESPONSE_ISSUED",
    statusLabel: "Response Received · Awaiting Citizen Review",
    statutoryWindowDays: 30,
    remainingDays: 0,
    expectedDate: "17 August 2026",
    feePaid: 10,
    paymentMode: "RuPay Debit Card",
    paymentRef: "CARD-77381920",
    isBPL: false,
    applicantName: "Rajesh Sharma",
    applicantEmail: "rajesh.sharma@example.gov.in",
    applicantMobile: "9876543210",
    applicantAddress: "Flat 402, Kaveri Apartments, Indiranagar, Bengaluru - 560038",
    responseSummary: "The CPIO has furnished the official extract of Passport Citizen Charter 2024 and Tatkaal Grievance Escalation SOP via Document MEA-RTI-RESP-00741.pdf.",
    timeline: [
      {
        stage: "SUBMITTED",
        title: "18 JUL · Application Submitted",
        description: "RTI request filed.",
        date: "18 Jul 2026, 09:15 AM",
        completed: true
      },
      {
        stage: "FORWARDED_TO_CPIO",
        title: "20 JUL · Transferred to RPO CPIO",
        description: "Jurisdiction identified and transferred under Sec 6(3).",
        date: "20 Jul 2026, 12:00 PM",
        completed: true
      },
      {
        stage: "RESPONSE_ISSUED",
        title: "24 AUG · Official CPIO Response Furnished",
        description: "CPIO issued reply order on 24 Aug 2026. Document attached.",
        date: "24 Aug 2026, 05:00 PM",
        completed: true,
        current: true
      }
    ]
  }
];

const initialAppeals: FirstAppeal[] = [
  {
    id: "apl-1",
    appealRegNo: "MEA/A/2026/00104",
    originalRtiRegNo: "MEA/R/2026/00741",
    filingDate: "26 August 2026",
    ministry: "Ministry of External Affairs",
    publicAuthority: "Consular, Passport & Visa (CPV) Division",
    appellateAuthority: "Joint Secretary (CPV) & First Appellate Authority, New Delhi",
    groundsOfAppeal: "Incomplete/Vague Information provided by CPIO",
    appealDetails: "The CPIO reply attached the general citizen charter but did not provide the specific standard operating procedure regarding compensation for tatkaal delays.",
    status: "SUBMITTED",
    statusLabel: "First Appeal Under Review with FAA"
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CitizenUser | null>(null);
  const [applications, setApplications] = useState<RTIApplication[]>(initialApplications);
  const [appeals, setAppeals] = useState<FirstAppeal[]>(initialAppeals);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("rti_citizen_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      const storedApps = localStorage.getItem("rti_applications");
      if (storedApps) {
        setApplications(JSON.parse(storedApps));
      }
      const storedAppeals = localStorage.getItem("rti_appeals");
      if (storedAppeals) {
        setAppeals(JSON.parse(storedAppeals));
      }
    } catch {}
  }, []);

  function loginWithPassword(username: string, pass: string): boolean {
    if (username.trim() && pass.trim()) {
      const loggedUser = { ...defaultCitizen, name: username.includes("@") ? username.split("@")[0] : username || defaultCitizen.name };
      setUser(loggedUser);
      try {
        localStorage.setItem("rti_citizen_user", JSON.stringify(loggedUser));
      } catch {}
      return true;
    }
    return false;
  }

  function loginWithOTP(mobileOrEmail: string, otp: string): boolean {
    if (mobileOrEmail.trim() && otp.trim()) {
      const isEmail = mobileOrEmail.includes("@");
      const loggedUser: CitizenUser = {
        ...defaultCitizen,
        email: isEmail ? mobileOrEmail : defaultCitizen.email,
        mobile: isEmail ? defaultCitizen.mobile : mobileOrEmail
      };
      setUser(loggedUser);
      try {
        localStorage.setItem("rti_citizen_user", JSON.stringify(loggedUser));
      } catch {}
      return true;
    }
    return false;
  }

  function registerCitizen(data: Omit<CitizenUser, "id" | "isVerified">) {
    const newUser: CitizenUser = {
      ...data,
      id: `CITIZEN-${Math.floor(1000 + Math.random() * 9000)}`,
      isVerified: true
    };
    setUser(newUser);
    try {
      localStorage.setItem("rti_citizen_user", JSON.stringify(newUser));
    } catch {}
  }

  function logout() {
    setUser(null);
    try {
      localStorage.removeItem("rti_citizen_user");
    } catch {}
  }

  function submitRTI(appData: Partial<RTIApplication>): RTIApplication {
    const ministryPrefix = (appData.ministry || "GOI").slice(0, 4).toUpperCase().replace(/[^A-Z]/g, "RTI");
    const randomSeq = Math.floor(10000 + Math.random() * 90000);
    const regNo = `${ministryPrefix}/R/2026/${randomSeq}`;
    
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString("en-US", { month: "long" })} ${now.getFullYear()}`;
    const expDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const formattedExpDate = `${expDate.getDate()} ${expDate.toLocaleString("en-US", { month: "long" })} ${expDate.getFullYear()}`;

    const newApp: RTIApplication = {
      id: `app-${Date.now()}`,
      regNo,
      filingDate: formattedDate,
      ministry: appData.ministry || "Ministry of Personnel, Public Grievances and Pensions",
      department: appData.department || "Department of Personnel and Training",
      publicAuthority: appData.publicAuthority || "Department of Personnel & Training (DoPT)",
      nodalOfficerRouting: appData.nodalOfficerRouting || "RTI Nodal Officer, Government of India",
      subject: appData.subject || "RTI Application for public records",
      queryText: appData.queryText || "",
      status: "SUBMITTED",
      statusLabel: "Submitted · Awaiting Nodal Scrutiny",
      statutoryWindowDays: 30,
      remainingDays: 30,
      expectedDate: formattedExpDate,
      feePaid: appData.isBPL ? 0 : 10,
      paymentMode: appData.isBPL ? "BPL Exemption (Certificate Attached)" : (appData.paymentMode || "UPI"),
      paymentRef: appData.isBPL ? "BPL-WAIVER-AUTH" : `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      isBPL: !!appData.isBPL,
      bplDocName: appData.bplDocName,
      attachedDocName: appData.attachedDocName,
      applicantName: appData.applicantName || user?.name || "Citizen Applicant",
      applicantEmail: appData.applicantEmail || user?.email || "citizen@gov.in",
      applicantMobile: appData.applicantMobile || user?.mobile || "9876543210",
      applicantAddress: appData.applicantAddress || user?.address || "India",
      timeline: [
        {
          stage: "SUBMITTED",
          title: "Application Submitted Online",
          description: `RTI application filed electronically. Registration Number: ${regNo}`,
          date: `${formattedDate}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          completed: true,
          current: true
        },
        {
          stage: "RECEIVED_BY_NODAL",
          title: "Acknowledgement by RTI Nodal Officer",
          description: "Department Nodal Officer will verify jurisdiction and forward to CPIO.",
          date: "Pending (Within 2 working days)",
          completed: false
        },
        {
          stage: "FORWARDED_TO_CPIO",
          title: "Forwarding to CPIO",
          description: "Nodal officer assigns application to concerned CPIO.",
          date: "Pending",
          completed: false
        },
        {
          stage: "RESPONSE_ISSUED",
          title: "Statutory Response by CPIO",
          description: "Statutory response window: 30 days under Section 7(1) of RTI Act 2005.",
          date: `Expected by ${formattedExpDate}`,
          completed: false
        }
      ]
    };

    const updated = [newApp, ...applications];
    setApplications(updated);
    try {
      localStorage.setItem("rti_applications", JSON.stringify(updated));
    } catch {}

    return newApp;
  }

  function submitAppeal(appealData: Partial<FirstAppeal>): FirstAppeal {
    const prefix = (appealData.ministry || "GOI").slice(0, 4).toUpperCase().replace(/[^A-Z]/g, "RTI");
    const randomSeq = Math.floor(100 + Math.random() * 900);
    const appealRegNo = `${prefix}/A/2026/00${randomSeq}`;
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString("en-US", { month: "long" })} ${now.getFullYear()}`;

    const newAppeal: FirstAppeal = {
      id: `apl-${Date.now()}`,
      appealRegNo,
      originalRtiRegNo: appealData.originalRtiRegNo || "DOPT/R/2026/04812",
      filingDate: formattedDate,
      ministry: appealData.ministry || "Central Ministry",
      publicAuthority: appealData.publicAuthority || "Central Public Authority",
      appellateAuthority: appealData.appellateAuthority || "First Appellate Authority (FAA)",
      groundsOfAppeal: appealData.groundsOfAppeal || "No response received within statutory 30-day window",
      appealDetails: appealData.appealDetails || "",
      status: "SUBMITTED",
      statusLabel: "First Appeal Filed · Awaiting FAA Review",
      attachedDocName: appealData.attachedDocName
    };

    const updatedAppeals = [newAppeal, ...appeals];
    setAppeals(updatedAppeals);

    if (appealData.originalRtiRegNo) {
      const updatedApps = applications.map(app => {
        if (app.regNo === appealData.originalRtiRegNo) {
          return { ...app, appealFiled: true, appealRegNo, status: "FIRST_APPEAL_FILED" as const, statusLabel: `First Appeal Filed (${appealRegNo})` };
        }
        return app;
      });
      setApplications(updatedApps);
      try {
        localStorage.setItem("rti_applications", JSON.stringify(updatedApps));
      } catch {}
    }

    try {
      localStorage.setItem("rti_appeals", JSON.stringify(updatedAppeals));
    } catch {}

    return newAppeal;
  }

  function payAdditionalFee(appId: string, amount: number) {
    const updated = applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          additionalFeePaid: true,
          status: "UNDER_PROCESS" as const,
          statusLabel: "Additional Fee Paid · Under Process",
          timeline: [
            ...app.timeline,
            {
              stage: "FEE_PAID",
              title: "Additional Photocopy Fee Paid",
              description: `₹${amount} paid via UPI. CPIO notified to dispatch certified copies.`,
              date: "Today, Just now",
              completed: true,
              current: true
            }
          ]
        };
      }
      return app;
    });
    setApplications(updated);
    try {
      localStorage.setItem("rti_applications", JSON.stringify(updated));
    } catch {}
  }

  function uploadClarificationDoc(appId: string, docName: string) {
    const updated = applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          uploadedClarificationDoc: docName,
          status: "UNDER_PROCESS" as const,
          statusLabel: "Clarification Document Submitted · Under Process",
          timeline: [
            ...app.timeline,
            {
              stage: "DOC_SUBMITTED",
              title: "Supporting Document Uploaded",
              description: `Uploaded '${docName}'. Transmitted to CPIO.`,
              date: "Today, Just now",
              completed: true,
              current: true
            }
          ]
        };
      }
      return app;
    });
    setApplications(updated);
    try {
      localStorage.setItem("rti_applications", JSON.stringify(updated));
    } catch {}
  }

  function markSatisfaction(appId: string, satisfied: boolean) {
    const updated = applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          isResolvedSatisfied: satisfied,
          status: satisfied ? ("DISPOSED_SATISFIED" as const) : ("RESPONSE_ISSUED" as const),
          statusLabel: satisfied ? "Closed · Citizen Satisfied" : "Response Received · Appeal Pending"
        };
      }
      return app;
    });
    setApplications(updated);
    try {
      localStorage.setItem("rti_applications", JSON.stringify(updated));
    } catch {}
  }

  function reconcilePayment(txRef: string, emailOrMobile: string): PaymentReconciliationResult {
    const cleanRef = txRef.trim().toUpperCase();
    const match = applications.find(a => a.paymentRef.toUpperCase().includes(cleanRef) || a.regNo.toUpperCase().includes(cleanRef));
    if (match) {
      return {
        transactionId: cleanRef,
        bankRef: match.paymentRef,
        amount: match.feePaid,
        status: "RECONCILED",
        statusLabel: "Payment Confirmed & RTI Registration Generated",
        date: match.filingDate,
        rtiRegNo: match.regNo,
        message: `Your payment was successfully settled. RTI Registration Number is ${match.regNo}.`
      };
    }

    if (cleanRef.startsWith("TXN") || cleanRef.startsWith("SBI") || cleanRef.startsWith("INB") || cleanRef.length >= 6) {
      return {
        transactionId: cleanRef,
        bankRef: `BANK-${cleanRef.slice(-6)}`,
        amount: 10,
        status: "RECONCILED",
        statusLabel: "Payment Reconciled · RTI Registration Restored",
        date: "29 August 2026",
        rtiRegNo: `DOPT/R/2026/${Math.floor(50000 + Math.random() * 40000)}`,
        message: `Payment reconciliation successful! Bank transaction ref settled and registration acknowledgement generated.`
      };
    }

    return {
      transactionId: txRef,
      bankRef: "UNKNOWN",
      amount: 0,
      status: "IN_PROGRESS",
      statusLabel: "Reconciliation Under Review with Bank Gateway (24–48 Working Hours)",
      date: new Date().toLocaleDateString("en-IN"),
      message: `The payment reference '${txRef}' is currently in the inter-bank reconciliation cycle. Banking gateways update status within 24–48 working hours.`
    };
  }

  function getApplicationByRegNo(regNo: string): RTIApplication | undefined {
    return applications.find(a => a.regNo.toLowerCase() === regNo.toLowerCase().trim());
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        applications,
        appeals,
        loginWithPassword,
        loginWithOTP,
        registerCitizen,
        logout,
        submitRTI,
        submitAppeal,
        reconcilePayment,
        getApplicationByRegNo,
        payAdditionalFee,
        uploadClarificationDoc,
        markSatisfaction
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
