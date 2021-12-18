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

      let playlists;

      if (user.playlists) {
        playlists = [...user.playlists, { [req.body.playlistName]: [] }];
      } else {
        playlists = [{ [req.body.playlistName]: [] }];
      }

      const query = { email: session.user.email };
      const update = { $set: { playlists } };
      const options = { returnDocument: "after" };

      await client
        .db()
        .collection("users")
        .findOneAndUpdate(query, update, options);

      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }
}
