const allCookies = document.getElementById("allCookies")
const selectedCookies = document.getElementById("selectedCookies")
const rejectedOpts = document.getElementById("rejectedOpts")
const showAdvanced = document.getElementById("showAdvanced")
const closeCookies = document.getElementById("closeCookies")
const toggleCookies = document.getElementById("toggleCookies")

// Cookie preferences object
let cookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functionality: false,
};


// addEvent

allCookies.addEventListener("click", acceptAllCookies);
selectedCookies.addEventListener("click", acceptSelectedCookies)
rejectedOpts.addEventListener("click", rejectOptionalCookies)

showAdvanced.addEventListener("click", showAdvancedSettings)
closeCookies.addEventListener("click", closeCookieBanner)
toggleCookies.addEventListener("click", toggleCookieType(this))

// Initialize cookie banner
document.addEventListener("DOMContentLoaded", function () {
  checkExistingConsent();
  initializeToggles();
});

function checkExistingConsent() {
  const consent = getCookie("steve_coffee_consent");
  if (consent) {
    // User has already given consent, hide banner
    document.getElementById("cookieOverlay").classList.add("hidden");
  }
}

function initializeToggles() {
  const toggles = document.querySelectorAll(".cookie-toggle:not(.disabled)");
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const type = this.getAttribute("data-type");
      if (type && !this.classList.contains("disabled")) {
        this.classList.toggle("active");
        cookiePreferences[type] = this.classList.contains("active");
      }
    });
  });
}

function toggleCookieType(header) {
  const cookieType = header.parentElement;
  cookieType.classList.toggle("expanded");
}

function acceptAllCookies() {
  cookiePreferences = {
    necessary: true,
    analytics: true,
    marketing: true,
    functionality: true,
  };
  setConsentCookie();
  closeCookieBanner();
  showSuccessMessage("¡Gracias! Has aceptado todas las cookies.");
}

function acceptSelectedCookies() {
  setConsentCookie();
  closeCookieBanner();
  showSuccessMessage("Preferencias guardadas correctamente.");
}

function rejectOptionalCookies() {
  cookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    functionality: false,
  };
  setConsentCookie();
  closeCookieBanner();
  showSuccessMessage("Solo las cookies necesarias serán utilizadas.");
}

function showAdvancedSettings() {
  alert(
    "Configuración avanzada:\n\n• Puedes gestionar cookies directamente desde tu navegador\n• Visita la configuración de privacidad de tu navegador\n• Elimina cookies específicas desde las herramientas de desarrollador\n\nPara más información, contacta con nuestro equipo de soporte."
  );
}

function setConsentCookie() {
  const consentData = {
    preferences: cookiePreferences,
    timestamp: new Date().toISOString(),
    version: "1.0",
  };
  setCookie("steve_coffee_consent", JSON.stringify(consentData), 365);

  // Set individual preference cookies
  Object.keys(cookiePreferences).forEach((type) => {
    setCookie(`steve_coffee_${type}`, cookiePreferences[type], 365);
  });
}

function closeCookieBanner() {
  const overlay = document.getElementById("cookieOverlay");
  overlay.style.opacity = "0";
  overlay.style.transform = "scale(0.95)";
  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 300);
}

function showSuccessMessage(message) {
  // Create temporary success notification
  const notification = document.createElement("div");
  notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                z-index: 10001;
                font-weight: bold;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                animation: slideInRight 0.5s ease;
            `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Cookie utility functions
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Add slide-in animation for success message
const style = document.createElement("style");
style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
document.head.appendChild(style);
