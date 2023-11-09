export type Project = {
  id: string;
  title: string;
  staff1: string;
  staff2: string;
  deadline: string;
  sales: number;
  comment: string;
  progress: number;
  status: "NEGOTIATION" | "QUOTATION"
  orderType: string;
  fileLink:string;
  createdAt: any;
};


export type Message = {
  id: string;
  content: string;
  email: string,
  author: string;
  createdAt: any;
};