import Image from "next/image";

function ArtistHeader({ data }) {
  return (
    <div className="flex flex-col items-center justify-center w-full md:space-x-8 md:justify-start md:flex-row">
      <div className="relative rounded-sm w-52 h-52 xl:w-64 xl:h-64">
        <Image
          src={data.data[0].contributors[0].picture_big}
          alt="Artist Cover"
          layout="fill"
          className="rounded-sm"
          objectFit="contain"
          priority={true}
        />
      </div>

      <div className="space-y-5">
        <h3 className="hidden text-lg font-semibold text-gray-100 md:block">
          Track
        </h3>

        <h1 className="text-2xl font-bold text-center md:text-left md:text-4xl xl:text-5xl 2xl:text-6xl text-gray-50">
          {data.data[0].contributors[0].name}
        </h1>
      </div>
    </div>
  );
}

export default ArtistHeader;
