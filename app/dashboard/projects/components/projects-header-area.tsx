"use client";
import SearchArea from "@/app/components/search/search-area";
import React from "react";
import { Flex } from "@mantine/core";
import Stats from "@/app/components/stats/stats";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import { useStore } from "@/store";
import ProgressStatus from "@/app/components/stats/progress-status";

const ProjectsHeaderArea = () => {
  const projects = useStore((state) => state.projects);
  const filterProjects = useStore((state) => state.filterProjects);
  const resetSearch = useStore((state) => state.resetSearch);
  const newProjects = filterProjects.map((project) => ({
    sales: project.sales,
  }));
  let totalSalse = 0;
  newProjects.forEach((project) => {
    totalSalse += project.sales;
  });

  return (
    <>
      <SearchArea
        projects={projects}
        filterProjects={filterProjects}
        resetSearch={resetSearch}
      />
      <Flex
        w="100%"
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        gap="lg"
      >
        <Stats
          title="総案件数"
          value={filterProjects.length}
          unit="件"
          icon={<HiOutlineOfficeBuilding />}
        />
        <Stats
          title="売上金額"
          value={totalSalse}
          unit="万円"
          icon={<RiMoneyCnyCircleLine />}
        />
        <ProgressStatus filterProjects={filterProjects} />
      </Flex>
    </>
  );
};

export default ProjectsHeaderArea;
