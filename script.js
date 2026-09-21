// =====================================================
// SLIDESHOW
// =====================================================

const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dotsContainer');
const progressBar = document.getElementById('progressBar');

let currentSlide = 0;

let slideDuration = 5000;

let progressInterval;
let slideTimeout;

let progress = 0;

let isAutoplay = true;
let showProgress = true;


// =====================================================
// CREATE SLIDESHOW DOTS
// =====================================================

slides.forEach((_, index) => {

    const dot = document.createElement('div');

    dot.className =
        'dot' + (index === 0 ? ' active' : '');

    dot.onclick = () => goToSlide(index);

    dotsContainer.appendChild(dot);

});

const dots = document.querySelectorAll('.dot');


// =====================================================
// UPDATE SLIDES
// =====================================================

function updateSlides() {

    slides.forEach((slide, index) => {

        slide.classList.toggle(
            'active',
            index === currentSlide
        );

    });


    dots.forEach((dot, index) => {

        dot.classList.toggle(
            'active',
            index === currentSlide
        );

    });

}


// =====================================================
// PROGRESS BAR
// =====================================================

function startProgress() {

    if (!showProgress) {

        progressBar.style.width = '0%';

        return;

    }


    progress = 0;

    progressBar.style.width = '0%';

    clearInterval(progressInterval);


    progressInterval = setInterval(() => {

        progress +=
            100 / (slideDuration / 50);

        progressBar.style.width =
            Math.min(progress, 100) + '%';

    }, 50);

}


// =====================================================
// NEXT SLIDE
// =====================================================

function nextSlide() {

    currentSlide =
        (currentSlide + 1) % slides.length;

    updateSlides();

    resetTimer();

}


// =====================================================
// PREVIOUS SLIDE
// =====================================================

function prevSlide() {

    currentSlide =
        (currentSlide - 1 + slides.length) %
        slides.length;

    updateSlides();

    resetTimer();

}


// =====================================================
// GO TO SPECIFIC SLIDE
// =====================================================

function goToSlide(index) {

    currentSlide = index;

    updateSlides();

    resetTimer();

}


// =====================================================
// RESET SLIDESHOW TIMER
// =====================================================

function resetTimer() {

    if (!isAutoplay) {
        return;
    }


    clearTimeout(slideTimeout);

    startProgress();


    slideTimeout =
        setTimeout(nextSlide, slideDuration);

}


// =====================================================
// SELECT BRAND
// =====================================================

function selectBrand(index) {

    // Change slideshow to selected brand
    currentSlide = index;

    updateSlides();

    // Close the panel
    closePanels();

    // Restart slideshow timer
    resetTimer();

}


// =====================================================
// CLOSE ALL PANELS
// =====================================================

function closePanels() {

    document
        .querySelectorAll('.section-panel')
        .forEach(panel => {

            panel.classList.remove('active');

        });


    document
        .querySelectorAll('.nav-item')
        .forEach(item => {

            item.classList.remove('active');

        });


    // Restart slideshow
    if (isAutoplay) {

        resetTimer();

    }

}


// =====================================================
// SHOW SECTION
// =====================================================

function showSection(section) {

    // Hide all panels
    document
        .querySelectorAll('.section-panel')
        .forEach(panel => {

            panel.classList.remove('active');

        });


    // Remove active state from bottom navigation
    document
        .querySelectorAll('.nav-item')
        .forEach(item => {

            item.classList.remove('active');

        });


    const panelMap = {

        brands: 'brandsPanel',

        menu: 'menuPanel',

        about: 'aboutPanel'

    };


    const navIndex = {

        brands: 0,

        menu: 1,

        about: 2

    };


    // Show selected panel
    if (panelMap[section]) {

        document
            .getElementById(panelMap[section])
            .classList.add('active');

    }


    // Highlight selected navigation button
    if (navIndex[section] !== undefined) {

        document
            .querySelectorAll('.nav-item')[navIndex[section]]
            .classList.add('active');

    }


    // Pause slideshow while a panel is open
    clearTimeout(slideTimeout);

    clearInterval(progressInterval);

}



// =====================================================
// AUTOPLAY SETTING
// =====================================================

function toggleAutoplay() {

    isAutoplay =
        document.getElementById(
            'autoplayToggle'
        ).checked;


    if (isAutoplay) {

        resetTimer();

    } else {

        clearTimeout(slideTimeout);

        clearInterval(progressInterval);

        progressBar.style.width = '0%';

    }

}


// =====================================================
// CHANGE SLIDE DURATION
// =====================================================

function changeDuration() {

    slideDuration =
        parseInt(
            document.getElementById(
                'durationSelect'
            ).value
        );


    if (isAutoplay) {

        resetTimer();

    }

}


// =====================================================
// TOGGLE PROGRESS BAR
// =====================================================

function toggleProgress() {

    showProgress =
        document.getElementById(
            'progressToggle'
        ).checked;


    if (!showProgress) {

        progressBar.style.width = '0%';

    } else if (isAutoplay) {

        startProgress();

    }

}


// =====================================================
// INITIALIZE
// =====================================================

resetTimer();


// =====================================================
// KEYBOARD NAVIGATION
// =====================================================

document.addEventListener(
    'keydown',
    (e) => {

        if (e.key === 'ArrowRight') {

            nextSlide();

        }


        if (e.key === 'ArrowLeft') {

            prevSlide();

        }

    }
);


// =====================================================
// PAUSE SLIDESHOW ON HOVER
// =====================================================

const container =
    document.querySelector(
        '.slideshow-container'
    );


container.addEventListener(
    'mouseenter',
    () => {

        if (isAutoplay) {

            clearTimeout(slideTimeout);

            clearInterval(progressInterval);

        }

    }
);


container.addEventListener(
    'mouseleave',
    () => {

        if (
            isAutoplay &&
            !document.querySelector(
                '.section-panel.active'
            )
        ) {

            resetTimer();

        }

    }
);

// =====================================================
// LARGE MENU IMAGE POPUP
// =====================================================

function openMenuImage(imageSrc, imageAlt) {

    const lightbox =
        document.getElementById('menuLightbox');

    const largeImage =
        document.getElementById('largeMenuImage');


    largeImage.src = imageSrc;
    largeImage.alt = imageAlt;


    // Show popup immediately
    lightbox.classList.add('active');


    // Prevent the page behind the popup from scrolling
    document.body.style.overflow = 'hidden';

}


// =====================================================
// CLOSE LARGE MENU IMAGE
// =====================================================

function closeMenuImage() {

    const lightbox =
        document.getElementById('menuLightbox');


    lightbox.classList.remove('active');


    // Restore page scrolling
    document.body.style.overflow = '';

}


// =====================================================
// CLICK OUTSIDE IMAGE TO CLOSE
// =====================================================

document
    .getElementById('menuLightbox')
    .addEventListener('click', function (e) {

        if (e.target === this) {

            closeMenuImage();

        }

    });


// =====================================================
// ESC KEY TO CLOSE
// =====================================================

document.addEventListener('keydown', function (e) {

    if (e.key === 'Escape') {

        closeMenuImage();

    }

});