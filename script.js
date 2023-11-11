let currentIndex = 0;

function slideTo(index) {
    $('.slides').css('transform', `translateX(${-index * 50}%)`);
    currentIndex = index;
}

function nextSlide() {
    const totalSlides = $('.slides img').length;
    slideTo((currentIndex + 1) % totalSlides);
}

setInterval(nextSlide, 5000);
