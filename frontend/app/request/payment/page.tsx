import { DemoPage } from "../../../components/demo-page";

export default function PaymentPage() { return <DemoPage eyebrow="PAYMENT" title="Confirm your filing fee." description="This is the secure payment handoff screen. The actual gateway will be integrated with the backend later."><div className="payment-summary"><p>RTI application fee <b>₹10</b></p><p>Request reference <b>RTI-DEMO-2026</b></p></div><button className="primary" type="button">Proceed to payment <span>→</span></button></DemoPage>; }
