import { inquiryHandler, inquiryStatus } from "@/lib/inquiry-handler";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export const maxDuration=60;
export const GET=inquiryStatus;
export const POST=inquiryHandler("partnership");
