import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode } from "swiper";

import { useGenres } from "@hooks/useGenres";
import GenreItem from "./genre-item";
import { soundleyClient } from "@clients/soundley-client";
import Loader from "@components/loader";

import "swiper/css";
import "swiper/css/free-mode";

SwiperCore.use([FreeMode]);

function GenresList() {
  const { data, isLoading } = useGenres(soundleyClient, "/genres");

  return (
    <section className="px-4 pt-4 pb-6 mx-6 mt-10 bg-gray-800 rounded xl:px-6 md:mt-14 md:mx-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold tracking-wide md:text-2xl text-gray-50">
          Genres
        </h2>
        <Link href="/genres">
          <a className="text-sm font-medium text-gray-300 md:text-base">
            View All
          </a>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader type="Oval" color="#D1D5DB" height={140} width={100} />
        </div>
      ) : (
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          freeMode={true}
          breakpoints={{
            768: { slidesPerView: 3, spaceBetween: 25 },
            1280: { slidesPerView: 4, spaceBetween: 25 },
            1536: { slidesPerView: 5, spaceBetween: 25 },
          }}>
          {data.slice(0, 10).map(genre => (
            <SwiperSlide key={genre.id}>
              <GenreItem genre={genre} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}

export default GenresList;
