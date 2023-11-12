import React from 'react';
import ClosedProjectTable from './components/close-projects-table';
import ClosedProjectListArea from './components/closed-projects-list-area';
import SearchArea from '@/app/components/search/search-area';

const CloseProjectAll = () => {
  return (
    <>
      <SearchArea />
      <ClosedProjectListArea />
    </>
  );
};

export default CloseProjectAll;