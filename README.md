# longpolling
1. To create a job, call the service
const p = fetch("http://localhost:3000/submitjob",{method: "POST"});

2. Get the job id from the following command
p.then(res => res.text()).then(data => console.log(data));

Let the job id is 545.

3. Now, to check the status of the submission
fetch("http://localhost:3000/longpolling?jobid=545").then(res => res.text()).then(data => console.log(data));

4. Note the final fetch call is blocked till the response is sent from the server

