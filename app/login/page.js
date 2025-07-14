export default function Login() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <form
        className="p-4 border border-dark rounded"
     style={{ width: '100%', maxWidth: '400px',     
        backgroundImage: 'url("https://i.pinimg.com/736x/34/06/5a/34065a361094df5e01063f23e4c7d83c.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        boxShadow: '0 0 15px rgba(0, 0, 0, 6)',
        borderRadius: '20px',
        textShadow: '2px 2px 4px rgba(255, 255, 255, 6)'
}}>
        <div className="mb-3 text-start">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder=" กรุณาใส่ชื่อของท่าน"
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
            placeholder=" กรุณาใส่รหัสผ่านของท่าน"
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