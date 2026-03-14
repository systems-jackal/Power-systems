// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==================== SPARE PARTS SEARCH ====================
const searchInput = document.getElementById('partsSearch');
const partsCategories = document.querySelectorAll('.parts-category');

if (searchInput) {
    searchInput.addEventListener('keyup', function () {
        const searchTerm = this.value.toLowerCase().trim();

        partsCategories.forEach(category => {
            const items = category.querySelectorAll('.parts-list li');
            let categoryHasMatch = false;

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm) || searchTerm === '') {
                    item.style.display = 'flex';
                    categoryHasMatch = true;
                } else {
                    item.style.display = 'none';
                }
            });

            // Hide the whole category if no items match
            category.style.display = categoryHasMatch || searchTerm === '' ? 'block' : 'none';
        });
    });
}