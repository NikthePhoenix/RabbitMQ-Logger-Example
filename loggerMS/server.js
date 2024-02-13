const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Producer = require("./producer");
const producer = new Producer();

app.use(bodyParser.json("application/json"));

app.post("/sendMail", async (req, res, next) => {
  await producer.publishMessage(req.body.mailType, req.body.to, req.body.subject, req.body.body);
  res.send();
});

app.listen(3000, () => {
  console.log("Server started...");
});
