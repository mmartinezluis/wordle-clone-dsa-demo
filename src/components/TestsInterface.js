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
            <p>
              When active, the tests will run automatically when visiting the
              stateful board or the stateless board. The final test results will
              be displayed on the current board page when the tests are done.
              You can see the live tests running by opening the console.
              IMPORTANT: When the tests are done in a given board, return to
              this page (Tests Settings) for the test variables to be properly
              reinitialized (moving between boards will still make the tests
              run, but the tests variables will not be cleared).
            </p>
            <br />
            <p>
              You can find a discussion about the tests along with a data table
              for 30 test trials in my blog post{" "}
              <a
                href="https://devblog.dev/luismartinez/designing-wordle-wordle-clone-dsa-part-ii-data-implementation-1d370b6514"
                target="_blank"
                rel="noreferrer"
              >
                <strong>
                  <em>
                    Designing Wordie: Wordie Clone DSA, Part II: Data
                    Implementation
                  </em>
                </strong>
              </a>
              , section "Rerendering the Board Component, Method II: Using
              Stateless Variables plus a Switch State Variable". You can access
              the GitHub repository for this codesandbox{" "}
              <a
                href="https://github.com/mmartinezluis/wordle-clone-dsa-performance-tests"
                target="blank"
                rel="noreferrer"
              >
                <strong>here</strong>
              </a>
              .
            </p>
          </div>
        </>
      ) : null}
    </>
  );
}
export default TestsInterface;
