'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function POSPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const getApiUrl = (endpoint = '/api/products') => {
    const base = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
      ? 'http://localhost:5000' 
      : 'https://backend046.vercel.app';
    return `${base}${endpoint}`;
  };

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchProducts();
  }, [router]);

  useEffect(() => {
    let result = products;
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchTerm) {
      result = result.filter(p => p.product_name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl('/api/products'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const categories = ['All', ...new Set(products.map(p => p.category))];

  // ✅ ฟังก์ชันช่วยอัปเดตจำนวนในตะกร้า (เพิ่ม/ลด)
  const updateCartQty = (productId, amount) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId) {
        const newQty = item.cartQty + amount;
        const stockLimit = item.quantity;

        if (newQty > stockLimit) {
          Swal.fire('เกินจำนวนสต็อก', `มีสินค้าในคลังเพียง ${stockLimit} ชิ้น`, 'warning');
          return item;
        }
        if (newQty < 1) return item; // ไม่ให้ลดต่ำกว่า 1 ถ้าจะลบให้กดปุ่มลบ
        return { ...item, cartQty: newQty };
      }
      return item;
    }));
  };

  const addToCart = (product) => {
    if (product.quantity <= 0) {
      Swal.fire('สินค้าหมด', 'ไม่สามารถขายได้', 'error');
      return;
    }
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.cartQty >= product.quantity) {
        Swal.fire('เกินจำนวนสต็อก', 'สินค้าในคลังไม่พอ', 'warning');
        return;
      }
      setCart(cart.map(item => item.id === product.id ? { ...item, cartQty: item.cartQty + 1 } : item));
    } else {
      setCart([...cart, { ...product, cartQty: 1 }]);
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.cartQty), 0);

  const handleCheckout = async () => {
    const result = await Swal.fire({
      title: 'ยืนยันการชำระเงิน?',
      text: `ยอดรวมทั้งสิ้น ${totalPrice.toLocaleString()} บาท`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'รับเงินและบันทึกยอดขาย',
      cancelButtonText: 'ยกเลิก',
      background: '#1a1a1a', color: '#fff'
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(getApiUrl('/api/sales'), {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify({ 
            total_price: totalPrice,
            items: cart 
          })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'บันทึกไม่สำเร็จ');

        await Swal.fire({ 
          title: 'สำเร็จ!', 
          text: 'บันทึกยอดขายและตัดสต็อกเรียบร้อยแล้ว', 
          icon: 'success', 
          timer: 1500, 
          showConfirmButton: false 
        });

        setCart([]);
        fetchProducts();
      } catch (err) {
        console.error("Checkout error:", err);
        Swal.fire('ผิดพลาด', err.message || 'ไม่สามารถบันทึกยอดขายได้', 'error');
      }
    }
  };

  if (!mounted) return null;

  return (
    <div suppressHydrationWarning className="min-vh-100 text-white" style={{ background: '#0a0a0a', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container-fluid px-4">
        
        <div className="d-flex justify-content-between align-items-center mb-5 mt-2">
          <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => router.push('/admin/products')}>
            ⬅️ กลับหน้าคลังสินค้า
          </button>
          <h2 className="fw-bold mb-0 text-primary">🛒 POS SYSTEM</h2>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="p-4 rounded-4 bg-dark border border-secondary border-opacity-20 shadow-lg h-100">
              
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
                  <h4 className="mb-0 fw-bold text-white">เลือกรายการสินค้า</h4>
                  <input 
                    type="text" 
                    className="form-control bg-black text-white border-secondary rounded-pill ps-4 w-100 w-md-50" 
                    placeholder="🔍 ค้นหาชื่อสินค้า..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="d-flex gap-2 overflow-auto pb-2" style={{ whiteSpace: 'nowrap' }}>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`btn btn-sm rounded-pill px-4 transition-all ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary text-white'}`}
                    >
                      {cat === 'All' ? 'ทั้งหมด' : cat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-3 overflow-auto pe-1" style={{ maxHeight: '60vh' }}>
                {filteredProducts.map(product => (
                  <div key={product.id} className="col">
                    <div 
                      className="card h-100 border border-white border-opacity-10 rounded-4 overflow-hidden item-card shadow-lg"
                      style={{ cursor: 'pointer', transition: 'all 0.3s ease', background: '#1a1a1a' }}
                      onClick={() => addToCart(product)}
                    >
                      <div className="bg-white d-flex align-items-center justify-content-center border-bottom border-dark border-opacity-10" style={{ height: '140px' }}>
                        <img src={product.image_url || 'https://via.placeholder.com/150'} alt="" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
                      </div>
                      <div className="card-body p-3 text-center">
                        <div className="fw-bold text-white text-truncate mb-2" style={{ fontSize: '0.9rem' }}>{product.product_name}</div>
                        <div className="text-warning fw-bolder mb-2 h5">{parseFloat(product.price).toLocaleString()} ฿</div>
                        <div className={`badge rounded-pill ${product.quantity <= 5 ? 'bg-danger' : 'bg-dark border border-secondary border-opacity-50'}`}>
                          คงเหลือ: {product.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="p-4 rounded-4 bg-dark border border-primary border-opacity-40 sticky-top shadow-lg" style={{ top: '130px' }}>
              <h4 className="mb-4 text-primary fw-bold d-flex align-items-center"><span className="me-2">🧾</span> ตะกร้าสินค้า</h4>
              <div className="cart-list mb-4 px-2" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {cart.length === 0 ? (
                  <div className="text-center py-5 text-secondary"><div className="display-4 opacity-10">🛒</div><p className="mt-3">ยังไม่มีสินค้าในตะกร้า</p></div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="bg-black bg-opacity-40 p-3 rounded-4 border border-secondary border-opacity-20 shadow-sm mb-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div style={{maxWidth: '75%'}}>
                          <div className="small fw-bold text-white text-truncate">{item.product_name}</div>
                          <div className="text-warning fw-bold small mt-1">{parseFloat(item.price).toLocaleString()} ฿</div>
                        </div>
                        <button className="btn btn-sm text-danger p-0 fw-bold border-0" onClick={() => setCart(cart.filter(c => c.id !== item.id))}>ลบ</button>
                      </div>
                      
                      {/* ✅ เพิ่มส่วนปุ่มแก้ไขจำนวนสินค้าตรงนี้ */}
                      <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top border-secondary border-opacity-10">
                        <div className="d-flex align-items-center gap-2 bg-dark rounded-pill p-1 border border-secondary border-opacity-25">
                          <button 
                            className="btn btn-sm btn-outline-light rounded-circle p-0 d-flex align-items-center justify-content-center" 
                            style={{width: '24px', height: '24px'}}
                            onClick={() => updateCartQty(item.id, -1)}
                          > - </button>
                          <span className="small fw-bold px-1" style={{minWidth: '20px', textAlign: 'center'}}>{item.cartQty}</span>
                          <button 
                            className="btn btn-sm btn-outline-light rounded-circle p-0 d-flex align-items-center justify-content-center" 
                            style={{width: '24px', height: '24px'}}
                            onClick={() => updateCartQty(item.id, 1)}
                          > + </button>
                        </div>
                        <div className="text-info fw-bold small">รวม: {(item.price * item.cartQty).toLocaleString()} ฿</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="bg-black bg-opacity-40 p-4 rounded-4 mb-4 border border-secondary border-opacity-10">
                <div className="d-flex justify-content-between align-items-center mb-2"><span className="text-secondary small">จำนวนรวมทั้งหมด</span><span className="fw-bold text-white">{cart.reduce((acc, item) => acc + item.cartQty, 0)} ชิ้น</span></div>
                <hr className="border-secondary opacity-20" /><div className="d-flex justify-content-between align-items-center mt-3"><span className="h5 mb-0 fw-bold">รวมทั้งสิ้น</span><span className="h3 mb-0 text-success fw-bolder">{totalPrice.toLocaleString()} ฿</span></div>
              </div>
              <button className="btn btn-primary w-100 py-3 rounded-4 fw-bold shadow-lg mb-2" disabled={cart.length === 0} onClick={handleCheckout}>💸 ชำระเงินและบันทึกยอดขาย</button>
              <button className="btn btn-link text-secondary w-100 text-decoration-none small mt-2" onClick={() => setCart([])} disabled={cart.length === 0}>ล้างตะกร้าสินค้าทั้งหมด</button>
            </div>
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .item-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,123,255,0.2) !important; border-color: rgba(0,123,255,0.5) !important; background: #252525 !important; }
        .transition-all { transition: all 0.2s ease-in-out; }
        .cart-list::-webkit-scrollbar { width: 4px; }
        .cart-list::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .btn-primary { background: linear-gradient(45deg, #007bff, #0056b3); border: none; }
      `}} />
    </div>
  );
}