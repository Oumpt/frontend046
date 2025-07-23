'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { id: 'action', name: 'แอ็คชัน', color: '#D32F2F' },
  { id: 'adventure', name: 'ผจญภัย', color: '#388E3C' },
  { id: 'fantasy', name: 'แฟนตาซี', color: '#9C27B0' },
  { id: 'rainbow', name: 'รวม', color: 'linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff)' },
];

const services = [
  {
    id: 1,
    title: 'Attack on Titan',
    category: 'action',
    desc: 'สงครามเอเลี่ยนยักษ์ทำลายล้างมนุษย์',
    highlights: ['ดราม่า', 'แอ็คชันสุดมัน', 'เนื้อเรื่องเข้มข้น'],
    duration: '75 ตอน',
    image: '/att.jpg',
  },
  {
    id: 2,
    title: 'Akira',
    category: 'action',
    desc: 'ไซไฟสุดคลาสสิกในเมือง Neo-Tokyo กับพลังจิตลึกลับ',
    highlights: ['ไซไฟ', 'แอ็คชัน', 'ดิสโทเปีย'],
    duration: '116 นาที (ภาพยนตร์)',
    image: '/aka.jpg',
  },
  {
    id: 3,
    title: 'Fullmetal Alchemist: Brotherhood',
    category: 'action',
    desc: 'สองพี่น้องนักเล่นแร่แปรธาตุออกเดินทางเพื่อกู้คืนร่างกาย',
    highlights: ['แอ็คชัน', 'แฟนตาซี', 'ดราม่า', 'ผจญภัย'],
    duration: '64 ตอน',
    image: '/fu.jpg',
  },
  {
    id: 4,
    title: 'Golden Kamuy',
    category: 'adventure',
    desc: 'ตามล่าสมบัติในยุคเมจิ เต็มไปด้วยผจญภัยและประวัติศาสตร์',
    highlights: ['ผจญภัย', 'ประวัติศาสตร์', 'ดราม่า'],
    duration: '50 ตอน',
    image: '/gd2.jpg',
  },
  {
    id: 5,
    title: 'Dr. Stone',
    category: 'adventure',
    desc: 'ฟื้นฟูอารยธรรมมนุษย์ด้วยวิทยาศาสตร์ หลังโลกกลายเป็นหิน',
    highlights: ['ผจญภัย', 'วิทยาศาสตร์', 'แอ็คชัน'],
    duration: '37 ตอน',
    image: '/dr.jpeg',
  },
  {
    id: 6,
    title: 'Yuru Camp',
    category: 'adventure',
    desc: 'เรื่องราวการตั้งแคมป์ของกลุ่มสาวๆ ที่สงบและอบอุ่น',
    highlights: ['ผจญภัย', 'ชีวิตประจำวัน', 'ธรรมชาติ'],
    duration: '12 ตอน',
    image: '/yuru.jpg',
  },
  {
    id: 7,
    title: 'Frieren: Beyond Journey’s End',
    category: 'fantasy',
    desc: 'เอลฟ์นักเวทออกเดินทางหลังสงคราม เพื่อค้นหาความหมายชีวิต',
    highlights: ['แฟนตาซี', 'ผจญภัย', 'ดราม่า'],
    duration: '11 ตอน',
    image: '/fe.jpg',
  },
  {
    id: 8,
    title: 'Berserk',
    category: 'fantasy',
    desc: 'ดาร์กแฟนตาซีของนักรบที่ต่อสู้กับปีศาจและโชคชะตา',
    highlights: ['แฟนตาซี', 'แอ็คชัน', 'ดาร์ก'],
    duration: '25 ตอน',
    image: '/bs.jpg',
  },
  {
    id: 9,
    title: 'Princess Mononoke',
    category: 'fantasy',
    desc: 'ขัดแย้งระหว่างธรรมชาติและอุตสาหกรรม ในโลกแฟนตาซี',
    highlights: ['แฟนตาซี', 'ผจญภัย', 'สิ่งแวดล้อม'],
    duration: '1 เรื่อง (ภาพยนตร์)',
    image: '/psm.jpg',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'แฟนอนิเมะ 1',
    image: '/att.jpg',
    rating: 5,
    text: 'Attack on Titan ทำให้รู้สึกตื่นเต้นและลุ้นตลอดเวลา!',
  },
  {
    id: 2,
    name: 'แฟนอนิเมะ 2',
    image: '/dr.jpeg',
    rating: 4.5,
    text: 'Dr. Stone สนุกและได้ความรู้ทางวิทยาศาสตร์ครบถ้วนมาก!',
  },
  {
    id: 3,
    name: 'แฟนอนิเมะ 3',
    image: '/psm.jpg',
    rating: 5,
    text: 'Princess Mononoke สวยงาม ลึกซึ้ง ประทับใจไม่รู้ลืม!',
  },
];

export default function AnimePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  function getButtonStyle(categoryId, active) {
    const cat = categories.find(c => c.id === categoryId);
    const baseColor = cat ? cat.color : '#666';

    if (!active) return {
      background: 'transparent',
      border: `2px solid ${baseColor}`,
      color: baseColor,
      cursor: 'pointer',
      padding: '8px 18px',
      borderRadius: '24px',
      fontWeight: '600',
      marginRight: '10px',
      transition: 'all 0.3s ease',
    };

    if (categoryId === 'rainbow') {
      return {
        background: cat.color,
        border: 'none',
        color: 'white',
        padding: '8px 18px',
        borderRadius: '24px',
        fontWeight: '700',
        marginRight: '10px',
        cursor: 'default',
        boxShadow: '0 0 12px rgba(255,255,255,0.7)',
      };
    }

    return {
      background: baseColor,
      border: 'none',
      color: 'white',
      padding: '8px 18px',
      borderRadius: '24px',
      fontWeight: '700',
      marginRight: '10px',
      cursor: 'default',
      boxShadow: `0 0 10px ${baseColor}`,
    };
  }

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory);

  function renderStars(rating) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) stars.push(<i key={`full-${i}`} className="bi bi-star-fill"></i>);
    if (halfStar) stars.push(<i key="half" className="bi bi-star-half"></i>);
    for (let i = stars.length; i < 5; i++) stars.push(<i key={`empty-${i}`} className="bi bi-star"></i>);
    return stars;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '80px auto 40px', padding: '0 20px' }}>
      <h1 style={{ color: '#ffff', marginBottom: '30px', fontSize: '2.5rem', textAlign: 'center' }}>
        บริการแนะนำอนิเมะของเรา
      </h1>

<div
  style={{
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px'
  }}
>
  {/* ปุ่มรวมแบบขอบรุ้ง */}
  <div
    style={{
      background: 'linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff)',
      padding: '2px',
      borderRadius: '30px',
      display: 'inline-block',
    }}
  >
    <button
      onClick={() => setActiveCategory('all')}
      style={{
        background: activeCategory === 'all' ? '#fff' : 'transparent',
        color: activeCategory === 'all' ? '#000' : '#333',
        padding: '8px 18px',
        borderRadius: '28px',
        fontWeight: '700',
        border: 'none',
        cursor: 'pointer',
        minWidth: '80px',
        transition: 'all 0.3s ease',
      }}
    >
      รวม
    </button>
  </div>

        {/* ปุ่มหมวดอื่นๆ */}
        {categories.filter(c => c.id !== 'rainbow').map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              background: activeCategory === cat.id ? cat.color : 'transparent',
              color: activeCategory === cat.id ? 'white' : cat.color,
              border: `2px solid ${cat.color}`,
              padding: '8px 18px',
              borderRadius: '28px',
              fontWeight: '600',
              cursor: 'pointer',
              minWidth: '80px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              if (activeCategory !== cat.id)
                e.currentTarget.style.filter = 'brightness(85%)';
            }}
            onMouseLeave={e => {
              if (activeCategory !== cat.id)
                e.currentTarget.style.filter = 'none';
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* รายการอนิเมะ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '30px'
      }}>
        {filteredServices.map(service => {
          const cat = categories.find(c => c.id === service.category) || { color: '#333' };
          return (
            <div
              key={service.id}
              style={{
                border: `2px solid ${cat.color}`,
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ position: 'relative', height: '180px', width: '100%' }}>
                <Image src={service.image} alt={service.title} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '15px 20px', flex: '1 1 auto' }}>
                <h3 style={{ margin: '0 0 6px', color: cat.color }}>{service.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '10px' }}>{service.desc}</p>
                <p style={{ fontSize: '0.75rem', marginBottom: '6px', color: '#888' }}>
                  <strong>ไฮไลท์:</strong> {service.highlights.join(', ')}
                </p>
                <p style={{ fontSize: '0.75rem', fontWeight: '600', color: '#444' }}>
                  ระยะเวลา: {service.duration}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* รีวิว */}
      <section style={{ marginTop: '60px' }}>
        <h2 style={{ textAlign: 'center', color: '#ffff', marginBottom: '40px' }}>
          รีวิวจากแฟนอนิเมะ
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
        }}>
          {testimonials.map((test, index) => {
            const borderColors = ['#D32F2F', '#388E3C', '#9C27B0'];
            const color = borderColors[index % borderColors.length];
            return (
              <div
                key={test.id}
                style={{
                  border: `2px solid ${color}`,
                  borderRadius: '16px',
                  padding: '20px',
                  backgroundColor: '#fff0fa',
                  boxShadow: `0 4px 12px rgba(0,0,0,0.08)`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <div style={{
                  position: 'relative',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginBottom: '15px'
                }}>
                  <Image src={test.image} alt={test.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <h3 style={{ margin: '0 0 8px', color }}>{test.name}</h3>
                <div style={{ color: '#fbc02d', fontSize: '1.2rem', marginBottom: '10px' }}>
                  {renderStars(test.rating)}
                </div>
                <p style={{ fontSize: '0.9rem', color: '#555' }}>{test.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to action */}
      <div className="row mt-5">
        <div className="col-12 text-center">
          <div className="p-4 rounded-4 shadow-sm" style={{
            background: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h3 className="mb-3" style={{ color: '#D32F2F' }}>
              พร้อมออกเดินทางสู่โลกอนิเมะหรือยัง?
            </h3>
            <p className="mb-4" style={{ color: '#555' }}>
              หากคุณมีคำถามหรืออยากแชร์อนิเมะที่ชอบ กดปุ่มด้านล่างเพื่อเชื่อมต่อกับเราเลย!
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link href="/contact" passHref>
            <button className="btn px-4 py-2" style={{ background: '#D32F2F', color: 'white', borderRadius: '30px' }}>
              <i className="bi bi-telephone-fill me-2"></i>
              คุยกับทีมแอ็คชัน
            </button>
          </Link>

          <Link href="/contact" passHref>
            <button className="btn px-4 py-2" style={{ background: '#388E3C', color: 'white', borderRadius: '30px' }}>
              <i className="bi bi-chat-dots-fill me-2"></i>
              ผจญภัยไปกับเรา
            </button>
          </Link>

          <Link href="/contact" passHref>
            <button className="btn px-4 py-2" style={{ background: '#9C27B0', color: 'white', borderRadius: '30px' }}>
              <i className="bi bi-envelope-fill me-2"></i>
              ส่งเวทมนตร์แฟนตาซี
            </button>
          </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
