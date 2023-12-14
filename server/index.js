const express = require("express");
const app = express();
const port = 3100;
const mongoose = require("mongoose");
const { Schema } = mongoose;
app.use(express.json());

const UserSchema = new Schema(
  {
    title: String,
    description: String,
    category: { type: [Schema.Types.Mixed] },
    image: String,
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", UserSchema);

//  <---------- GET   ---------->
app.get("/users", async (req, res) => {
  const data = await Users.find({});
  res.send(data);
});

//  <---------- GET (findById)   ---------->
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Users.findById(id).exec();
    res.send(data);
  } catch (error) {
    res.status(500).send("This is an error");
  }
});

//  <---------- POST   ---------->
app.post("/users/", async (req, res) => {
  try {
    const newUser = new Users({ ...req.body });
    await newUser.save();
    res.status(200).json({ message: "user created!" });
  } catch (error) {
    res.status(500).send("This is an error");
  }
});

//  <---------- DELETE   ---------->
app.delete("/users/:id", async (req, res) => {
  try {
    const deleteUser = await Users.findByIdAndDelete(req.params.id);
    res.send(deleteUser);
    res.status(200).json({ message: "user deleted!" });
  } catch (error) {
    res.status(500).send("This is an error");
  }
});

//  <---------- UPDATE   ---------->
app.put("/users/:id", async (req, res) => {
    const {id}=req.params
    try {
        const user =  await Users.findByIdAndUpdate(id,req.body)
        res.send(user)

    } catch (error) {
        res.status(500)
    }
  });


mongoose
  .connect("mongodb+srv://emirxan123:emirxan321@cluster0.esb9xx0.mongodb.net/")
  .then(() => console.log("Connected!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
