const carousel = document.getElementById('carousel');
const slides = carousel.children;
const totalSlides = slides.length;
const indicators = document.querySelectorAll('[data-index]');
let currentIndex = 0;
let interval;

function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;

    indicators.forEach((dot, i) => {
        dot.classList.toggle('bg-accent', i === currentIndex);
        dot.classList.toggle('bg-background', i !== currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function setSlide(index) {
    currentIndex = index;
    updateCarousel();
}

document.getElementById('next').addEventListener('click', nextSlide);
document.getElementById('prev').addEventListener('click', prevSlide);
indicators.forEach(dot => {
    dot.addEventListener('click', () => setSlide(parseInt(dot.dataset.index)));
});

function startAutoSlide() {
    interval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(interval);
}

carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);

startAutoSlide();