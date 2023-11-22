"use client";
import SearchArea from "@/app/components/search/search-area";
import { useGetClosedProjects } from "@/hooks/useGetClosedProjects";
import { useStore } from "@/store";
import React from "react";

const ClosedProjectsHeaderArea = () => {
  const { data } = useGetClosedProjects();
  const filterClosedProjects = useStore((state) => state.filterClosedProjects);
  const resetSearch = useStore((state) => state.resetSearch);
  if (!data) return <div></div>;
  return (
    <SearchArea
      projects={data}
      filterProjects={filterClosedProjects}
      resetSearch={resetSearch}
    />
  );
};

export default ClosedProjectsHeaderArea;
