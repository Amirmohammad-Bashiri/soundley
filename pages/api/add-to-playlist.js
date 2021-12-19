import { getSession } from "next-auth/react";

import clientPromise from "@lib/mongodb";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "PUT") {
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

      const updatedDocument = await client
        .db()
        .collection("users")
        .findOneAndUpdate(
          { email: session.user.email, "playlists.id": req.body.playlistId },
          { $push: { "playlists.$.tracks": req.body.track } },
          { returnDocument: "after" }
        );

      console.log(updatedDocument);

      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }
}
