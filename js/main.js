document.addEventListener('DOMContentLoaded', () => {
    initNereus();
    if (document.querySelectorAll('.depth-zone').length > 0) initScrollEffects();
    if (document.querySelectorAll('.node-btn').length > 0) initBiomeInteractions();

    // Global Status Loaders
    if (document.getElementById('farm-status')) loadFarms();
    if (document.getElementById('product-status')) loadProducts();
    if (document.getElementById('research-status')) loadResearch();

    if (document.getElementById('ecosystem-view')) handleEcosystemHash();

    // Theme and AI Images
    if (typeof initThemeSwitching === 'function') initThemeSwitching();
    loadAIImage("futuristic seaweed farm ocean", "aqua-img");
    loadAIImage("marine biomaterial lab", "ink-img");
    loadAIImage("deep ocean biotech microbes", "vault-img");
});

async function loadAIImage(prompt, elementId) {
    let imageUrl = "https://via.placeholder.com/600x400";
    if (prompt.includes("seaweed")) imageUrl = "assets/images/aquaveda.png";
    if (prompt.includes("biomaterial")) imageUrl = "assets/images/oceanink.png";
    if (prompt.includes("microbes")) imageUrl = "assets/images/biovaultx.png";

    const el = document.getElementById(elementId);
    if (el) {
        if (el.tagName.toLowerCase() === 'img') {
            el.src = imageUrl;
        } else {
            el.style.backgroundImage = `linear-gradient(rgba(1, 11, 26, 0.8), rgba(0, 242, 255, 0.1)), url('${imageUrl}')`;
        }
    }
}

function toggleSection(id) {
    document.querySelectorAll(".ocean-content").forEach(sec => {
        sec.style.display = "none";
    });

    const selected = document.getElementById(id);
    if (selected) {
        selected.style.display = "block";
    }
}

async function loadFarms() {
    const data = await fetchAPI("/farms/status");
    if (data) {
        document.getElementById("farm-status").innerText =
            data.status || data.farms || "Farming Active";
    }
}

async function loadProducts() {
    const data = await fetchAPI("/products/status");
    if (data) {
        document.getElementById("product-status").innerText =
            data.status || data.products || "Products Active";
    }
}

async function loadResearch() {
    const data = await fetchAPI("/research/status");
    if (data) {
        document.getElementById("research-status").innerText = data.research || "Research Active";
    }
}

async function getDiscovery() {
    // Attempt backend first
    const data = await fetchAPI("/api/discoveries");
    if (data && data.message) {
        document.getElementById("discovery-text").innerText = data.message;
    } else {
        // Fallback to local discoveries if backend fails or doesn't exist
        const discoveries = [
            "Marine bacteria produce biodegradable polymers",
            "Deep sea algae create sustainable dyes",
            "Ocean microbes enable new antibiotics"
        ];
        const random = discoveries[Math.floor(Math.random() * discoveries.length)];
        if (document.getElementById("discovery-text")) {
            document.getElementById("discovery-text").innerText = random;
        }
    }
}

async function predictZone() {
    const temp = document.getElementById("temp").value;
    const ph = document.getElementById("ph").value;
    const salinity = document.getElementById("salinity").value;

    const data = await fetchAPI(
        `/ocean/predict-zone?temp=${temp}&ph=${ph}&salinity=${salinity}`,
        { method: "POST" }
    );

    if (data) {
        document.getElementById("prediction-result").innerText =
            "Predicted Zone: " + (data.prediction || JSON.stringify(data));
    }
}

async function askNereus() {
    const input = document.getElementById("nereus-input").value;
    if (!input) return;

    // Use auth status as a health check / dummy response for integration as requested
    const data = await fetchAPI("/auth/status");

    if (document.getElementById("nereus-response")) {
        document.getElementById("nereus-response").innerText =
            "Nereus: " + (data?.auth || "Ocean intelligence active");
    }

    // Clear input
    document.getElementById("nereus-input").value = '';
}

function initNereus() {
    const orb = document.querySelector('.nereus-orb');
    const chat = document.querySelector('.nereus-chat');
    const input = document.getElementById('nereus-input');

    if (!orb || !chat) return;

    orb.addEventListener('click', () => {
        const isVisible = chat.style.display === 'block';
        chat.style.display = isVisible ? 'none' : 'block';
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            askNereus();
        }
    });
}

function initScrollEffects() {
    const sections = document.querySelectorAll('.biome-section');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        sections.forEach(sec => {
            const bg = sec.querySelector('.biome-bg');
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.2;
                const yPos = (rect.top * speed);
                bg.style.transform = `scale(1.1) translateY(${yPos}px)`;
                bg.style.opacity = 0.6;
            } else {
                bg.style.opacity = 0.2;
            }
        });

        const nav = document.querySelector('.main-nav');
        if (nav) {
            if (scrollPos > 50) {
                nav.style.background = 'rgba(1, 11, 26, 0.9)';
                nav.style.padding = '0.8rem 5%';
            } else {
                nav.style.background = 'var(--glass-bg)';
                nav.style.padding = '1.5rem 5%';
            }
        }
    });
}

function initBiomeInteractions() {
    const nodes = document.querySelectorAll('.node-btn');
    nodes.forEach(node => {
        node.addEventListener('click', async () => {
            const info = node.getAttribute('data-info');
            const data = await fetchAPI("/api/research");
            let content = "Research mode active.";
            if (Array.isArray(data)) {
                const match = data.find(r => r.title.toLowerCase().includes(info.toLowerCase()));
                if (match) content = `${match.title}:\n${match.desc}`;
            }
            alert("BLUE GENESIS ARCHIVE:\n\n" + content);
        });
    });
}

function handleEcosystemHash() {
    const hash = window.location.hash;
    const cards = document.querySelectorAll(".ecosystem-card");
    if (hash && (hash === "#surface" || hash === "#mid" || hash === "#deep")) {
        cards.forEach(card => {
            card.style.display = ("#" + card.id === hash) ? "block" : "none";
        });
    } else {
        cards.forEach(card => card.style.display = "block");
    }
}
