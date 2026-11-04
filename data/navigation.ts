export type NavItem={label:string;href:string}|{label:string;id:string;children:{label:string;href:string}[];routes:string[]};
export const navigation:NavItem[]=[
 {label:"Explore HeirMark",id:"explore",routes:["/framework"],children:[{label:"The HeirMark Framework",href:"/framework"},{label:"About HeirMark",href:"/#about-heirmark"}]},
 {label:"Events",href:"/events"},
 {label:"Our Books",id:"books",routes:["/books","/collection"],children:[{label:"All Books & Publications",href:"/books"},{label:"The HeirMark Collection",href:"/collection"}]},
 {label:"Partnerships",href:"/partnerships"},{label:"Journal",href:"/journal"},{label:"Contact",href:"/contact"}
];
export function routeActive(path:string,href:string){return path===href||path.startsWith(href+"/")}
