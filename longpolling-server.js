const express = require("express");
const app = express();
const port = 3000;
const jobs = {};



app.get("/", (req, res) => {
    res.send(`Hello !! Welcome to the Long Polling, time now : ${Date.now()}`)
});

app.post("/submitjob", async (req, res) => {
    const job = Math.floor(Math.random() * 1000);
    //  const data = {
    //                jobId,
    //                timestamp: new Date().toISOString()
    //               };
    jobs[job] = 0;
    updateJob(job);
    res.send(jobs);
})

app.get("/longpolling", async (req,res) => {
    while(await checkStatus(req.query.jobid)!= true);
    res.send(`Execution completed: ${req.query.jobid}`);
});

function updateJob(job) {
    setTimeout(() => {
        jobs[job] = jobs[job] + 5;
        if (jobs[job]  < 100) updateJob(job);
        console.log(`Job progress for jobid: ${job} is ` + jobs[job]);
    }, 5000);
}

function checkStatus(job){
  
    return new Promise((res, rej)=>{
       setTimeout(()=>{
        if(jobs[job]< 100)
            res(false);
        else 
            res(true);
       }, 2000);
    })
}

function x(job){
  if(jobs[job] < 100){
    setTimeout(()=>{
        x(job)
    }, 2000);
  }else{
    console.log("Why's it true "+jobs[job],job, (jobs[job] < 100))
    return true;
  }
}

app.listen(port, () => console.log("Listening on 3000 !!"));