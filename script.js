document.addEventListener('DOMContentLoaded', () => {
    // Top image slider
    const slides = document.querySelector('.slides');
    let id = 0;
    function slide() {
        id = (id + 1) % 2;
        slides.style.transform = `translateX(-${id * 50}%)`;
    }
    setInterval(slide, 5000);
});
