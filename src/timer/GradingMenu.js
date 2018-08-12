import React from 'react';
import styled from 'styled-components';

const GradeButton = styled.button`
  &:not(:first-child) {
    margin-left: 0.3em;
  }
`;

const Solution = styled.div`
  font-size: 1rem;
`;

const GradingMenu = ({
  graded,
  gradeAttempt,
  currentAlgorithmSolution,
  remaindingAlgorithmCount,
}) => {
  // Show the solution after the attempt has finished, but before grading happens.
  // This is so the user can verify that the actually correct solution was used.
  const solution = graded ? null : (
    <Solution>{currentAlgorithmSolution}</Solution>
  );

  return (
    <div>
      {solution}

      {remaindingAlgorithmCount}

      {[0, 1, 2, 3, 4, 5].map(i => (
        <GradeButton onClick={() => gradeAttempt(i)} disabled={graded}>
          {i}
        </GradeButton>
      ))}
    </div>
  );
};

export default GradingMenu;
