const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

// Set up History Schema and model
const HistorySchema = new mongoose.Schema({
  role: String,
  organisation: String,
  startDate: String,
  endDate: String,
  experiences: [String],
  imageSrc: String,
});

const History = mongoose.model("History", HistorySchema);

// Set up Project Schema and model
const ProjectSchema = new mongoose.Schema({
  title: String,
  imageSrc: String,
  description: String,
  skills: [String],
  source: String,
});

const Project = mongoose.model("Project", ProjectSchema);

// Set up Skill Schema and model
const SkillSchema = new mongoose.Schema({
  title: String,
  imageSrc: String,
});

const Skill = mongoose.model("Skill", SkillSchema);

// MONGODB FUNCTIONS
async function connect() {
  await mongoose.connect(dbUrl);
}

// Get all History
async function getHistory() {
  await connect();
  return await History.find({});
}

// Get all Skills
async function getSkills() {
  await connect();
  return await Skill.find({});
}

// Get all Projects
async function getProjects() {
  await connect();
  return await Project.find({});
}

// Initialize History collection with some data
async function initializeHistory() {
  await connect();
  const historyData = [
    {
      role: "Intern",
      organisation: "Ntpc",
      startDate: "Jul, 2022",
      endDate: "Sept,2022",
      experiences: ["Worked as intern", "Worked in power generation"],
      imageSrc: "history/ntpc.png",
    },
    {
      role: "Student",
      organisation: "Humber",
      startDate: "Jan, 2024",
      endDate: "Present",
      experiences: ["Studying web dev", "learning MERN stack"],
      imageSrc: "history/humber.png",
    },
    {
      role: "Student",
      organisation: "IPU",
      startDate: "Aug, 2019",
      endDate: "Jul, 2023",
      experiences: [
        "studied Electrical and Electronics Engineering",
        "Passed with 9.7 CGPA",
      ],
      imageSrc: "history/ipu.png",
    },
  ];
  await History.insertMany(historyData);
}

// Initialize Projects collection with some data
async function initializeProjects() {
  await connect();
  const projectData = [
    {
      title: "Weather Music",
      imageSrc: "projects/WeatherMusic.png",
      description:
        "WeatherMusic is a Node.js web application that suggests Spotify playlists based on the current weather conditions in a specified city.",
      skills: ["React", "Express", "Node"],
      source: "https://github.com/Anant770/HTTP5222-Full-Stack/tree/main/http5222-Assignment2-AnantChauhan",
    },
    {
      title: "Toy website",
      imageSrc: "projects/toysite.png",
      description: "This is a project made to learn node and mongo.",
      skills: ["MongoDB", "Express", "Node", "Bootstrap"],
      source: "https://github.com/Anant770/HTTP5222-Full-Stack/tree/main/http5222-Assignment1-AnantChauhan",
    },
    {
      title: "Job Portal",
      imageSrc: "projects/jobportal.png",
      description:
        "This project is a Job Portal application built using ASP.NET Web API and MVC.",
      skills: ["C#", "ASP.net", "Bootstrap"],
      source: "https://github.com/Anant770/Job_Portal",
    },
  ];
  await Project.insertMany(projectData);
}

// Initialize Skills collection with some data
async function initializeSkills() {
  await connect();
  const skillData = [
    { title: "HTML", imageSrc: "skills/html.png" },
    { title: "CSS", imageSrc: "skills/css.png" },
    { title: "React", imageSrc: "skills/react.png" },
    { title: "Node", imageSrc: "skills/node.png" },
    { title: "GraphQL", imageSrc: "skills/graphql.png" },
    { title: "MongoDB", imageSrc: "skills/mongodb.png" },
    { title: "Figma", imageSrc: "skills/figma.png" },
  ];
  await Skill.insertMany(skillData);
}

module.exports = {
  getHistory,
  getSkills,
  getProjects,
  initializeHistory,
  initializeProjects,
  initializeSkills,
};
