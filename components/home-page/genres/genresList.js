import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode } from "swiper";

import GenreItem from "./genreItem";

import "swiper/css";
import "swiper/css/free-mode";

SwiperCore.use([FreeMode]);

function GenresList() {
  return (
    <section className="px-4 pt-4 pb-6 mx-6 mt-10 bg-gray-800 rounded md:mt-14 md:mx-10 lg:mx-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold tracking-wide md:text-2xl text-gray-50">
          Genres
        </h2>
        <Link href="/genres">
          <a className="text-sm text-gray-400 md:text-base">See All</a>
        </Link>
      </div>

      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        freeMode={true}
        breakpoints={{
          768: { slidesPerView: 3, spaceBetween: 25 },
        }}>
        <SwiperSlide>
          <GenreItem />
        </SwiperSlide>
        <SwiperSlide>
          <GenreItem />
        </SwiperSlide>
        <SwiperSlide>
          <GenreItem />
        </SwiperSlide>
        <SwiperSlide>
          <GenreItem />
        </SwiperSlide>
        <SwiperSlide>
          <GenreItem />
        </SwiperSlide>
        <SwiperSlide>
          <GenreItem />
        </SwiperSlide>
        <SwiperSlide>
          <GenreItem />
        </SwiperSlide>
        <SwiperSlide>
          <GenreItem />
        </SwiperSlide>
        <SwiperSlide>
          <GenreItem />
        </SwiperSlide>
        <SwiperSlide>
          <GenreItem />
        </SwiperSlide>
      </Swiper>

      {/* <div className="flex items-center pb-5 overflow-x-scroll gap-x-8">
        <GenreItem />
        <GenreItem />
        <GenreItem />
        <GenreItem />
        <GenreItem />
        <GenreItem />
        <GenreItem />
        <GenreItem />
        <GenreItem />
      </div> */}
    </section>
  );
}

export default GenresList;
