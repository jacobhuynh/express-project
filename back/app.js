import { db } from "./firebase.js";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/messages/", async (req, res) => {
  try {
    const messagesSnapshot = await getDocs(collection(db, "messages"));
    const messagesData = messagesSnapshot.docs.map((doc) => ({
      messageId: doc.id,
      messageData: doc.data(),
    }));
    res.status(200).json(messagesData);
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
});

app.post("/messages/new", async (req, res) => {
  const data = req.body;
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      name: data.name,
      message: data.message,
      date: formattedDate,
    });
    res.status(200).json("Document successfully added: " + docRef.id);
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
});

app.delete("/messages/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await deleteDoc(doc(db, "messages", id));
    res.status(200).json("Document successfully deleted: " + id);
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
});

app.put("/messages/update/:id", async (req, res) => {
  const id = req.params.id;

  const data = req.body;
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  try {
    await updateDoc(doc(db, "messages", id), {
      name: data.name,
      message: data.message,
      date: formattedDate,
    });
    res.status(200).json("Document successfully updated: " + id);
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
