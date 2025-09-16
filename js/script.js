// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Products Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter products
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Newsletter Form Validation
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // Simulate form submission
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Products Data (for products page)
const productsData = [
    {
        id: 1,
        name: "Ethiopian Yirgacheffe",
        description: "Bright and fruity with notes of blueberry and citrus",
        price: 1700,
        category: "single-origin",
        image: "images/coffee-1.jpg"
    },
    {
        id: 2,
        name: "Colombian Supremo",
        description: "Well-balanced with caramel sweetness and nutty undertones",
        price: 1550,
        category: "single-origin",
        image: "images/coffee-2.jpg"
    },
    {
        id: 3,
        name: "Guatemalan Antigua",
        description: "Rich and complex with chocolate notes and a spicy finish",
        price: 1800,
        category: "single-origin",
        image: "images/coffee-3.jpg"
    },
    {
        id: 4,
        name: "Morning Blend",
        description: "Smooth and balanced with notes of chocolate and nuts",
        price: 1500,
        category: "blends",
        image: "images/coffee-1.jpg"
    },
    {
        id: 5,
        name: "Espresso Roast",
        description: "Dark and intense with caramelized sugar notes",
        price: 1600,
        category: "blends",
        image: "images/coffee-2.jpg"
    },
    {
        id: 6,
        name: "Decaf House Blend",
        description: "Smooth and mellow with chocolate and nut notes",
        price: 1650,
        category: "decaf",
        image: "images/coffee-3.jpg"
    }
];

// Populate Products Page
function populateProductsPage() {
    const productsGrid = document.querySelector('.products-grid');
    
    if (productsGrid) {
        let productsHTML = '';
        
        productsData.forEach(product => {
            productsHTML += `
                <div class="product-card" data-category="${product.category}">
                    <div class="product-img">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <span class="price">Ksh.${product.price.toFixed(2)}</span>
                        <a href="#" class="btn">Add to Cart</a>
                    </div>
                </div>
            `;
        });
        
        productsGrid.innerHTML = productsHTML;
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    populateProductsPage();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (name === '' || email === '' || subject === '' || message === '') {
            alert('Please fill in all fields');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// FAQ Toggle Functionality
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
}

// Brew Method Tabs
const methodTabs = document.querySelectorAll('.method-tab');

if (methodTabs.length > 0) {
    methodTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            methodTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all method contents
            const methodContents = document.querySelectorAll('.method-content');
            methodContents.forEach(content => content.classList.remove('active'));
            
            // Show selected method content
            const methodId = tab.getAttribute('data-method');
            const methodContent = document.getElementById(methodId);
            if (methodContent) {
                methodContent.classList.add('active');
            }
        });
    });
}

// Coffee Calculator
const calculateBtn = document.getElementById('calculate');

if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
        const cups = parseInt(document.getElementById('cups').value);
        const strength = document.getElementById('strength').value;
        
        // Define ratios (coffee:water)
        let ratio;
        switch(strength) {
            case 'mild':
                ratio = 1/18;
                break;
            case 'medium':
                ratio = 1/16;
                break;
            case 'strong':
                ratio = 1/14;
                break;
            default:
                ratio = 1/16;
        }
        
        // Calculate amounts (1 cup ≈ 236g water)
        const waterAmount = cups * 236;
        const coffeeAmount = Math.round(waterAmount * ratio);
        
        // Update results
        document.getElementById('coffee-amount').textContent = `Coffee: ${coffeeAmount}g`;
        document.getElementById('water-amount').textContent = `Water: ${waterAmount}g (about ${cups} ${cups === 1 ? 'cup' : 'cups'})`;
    });
}