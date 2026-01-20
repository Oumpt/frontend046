"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    prefix: "", 
    firstname: "",
    lastname: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "กรุณากรอกชื่อผู้ใช้";
    if (!formData.password) newErrors.password = "กรุณากรอกรหัสผ่าน";
    if (!formData.prefix) newErrors.prefix = "กรุณาเลือกคำนำหน้า";
    if (!formData.firstname) newErrors.firstname = "กรุณากรอกชื่อ";
    if (!formData.lastname) newErrors.lastname = "กรุณากรอกนามสกุล";
    if (!formData.terms) newErrors.terms = "คุณต้องยอมรับเงื่อนไขก่อน";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const submitData = {
      username: formData.username,
      password: formData.password,
      firstname: formData.firstname,
      lastname: formData.lastname,
      fullname: `${formData.prefix}${formData.firstname} ${formData.lastname}`,
    };

    try {
      const apiUrl = "https://backend046.vercel.app/api/auth/register";
      
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        await Swal.fire({
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ!",
          text: "บัญชีพนักงานของคุณถูกสร้างแล้ว สามารถเข้าสู่ระบบได้ทันที",
          timer: 2000,
          showConfirmButton: false,
        });
        router.push("/login");
      } else {
        throw new Error(result.error || "ไม่สามารถสมัครสมาชิกได้");
      }
    } catch (error) {
      console.error("Register error:", error);
      Swal.fire({ 
        icon: "error", 
        title: "สมัครสมาชิกไม่สำเร็จ", 
        text: error.message 
      });
    }
  };

  return (
    // ✅ ปรับ margin-top จาก 80px เป็น 120px เพื่อขยับฟอร์มลงมา
    <div className="container" style={{ maxWidth: "450px", margin: "120px auto" }}>
      <form onSubmit={handleSubmit} className="p-4 border border-dark rounded shadow-lg" style={{ 
        backgroundImage: 'url("https://i.pinimg.com/736x/d4/c3/f7/d4c3f7bc082d1ffffde14dc358b38f8b.jpg")', 
        backgroundSize: "cover", 
        backgroundPosition: "center",
        color: "#fff", 
        borderRadius: "20px", 
        boxShadow: "0 0 20px rgba(0,0,0,0.6)" 
      }}>
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>สมัครสมาชิก</h2>
        
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input 
            name="username" 
            className={`form-control ${errors.username ? 'is-invalid' : ''}`} 
            onChange={handleChange} 
            placeholder="ตั้งชื่อผู้ใช้ของคุณ"
          />
          {errors.username && <div className="invalid-feedback text-warning">{errors.username}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            name="password" 
            type="password" 
            className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
            onChange={handleChange} 
            placeholder="ตั้งรหัสผ่าน"
          />
          {errors.password && <div className="invalid-feedback text-warning">{errors.password}</div>}
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.3)" }} />

        <div className="mb-3">
          <label className="form-label">คำนำหน้าชื่อ</label>
          <select 
            name="prefix" 
            className={`form-select ${errors.prefix ? 'is-invalid' : ''}`} 
            onChange={handleChange} 
            value={formData.prefix}
          >
            <option value="">-- เลือก --</option>
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
          </select>
          {errors.prefix && <div className="invalid-feedback text-warning">{errors.prefix}</div>}
        </div>

        <div className="row">
          <div className="col-6 mb-3">
            <label className="form-label">ชื่อจริง</label>
            <input 
              name="firstname" 
              className={`form-control ${errors.firstname ? 'is-invalid' : ''}`} 
              onChange={handleChange} 
              placeholder="ไม่ต้องมีคำนำหน้า"
            />
            {errors.firstname && <div className="invalid-feedback text-warning">{errors.firstname}</div>}
          </div>
          <div className="col-6 mb-3">
            <label className="form-label">นามสกุล</label>
            <input 
              name="lastname" 
              className={`form-control ${errors.lastname ? 'is-invalid' : ''}`} 
              onChange={handleChange} 
            />
            {errors.lastname && <div className="invalid-feedback text-warning">{errors.lastname}</div>}
          </div>
        </div>

        <div className="mb-4 form-check">
          <input 
            type="checkbox" 
            name="terms" 
            className="form-check-input" 
            id="checkTerms" 
            onChange={handleChange} 
          />
          <label className="form-check-label" htmlFor="checkTerms" style={{ fontSize: '0.9rem' }}>
            ยอมรับเงื่อนไขการสมัครสมาชิก
          </label>
          {errors.terms && <div className="text-warning small mt-1">{errors.terms}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100 shadow-sm" style={{ fontWeight: 'bold', padding: '10px' }}>
          สร้างบัญชีผู้ใช้
        </button>

        <div className="text-center mt-3">
          <span style={{ fontSize: '0.9rem' }}>มีบัญชีอยู่แล้ว? </span>
          <button 
            type="button" 
            className="btn btn-link p-0 text-white fw-bold" 
            style={{ textDecoration: 'none', fontSize: '0.9rem' }}
            onClick={() => router.push('/login')}
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </form>
    </div>
  );
}