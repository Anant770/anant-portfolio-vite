const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const db = require("./modules/portfolio/db");

const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/api/history", async (req, res) => {
  let historyList = await db.getHistory();
  if (!historyList.length) {
    await db.initializeHistory();
    historyList = await db.getHistory();
  }
  res.json(historyList);
});

app.get("/api/project", async (req, res) => {
  let projectList = await db.getProjects();
  if (!projectList.length) {
    await db.initializeProjects();
    projectList = await db.getProjects();
  }
  res.json(projectList);
});

app.get("/api/skills", async (req, res) => {
  let skillsList = await db.getSkills();
  if (!skillsList.length) {
    await db.initializeSkills();
    skillsList = await db.getSkills();
  }
  res.json(skillsList);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

