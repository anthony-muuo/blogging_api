import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const client = new PrismaClient();

app.get("/", (_req, res) => {
  res.send("<h3>Welcome to the Blogging Api endpoint</h3>");
});

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
    const getUserPlusPosts = await client.users.findUnique({
      where: { id },
      include: { posts: true },
    });
    res.status(200).json(getUserPlusPosts);
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

//posts

app.get("/posts", async (req, res) => {
  try {
    const allPosts = await client.posts.findMany({
      where: { isDeleted: false },
    });
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json("error fetching all posts");
  }
});

//creating a posts

app.post("/posts", async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const newPost = await client.posts.create({
      data: {
        title,
        content,
        userId,
      },
    });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json("error creating all posts");
  }
});

//getting specific post
app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getPost = await client.posts.findUnique({
      where: { id },
    });
    res.status(200).json(getPost);
  } catch (error) {
    res.status(500).json("error fetching specific user");
  }
});

//updating a specific Post

app.put("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json("Both title and content are required for update request");
    }
    const updatedPost = await client.posts.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json("error updating this post");
  }
});

//Delete a given post
app.patch("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await client.posts.update({
      where: { id },
      data: { isDeleted: true },
    });
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json("error deleting this specific post");
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
