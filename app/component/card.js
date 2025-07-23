'use client';

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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

  const keys = ["aka", "fu", "fe", "golden", "drstone", "titan"];

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
    <div className="container-fluid" style={{ padding: "1rem" }}>
      <h1
        style={{
          color: "#fff",
          textAlign: "center",
          marginBottom: "2rem",
          fontWeight: "normal",
        }}
      >
        Anime
      </h1>

      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={3}
        navigation={true}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
        }}
        style={{ paddingBottom: "2rem", overflow: "visible" }}
      >
        {keys.map((key) => (
          <SwiperSlide
            key={key}
            style={{ padding: "0 5px", overflow: "visible" }}
          >
            <div
              className="card"
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              style={{
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                transform: hovered === key ? "scale(1.1)" : "scale(1)",
                boxShadow:
                  hovered === key
                    ? "0 12px 30px rgba(0,0,0,0.5)"
                    : "0 4px 10px rgba(0,0,0,0.2)",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#222",
                height: "100%",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "56.25%", // 16:9 ratio
                  overflow: "hidden",
                  borderRadius: "12px",
                }}
              >
                <img
                  src={images[key].default}
                  alt={key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "opacity 0.3s ease",
                    opacity: hovered === key && canShowHover(key) ? 0 : 1,
                    zIndex: hovered === key && canShowHover(key) ? 1 : 2,
                    userSelect: "none",
                    pointerEvents: "none",
                    borderRadius: "12px",
                  }}
                  draggable={false}
                />
                <img
                  src={images[key].hover}
                  alt={`${key} hover`}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "opacity 0.3s ease",
                    opacity: hovered === key && canShowHover(key) ? 1 : 0,
                    zIndex: hovered === key && canShowHover(key) ? 2 : 1,
                    userSelect: "none",
                    pointerEvents: "none",
                    borderRadius: "12px",
                  }}
                  draggable={false}
                />
              </div>
              <div className="card-body" style={{ padding: "0.5rem 1rem" }}>
                <p
                  className="card-text"
                  style={{
                    color: "white",
                    fontSize: "1rem",
                    margin: 0,
                  }}
                >
                  {titles[key]}
                </p>
                <small
                  style={{
                    color: "#ccc",
                    fontSize: "0.85rem",
                    display: "block",
                    marginTop: "4px",
                  }}
                >
                  {descriptions[key]}
                </small>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
