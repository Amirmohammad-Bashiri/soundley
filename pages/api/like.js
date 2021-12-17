import { getSession } from "next-auth/react";

import clientPromise from "@lib/mongodb";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const session = await getSession({ req });

      if (!session) {
        res
          .status(401)
          .json({ message: "Not authorized to access this endpoint" });
      }

      const client = await clientPromise;

      const user = await client
        .db()
        .collection("users")
        .findOne({ email: session.user.email });

      if (!user) {
        res.status(404).json({ message: "User not found" });
      }

      let likes;

      if (user.likes) {
        likes = [...user?.likes, req.body];
      } else {
        likes = [req.body];
      }

      const query = { email: session.user.email };
      const update = { $set: { likes } };
      const options = { returnDocument: "after" };

      const updatedDocument = await client
        .db()
        .collection("users")
        .findOneAndUpdate(query, update, options);

      res.status(200).json({ message: "Success", updatedDocument });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  } else if (method === "PUT") {
    try {
      const session = await getSession({ req });

      if (!session) {
        res
          .status(401)
          .json({ message: "Not authorized to access this endpoint" });
      }

      const client = await clientPromise;

      const user = await client
        .db()
        .collection("users")
        .findOne({ email: session.user.email });

      if (!user) {
        res.status(404).json({ message: "User not found" });
      }

      const query = { email: session.user.email };
      const update = { $pull: { likes: { id: req.body.trackId } } };

      const updatedDocument = await client
        .db()
        .collection("users")
        .updateOne(query, update);

      res.status(201).json({ message: "Success", updatedDocument });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }
}
