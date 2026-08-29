export type RTIStatus =
  | "SUBMITTED"
  | "RECEIVED_BY_NODAL"
  | "FORWARDED_TO_CPIO"
  | "UNDER_PROCESS"
  | "TRANSFERRED"
  | "ACTION_DOC_REQUIRED"
  | "ADDITIONAL_FEE_REQUIRED"
  | "RESPONSE_ISSUED"
  | "DISPOSED_SATISFIED"
  | "FIRST_APPEAL_FILED"
  | "SECOND_APPEAL_CIC";

export interface TimelineEvent {
  stage: string;
  title?: string;
  description?: string;
  desc?: string;
  date: string;
  completed: boolean;
  current?: boolean;
}

export interface CitizenUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  city?: string;
  state: string;
  pincode: string;
  gender?: string;
  isVerified: boolean;
  isBPL: boolean;
  bplCardNo?: string;
}

export interface AdditionalFeeInfo {
  required: boolean;
  pages: number;
  amount: number;
  paid: boolean;
}

export interface ClarificationInfo {
  reason: string;
  uploadedDocName?: string;
}

export interface ResponseOrderInfo {
  summary: string;
  pdfUrl: string;
  orderDate?: string;
}

export interface RTIApplication {
  id: string;
  regNo: string;
  filingDate: string;
  ministry: string;
  department: string;
  publicAuthority?: string;
  nodalOfficerRouting?: string;
  cpioName?: string;
  subject: string;
  queryText: string;
  status: RTIStatus;
  statusLabel: string;
  statutoryWindowDays?: number;
  remainingDays: number;
  expectedDate: string;
  feePaid: number;
  paymentMode?: string;
  paymentRef: string;
  isBPL: boolean;
  bplDocName?: string;
  attachedDocName?: string;
  applicantName: string;
  applicantEmail: string;
  applicantMobile: string;
  applicantAddress: string;
  timeline: TimelineEvent[];
  currentStageText?: string;
  // State specific
  isTransferred?: boolean;
  transferFrom?: string;
  transferTo?: string;
  transferReason?: string;
  docRequested?: boolean;
  clarificationRequest?: ClarificationInfo;
  uploadedClarificationDoc?: string;
  additionalFeeRequired?: AdditionalFeeInfo;
  additionalFeeAmount?: number;
  photocopyPages?: number;
  additionalFeePaid?: boolean;
  isResolvedSatisfied?: boolean;
  appealFiled?: boolean;
  appealRegNo?: string;
  responseSummary?: string;
  responseDocUrl?: string;
  responseOrder?: ResponseOrderInfo;
}

export interface FirstAppeal {
  id: string;
  appealRegNo: string;
  originalRtiRegNo: string;
  filingDate: string;
  ministry: string;
  publicAuthority: string;
  appellateAuthority: string;
  groundsOfAppeal: string;
  appealDetails: string;
  status: "SUBMITTED" | "HEARING_SCHEDULED" | "ORDER_PASSED";
  statusLabel: string;
  orderSummary?: string;
  attachedDocName?: string;
  decisionDate?: string;
  decisionOutcome?: "UPHELD" | "DISMISSED" | "PARTIAL";
}

export interface AuthorityItem {
  id: string;
  name: string;
  ministry: string;
  department: string;
  category: string;
  keywords: string[];
  nodalOfficerDesc: string;
  portalUrl?: string;
  commonTopics?: string[];
}

export interface PaymentReconciliationResult {
  transactionId: string;
  bankRef: string;
  amount: number;
  status: "RECONCILED" | "IN_PROGRESS" | "REFUNDED" | "NOT_FOUND";
  statusLabel: string;
  date: string;
  rtiRegNo?: string;
  message: string;
}

export interface StateRTIPortal {
  stateName: string;
  portalName: string;
  url: string;
  notes: string;
}
