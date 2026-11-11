// Cart Management Module
let cart = JSON.parse(localStorage.getItem('cbv_cart') || '[]');
let appliedVoucher = JSON.parse(localStorage.getItem('cbv_voucher') || 'null');

export function initCart() {
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const applyVoucherBtn = document.getElementById('applyVoucherBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  const checkoutForm = document.getElementById('checkoutForm');

  if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', openCart);
  }
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeCart);
  }
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }

  // Voucher apply
  if (applyVoucherBtn) {
    applyVoucherBtn.addEventListener('click', handleApplyVoucher);
  }

  // Checkout modal
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        window.showToast('Giỏ hàng của bạn đang trống!', 'warning');
        return;
      }
      closeCart();
      openCheckoutModal();
    });
  }

  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
  }
  if (checkoutOverlay) {
    checkoutOverlay.addEventListener('click', (e) => {
      if (e.target === checkoutOverlay) closeCheckoutModal();
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }

  updateCartUI();
}

export function openCart() {
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.remove('translate-x-full');
    cartOverlay.classList.remove('hidden');
    setTimeout(() => cartOverlay.classList.remove('opacity-0'), 10);
  }
}

export function closeCart() {
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartDrawer && cartOverlay) {
    cartDrawer.classList.add('translate-x-full');
    cartOverlay.classList.add('opacity-0');
    setTimeout(() => cartOverlay.classList.add('hidden'), 300);
  }
}

export function addToCart(product, quantity = 1) {
  const existing = cart.find(item => item.id === product.id || item.name === product.name);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + quantity;
  } else {
    cart.push({
      id: product.id || 'p-' + Date.now(),
      name: product.name,
      price: product.price,
      image: product.image,
      categoryName: product.categoryName || 'Gaming Gear',
      quantity: quantity
    });
  }
  saveCart();
  updateCartUI();
  window.showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
  openCart();
}

export function updateQuantity(index, delta) {
  if (!cart[index]) return;
  cart[index].quantity = (cart[index].quantity || 1) + delta;
  if (cart[index].quantity <= 0) {
    removeFromCart(index);
    return;
  }
  saveCart();
  updateCartUI();
}

export function removeFromCart(index) {
  if (!cart[index]) return;
  const removedName = cart[index].name;
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
  window.showToast(`Đã xóa "${removedName}" khỏi giỏ hàng.`, 'info');
}

function saveCart() {
  localStorage.setItem('cbv_cart', JSON.stringify(cart));
}

function calculateCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  let shippingFee = subtotal >= 2000000 || subtotal === 0 ? 0 : 35000;
  let discount = 0;

  if (appliedVoucher && subtotal > 0) {
    if (appliedVoucher.freeShipping) {
      shippingFee = 0;
    }
    if (appliedVoucher.discountPercent) {
      discount = Math.round(subtotal * (appliedVoucher.discountPercent / 100));
    }
    if (appliedVoucher.discountAmount) {
      discount = appliedVoucher.discountAmount;
    }
  }

  const grandTotal = Math.max(0, subtotal - discount + shippingFee);
  return { subtotal, shippingFee, discount, grandTotal };
}

export function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartShippingEl = document.getElementById('cartShipping');
  const cartDiscountEl = document.getElementById('cartDiscount');
  const cartTotalEl = document.getElementById('cartTotalPrice');
  const voucherDiscountRow = document.getElementById('voucherDiscountRow');
  const voucherInput = document.getElementById('voucherInput');
  const voucherMsg = document.getElementById('voucherMsg');

  const { subtotal, shippingFee, discount, grandTotal } = calculateCartTotals();

  const totalItemsCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  if (cartCount) cartCount.textContent = totalItemsCount;

  if (cartItemsContainer) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center h-64 text-center text-zinc-400">
          <div class="w-16 h-16 mb-4 rounded-full bg-zinc-800/80 flex items-center justify-center text-2xl text-zinc-500">
            <i class="fa-solid fa-cart-arrow-down"></i>
          </div>
          <p class="font-medium text-zinc-300">Giỏ hàng của bạn đang trống</p>
          <p class="text-xs text-zinc-500 mt-1 max-w-[200px]">Hãy chọn những món gear đỉnh cao từ cửa hàng nhé!</p>
        </div>
      `;
    } else {
      cartItemsContainer.innerHTML = cart.map((item, idx) => `
        <div class="flex items-center gap-3 p-3 mb-2 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition">
          <img src="${item.image || 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=150&q=80'}" 
               alt="${item.name}" 
               class="w-16 h-16 rounded-lg object-cover bg-zinc-800 flex-shrink-0">
          <div class="flex-1 min-w-0">
            <h5 class="text-sm font-semibold text-white truncate">${item.name}</h5>
            <div class="text-xs font-bold text-rose-400 mt-0.5">${item.price.toLocaleString('vi-VN')}₫</div>
            
            <div class="flex items-center gap-2 mt-2">
              <div class="flex items-center border border-zinc-700 rounded-lg bg-zinc-800 overflow-hidden text-xs">
                <button onclick="window.updateQuantity(${idx}, -1)" class="w-6 h-6 flex items-center justify-center hover:bg-zinc-700 text-zinc-300">-</button>
                <span class="w-7 text-center font-bold text-white">${item.quantity || 1}</span>
                <button onclick="window.updateQuantity(${idx}, 1)" class="w-6 h-6 flex items-center justify-center hover:bg-zinc-700 text-zinc-300">+</button>
              </div>
              <span class="text-[11px] text-zinc-500">= ${(item.price * (item.quantity || 1)).toLocaleString('vi-VN')}₫</span>
            </div>
          </div>
          <button onclick="window.removeFromCart(${idx})" class="p-2 text-zinc-500 hover:text-rose-400 transition" title="Xóa">
            <i class="fa-solid fa-trash-can text-sm"></i>
          </button>
        </div>
      `).join('');
    }
  }

  if (cartSubtotalEl) cartSubtotalEl.textContent = subtotal.toLocaleString('vi-VN') + '₫';
  if (cartShippingEl) {
    cartShippingEl.textContent = shippingFee === 0 ? 'Miễn phí' : shippingFee.toLocaleString('vi-VN') + '₫';
    if (shippingFee === 0 && subtotal > 0) {
      cartShippingEl.classList.add('text-emerald-400');
    } else {
      cartShippingEl.classList.remove('text-emerald-400');
    }
  }

  if (voucherDiscountRow && cartDiscountEl) {
    if (discount > 0) {
      voucherDiscountRow.classList.remove('hidden');
      cartDiscountEl.textContent = '-' + discount.toLocaleString('vi-VN') + '₫';
    } else {
      voucherDiscountRow.classList.add('hidden');
    }
  }

  if (cartTotalEl) cartTotalEl.textContent = grandTotal.toLocaleString('vi-VN') + '₫';

  if (appliedVoucher && voucherInput && voucherMsg) {
    voucherInput.value = appliedVoucher.code;
    voucherMsg.textContent = `Áp dụng: ${appliedVoucher.description || appliedVoucher.code}`;
    voucherMsg.className = 'text-xs text-emerald-400 mt-1';
  }
}

async function handleApplyVoucher() {
  const voucherInput = document.getElementById('voucherInput');
  const voucherMsg = document.getElementById('voucherMsg');
  const code = voucherInput?.value?.trim().toUpperCase();

  if (!code) {
    if (voucherMsg) {
      voucherMsg.textContent = 'Vui lòng nhập mã ưu đãi (Ví dụ: GEARVIP10, FREESHIP)';
      voucherMsg.className = 'text-xs text-amber-400 mt-1';
    }
    return;
  }

  try {
    const res = await fetch('/api/voucher/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const data = await res.json();
    if (data.valid) {
      appliedVoucher = data;
      localStorage.setItem('cbv_voucher', JSON.stringify(appliedVoucher));
      updateCartUI();
      window.showToast(`Áp dụng thành công mã ưu đãi: ${data.code}!`, 'success');
    } else {
      if (voucherMsg) {
        voucherMsg.textContent = data.message || 'Mã ưu đãi không hợp lệ!';
        voucherMsg.className = 'text-xs text-rose-400 mt-1';
      }
      window.showToast('Mã ưu đãi không hợp lệ!', 'error');
    }
  } catch (err) {
    // Fallback offline verification
    const offlineCodes = {
      'GEARVIP10': { code: 'GEARVIP10', discountPercent: 10, description: 'Giảm 10% đơn hàng' },
      'FREESHIP': { code: 'FREESHIP', freeShipping: true, description: 'Miễn phí vận chuyển' },
      'CHAOBAN': { code: 'CHAOBAN', discountAmount: 100000, description: 'Giảm 100.000₫' }
    };
    if (offlineCodes[code]) {
      appliedVoucher = offlineCodes[code];
      localStorage.setItem('cbv_voucher', JSON.stringify(appliedVoucher));
      updateCartUI();
      window.showToast(`Áp dụng mã ${code} thành công!`, 'success');
    } else {
      if (voucherMsg) {
        voucherMsg.textContent = 'Mã không hợp lệ. Thử: GEARVIP10, FREESHIP';
        voucherMsg.className = 'text-xs text-rose-400 mt-1';
      }
    }
  }
}

function openCheckoutModal() {
  const modal = document.getElementById('checkoutOverlay');
  const summaryContainer = document.getElementById('checkoutSummaryItems');
  const summaryTotalEl = document.getElementById('checkoutSummaryTotal');
  const { grandTotal } = calculateCartTotals();

  if (summaryContainer) {
    summaryContainer.innerHTML = cart.map(item => `
      <div class="flex justify-between items-center text-xs py-1.5 border-b border-zinc-800">
        <span class="text-zinc-300 truncate max-w-[220px]">${item.name} <span class="text-zinc-500 font-bold">x${item.quantity || 1}</span></span>
        <span class="font-bold text-white">${(item.price * (item.quantity || 1)).toLocaleString('vi-VN')}₫</span>
      </div>
    `).join('');
  }

  if (summaryTotalEl) {
    summaryTotalEl.textContent = grandTotal.toLocaleString('vi-VN') + '₫';
  }

  // Pre-fill user data if logged in
  const currentUser = JSON.parse(localStorage.getItem('cbv_user') || 'null');
  if (currentUser) {
    const nameInput = document.getElementById('orderCustomerName');
    const phoneInput = document.getElementById('orderCustomerPhone');
    const emailInput = document.getElementById('orderCustomerEmail');
    if (nameInput && !nameInput.value) nameInput.value = currentUser.name || '';
    if (phoneInput && !phoneInput.value) phoneInput.value = currentUser.phone || '';
    if (emailInput && !emailInput.value) emailInput.value = currentUser.email || '';
  }

  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.remove('opacity-0'), 10);
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutOverlay');
  if (modal) {
    modal.classList.add('opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();
  if (cart.length === 0) return;

  const name = document.getElementById('orderCustomerName')?.value.trim();
  const phone = document.getElementById('orderCustomerPhone')?.value.trim();
  const email = document.getElementById('orderCustomerEmail')?.value.trim();
  const address = document.getElementById('orderCustomerAddress')?.value.trim();
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'COD';
  const note = document.getElementById('orderCustomerNote')?.value.trim() || '';

  const { subtotal, shippingFee, discount, grandTotal } = calculateCartTotals();

  const orderPayload = {
    customer: { name, phone, email, address, paymentMethod },
    items: cart,
    subtotal,
    shippingFee,
    discount,
    voucherCode: appliedVoucher ? appliedVoucher.code : '',
    total: grandTotal,
    note
  };

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    const result = await res.json();
    const orderId = result?.order?.id || 'CBV-' + Math.floor(100000 + Math.random() * 900000);

    // Save in user orders history
    const userOrders = JSON.parse(localStorage.getItem('cbv_user_orders') || '[]');
    userOrders.unshift({
      id: orderId,
      date: new Date().toLocaleDateString('vi-VN'),
      itemsCount: cart.length,
      total: grandTotal,
      status: 'Đang chuẩn bị hàng',
      items: cart
    });
    localStorage.setItem('cbv_user_orders', JSON.stringify(userOrders));

    // Clear cart
    cart = [];
    appliedVoucher = null;
    localStorage.removeItem('cbv_cart');
    localStorage.removeItem('cbv_voucher');
    updateCartUI();
    closeCheckoutModal();

    // Show order success modal
    showOrderSuccess(orderId, name, phone, address, grandTotal);
  } catch (err) {
    // Offline success handling
    const orderId = 'CBV-' + Math.floor(100000 + Math.random() * 900000);
    cart = [];
    saveCart();
    updateCartUI();
    closeCheckoutModal();
    showOrderSuccess(orderId, name, phone, address, grandTotal);
  }
}

function showOrderSuccess(orderId, name, phone, address, total) {
  const successModal = document.getElementById('orderSuccessOverlay');
  const codeEl = document.getElementById('successOrderCode');
  const nameEl = document.getElementById('successCustomerName');
  const totalEl = document.getElementById('successOrderTotal');

  if (codeEl) codeEl.textContent = orderId;
  if (nameEl) nameEl.textContent = `${name} (${phone})`;
  if (totalEl) totalEl.textContent = total.toLocaleString('vi-VN') + '₫';

  if (successModal) {
    successModal.classList.remove('hidden');
    setTimeout(() => successModal.classList.remove('opacity-0'), 10);
  }
}

// Window global bindings for inline onclicks
window.addToCart = (product, quantity) => addToCart(product, quantity);
window.updateQuantity = (idx, delta) => updateQuantity(idx, delta);
window.removeFromCart = (idx) => removeFromCart(idx);
