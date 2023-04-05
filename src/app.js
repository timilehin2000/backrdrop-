const express = require("express");
const { startApplication } = require("./server");

const app = express();

startApplication(app);
