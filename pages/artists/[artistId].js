import { useRouter } from "next/router";

function ArtistPage() {
  const { query } = useRouter();

  return <div>artist {query.artistId}</div>;
}

export default ArtistPage;
