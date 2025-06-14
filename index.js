import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const client = new PrismaClient();

//get all users
app.get("/users", async (_req, res) => {
  try {
    const allUsers = await client.users.findMany();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json("error fetching all users");
  }
});

//specific user
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await client.users.findUnique({
      where: { id },
    });
    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json("error fetching specific user");
  }
});

//create a user
app.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, username } = req.body;
    const newUser = await client.users.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        username,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json("error creating user");
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
