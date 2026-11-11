// Hero Banner Slider Module
export function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dotsContainer = document.getElementById('sliderDots');
  const sliderContainer = document.getElementById('heroSliderContainer');

  let currentSlide = 0;
  let autoPlayTimer = null;

  if (slides.length === 0) return;

  // Render dots
  if (dotsContainer) {
    dotsContainer.innerHTML = Array.from(slides).map((_, i) => `
      <button class="slider-dot w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === 0 ? 'bg-white w-8' : 'bg-white/30 hover:bg-white/60'}" 
              data-index="${i}" 
              aria-label="Slide ${i + 1}"></button>
    `).join('');

    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'));
        goToSlide(idx);
      });
    });
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
        slide.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
      } else {
        slide.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
        slide.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
      }
    });

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.className = 'slider-dot h-2.5 rounded-full transition-all duration-300 bg-white w-8';
        } else {
          dot.className = 'slider-dot w-2.5 h-2.5 rounded-full transition-all duration-300 bg-white/30 hover:bg-white/60';
        }
      });
    }
  }

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    showSlide(currentSlide);
    resetAutoPlay();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, 4500);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
  }

  // Initial display
  showSlide(0);
  startAutoPlay();
}
