
  let runTests = false;

  let renderCount = 0;
  let averageRenderTime = 0;

  const profilerRenderCallback = (
    id,
    phase,
    actualTime,
    baseTime,
    startTime,
    commitTime
  ) => {
    console.log(`${id}'s ${phase} phase:`)
    console.log(`Actual time: ${actualTime}`)
    console.log(`Base time: ${baseTime}`)
    console.log(`Start time: ${startTime}`)
    console.log(`Coomit time: ${commitTime}`)

    renderCount++
    averageRenderTime += baseTime;
    // substract the component mount time from the first render
    if(renderCount === 1) averageRenderTime -= baseTime;
    if(renderCount === 201) {
      console.log(`Average rerender time for 100 rerenders: ${averageRenderTime/200}ms`);
    }
  }