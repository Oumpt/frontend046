'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2'; // ✅ นำเข้า Swal สำหรับแจ้งเตือน

export default function OverviewPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: 0,
    totalUsers: 0,
    activeUsers: 0,
    totalSales: 0 
  });
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false); // ✅ เพิ่ม state เช็คสิทธิ์
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend046.vercel.app/api/';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // ✅ ดึง role มาเช็ค

    if (!token) {
      router.push('/login');
      return;
    }

    // 🔒 ระบบป้องกัน: ถ้าไม่ใช่ admin ให้ดีดออก
    if (role !== 'admin') {
      Swal.fire({
        icon: 'error',
        title: '접근 거부 (Access Denied)',
        text: 'เฉพาะผู้ดูแลระบบเท่านั้นที่เข้าถึงหน้านี้ได้',
        confirmButtonColor: '#d33',
      }).then(() => {
        router.push('/'); // ✅ ดีดกลับหน้าแรก
      });
      return;
    }

    setIsAuthorized(true); // ✅ อนุญาตให้เข้าถึงข้อมูล
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [resProd, resUser, resSales] = await Promise.all([
        fetch(`${API_URL}/products`, { headers }),
        fetch(`${API_URL}/users`, { headers }),
        fetch(`${API_URL}/sales`, { headers }) 
      ]);

      const products = await resProd.json();
      const users = await resUser.json();
      const sales = await resSales.json(); 

      const totalValue = Array.isArray(products) ? products.reduce((acc, p) => acc + (p.price * p.quantity), 0) : 0;
      const lowStockCount = Array.isArray(products) ? products.filter(p => p.quantity <= p.min_stock).length : 0;
      const activeUsersCount = Array.isArray(users) ? users.filter(u => u.status === 'active').length : 0;
      
      const totalSalesSum = Array.isArray(sales) ? sales.reduce((acc, s) => acc + parseFloat(s.total_price), 0) : 0;

      setStats({
        totalProducts: Array.isArray(products) ? products.length : 0,
        totalValue: totalValue,
        lowStock: lowStockCount,
        totalUsers: Array.isArray(users) ? users.length : 0,
        activeUsers: activeUsersCount,
        totalSales: totalSalesSum 
      });

    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ถ้ายังโหลดอยู่ หรือไม่ใช่ admin ไม่ต้องเรนเดอร์ HTML
  if (loading || !isAuthorized) return null;

  return (
    <div className="min-vh-100 w-100" style={{ paddingTop: '120px', paddingBottom: '50px' }}>
      <div className="container">
        <div className="mb-5 text-center text-md-start">
          <h1 className="fw-bold text-white mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>🚀 Command Center</h1>
          <p className="text-white-50">ภาพรวมระบบ (Real-time Business Sync)</p>
        </div>

        <div className="row g-4 mb-5">
          {[
            { label: 'สินค้าทั้งหมด', value: `${stats.totalProducts} รายการ`, icon: '📦', color: 'text-primary', link: '/admin/products', btnText: 'จัดการคลัง' },
            { label: 'รายได้จากการขายจริง', value: `${stats.totalSales.toLocaleString()} ฿`, icon: '💰', color: 'text-success', link: '/admin/sales-report', btnText: 'ดูรายงานยอดขาย' },
            { label: 'สินค้าสต็อกต่ำ', value: `${stats.lowStock} รายการ`, icon: '⚠️', color: 'text-danger', link: '/admin/products', btnText: 'เช็คสต็อก' },
            { label: 'ทีมแอดมิน', value: `${stats.totalUsers} ท่าน`, icon: '👥', color: 'text-info', link: '/admin/users', btnText: 'จัดการทีม' }
          ].map((item, idx) => (
            <div className="col-12 col-md-6 col-lg-3" key={idx}>
              <div className="p-4 h-100 shadow-lg" 
                style={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.1)", 
                  backdropFilter: "blur(15px)", 
                  WebkitBackdropFilter: "blur(15px)",
                  borderRadius: "25px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)"
                }}
              >
                <div className="fs-3 mb-2">{item.icon}</div>
                <small className="text-white-50 d-block mb-1">{item.label}</small>
                <h3 className={`fw-bold mb-0 ${item.color}`}>{item.value}</h3>
                {item.link && (
                  <Link href={item.link} className="btn btn-sm mt-3 w-100 rounded-pill border-white border-opacity-25 text-white" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    {item.btnText}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12">
            <div className="p-5 text-center shadow-lg" 
              style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(20px)",
                borderRadius: "35px",
                border: "1px solid rgba(255, 255, 255, 0.15)"
              }}>
              <h2 className="text-white fw-bold mb-3">ยินดีต้อนรับเข้าสู่ระบบจัดการร้าน</h2>
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                <Link href="/admin/pos" className="btn btn-success px-5 py-3 rounded-pill fw-bold shadow">
                  เปิดเครื่องขาย POS 🛒
                </Link>
                <Link href="/admin/products" className="btn btn-primary px-5 py-3 rounded-pill fw-bold shadow">
                  เข้าสู่หน้าคลังสินค้า 📦
                </Link>
                <Link href="/admin/sales-report" className="btn btn-warning px-5 py-3 rounded-pill fw-bold shadow text-dark">
                  ดูรายงานยอดขาย 📜
                </Link>
                <Link href="/admin/users" className="btn btn-outline-light px-5 py-3 rounded-pill fw-bold border-opacity-50">
                  จัดการแอดมิน 👥
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}