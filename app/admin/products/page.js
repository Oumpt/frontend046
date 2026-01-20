'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterMode, setFilterMode] = useState('all');
  const router = useRouter();

  // ✅ แก้ไขตรงนี้: เช็คว่าถ้าเป็น localhost ให้ใช้ 5000 ถ้าไม่ใช่ให้ใช้ Vercel
  const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/products' 
    : 'https://backend046.vercel.app/api/products';

  // ✅ 1. เช็คสิทธิ์การเข้าใช้งาน
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchProducts();
  }, [router]);

  const getSafeDate = (dateStr) => {
    if (!dateStr) return '';
    return dateStr.substring(0, 10);
  };

  const displayThaiDate = (dateStr) => {
    if (!dateStr) return '-';
    const [y, m, d] = dateStr.substring(0, 10).split('-');
    return `${d}/${m}/${y}`;
  };

  const getTodayLocal = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // ✅ 5. ดึงข้อมูลสินค้า (ใช้ API_BASE_URL)
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API_BASE_URL, { 
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-store' 
      }); 

      if (res.status === 401 || res.status === 403) {
        localStorage.clear();
        router.push('/login');
        return;
      }
      
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
      checkNotifications(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  const checkExpiry = (date) => {
    if (!date) return { label: 'ไม่ระบุ', color: 'text-secondary' };
    const datePart = date.substring(0, 10);
    const formattedDate = displayThaiDate(datePart);
    const today = new Date(getTodayLocal());
    const exp = new Date(datePart);
    const diff = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
    if (diff <= 0) return { label: `หมดอายุแล้ว: ${formattedDate}`, color: 'text-danger fw-bold' };
    if (diff <= 30) return { label: `หมดอายุวันที่: ${formattedDate}`, color: 'text-warning fw-bold' };
    return { label: `หมดวันที่: ${formattedDate}`, color: 'text-success' };
  };

  const checkNotifications = (items) => {
    const today = new Date(getTodayLocal());
    const lowStockItems = items.filter(p => p.quantity <= p.min_stock);
    const expiringItems = items.filter(p => {
      if (!p.expiry_date) return false;
      const exp = new Date(p.expiry_date.substring(0, 10));
      const diff = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
      return diff <= 3; 
    });

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      background: '#1a1a1a',
      color: '#fff'
    });

    if (lowStockItems.length > 0) {
      setTimeout(() => {
        Toast.fire({
          icon: 'warning',
          title: `⚠️ สต็อกต่ำ ${lowStockItems.length} รายการ`,
          iconColor: '#ff4d4d'
        });
      }, 500);
    }

    if (expiringItems.length > 0) {
      setTimeout(() => {
        Toast.fire({
          icon: 'error',
          title: `⌛ หมดอายุ/ใกล้หมด (3 วัน) ${expiringItems.length} รายการ`,
          iconColor: '#f1c40f'
        });
      }, 1500);
    }
  };

  // ✅ 8. แก้ไขสต็อก (ใช้ API_BASE_URL)
  const handleQuickUpdate = async (product) => {
    const { value: newQty } = await Swal.fire({
      title: `📦 แก้ไขสต็อก`,
      text: product.product_name,
      input: 'number',
      inputValue: product.quantity,
      inputAttributes: { min: 0, step: 1 },
      showCancelButton: true,
      confirmButtonText: 'บันทึก',
      cancelButtonText: 'ยกเลิก',
      background: '#1a1a1a',
      color: '#fff',
      customClass: { input: 'bg-dark text-white border-secondary text-center' },
      preConfirm: (value) => {
        if (value === "" || value < 0) {
          Swal.showValidationMessage('กรุณาใส่จำนวนที่ถูกต้อง');
        }
        return value;
      }
    });

    if (newQty !== undefined && newQty !== null) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/${product.id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify({ quantity: parseInt(newQty) })
        });
        const data = await res.json();
        if (data.success) fetchProducts();
      } catch (err) {
        console.error("Update error:", err);
      }
    }
  };

  useEffect(() => {
    let result = products;
    if (searchTerm) result = result.filter(p => p.product_name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (selectedCategory !== 'All') result = result.filter(p => p.category === selectedCategory);
    if (filterMode === 'low_stock') result = result.filter(p => p.quantity <= p.min_stock);
    else if (filterMode === 'expiring') result = result.filter(p => {
        if (!p.expiry_date) return false;
        const diff = Math.ceil((new Date(p.expiry_date.substring(0,10)) - new Date(getTodayLocal())) / (1000 * 60 * 60 * 24));
        return diff <= 30;
    });
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products, filterMode]);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  // ✅ 9. เพิ่ม/แก้ไขสินค้า (ใช้ API_BASE_URL)
  const showProductForm = async (product = null) => {
    const isEdit = !!product;
    const today = getTodayLocal(); 
    const { value: v } = await Swal.fire({
      title: isEdit ? '📝 แก้ไขสินค้า' : '➕ เพิ่มสินค้าด่วน',
      background: '#1a1a1a', 
      color: '#fff',
      html: `
        <div class="row g-2 text-start">
          <div class="col-12"><label class="small text-secondary">ชื่อสินค้า</label><input id="n" class="swal2-input m-0 w-100 text-white bg-dark" value="${isEdit ? product.product_name : ''}"></div>
          <div class="col-12"><label class="small text-secondary">URL รูปภาพ</label><input id="i" class="swal2-input m-0 w-100 text-white bg-dark" placeholder="https://..." value="${isEdit ? (product.image_url || '') : ''}"></div>
          <div class="col-6"><label class="small text-secondary">ราคา (฿)</label><input id="p" type="number" class="swal2-input m-0 w-100 text-white bg-dark" value="${isEdit ? product.price : ''}"></div>
          <div class="col-6"><label class="small text-secondary">จำนวนสต็อก</label><input id="q" type="number" class="swal2-input m-0 w-100 text-white bg-dark" value="${isEdit ? product.quantity : ''}"></div>
          <div class="col-6"><label class="small text-secondary">วันนำเข้า</label><input id="e" type="date" class="swal2-input m-0 w-100 text-white bg-dark" value="${isEdit ? getSafeDate(product.entry_date) : today}"></div>
          <div class="col-6"><label class="small text-secondary">วันหมดอายุ</label><input id="ex" type="date" class="swal2-input m-0 w-100 text-white bg-dark" value="${isEdit ? getSafeDate(product.expiry_date) : ''}"></div>
          <div class="col-7"><label class="small text-secondary">หมวดหมู่</label><input id="c" class="swal2-input m-0 w-100 text-white bg-dark" value="${isEdit ? product.category : ''}"></div>
          <div class="col-5"><label class="small text-danger">⚠️ ขั้นต่ำที่ต้องเตือน</label><input id="m" type="number" class="swal2-input m-0 w-100 text-white bg-dark border-danger border-opacity-50" value="${isEdit ? product.min_stock : '5'}"></div>
        </div>`,
      preConfirm: () => {
        return { 
          product_name: document.getElementById('n').value, 
          category: document.getElementById('c').value, 
          price: document.getElementById('p').value, 
          quantity: document.getElementById('q').value, 
          min_stock: document.getElementById('m').value, 
          entry_date: document.getElementById('e').value || null,
          expiry_date: document.getElementById('ex').value || null,
          image_url: document.getElementById('i').value 
        }
      }
    });

    if (v) {
      const token = localStorage.getItem('token');
      const res = await fetch(isEdit ? `${API_BASE_URL}/${product.id}` : API_BASE_URL, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(v)
      });
      if ((await res.json()).success) fetchProducts();
    }
  };

  // ✅ 10. ลบสินค้า (ใช้ API_BASE_URL)
  const handleDelete = async (id, name) => {
    const result = await Swal.fire({ title: 'ลบสินค้า?', icon: 'warning', showCancelButton: true, background: '#1a1a1a', color: '#fff' });
    if (result.isConfirmed) {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if ((await res.json()).success) fetchProducts();
    }
  };

  if (loading) return <div className="text-white text-center w-100" style={{ marginTop: '200px' }}>กำลังโหลด...</div>;

  return (
    <div className="min-vh-100 w-100 d-flex justify-content-center" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .res-table thead { display: none; }
          .res-table tr { display: block; margin-bottom: 15px; border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 20px; padding: 10px; background: rgba(255,255,255,0.02); }
          .res-table td { display: flex; justify-content: space-between; align-items: center; border: none !important; padding: 8px 5px !important; text-align: right !important; }
          .res-table td::before { content: attr(data-label); font-weight: bold; color: #6c757d; font-size: 12px; text-transform: uppercase; float: left; }
          .res-table td:last-child { border-top: 1px solid rgba(255,255,255,0.1) !important; margin-top: 10px; justify-content: center; }
        }
        .stock-pill:hover { filter: brightness(1.2); cursor: pointer; }
      `}} />

      <div className="container" style={{ maxWidth: '1100px' }}>
        <div className="shadow-lg p-4 p-md-5" style={{ background: 'rgba(10, 10, 10, 0.98)', borderRadius: '30px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
          
          <div className="row g-3 mb-4 text-center text-md-start">
            <div className="col-md-4"><div className="p-3 rounded-4 bg-dark border border-secondary border-opacity-10"><small className="text-secondary">รวมสินค้า</small><h3 className="text-white mb-0">{products.length}</h3></div></div>
            <div className="col-md-4"><div className="p-3 rounded-4 bg-dark border border-secondary border-opacity-10"><small className="text-secondary">มูลค่าคลัง</small><h3 className="text-warning mb-0">{products.reduce((acc, p) => acc + (p.price * p.quantity), 0).toLocaleString()} ฿</h3></div></div>
            <div className="col-md-4"><div className="p-3 rounded-4 bg-dark border border-danger border-opacity-20"><small className="text-danger">สต็อกใกล้หมด</small><h3 className="text-danger mb-0">{products.filter(p => p.quantity <= p.min_stock).length} รายการ</h3></div></div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4 px-2 px-md-0">
            <h2 className="text-white fw-bold mb-0" style={{fontSize: 'clamp(1.2rem, 5vw, 2rem)'}}>📦 Inventory Control</h2>
            <button className="btn btn-primary rounded-pill px-4" onClick={() => showProductForm()}>+ เพิ่มสินค้า</button>
          </div>

          <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center">
            <button className={`btn btn-sm rounded-pill px-4 ${filterMode === 'all' ? 'btn-primary' : 'btn-outline-secondary text-white'}`} onClick={() => setFilterMode('all')}>ทั้งหมด</button>
            <button className={`btn btn-sm rounded-pill px-4 ${filterMode === 'low_stock' ? 'btn-danger' : 'btn-outline-danger'}`} onClick={() => setFilterMode('low_stock')}>⚠️ สต็อกต่ำ</button>
            <button className={`btn btn-sm rounded-pill px-4 ${filterMode === 'expiring' ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => setFilterMode('expiring')}>⌛ ใกล้หมดอายุ</button>
          </div>

          <div className="row g-3 mb-4 px-2 px-md-0">
            <div className="col-md-8"><input type="text" className="form-control bg-dark text-white border-secondary rounded-pill px-4" placeholder="🔍 ค้นหาชื่อสินค้า..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
            <div className="col-md-4"><select className="form-select bg-dark text-white border-secondary rounded-pill px-4" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>{categories.map(c => <option key={c} value={c}>{c === 'All' ? 'ทุกหมวดหมู่' : c}</option>)}</select></div>
          </div>

          <div className="table-responsive" style={{overflowX: 'initial'}}>
            <table className="table table-dark table-hover align-middle res-table">
              <thead><tr className="text-secondary border-bottom border-secondary border-opacity-25 small text-uppercase"><th>สินค้า</th><th>ข้อมูลรายการ</th><th className="text-center">สต็อก</th><th className="text-start">วันที่สำคัญ</th><th className="text-end">จัดการ</th></tr></thead>
              <tbody>
                {filteredProducts.map((item) => {
                  const expiryInfo = checkExpiry(item.expiry_date);
                  return (
                    <tr key={item.id} className="border-bottom border-secondary border-opacity-10">
                      <td data-label="สินค้า"><div className="bg-white rounded-3 p-1 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}><img src={item.image_url || 'https://via.placeholder.com/45'} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} /></div></td>
                      <td data-label="ข้อมูลรายการ"><div className="fw-bold text-white text-md-start text-end">{item.product_name}</div><div className="text-warning small text-md-start text-end">{parseFloat(item.price).toLocaleString()} ฿ | {item.category}</div></td>
                      <td data-label="สต็อก" className="text-center">
                        <div className={`stock-pill d-inline-block px-3 py-1 rounded-pill border ${item.quantity <= item.min_stock ? 'text-danger border-danger bg-danger bg-opacity-10 fw-bold' : 'text-success border-success bg-success bg-opacity-10'}`} onClick={() => handleQuickUpdate(item)}>
                          {item.quantity} <small className="text-secondary ms-1">✏️</small>
                        </div>
                      </td>
                      <td data-label="วันที่สำคัญ" style={{ fontSize: '11px' }}>
                        <div className="text-secondary text-md-start text-end">📥 นำเข้า: {displayThaiDate(item.entry_date)}</div>
                        <div className={`${expiryInfo.color} text-md-start text-end`}>⌛ {expiryInfo.label}</div>
                        <div className="text-info mt-1 text-md-start text-end fw-bold" style={{ opacity: 0.9 }}>🕒 ล่าสุด: {item.last_update || '-'}</div>
                      </td>
                      <td data-label="จัดการ" className="text-end"><div className="d-flex gap-2 justify-content-end w-100"><button className="btn btn-sm btn-outline-info border-0 flex-fill flex-md-grow-0" onClick={() => showProductForm(item)}>แก้</button><button className="btn btn-sm btn-outline-danger border-0 flex-fill flex-md-grow-0" onClick={() => handleDelete(item.id, item.product_name)}>ลบ</button></div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}