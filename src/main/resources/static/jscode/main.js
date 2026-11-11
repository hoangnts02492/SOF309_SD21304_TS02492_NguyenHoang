import { initSlider } from './slider.js';
import { initAuth } from './auth.js';
import { initCart, addToCart, checkout } from './cart.js';

window.addToCart = addToCart;
window.checkout = checkout;

// Tìm kiếm thời gian thực (Real-time Search)
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const productCards = document.querySelectorAll('.product-card');
    const productGrid = document.getElementById('productGrid');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase().trim();

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-cat') === 'all');
        });

        let foundCount = 0;

        productCards.forEach(card => {
            const productName = card.querySelector('h4')?.textContent.toLowerCase() || '';
            const productCat = card.querySelector('.p-cat')?.textContent.toLowerCase() || '';

            if (productName.includes(keyword) || productCat.includes(keyword)) {
                card.style.display = 'block';
                foundCount++;
            } else {
                card.style.display = 'none';
            }
        });

        let noResultMsg = document.getElementById('noSearchResultMsg');
        if (foundCount === 0) {
            if (!noResultMsg) {
                noResultMsg = document.createElement('p');
                noResultMsg.id = 'noSearchResultMsg';
                noResultMsg.className = 'empty-cart-msg';
                noResultMsg.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 40px 0; color: #a1a1aa;';
                productGrid.appendChild(noResultMsg);
            }
            noResultMsg.textContent = `Không tìm thấy sản phẩm phù hợp với từ khóa "${e.target.value}"`;
        } else if (noResultMsg) {
            noResultMsg.remove();
        }

        if (keyword.length > 0) {
            document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Lọc sản phẩm theo danh mục
window.filterCategory = function(category) {
    const cards = document.querySelectorAll('.product-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');

    if (searchInput) searchInput.value = '';
    const noResultMsg = document.getElementById('noSearchResultMsg');
    if (noResultMsg) noResultMsg.remove();

    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-cat') === category);
    });

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
};
// Lọc sản phẩm theo hãng khi bấm vào dropdown trong mục danh mục
window.filterBrand = function(categoryKey, brandName) {
    const cards = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('searchInput');

    if (searchInput) searchInput.value = '';
    const noResultMsg = document.getElementById('noSearchResultMsg');
    if (noResultMsg) noResultMsg.remove();

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-cat') === categoryKey);
    });

    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        const cardTitle = card.querySelector('h4')?.textContent.toLowerCase() || '';
        
        const matchCategory = (cardCat === categoryKey);
        const matchBrand = cardTitle.includes(brandName.toLowerCase());

        if (matchCategory && matchBrand) {
            card.style.display = 'block';
        } else {
            card.style.display = matchCategory ? 'block' : 'none';
        }
    });

    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
};

// Modal chi tiết sản phẩm
window.openProductDetail = function(name, price, imgUrl, category, desc) {
    const overlay = document.getElementById('detailModalOverlay');
    document.getElementById('modalProductName').textContent = name;
    document.getElementById('modalProductPrice').textContent = price.toLocaleString('vi-VN') + '₫';
    document.getElementById('modalProductImg').src = imgUrl;
    document.getElementById('modalProductCat').textContent = category;
    document.getElementById('modalProductDesc').textContent = desc;

    const addBtn = document.getElementById('modalAddToCartBtn');
    addBtn.onclick = () => {
        addToCart(name, price);
        overlay.classList.remove('open');
    };

    overlay.classList.add('open');
};

document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initAuth();
    initCart();
    initSearch();

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-cat');
            window.filterCategory(cat);
        });
    });

    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const detailOverlay = document.getElementById('detailModalOverlay');
    
    if (closeDetailBtn && detailOverlay) {
        closeDetailBtn.addEventListener('click', () => detailOverlay.classList.remove('open'));
        detailOverlay.addEventListener('click', (e) => {
            if (e.target === detailOverlay) detailOverlay.classList.remove('open');
        });
    }
});