"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface RegionalLanguageInfo {
  state: string;
  languageName: string;
  nativeLanguageName: string;
  welcomeGreeting: string;
  localPortalUrl?: string;
}

export const stateLanguageDirectory: Record<string, RegionalLanguageInfo> = {
  "Tamil Nadu": {
    state: "Tamil Nadu",
    languageName: "Tamil",
    nativeLanguageName: "தமிழ்",
    welcomeGreeting: "தகவல் அறியும் உரிமைச் சட்டம் — தமிழ்நாடு குடிமக்களுக்கான வழிகாட்டி",
    localPortalUrl: "https://rtionline.tn.gov.in"
  },
  "Karnataka": {
    state: "Karnataka",
    languageName: "Kannada",
    nativeLanguageName: "ಕನ್ನಡ",
    welcomeGreeting: "ಮಾಹಿತಿ ಹಕ್ಕು ಕಾಯಿದೆ — ಕರ್ನಾಟಕದ ನಾಗರಿಕರಿಗೆ ಅಧಿಕೃತ ಮಾರ್ಗದರ್ಶಿ",
    localPortalUrl: "https://kic.karnataka.gov.in"
  },
  "Maharashtra": {
    state: "Maharashtra",
    languageName: "Marathi",
    nativeLanguageName: "मराठी",
    welcomeGreeting: "माहिती अधिकार अधिनियम — महाराष्ट्र नागरिकांसाठी मार्गदर्शक",
    localPortalUrl: "https://rtionline.maharashtra.gov.in"
  },
  "Telangana": {
    state: "Telangana",
    languageName: "Telugu",
    nativeLanguageName: "తెలుగు",
    welcomeGreeting: "సమాచార హక్కు చట్టం — తెలంగాణ పౌరుల సమాచార వేదిక",
    localPortalUrl: "https://rtionline.telangana.gov.in"
  },
  "Andhra Pradesh": {
    state: "Andhra Pradesh",
    languageName: "Telugu",
    nativeLanguageName: "తెలుగు",
    welcomeGreeting: "సమాచార హక్కు చట్టం — ఆంధ్రప్రదేశ్ పౌరుల సమాచార వేదిక",
    localPortalUrl: "https://aprtionline.ap.gov.in"
  },
  "Kerala": {
    state: "Kerala",
    languageName: "Malayalam",
    nativeLanguageName: "മലയാളം",
    welcomeGreeting: "വിവരാവകാശ നിയമം — കേരളത്തിലെ പൗരന്മാർക്കുള്ള മാർഗ്ഗനിർദ്ദേശം",
    localPortalUrl: "https://rtionline.kerala.gov.in"
  },
  "West Bengal": {
    state: "West Bengal",
    languageName: "Bengali",
    nativeLanguageName: "বাংলা",
    welcomeGreeting: "তথ্য জানার অধিকার আইন — পশ্চিমবঙ্গ নাগরিকদের জন্য নির্দেশিকা",
    localPortalUrl: "https://wbic.wb.gov.in"
  },
  "Gujarat": {
    state: "Gujarat",
    languageName: "Gujarati",
    nativeLanguageName: "ગુજરાતી",
    welcomeGreeting: "માહિતી અધિકાર અધિનિયમ — ગુજરાતના નાગરિકો માટે માર્ગદર્શિકા",
    localPortalUrl: "https://rtionline.gujarat.gov.in"
  },
  "Punjab": {
    state: "Punjab",
    languageName: "Punjabi",
    nativeLanguageName: "ਪੰਜਾਬੀ",
    welcomeGreeting: "ਸੂਚਨਾ ਦਾ ਅਧਿਕਾਰ ਕਾਨੂੰਨ — ਪੰਜਾਬ ਦੇ ਨਾਗਰਿਕਾਂ ਲਈ ਮਾਰਗਦਰਸ਼ਕ",
    localPortalUrl: "https://rtionline.punjab.gov.in"
  },
  "Odisha": {
    state: "Odisha",
    languageName: "Odia",
    nativeLanguageName: "ଓଡ଼ିଆ",
    welcomeGreeting: "ସୂଚନା ଅଧିକାର ଆଇନ — ଓଡ଼ିଶାର ନାଗରିକମାନଙ୍କ ପାଇଁ ମାର୍ଗଦର୍ଶିକା",
    localPortalUrl: "https://rtiodisha.gov.in"
  },
  "Rajasthan": {
    state: "Rajasthan",
    languageName: "Hindi",
    nativeLanguageName: "हिन्दी",
    welcomeGreeting: "सूचना का अधिकार अधिनियम — राजस्थान के नागरिकों हेतु मार्गदर्शिका",
    localPortalUrl: "https://rti.rajasthan.gov.in"
  },
  "Uttar Pradesh": {
    state: "Uttar Pradesh",
    languageName: "Hindi",
    nativeLanguageName: "हिन्दी",
    welcomeGreeting: "सूचना का अधिकार अधिनियम — उत्तर प्रदेश के नागरिकों हेतु मार्गदर्शिका",
    localPortalUrl: "https://rtionline.up.gov.in"
  },
  "Bihar": {
    state: "Bihar",
    languageName: "Hindi",
    nativeLanguageName: "हिन्दी",
    welcomeGreeting: "सूचना का अधिकार अधिनियम — बिहार के नागरिकों हेतु मार्गदर्शिका (जानकारी पोर्टल)",
    localPortalUrl: "https://jaankari.bihar.gov.in"
  },
  "Delhi": {
    state: "Delhi NCR",
    languageName: "Hindi",
    nativeLanguageName: "हिन्दी",
    welcomeGreeting: "सूचना का अधिकार अधिनियम — दिल्ली एवं राष्ट्रीय राजधानी क्षेत्र",
    localPortalUrl: "https://rtionline.delhi.gov.in"
  },
  "Madhya Pradesh": {
    state: "Madhya Pradesh",
    languageName: "Hindi",
    nativeLanguageName: "हिन्दी",
    welcomeGreeting: "सूचना का अधिकार अधिनियम — मध्य प्रदेश के नागरिकों हेतु मार्गदर्शिका",
    localPortalUrl: "https://rtionline.mp.gov.in"
  }
};

interface LocationContextType {
  city: string | null;
  state: string;
  regionInfo: RegionalLanguageInfo;
  isAutoDetected: boolean;
  showRegionalBanner: boolean;
  dismissBanner: () => void;
}

const defaultRegion: RegionalLanguageInfo = {
  state: "National / Central",
  languageName: "Hindi & Regional Languages",
  nativeLanguageName: "हिन्दी / Regional",
  welcomeGreeting: "सूचना का अधिकार अधिनियम, 2005 — केंद्रीय एवं राज्य लोक प्राधिकरण"
};

const LocationContext = createContext<LocationContextType | null>(null);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [city, setCity] = useState<string | null>(null);
  const [stateName, setStateName] = useState<string>("National / Central");
  const [regionInfo, setRegionInfo] = useState<RegionalLanguageInfo>(defaultRegion);
  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(false);
  const [showRegionalBanner, setShowRegionalBanner] = useState<boolean>(true);

  useEffect(() => {
    // Intelligent Location Detection based on coordinates / timezone
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          let detectedSt = "National / Central";
          let detectedCt: string | null = null;

          // Lat/Long geographical approximation for Indian regions:
          // Tamil Nadu: ~8.0N - 13.5N, 77.0E - 80.5E
          if (lat >= 8.0 && lat <= 13.5 && lon >= 77.0 && lon <= 80.5) {
            detectedSt = "Tamil Nadu";
            detectedCt = lat > 12.8 ? "Chennai" : "Madurai / Coimbatore";
          }
          // Karnataka: ~11.5N - 18.5N, 74.0E - 78.5E
          else if (lat >= 11.5 && lat <= 18.5 && lon >= 74.0 && lon <= 78.5) {
            detectedSt = "Karnataka";
            detectedCt = lat < 13.5 ? "Bengaluru" : "Hubballi";
          }
          // Maharashtra: ~15.5N - 22.0N, 72.5E - 80.5E
          else if (lat >= 15.5 && lat <= 22.0 && lon >= 72.5 && lon <= 80.5) {
            detectedSt = "Maharashtra";
            detectedCt = "Mumbai / Pune";
          }
          // Telangana / AP: ~13.5N - 19.5N, 77.5E - 84.5E
          else if (lat >= 13.5 && lat <= 19.5 && lon >= 77.5 && lon <= 84.5) {
            detectedSt = "Telangana";
            detectedCt = "Hyderabad";
          }
          // West Bengal: ~21.5N - 27.5N, 85.5E - 89.5E
          else if (lat >= 21.5 && lat <= 27.5 && lon >= 85.5 && lon <= 89.5) {
            detectedSt = "West Bengal";
            detectedCt = "Kolkata";
          }
          // Kerala: ~8.3N - 12.8N, 75.0E - 77.5E
          else if (lat >= 8.3 && lat <= 12.8 && lon >= 75.0 && lon <= 77.5) {
            detectedSt = "Kerala";
            detectedCt = "Kochi / Thiruvananthapuram";
          }
          // Gujarat: ~20.0N - 24.5N, 68.0E - 74.5E
          else if (lat >= 20.0 && lat <= 24.5 && lon >= 68.0 && lon <= 74.5) {
            detectedSt = "Gujarat";
            detectedCt = "Ahmedabad";
          }
          // Default North / Delhi NCR
          else {
            detectedSt = "Delhi";
            detectedCt = "Delhi NCR";
          }

          setCity(detectedCt);
          setStateName(detectedSt);
          setRegionInfo(stateLanguageDirectory[detectedSt] || defaultRegion);
          setIsAutoDetected(true);
        },
        () => {
          // If geolocation is denied or silent, default to gentle national prompt
          setIsAutoDetected(false);
        },
        { timeout: 3000 }
      );
    }
  }, []);

  function dismissBanner() {
    setShowRegionalBanner(false);
  }

  return (
    <LocationContext.Provider
      value={{
        city,
        state: stateName,
        regionInfo,
        isAutoDetected,
        showRegionalBanner,
        dismissBanner
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return ctx;
}
