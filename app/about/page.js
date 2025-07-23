'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function AboutAnime() {
  const [activeTab, setActiveTab] = useState('story');
  const [storySubTab, setStorySubTab] = useState('start');

  const personalInfo = {
    name: "Pongthep Lungya",
    nickname: "นักรีวิวมั้ง",
    role: "ผู้แนะนำอนิเมะทุกเคยดู",
    bio: "จริงๆ แล้วใครๆ ก็เปิดใจดูอนิเมะได้ไม่ยากเลยนะครับ เพราะมันเหมือนกับหนังหรือซีรีส์ที่เราชอบดูแหละ แค่ลองเปิดใจดู เรื่องราวสนุก เข้าใจง่าย แล้วก็มีความรู้สึกหลากหลาย ให้เราได้สัมผัสกันทุกครั้งที่ดู",
    quote: "ถ้าเป็นผู้กล้าฮิมเมลก็คงทำแบบนั้น",
    skills: [
      "วิเคราะห์เป็นบ้างมั่วบ้าง",
      "รีวิวแบบไม่สปอยล์",
      "ข้าม OP/ED ทุกซีซั่น",
      "โพสต์ทุกปี",
      "ดูแต่เรื่องที่อยากดู ไม่ตามกระแส ไม่ตามอะไรทั้งนั้น บางเรื่องดองเป็น 10 ปี ถึงจะดู"
    ],
    experience: [
      { position: "นักดูมาราธอน", title: "HunterXHunter", duration: "ใช้เวลาดู 5 วัน" },
      { position: "ดูทุกตอนไม่ทราบอะไรเลย", title: "Made in Abyss", duration: "ดูได้ 3 ตอนหลับ" },
      { position: "นักดูมาราธอน2", title: "เมะทั่วไป(12 ตอน 1 ซีซั่น)", duration: "ไม่ถึงวัน..." }
    ],
    // <-- แก้ตรงนี้! ใช้ 'url' แทน 'Link' และใส่ URL จริง
    socialMedia: [
      { platform: "YouTube", handle: "Oum", icon: "bi-youtube", url: "https://youtube.com/" },
      { platform: "Twitter", handle: "@oum", icon: "bi-twitter", url: "https://twitter.com/" }
    ]
  };

  const tabs = [
    { id: 'story', label: 'เรื่องของผมมม', icon: 'bi-book' },
    { id: 'skills', label: 'สกิลรีวิว', icon: 'bi-stars' },
    { id: 'experience', label: 'ประสบการณ์', icon: 'bi-briefcase' },
  ];

  const storyContents = {
    start: {
      title: "จุดเริ่มต้น",
      content: `ผมเริ่มดูอนิเมะตั้งแต่เด็ก ๆ โดยเริ่มจากการตื่นเช้ามาดูช่อง 9 ทุกวันหยุดแต่พอวันจันทร์ไม่เคยตื่นเช้าเลยสักครั้ง555`,
    },
    inspiration: {
      title: "แรงบันดาลใจ",
      content: `แรงบันดาลใจของผมมาจากอนิเมะที่ทำให้ผมเข้าใจชีวิตและความรู้สึกมากขึ้น ว่าเราไม่ควรแคร์ใครทั้งนั้น นอกจากแป้งแคร์ และ ดอกแคร์ แผ่ม!`,
    },
    present: {
      title: "ปัจจุบัน",
      content: `ตอนนี้ผมใช้เวลาส่วนใหญ่ในการรีวิวและแนะนำอนิเมะให้กับทุกคนผ่านช่องทางต่าง ๆ และยังคงหาเวลาที่มีอันน้อยนิดไปดูเมะ แม้ว่าจะต้องมานั่งทำเว็บ55555`,
    },
  };

  return (
    <div style={{
      background: 'transparent',
      color: '#EEE',
      fontFamily: 'Noto Sans JP, sans-serif',
      minHeight: '100vh',
      padding: '6rem 2rem 2rem',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '220px', height: '220px', flexShrink: 0 }}>
          <Image
            src="/logo.jpg"
            alt={personalInfo.name}
            fill
            style={{ objectFit: 'cover', borderRadius: '50%', border: '4px solid #C62828' }}
          />
        </div>
        <div style={{ flex: '1 1 280px', minWidth: '280px' }}>
          <h1 style={{
            fontFamily: 'Zen Kaku Gothic New, sans-serif',
            color: '#FFF',          
            fontSize: '2.5rem',
            marginBottom: '0.25rem',
            fontWeight: 'bold'       
          }}>
            {personalInfo.name}
          </h1>
          <h3 style={{
            fontFamily: 'Zen Kaku Gothic New, sans-serif',
            color: '#BBB', margin: '0.5rem 0 1rem',
            fontWeight: '500',
          }}>
            "{personalInfo.nickname}" – {personalInfo.role}
          </h3>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>{personalInfo.bio}</p>
          <p style={{ fontStyle: 'italic', margin: '1rem 0', fontSize: '1.1rem', color: '#DDD' }}>
            “{personalInfo.quote}”
          </p>

          {/* Social Media - ไฮไลท์ตรงนี้ */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {personalInfo.socialMedia.map((s, i) => (
              <a
                key={i}
                href={s.url}           
                  target="_blank"                 
                  rel="noopener noreferrer"                  
                style={{
                  width: '40px',
                  height: '40px',
                  background: '#222',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EEE',
                  fontSize: '1.2rem',
                  textDecoration: 'none',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#C62828'}
                onMouseLeave={e => e.currentTarget.style.background = '#222'}
                aria-label={s.platform}
              >
                <i className={`bi ${s.icon}`}></i>
              </a>
            ))}
          </div>
          {/* จบ Social Media */}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ margin: '3rem 0 2rem' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? '#C62828' : 'transparent',
              color: activeTab === tab.id ? '#FFF' : '#BBB',
              border: 'none',
              borderRadius: '30px',
              padding: '0.6rem 1.2rem',
              marginRight: '0.5rem',
              fontFamily: 'Zen Kaku Gothic New, sans-serif',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'background 0.3s ease, color 0.3s ease',
              userSelect: 'none',
            }}
            aria-pressed={activeTab === tab.id}
          >
            <i className={`bi ${tab.icon}`}></i> {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ width: '100%' }}>
        {activeTab === 'story' && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            color: '#EEE',
            textAlign: 'left',
          }}>
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {Object.entries(storyContents).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setStorySubTab(key)}
                  style={{
                    background: storySubTab === key ? '#C62828' : 'transparent',
                    color: storySubTab === key ? '#FFF' : '#BBB',
                    border: 'none',
                    borderRadius: '30px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontFamily: 'Zen Kaku Gothic New, sans-serif',
                    userSelect: 'none',
                    transition: 'background 0.3s ease, color 0.3s ease',
                  }}
                  aria-pressed={storySubTab === key}
                >
                  {val.title}
                </button>
              ))}
            </div>
            <div style={{ minHeight: '150px' }}>
              <p>{storyContents[storySubTab].content}</p>
            </div>
          </div>
        )}
        {activeTab === 'skills' && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            minHeight: '150px',
            color: '#EEE',
            textAlign: 'left',
          }}>
            <ul style={{ paddingLeft: '1.2rem' }}>
              {personalInfo.skills.map((s, i) => (
                <li key={i} style={{ margin: '0.6rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="bi bi-check-circle-fill" style={{ color: '#C62828' }}></i>{s}
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'experience' && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.6)',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            minHeight: '150px',
            color: '#EEE',
            textAlign: 'left',
          }}>
            <ul style={{ paddingLeft: '1.2rem' }}>
              {personalInfo.experience.map((exp, i) => (
                <li key={i} style={{ margin: '0.6rem 0' }}>
                  <strong>{exp.position}</strong> - {exp.title} <em>({exp.duration})</em>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
