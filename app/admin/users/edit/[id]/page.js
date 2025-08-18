'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstname: '',
    fullname: '',
    lastname: '',
    username: '',
    password: '',
    prefix: '',
    gender: '',
    birthdate: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`);
        const data = await res.json();
        const user = Array.isArray(data) ? data[0] : data;

        setFormData({
          firstname: user.firstname || '',
          fullname: user.fullname || '',
          lastname: user.lastname || '',
          username: user.username || '',
          password: user.password || '',
          prefix: user.prefix || '',
          gender: user.sex || '',
          birthdate: user.birthday || '',
          address: user.address || '',
        });
      } catch (err) {
        console.error(err);
      }
    }
    if (id) fetchUser();
  }, [id]);

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
    if (!formData.prefix) newErrors.prefix = 'กรุณาเลือกคำนำหน้า';
    if (!formData.firstname) newErrors.firstname = 'กรุณากรอกชื่อ';
    if (!formData.lastname) newErrors.lastname = 'กรุณากรอกนามสกุล';
    if (!formData.fullname) newErrors.fullname = 'กรุณากรอกชื่อเต็ม';
    if (!formData.address) newErrors.address = 'กรุณากรอกที่อยู่';
    if (!formData.gender) newErrors.gender = 'กรุณาเลือกเพศ';
    if (!formData.birthdate) newErrors.birthdate = 'กรุณาเลือกวันเกิด';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const submitData = {
      id,
      username: formData.username,
      password: formData.password,
      prefix: formData.prefix,
      firstname: formData.firstname,
      lastname: formData.lastname,
      fullname: formData.fullname,
      address: formData.address,
      sex: formData.gender, // ✅ ส่งเพศเป็นภาษาไทย
      birthday: formData.birthdate,
    };

    try {
      const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!res.ok) throw new Error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');

      await Swal.fire({
        icon: 'success',
        title: 'อัปเดตสมาชิกสำเร็จ!',
        timer: 2000,
        showConfirmButton: false,
      });

      router.push('/admin/users');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: error.message || 'ไม่สามารถส่งข้อมูลได้',
      });
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ paddingTop: '80px', paddingBottom: '80px', minHeight: 'calc(100vh - 160px)' }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4"
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 15px rgba(0,0,0,0.6)',
          color: '#fff',
          textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
        }}
      >
        <h2 className="text-center mb-4 fw-bold">แก้ไขสมาชิก #{id}</h2>

        {/* Prefix */}
        <div className="mb-3 text-start">
          <label htmlFor="prefix" className="form-label">
            คำนำหน้า
          </label>
          <select
            id="prefix"
            name="prefix"
            className={`form-select bg-transparent ${
              errors.prefix ? 'border border-danger' : 'border border-white/50'
            }`}
            value={formData.prefix}
            onChange={handleChange}
            required
            style={{
              color: '#000',
              backgroundColor: '#ffffffcc',
            }}
          >
            <option value="" disabled>
              เลือกคำนำหน้า
            </option>
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
          </select>
          {errors.prefix && <div className="text-danger mt-1">{errors.prefix}</div>}
        </div>

        {/* Firstname */}
        <div className="mb-3 text-start">
          <label htmlFor="firstname" className="form-label">ชื่อ</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className={`form-control bg-transparent text-white ${
              errors.firstname ? 'border border-danger' : 'border border-white/50'
            }`}
            placeholder="ชื่อ"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          {errors.firstname && <div className="text-danger mt-1">{errors.firstname}</div>}
        </div>

        {/* Lastname */}
        <div className="mb-3 text-start">
          <label htmlFor="lastname" className="form-label">นามสกุล</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className={`form-control bg-transparent text-white ${
              errors.lastname ? 'border border-danger' : 'border border-white/50'
            }`}
            placeholder="นามสกุล"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          {errors.lastname && <div className="text-danger mt-1">{errors.lastname}</div>}
        </div>

        {/* Fullname */}
        <div className="mb-3 text-start">
          <label htmlFor="fullname" className="form-label">ชื่อเต็ม</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            className={`form-control bg-transparent text-white ${
              errors.fullname ? 'border border-danger' : 'border border-white/50'
            }`}
            placeholder="ชื่อเต็ม"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
          {errors.fullname && <div className="text-danger mt-1">{errors.fullname}</div>}
        </div>

        {/* Username */}
        <div className="mb-3 text-start">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className={`form-control bg-transparent text-white ${
              errors.username ? 'border border-danger' : 'border border-white/50'
            }`}
            placeholder="ชื่อผู้ใช้"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <div className="text-danger mt-1">{errors.username}</div>}
        </div>

        {/* Password */}
        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label">รหัสผ่าน</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control bg-transparent text-white ${
              errors.password ? 'border border-danger' : 'border border-white/50'
            }`}
            placeholder="รหัสผ่าน"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="text-danger mt-1">{errors.password}</div>}
        </div>

        {/* Gender */}
        <div className="mb-3 text-start">
          <label className="form-label">เพศ</label>
          <div>
            {['ชาย', 'หญิง', 'อื่น ๆ', 'ไม่ระบุ'].map((genderOption) => (
              <div className="form-check form-check-inline" key={genderOption}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id={`gender-${genderOption}`}
                  value={genderOption}
                  checked={formData.gender === genderOption}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor={`gender-${genderOption}`}>
                  {genderOption}
                </label>
              </div>
            ))}
          </div>
          {errors.gender && <div className="text-danger mt-1">{errors.gender}</div>}
        </div>

        {/* Birthdate */}
        <div className="mb-3 text-start">
          <label htmlFor="birthdate" className="form-label">วันเกิด</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            className={`form-control bg-transparent text-white ${
              errors.birthdate ? 'border border-danger' : 'border border-white/50'
            }`}
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
          {errors.birthdate && <div className="text-danger mt-1">{errors.birthdate}</div>}
        </div>

        {/* Address */}
        <div className="mb-3 text-start">
          <label htmlFor="address" className="form-label">ที่อยู่</label>
          <textarea
            id="address"
            name="address"
            className={`form-control bg-transparent text-white ${
              errors.address ? 'border border-danger' : 'border border-white/50'
            }`}
            rows={3}
            value={formData.address}
            onChange={handleChange}
            placeholder="ที่อยู่"
            required
          />
          {errors.address && <div className="text-danger mt-1">{errors.address}</div>}
        </div>

        {/* Submit Button */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            อัปเดตข้อมูล
          </button>
        </div>
      </form>
    </div>
  );
}
