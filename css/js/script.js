document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DEL CURSOR PERSONALIZADO ---
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const interactiveElements = document.querySelectorAll('a, button, input, label');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.width = '30px';
                cursor.style.height = '30px';
                cursor.style.backgroundColor = 'rgba(220, 20, 60, 0.5)';
            });
            element.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'rgba(255, 215, 0, 0.5)';
            });
        });
    }

    // --- LÓGICA DE ANIMACIÓN EN SCROLL Y BARRA DE PROGRESO ---
    const progressBar = document.getElementById('progressBar');
    
    function handleScroll() {
        if (progressBar) {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollProgress + '%';
        }
        revealElements();
    }

    function revealElements() {
        const reveals = document.querySelectorAll('.reveal, .staggered-reveal');
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    revealElements(); // Comprobación inicial al cargar la página

    // --- LÓGICA DE INTERACCIÓN DEL FORMULARIO ---
    // Radio buttons personalizados
    const radioGroups = document.querySelectorAll('input[type="radio"]');
    radioGroups.forEach(radio => {
        radio.addEventListener('change', function() {
            // Ocultar todos los puntos del mismo grupo
            document.querySelectorAll(`input[name="${this.name}"]`).forEach(r => {
                const dot = r.previousElementSibling?.querySelector('div');
                if (dot) dot.classList.add('hidden');
            });
            // Mostrar el punto del seleccionado
            const selectedDot = this.previousElementSibling?.querySelector('div');
            if (this.checked && selectedDot) {
                selectedDot.classList.remove('hidden');
            }
        });
    });

    // Checkboxes personalizados
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const indicator = this.previousElementSibling?.querySelector('div');
            if(indicator) {
                if (this.checked) {
                    indicator.classList.remove('hidden');
                } else {
                    indicator.classList.add('hidden');
                }
            }
        });
    });
});
