const fs = require("fs");
const { format } = require("date-fns");

const path = require("path");

const fileName = path.join(__dirname, "../logs", "log.log");

const logEvents = (msg) => {
  try {
    const timeLog = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss\t")}`;
    fs.appendFileSync(fileName, timeLog + " " + msg + "\n");
  } catch (error) {
    console.log(error);
  }
};

module.exports = logEvents;
