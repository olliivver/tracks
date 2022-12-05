const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");


const app = express();
const port = 8000;

const {
  buyTicket,
  getTickets,
  createCrossing,
  getCrossing,
  deleteCrossing,
  updateCrossingPolice,
  updateCrossingOpen,
  updateCrossingClosed,
  updateCrossingPoliceGone,
  getSingleCrossing,
  pushPoliceReport,
  policeReportTimes,
  contactForm,
  handleUser,
  updateUser,
  getUser,
} = require("./handlers");

app.use(express.json())
app.use(helmet())
app.use(morgan('tiny'))


app.get("/", (req, res) => {
  res.status(200).json({status: 200, message: "Hello World!"});
});

app.get("/get-tickets", getTickets)
app.get("/get-crossing", getCrossing)
app.get("/get-user", getUser);
app.get("/get-police-reports", policeReportTimes);
app.get("/get-single-crossing/:_id", getSingleCrossing);
app.post("/buy-ticket", buyTicket)
app.post("/make-crossing", createCrossing)
app.post("/contact-form", contactForm);
app.post("/handle-user", handleUser);
app.post("/police-ts", pushPoliceReport)
app.patch("/report-police", updateCrossingPolice);
app.patch("/report-police-gone", updateCrossingPoliceGone);
app.patch("/report-open", updateCrossingOpen);
app.patch("/update-user", updateUser);
app.patch("/report-closed", updateCrossingClosed);
app.delete("/delete-crossing/:id", deleteCrossing)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
