/* =========================================================
   MATI FOOD COURT
   INFINITE COVERFLOW + MENU
   ========================================================= */


/* =========================================================
   STALL DATA
   ========================================================= */

const stalls = [
    {
        name: "ATE RICA'S BACSILOG",
        tagline: "Bacsilog & Filipino Favorites",
        logo: "TENANT LOGO/BACSILOG.png",
        menu: "TENANT MENU/ATE RICA.jpg"
    },
    {
        name: "Casa Daza Specials",
        tagline: "Special Filipino Favorites",
        logo: "TENANT LOGO/Casa Daza Round Logo.PNG",
        menu: "TENANT MENU/CSA DAZA_2026-09-10.jpg"
    },
    {
        name: "CHICKEN CHINGU",
        tagline: "Korean-Inspired Chicken",
        logo: "TENANT LOGO/CHICKEN CHINGU.png",
        menu: "TENANT MENU/CHICKEN CHINGU - TMC-A4-Menu.jpg"
    },
    {
        name: "FRUITAS",
        tagline: "Fresh & Fruity Favorites",
        logo: "TENANT LOGO/FRUITAS.jpg",
        menu: "TENANT MENU/F- HANDMENU.jpg"
    },
    {
        name: "Goto King",
        tagline: "Quality & Affordable Filipino Meals",
        logo: "TENANT LOGO/Goto king.png",
        menu: "TENANT MENU/GOTO KING_2026-09-09.jpg"
    },
    {
        name: "HENLIN",
        tagline: "Chinese Favorites & Dim Sum",
        logo: "TENANT LOGO/HENLIN.jpg",
        menu: "TENANT MENU/HENLIN_2026-09-15.jpg"
    },
    {
        name: "K-Egg",
        tagline: "Korean Egg Sandwiches",
        logo: "TENANT LOGO/K-Egg Logo.jpg",
        menu: "TENANT MENU/K-EGG_2026-09-10.jpg"
    },
    {
        name: "MASTER SIOMAI",
        tagline: "The #1 Siomai Brand in the Philippines",
        logo: "TENANT LOGO/MASTER SIOMAI.png",
        menu: "TENANT MENU/MASTER SIOMAI_2026-09-11.jpg"
    },
    {
        name: "Plato Wraps",
        tagline: "Fresh & Flavorful Wraps",
        logo: "TENANT LOGO/plato.jpg",
        menu: "TENANT MENU/PLATO WRAPS_2026-09-10.jpg"
    },
    {
        name: "REKADOS",
        tagline: "Filipino Comfort Food",
        logo: "TENANT LOGO/REKADOS.jpg",
        menu: "TENANT MENU/REKADOS MENU.png"
    },
    {
        name: "SEOUL SAMGYUP",
        tagline: "Korean Samgyupsal Favorites",
        logo: "TENANT LOGO/SEOUL SAMGYUP.png",
        menu: "TENANT MENU/SEOUL SAMGYEOP_2026-09-10.jpg"
    },
    {
        name: "TIMPLADOR",
        tagline: "Filipino Flavors & Favorites",
        logo: "TENANT LOGO/TIMPLADOR.jpg",
        menu: "TENANT MENU/TIMPLADOR_2026-09-10.png"
    }
];


/*
   IMPORTANT:
   If your SEOUL SAMGYUP logo file is actually:
   TENANT LOGO/SEOUL SAMGYUP.png

   change the logo line above back to:

   logo: "TENANT LOGO/SEOUL SAMGYUP.png",
*/


/* =========================================================
   DOM
   ========================================================= */

const carousel = document.getElementById("carousel");
const carouselTrack = document.getElementById("carouselTrack");
const dotsContainer = document.getElementById("dotsContainer");
const progressBar = document.getElementById("progressBar");
const viewLabel = document.getElementById("viewLabel");

const menuLightbox = document.getElementById("menuLightbox");
const largeMenuImage = document.getElementById("largeMenuImage");
const lightboxTitle = document.getElementById("lightboxTitle");

const stallsNav = document.getElementById("stallsNav");
const menuNav = document.getElementById("menuNav");
const aboutNav = document.getElementById("aboutNav");
const aboutPanel = document.getElementById("aboutPanel");


/* =========================================================
   STATE
   ========================================================= */

let currentSlide = 0;
let currentMode = "stalls";

let isDragging = false;
let pointerStartX = 0;
let pointerCurrentX = 0;

let suppressClick = false;
let wheelLocked = false;

let slideTimeout = null;
let progressInterval = null;

let progress = 0;

const slideDuration = 5000;
const totalSlides = stalls.length;


/* =========================================================
   CREATE STALL CARDS
   ========================================================= */

function createStallCards() {

    carouselTrack.innerHTML = "";

    stalls.forEach((stall, index) => {

        const card = document.createElement("article");

        card.className = "carousel-card";

        card.dataset.index = index;

        let displayName = stall.name;

        if (stall.name === "ATE RICA'S BACSILOG") {
            displayName = "ATE RICA'S<br>BACSILOG";
        }

        card.innerHTML = `

            <div class="logo-container">

                <img
                    src="${stall.logo}"
                    alt="${stall.name} logo"
                    draggable="false">

            </div>


            <div class="brand-name">
                ${displayName}
            </div>


            <div class="brand-tagline">
                ${stall.tagline}
            </div>


            <div class="phone-card">

                <div class="phone-icon">

                    <svg viewBox="0 0 24 24" aria-hidden="true">

                        <path d="
                            M6.62 10.79
                            c1.44 2.83 3.76 5.14 6.59 6.59
                            l2.2-2.2
                            c.27-.27.67-.36 1.02-.24
                            1.12.37 2.33.57 3.57.57
                            .55 0 1 .45 1 1V20
                            c0 .55-.45 1-1 1
                            C10.61 21 3 13.39 3 4
                            c0-.55.45-1 1-1h3.5
                            c.55 0 1 .45 1 1
                            0 1.25.2 2.45.57 3.57
                            .11.35.03.74-.25 1.02l-2.2 2.2z">
                        </path>

                    </svg>

                </div>


                <div class="phone-info">

                    <span class="phone-label">
                        Food Court Stall
                    </span>

                    <span class="phone-number">
                        ${stall.name}
                    </span>

                </div>

            </div>


            <button
                class="view-menu-btn"
                type="button">

                View Menu

            </button>

        `;


        /* Prevent image dragging */
        const image = card.querySelector("img");

        image.addEventListener("dragstart", event => {
            event.preventDefault();
        });


        /* View Menu */
        const menuButton =
            card.querySelector(".view-menu-btn");

        menuButton.addEventListener("click", event => {

            event.stopPropagation();

            if (suppressClick) {
                return;
            }

            openMenuImage(
                stall.menu,
                `${stall.name} Menu`
            );

        });


        /* Card click */
        card.addEventListener("click", () => {

            if (suppressClick) {
                return;
            }

            const index =
                Number(card.dataset.index);

            const distance =
                circularDistance(
                    index,
                    currentSlide
                );


            if (distance === 0) {

                openMenuImage(
                    stall.menu,
                    `${stall.name} Menu`
                );

            } else {

                goToSlide(index);

            }

        });


        carouselTrack.appendChild(card);

    });

}


/* =========================================================
   CREATE MENU CARDS
   ========================================================= */

function createMenuCards() {

    carouselTrack.innerHTML = "";

    stalls.forEach((stall, index) => {

        const card = document.createElement("article");

        card.className =
            "carousel-card menu-mode";

        card.dataset.index = index;


        card.innerHTML = `

            <div class="menu-preview">

                <img
                    src="${stall.menu}"
                    alt="${stall.name} Menu"
                    draggable="false">

            </div>


            <div class="menu-brand-name">
                ${stall.name}
            </div>


            <button
                class="menu-action"
                type="button">

                TAP TO VIEW MENU

            </button>

        `;


        const image =
            card.querySelector("img");

        image.addEventListener(
            "dragstart",
            event => event.preventDefault()
        );


        const menuAction =
            card.querySelector(".menu-action");


        menuAction.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                openMenuImage(
                    stall.menu,
                    `${stall.name} Menu`
                );

            }
        );


        card.addEventListener(
            "click",
            () => {

                if (suppressClick) {
                    return;
                }


                const index =
                    Number(card.dataset.index);


                const distance =
                    circularDistance(
                        index,
                        currentSlide
                    );


                if (distance === 0) {

                    openMenuImage(
                        stall.menu,
                        `${stall.name} Menu`
                    );

                } else {

                    goToSlide(index);

                }

            }
        );


        carouselTrack.appendChild(card);

    });

}


/* =========================================================
   CREATE DOTS
   ========================================================= */

function createDots() {

    dotsContainer.innerHTML = "";

    stalls.forEach((stall, index) => {

        const dot =
            document.createElement("button");

        dot.type = "button";

        dot.className = "dot";

        dot.setAttribute(
            "aria-label",
            `Go to ${stall.name}`
        );


        dot.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                goToSlide(index);

            }
        );


        dotsContainer.appendChild(dot);

    });

}


/* =========================================================
   GET CARDS
   ========================================================= */

function getCards() {

    return Array.from(
        carouselTrack.querySelectorAll(
            ".carousel-card"
        )
    );

}


/* =========================================================
   CIRCULAR DISTANCE
   ========================================================= */

function circularDistance(index, activeIndex) {

    let distance =
        index - activeIndex;

    const half =
        totalSlides / 2;


    if (distance > half) {
        distance -= totalSlides;
    }


    if (distance < -half) {
        distance += totalSlides;
    }


    return distance;

}


/* =========================================================
   UPDATE COVERFLOW
   ========================================================= */

function updateCarousel(animate = true) {

    const cards = getCards();

    const isMobile = window.innerWidth <= 700;

    const sideDistance =
        isMobile ? 185 : 300;

    const farDistance =
        isMobile ? 320 : 525;

    const hiddenDistance =
        isMobile ? 440 : 720;


    cards.forEach((card, index) => {

        const distance =
            circularDistance(
                index,
                currentSlide
            );


        let x = 0;
        let z = 0;
        let scale = 1;
        let rotate = 0;
        let opacity = 1;
        let zIndex = 100;


        /* =================================================
           CENTER
           ================================================= */

        if (distance === 0) {

            x = 0;

            z = 80;

            scale = 1;

            rotate = 0;

            opacity = 1;

            zIndex = 100;

            card.classList.add("center");

        }


        /* =================================================
           LEFT
           ================================================= */

        else if (distance === -1) {

            x = -sideDistance;

            z = 10;

            scale = isMobile
                ? 0.82
                : 0.82;

            rotate = 20;

            opacity = 0.72;

            zIndex = 80;

            card.classList.remove("center");

        }


        /* =================================================
           RIGHT
           ================================================= */

        else if (distance === 1) {

            x = sideDistance;

            z = 10;

            scale = isMobile
                ? 0.82
                : 0.82;

            rotate = -20;

            opacity = 0.72;

            zIndex = 80;

            card.classList.remove("center");

        }


        /* =================================================
           FAR LEFT
           ================================================= */

        else if (distance === -2) {

            x = -farDistance;

            z = -40;

            scale = isMobile
                ? 0.68
                : 0.66;

            rotate = 32;

            opacity = 0.38;

            zIndex = 60;

            card.classList.remove("center");

        }


        /* =================================================
           FAR RIGHT
           ================================================= */

        else if (distance === 2) {

            x = farDistance;

            z = -40;

            scale = isMobile
                ? 0.68
                : 0.66;

            rotate = -32;

            opacity = 0.38;

            zIndex = 60;

            card.classList.remove("center");

        }


        /* =================================================
           HIDDEN
           ================================================= */

        else {

            x =
                distance < 0
                    ? -hiddenDistance
                    : hiddenDistance;

            z = -100;

            scale = 0.52;

            rotate =
                distance < 0
                    ? 42
                    : -42;

            opacity = 0;

            zIndex = 1;

            card.classList.remove("center");

        }


        card.style.setProperty(
            "--x",
            `${x}px`
        );

        card.style.setProperty(
            "--z",
            `${z}px`
        );

        card.style.setProperty(
            "--scale",
            scale
        );

        card.style.setProperty(
            "--rotate",
            `${rotate}deg`
        );

        card.style.setProperty(
            "--opacity",
            opacity
        );

        card.style.zIndex =
            zIndex;


        card.style.transition =
            animate
                ? ""
                : "none";

    });


    updateDots();

}


/* =========================================================
   UPDATE DOTS
   ========================================================= */

function updateDots() {

    const dots =
        dotsContainer.querySelectorAll(".dot");


    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentSlide
        );

    });

}


/* =========================================================
   UPDATE LABEL
   ========================================================= */

function updateViewLabel() {

    if (currentMode === "menu") {

        viewLabel.textContent =
            "STALL MENUS";

    } else {

        viewLabel.textContent =
            "OUR STALLS";

    }

}


/* =========================================================
   NEXT
   ========================================================= */

function nextSlide() {

    currentSlide =
        (currentSlide + 1) %
        totalSlides;

    updateCarousel();

    resetTimer();

}


/* =========================================================
   PREVIOUS
   ========================================================= */

function prevSlide() {

    currentSlide =
        (
            currentSlide -
            1 +
            totalSlides
        ) %
        totalSlides;

    updateCarousel();

    resetTimer();

}


/* =========================================================
   GO TO SLIDE
   ========================================================= */

function goToSlide(index) {

    currentSlide =
        (
            index +
            totalSlides
        ) %
        totalSlides;

    updateCarousel();

    resetTimer();

}


/* =========================================================
   SHOW SECTION
   ========================================================= */

function showSection(section) {

    closeMenuImage();

    aboutPanel.classList.remove("active");

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

        });


    /* =============================================
       STALLS
       ============================================= */

    if (section === "stalls") {

        currentMode = "stalls";

        currentSlide = 0;

        createStallCards();

        updateViewLabel();

        updateCarousel(false);

        stallsNav.classList.add("active");

        resetTimer();

        return;

    }


    /* =============================================
       MENU
       ============================================= */

    if (section === "menu") {

        currentMode = "menu";

        currentSlide = 0;

        createMenuCards();

        updateViewLabel();

        updateCarousel(false);

        menuNav.classList.add("active");

        resetTimer();

        return;

    }


    /* =============================================
       ABOUT
       ============================================= */

    if (section === "about") {

        pauseCarousel();

        aboutPanel.classList.add("active");

        aboutNav.classList.add("active");

        return;

    }

}


/* =========================================================
   OPEN MENU FROM CENTER CARD
   ========================================================= */

function openMenuMode(index) {

    currentMode = "menu";

    currentSlide = index;

    createMenuCards();

    updateViewLabel();

    updateCarousel(false);

    menuNav.classList.add("active");

    resetTimer();

}


/* =========================================================
   CLOSE PANELS
   ========================================================= */

function closePanels() {

    aboutPanel.classList.remove("active");

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

        });


    if (currentMode === "menu") {

        menuNav.classList.add("active");

    } else {

        stallsNav.classList.add("active");

    }


    resetTimer();

}


/* =========================================================
   PROGRESS BAR
   ========================================================= */

function startProgress() {

    clearInterval(progressInterval);

    progress = 0;

    progressBar.style.width = "0%";


    progressInterval =
        setInterval(() => {

            progress +=
                100 /
                (slideDuration / 50);


            progressBar.style.width =
                `${Math.min(progress, 100)}%`;

        }, 50);

}


/* =========================================================
   RESET TIMER
   ========================================================= */

function resetTimer() {

    clearTimeout(slideTimeout);

    clearInterval(progressInterval);


    if (
        aboutPanel.classList.contains("active") ||
        menuLightbox.classList.contains("active")
    ) {

        progressBar.style.width = "0%";

        return;

    }


    startProgress();


    slideTimeout =
        setTimeout(() => {

            nextSlide();

        }, slideDuration);

}


/* =========================================================
   PAUSE
   ========================================================= */

function pauseCarousel() {

    clearTimeout(slideTimeout);

    clearInterval(progressInterval);

}


/* =========================================================
   HOVER
   ========================================================= */

carousel.addEventListener(
    "mouseenter",
    pauseCarousel
);


carousel.addEventListener(
    "mouseleave",
    resetTimer
);


/* =========================================================
   PREVIOUS BUTTON
   ========================================================= */

const previousButton =
    document.querySelector(".carousel-prev");


if (previousButton) {

    previousButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            prevSlide();

        }
    );

}


/* =========================================================
   NEXT BUTTON
   ========================================================= */

const nextButton =
    document.querySelector(".carousel-next");


if (nextButton) {

    nextButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            nextSlide();

        }
    );

}


/* =========================================================
   MOUSE / TOUCH DRAG
   ========================================================= */

carousel.addEventListener(
    "pointerdown",
    event => {

        if (
            event.target.closest(
                ".carousel-arrow, .view-menu-btn, .menu-action"
            )
        ) {

            return;

        }


        isDragging = true;

        suppressClick = false;

        pointerStartX =
            event.clientX;

        pointerCurrentX =
            event.clientX;


        carousel.classList.add(
            "dragging"
        );


        pauseCarousel();


        try {
            carousel.setPointerCapture(
                event.pointerId
            );
        } catch (error) {}

    }
);


carousel.addEventListener(
    "pointermove",
    event => {

        if (!isDragging) {
            return;
        }


        pointerCurrentX =
            event.clientX;


        const difference =
            pointerCurrentX -
            pointerStartX;


        if (
            Math.abs(difference) > 8
        ) {

            suppressClick = true;

        }

    }
);


function finishPointerDrag(event) {

    if (!isDragging) {
        return;
    }


    isDragging = false;

    carousel.classList.remove(
        "dragging"
    );


    const difference =
        pointerCurrentX -
        pointerStartX;


    const threshold = 55;


    if (
        Math.abs(difference) >=
        threshold
    ) {

        if (difference < 0) {

            nextSlide();

        } else {

            prevSlide();

        }

    } else {

        resetTimer();

    }


    try {

        carousel.releasePointerCapture(
            event.pointerId
        );

    } catch (error) {}


    setTimeout(() => {

        suppressClick = false;

    }, 100);

}


carousel.addEventListener(
    "pointerup",
    finishPointerDrag
);


carousel.addEventListener(
    "pointercancel",
    finishPointerDrag
);


/* =========================================================
   MOUSE WHEEL
   ========================================================= */

carousel.addEventListener(
    "wheel",
    event => {

        if (wheelLocked) {
            return;
        }


        const amount =
            Math.abs(event.deltaY) >
            Math.abs(event.deltaX)
                ? event.deltaY
                : event.deltaX;


        if (Math.abs(amount) < 15) {
            return;
        }


        event.preventDefault();

        wheelLocked = true;


        if (amount > 0) {

            nextSlide();

        } else {

            prevSlide();

        }


        setTimeout(() => {

            wheelLocked = false;

        }, 550);

    },
    {
        passive: false
    }
);


/* =========================================================
   KEYBOARD
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            menuLightbox.classList.contains(
                "active"
            )
        ) {

            if (
                event.key === "Escape"
            ) {

                closeMenuImage();

            }

            return;

        }


        if (
            aboutPanel.classList.contains(
                "active"
            )
        ) {

            if (
                event.key === "Escape"
            ) {

                closePanels();

            }

            return;

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextSlide();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            prevSlide();

        }

    }
);


/* =========================================================
   OPEN MENU LIGHTBOX
   ========================================================= */

function openMenuImage(
    imageSrc,
    imageAlt
) {

    pauseCarousel();


    largeMenuImage.src =
        imageSrc;

    largeMenuImage.alt =
        imageAlt;

    lightboxTitle.textContent =
        imageAlt;


    menuLightbox.classList.add(
        "active"
    );


    menuLightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE MENU LIGHTBOX
   ========================================================= */

function closeMenuImage() {

    menuLightbox.classList.remove(
        "active"
    );


    menuLightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    largeMenuImage.src = "";

    largeMenuImage.alt = "";

    document.body.style.overflow = "";


    if (
        !aboutPanel.classList.contains("active")
    ) {

        resetTimer();

    }

}


/* =========================================================
   CLICK OUTSIDE LIGHTBOX
   ========================================================= */

menuLightbox.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            menuLightbox
        ) {

            closeMenuImage();

        }

    }
);


/* =========================================================
   VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            pauseCarousel();

        } else {

            resetTimer();

        }

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

function initialize() {

    createStallCards();

    createDots();

    currentMode = "stalls";

    currentSlide = 0;

    updateViewLabel();

    updateCarousel(false);

    resetTimer();

}


/* START */

initialize();
