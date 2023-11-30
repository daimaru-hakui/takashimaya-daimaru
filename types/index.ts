export type Project = {
  id: string;
  title: string;
  staff1: string;
  staff2: string;
  deadline: string;
  sales: number;
  progress: number;
  status:
    | "PROGRESS"
    | "PENDING"
    | "DECIDED"
    | "NEGOTIATION"
    | "CLAIM"
    | "REJECTED";
  orderType: "READY" | "ORDER";
  fileLink: string;
  todos: {
    title: string;
    isDone: boolean;
  }[];
  isCompleted: boolean;
  deletedAt: any;
  createdAt: any;
};

export type Message = {
  id: string;
  content: string;
  email: string;
  author: string;
  createdAt: any;
};

export type User = {
  id: string;
  email: string;
  isAdmin: boolean;
  isEditor: boolean;
};

export type Contact = {
  id: string;
  title: string;
  numberOfPeople: number;
  quantityPerPerson: number;
  responseDeadline: string;
  deadline: string;
  orderType: "READY" | "ORDER";
  inquiryType: "ESTIMATE" | "PROPOSAL";
  content: string;
  deletedAt: null;
  createdAt: any;
  images: {
    url: string;
    path: string;
    type: string;
    name: string;
  }[];
  user: User
};
