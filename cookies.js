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

// Add event listeners
allCookies.addEventListener("click", acceptAllCookies);
selectedCookies.addEventListener("click", acceptSelectedCookies)
rejectedOpts.addEventListener("click", rejectOptionalCookies)

showAdvanced.addEventListener("click", showAdvancedSettings)
closeCookies.addEventListener("click", closeCookieBanner)
toggleCookies.addEventListener("click", function() {
  toggleCookieType(this)
})

// Initialize cookie banner
document.addEventListener("DOMContentLoaded", function () {
  checkExistingConsent();
  initializeToggles();
});

function checkExistingConsent() {
  const consent = getCookie("steve_coffee_consent");
  console.log("Checking consent:", consent); // Debug log
  
  if (consent && consent !== "null" && consent !== "") {
    try {
      const consentData = JSON.parse(consent);
      console.log("Parsed consent data:", consentData); // Debug log
      
      // Check if consent data is valid
      if (consentData && consentData.preferences && consentData.timestamp) {
        // Update preferences from stored consent
        cookiePreferences = { ...cookiePreferences, ...consentData.preferences };
        
        // User has valid consent, hide banner immediately and permanently
        const overlay = document.getElementById("cookieOverlay");
        if (overlay) {
          overlay.style.display = "none";
          overlay.classList.add("hidden");
          console.log("Cookie banner hidden - consent found"); // Debug log
        }
        
        // Also set a simple flag cookie as backup
        setCookie("steve_coffee_banner_dismissed", "true", 365);
        return true;
      }
    } catch (error) {
      console.error("Error parsing consent cookie:", error);
      // If there's an error parsing, remove the invalid cookie
      deleteCookie("steve_coffee_consent");
      deleteCookie("steve_coffee_banner_dismissed");
    }
  }
  
  // Also check the simple flag as backup
  const bannerDismissed = getCookie("steve_coffee_banner_dismissed");
  if (bannerDismissed === "true") {
    const overlay = document.getElementById("cookieOverlay");
    if (overlay) {
      overlay.style.display = "none";
      overlay.classList.add("hidden");
      console.log("Cookie banner hidden - banner dismissed flag found"); // Debug log
    }
    return true;
  }
  
  console.log("No valid consent found - showing banner"); // Debug log
  // No valid consent found, make sure banner is visible
  const overlay = document.getElementById("cookieOverlay");
  if (overlay) {
    overlay.style.display = "block";
    overlay.classList.remove("hidden");
  }
  return false;
}

function initializeToggles() {
  const toggles = document.querySelectorAll(".cookie-toggle:not(.disabled)");
  toggles.forEach((toggle) => {
    const type = toggle.getAttribute("data-type");
    
    // Set initial state based on preferences
    if (type && cookiePreferences[type]) {
      toggle.classList.add("active");
    }
    
    toggle.addEventListener("click", function () {
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
  
  const cookieValue = JSON.stringify(consentData);
  console.log("Setting consent cookie:", cookieValue); // Debug log
  
  // Set the main consent cookie
  setCookie("steve_coffee_consent", cookieValue, 365);
  
  // Set a simple backup flag
  setCookie("steve_coffee_banner_dismissed", "true", 365);

  // Set individual preference cookies
  Object.keys(cookiePreferences).forEach((type) => {
    setCookie(`steve_coffee_${type}`, cookiePreferences[type], 365);
  });
  
  // Verify the cookies were set
  setTimeout(() => {
    const verification = getCookie("steve_coffee_consent");
    const flagVerification = getCookie("steve_coffee_banner_dismissed");
    console.log("Cookie verification:", verification); // Debug log
    console.log("Flag verification:", flagVerification); // Debug log
  }, 100);
}

function closeCookieBanner() {
  const overlay = document.getElementById("cookieOverlay");
  if (overlay) {
    // Immediately hide the banner
    overlay.style.display = "none";
    overlay.classList.add("hidden");
    
    // Optional: Add transition effect
    overlay.style.opacity = "0";
    overlay.style.transform = "scale(0.95)";
  }
}

// Additional function to completely reset cookies (for testing)
function resetCookieConsent() {
  deleteCookie("steve_coffee_consent");
  deleteCookie("steve_coffee_banner_dismissed");
  
  // Delete individual preference cookies
  Object.keys(cookiePreferences).forEach((type) => {
    deleteCookie(`steve_coffee_${type}`);
  });
  
  console.log("All consent cookies cleared");
  location.reload(); // Reload page to show banner again
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
  const cookieString = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  document.cookie = cookieString;
  console.log("Setting cookie:", cookieString); // Debug log
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
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

// Debug function to check cookies (remove in production)
function debugCookies() {
  console.log("All cookies:", document.cookie);
  console.log("Consent cookie:", getCookie("steve_coffee_consent"));
}