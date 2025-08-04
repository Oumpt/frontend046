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
    fullname: "",
    address: "",
    gender: "",
    birthdate: "",
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
    if (!formData.fullname) newErrors.fullname = "กรุณากรอกชื่อเต็ม";
    if (!formData.address) newErrors.address = "กรุณากรอกที่อยู่";
    if (!formData.gender) newErrors.gender = "กรุณาเลือกเพศ";
    if (!formData.birthdate) newErrors.birthdate = "กรุณาเลือกวันเกิด";
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
    setErrors({});

    // 🔧 แก้ตรงนี้: แปลงค่า gender จากภาษาไทยเป็นค่าที่เซิร์ฟเวอร์รับได้
    const mapGenderToApi = {
      ชาย: "male",
      หญิง: "female",
      "อื่น ๆ": "other",
      "ไม่ระบุ": "none",
    };

    const submitData = {
      username: formData.username,
      password: formData.password,
      prefix: formData.prefix,
      firstname: formData.firstname,
      lastname: formData.lastname,
      fullname: formData.fullname,
      address: formData.address,
      sex: mapGenderToApi[formData.gender] || "", // แปลงค่าเพศเป็น api format
      birthday: formData.birthdate,
    };

    try {
      const res = await fetch("http://itdev.cmtc.ac.th:3000/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!res.ok) throw new Error("เกิดข้อผิดพลาดในการส่งข้อมูล");

      const result = await res.json();
      console.log(result);

      await Swal.fire({
        icon: "success",
        title: "สมัครสมาชิกสำเร็จ!",
        text: "กำลังพาท่านไปยังหน้าเข้าสู่ระบบ...",
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/login");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message || "ไม่สามารถส่งข้อมูลได้",
      });
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "400px",
        padding: "20px",
        margin: "0 auto",
        marginTop: "100px",
        marginBottom: "100px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4 border border-dark rounded"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundImage:
            'url("https://i.pinimg.com/736x/d4/c3/f7/d4c3f7bc082d1ffffde14dc358b38f8b.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.6)",
          borderRadius: "20px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
        }}
      >
        <h1 className="text-center textwhitek mb-4" style={{ fontWeight: "bold" }}>
          สมัครสมาชิก
        </h1>

        {/* Username */}
        <div className="mb-3 text-start">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.username ? "border border-danger" : ""
            }`}
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="โปรดกรอกชื่อผู้ใช้"
          />
          {errors.username && <div className="text-danger">{errors.username}</div>}
        </div>

        {/* Password */}
        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${
              errors.password ? "border border-danger" : ""
            }`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="กรุณาตั้งรหัสผ่าน"
          />
          {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>

        {/* Prefix */}
        <div className="mb-3 text-start position-relative">
          <label htmlFor="prefix" className="form-label">
            คำนำหน้าชื่อ
          </label>
          <select
            id="prefix"
            name="prefix"
            className={`form-control ${
              errors.prefix ? "border border-danger" : ""
            }  pe-5`}
            value={formData.prefix}
            onChange={handleChange}
          >
            <option value="" disabled>
              เลือกคำนำหน้า
            </option>
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
          </select>
          {errors.prefix && <div className="text-danger">{errors.prefix}</div>}
        </div>

        {/* Firstname */}
        <div className="mb-3 text-start">
          <label htmlFor="firstname" className="form-label">
            ชื่อของคุณ
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.firstname ? "border border-danger" : ""
            }`}
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="กรุณากรอกชื่อของคุณ"
          />
          {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
        </div>

        {/* Lastname */}
        <div className="mb-3 text-start">
          <label htmlFor="lastname" className="form-label">
            นามสกุลของคุณ
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.lastname ? "border border-danger" : ""
            }`}
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="กรุณากรอกนามสกุลของคุณ"
          />
          {errors.lastname && <div className="text-danger">{errors.lastname}</div>}
        </div>

        {/* Fullname */}
        <div className="mb-3 text-start">
          <label htmlFor="fullname" className="form-label">
            ชื่อเต็ม
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.fullname ? "border border-danger" : ""
            }`}
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="กรุณากรอกชื่อเต็ม"
          />
          {errors.fullname && <div className="text-danger">{errors.fullname}</div>}
        </div>

        {/* Address */}
        <div className="mb-3 text-start">
          <label htmlFor="address" className="form-label">
            ที่อยู่ของคุณ
          </label>
          <textarea
            className={`form-control ${
              errors.address ? "border border-danger" : ""
            }`}
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            placeholder="กรุณากรอกที่อยู่ของคุณ"
          />
          {errors.address && <div className="text-danger">{errors.address}</div>}
        </div>

        {/* Gender */}
        <label htmlFor="gender" className="form-label">
          เพศ
        </label>
        <div className="mb-3 text-start">
          {["ชาย", "หญิง", "อื่น ๆ", "ไม่ระบุ"].map((genderOption) => (
            <div className="form-check form-check-inline" key={genderOption}>
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id={genderOption}
                value={genderOption}
                checked={formData.gender === genderOption}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor={genderOption}>
                {genderOption}
              </label>
            </div>
          ))}
          {errors.gender && <div className="text-danger">{errors.gender}</div>}
        </div>

        {/* Birthdate */}
        <div className="mb-3 text-start">
          <label htmlFor="birthdate" className="form-label">
            วันเกิด
          </label>
          <input
            type="date"
            className={`form-control ${
              errors.birthdate ? "border border-danger" : ""
            }`}
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            aria-label="วันเกิด"
          />
          {errors.birthdate && <div className="text-danger">{errors.birthdate}</div>}
        </div>

        {/* Terms */}
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

        {/* Submit Button */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            ลงทะเบียน
          </button>
        </div>
      </form>
    </div>
  );
}
