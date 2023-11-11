let currentIndex = 0;

function slideTo(index) {
    const slidesElement = document.querySelector('.slides');
    slidesElement.style.transform = `translateX(${-index * 50}%)`;
    currentIndex = index;
}

function nextSlide() {
    const totalSlides = document.querySelectorAll('.slides img').length;
    slideTo((currentIndex + 1) % totalSlides);
}

setInterval(nextSlide, 5000); 