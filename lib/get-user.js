import { soundleyClient } from "@clients/soundley-client";
import { getSession } from "next-auth/react";

export async function getUser() {
  const session = await getSession();

  if (!session) return null;
  const { data } = await soundleyClient.get("/user");

  return data;
}
