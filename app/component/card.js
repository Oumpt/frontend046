'use client'
import { useState } from "react";

export default function Card() {
  const images = {
    aka: { default: "/aka.jpg", hover: "/aka_alt.jpg" },
    fu: { default: "/fu.jpg", hover: "/fu_alt.jpg" },
    fe: { default: "/fe.jpg", hover: "/fe_alt.jpg" },
  };

  const descriptions = {
    aka: "ภาพยนตร์อนิเมะที่โด่งดังจากปี 1988",
    fu: "อนิเมะแฟนตาซีผจญภัยยอดนิยม",
    fe: "เรื่องราวแห่งการเดินทางและเวลา",
  };

  const [hovered, setHovered] = useState(null);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 text-center mb-4">
          <h2 style={{ color: "#ffff" }}>Anime</h2>
        </div>
      </div>

      <div className="row">
        {["aka", "fu", "fe"].map((key) => (
          <div className="col-md-4 mb-4" key={key}>
            <div
              className="card"
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              style={{
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                transform: hovered === key ? "scale(1.05)" : "scale(1)",
                boxShadow:
                  hovered === key
                    ? "0 8px 20px rgba(0,0,0,0.3)"
                    : "0 4px 6px rgba(0,0,0,0.1)",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#222",
              }}
            >
              <img
                src={hovered === key ? images[key].hover : images[key].default}
                className="card-img-top"
                alt={key}
                style={{ transition: "all 0.3s ease" }}
              />
              <div className="card-body" style={{ padding: "0.5rem 1rem" }}>
                <p
                  className="card-text"
                  style={{
                    color: "white",
                    fontSize: "1rem",
                    margin: 0,
                  }}
                >
                  {key === "aka"
                    ? "Akira"
                    : key === "fu"
                    ? "Fullmetal Alchemist Brotherhood"
                    : "Frieren Beyond Journey's End"}
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
          </div>
        ))}
      </div>
    </div>
  );
}
