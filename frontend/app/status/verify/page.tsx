import { DemoPage } from "../../../components/demo-page";

export default function VerifyStatusPage() { return <DemoPage eyebrow="VERIFY ACCESS" title="Enter the OTP." description="To protect request information, we will verify access using a one-time password sent to the contact details on the application."><div className="demo-form"><label htmlFor="otp">One-time password</label><input id="otp" inputMode="numeric" maxLength={6} placeholder="Enter 6-digit OTP" /><button className="primary" type="button">Verify and continue <span>→</span></button></div></DemoPage>; }
