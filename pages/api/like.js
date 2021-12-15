import { getSession } from "next-auth/react";

import clientPromise from "@lib/mongodb";

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ message: "Not authorized to access this route" });
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
      likes = [...user?.likes, { title: "title12" }];
    } else {
      likes = [{ title: "kuft" }];
    }

    const query = { email: session.user.email };
    const update = { $set: { likes } };
    const options = { returnDocument: "after" };

    const updatedDocument = await client
      .db()
      .collection("users")
      .findOneAndUpdate(query, update, options);

    res.status(200).json({ message: "Boop", updatedDocument });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Rid" });
  }
}
