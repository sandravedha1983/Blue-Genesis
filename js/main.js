document.addEventListener('DOMContentLoaded', () => {
    initNereus();
    if (document.querySelectorAll('.depth-zone').length > 0) initScrollEffects();
    if (document.querySelectorAll('.node-btn').length > 0) initBiomeInteractions();
    if (document.querySelector('.research-grid') || document.getElementById('research-status')) loadResearch();
    if (document.getElementById('ecosystem-view')) handleEcosystemHash();

    // AquaVeda Farming Section
    if (document.getElementById('farm-status')) {
        fetch("http://127.0.0.1:8000/farms/status")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                document.getElementById("farm-status").innerText =
                    data.status || "Farming Active";
            });
    }

    // OceanInk Products Section
    if (document.getElementById('product-status')) {
        fetch("http://127.0.0.1:8000/products/status")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                document.getElementById("product-status").innerText =
                    data.status || "Products Active";
            });
    }

    // BioVaultX Research Section
    if (document.getElementById('research-status')) {
        fetch("http://127.0.0.1:8000/research/status")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                document.getElementById("research-status").innerText =
                    data.research || "Research Active";
            });
    }

    if (typeof initThemeSwitching === 'function') initThemeSwitching(); // Global theme management

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
    const sections = document.querySelectorAll(".ocean-content");

    sections.forEach(section => {
        section.style.display = "none";
    });

    const selected = document.getElementById(id);
    if (selected) {
        selected.style.display = "block";
    }
}



function getDiscovery() {
    fetch("http://127.0.0.1:8000/research/status")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (document.getElementById("discovery-box")) {
                document.getElementById("discovery-box").innerText =
                    data.research || "New marine discovery unlocked!";
            }
        });
}

function predictZone() {
    const temp = document.getElementById("temp").value;
    const ph = document.getElementById("ph").value;
    const salinity = document.getElementById("salinity").value;

    fetch(`http://127.0.0.1:8000/ocean/predict-zone?temp=${temp}&ph=${ph}&salinity=${salinity}`, {
        method: "POST"
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("result").innerText =
                "Ocean Zone: " + JSON.stringify(data);
        });
}

function loadResearch() {
    fetch("http://127.0.0.1:8000/research/status")
        .then(res => res.json())
        .then(data => {
            document.getElementById("research-data").innerText = data.research;
        });
}

function supportAction() {
    alert("Support successful! 🌊");
}

/**
 * Nereus AI Assistant Logic
 */
function initNereus() {
    const orb = document.querySelector('.nereus-orb');
    const chat = document.querySelector('.nereus-chat');
    const input = document.getElementById('nereus-input');
    const text = document.getElementById('nereus-text');

    const knowledge = {
        'carbon': 'Seaweed farms absorb enormous amounts of carbon—up to 20 times more per acre than land forests.',
        'biomaterials': 'Marine biopolymers can replace petroleum-based plastics with 100% biodegradable ocean-safe materials.',
        'biotech': 'Ocean microorganisms offer unique enzymes for medical breakthroughs, from antibiotics to cancer treatment.',
        'andaman': 'Blue Genesis is headquartered in the Andaman Islands to leverage pristine marine biodiversity.',
        'seaweed': 'We cultivate Kappaphycus and Gracilaria for protein and high-value extracts.',
        'hello': 'Greetings, explorer. I am Nereus. Ask me about the Blue Economy.',
        'nereus': 'I am the Blue Genesis Ocean Intelligence interface, here to guide your discovery.'
    };

    orb.addEventListener('click', () => {
        const isVisible = chat.style.display === 'block';
        chat.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) text.innerText = knowledge['hello'];
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = input.value.toLowerCase();
            const fallbackLogic = () => {
                let response = "My sensors don't have that data yet. Try asking about 'Carbon', 'Seaweed', or 'Biomaterials'.";
                for (let key in knowledge) {
                    if (query.includes(key)) {
                        response = knowledge[key];
                        break;
                    }
                }
                text.innerText = response;
            };

            fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: query })
            })
                .then(res => {
                    if (!res.ok) throw new Error("API not available.");
                    return res.json();
                })
                .then(data => {
                    text.innerText = data.response || data.message || data.text;
                })
                .catch(err => {
                    console.warn(err);
                    fallbackLogic();
                });
            input.value = '';
        }
    });
}

// Removed old initSimulator

/**
 * Scroll triggered animations and transitions
 */
function initScrollEffects() {
    const sections = document.querySelectorAll('.biome-section');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        sections.forEach(sec => {
            const bg = sec.querySelector('.biome-bg');
            const rect = sec.getBoundingClientRect();

            // Subtle parallax for biome backgrounds
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.2;
                const yPos = (rect.top * speed);
                bg.style.transform = `scale(1.1) translateY(${yPos}px)`;
                bg.style.opacity = 0.6;
            } else {
                bg.style.opacity = 0.2;
            }
        });

        // Nav blur effect
        const nav = document.querySelector('.main-nav');
        if (scrollPos > 50) {
            nav.style.background = 'rgba(1, 11, 26, 0.9)';
            nav.style.padding = '0.8rem 5%';
        } else {
            nav.style.background = 'var(--glass-bg)';
            nav.style.padding = '1.5rem 5%';
        }
    });
}

// Removed old initDiscoveryEngine

/**
 * Biome Species Modal/Overlay
 */
function initBiomeInteractions() {
    const nodes = document.querySelectorAll('.node-btn');

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            fetch("http://127.0.0.1:8000/research/status")
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    alert("BLUE GENESIS ARCHIVE:\n\n" + data.research);
                })
                .catch(err => console.error(err));
        });
    });
}

function handleEcosystemHash() {
    const hash = window.location.hash;
    const cards = document.querySelectorAll(".ecosystem-card");

    if (hash && (hash === "#surface" || hash === "#mid" || hash === "#deep")) {
        cards.forEach(card => {
            if ("#" + card.id === hash) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    } else {
        cards.forEach(card => {
            card.style.display = "block";
        });
    }
}
