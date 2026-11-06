export const fieldLimits: Record<string, number> = {fullName:120,email:254,organization:200,phone:40,engagementType:80,eventFormat:30,eventDate:10,location:200,details:5000,inquiryType:80,message:5000,interest:100,idea:5000};
export function validEmail(value:string) {
 if(value.length>254 || /[\s\x00-\x1f\x7f<>(),;:"\\]/.test(value)) return false;
 const parts=value.split("@");
 return parts.length===2 && parts[0].length<=64 && /^[A-Za-z0-9!#$%&'*+\/=?^_`{|}~.-]+$/.test(parts[0]) && !parts[0].startsWith('.') && !parts[0].endsWith('.') && !parts[0].includes('..') && /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/.test(parts[1]);
}
export function inputErrors(values:Record<string,unknown>) {
 const errors:Record<string,string>={};
 for(const [key,value] of Object.entries(values)) {
  if(typeof value!=="string") continue;
  if(value.length>(fieldLimits[key]??5000)) errors[key]=`Please use no more than ${fieldLimits[key]??5000} characters.`;
  const multiline=['message','details','idea'].includes(key);
  if((multiline?/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/:/[\x00-\x1f\x7f]/).test(value)) errors[key]='Please remove unsupported control characters.';
 }
 if(typeof values.email==='string'&&!validEmail(values.email.trim()))errors.email='Enter a valid email address.';
 return errors;
}
