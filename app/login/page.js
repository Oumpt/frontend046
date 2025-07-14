export default function Login() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <form
        className="p-4 border border-dark rounded"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <div className="mb-3 text-start">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder=" ชื่อของคุณ"
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder=" รหัสผ่าน"
          />
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
            จำฉันไว้
          </label>
        </div>
             
        <div className="text-center" style={{ fontSize: '0.9rem' }}>
          <a href="/register" className="me-3">สมัครสมาชิก</a>
          |
          <a href="/forgot-password" className="ms-3">ลืมรหัสผ่าน</a>
        </div>

      </form>
    </div>

  );
}