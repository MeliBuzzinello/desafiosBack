function random() {
    return Math.floor(Math.random() * (1000 - 1 + 1) + 1);
  }
  
  let valueAppearances = [];
  
  function numRandoms(n) {
      let num = n || 100000000;
      for (let i = 0; i <= num; i++) {
          let randomIndex = random();
          valueAppearances.push(randomIndex);
      }
      const resultant = valueAppearances.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})
      return resultant;
  }


  process.on('message', msg => {
    if (msg === 'start') {
        console.log('Child process received START message');
        let result = numRandoms();
        process.send(result);
    }
})