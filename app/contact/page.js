'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [activeMethod, setActiveMethod] = useState('form');

  // สีธีมเมะที (น้ำเงิน แดง เขียว)
  const colors = {
    form: {
      bg: '#E6F0FF',       // ฟ้าอ่อน
      activeBg: '#1E90FF',
    },
    info: {
     bg: '#FFE6E0',       // แดงอ่อน
      activeBg: '#FF4500',
    },
    faq: {
      bg: '#E0FFE0',       // เขียวอ่อน
      activeBg: '#32CD32',
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('ส่งข้อความเรียบร้อยแล้ว! เราจะติดต่อกลับโดยเร็วที่สุด');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  // ข้อมูลติดต่อ + FAQ
  const contactInfo = {
    email: "Oum@anime.com",
    phone: "012-XXX-XXXX",
    address: "123 ถนนพัง แขวงลอย เขตอาถรรพ์ ลำพูน 50100",
    workingHours: "จันทร์-ศุกร์: 8:00 - 17:00 น.",
    socialMedia: [
      { name: "Instagram", icon: "bi-instagram", color: "#1E90FF", link: "/" },
      { name: "Facebook", icon: "bi-facebook", color: "#FF4500", link: "/" },
      { name: "Line", icon: "bi-line", color: "#32CD32", link: "/" },
      { name: "TikTok", icon: "bi-tiktok", color: "#1E90FF", link: "/" }
    ],
    faq: [
      {
        question: "อนิเมะคืออะไร?",
        answer: "อนิเมะ (Anime) คือการ์ตูนหรือภาพยนตร์แอนิเมชันที่มีต้นกำเนิดจากประเทศญี่ปุ่น มีเอกลักษณ์เฉพาะในด้านสไตล์และเนื้อเรื่อง"
      },
      {
        question: "จะดูอนิเมะออนไลน์ที่ไหนได้บ้าง?",
        answer: "คุณสามารถดูอนิเมะออนไลน์ได้ที่เว็บไซต์สตรีมมิ่งที่ได้รับอนุญาต เช่น Crunchyroll, Netflix, หรือแพลตฟอร์มเฉพาะของอนิเมะในแต่ละประเทศ"
      },
      {
        question: "อนิเมะมีประเภทไหนบ้าง?",
        answer: "อนิเมะแบ่งออกเป็นหลายประเภท เช่น Action, Romance, Comedy, Fantasy, Sci-Fi และอื่นๆ เพื่อให้เหมาะกับความชอบของผู้ชมแต่ละคน"
      },
      {
        question: "ฉันจะเริ่มดูอนิเมะยังไงดีสำหรับมือใหม่?",
        answer: "แนะนำให้เริ่มจากอนิเมะที่เป็นที่นิยมและเข้าใจง่าย เช่น 'Naruto', 'One Piece', หรือ 'My Hero Academia' เพื่อเรียนรู้และสนุกกับเนื้อเรื่อง"
      },
      {
        question: "ต้องมีอายุเท่าไหร่ถึงจะดูอนิเมะบางเรื่องได้?",
        answer: "อนิเมะบางเรื่องมีเรตติ้งตามอายุ เช่น PG-13 หรือ R แนะนำให้ตรวจสอบเรตติ้งก่อนดูเพื่อความเหมาะสม"
      },
      {
        question: "อนิเมะต่างจากการ์ตูนทั่วไปยังไง?",
        answer: "อนิเมะมีสไตล์การวาดและวิธีการเล่าเรื่องที่เฉพาะตัว รวมถึงเนื้อหาที่หลากหลายตั้งแต่วัยเด็กจนถึงผู้ใหญ่ แตกต่างจากการ์ตูนตะวันตกทั่วไป"
      }
    ]
  };

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="text-center mb-5" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <h1 className="display-4 fw-bold mb-3" style={{ color: colors.form.activeBg, letterSpacing: '1px' }}>ติดต่อเรา</h1>
        <p className="lead mb-4" style={{ maxWidth: '600px', margin: '0 auto', color: 'white' }}>
          มีคำถามหรือข้อสงสัย? ติดต่อเราได้ตลอดเวลา เรายินดีให้คำปรึกษาและช่วยเหลือคุณ
        </p>
        <div className="d-flex justify-content-center gap-3 mb-4">
          {contactInfo.socialMedia.map((social, index) => (
              <Link key={index} href={social.link} className="text-decoration-none">
              <div style={{ 
                width: '50px', 
                height: '50px', 
                background: social.color, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}>
                <i className={`bi ${social.icon} fs-4 text-white`}></i>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="row mb-4">
        <div className="col-12">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
            <button 
              className={`nav-link ${activeMethod === 'form' ? 'active' : ''}`} 
              onClick={() => setActiveMethod('form')}
              style={{ 
                background: activeMethod === 'form' ? colors.form.activeBg : 'transparent',
                color: activeMethod === 'form' ? 'white' : 'rgba(255,255,255,0.7)',
                borderRadius: '30px',
                padding: '10px 20px',
                margin: '0 5px',
                border: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <i className="bi bi-envelope-fill me-2"></i>
              ส่งข้อความ
            </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeMethod === 'info' ? 'active' : ''}`} 
                onClick={() => setActiveMethod('info')}
                style={{ 
                  background: activeMethod === 'info' ? colors.info.activeBg : 'transparent',
                  color: activeMethod === 'info' ? 'white' : 'rgba(255,255,255,0.7)',
                  borderRadius: '30px',
                  padding: '10px 20px',
                  margin: '0 5px',
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="bi bi-info-circle-fill me-2"></i>
                ข้อมูลติดต่อ
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeMethod === 'faq' ? 'active' : ''}`} 
                onClick={() => setActiveMethod('faq')}
                style={{ 
                  background: activeMethod === 'faq' ? colors.faq.activeBg : 'transparent',
                  color: activeMethod === 'faq' ? 'white' : 'rgba(255,255,255,0.7)',
                  borderRadius: '30px',
                  padding: '10px 20px',
                  margin: '0 5px',
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="bi bi-question-circle-fill me-2"></i>
                คำถามที่พบบ่อย
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Content */}
      <div className="row">
        <div className="col-12">
          <div className="p-5 rounded-4 shadow-sm" style={{ 
            background: colors[activeMethod].bg,
            minHeight: '400px',
            transition: 'background 0.3s ease'
          }}>
            {/* Form Tab */}
            {activeMethod === 'form' && (
              <div className="row">
                <div className="col-lg-6 mb-4 mb-lg-0">
                  <div className="p-4">
                    <h3 className="mb-4" style={{ color: colors.form.activeBg }}>
                      <i className="bi bi-chat-heart-fill me-2"></i>
                      ส่งข้อความถึงเรา
                    </h3>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">ชื่อ</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">อีเมล</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="subject" className="form-label">หัวข้อ</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="subject" 
                          name="subject" 
                          value={formData.subject} 
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="message" className="form-label">ข้อความ</label>
                        <textarea 
                          className="form-control" 
                          id="message" 
                          name="message" 
                          rows="5" 
                          value={formData.message} 
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <button 
                        type="submit" 
                        className="btn px-4 py-2" 
                        style={{ 
                          background: colors.form.activeBg, 
                          color: 'white', 
                          borderRadius: '30px',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        ส่งข้อความ
                      </button>
                    </form>
                  </div>
                </div>

                {/* Image */}
                <div className="col-lg-6 d-flex align-items-center justify-content-center">
                  <div 
                    style={{
                      width: '280px',
                      height: '280px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '5px solid #1E90FF',  
                      boxShadow: '0 0 20px rgba(30, 144, 255, 0.6)',  
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#fff'
                    }}
                  >
                    <Image
                      src="/logo.jpg"
                      alt="Contact Us"
                      width={280}
                      height={280}
                      style={{ objectFit: 'cover' }}
                      priority={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Info Tab */}
            {activeMethod === 'info' && (
              <div>
                <h3 className="mb-4" style={{ color: colors.info.activeBg }}>
                  <i className="bi bi-info-circle-fill me-2"></i>
                  ข้อมูลติดต่อ
                </h3>
                <p><strong>อีเมล:</strong> {contactInfo.email}</p>
                <p><strong>โทรศัพท์:</strong> {contactInfo.phone}</p>
                <p><strong>ที่อยู่:</strong> {contactInfo.address}</p>
                <p><strong>เวลาทำการ:</strong> {contactInfo.workingHours}</p>
                <div className="d-flex gap-3 mt-3">
                  {contactInfo.socialMedia.map((social, idx) => (
                    <Link key={idx} href={social.link} className="text-decoration-none">
                      <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        background: social.color, 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                      }}>
                        <i className={`bi ${social.icon} fs-4 text-white`}></i>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Tab */}
            {activeMethod === 'faq' && (
              <div>
                <h3 className="mb-4" style={{ color: colors.faq.activeBg }}>
                  <i className="bi bi-question-circle-fill me-2"></i>
                  คำถามที่พบบ่อย
                </h3>
                <div className="accordion" id="faqAccordion">
                  {contactInfo.faq.map((item, index) => (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <button 
                          className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`} 
                          type="button" 
                          data-bs-toggle="collapse" 
                          data-bs-target={`#collapse${index}`} 
                          aria-expanded={index === 0 ? "true" : "false"} 
                          aria-controls={`collapse${index}`}
                          style={{ cursor: 'pointer' }}
                        >
                          {item.question}
                        </button>
                      </h2>
                      <div 
                        id={`collapse${index}`} 
                        className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                        aria-labelledby={`heading${index}`} 
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
