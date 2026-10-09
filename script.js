// IMAGE SLIDER
document.querySelectorAll('[data-slider]').forEach(function(slider) {
    var track = slider.querySelector('.slider__track');
    var slides = slider.querySelectorAll('.slider__slide');
    var dots = slider.querySelectorAll('.slider__dot');
    var prevBtn = slider.querySelector('.slider__btn--prev');
    var nextBtn = slider.querySelector('.slider__btn--next');
    var current = 0;

    function goTo(index) {
        current = (index + slides.length) % slides.length;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dots.forEach(function(dot, i) {
            dot.classList.toggle('slider__dot--active', i === current);
        });
    }

    prevBtn.addEventListener('click', function() { goTo(current - 1); });
    nextBtn.addEventListener('click', function() { goTo(current + 1); });
    dots.forEach(function(dot, i) {
        dot.addEventListener('click', function() { goTo(i); });
    });
});

// STATS COUNTER ANIMATION
function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1800;
    var start = null;

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function step(timestamp) {
        if (!start) start = timestamp;
        var elapsed = timestamp - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = easeOutQuart(progress);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = target;
        }
    }

    requestAnimationFrame(step);
}

// Trigger counter when stats section enters viewport
var statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(function(el) {
                animateCounter(el);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

var statsSection = document.querySelector('.stats-section');
if (statsSection) statsObserver.observe(statsSection);