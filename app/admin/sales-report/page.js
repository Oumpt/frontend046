'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function SalesReportPage() {
  const [sales, setSales] = useState([]);
  const [summary, setSummary] = useState({ daily: 0, totalOrders: 0 });
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const getApiUrl = (endpoint = '') => {
    const base = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
      ? 'http://localhost:5000' 
      : 'https://backend046.vercel.app';
    return `${base}/api/sales${endpoint}`;
  };

  const displayThaiDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    date.setHours(date.getHours() + 7);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear() + 543}`;
  };

  const displayThaiTime = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    date.setHours(date.getHours() + 7);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const fetchSales = async () => {
    try {
      const res = await fetch(getApiUrl(), {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setSales(data);
        calculateSummary(data);
      }
    } catch (error) { console.error(error); }
  };

  const calculateSummary = (allSales) => {
    const todayStr = new Date().toLocaleDateString('en-CA');
    const todaySales = allSales.filter(s => {
      const sDate = new Date(s.sale_date);
      sDate.setHours(sDate.getHours() + 7);
      return sDate.toLocaleDateString('en-CA') === todayStr;
    });
    setSummary({ daily: todaySales.reduce((acc, curr) => acc + parseFloat(curr.total_price), 0), totalOrders: todaySales.length });
  };

  const showDetail = async (sale) => {
    const res = await fetch(getApiUrl(`/${sale.id}/items`), {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const items = await res.json();
    const itemsHtml = items.map(item => `
        <div class="d-flex justify-content-between border-bottom border-secondary border-opacity-25 py-2">
            <span>${item.product_name} x ${item.quantity}</span>
            <span class="text-warning">${(item.price_at_sale * item.quantity).toLocaleString()} ฿</span>
        </div>`).join('');

    Swal.fire({
        title: `บิล #${sale.id}`,
        html: `<div class="text-start">${itemsHtml}</div><h4 class="text-end text-success mt-3">รวม: ${parseFloat(sale.total_price).toLocaleString()} ฿</h4>`,
        background: '#1a1a1a', color: '#fff'
    });
  };

  // ✅ ปรับปรุงส่วนนี้: เลือกได้ว่าจะคืนสต็อกหรือไม่
  const handleDelete = async (id) => {
    const { value: formValues } = await Swal.fire({
      title: '🔐 ยืนยันตัวตนเพื่อลบ',
      html: `
        <input id="swal-user" class="swal2-input" placeholder="Username">
        <input id="swal-pass" type="password" class="swal2-input" placeholder="Password">
        <div class="mt-3 text-start px-4" style="font-size: 0.9rem;">
          <label class="d-block mb-2 text-secondary">ตัวเลือกสต็อกสินค้า:</label>
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="stockOption" id="restore" value="true" checked>
            <label class="form-check-label text-white" for="restore">คืนสินค้าเข้าคลัง (+)</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="stockOption" id="no-restore" value="false">
            <label class="form-check-label text-white-50" for="no-restore">ไม่คืนสินค้า (ลบประวัติอย่างเดียว)</label>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'ยืนยันการลบ',
      confirmButtonColor: '#d33',
      background: '#1a1a1a',
      color: '#fff',
      preConfirm: () => {
        const username = document.getElementById('swal-user').value;
        const password = document.getElementById('swal-pass').value;
        const restoreStock = document.querySelector('input[name="stockOption"]:checked').value === 'true';
        
        if (!username || !password) {
          Swal.showValidationMessage('กรุณากรอกข้อมูลให้ครบถ้วน');
        }
        return { username, password, restoreStock };
      }
    });

    if (formValues) {
      try {
        const res = await fetch(getApiUrl(`/${id}`), {
          method: 'DELETE',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          },
          body: JSON.stringify(formValues) // ส่ง username, password และ restoreStock ไปที่ backend
        });
        
        const data = await res.json();
        if (data.success) {
          Swal.fire({ title: 'สำเร็จ!', text: data.message, icon: 'success', timer: 1500 });
          fetchSales();
        } else {
          Swal.fire('ล้มเหลว', data.message, 'error');
        }
      } catch (err) {
        Swal.fire('ผิดพลาด', 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้', 'error');
      }
    }
  };

  useEffect(() => { setMounted(true); fetchSales(); }, []);
  if (!mounted) return null;

  return (
    <div className="min-vh-100 text-white" style={{ background: '#0a0a0a', paddingTop: '100px' }}>
      <div className="container">
        <div className="d-flex justify-content-between mb-5">
          <h2 className="text-primary fw-bold">📊 รายงานยอดขาย</h2>
          <button className="btn btn-outline-info rounded-pill" onClick={fetchSales}>🔄 รีเฟรช</button>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-6"><div className="p-4 rounded-4 border border-success border-opacity-20 bg-dark">
            <small className="text-secondary uppercase fw-bold">ยอดขายวันนี้</small>
            <h1 className="text-success fw-bold">฿ {summary.daily.toLocaleString()}</h1>
          </div></div>
          <div className="col-md-6"><div className="p-4 rounded-4 border border-primary border-opacity-20 bg-dark">
            <small className="text-secondary uppercase fw-bold">จำนวนออเดอร์</small>
            <h1 className="text-primary fw-bold">{summary.totalOrders} รายการ</h1>
          </div></div>
        </div>

        <div className="p-4 rounded-4 bg-dark border border-secondary border-opacity-10 shadow-lg">
          <h4 className="mb-4">ประวัติการขายล่าสุด</h4>
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead><tr className="text-secondary small"><th>ID</th><th>วันที่</th><th>เวลา</th><th className="text-end">ยอดรวม</th><th className="text-center">จัดการ</th></tr></thead>
              <tbody>
                {sales.map(sale => (
                  <tr key={sale.id}>
                    <td className="text-secondary">#{sale.id}</td>
                    <td>{displayThaiDate(sale.sale_date)}</td>
                    <td className="text-info">{displayThaiTime(sale.sale_date)} น.</td>
                    <td className="text-end fw-bold text-warning">฿ {parseFloat(sale.total_price).toLocaleString()}</td>
                    <td className="text-center">
                      <div className="d-flex gap-2 justify-content-center">
                        <button className="btn btn-sm btn-outline-info rounded-pill" onClick={() => showDetail(sale)}>ดูรายละเอียด</button>
                        <button className="btn btn-sm btn-outline-danger rounded-pill" onClick={() => handleDelete(sale.id)}>ลบ</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}