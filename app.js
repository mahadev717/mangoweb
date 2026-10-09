/* ==========================================================================
   CG BROTHERS ROYAL MANGO RESERVES - PURE VINTAGE JAVASCRIPT CONTROLLERS
   ========================================================================== */

const DOMESTIC_MANGOES = [
  {
    id: "ratnagiri-hapus",
    name: "Ratnagiri GI Alphonso (Hapus)",
    tag: "GI TAGGED • RATNAGIRI ORCHARDS",
    origin: "Ratnagiri Coastal Orchards, Maharashtra",
    desc: "The undisputed King of Mangoes. Tree-matured, intensely aromatic with rich saffron-gold velvet pulp and thin peel.",
    image: "assets/images/alphonso.png",
    priceDozen: "₹ 2,499",
    sweetness: 98,
    aroma: 96,
    acidity: 15,
    brix: "19° – 22° Brix",
    avgWeight: "250g – 320g per piece",
    availability: "March to June (Peak Harvest Now)",
    boxSizes: ["1 Dozen Executive Box", "2 Dozen Royal Box", "Luxury Teak Chest (18 Pcs)"]
  },
  {
    id: "devgad-alphonso",
    name: "Devgad GI Organic Alphonso",
    tag: "ORGANIC CERTIFIED • DEVGAD",
    origin: "Devgad Sea-Breeze Orchards, Sindhudurg",
    desc: "Grown in mineral-rich laterite soil bathed in salty ocean winds. Silky fiberless texture with unmatchable natural sweetness.",
    image: "assets/images/hero.png",
    priceDozen: "₹ 2,799",
    sweetness: 99,
    aroma: 99,
    acidity: 10,
    brix: "20° – 23° Brix",
    avgWeight: "260g – 330g per piece",
    availability: "April to June",
    boxSizes: ["1 Dozen Executive Box", "2 Dozen Royal Box", "Handcrafted Wooden Box"]
  },
  {
    id: "gir-kesar",
    name: "Gir Saffron Kesar",
    tag: "GI TAGGED • GIR FOOTHILLS",
    origin: "Gir Sanctuary Foothills, Gujarat",
    desc: "Renowned for its intoxicating saffron perfume and deep golden-orange flesh. Known as the Queen of Indian Mangoes.",
    image: "assets/images/kesar.png",
    priceDozen: "₹ 1,899",
    sweetness: 94,
    aroma: 98,
    acidity: 18,
    brix: "18° – 20° Brix",
    avgWeight: "240g – 300g per piece",
    availability: "May to July",
    boxSizes: ["1 Dozen Box (3.5 kg)", "2 Dozen Box (7 kg)"]
  },
  {
    id: "royal-gifting-box",
    name: "Royal Heritage Corporate Gift Box",
    tag: "BOUTIQUE VINTAGE GIFTING",
    origin: "Handpicked Export Grade Alphonso & Kesar",
    desc: "An opulent gift chest in deep emerald and embossed 24k gold foil, lined with velvet paper and personalized wax-sealed card.",
    image: "assets/images/gifting.png",
    priceDozen: "₹ 3,999",
    sweetness: 99,
    aroma: 98,
    acidity: 12,
    brix: "21° Brix Certified",
    avgWeight: "Selected 300g+ Jumbo Fruits",
    availability: "Year-Round Pre-Booking",
    boxSizes: ["6 Fruit Deluxe Case", "12 Fruit Imperial Velvet Box"]
  },
  {
    id: "banganapalli-king",
    name: "Andhra Banganapalli (Safeda)",
    tag: "ROYAL HERITAGE • KURNOOL",
    origin: "Kurnool & Chittoor Orchards, Andhra Pradesh",
    desc: "Large, luscious, fiberless golden mangoes with pleasant sweet taste and smooth uniform skin. Ideal for family feasts.",
    image: "assets/images/orchard.png",
    priceDozen: "₹ 1,499",
    sweetness: 88,
    aroma: 85,
    acidity: 20,
    brix: "17° – 19° Brix",
    avgWeight: "350g – 450g per piece",
    availability: "April to July",
    boxSizes: ["1 Dozen Box (5 kg)", "2 Dozen Family Pack"]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  renderVarieties();
  initCustomizer();
  initHeaderScroll();
  startHarvestTimer();
  initCursorAura();
  initScrollReveal();
});

/* Render Mango Varieties Cards */
function renderVarieties() {
  const container = document.getElementById("varietiesGrid");
  if (!container) return;

  container.innerHTML = DOMESTIC_MANGOES.map((mango, index) => `
    <div class="variety-card reveal-on-scroll" style="transition-delay: ${index * 0.15}s;">
      <div class="variety-thumb">
        <img src="${mango.image}" alt="${mango.name}" loading="lazy" />
        <span class="variety-gi-tag">${mango.tag}</span>
      </div>
      <div class="variety-body">
        <div class="variety-origin">📍 ${mango.origin}</div>
        <h3 class="variety-title font-serif">${mango.name}</h3>
        <p class="variety-desc">${mango.desc}</p>

        <!-- Sensory Meter Bars -->
        <div class="sensory-bars">
          <div class="sensory-row">
            <span style="font-weight:600; color:var(--ink-primary);">Brix Sweetness (${mango.brix}):</span>
            <div class="meter-track">
              <div class="meter-fill" data-fill="${mango.sweetness}%"></div>
            </div>
          </div>
          <div class="sensory-row">
            <span style="color:var(--ink-chestnut); font-style:italic;">Aroma Intensity:</span>
            <div class="meter-track">
              <div class="meter-fill" data-fill="${mango.aroma}%"></div>
            </div>
          </div>
          <div class="sensory-row">
            <span style="color:var(--ink-chestnut); font-style:italic;">Average Size:</span>
            <span style="color:var(--ink-primary); font-weight:700;">${mango.avgWeight.split(' ')[0]}</span>
          </div>
        </div>

        <div class="variety-footer">
          <div class="variety-price">${mango.priceDozen} <span>/ 1 Dozen</span></div>
          <button class="btn-vintage btn-vintage-primary" onclick="openOrderModal('${mango.id}')">
            ✦ Reserve Box
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/* Custom Box Interactive Selector */
let selectedVariety = DOMESTIC_MANGOES[0];

function initCustomizer() {
  const varietyPills = document.getElementById("varietyPills");
  if (!varietyPills) return;

  varietyPills.innerHTML = DOMESTIC_MANGOES.map((m, idx) => `
    <button class="option-pill ${idx === 0 ? 'active' : ''}" onclick="selectCustomVariety('${m.id}', this)">
      ${m.name.split(' ')[0]} ${m.name.split(' ')[1] || ''}
    </button>
  `).join('');
}

window.selectCustomVariety = function(id, btnElement) {
  document.querySelectorAll("#varietyPills .option-pill").forEach(el => el.classList.remove("active"));
  btnElement.classList.add("active");

  selectedVariety = DOMESTIC_MANGOES.find(m => m.id === id) || DOMESTIC_MANGOES[0];
  updateCustomizerPreview();
};

window.selectBoxSize = function(sizeText, btnElement) {
  document.querySelectorAll("#sizePills .option-pill").forEach(el => el.classList.remove("active"));
  btnElement.classList.add("active");

  updateCustomizerPreview();
};

function updateCustomizerPreview() {
  const summaryTitle = document.getElementById("customSummaryTitle");
  const summaryPrice = document.getElementById("customSummaryPrice");

  if (summaryTitle && summaryPrice) {
    summaryTitle.textContent = selectedVariety.name;
    summaryPrice.textContent = selectedVariety.priceDozen;
  }
}

/* Header Scroll */
function initHeaderScroll() {
  const header = document.getElementById("mainHeader");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* Live Harvest Counter Animation */
function startHarvestTimer() {
  let count = 4820;
  const el = document.getElementById("liveCounter");
  if (!el) return;

  setInterval(() => {
    count = Math.max(4800, count - Math.floor(Math.random() * 2));
    el.textContent = count.toLocaleString() + " Boxes";
  }, 10000);
}

/* Custom Gold Follower Cursor Aura */
function initCursorAura() {
  const aura = document.createElement("div");
  aura.id = "cursorAura";
  document.body.appendChild(aura);

  let mouseX = 0, mouseY = 0;
  let auraX = 0, auraY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateAura() {
    auraX += (mouseX - auraX) * 0.15;
    auraY += (mouseY - auraY) * 0.15;
    aura.style.left = `${auraX}px`;
    aura.style.top = `${auraY}px`;
    requestAnimationFrame(animateAura);
  }

  animateAura();

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("button, a, .variety-card, .review-card, .option-pill")) {
      aura.style.width = "48px";
      aura.style.height = "48px";
      aura.style.background = "rgba(158, 117, 41, 0.15)";
      aura.style.borderColor = "var(--gold-antique)";
    } else {
      aura.style.width = "34px";
      aura.style.height = "34px";
      aura.style.background = "transparent";
      aura.style.borderColor = "var(--gold-antique)";
    }
  });
}

/* Scroll Reveal Observer & Meter Fill Growth */
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        const fills = entry.target.querySelectorAll(".meter-fill");
        fills.forEach(fill => {
          const fillVal = fill.getAttribute("data-fill");
          if (fillVal) {
            fill.style.width = fillVal;
          }
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal-on-scroll, .section-title-wrap, .customizer-box, .traceability-card, .review-card, .timeline-month").forEach(el => {
    el.classList.add("reveal-on-scroll");
    observer.observe(el);
  });
}

/* Order Drawer / Modal Logic */
window.openOrderModal = function(mangoId) {
  const mango = DOMESTIC_MANGOES.find(m => m.id === mangoId) || DOMESTIC_MANGOES[0];
  const modal = document.getElementById("orderModal");
  const mangoInput = document.getElementById("modalMangoName");

  if (mangoInput) mangoInput.value = mango.name;
  if (modal) modal.classList.add("active");
};

window.closeOrderModal = function() {
  const modal = document.getElementById("orderModal");
  if (modal) modal.classList.remove("active");
};

/* Pincode Checker Simulation */
window.checkPincode = function() {
  const pincode = document.getElementById("pincodeInput").value;
  const result = document.getElementById("pincodeResult");
  
  if (pincode.length === 6 && !isNaN(pincode)) {
    result.innerHTML = `<span style="color:#122419; font-weight:700;">✦ Express Refrigerated Parcel Post Available for Pincode ${pincode}! (Estimated Delivery: 24-48 Hours)</span>`;
  } else {
    result.innerHTML = `<span style="color:#8b261d;">Please enter a valid 6-digit Indian pincode.</span>`;
  }
};

/* Form Submission */
window.submitOrderForm = function(e) {
  e.preventDefault();
  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const city = document.getElementById("custCity").value;
  const mango = document.getElementById("modalMangoName").value;

  alert(`✦ VINTAGE MANGO RESERVATION CONFIRMED ✦\n\nGreetings ${name}!\n\nYour order request for "${mango}" to ${city} has been assigned to our Heritage Harvest Concierge.\n\nWe will reach out to ${phone} on WhatsApp within 15 minutes to confirm delivery slot & orchard lot details.`);

  closeOrderModal();
};
