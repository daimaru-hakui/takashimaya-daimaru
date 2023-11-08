export type Project = {
  id: string;
  title: string;
  staff: string;
  deadline: string;
  sales: number;
  comment: string;
  progress: number;
  status:"NEGOTIATION" | "QUOTATION"
  createdAt: any;
}