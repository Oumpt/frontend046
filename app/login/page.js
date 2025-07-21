"use client";
import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'กรุณากรอกชื่อผู้ใช้';
    if (!formData.password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
    return newErrors;
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert('เข้าสู่ระบบไม่สำเร็จจ้าเซิฟเวอร์ล็อคอินยังไม่ได้ทำ');
      console.log(formData);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5" style={{      
      maxWidth                          : '400px',
      padding                           : '20px',
      margin                            : '0 auto',
      marginTop: '100px'}}>
      <form onSubmit={handleSubmit}
        className="p-4 border border-dark rounded"
     style={{ width: '100%', maxWidth: '400px',     
        backgroundImage: 'url("https://i.pinimg.com/736x/34/06/5a/34065a361094df5e01063f23e4c7d83c.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        boxShadow: '0 0 15px rgba(0, 0, 0, 6)',
        borderRadius: '20px',
  
}}>
               <h1 className="text-center textwhitek mb-4" style={{ fontWeight: 'bold' }}>
                    เข้าสู่ระบบ
                </h1>
        <div className="mb-3 text-start">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'border border-danger' : ''}`}
            id="formGroupExampleInput"
             name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder=" กรุณาใส่ชื่อของท่าน"
          />
           {errors.username && <div className="text-danger">{errors.username}</div>}
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'border border-danger' : ''}`}
            id="formGroupExampleInput2"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder=" กรุณาใส่รหัสผ่านของท่าน"
          />
          {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          เข้าสู่ระบบ
        </button>
    

        <div className="form-check mb-3 text-start"><br></br>
          <input
            className="form-check-input"
            type="checkbox"
            id="rememberMe"
          />
          <label className="form-check-label" htmlFor="rememberMe">
            จดจำฉันไว้
          </label>
        </div>
             
        <div className="text-center" style={{ fontSize: '0.9rem' }}>
          <a href="/register" className="me-3" style={{ color: '#fff' }}>สมัครสมาชิก</a>
          |
          <a href="/forgot-password" className="ms-3" style={{ color: '#fff' }}>หากลืมรหัสผ่าน</a>
        </div>

      </form>
    </div>

  );
}