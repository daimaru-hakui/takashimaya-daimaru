import { AiOutlineUnorderedList, AiOutlineFileAdd } from "react-icons/ai";
export const headerLinks = [
  {
    title: "案件一覧",
    path: "/dashboard/",
    icon: <AiOutlineUnorderedList />,
  },
  {
    title: "終了案件",
    path: "/dashboard/closed-projects",
    icon: <AiOutlineUnorderedList />,
  },
  {
    title: "案件登録",
    path: "/dashboard/projects/new",
    icon: <AiOutlineFileAdd />,
  },
];
