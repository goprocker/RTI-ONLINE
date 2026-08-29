"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type LanguageCode = "en" | "ta" | "kn" | "hi" | "te" | "mr" | "bn" | "ml" | "gu" | "pa" | "or";

export interface LanguageMeta {
  code: LanguageCode;
  name: string;
  nativeName: string;
  defaultCities: string[];
  state: string;
}

export const supportedLanguages: LanguageMeta[] = [
  { code: "en", name: "English", nativeName: "English", defaultCities: ["All India"], state: "National" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", defaultCities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"], state: "Tamil Nadu" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", defaultCities: ["Bengaluru", "Bangalore", "Mysuru", "Hubballi", "Mangaluru", "Belagavi"], state: "Karnataka" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", defaultCities: ["Delhi", "Lucknow", "Jaipur", "Bhopal", "Patna", "Ranchi", "Chandigarh"], state: "North Central India" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", defaultCities: ["Hyderabad", "Visakhapatnam", "Vijayawada", "Guntur", "Warangal"], state: "Telangana & Andhra Pradesh" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", defaultCities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"], state: "Maharashtra" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", defaultCities: ["Kolkata", "Howrah", "Siliguri", "Durgapur", "Asansol"], state: "West Bengal" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", defaultCities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"], state: "Kerala" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", defaultCities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"], state: "Gujarat" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", defaultCities: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda"], state: "Punjab" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", defaultCities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"], state: "Odisha" }
];

export const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    portal_name: "RTI Online",
    portal_sub: "Right to Information Portal · Government of India",
    gov_india: "भारत सरकार · Government of India",
    ministry_title: "Ministry of Personnel, Public Grievances & Pensions",
    home: "Home",
    submit_request: "Submit Request",
    track_status: "Track Status",
    first_appeal: "Submit First Appeal",
    find_authority: "Find Authority",
    help_rules: "Help & Guidelines",
    signin: "Citizen Sign In",
    hero_title: "Right to Information Online Portal",
    hero_lead: "Single-window platform for Indian citizens to file RTI applications, track disposal timelines, and submit First Appeals online under the RTI Act, 2005.",
    btn_submit_rti: "+ Submit RTI Request",
    btn_track_status: "Track Application Status →",
    statutory_process: "4-Step RTI Application & Disposal Process",
    step_1_title: "Submit Request",
    step_1_desc: "Select public authority, draft queries up to 3,000 characters, and pay statutory ₹10 fee (₹0 for BPL).",
    step_2_title: "Nodal Assignment",
    step_2_desc: "Registration number generated. Nodal Officer assigns request to CPIO or transfers under Sec 6(3) in 5 days.",
    step_3_title: "CPIO Record Retrieval",
    step_3_desc: "CPIO retrieves official files, circulars, and notesheets. Photocopy fee notice issued if applicable.",
    step_4_title: "Statutory Disposal",
    step_4_desc: "Signed response order furnished in 30 days. If delayed or denied, submit First Appeal at ₹0 fee.",
    quick_services: "Quick Services",
    location_detected: "Location Detected",
    switch_lang: "Language",
    gandhi_quote: "Recall the face of the poorest and the weakest person... and ask yourself if the step you contemplate is going to be of any use to him.",
    flowchart_title: "Statutory RTI Lifecycle & Escalation Flowchart",
    footer_desc: "Official single-window web portal of the Government of India for Indian citizens to file RTI requests and First Appeals online."
  },
  ta: {
    portal_name: "தகவல் அறியும் உரிமை இணையதளம் (RTI Online)",
    portal_sub: "தகவல் அறியும் உரிமை இணையதளம் · இந்திய அரசு",
    gov_india: "இந்திய அரசு · Government of India",
    ministry_title: "பணியாளர், பொதுக் குறைகள் மற்றும் ஓய்வூதிய அமைச்சகம்",
    home: "முகப்பு",
    submit_request: "விண்ணப்பம் சமர்ப்பிக்க",
    track_status: "நிலையை அறிய",
    first_appeal: "முதல் மேல்முறையீடு",
    find_authority: "அதிகார அமைப்பை கண்டறிய",
    help_rules: "உதவி & வழிகாட்டுதல்கள்",
    signin: "குடிமக்கள் உள்நுழைவு",
    hero_title: "தகவல் அறியும் உரிமை இணையதளம்",
    hero_lead: "2005 ஆம் ஆண்டு தகவல் அறியும் உரிமைச் சட்டத்தின் கீழ் இந்திய குடிமக்கள் மத்திய அமைச்சகங்கள் மற்றும் துறைகளுக்கு ஆன்லைனில் விண்ணப்பிக்கவும், மேல்முறையீடு செய்யவும் அதிகாரப்பூர்வ தளம்.",
    btn_submit_rti: "+ மனு தாக்கல் செய்க",
    btn_track_status: "விண்ணப்ப நிலையை சரிபார்க்க →",
    statutory_process: "4-படி தகவல் அறியும் உரிமை செயல்முறை",
    step_1_title: "1. மனு சமர்ப்பித்தல்",
    step_1_desc: "அமைப்பைத் தேர்ந்தெடுத்து, 3,000 எழுத்துகளுக்குள் கேள்விகளை எழுதி, ₹10 கட்டணம் செலுத்தவும் (வறுமைக்கோட்டிற்கு கீழ் உள்ளவர்களுக்கு ₹0).",
    step_2_title: "2. நோடல் அதிகாரி ஆய்வு",
    step_2_desc: "பதிவு எண் உடனடியாக வழங்கப்படும். 5 நாட்களுக்குள் உரிய CPIO-க்கு மாற்றப்படும் (பிரிவு 6(3)).",
    step_3_title: "3. ஆவணங்கள் சேகரிப்பு",
    step_3_desc: "மத்திய பொதுத் தகவல் அதிகாரி (CPIO) அரசு கோப்புகள் மற்றும் குறிப்புகளை சேகரிக்கிறார்.",
    step_4_title: "4. பதில் வழங்குதல்",
    step_4_desc: "30 நாட்களுக்குள் கையொப்பமிட்ட பதில் ஆணை வழங்கப்படும். திருப்தியடையவில்லை எனில் முதல் மேல்முறையீடு செய்யலாம்.",
    quick_services: "விரைவு சேவைகள்",
    location_detected: "கண்டறியப்பட்ட இடம்",
    switch_lang: "மொழி",
    gandhi_quote: "நீங்கள் பார்த்த மிக ஏழை மற்றும் நலிந்த மனிதனின் முகத்தை நினைவுகூருங்கள்... நீங்கள் எடுக்கும் முடிவு அவனுக்குப் பயன் தருமா என்று கேளுங்கள்.",
    flowchart_title: "தகவல் அறியும் உரிமை சட்டப்படியான காலவரிசை வரைபடம்",
    footer_desc: "இந்திய குடிமக்கள் மத்திய அரசு துறைகளிடம் தகவல் பெற அதிகாரப்பூர்வ ஒரே சாளர இணையதளம்."
  },
  kn: {
    portal_name: "ಮಾಹಿತಿ ಹಕ್ಕು ಆನ್‌ಲೈನ್ (RTI Online)",
    portal_sub: "ಮಾಹಿತಿ ಹಕ್ಕು ಪೋರ್ಟಲ್ · ಭಾರತ ಸರ್ಕಾರ",
    gov_india: "ಭಾರತ ಸರ್ಕಾರ · Government of India",
    ministry_title: "ಸಿಬ್ಬಂದಿ, ಸಾರ್ವಜನಿಕ ಕುಂದುಕೊರತೆಗಳು ಮತ್ತು ಪಿಂಚಣಿ ಸಚಿವಾಲಯ",
    home: "ಮುಖಪುಟ",
    submit_request: "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    track_status: "ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ",
    first_appeal: "ಪ್ರಥಮ ಮೇಲ್ಮನವಿ",
    find_authority: "ಪ್ರಾಧಿಕಾರ ಹುಡುಕಿ",
    help_rules: "ಸಹಾಯ ಮತ್ತು ನಿಯಮಗಳು",
    signin: "ನಾಗರಿಕ ಲಾಗಿನ್",
    hero_title: "ಮಾಹಿತಿ ಹಕ್ಕು ಆನ್‌ಲೈನ್ ಪೋರ್ಟಲ್",
    hero_lead: "ಮಾಹಿತಿ ಹಕ್ಕು ಕಾಯಿದೆ, 2005 ರ ಅಡಿಯಲ್ಲಿ ಕೇಂದ್ರ ಸಚಿವಾಲಯಗಳು ಮತ್ತು ಸಾರ್ವಜನಿಕ ಪ್ರಾಧಿಕಾರಗಳಿಗೆ ಅರ್ಜಿಗಳನ್ನು ಸಲ್ಲಿಸಲು ಮತ್ತು ಮೇಲ್ಮನವಿ ಸಲ್ಲಿಸಲು ಅಧಿಕೃತ ಏಕ-ಗವಾಕ್ಷಿ ತಾಣ.",
    btn_submit_rti: "+ ಆರ್‌ಟಿಐ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    btn_track_status: "ಅರ್ಜಿ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ →",
    statutory_process: "4-ಹಂತದ ಆರ್‌ಟಿಐ ಅರ್ಜಿ ಮತ್ತು ವಿಲೇವಾರಿ ಪ್ರಕ್ರಿಯೆ",
    step_1_title: "1. ಅರ್ಜಿ ಸಲ್ಲಿಕೆ",
    step_1_desc: "ಪ್ರಾಧಿಕಾರ ಆಯ್ಕೆಮಾಡಿ, 3,000 ಅಕ್ಷರಗಳಲ್ಲಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಬರೆದು ₹10 ಶುಲ್ಕ ಪಾವತಿಸಿ (ಬಿಪಿಎಲ್ ಕಾರ್ಡ್‌ದಾರರಿಗೆ ₹0).",
    step_2_title: "2. ನೋಡಲ್ ಪರಿಶೀಲನೆ",
    step_2_desc: "ನೋಂದಣಿ ಸಂಖ್ಯೆ ತಕ್ಷಣವೇ ಸೃಷ್ಟಿಯಾಗುತ್ತದೆ. 5 ದಿನಗಳಲ್ಲಿ ಸಂಬಂಧಪಟ್ಟ ಸಿಪಿಐಒಗೆ ವರ್ಗಾವಣೆ (ಕಲಂ 6(3)).",
    step_3_title: "3. ದಾಖಲೆಗಳ ಸಂಗ್ರಹ",
    step_3_desc: "ಕೇಂದ್ರ ಸಾರ್ವಜನಿಕ ಮಾಹಿತಿ ಅಧಿಕಾರಿ (CPIO) ಅಧಿಕೃತ ಕಡತಗಳು ಮತ್ತು ಟಿಪ್ಪಣಿಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತಾರೆ.",
    step_4_title: "4. ಅಧಿಕೃತ ಉತ್ತರ",
    step_4_desc: "30 ದಿನಗಳಲ್ಲಿ ಸಹಿ ಮಾಡಿದ ಉತ್ತರ ಆದೇಶ ಲಭ್ಯವಾಗುತ್ತದೆ. ತೃಪ್ತಿಯಾಗದಿದ್ದರೆ ಉಚಿತವಾಗಿ ಪ್ರಥಮ ಮೇಲ್ಮನವಿ ಸಲ್ಲಿಸಿ.",
    quick_services: "ತ್ವರಿತ ಸೇವೆಗಳು",
    location_detected: "ಗುರುತಿಸಲಾದ ಸ್ಥಳ",
    switch_lang: "ಭಾಷೆ",
    gandhi_quote: "ನೀವು ಕಂಡ ಅತ್ಯಂತ ಬಡ ಮತ್ತು ದುರ್ಬಲ ವ್ಯಕ್ತಿಯ ಮುಖವನ್ನು ನೆನಪಿಸಿಕೊಳ್ಳಿ... ನೀವು ತೆಗೆದುಕೊಳ್ಳುವ ನಿರ್ಧಾರ ಅವನಿಗೆ ಉಪಯುಕ್ತವೇ ಎಂದು ನಿಮ್ಮನ್ನೇ ಕೇಳಿಕೊಳ್ಳಿ.",
    flowchart_title: "ಶಾಸನಬದ್ಧ ಆರ್‌ಟಿಐ ಪ್ರಕ್ರಿಯೆ ಮತ್ತು ಸಮಯಾವಧಿ ನಕ್ಷೆ",
    footer_desc: "ಕೇಂದ್ರ ಸರ್ಕಾರದ ಇಲಾಖೆಗಳಿಂದ ಮಾಹಿತಿ ಪಡೆಯಲು ಭಾರತೀಯ ನಾಗರಿಕರಿಗಾಗಿ ಅಧಿಕೃತ ಪೋರ್ಟಲ್."
  },
  hi: {
    portal_name: "आरटीआई ऑनलाइन (RTI Online)",
    portal_sub: "सूचना का अधिकार पोर्टल · भारत सरकार",
    gov_india: "भारत सरकार · Government of India",
    ministry_title: "कार्मिक, लोक शिकायत और पेंशन मंत्रालय",
    home: "होम",
    submit_request: "आवेदन जमा करें",
    track_status: "स्थिति जानें",
    first_appeal: "प्रथम अपील करें",
    find_authority: "प्राधिकरण खोजें",
    help_rules: "सहायता एवं नियम",
    signin: "नागरिक लॉगिन",
    hero_title: "सूचना का अधिकार ऑनलाइन पोर्टल",
    hero_lead: "सूचना का अधिकार अधिनियम, 2005 के अंतर्गत केंद्रीय मंत्रालयों और सार्वजनिक प्राधिकरणों में आरटीआई आवेदन एवं प्रथम अपील दाखिल करने का आधिकारिक मंच।",
    btn_submit_rti: "+ आरटीआई आवेदन करें",
    btn_track_status: "आवेदन की स्थिति देखें →",
    statutory_process: "4-चरणीय आरटीआई आवेदन एवं निस्तारण प्रक्रिया",
    step_1_title: "1. आवेदन सबमिट करें",
    step_1_desc: "प्राधिकरण चुनें, 3,000 अक्षरों तक प्रश्न लिखें और ₹10 का शुल्क अदा करें (बीपीएल के लिए ₹0)।",
    step_2_title: "2. नोडल आवंटन",
    step_2_desc: "पंजीकरण संख्या तुरंत जारी होती है। 5 दिनों में संबंधित सीपीआईओ को अंतरण (धारा 6(3))।",
    step_3_title: "3. रिकॉर्ड पुनर्प्राप्ति",
    step_3_desc: "सीपीआईओ सरकारी फाइलों, सर्कुलरों और नोटशीट से प्रमाणित जानकारी संकलित करते हैं।",
    step_4_title: "4. विधिक निस्तारण",
    step_4_desc: "30 दिनों के भीतर हस्ताक्षरित उत्तर आदेश दिया जाता है। असंतुष्ट होने पर निःशुल्क प्रथम अपील करें।",
    quick_services: "त्वरित सेवाएं",
    location_detected: "पहचाना गया स्थान",
    switch_lang: "भाषा",
    gandhi_quote: "उस सबसे गरीब और कमजोर व्यक्ति का चेहरा याद करो जिसे तुमने देखा हो... और खुद से पूछो कि जो कदम तुम उठाने जा रहे हो, क्या वह उसके किसी काम आएगा?",
    flowchart_title: "विधिक आरटीआई समय-सीमा एवं अपील प्रवाह चार्ट",
    footer_desc: "भारतीय नागरिकों के लिए केंद्र सरकार के मंत्रालयों से सूचना प्राप्त करने का आधिकारिक सिंगल-विंडो वेब पोर्टल।"
  },
  te: {
    portal_name: "సమాచార హక్కు ఆన్‌లైన్ (RTI Online)",
    portal_sub: "సమాచార హక్కు పోర్టల్ · భారత ప్రభుత్వం",
    gov_india: "భారత ప్రభుత్వం · Government of India",
    ministry_title: "సిబ్బంది, ప్రజా ఫిర్యాదులు మరియు పెన్షన్ల మంత్రిత్వ శాఖ",
    home: "హోమ్",
    submit_request: "దరఖాస్తు సమర్పించండి",
    track_status: "స్థితి తెలుసుకోండి",
    first_appeal: "మొదటి అప్పీల్",
    find_authority: "అధికార సంస్థను వెతకండి",
    help_rules: "సహాయం & మార్గదర్శకాలు",
    signin: "పౌరుల లాగిన్",
    hero_title: "సమాచార హక్కు ఆన్‌లైన్ పోర్టల్",
    hero_lead: "సమాచార హక్కు చట్టం, 2005 కింద కేంద్ర మంత్రిత్వ శాఖలకు ఆర్టీఐ దరఖాస్తులు మరియు మొదటి అప్పీళ్లు సమర్పించడానికి అధికారిక పోర్టల్.",
    btn_submit_rti: "+ ఆర్టీఐ దరఖాస్తు చేయండి",
    btn_track_status: "దరఖాస్తు స్థితి చూడండి →",
    statutory_process: "4-దశల ఆర్టీఐ దరఖాస్తు ప్రక్రియ",
    step_1_title: "1. దరఖాస్తు సమర్పణ",
    step_1_desc: "అధికార సంస్థను ఎంచుకుని, ₹10 రుసుము చెల్లించండి (బీపీఎల్ వారికి ₹0).",
    step_2_title: "2. నోడల్ పరిశీలన",
    step_2_desc: "రిజిస్ట్రేషన్ నంబర్ తక్షణమే వస్తుంది. 5 రోజుల్లో సంబంధిత CPIOకి బదిలీ (సెక్షన్ 6(3)).",
    step_3_title: "3. సమాచార సేకరణ",
    step_3_desc: "కేంద్ర ప్రజా సమాచార అధికారి (CPIO) రికార్డులను సేకరిస్తారు.",
    step_4_title: "4. అధికారిక సమాధానం",
    step_4_desc: "30 రోజుల్లో డిజిటల్ సంతకంతో కూడిన సమాధానం అందుతుంది.",
    quick_services: "త్వరిత సేవలు",
    location_detected: "గుర్తించిన ప్రదేశం",
    switch_lang: "భాష",
    gandhi_quote: "మీరు చూసిన అత్యంత పేద, బలహీనమైన వ్యక్తి ముఖాన్ని గుర్తుచేసుకోండి... మీరు వేసే అడుగు అతనికి ఏమైనా ఉపయోగపడుతుందా అని ఆలోచించండి.",
    flowchart_title: "చట్టబద్ధమైన ఆర్టీఐ కాలక్రమ ఫ్లోచార్ట్",
    footer_desc: "కేంద్ర ప్రభుత్వ శాఖల నుండి సమాచారం పొందేందుకు భారతీయ పౌరుల అధికారిక పోర్టల్."
  },
  mr: {
    portal_name: "माहिती अधिकार ऑनलाइन (RTI Online)",
    portal_sub: "माहिती अधिकार पोर्टल · भारत सरकार",
    gov_india: "भारत सरकार · Government of India",
    ministry_title: "कार्मिक, सार्वजनिक तक्रारी आणि पेन्शन मंत्रालय",
    home: "मुख्यपृष्ठ",
    submit_request: "अर्ज दाखल करा",
    track_status: "स्थिती तपासा",
    first_appeal: "प्रथम अपील",
    find_authority: "प्राधिकरण शोधा",
    help_rules: "मदत आणि नियम",
    signin: "नागरिक लॉगिन",
    hero_title: "माहिती अधिकार ऑनलाइन पोर्टल",
    hero_lead: "माहिती अधिकार कायदा, २००५ अंतर्गत केंद्र सरकारच्या मंत्रालयांकडे आरटीआय अर्ज आणि प्रथम अपील दाखल करण्याचे अधिकृत पोर्टल.",
    btn_submit_rti: "+ आरटीआय अर्ज करा",
    btn_track_status: "अर्जाची स्थिती तपासा →",
    statutory_process: "४-टप्प्यांची आरटीआय प्रक्रिया",
    step_1_title: "१. अर्ज सादर करा",
    step_1_desc: "प्राधिकरण निवडून ₹१० शुल्क भरा (दारिद्र्यरेषेखालील लोकांसाठी ₹०).",
    step_2_title: "२. नोडल वाटप",
    step_2_desc: "नोंदणी क्रमांक लगेच मिळतो. ५ दिवसांत संबंधित सीपीआयओकडे वर्ग (कलम ६(३)).",
    step_3_title: "३. माहिती संकलन",
    step_3_desc: "सीपीआयओ शासकीय फाइल्स आणि नोंदींमधून माहिती गोळा करतात.",
    step_4_title: "४. अधिकृत उत्तर",
    step_4_desc: "३० दिवसांत स्वाक्षरी केलेले उत्तर प्राप्त होते.",
    quick_services: "जलद सेवा",
    location_detected: "शोधलेले स्थान",
    switch_lang: "भाषा",
    gandhi_quote: "तुम्ही पाहिलेल्या सर्वात गरीब आणि दुर्बल व्यक्तीचा चेहरा आठवा... आणि स्वतःला विचारा की तुमचे पाऊल त्याला फायद्याचे ठरेल का?",
    flowchart_title: "माहिती अधिकार कायदेशीर वेळापत्रक फ्लोचार्ट",
    footer_desc: "केंद्र शासनाच्या विभागांकडून माहिती मिळवण्यासाठी भारतीय नागरिकांचे अधिकृत पोर्टल."
  },
  bn: {
    portal_name: "তথ্য জানার অধিকার অনলাইন (RTI Online)",
    portal_sub: "তথ্যের অধিকার পোর্টাল · ভারত সরকার",
    gov_india: "ভারত সরকার · Government of India",
    ministry_title: "কর্মী, জনঅভিযোগ ও পেনশন মন্ত্রক",
    home: "মূলপাতা",
    submit_request: "আবেদন জমা দিন",
    track_status: "অবস্থা দেখুন",
    first_appeal: "প্রথম আপিল",
    find_authority: "কর্তৃপক্ষ খুঁজুন",
    help_rules: "সাহায্য ও নির্দেশিকা",
    signin: "নাগরিক লগইন",
    hero_title: "তথ্য জানার অধিকার অনলাইন পোর্টাল",
    hero_lead: "তথ্য জানার অধিকার আইন, ২০০৫-এর অধীনে কেন্দ্রীয় মন্ত্রকগুলিতে আবেদন এবং প্রথম আপিল করার অফিসিয়াল পোর্টাল।",
    btn_submit_rti: "+ আরটিআই আবেদন করুন",
    btn_track_status: "আবেদনের স্থিতি দেখুন →",
    statutory_process: "৪-ধাপের আরটিআই নিষ্পত্তি প্রক্রিয়া",
    step_1_title: "১. আবেদন দাখিল",
    step_1_desc: "কর্তৃপক্ষ নির্বাচন করে ₹১০ ফি প্রদান করুন (বিপিএলদের জন্য ₹০)।",
    step_2_title: "২. নোডাল পর্যবেক্ষণ",
    step_2_desc: "রেজিস্ট্রেশন নম্বর তৈরি হবে এবং ৫ দিনের মধ্যে সিপিআইও-কে পাঠানো হবে।",
    step_3_title: "৩. তথ্য সংগ্রহ",
    step_3_desc: "সিপিআইও সরকারি ফাইল থেকে নথি প্রস্তুত করেন।",
    step_4_title: "৪. সরকারি উত্তর",
    step_4_desc: "৩০ দিনের মধ্যে স্বাক্ষরিত উত্তরপত্র প্রদান করা হয়।",
    quick_services: "দ্রুত পরিষেবা",
    location_detected: "শনাক্ত স্থান",
    switch_lang: "ভাষা",
    gandhi_quote: "আপনার দেখা সবচেয়ে দরিদ্র ও দুর্বল ব্যক্তির মুখটি মনে করুন... এবং ভাবুন আপনার পদক্ষেপ তার কোনো উপকারে আসবে কি না।",
    flowchart_title: "আইনসম্মত আরটিআই সময়সীমা ফ্লোচার্ট",
    footer_desc: "কেন্দ্রীয় সরকারের থেকে তথ্য পেতে ভারতীয় নাগরিকদের জন্য অফিসিয়াল পোর্টাল।"
  },
  ml: {
    portal_name: "വിവരാവകാശ ഓൺലൈൻ (RTI Online)",
    portal_sub: "വിവരാവകാശ പോർട്ടൽ · ഭാരത സർക്കാർ",
    gov_india: "ഭാരത സർക്കാർ · Government of India",
    ministry_title: "പേഴ്സണൽ, പബ്ലിക് ഗ്രീവൻസ് & പെൻഷൻ മന്ത്രാലയം",
    home: "ഹോം",
    submit_request: "അപേക്ഷ നൽകുക",
    track_status: "നില പരിശോധിക്കുക",
    first_appeal: "ഒന്നാം അപ്പീൽ",
    find_authority: "അതോറിറ്റിയെ കണ്ടെത്തുക",
    help_rules: "സഹായം & ചട്ടങ്ങൾ",
    signin: "സിറ്റിസൺ ലോഗിൻ",
    hero_title: "വിവരാവകാശ ഓൺലൈൻ പോർട്ടൽ",
    hero_lead: "2005-ലെ വിവരാവകാശ നിയമപ്രകാരം കേന്ദ്ര മന്ത്രാലയങ്ങൾക്ക് അപേക്ഷകളും അപ്പീലുകളും സമർപ്പിക്കുന്നതിനുള്ള ഔദ്യോഗിക പ്ലാറ്റ്‌ഫോം.",
    btn_submit_rti: "+ അപേക്ഷ സമർപ്പിക്കുക",
    btn_track_status: "അപേക്ഷയുടെ നില പരിശോധിക്കുക →",
    statutory_process: "4-ഘട്ട വിവരാവകാശ പ്രക്രിയ",
    step_1_title: "1. അപേക്ഷ സമർപ്പിക്കൽ",
    step_1_desc: "അതോറിറ്റി തിരഞ്ഞെടുത്ത് ₹10 ഫീസ് അടയ്ക്കുക (ബിപിഎൽ കാർഡുകാർക്ക് ₹0).",
    step_2_title: "2. നോഡൽ പരിശോധന",
    step_2_desc: "രജിസ്ട്രേഷൻ നമ്പർ ഉടൻ ലഭ്യമാകും. 5 ദിവസത്തിനകം ബന്ധപ്പെട്ട സി.പി.ഐ.ഒ-ക്ക് കൈമാറും.",
    step_3_title: "3. രേഖകൾ തയ്യാറാക്കൽ",
    step_3_desc: "സി.പി.ഐ.ഒ ഔദ്യോഗിക രേഖകൾ പരിശോധിച്ച് തയ്യാറാക്കുന്നു.",
    step_4_title: "4. ഔദ്യോഗിക മറുപടി",
    step_4_desc: "30 ദിവസത്തിനകം ഒപ്പിട്ട മറുപടി ലഭ്യമാക്കും.",
    quick_services: "ദ്രുത സേവനങ്ങൾ",
    location_detected: "കണ്ടെത്തിയ സ്ഥലം",
    switch_lang: "ഭാഷ",
    gandhi_quote: "നിങ്ങൾ കണ്ടിട്ടുള്ളതിൽ വച്ച് ഏറ്റവും ദരിദ്രനും നിസ്സഹായനുമായ മനുഷ്യന്റെ മുഖം ഓർക്കുക... നിങ്ങളുടെ നടപടി അവന് ഉപകാരപ്പെടുമോ എന്ന് സ്വയം ചോദിക്കുക.",
    flowchart_title: "വിവരാവകാശ സമയപരിധി ഫ്ലോചാർട്ട്",
    footer_desc: "വിവരാവകാശ അപേക്ഷകൾ സമർപ്പിക്കുന്നതിനുള്ള കേന്ദ്ര സർക്കാർ ഔദ്യോഗിക പോർട്ടൽ."
  },
  gu: {
    portal_name: "માહિતી અધિકાર ઓનલાઇન (RTI Online)",
    portal_sub: "માહિતી અધિકાર પોર્ટલ · ભારત સરકાર",
    gov_india: "ભારત સરકાર · Government of India",
    ministry_title: "કાર્મિક, લોક ફરિયાદ અને પેન્શન મંત્રાલય",
    home: "મુખ્ય પૃષ્ઠ",
    submit_request: "અરજી દાખલ કરો",
    track_status: "સ્થિતિ જાણો",
    first_appeal: "પ્રથમ અપીલ",
    find_authority: "સત્તામંડળ શોધો",
    help_rules: "મદદ અને નિયમો",
    signin: "નાગરિક લૉગિન",
    hero_title: "માહિતી અધિકાર ઓનલાઇન પોર્ટલ",
    hero_lead: "માહિતી અધિકાર અધિનિયમ, ૨૦૦૫ હેઠળ કેન્દ્ર સરકારના મંત્રાલયોમાં અરજી અને અપીલ દાખલ કરવાનું સત્તાવાર પોર્ટલ.",
    btn_submit_rti: "+ RTI અરજી કરો",
    btn_track_status: "અરજીની સ્થિતિ જુઓ →",
    statutory_process: "૪-પગલાંની RTI પ્રક્રિયા",
    step_1_title: "૧. અરજી સબમિટ કરો",
    step_1_desc: "સત્તામંડળ પસંદ કરી ₹૧૦ ફી ભરો (BPL માટે ₹૦).",
    step_2_title: "૨. નોડલ તપાસ",
    step_2_desc: "નોંધણી નંબર તાત્કાલિક મળશે અને ૫ દિવસમાં CPIOને મોકલવામાં આવશે.",
    step_3_title: "૩. માહિતી એકત્રિત કરવી",
    step_3_desc: "CPIO સરકારી ફાઇલોમાંથી માહિતી તૈયાર કરશે.",
    step_4_title: "૪. સત્તાવાર જવાબ",
    step_4_desc: "૩૦ દિવસમાં સહી કરેલ જવાબ આપવામાં આવશે.",
    quick_services: "ઝડપી સેવાઓ",
    location_detected: "ઓળખાયેલ સ્થળ",
    switch_lang: "ભાષા",
    gandhi_quote: "તમે જોયેલા સૌથી ગરીબ અને અસહાય વ્યક્તિનો ચહેરો યાદ કરો... અને વિચારો કે તમારું આ પગલું તેને ઉપયોગી થશે?",
    flowchart_title: "RTI સમયમર્યાદા ફ્લોચાર્ટ",
    footer_desc: "કેન્દ્ર સરકારના વિભાગો પાસેથી માહિતી મેળવવા માટે ભારતીય નાગરિકોનું સત્તાવાર પોર્ટલ."
  },
  pa: {
    portal_name: "ਸੂਚਨਾ ਦਾ ਅਧਿਕਾਰ ਆਨਲਾਈਨ (RTI Online)",
    portal_sub: "ਸੂਚਨਾ ਦਾ ਅਧਿਕਾਰ ਪੋਰਟਲ · ਭਾਰਤ ਸਰਕਾਰ",
    gov_india: "ਭਾਰਤ ਸਰਕਾਰ · Government of India",
    ministry_title: "ਪ੍ਰਸੋਨਲ, ਲੋਕ ਸ਼ਿਕਾਇਤਾਂ ਅਤੇ ਪੈਨਸ਼ਨ ਮੰਤਰਾਲਾ",
    home: "ਮੁੱਖ ਪੰਨਾ",
    submit_request: "ਅਰਜ਼ੀ ਦਾਖਲ ਕਰੋ",
    track_status: "ਸਥਿਤੀ ਦੇਖੋ",
    first_appeal: "ਪਹਿਲੀ ਅਪੀਲ",
    find_authority: "ਅਥਾਰਟੀ ਲੱਭੋ",
    help_rules: "ਮਦਦ ਅਤੇ ਨਿਯਮ",
    signin: "ਨਾਗਰਿਕ ਲੌਗਇਨ",
    hero_title: "ਸੂਚਨਾ ਦਾ ਅਧਿਕਾਰ ਆਨਲਾਈਨ ਪੋਰਟਲ",
    hero_lead: "ਸੂਚਨਾ ਦਾ ਅਧਿਕਾਰ ਕਾਨੂੰਨ, 2005 ਦੇ ਤਹਿਤ ਕੇਂਦਰੀ ਮੰਤਰਾਲਿਆਂ ਨੂੰ ਆਰਟੀਆਈ ਅਰਜ਼ੀਆਂ ਅਤੇ ਅਪੀਲਾਂ ਦਾਇਰ ਕਰਨ ਦਾ ਅਧਿਕਾਰਤ ਪੋਰਟਲ।",
    btn_submit_rti: "+ ਆਰਟੀਆਈ ਦਰਖਾਸਤ ਦਿਓ",
    btn_track_status: "ਦਰਖਾਸਤ ਦੀ ਸਥਿਤੀ ਜਾਂਚੋ →",
    statutory_process: "4-ਪੜਾਵੀ ਆਰਟੀਆਈ ਪ੍ਰਕਿਰਿਆ",
    step_1_title: "1. ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰੋ",
    step_1_desc: "ਅਥਾਰਟੀ ਚੁਣੋ ਅਤੇ ₹10 ਫੀਸ ਅਦਾ ਕਰੋ (ਬੀਪੀਐਲ ਲਈ ₹0)।",
    step_2_title: "2. ਨੋਡਲ ਜਾਂਚ",
    step_2_desc: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨੰਬਰ ਤੁਰੰਤ ਜਾਰੀ ਹੋਵੇਗਾ ਅਤੇ 5 ਦਿਨਾਂ ਵਿੱਚ CPIO ਨੂੰ ਭੇਜਿਆ ਜਾਵੇਗਾ।",
    step_3_title: "3. ਰਿਕਾਰਡ ਤਿਆਰੀ",
    step_3_desc: "ਸੀਪੀਆਈਓ ਸਰਕਾਰੀ ਫਾਈਲਾਂ ਤੋਂ ਜਾਣਕਾਰੀ ਇਕੱਠੀ ਕਰਦੇ ਹਨ।",
    step_4_title: "4. ਅਧਿਕਾਰਤ ਜਵਾਬ",
    step_4_desc: "30 ਦਿਨਾਂ ਦੇ ਅੰਦਰ ਦਸਤਖਤ ਕੀਤਾ ਜਵਾਬ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ।",
    quick_services: "ਤੁਰੰਤ ਸੇਵਾਵਾਂ",
    location_detected: "ਪਛਾਣਿਆ ਗਿਆ ਸ਼ਹਿਰ",
    switch_lang: "ਭਾਸ਼ਾ",
    gandhi_quote: "ਉਸ ਸਭ ਤੋਂ ਗਰੀਬ ਅਤੇ ਕਮਜ਼ੋਰ ਵਿਅਕਤੀ ਦਾ ਚਿਹਰਾ ਯਾਦ ਕਰੋ ਜਿਸਨੂੰ ਤੁਸੀਂ ਦੇਖਿਆ ਹੈ... ਅਤੇ ਸੋਚੋ ਕਿ ਕੀ ਤੁਹਾਡਾ ਇਹ ਕਦਮ ਉਸ ਲਈ ਫਾਇਦੇਮੰਦ ਹੋਵੇਗਾ?",
    flowchart_title: "ਆਰਟੀਆਈ ਸਮਾਂ-ਸੀਮਾ ਚਾਰਟ",
    footer_desc: "ਕੇਂਦਰ ਸਰਕਾਰ ਦੇ ਵਿਭਾਗਾਂ ਤੋਂ ਜਾਣਕਾਰੀ ਲੈਣ ਲਈ ਭਾਰਤੀ ਨਾਗਰਿਕਾਂ ਦਾ ਅਧਿਕਾਰਤ ਪੋਰਟਲ।"
  },
  or: {
    portal_name: "ସୂଚନା ଅଧିକାର ଅନଲାଇନ୍ (RTI Online)",
    portal_sub: "ସୂଚନା ଅଧିକାର ପୋର୍ଟାଲ୍ · ଭାରତ ସରକାର",
    gov_india: "ଭାରତ ସରକାର · Government of India",
    ministry_title: "କାର୍ମିକ, ଲୋକ ଅଭିଯୋଗ ଓ ପେନସନ୍ ମନ୍ତ୍ରଣାଳୟ",
    home: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
    submit_request: "ଆବେଦନ ଦାଖଲ କରନ୍ତୁ",
    track_status: "ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ",
    first_appeal: "ପ୍ରଥମ ଅପିଲ୍",
    find_authority: "କର୍ତ୍ତୃପକ୍ଷ ଖୋଜନ୍ତୁ",
    help_rules: "ସହାୟତା ଓ ନିୟମାବଳୀ",
    signin: "ନାଗରିକ ଲଗଇନ୍",
    hero_title: "ସୂଚନା ଅଧିକାର ଅନଲାଇନ୍ ପୋର୍ଟାଲ୍",
    hero_lead: "ସୂଚନା ଅଧିକାର ଆଇନ, ୨୦୦୫ ଅଧୀନରେ କେନ୍ଦ୍ରୀୟ ମନ୍ତ୍ରଣାଳୟଗୁଡ଼ିକରେ ଆବେଦନ ଓ ପ୍ରଥମ ଅପିଲ୍ ଦାଖଲ କରିବାର ଅଫିସିଆଲ୍ ପୋର୍ଟାଲ୍।",
    btn_submit_rti: "+ RTI ଆବେଦନ କରନ୍ତୁ",
    btn_track_status: "ଆବେଦନ ସ୍ଥିତି ଦେଖନ୍ତୁ →",
    statutory_process: "୪-ପର୍ଯ୍ୟାୟ RTI ପ୍ରକ୍ରିୟା",
    step_1_title: "୧. ଆବେଦନ ଦାଖଲ",
    step_1_desc: "କର୍ତ୍ତୃପକ୍ଷ ଚୟନ କରି ₹୧୦ ଫି ଦାଖଲ କରନ୍ତୁ (BPL ପାଇଁ ₹୦)।",
    step_2_title: "୨. ନୋଡାଲ୍ ଯାଞ୍ଚ",
    step_2_desc: "ପଞ୍ଜୀକରଣ ନମ୍ବର ତୁରନ୍ତ ମିଳିବ ଏବଂ ୫ ଦିନ ମଧ୍ୟରେ CPIOଙ୍କୁ ପଠାଯିବ।",
    step_3_title: "୩. ସୂଚନା ସଂଗ୍ରହ",
    step_3_desc: "CPIO ସରକାରୀ ଫାଇଲରୁ ସୂଚନା ପ୍ରସ୍ତୁତ କରନ୍ତି।",
    step_4_title: "୪. ସରକାରୀ ଉତ୍ତର",
    step_4_desc: "୩୦ ଦିନ ମଧ୍ୟରେ ଲିଖିତ ଉତ୍ତର ପ୍ରଦାନ କରାଯାଏ।",
    quick_services: "ଦ୍ରୁତ ସେବା",
    location_detected: "ଚିହ୍ନଟ ସ୍ଥାନ",
    switch_lang: "ଭାଷା",
    gandhi_quote: "ଆପଣ ଦେଖିଥିବା ସବୁଠାରୁ ଗରିବ ଏବଂ ଅସହାୟ ବ୍ୟକ୍ତିଙ୍କ ମୁହଁ ମନେ ପକାନ୍ତୁ... ଏବଂ ଭାବନ୍ତୁ ଆପଣଙ୍କ ପଦକ୍ଷେପ ତାଙ୍କର କିଛି ଉପକାର କରିବ କି?",
    flowchart_title: "RTI ସମୟସୀମା ଫ୍ଲୋଚାର୍ଟ",
    footer_desc: "କେନ୍ଦ୍ର ସରକାରଙ୍କ ବିଭାଗଗୁଡ଼ିକରୁ ସୂଚନା ପାଇବା ପାଇଁ ଭାରତୀୟ ନାଗରିକଙ୍କ ଅଫିସିଆଲ୍ ପୋର୍ଟାଲ୍।"
  }
};

interface I18nContextType {
  language: LanguageCode;
  detectedCity: string;
  detectedState: string;
  isAutoDetected: boolean;
  setLanguage: (lang: LanguageCode) => void;
  setCityLocation: (cityName: string) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const [detectedCity, setDetectedCity] = useState<string>("Bengaluru");
  const [detectedState, setDetectedState] = useState<string>("Karnataka");
  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(true);

  // Auto-detect based on City / Coordinates / Timezone / Locale
  useEffect(() => {
    // Check if user previously saved language preference
    const savedLang = localStorage.getItem("rti_lang_preference") as LanguageCode | null;
    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang);
      setIsAutoDetected(false);
      return;
    }

    // Try HTML5 Geolocation or Geocoding
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          // Lat/Long bounding boxes for major Indian cities:
          // Chennai / Tamil Nadu: ~13.08N, 80.27E
          if (lat >= 8.0 && lat <= 13.5 && lon >= 77.0 && lon <= 80.5) {
            setLanguageState("ta");
            setDetectedCity("Chennai");
            setDetectedState("Tamil Nadu");
          }
          // Bengaluru / Karnataka: ~12.97N, 77.59E
          else if (lat >= 11.5 && lat <= 18.5 && lon >= 74.0 && lon <= 78.5) {
            setLanguageState("kn");
            setDetectedCity("Bengaluru");
            setDetectedState("Karnataka");
          }
          // Mumbai / Maharashtra: ~19.07N, 72.87E
          else if (lat >= 15.5 && lat <= 22.0 && lon >= 72.5 && lon <= 80.5) {
            setLanguageState("mr");
            setDetectedCity("Mumbai");
            setDetectedState("Maharashtra");
          }
          // Hyderabad / Telangana / AP: ~17.38N, 78.48E
          else if (lat >= 13.5 && lat <= 19.5 && lon >= 77.5 && lon <= 84.5) {
            setLanguageState("te");
            setDetectedCity("Hyderabad");
            setDetectedState("Telangana");
          }
          // Kolkata / West Bengal: ~22.57N, 88.36E
          else if (lat >= 21.5 && lat <= 27.5 && lon >= 85.5 && lon <= 89.5) {
            setLanguageState("bn");
            setDetectedCity("Kolkata");
            setDetectedState("West Bengal");
          }
          // Kerala: ~8.5N - 12.8N, 75E - 77.5E
          else if (lat >= 8.3 && lat <= 12.8 && lon >= 75.0 && lon <= 77.5) {
            setLanguageState("ml");
            setDetectedCity("Kochi");
            setDetectedState("Kerala");
          }
          // Gujarat: ~20N - 24.5N, 68E - 74E
          else if (lat >= 20.0 && lat <= 24.5 && lon >= 68.0 && lon <= 74.5) {
            setLanguageState("gu");
            setDetectedCity("Ahmedabad");
            setDetectedState("Gujarat");
          }
          // Default North/Central -> Hindi
          else {
            setLanguageState("hi");
            setDetectedCity("New Delhi");
            setDetectedState("Delhi NCR");
          }
          setIsAutoDetected(true);
        },
        () => {
          // If Geolocation is blocked or unavailable, default to Bengaluru (Kannada) or Chennai (Tamil) as demonstration
          setLanguageState("kn");
          setDetectedCity("Bengaluru");
          setDetectedState("Karnataka");
          setIsAutoDetected(true);
        },
        { timeout: 3000 }
      );
    }
  }, []);

  function setLanguage(lang: LanguageCode) {
    setLanguageState(lang);
    setIsAutoDetected(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("rti_lang_preference", lang);
    }
  }

  function setCityLocation(cityName: string) {
    const matched = supportedLanguages.find((l) =>
      l.defaultCities.some((c) => c.toLowerCase() === cityName.toLowerCase())
    );
    if (matched) {
      setLanguageState(matched.code);
      setDetectedCity(cityName);
      setDetectedState(matched.state);
      setIsAutoDetected(true);
    }
  }

  function t(key: string): string {
    const dict = translations[language] || translations.en;
    return dict[key] || translations.en[key] || key;
  }

  return (
    <I18nContext.Provider
      value={{
        language,
        detectedCity,
        detectedState,
        isAutoDetected,
        setLanguage,
        setCityLocation,
        t
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}
