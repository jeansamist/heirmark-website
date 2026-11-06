import { inputErrors } from "./inquiry-validation";
export const inquiryTypes = ["General Inquiry", "Books & Publications", "Events & Programs", "Partnerships & Collaborations", "Speaking Engagements", "Media & Press", "Other"] as const;
export type ContactValues = {fullName:string; email:string; inquiryType:string; message:string};
export function validateContact(values:ContactValues){
 const errors:Partial<Record<keyof ContactValues,string>>={};
 if(!values.fullName.trim()) errors.fullName="Please enter your full name.";
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email="Please enter a valid email address.";
 if(!inquiryTypes.some(type=>type===values.inquiryType)) errors.inquiryType="Please select an inquiry type.";
 if(!values.message.trim()) errors.message="Please enter your message.";
 Object.assign(errors,inputErrors(values));return errors;
}
