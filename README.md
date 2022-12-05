# Wordle Clone DSA Performance Tests

<p align="center">
    <img width="700" alt="WCDSA-featured-image" src="https://user-images.githubusercontent.com/75151961/205560270-e4bba031-12da-4ca8-911e-2df31a5fa44e.png">
</p>

**Component rerender time** performance tests through React Profiler comparing the performance of a stateful board and a stateless board for Wordle Clone DSA. The tests are exposed through a TestsInterface component that allows running the tests right from the UI (user interface). Test results are displayed right on the UI as well. While running, the tests' data can be observed from the browser's console. 

## Test Results Discussion
You can find a discussion about the tests along with a data table for 30 test trials in my blog post [*Designing Wordle: Wordle Clone DSA, Part II: Data Implementation*](https://devblog.dev/luismartinez/designing-wordle-wordle-clone-dsa-part-ii-data-implementation-1d370b6514), section *Rerendering the Board Component, Method II: Using Stateless Variables plus a Switch State Variable*. 

## Code Sandbox
You can find the code from this repo deployed in a code sandbox ready for test usage at 
(https://codesandbox.io/s/wordle-clone-dsa-performance-tests-k2cc2k)

## Local Testing
To run the tests locally, download this repo from your terminal:

```git clone https://github.com/mmartinezluis/wordle-clone-dsa-performance-tests.git```

cd into the project:

```cd wordle-clone-dsa-performance-tests```

install the depedencies:

```npm install```

and start the React client:

```npm start```