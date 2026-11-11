// Auth & User Management Module
let currentUser = JSON.parse(localStorage.getItem('cbv_user') || 'null');

export function initAuth() {
  const accountBtn = document.getElementById('accountBtn');
  const authOverlay = document.getElementById('authModalOverlay');
  const closeAuthBtn = document.getElementById('closeAuthBtn');
  const switchToRegister = document.getElementById('switchToRegister');
  const switchToLogin = document.getElementById('switchToLogin');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const userDropdown = document.getElementById('userDropdown');
  const logoutBtn = document.getElementById('logoutBtn');
  const viewOrdersBtn = document.getElementById('viewOrdersBtn');
  const ordersOverlay = document.getElementById('ordersHistoryOverlay');
  const closeOrdersBtn = document.getElementById('closeOrdersBtn');

  updateAuthUI();

  if (accountBtn) {
    accountBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentUser) {
        // Toggle user menu dropdown
        if (userDropdown) {
          userDropdown.classList.toggle('hidden');
        }
      } else {
        openAuthModal('login');
      }
    });
  }

  // Close user dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (userDropdown && !userDropdown.contains(e.target) && !accountBtn?.contains(e.target)) {
      userDropdown.classList.add('hidden');
    }
  });

  if (closeAuthBtn) {
    closeAuthBtn.addEventListener('click', closeAuthModal);
  }
  if (authOverlay) {
    authOverlay.addEventListener('click', (e) => {
      if (e.target === authOverlay) closeAuthModal();
    });
  }

  if (switchToRegister) {
    switchToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('loginFormContainer')?.classList.add('hidden');
      document.getElementById('registerFormContainer')?.classList.remove('hidden');
    });
  }

  if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('registerFormContainer')?.classList.add('hidden');
      document.getElementById('loginFormContainer')?.classList.remove('hidden');
    });
  }

  // Login form handler
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail')?.value.trim();
      const pass = document.getElementById('loginPassword')?.value;

      if (!email || !pass) {
        window.showToast('Vui lòng điền đầy đủ email và mật khẩu!', 'warning');
        return;
      }

      // Save user
      currentUser = {
        name: email.split('@')[0],
        email: email,
        phone: '0987654321',
        role: 'VIP Member'
      };
      localStorage.setItem('cbv_user', JSON.stringify(currentUser));
      updateAuthUI();
      closeAuthModal();
      window.showToast(`Chào mừng trở lại, ${currentUser.name}!`, 'success');
    });
  }

  // Register form handler
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName')?.value.trim();
      const email = document.getElementById('regEmail')?.value.trim();
      const phone = document.getElementById('regPhone')?.value.trim();
      const pass = document.getElementById('regPassword')?.value;

      if (!name || !email || !pass) {
        window.showToast('Vui lòng điền đầy đủ thông tin đăng ký!', 'warning');
        return;
      }

      currentUser = {
        name: name,
        email: email,
        phone: phone || '',
        role: 'Thành viên mới'
      };
      localStorage.setItem('cbv_user', JSON.stringify(currentUser));
      updateAuthUI();
      closeAuthModal();
      window.showToast(`Đăng ký thành công! Chào bạn, ${currentUser.name}.`, 'success');
    });
  }

  // Logout handler
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      currentUser = null;
      localStorage.removeItem('cbv_user');
      updateAuthUI();
      if (userDropdown) userDropdown.classList.add('hidden');
      window.showToast('Đã đăng xuất tài khoản.', 'info');
    });
  }

  // Orders history handler
  if (viewOrdersBtn) {
    viewOrdersBtn.addEventListener('click', () => {
      if (userDropdown) userDropdown.classList.add('hidden');
      openOrdersModal();
    });
  }

  if (closeOrdersBtn) {
    closeOrdersBtn.addEventListener('click', closeOrdersModal);
  }
  if (ordersOverlay) {
    ordersOverlay.addEventListener('click', (e) => {
      if (e.target === ordersOverlay) closeOrdersModal();
    });
  }
}

export function openAuthModal(mode = 'login') {
  const authOverlay = document.getElementById('authModalOverlay');
  const loginFormContainer = document.getElementById('loginFormContainer');
  const registerFormContainer = document.getElementById('registerFormContainer');

  if (mode === 'register') {
    loginFormContainer?.classList.add('hidden');
    registerFormContainer?.classList.remove('hidden');
  } else {
    registerFormContainer?.classList.add('hidden');
    loginFormContainer?.classList.remove('hidden');
  }

  if (authOverlay) {
    authOverlay.classList.remove('hidden');
    setTimeout(() => authOverlay.classList.remove('opacity-0'), 10);
  }
}

export function closeAuthModal() {
  const authOverlay = document.getElementById('authModalOverlay');
  if (authOverlay) {
    authOverlay.classList.add('opacity-0');
    setTimeout(() => authOverlay.classList.add('hidden'), 300);
  }
}

function updateAuthUI() {
  const accountLabel = document.getElementById('accountLabel');
  const accountBtn = document.getElementById('accountBtn');
  const userGreeting = document.getElementById('userGreeting');

  if (currentUser) {
    if (accountLabel) accountLabel.textContent = currentUser.name;
    if (userGreeting) userGreeting.textContent = currentUser.name;
    if (accountBtn) {
      accountBtn.classList.add('border-rose-500/50', 'text-white');
    }
  } else {
    if (accountLabel) accountLabel.textContent = 'Tài khoản';
    if (accountBtn) {
      accountBtn.classList.remove('border-rose-500/50', 'text-white');
    }
  }
}

function openOrdersModal() {
  const ordersOverlay = document.getElementById('ordersHistoryOverlay');
  const ordersListEl = document.getElementById('userOrdersList');
  const userOrders = JSON.parse(localStorage.getItem('cbv_user_orders') || '[]');

  if (ordersListEl) {
    if (userOrders.length === 0) {
      ordersListEl.innerHTML = `
        <div class="text-center py-12 text-zinc-400">
          <i class="fa-solid fa-receipt text-4xl mb-3 text-zinc-600"></i>
          <p class="font-medium text-zinc-300">Bạn chưa có đơn hàng nào</p>
          <p class="text-xs text-zinc-500 mt-1">Các đơn hàng bạn đặt tại Conbovuive Gear sẽ hiển thị tại đây.</p>
        </div>
      `;
    } else {
      ordersListEl.innerHTML = userOrders.map(order => `
        <div class="p-4 rounded-xl bg-zinc-900 border border-zinc-800 mb-3 hover:border-zinc-700 transition">
          <div class="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-3">
            <div>
              <span class="text-xs font-mono font-bold text-rose-400">${order.id}</span>
              <span class="text-[11px] text-zinc-500 ml-2">${order.date}</span>
            </div>
            <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">${order.status || 'Chờ xác nhận'}</span>
          </div>

          <div class="space-y-1.5 mb-3">
            ${(order.items || []).map(i => `
              <div class="flex justify-between text-xs text-zinc-300">
                <span class="truncate max-w-[240px]">${i.name} <span class="text-zinc-500">x${i.quantity || 1}</span></span>
                <span class="font-medium text-white">${(i.price * (i.quantity || 1)).toLocaleString('vi-VN')}₫</span>
              </div>
            `).join('')}
          </div>

          <div class="flex justify-between items-center pt-2 border-t border-zinc-800/80 text-xs">
            <span class="text-zinc-400 font-medium">Tổng thanh toán:</span>
            <span class="font-bold text-sm text-white">${order.total.toLocaleString('vi-VN')}₫</span>
          </div>
        </div>
      `).join('');
    }
  }

  if (ordersOverlay) {
    ordersOverlay.classList.remove('hidden');
    setTimeout(() => ordersOverlay.classList.remove('opacity-0'), 10);
  }
}

function closeOrdersModal() {
  const ordersOverlay = document.getElementById('ordersHistoryOverlay');
  if (ordersOverlay) {
    ordersOverlay.classList.add('opacity-0');
    setTimeout(() => ordersOverlay.classList.add('hidden'), 300);
  }
}
