const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. ПЕРЕМЕННЫЕ ===
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // === 2. ОТКРЫТИЕ МЕНЮ ===
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            // Добавляем класс, который меняет right: -100% на right: 0
            navMenu.classList.add('show-menu');
            console.log("Меню открыто"); // Для проверки
        });
    } else {
        console.error("Ошибка: Не найдена кнопка nav-toggle");
    }

    // === 3. ЗАКРЫТИЕ КРЕСТИКОМ ===
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            console.log("Меню закрыто крестиком");
        });
    }

    // === 4. ЗАКРЫТИЕ ПРИ КЛИКЕ НА ССЫЛКУ ===
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            console.log("Меню закрыто по ссылке");
        });
    });

    // === 5. FAQ (АККОРДЕОН) ===
    // Используем простую логику для <details>, если нужно закрывать другие
    const details = document.querySelectorAll("details");
    details.forEach((targetDetail) => {
        targetDetail.addEventListener("click", () => {
            // Закрываем все остальные, кроме того, на который нажали
            details.forEach((detail) => {
                if (detail !== targetDetail) {
                    detail.removeAttribute("open");
                }
            });
        });
    });
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const startDate = new Date('2026-01-29T10:00:00');

setInterval(() => {
    const now = new Date();
    const diff = startDate - now;

    if (diff <= 0) return;

    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;

    document.getElementById('countdown').innerHTML =
        `До старта: <b>${d}</b>д <b>${h}</b>ч <b>${m}</b>м`;
}, 1000);

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${current}`
        );
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const badge = document.querySelector('.hero__badge--alt');

    if (!badge) return;

    const names = ['Анна', 'Мария', 'Екатерина', 'Ольга', 'Дарья'];
    let showViewers = true;

    function updateBadge() {
        badge.classList.remove('badge-animate');

        setTimeout(() => {
            if (showViewers) {
                const viewers = Math.floor(Math.random() * 7) + 8; // 8–14
                badge.textContent = `🧘 Сейчас смотрят: ${viewers}`;
            } else {
                const name = names[Math.floor(Math.random() * names.length)];
                badge.textContent = `✨ ${name} только что записалась`;
            }

            badge.classList.add('badge-animate');
            showViewers = !showViewers;
        }, 200);
    }

    // стартовое сообщение
    updateBadge();

    // чередуем каждые 12 сек
    setInterval(updateBadge, 20000);
});