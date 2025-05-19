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
        grade: { type: Number, default: 0 },
        rookie: {type: Boolean, default: true}
    }
);

const Member = mongoose.model("Member", rosterSchema, "Members");

app.post("/add/member", async (req, res) => {
  const person = await new Member({
    name: req.body.name,
    image: req.body.image,
    grade: req.body.grade,
    rookie: req.body.rookie,
  }).save()
  res.json(person)
});

app.get("/", (req, res) => {
  res.render(roster.ejs)
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