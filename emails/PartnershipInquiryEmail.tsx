import { EmailLayout, InfoRow } from "./shared";
import type { InquiryValues } from "@/lib/partnership-validation";
export default function PartnershipInquiryEmail(p:InquiryValues & {submittedAt:string}) {
 return <EmailLayout previewText="New HeirMark partnership inquiry" eyebrow="Partnership Inquiry" title="A new collaboration inquiry has arrived">
 <InfoRow label="Full Name" value={p.fullName}/><InfoRow label="Email Address" value={p.email}/><InfoRow label="Organization / Platform" value={p.organization || "Not provided"}/><InfoRow label="Partnership Interest" value={p.interest}/><InfoRow label="Proposed Collaboration" value={p.idea}/><InfoRow label="Acknowledgment" value={p.acknowledgment?'Confirmed':'Not provided'}/><InfoRow label="Submitted (UTC)" value={p.submittedAt}/></EmailLayout>;
}
