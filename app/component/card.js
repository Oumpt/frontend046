'use client';

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import './card.css'; // 👉 เพิ่มไฟล์ CSS แยก

export default function Card() {
  const images = {
    aka: { default: "/aka.jpg", hover: "/aka_alt.jpg" },
    fu: { default: "/fu.jpg", hover: "/fu_alt.jpg" },
    fe: { default: "/fe.jpg", hover: "/fe_alt.jpg" },
    golden: { default: "/gd2.jpg", hover: "/gd2_alt.jpg" },
    drstone: { default: "/dr.jpeg", hover: "/dr_alt.jpeg" },
    titan: { default: "/att.jpg", hover: "/att_alt.jpg" },
  };

  const descriptions = {
    aka: "อากิระเดอะเบส",
    fu: "แขนกลคนขาหาย",
    fe: "คุณยายนักท่องเที่ยว",
    golden: "ขุดทองกันที่หลังเขา",
    drstone: "หมอหินสุดเหลี่ยมกับพ้องเพื่อน",
    titan: "มนุษย์เปรตเตะกำแพงเป็นงานอดิเรก",
  };

  const titles = {
    aka: "Akira",
    fu: "Fullmetal Alchemist Brotherhood",
    fe: "Frieren Beyond Journey's End",
    golden: "Golden Kamuy",
    drstone: "Dr. Stone",
    titan: "Attack on Titan",
  };

  const keys = Object.keys(images);

  const [hovered, setHovered] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState({});

  useEffect(() => {
    const loadPromises = keys.map(
      (key) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = images[key].hover;
          img.onload = () => resolve(key);
          img.onerror = () => resolve(key);
        })
    );

    Promise.all(loadPromises).then((loadedKeys) => {
      const loadedMap = {};
      loadedKeys.forEach((key) => {
        loadedMap[key] = true;
      });
      setImagesLoaded(loadedMap);
    });
  }, []);

  const canShowHover = (key) => imagesLoaded[key];

  return (
    <div className="card-container">
      <h1 className="card-title">Anime</h1>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView="auto"
        navigation
        loop
        breakpoints={{
          320: { slidesPerView: 1.2 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
        }}
        className="card-swiper"
      >
        {keys.map((key) => (
          <SwiperSlide key={key} className="card-slide">
            <div
              className={`card-item ${hovered === key ? 'hovered' : ''}`}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="card-image-wrapper">
                <img
                  src={images[key].default}
                  alt={key}
                  className={`card-image ${hovered === key && canShowHover(key) ? 'hidden' : 'visible'}`}
                  draggable={false}
                />
                <img
                  src={images[key].hover}
                  alt={`${key} hover`}
                  className={`card-image ${hovered === key && canShowHover(key) ? 'visible' : 'hidden'}`}
                  draggable={false}
                />
              </div>
              <div className="card-body">
                <p className="card-title-text">{titles[key]}</p>
                <small className="card-desc-text">{descriptions[key]}</small>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}