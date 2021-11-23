import Link from "next/link";

function GridContainer() {
  return (
    <div className="grid grid-cols-12 grid-rows-6 gap-8 px-10 mt-20 h-80">
      <section className="col-span-8 row-span-2 bg-gray-800 rounded xl:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-wide md:text-2xl lg:text-3xl text-gray-50">
            Genres
          </h2>
          <Link href="/artist/:someid">
            <a className="text-sm text-gray-300 md:text-base">View All</a>
          </Link>
        </div>
      </section>

      <section className="col-span-4 row-span-6 bg-gray-800 rounded">
        <h2>Music Player</h2>
      </section>

      <section className="col-span-3 row-span-4 bg-gray-800 rounded">
        <h2>Top Albums</h2>
      </section>

      <section className="col-span-5 row-span-4 bg-gray-800 rounded">
        <h2>Top Charts</h2>
      </section>
    </div>
  );
}

export default GridContainer;
