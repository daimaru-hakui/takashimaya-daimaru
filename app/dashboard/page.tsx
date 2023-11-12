import React from "react";
import ProjectsListArea from "./projects/components/projects-list-area";
import SearchArea from "../components/search/search-area";

const DashboardPage = () => {
  return (
    <>
      <SearchArea />
      <ProjectsListArea />
    </>
  );
};

export default DashboardPage;
