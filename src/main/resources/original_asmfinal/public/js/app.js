import { initSlider } from './slider.js';
import { initAuth } from './auth.js';
import { initCart, addToCart } from './cart.js';
import { products as initialProducts } from './products.js';

let allProducts = [...initialProducts];
let currentCategory = 'all';
let currentBrand = '';
let currentSearch = '';
let currentSort = 'default';

// Wishlist storage
let wishlist = JSON.parse(localStorage.getItem('cbv_wishlist') || '[]');

// Toast Notification Manager
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const typeIcons = {
    success: '<i class="fa-solid fa-circle-check text-emerald-400 text-lg"></i>',
    warning: '<i class="fa-solid fa-triangle-exclamation text-amber-400 text-lg"></i>',
    error: '<i class="fa-solid fa-circle-xmark text-rose-400 text-lg"></i>',
    info: '<i class="fa-solid fa-circle-info text-cyan-400 text-lg"></i>'
  };

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl text-white text-sm transform transition-all duration-300 translate-y-4 opacity-0 z-50`;
  toast.innerHTML = `
    ${typeIcons[type] || typeIcons.info}
    <div class="font-medium text-xs sm:text-sm">${message}</div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-x-full');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
};

// Wishlist Toggle
window.toggleWishlist = function(productId, e) {
  if (e) e.stopPropagation();
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  const idx = wishlist.findIndex(id => id === productId);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    window.showToast(`Đã bỏ "${product.name}" khỏi danh sách yêu thích`, 'info');
  } else {
    wishlist.push(productId);
    window.showToast(`Đã thêm "${product.name}" vào danh sách yêu thích!`, 'success');
  }
  localStorage.setItem('cbv_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  renderProducts();
};

function updateWishlistUI() {
  const wishlistCountEl = document.getElementById('wishlistCount');
  if (wishlistCountEl) {
    wishlistCountEl.textContent = wishlist.length;
    wishlistCountEl.classList.toggle('hidden', wishlist.length === 0);
  }
}

// Load products directly from JavaScript module with API sync
async function loadProducts() {
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const result = await res.json();
      if (result && result.data && result.data.length > 0) {
        allProducts = result.data;
      }
    }
  } catch (err) {
    // When opened directly as a file without Node.js server, use JS module data directly
    allProducts = [...initialProducts];
  }

  renderProducts();
}

function filterAndSortProducts() {
  let list = [...allProducts];

  // Category filter
  if (currentCategory && currentCategory !== 'all') {
    list = list.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
  }

  // Brand filter
  if (currentBrand) {
    list = list.filter(p => p.brand.toLowerCase() === currentBrand.toLowerCase());
  }

  // Search keyword
  if (currentSearch) {
    const q = currentSearch.toLowerCase().trim();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  // Sorting
  if (currentSort === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'discount') {
    list.sort((a, b) => (b.oldPrice - b.price) - (a.oldPrice - a.price));
  }

  return list;
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const countEl = document.getElementById('productsCountDisplay');
  const activeFiltersBar = document.getElementById('activeFiltersBar');
  if (!grid) return;

  const items = filterAndSortProducts();

  // Active filters pills display
  if (activeFiltersBar) {
    let pills = [];
    if (currentCategory !== 'all') {
      const catNames = { mouse: 'Chuột Gaming', keyboard: 'Bàn Phím Cơ', monitor: 'Màn Hình', gpu: 'Card Màn Hình', audio: 'Tai Nghe Gaming' };
      pills.push(`
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-zinc-800 text-zinc-200 border border-zinc-700">
          Danh mục: ${catNames[currentCategory] || currentCategory}
          <button onclick="window.filterCategory('all')" class="hover:text-rose-400">&times;</button>
        </span>
      `);
    }
    if (currentBrand) {
      pills.push(`
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-zinc-800 text-zinc-200 border border-zinc-700">
          Thương hiệu: ${currentBrand}
          <button onclick="window.clearBrandFilter()" class="hover:text-rose-400">&times;</button>
        </span>
      `);
    }
    if (currentSearch) {
      pills.push(`
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-zinc-800 text-zinc-200 border border-zinc-700">
          Từ khóa: "${currentSearch}"
          <button onclick="window.clearSearchFilter()" class="hover:text-rose-400">&times;</button>
        </span>
      `);
    }

    if (pills.length > 0) {
      activeFiltersBar.innerHTML = `
        <div class="flex items-center gap-2 flex-wrap mb-4">
          <span class="text-xs text-zinc-500 font-semibold">Đang lọc theo:</span>
          ${pills.join('')}
          <button onclick="window.resetAllFilters()" class="text-xs text-rose-400 hover:underline ml-2">Xóa tất cả</button>
        </div>
      `;
      activeFiltersBar.classList.remove('hidden');
    } else {
      activeFiltersBar.classList.add('hidden');
    }
  }

  if (countEl) {
    countEl.textContent = `Hiển thị ${items.length} sản phẩm`;
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center text-zinc-400 bg-zinc-900/40 rounded-2xl border border-zinc-800/80">
        <i class="fa-solid fa-magnifying-glass text-4xl mb-4 text-zinc-600"></i>
        <h4 class="text-lg font-bold text-white mb-1">Không tìm thấy sản phẩm phù hợp</h4>
        <p class="text-xs text-zinc-400 mb-4">Hãy thử tìm với từ khóa khác hoặc điều chỉnh bộ lọc.</p>
        <button onclick="window.resetAllFilters()" class="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition">
          Xóa tất cả bộ lọc
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(product => {
    const isWished = wishlist.includes(product.id);
    return `
      <div class="gaming-card rounded-2xl overflow-hidden group flex flex-col justify-between relative bg-zinc-900/70 border border-zinc-800">
        <!-- Top Badges & Wishlist -->
        <div class="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <div class="flex items-center gap-1.5">
            ${product.badge ? `
              <span class="badge-tag bg-zinc-950/90 text-white border border-zinc-700/80 backdrop-blur-md">
                ${product.badge}
              </span>
            ` : ''}
            ${product.discount ? `
              <span class="badge-tag bg-rose-600 text-white font-bold">
                ${product.discount}
              </span>
            ` : ''}
          </div>
          <button onclick="window.toggleWishlist('${product.id}', event)" 
                  class="w-8 h-8 rounded-full bg-zinc-950/80 border border-zinc-700 backdrop-blur-md flex items-center justify-center pointer-events-auto transition hover:scale-110 ${isWished ? 'text-rose-500' : 'text-zinc-400 hover:text-white'}"
                  title="Thêm vào yêu thích">
            <i class="${isWished ? 'fa-solid' : 'fa-regular'} fa-heart text-xs"></i>
          </button>
        </div>

        <!-- Product Image & Quick View trigger -->
        <div class="relative h-56 bg-zinc-950 overflow-hidden cursor-pointer" onclick="window.openProductDetailModal('${product.id}')">
          <img src="${product.image}" 
               alt="${product.name}" 
               class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-90 group-hover:opacity-100">
          
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60"></div>
          
          <!-- Hover quick preview button -->
          <div class="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button class="w-full py-2 bg-zinc-900/95 hover:bg-white hover:text-black text-white text-xs font-bold rounded-lg border border-zinc-700 shadow-xl backdrop-blur transition flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-eye text-xs"></i> Xem nhanh chi tiết
            </button>
          </div>
        </div>

        <!-- Product Information -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
              <span class="font-bold uppercase tracking-wider text-[10px] text-zinc-500">${product.brand}</span>
              <div class="flex items-center text-amber-400 gap-1 text-[11px]">
                <i class="fa-solid fa-star"></i>
                <span class="font-bold text-white">${product.rating || '4.9'}</span>
                <span class="text-zinc-500">(${product.reviewsCount || '80'})</span>
              </div>
            </div>

            <h4 class="font-bold text-white text-sm line-clamp-2 hover:text-zinc-300 transition cursor-pointer mb-2" onclick="window.openProductDetailModal('${product.id}')">
              ${product.name}
            </h4>

            <div class="flex items-baseline gap-2 mb-4">
              <span class="text-base font-extrabold text-white">${product.price.toLocaleString('vi-VN')}₫</span>
              ${product.oldPrice ? `
                <span class="text-xs text-zinc-500 line-through">${product.oldPrice.toLocaleString('vi-VN')}₫</span>
              ` : ''}
            </div>
          </div>

          <!-- Actions -->
          <div class="grid grid-cols-4 gap-2 pt-2 border-t border-zinc-800/80">
            <button onclick="window.addToCartById('${product.id}')" 
                    class="col-span-3 py-2.5 px-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs transition duration-200 flex items-center justify-center gap-1.5 shadow-lg shadow-white/5 active:scale-95">
              <i class="fa-solid fa-cart-shopping text-xs"></i> Thêm Vào Giỏ
            </button>
            <button onclick="window.openProductDetailModal('${product.id}')" 
                    class="col-span-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition flex items-center justify-center border border-zinc-700 hover:text-white"
                    title="Chi tiết thông số">
              <i class="fa-solid fa-sliders"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Add to Cart helper by ID
window.addToCartById = function(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (product) {
    addToCart(product, 1);
  }
};

// Filter Category
window.filterCategory = function(catKey) {
  currentCategory = catKey;
  currentBrand = '';
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  filterBtns.forEach(btn => {
    const isTarget = btn.getAttribute('data-cat') === catKey;
    if (isTarget) {
      btn.className = 'filter-tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white text-black transition shadow-lg shadow-white/10';
    } else {
      btn.className = 'filter-tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition';
    }
  });

  renderProducts();
  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
};

// Filter Brand
window.filterBrand = function(catKey, brandName) {
  currentCategory = catKey || 'all';
  currentBrand = brandName;
  window.filterCategory(currentCategory);
  renderProducts();
  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
};

window.clearBrandFilter = function() {
  currentBrand = '';
  renderProducts();
};

window.clearSearchFilter = function() {
  currentSearch = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  renderProducts();
};

window.resetAllFilters = function() {
  currentCategory = 'all';
  currentBrand = '';
  currentSearch = '';
  currentSort = 'default';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'default';
  window.filterCategory('all');
};

// Modal Detail with Image Gallery & Specs
let currentModalProduct = null;
let modalQuantity = 1;

window.openProductDetailModal = function(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  currentModalProduct = product;
  modalQuantity = 1;

  const overlay = document.getElementById('detailModalOverlay');
  const mainImg = document.getElementById('modalMainImg');
  const galleryContainer = document.getElementById('modalGalleryThumbs');
  const titleEl = document.getElementById('modalTitle');
  const catEl = document.getElementById('modalCat');
  const brandEl = document.getElementById('modalBrand');
  const priceEl = document.getElementById('modalPrice');
  const oldPriceEl = document.getElementById('modalOldPrice');
  const descEl = document.getElementById('modalDesc');
  const specsTableEl = document.getElementById('modalSpecsTable');
  const qtyEl = document.getElementById('modalQty');
  const stockEl = document.getElementById('modalStock');

  if (titleEl) titleEl.textContent = product.name;
  if (catEl) catEl.textContent = product.categoryName;
  if (brandEl) brandEl.textContent = product.brand;
  if (priceEl) priceEl.textContent = product.price.toLocaleString('vi-VN') + '₫';
  if (oldPriceEl) {
    if (product.oldPrice) {
      oldPriceEl.textContent = product.oldPrice.toLocaleString('vi-VN') + '₫';
      oldPriceEl.classList.remove('hidden');
    } else {
      oldPriceEl.classList.add('hidden');
    }
  }
  if (descEl) descEl.textContent = product.description;
  if (qtyEl) qtyEl.textContent = '1';

  if (stockEl) {
    stockEl.innerHTML = product.inStock !== false ?
      `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Còn hàng (${product.stockCount || 10} sản phẩm sẵn sàng giao)` :
      `<span class="w-2 h-2 rounded-full bg-rose-400"></span> Tạm hết hàng`;
  }

  if (mainImg) mainImg.src = product.image;

  // Render gallery thumbnails
  if (galleryContainer) {
    const gallery = product.gallery || [product.image];
    galleryContainer.innerHTML = gallery.map((imgSrc, i) => `
      <img src="${imgSrc}" 
           alt="Thumb ${i}" 
           onclick="window.switchModalImage('${imgSrc}')"
           class="w-16 h-16 rounded-lg object-cover cursor-pointer border-2 ${i === 0 ? 'border-white' : 'border-zinc-800 opacity-60 hover:opacity-100'} transition">
    `).join('');
  }

  // Render specifications
  if (specsTableEl && product.specs) {
    specsTableEl.innerHTML = Object.entries(product.specs).map(([k, v]) => `
      <tr class="border-b border-zinc-800/60 text-xs">
        <td class="py-2 pr-3 font-semibold text-zinc-400 w-1/3">${k}</td>
        <td class="py-2 text-zinc-200">${v}</td>
      </tr>
    `).join('');
  }

  if (overlay) {
    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.remove('opacity-0'), 10);
  }
};

window.switchModalImage = function(src) {
  const mainImg = document.getElementById('modalMainImg');
  if (mainImg) mainImg.src = src;
  const thumbs = document.querySelectorAll('#modalGalleryThumbs img');
  thumbs.forEach(t => {
    t.classList.toggle('border-white', t.src === src);
    t.classList.toggle('border-zinc-800', t.src !== src);
    t.classList.toggle('opacity-60', t.src !== src);
  });
};

window.changeModalQty = function(delta) {
  modalQuantity = Math.max(1, modalQuantity + delta);
  const qtyEl = document.getElementById('modalQty');
  if (qtyEl) qtyEl.textContent = modalQuantity;
};

window.modalAddToCart = function() {
  if (currentModalProduct) {
    addToCart(currentModalProduct, modalQuantity);
    window.closeProductDetailModal();
  }
};

window.modalBuyNow = function() {
  if (currentModalProduct) {
    addToCart(currentModalProduct, modalQuantity);
    window.closeProductDetailModal();
    // Open checkout directly
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.click();
  }
};

window.closeProductDetailModal = function() {
  const overlay = document.getElementById('detailModalOverlay');
  if (overlay) {
    overlay.classList.add('opacity-0');
    setTimeout(() => overlay.classList.add('hidden'), 300);
  }
};

// Flash Sale Countdown Timer
function initCountdown() {
  const hoursEl = document.getElementById('saleHours');
  const minutesEl = document.getElementById('saleMinutes');
  const secondsEl = document.getElementById('saleSeconds');

  if (!hoursEl || !minutesEl || !secondsEl) return;

  // Set 8 hours countdown cycle
  let remainingSeconds = 8 * 3600 + 45 * 60 + 30;

  setInterval(() => {
    remainingSeconds--;
    if (remainingSeconds < 0) remainingSeconds = 24 * 3600;

    const h = Math.floor(remainingSeconds / 3600);
    const m = Math.floor((remainingSeconds % 3600) / 60);
    const s = remainingSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// Search & Sort Event Listeners
function initSearchAndFilter() {
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');

  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentSearch = e.target.value.trim();
        renderProducts();
        if (currentSearch.length > 0) {
          document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);
    });

    // Keyboard shortcut '/' or 'Ctrl+K' to focus search
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement !== searchInput)) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Filter tab buttons
  document.querySelectorAll('.filter-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      window.filterCategory(cat);
    });
  });
}

// Mobile Menu Drawer
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileOverlay = document.getElementById('mobileMenuOverlay');

  function openMobile() {
    mobileDrawer?.classList.remove('-translate-x-full');
    mobileOverlay?.classList.remove('hidden');
    setTimeout(() => mobileOverlay?.classList.remove('opacity-0'), 10);
  }

  function closeMobile() {
    mobileDrawer?.classList.add('-translate-x-full');
    mobileOverlay?.classList.add('opacity-0');
    setTimeout(() => mobileOverlay?.classList.add('hidden'), 300);
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobile);
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobile);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobile);

  // Close when clicking mobile links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobile);
  });
}

// Back to Top button
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initAuth();
  initCart();
  initSearchAndFilter();
  initCountdown();
  initMobileMenu();
  initBackToTop();
  updateWishlistUI();
  loadProducts();

  // Close detail modal events
  const closeDetailBtn = document.getElementById('closeDetailBtn');
  const detailOverlay = document.getElementById('detailModalOverlay');
  if (closeDetailBtn) closeDetailBtn.addEventListener('click', window.closeProductDetailModal);
  if (detailOverlay) {
    detailOverlay.addEventListener('click', (e) => {
      if (e.target === detailOverlay) window.closeProductDetailModal();
    });
  }
});
