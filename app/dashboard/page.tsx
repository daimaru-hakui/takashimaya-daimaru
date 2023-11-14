import React from "react";
import ProjectsListArea from "./projects/components/projects-list-area";
import SearchArea from "../components/search/search-area";
import ProjectsHeaderArea from "./projects/components/projects-header-area";

const DashboardPage = () => {
  return (
    <>
      <ProjectsHeaderArea/>
      <ProjectsListArea />
    </>
  );
};

export default DashboardPage;
