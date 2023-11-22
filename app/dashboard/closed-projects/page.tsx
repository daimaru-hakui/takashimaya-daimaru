import React from 'react';
import ClosedProjectListArea from './components/closed-projects-list-area';
import ClosedProjectsHeaderArea from './components/closed-projects-header-area';

const CloseProjectAll = () => {
  return (
    <>
      <ClosedProjectsHeaderArea/>
      <ClosedProjectListArea />
    </>
  );
};

export default CloseProjectAll;