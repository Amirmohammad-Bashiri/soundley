import { soundleyClient } from "@clients/soundley-client";

export async function search(activeTab, searchTerm) {
  const data = await soundleyClient.get(
    `/search?activeTab=${activeTab}&searchTerm=${searchTerm}`
  );

  return data;
}
