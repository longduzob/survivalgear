"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700">
            <p>
              Nous utilisons des cookies pour améliorer votre expérience. En continuant à naviguer sur ce site, vous acceptez notre{" "}
              <a href="/legal/privacy" className="text-primary hover:underline">
                politique de confidentialité
              </a>
              .
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={declineCookies}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition text-sm font-medium"
            >
              Refuser
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition text-sm font-medium"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
