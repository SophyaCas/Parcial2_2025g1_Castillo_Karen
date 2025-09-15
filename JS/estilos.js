//Fondo con flames
function initFlame() {
    const canvas = document.getElementById("flame-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let flames = [];

    class Flame {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 50;
            this.alpha = 1;
            this.color = `rgba(0, 150, 255, ${this.alpha})`;
        }
        update() {
            this.radius += 2;
            this.alpha -= 0.02;
            this.color = `rgba(0, 150, 255, ${this.alpha})`;
        }
        draw(ctx) {
            ctx.beginPath();
            let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        flames.forEach((flame, index) => {
            flame.update();
            flame.draw(ctx);
            if (flame.alpha <= 0) flames.splice(index, 1);
        });
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("mousemove", (e) => {
        flames.push(new Flame(e.clientX, e.clientY));
    });

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

//  Logo inicial
function initLogo() {
    const text = document.getElementById("logo-texto");
    const logo = document.getElementById("img-logo");
    if (!text || !logo) return;

    setTimeout(() => {
        text.style.display = "none";
        logo.classList.add("show");
    }, 3000);
}

// Carousel clientes
function initCarousel() {
    const carousel = document.querySelector('#carouselClientes');
    if (!carousel) return;

    carousel.addEventListener('slid.bs.carousel', function (e) {
        const currentImg = e.relatedTarget.querySelector('img');
        if (currentImg) {
            currentImg.classList.remove('animate__fadeIn');
            void currentImg.offsetWidth; // reinicio animación
            currentImg.classList.add('animate__fadeIn');
        }
    });
}

// Acordeón preguntas
function initAccordion() {
    const collapses = document.querySelectorAll('#acordeonPreguntas .acordeon-contenido');
    if (!collapses.length) return;

    function animarImagen(collapseEl) {
        const img = collapseEl.querySelector('.imagen-desplegable');
        if (!img) return;
        img.classList.remove('animate__fadeInDown', 'animate__animated');
        void img.offsetWidth;
        img.classList.add('animate__animated', 'animate__fadeInDown');
        img.style.opacity = 1;
    }

    collapses.forEach(collapse => {
        collapse.addEventListener('show.bs.collapse', function () {
            animarImagen(collapse);
        });
        collapse.addEventListener('hide.bs.collapse', function () {
            const img = collapse.querySelector('.imagen-desplegable');
            if (img) {
                img.style.opacity = 0;
                img.classList.remove('animate__animated', 'animate__fadeInDown');
            }
        });
    });
}

// Barra social y footer
function initSocialBar() {
    const barraSocial = document.querySelector(".barraSocialAside");
    const footer = document.querySelector(".piePagina2");
    if (!barraSocial || !footer) return;

    window.addEventListener("scroll", function () {
        const scrollY = window.scrollY || window.pageYOffset;
        const windowHeight = window.innerHeight;
        const footerTop = footer.offsetTop;

        if (scrollY + windowHeight >= footerTop) {
            barraSocial.style.opacity = "0";
            barraSocial.style.visibility = "hidden";
        } else {
            barraSocial.style.opacity = "1";
            barraSocial.style.visibility = "visible";
        }
    });
}

// Validación formulario
function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', event => {
        event.preventDefault();
        event.stopPropagation();
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
        } else {
            form.classList.add('was-validated');
            alert('Formulario válido. Los datos se pueden enviar.');
        }
    });
}

// Inicializador global
document.addEventListener("DOMContentLoaded", () => {
    initFlame();
    initLogo();
    initCarousel();
    initAccordion();
    initSocialBar();
    initForm();
});
