const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.set("view engine", "ejs");

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path}`);
    next();
});

const rosterSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        image: {type: String},
        grade: { type: Number, default: 9, required: true },
        yearsPlayed: {type: Number, default: 1},
        jerseyNum: {type: Number, default: 0, required: true},
    }
);

const Member = mongoose.model("Member", rosterSchema, "Members");

app.post("/add/member", async (req, res) => {
  const person = await new Member({
    name: req.body.name,
    image: req.body.image,
    grade: req.body.grade,
    yearsPlayed: req.body.yearsPlayed,
    jerseyNum: req.body.jerseyNum,
  }).save()
  res.json(person)
});

app.get("/", async (req, res) => {
  const roster = await Member.find({}).sort({ createdAt: -1 })
  console.log(roster)
  res.render("roster.ejs", {roster})
})

app.delete("/delete/member/:id", async (req, res) => {
  const remove = await Member.findOneAndDelete({_id: req.params.id})
  res.json(res)
})

app.patch("/update/member/:id", async (req, res) => {
  const update = await Member.findOneAndUpdate(
    {name: req.params.name},
    {image: req.body.image},
    {grade: req.body.grade},
    {yearsPlayed: req.body.yearsPlayed},
    {jerseyNum: req.body.jerseyNum},
    {new: true})
  res.json
})

async function startServer() {
    await mongoose.connect(
      "mongodb+srv://SE12:CSH2025@cluster0.u9yhg.mongodb.net/CSHpets?retryWrites=true&w=majority&appName=Cluster0"
    );
  
    app.listen(3000, () => {
      console.log(`Server running.`);
    });
  }
  
  startServer();