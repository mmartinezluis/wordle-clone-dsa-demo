import React, { useEffect } from "react";

function TestsInterface({
  testsCheckbox,
  testsPanel,
  testsActive,
  resetTests,
}) {
  useEffect(() => {
    if (testsActive) resetTests();
  }, [testsActive, resetTests]);
  return (
    <>
      {testsCheckbox}
      {testsActive ? (
        <>
          {testsPanel}
          <div className="tests-note">
            When active, the tests will run automatically when visiting the
            stateful board or the stateless board. The final test results will
            be displayed on the current board page when the tests are done. You
            can see the live tests running by opening the console. IMPORTANT:
            When the tests are done in a given board, return to this page (Tests
            Settings) for the test variables to be properly reinitialized
            (moving between boards will still make the tests run, but the tests
            variables will not be cleared).
          </div>
        </>
      ) : null}
    </>
  );
}
export default TestsInterface;
