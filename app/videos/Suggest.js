import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './Suggest';

// import required modules
import { Pagination } from 'swiper/modules';
import { set } from 'mongoose';
import axios from 'axios';
import Link from 'next/link';


const Suggest = () => {
  const [suggest, setSuggest] = useState([]);
    console.log(suggest);
    useEffect(() => {
      axios.get('http://localhost:5000/suggest')
        .then(res => res.data)
        .then(data => setSuggest(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
            <div>
              <Link href={'/videos'}>
              <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 5, spaceBetween: 50 }
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {suggest.map((item) => (
            <SwiperSlide key={item.id}>
              <img className='h-80' src={item.thumbnail.link} alt={item.title} />
              <p className='text-white'>{item.title}</p>
            </SwiperSlide>
          ))}
        </Swiper>
          </Link>
          </div>
    );
};

export default Suggest;