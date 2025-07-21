"use client";
import { useState } from 'react';

export default function register () {
const [formData, setFormData] = useState({
    username: '',
    password: '',
    prefix: '',
    firstname: '',
    lastname: '',
    address: '',
    gender: '',
    birthdate: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = 'กรุณากรอกชื่อผู้ใช้';
    if (!formData.password) newErrors.password = 'กรุณากรอกรหัสผ่าน';
    if (!formData.prefix) newErrors.prefix = 'กรุณาเลือกคำนำหน้า';
    if (!formData.firstname) newErrors.firstname = 'กรุณากรอกชื่อ';
    if (!formData.lastname) newErrors.lastname = 'กรุณากรอกนามสกุล';
    if (!formData.address) newErrors.address = 'กรุณากรอกที่อยู่';
    if (!formData.gender) newErrors.gender = 'กรุณาเลือกเพศ';
    if (!formData.birthdate) newErrors.birthdate = 'กรุณาเลือกวันเกิด';
    if (!formData.terms) newErrors.terms = 'คุณต้องยอมรับเงื่อนไขก่อน';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert('ส่งฟอร์มสำเร็จ');
      console.log(formData);
    
    }
  };


    return (
 <div className="container"     
 style={{ 
      maxWidth                          : '400px',
      padding                           : '20px',
      margin                            : '0 auto',
      marginTop                         : '100px',
      marginBottom                      : '100px'
    }}>
    <form onSubmit={handleSubmit}
    className="p-4 border border-dark rounded"
        style={{ width: '100%', maxWidth: '400px',     
        backgroundImage: 'url("https://i.pinimg.com/736x/d4/c3/f7/d4c3f7bc082d1ffffde14dc358b38f8b.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        boxShadow: '0 0 15px rgba(0, 0, 0, 6)',
        borderRadius: '20px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 6)'}}>               
         <h1 className="text-center textwhitek mb-4" style={{ fontWeight: 'bold' }}>
                    สมัครสมาชิก
                </h1>
    

        <div className="mb-3 text-start">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'border border-danger' : ''}`}
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="โปรดกรอกชื่อผู้ใช้"
          />
          {errors.username && <div className="text-danger">{errors.username}</div>}
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'border border-danger' : ''}`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="กรุณาตั้งรหัสผ่าน"
          />
           {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>

<div className="mb-3 text-start position-relative">
  <label htmlFor="prefix" className="form-label">
    คำนำหน้าชื่อ
  </label>

  <div className="position-relative">
    <select
      id="prefix"
      name="prefix"
      className={`form-control ${errors.select ? 'border border-danger' : ''} pe-5`} 
      value={formData.prefix}
      onChange={handleChange}
    >
      <option value="" disabled>
        เลือกคำนำหน้า
      </option>
      <option value="1">นาย</option>
      <option value="2">นาง</option>
      <option value="3">นางสาว</option>
    </select>

    
    <i className="bi bi-chevron-down position-absolute top-50 end-0 translate-middle-y me-3 pointer-events-none" style={{ cursor: 'pointer', color: 'black' }}></i>
               {errors.select && <div className="text-danger">{errors.select}</div>}
  </div>

  {errors.prefix && <div className="text-danger">{errors.prefix}</div>}
  </div>


        <div className="mb-3 text-start">
          <label htmlFor="firstname" className="form-label">
            ชื่อของคุณ
          </label>
          <input
            type="text"
            className={`form-control ${errors.firstname ? 'border border-danger' : ''}`}
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="กรุณากรอกชื่อของคุณ"
          />
           {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="lastname" className="form-label">
            นามสกุลของคุณ
          </label>
          <input
            type="text"
            className={`form-control ${errors.lastname ? 'border border-danger' : ''}`}
            id="lasttname"
             name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="กรุณากรอกนามสกุลของคุณ"
          />
            {errors.lastname && <div className="text-danger">{errors.lastname}</div>}
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            ที่อยู่ของคุณ
          </label>
            <textarea             className={`form-control ${errors.address ? 'border border-danger' : ''}`}
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            placeholder="กรุณากรอกที่อยู่ของคุณ"/>
             {errors.address && <div className="text-danger">{errors.address}</div>}
        </div>

          <label htmlFor="gender" className="form-label">
            เพศ
          </label>

<div className="mb-3 text-start">
  

  
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      name="gender"
      id="male"
      value="male"
      checked={formData.gender === 'male'}
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="male">
      ชาย
    </label>
  </div>

  
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      name="gender"
      id="female"
      value="female"
      checked={formData.gender === 'female'}
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="female">
      หญิง
    </label>
  </div>

  
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      name="gender"
      id="other"
      value="other"
      checked={formData.gender === 'other'}
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="other">
      อื่น ๆ
    </label>
  </div>

  
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      name="gender"
      id="none"
      value="none"
      checked={formData.gender === 'none'}
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="none">
      ไม่ระบุ
    </label>
  </div>
  {errors.gender && <div className="text-danger">{errors.gender}</div>}
</div>
    
        <div className="mb-3 text-start">
          <label htmlFor="birthdate" className="form-label">
            วันเกิด
          </label>
          <input
            type="date"
            className={`form-control ${errors.birthdate ? 'border border-danger' : ''}`}
            id="birthdate"
             name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            aria-label="วันเกิด"
          />
           {errors.birthdate && <div className="text-danger">{errors.birthdate}</div>}
        </div>
        
          <div className="mb-3 form-check text-start">
          <input
            type="checkbox"
            className="form-check-input"
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="terms">
            ฉันยอมรับเงื่อนไขและข้อตกลง
          </label>
            {errors.terms && <div className="text-danger">{errors.terms}</div>}
        </div>

        <div className="d-grid">
  <button type="submit" className="btn btn-primary">
    ลงทะเบียน
  </button>
</div>

    </form>
 </div>
    )
}