"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CitizenUser, RTIApplication, FirstAppeal, PaymentReconciliationResult } from "../types/rti";

export interface AuthContextType {
  user: CitizenUser | null;
  applications: RTIApplication[];
  appeals: FirstAppeal[];
  login: (data: Partial<CitizenUser>) => void;
  loginWithPassword: (username: string, pass: string) => boolean;
  loginWithOTP: (mobileOrEmail: string, otp: string) => boolean;
  registerCitizen: (data: Omit<CitizenUser, "id" | "isVerified">) => void;
  logout: () => void;
  addApplication: (appData: Partial<RTIApplication>) => RTIApplication;
  submitRTI: (appData: Partial<RTIApplication>) => RTIApplication;
  submitAppeal: (appealData: Partial<FirstAppeal>) => FirstAppeal;
  reconcilePayment: (txRef: string, emailOrMobile: string) => PaymentReconciliationResult;
  getApplicationByRegNo: (regNo: string) => RTIApplication | undefined;
  payAdditionalFee: (appId: string, amount?: number) => void;
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
    currentStageText: "CPIO is retrieving regional passport office dispatch logs and verification records.",
    remainingDays: 21,
    expectedDate: "28 September 2026",
    feePaid: 10,
    paymentRef: "SBI-UPI-884910294",
    isBPL: false,
    applicantName: "Rajesh Sharma",
    applicantEmail: "rajesh.sharma@example.gov.in",
    applicantMobile: "9876543210",
    applicantAddress: "Flat 402, Kaveri Apartments, Indiranagar, Bengaluru - 560038",
    timeline: [
      {
        stage: "Application Submitted",
        date: "29 Aug 2026, 10:30 AM",
        desc: "RTI filed electronically with ₹10 online payment.",
        completed: true
      },
      {
        stage: "Nodal Scrutiny Completed",
        date: "29 Aug 2026, 02:15 PM",
        desc: "Scrutinized and electronically routed to Bangalore Passport Office.",
        completed: true
      },
      {
        stage: "CPIO Processing",
        date: "Expected by 28 Sep 2026",
        desc: "CPIO retrieving official records.",
        completed: false
      }
    ]
  },
  {
    id: "app-2",
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
    currentStageText: "CPIO has requested additional photocopy fee of ₹24 for 12 pages (@ ₹2/page under RTI Rules 2012).",
    remainingDays: 16,
    expectedDate: "14 September 2026",
    feePaid: 10,
    additionalFeeRequired: {
      required: true,
      pages: 12,
      amount: 24,
      paid: false
    },
    paymentRef: "RUPAY-88291048",
    isBPL: false,
    applicantName: "Rajesh Sharma",
    applicantEmail: "rajesh.sharma@example.gov.in",
    applicantMobile: "9876543210",
    applicantAddress: "Flat 402, Kaveri Apartments, Indiranagar, Bengaluru - 560038",
    timeline: [
      {
        stage: "Application Submitted",
        date: "15 Aug 2026",
        desc: "RTI filed online.",
        completed: true
      },
      {
        stage: "Additional Fee Notice",
        date: "28 Aug 2026",
        desc: "CPIO demanded ₹24 for 12 pages.",
        completed: true
      }
    ]
  },
  {
    id: "app-3",
    regNo: "CBSE/R/2026/00881",
    filingDate: "10 August 2026",
    ministry: "Ministry of Education",
    department: "Central Board of Secondary Education (CBSE)",
    subject: "Class 12 Physics evaluation mark-sheet breakdown and examiner comments",
    queryText: "Certified photocopy of answer script and step-wise marking evaluation sheet for Roll No. 12948102.",
    status: "ACTION_DOC_REQUIRED",
    statusLabel: "Action Required: Document Requested",
    currentStageText: "CPIO requests candidate admit card copy to verify roll number ownership.",
    remainingDays: 12,
    expectedDate: "09 September 2026",
    feePaid: 10,
    clarificationRequest: {
      reason: "Please upload candidate admit card / school identity card to verify roll number ownership."
    },
    paymentRef: "PAYTM-99881029",
    isBPL: false,
    applicantName: "Rajesh Sharma",
    applicantEmail: "rajesh.sharma@example.gov.in",
    applicantMobile: "9876543210",
    applicantAddress: "Flat 402, Kaveri Apartments, Indiranagar, Bengaluru - 560038",
    timeline: [
      {
        stage: "Application Submitted",
        date: "10 Aug 2026",
        desc: "RTI request filed with CBSE.",
        completed: true
      },
      {
        stage: "Clarification Requested",
        date: "26 Aug 2026",
        desc: "CPIO requested admit card copy.",
        completed: true
      }
    ]
  },
  {
    id: "app-4",
    regNo: "MEA/R/2026/00741",
    filingDate: "18 July 2026",
    ministry: "Ministry of External Affairs",
    department: "Passport Division",
    subject: "Policy on maximum permissible delay for reissue of tatkaal passports",
    queryText: "Copy of citizen charter and official escalation guidelines applicable when tatkaal passport dispatch exceeds 7 working days.",
    status: "RESPONSE_ISSUED",
    statusLabel: "Response Issued · Available to Download",
    currentStageText: "Official statutory response order issued by CPIO.",
    remainingDays: 0,
    expectedDate: "17 August 2026",
    feePaid: 10,
    paymentRef: "CARD-77381920",
    isBPL: false,
    responseOrder: {
      summary: "CPIO has furnished the official extract of Passport Citizen Charter 2024 and Tatkaal Escalation SOP.",
      pdfUrl: "MEA-RTI-RESP-00741.pdf"
    },
    applicantName: "Rajesh Sharma",
    applicantEmail: "rajesh.sharma@example.gov.in",
    applicantMobile: "9876543210",
    applicantAddress: "Flat 402, Kaveri Apartments, Indiranagar, Bengaluru - 560038",
    timeline: [
      {
        stage: "Application Submitted",
        date: "18 Jul 2026",
        desc: "RTI request filed.",
        completed: true
      },
      {
        stage: "Response Order Issued",
        date: "24 Aug 2026",
        desc: "CPIO issued reply order.",
        completed: true
      }
    ]
  }
];

const initialAppeals: FirstAppeal[] = [];

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

  function login(data: Partial<CitizenUser>) {
    const loggedUser: CitizenUser = {
      ...defaultCitizen,
      ...data,
      isVerified: true
    };
    setUser(loggedUser);
    try {
      localStorage.setItem("rti_citizen_user", JSON.stringify(loggedUser));
    } catch {}
  }

  function loginWithPassword(username: string, pass: string): boolean {
    if (username.trim() && pass.trim()) {
      login({ name: username });
      return true;
    }
    return false;
  }

  function loginWithOTP(mobileOrEmail: string, otp: string): boolean {
    if (mobileOrEmail.trim() && otp.trim()) {
      const isEmail = mobileOrEmail.includes("@");
      login({
        email: isEmail ? mobileOrEmail : defaultCitizen.email,
        mobile: isEmail ? defaultCitizen.mobile : mobileOrEmail
      });
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

  function addApplication(appData: Partial<RTIApplication>): RTIApplication {
    const ministryPrefix = (appData.ministry || "GOI").slice(0, 4).toUpperCase().replace(/[^A-Z]/g, "RTI");
    const randomSeq = Math.floor(10000 + Math.random() * 90000);
    const regNo = appData.regNo || `${ministryPrefix}/R/2026/${randomSeq}`;
    
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString("en-US", { month: "short" })} ${now.getFullYear()}`;
    const expDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const formattedExpDate = `${expDate.getDate()} ${expDate.toLocaleString("en-US", { month: "short" })} ${expDate.getFullYear()}`;

    const newApp: RTIApplication = {
      id: appData.id || `app-${Date.now()}`,
      regNo,
      filingDate: appData.filingDate || formattedDate,
      ministry: appData.ministry || "Ministry of Personnel, Public Grievances and Pensions",
      department: appData.department || "Department of Personnel and Training",
      subject: appData.subject || "RTI Application for public records",
      queryText: appData.queryText || "",
      status: appData.status || "SUBMITTED",
      statusLabel: appData.statusLabel || "Submitted · Awaiting Nodal Assignment",
      remainingDays: appData.remainingDays ?? 30,
      expectedDate: appData.expectedDate || formattedExpDate,
      feePaid: appData.isBPL ? 0 : (appData.feePaid ?? 10),
      paymentRef: appData.paymentRef || (appData.isBPL ? "BPL_EXEMPTION" : `PAY_UPI_${Math.floor(100000 + Math.random() * 900000)}`),
      isBPL: !!appData.isBPL,
      attachedDocName: appData.attachedDocName,
      applicantName: appData.applicantName || user?.name || "Citizen Applicant",
      applicantEmail: appData.applicantEmail || user?.email || "citizen@gov.in",
      applicantMobile: appData.applicantMobile || user?.mobile || "9876543210",
      applicantAddress: appData.applicantAddress || user?.address || "India",
      currentStageText: appData.currentStageText || "File received electronically. Nodal officer will review jurisdiction.",
      timeline: appData.timeline || [
        {
          stage: "Application Submitted",
          date: formattedDate,
          desc: "RTI application filed electronically.",
          completed: true
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

  function submitRTI(appData: Partial<RTIApplication>): RTIApplication {
    return addApplication(appData);
  }

  function submitAppeal(appealData: Partial<FirstAppeal>): FirstAppeal {
    const prefix = (appealData.ministry || "GOI").slice(0, 4).toUpperCase().replace(/[^A-Z]/g, "RTI");
    const randomSeq = Math.floor(100 + Math.random() * 900);
    const appealRegNo = `${prefix}/A/2026/00${randomSeq}`;
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString("en-US", { month: "short" })} ${now.getFullYear()}`;

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

  function payAdditionalFee(appId: string, amount?: number) {
    const fee = amount || 24;
    const updated = applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          additionalFeePaid: true,
          status: "UNDER_PROCESS" as const,
          statusLabel: "Additional Fee Paid · Under Process",
          currentStageText: `Additional photocopy fee of ₹${fee} settled. CPIO preparing certified packet.`
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
          statusLabel: "Document Submitted · Under Process",
          currentStageText: `Uploaded document '${docName}' received by CPIO.`
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

    return {
      transactionId: cleanRef,
      bankRef: `BANK-${cleanRef.slice(-6)}`,
      amount: 10,
      status: "RECONCILED",
      statusLabel: "Payment Reconciled · RTI Registration Restored",
      date: new Date().toLocaleDateString("en-IN"),
      rtiRegNo: `DOPT/R/2026/${Math.floor(50000 + Math.random() * 40000)}`,
      message: `Payment reconciliation successful! Bank transaction ref settled and registration acknowledgement generated.`
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
        login,
        loginWithPassword,
        loginWithOTP,
        registerCitizen,
        logout,
        addApplication,
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
