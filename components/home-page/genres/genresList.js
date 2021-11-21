import Image from "next/image";

import danceImage from "../../../public/dance.jpg";

function GenresList() {
  return (
    <section className="px-10 pt-10">
      <div className="relative filter contrast-125 h-36 w-72">
        <Image
          src={danceImage}
          alt="dance"
          className="rounded-lg"
          layout="fill"
        />

        <div className="absolute w-full h-full rounded-lg opacity-30 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>

        <p className="absolute text-2xl font-bold text-blue-100 right-2 bottom-2">
          Dance
        </p>
      </div>
    </section>
  );
}

export default GenresList;
