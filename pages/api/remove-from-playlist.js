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

      const query = {
        email: session.user.email,
        "playlists.id": req.body.playlistId,
      };
      const update = {
        $pull: { "playlists.$.tracks": { id: req.body.trackId } },
      };
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
