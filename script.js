const HARDWARE = [
    { id: 101, name: "Quantum GPU X1", price: 1299, desc: "AI-Enhanced rendering core", img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=500" },
    { id: 102, name: "Neural Headset", price: 349, desc: "Direct brain-computer interface", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=500" },
    { id: 103, name: "Haptic Gloves", price: 299, desc: "Feel the digital world", img: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80&w=500" },
    { id: 104, name: "Drone Sentry", price: 899, desc: "Autonomous security unit", img: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=500" },
    { id: 105, name: "Holo-Display", price: 450, desc: "3D projection without glasses", img: "https://images.unsplash.com/photo-1614812513172-567d2fe96a75?auto=format&fit=crop&q=80&w=500" },
    { id: 106, name: "CyberDeck Mk.IV", price: 2100, desc: "Portable hacking station", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=500" },
];
const SOFTWARE = [
    { id: 201, name: "OS Nova", price: 129, desc: "Next-gen operating system", type: "OS", img: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=500" },
    { id: 202, name: "Firewall +", price: 49, desc: "Military grade encryption", type: "Security", img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=500" },
    { id: 203, name: "DevStudio 2026", price: 299, desc: "IDE for quantum computing", type: "Dev", img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=500" },
    { id: 204, name: "PixelPush AI", price: 89, desc: "Generative graphics suite", type: "Design", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=500" },
    { id: 205, name: "DataMiner Pro", price: 199, desc: "Big data analytics tool", type: "Analytics", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500" },
    { id: 206, name: "CloudSync Ultimate", price: 15, desc: "Monthly subscription", type: "Cloud", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=500" },
];
let cart = JSON.parse(localStorage.getItem('nexus_cart')) || [];
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    const path = window.location.pathname;
    let page = 'home';
    if (path.includes('electronics.html')) page = 'electronics';
    else if (path.includes('software.html')) page = 'software';
    else if (path.includes('services.html')) page = 'services';
    else if (path.includes('about.html')) page = 'about';
    else if (path.includes('support.html')) page = 'support';
    else if (path.includes('login.html')) page = 'login';
    else if (path.includes('cart.html')) page = 'cart';
    else if (path.includes('order-confirmation.html')) page = 'confirmation';
    updateBackground(page);
    updateCartBadge();
    initRevealAnimations();
    if (page === 'electronics') renderProductGrid(HARDWARE, 'hardware');
    if (page === 'software') renderProductGrid(SOFTWARE, 'software');
    if (page === 'cart') renderCartItems();
    window.addEventListener('scroll', () => updateBackground(page));
    
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if(mobileBtn) mobileBtn.addEventListener('click', toggleMobileMenu);
});
function renderProductGrid(products, type) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const btnColor = type === 'software' ? 'bg-green-600 hover:bg-green-500' : 'bg-cyan-600 hover:bg-cyan-500';

    grid.innerHTML = products.map((item, idx) => `
        <div class="reveal-section glass-panel rounded-xl p-6 hover:shadow-[0_0_30px_rgba(0,242,234,0.1)] transition-shadow border border-white/5 hover:border-cyan-400/30" style="transition-delay: ${idx * 50}ms;">
            <div class="h-48 mb-4 overflow-hidden rounded-lg relative">
                ${item.img 
                    ? `<img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" onerror="this.parentElement.innerHTML='<div class=\\'w-full h-full bg-gray-800 flex items-center justify-center\\'><i data-lucide=\\'code\\'></i></div>'; lucide.createIcons();" />`
                    : `<div class="w-full h-full bg-gradient-to-br from-green-900/40 to-black flex items-center justify-center"><i data-lucide="code" class="text-green-400 opacity-80" width="48" height="48"></i></div>`
                }
            </div>
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-bold">${item.name}</h3>
                ${type === 'software' ? `<span class="text-xs bg-green-900/50 text-green-300 px-2 py-1 rounded border border-green-700/50">${item.type}</span>` : ''}
            </div>
            <p class="text-gray-400 text-sm mb-6 h-10">${item.desc}</p>
            <div class="flex items-center justify-between">
                <span class="text-2xl font-mono text-cyan-300">Rs. ${item.price}</span>
                <button onclick="addToCart(${item.id}, '${type}')" class="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${btnColor} text-white">
                    Add <i data-lucide="shopping-cart" width="16"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
    initRevealAnimations();
}
function renderCartItems() {
    const container = document.getElementById('cart-container');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="reveal-section glass-panel p-12 text-center rounded-xl">
                <p class="text-gray-400 text-xl mb-6">Your inventory is empty.</p>
                <p class="text-sm text-gray-600">Go acquire some gear.</p>
            </div>
        `;
    } else {
        const total = cart.reduce((acc, item) => acc + item.price, 0);
        const itemsHTML = cart.map((item, idx) => `
            <div class="flex items-center justify-between bg-white/5 p-4 rounded-lg">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 bg-gray-800 rounded-md overflow-hidden">
                        ${item.img 
                            ? `<img src="${item.img}" class="w-full h-full object-cover">` 
                            : '<div class="w-full h-full flex items-center justify-center text-gray-500"><i data-lucide="code"></i></div>'
                        }
                    </div>
                    <div>
                        <h4 class="font-bold">${item.name}</h4>
                        <span class="text-sm text-gray-400">Rs. ${item.price}</span>
                    </div>
                </div>
                <button onclick="removeFromCart(${idx})" class="text-red-500 hover:text-red-400 p-2">
                    <i data-lucide="trash"></i>
                </button>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="reveal-section">
                <h1 class="text-4xl font-bold mb-8">YOUR LOADOUT</h1>
                <div class="glass-panel rounded-xl overflow-hidden">
                    <div class="p-6 space-y-4">
                        ${itemsHTML}
                    </div>
                    <div class="bg-white/5 p-6 border-t border-gray-700 flex justify-between items-center">
                        <div>
                            <span class="block text-gray-400 text-sm">Total Value</span>
                            <span class="text-2xl font-bold text-cyan-400">Rs. ${total.toFixed(2)}</span>
                        </div>
                        <button onclick="confirmOrder()" class="px-8 py-3 bg-cyan-600 rounded-lg font-bold hover:bg-cyan-500 transition-colors">
                            CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
    initRevealAnimations();
}
function addToCart(id, type) {
    const list = type === 'software' ? SOFTWARE : HARDWARE;
    const item = list.find(p => p.id === id);
    if (item) {
        cart.push(item);
        localStorage.setItem('nexus_cart', JSON.stringify(cart));
        updateCartBadge();
        alert("Item added to Loadout");
    }
}
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('nexus_cart', JSON.stringify(cart));
    renderCartItems();
    updateCartBadge();
}
function confirmOrder() {
    cart = [];
    localStorage.setItem('nexus_cart', JSON.stringify(cart));
    updateCartBadge();
    window.location.href = 'order-confirmation.html';
}
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.innerText = cart.length;
        badge.classList.toggle('hidden', cart.length === 0);
    }
}
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}
function updateBackground(page) {
    const scrollY = window.scrollY;
    let hue1, hue2;
    if (page === 'home') { hue1 = 220; hue2 = 280; }
    else if (page === 'electronics') { hue1 = 180; hue2 = 240; }
    else if (page === 'software') { hue1 = 120; hue2 = 160; }
    else if (page === 'services') { hue1 = 30; hue2 = 60; }
    else if (page === 'login') { hue1 = 260; hue2 = 300; }
    else if (page === 'confirmation') { hue1 = 140; hue2 = 160; } // Matrix Green for Success
    else { hue1 = 200; hue2 = 200; }

    const scrollShift = Math.min(scrollY / 5, 80); 
    const color1 = `hsl(${hue1 + scrollShift}, 60%, 15%)`;
    const color2 = `hsl(${hue2 - scrollShift}, 60%, 5%)`;

    const bg = document.getElementById('bg-canvas');
    if (bg) {
        bg.style.background = `radial-gradient(circle at ${50 + scrollShift/4}% ${50 - scrollShift/4}%, ${color1}, ${color2})`;
    }
}
function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-section').forEach(section => {
        observer.observe(section);
    });
}