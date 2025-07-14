export default function register () {
    return (
 <div className="d-flex justify-content-center mt-5">
    <form className="p-4 border border-dark rounded"
        style={{ width: '100%', maxWidth: '400px' }}>               
         <h1 className="text-center text-dark mb-4" style={{ fontWeight: 'bold' }}>
                    สมัครสมาชิก
                </h1>
    

        <div className="mb-3 text-start">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="กรอก Username"
          />
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="กรอก Password"
          />
        </div>

    <div className="mb-3 text-start">
          <label htmlFor="prefix" className="form-label">
            คำนำหน้าชื่อ
          </label>
          <select
            id="prefix"
            className="form-select"
            defaultValue=""
            aria-label="คำนำหน้าชื่อ"
          >
            <option value="" disabled>
              เลือกคำนำหน้า
            </option>
            <option value="1">นาย</option>
            <option value="2">นาง</option>
            <option value="3">นางสาว</option>
          </select>
     </div>

        <div className="mb-3 text-start">
          <label htmlFor="firstname" className="form-label">
            ชื่อของคุณ
          </label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            placeholder="ชื่อของคุณ"
          />
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="lastname" className="form-label">
            นามสกุลของคุณ
          </label>
          <input
            type="text"
            className="form-control"
            id="lasttname"
            placeholder="นามสกุลของคุณ"
          />
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            ที่อยู่ของคุณ
          </label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} />
        </div>

                    <fieldset className="mb-3 text-start">
          <legend className="form-label">เพศ</legend>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
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
            />
            <label className="form-check-label" htmlFor="other">
              อื่น ๆ
            </label>
          </div>
        </fieldset>
    
        <div className="mb-3 text-start">
          <label htmlFor="birthdate" className="form-label">
            วันเกิด
          </label>
          <input
            type="date"
            className="form-control"
            id="birthdate"
            aria-label="วันเกิด"
          />
        </div>
        
                <div className="mb-3 form-check text-start">
          <input
            type="checkbox"
            className="form-check-input"
            id="terms"
          />
          <label className="form-check-label" htmlFor="terms">
            ฉันยอมรับเงื่อนไขและข้อตกลง
          </label>
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