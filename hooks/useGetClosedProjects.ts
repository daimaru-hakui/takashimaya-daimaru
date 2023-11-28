import { Project } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetcher = async () => {
  const url = "/api/closed-projects";
  const res = await axios.get(url);
  const data = res.data;
  if (!data) return;
  return data;
};

export const useGetClosedProjects = () => {
  return useQuery<Project[]>({
    queryKey: ["closed-projects"],
    queryFn: () => fetcher(),
  });
};
