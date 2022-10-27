import { Router } from "express";
import { fork } from 'child_process';

const randomRouter = new Router();

randomRouter.get('/', (req, res) => {
  const computo = fork('./src/routers/api/sumaFork.js');
  computo.send('start');
  computo.on('message', numRandoms => {
      res.end(numRandoms);
  })
});


// randomRouter.post("/:cant", (req, res) => {
//    const { cant } = req.params;
//    console.log('post')
//    res.send(numRandoms(cant))
// });


export default randomRouter;
