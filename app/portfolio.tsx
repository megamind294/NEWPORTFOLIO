"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import * as THREE from "three";

type Lang = "en" | "pl" | "hi";
type ProjectId = "carbon" | "security" | "maps";

const copy = {
  en: {
    nav: { work: "Selected work", story: "About", cv: "Download CV" },
    eyebrow: "Frontend engineer · Kraków, Poland",
    titleA: "I turn product complexity into",
    titleB: "interfaces people trust.",
    intro:
      "Software engineer with 3+ years building scalable web applications with React, TypeScript, Node.js, Express, and MongoDB—now pursuing a Master’s in Artificial Intelligence in Poland.",
    status: "Available in Poland · Full-time, B2B, and internships",
    cv: "Download CV",
    explore: "Explore selected work",
    sceneEyebrow: "Interactive architecture",
    sceneTitle: "A frontend is a living system.",
    sceneBody: "Move through the layers—or hover the 3D nodes—to see how I connect interface, state, and services.",
    layers: ["Interface", "State", "Services"],
    skills: { Interface: "React", State: "TypeScript + Redux", Services: "REST APIs" },
    workEyebrow: "Selected work",
    workTitle: "Products built around real decisions.",
    workBody: "Three real product builds spanning emissions analytics, privacy-first local AI, and interactive geospatial comparison.",
    inspect: "Inspect architecture",
    close: "Close details",
    projects: {
      carbon: {
        number: "01",
        title: "Carbon Warrior",
        type: "Carbon footprint monitoring platform",
        image: "/projects/carbon-warrior-dashboard.webp",
        alt: "Dark carbon monitoring dashboard with emissions charts, energy inputs, transport metrics, and CO2 analytics",
        summary: "Tracks and visualizes emissions from weekly or monthly energy use, transportation, and owned vehicles—including LPG, grid electricity, diesel generators, and heating oil.",
        outcome: "Built day, week, month, and year admin analytics with CO₂e filters; optimized chart rendering and data aggregation by approximately 40%.",
        flow: ["Log inputs", "Aggregate CO₂e", "Explore trends"],
        tech: ["React", "TypeScript", "Node.js", "MongoDB", "Chart.js"],
      },
      security: {
        number: "02",
        title: "Local AI Web Security Assistant",
        type: "Privacy-first RAG + local LLM",
        image: "/projects/local-ai-security-workspace.webp",
        alt: "Privacy-first local AI security workspace with an OWASP knowledge library, grounded chat, and source pipeline",
        summary: "A local AI assistant that answers web-security questions using Retrieval-Augmented Generation and an OWASP-focused knowledge base.",
        outcome: "Grounded answers in curated security material while keeping sensitive prompts local, with a Flask backend and focused responsive workspace.",
        flow: ["Index OWASP", "Retrieve context", "Answer locally"],
        tech: ["Python", "LangChain", "FAISS", "Flask", "Local LLMs"],
      },
      maps: {
        number: "03",
        title: "Azure Maps Swipe",
        type: "Interactive geospatial comparison",
        image: "/projects/azure-maps-swipe.webp",
        alt: "Midnight map interface comparing two geospatial layers with a draggable vertical swipe control",
        summary: "An interactive map experience for comparing two geographic views through a draggable swipe, synchronized zoom, and location-aware controls.",
        outcome: "Combined map layers, zoom behavior, and location features into a fluid comparison workflow optimized for performance and direct manipulation.",
        flow: ["Load layers", "Synchronize views", "Swipe to compare"],
        tech: ["React", "TypeScript", "Azure Maps API", "Geospatial UI"],
      },
    },
    aboutEyebrow: "Engineering with context",
    aboutTitle: "I build the bridge between product intent and production code.",
    aboutBody:
      "I have delivered enterprise frontend work for Bridgestone, built reusable components and custom hooks that reduced development time by about 30%, and mentored junior developers and interns. My current Master’s work extends that product background into AI, data analytics, RAG, and cloud technologies.",
    stats: [
      ["3+", "years of software engineering"],
      ["30%", "faster module development"],
      ["40%", "faster chart data handling"],
    ],
    pathTitle: "Experience & education",
    path: [
      ["Senior Software Engineer", "Ahaan Web Consulting · Jun 2023 — Feb 2025"],
      ["Associate App Developer", "Celebal Technologies · Jun 2022 — May 2023"],
      ["MSc Artificial Intelligence", "WSB University · Oct 2025 — Present"],
      ["BTech Computer Science", "Poornima College of Engineering · 2018 — 2022 · CGPA 7.9/10"],
    ],
    skillsTitle: "Technical toolkit",
    skillGroups: [
      ["Frontend", "React 18 · TypeScript 5 · JavaScript ES6+ · HTML5 · CSS3/SCSS · Tailwind · Bootstrap 5 · Material UI · Chakra UI"],
      ["Application", "Redux Toolkit · Context API · React Router · Axios · React Query · React Hook Form · React Dropzone · ApexCharts"],
      ["Backend & cloud", "Node.js · Express · REST APIs · JWT · MongoDB · Mongoose · MySQL · Azure Web App/DevOps/Maps · AWS VPC/EC2"],
      ["Tools & teamwork", "Git/GitHub/GitLab · Docker · Postman · Figma · Jira · Confluence · Agile/Scrum · Mentorship · English · Polish"],
    ],
    certificationsTitle: "Certifications",
    certifications: ["AWS Cloud Practitioner — in progress", "Microsoft Azure Fundamentals (AZ-900)", "Docker Essential Training", "React — The Complete Guide"],
    closing: "Have a frontend problem worth solving?",
    closingBody: "I’m in Kraków and available to work in Poland on full-time, B2B, or internship opportunities. Email me or open the complete résumé for every detail.",
    email: "Email me",
    linkedin: "LinkedIn",
    github: "View GitHub",
    footer: "Designed and engineered by Rinkle Sharma.",
  },
  pl: {
    nav: { work: "Wybrane projekty", story: "O mnie", cv: "Pobierz CV" },
    eyebrow: "Frontend engineer · Kraków, Polska",
    titleA: "Zmieniam złożoność produktu w",
    titleB: "interfejsy, którym ludzie ufają.",
    intro:
      "Software engineer z ponad 3-letnim doświadczeniem w tworzeniu skalowalnych aplikacji w React, TypeScript, Node.js, Express i MongoDB, obecnie na studiach magisterskich z AI w Polsce.",
    status: "Dostępny w Polsce · pełny etat, B2B i staże",
    cv: "Pobierz CV",
    explore: "Zobacz wybrane projekty",
    sceneEyebrow: "Interaktywna architektura",
    sceneTitle: "Frontend to żywy system.",
    sceneBody: "Przejdź przez warstwy lub najedź na węzły 3D, aby zobaczyć, jak łączę interfejs, stan i usługi.",
    layers: ["Interfejs", "Stan", "Usługi"],
    skills: { Interfejs: "React", Stan: "TypeScript + Redux", Usługi: "REST API" },
    workEyebrow: "Wybrane projekty",
    workTitle: "Produkty zbudowane wokół realnych decyzji.",
    workBody: "Trzy rzeczywiste produkty: analityka emisji, prywatne lokalne AI i interaktywne porównanie geoprzestrzenne.",
    inspect: "Zobacz architekturę",
    close: "Zamknij szczegóły",
    projects: {
      carbon: {
        number: "01",
        title: "Carbon Warrior",
        type: "Platforma monitorowania śladu węglowego",
        image: "/projects/carbon-warrior-dashboard.webp",
        alt: "Ciemny panel monitorowania emisji z wykresami, danymi energii, transportu i analityką CO2",
        summary: "Monitoruje emisje z tygodniowego lub miesięcznego zużycia energii, transportu i pojazdów, w tym LPG, energii sieciowej, generatorów i oleju opałowego.",
        outcome: "Analityka dzienna, tygodniowa, miesięczna i roczna z filtrami CO₂e; optymalizacja wykresów i agregacji danych o około 40%.",
        flow: ["Wprowadź dane", "Oblicz CO₂e", "Analizuj trendy"],
        tech: ["React", "TypeScript", "Node.js", "MongoDB", "Chart.js"],
      },
      security: {
        number: "02",
        title: "Lokalny asystent AI bezpieczeństwa WWW",
        type: "Prywatny RAG + lokalny LLM",
        image: "/projects/local-ai-security-workspace.webp",
        alt: "Prywatne lokalne środowisko AI z biblioteką OWASP, czatem opartym na źródłach i procesem wyszukiwania",
        summary: "Lokalny asystent odpowiadający na pytania o bezpieczeństwo aplikacji webowych z użyciem RAG i bazy wiedzy OWASP.",
        outcome: "Odpowiedzi oparte na wybranych materiałach bezpieczeństwa, lokalne przetwarzanie poufnych zapytań i responsywny interfejs z backendem Flask.",
        flow: ["Indeksuj OWASP", "Pobierz kontekst", "Odpowiedz lokalnie"],
        tech: ["Python", "LangChain", "FAISS", "Flask", "Lokalne LLM"],
      },
      maps: {
        number: "03",
        title: "Azure Maps Swipe",
        type: "Interaktywne porównanie geoprzestrzenne",
        image: "/projects/azure-maps-swipe.webp",
        alt: "Interfejs mapy nocnej porównujący dwie warstwy za pomocą przesuwanego pionowego suwaka",
        summary: "Interaktywna mapa do porównywania dwóch widoków poprzez przesuwany suwak, zsynchronizowany zoom i kontrolki lokalizacji.",
        outcome: "Połączenie warstw, zoomu i funkcji lokalizacyjnych w płynnym, wydajnym przepływie bezpośredniego porównania.",
        flow: ["Wczytaj warstwy", "Synchronizuj", "Przesuń i porównaj"],
        tech: ["React", "TypeScript", "Azure Maps API", "Geospatial UI"],
      },
    },
    aboutEyebrow: "Inżynieria w kontekście",
    aboutTitle: "Łączę intencję produktu z kodem produkcyjnym.",
    aboutBody:
      "Realizowałem frontend enterprise dla Bridgestone, tworzyłem komponenty i własne hooki skracające czas rozwoju modułów o około 30% oraz mentorowałem młodszych programistów i stażystów. Studia magisterskie rozszerzają to doświadczenie o AI, analizę danych, RAG i chmurę.",
    stats: [
      ["3+", "lata inżynierii oprogramowania"],
      ["30%", "szybszy rozwój modułów"],
      ["40%", "szybsza obsługa danych wykresów"],
    ],
    pathTitle: "Doświadczenie i edukacja",
    path: [
      ["Senior Software Engineer", "Ahaan Web Consulting · cze 2023 — lut 2025"],
      ["Associate App Developer", "Celebal Technologies · cze 2022 — maj 2023"],
      ["MSc Artificial Intelligence", "WSB University · paź 2025 — obecnie"],
      ["BTech Computer Science", "Poornima College of Engineering · 2018 — 2022 · CGPA 7,9/10"],
    ],
    skillsTitle: "Technologie",
    skillGroups: [
      ["Frontend", "React 18 · TypeScript 5 · JavaScript ES6+ · HTML5 · CSS3/SCSS · Tailwind · Bootstrap 5 · Material UI · Chakra UI"],
      ["Aplikacja", "Redux Toolkit · Context API · React Router · Axios · React Query · React Hook Form · React Dropzone · ApexCharts"],
      ["Backend i chmura", "Node.js · Express · REST API · JWT · MongoDB · Mongoose · MySQL · Azure Web App/DevOps/Maps · AWS VPC/EC2"],
      ["Narzędzia i współpraca", "Git/GitHub/GitLab · Docker · Postman · Figma · Jira · Confluence · Agile/Scrum · Mentoring · angielski · polski"],
    ],
    certificationsTitle: "Certyfikaty",
    certifications: ["AWS Cloud Practitioner — w trakcie", "Microsoft Azure Fundamentals (AZ-900)", "Docker Essential Training", "React — The Complete Guide"],
    closing: "Masz problem frontendowy wart rozwiązania?",
    closingBody: "Mieszkam w Krakowie i jestem dostępny w Polsce na pełny etat, B2B lub staż. Napisz do mnie albo pobierz pełne CV.",
    email: "Napisz e-mail",
    linkedin: "LinkedIn",
    github: "Zobacz GitHub",
    footer: "Projekt i wykonanie: Rinkle Sharma.",
  },
  hi: {
    nav: { work: "चुने हुए प्रोजेक्ट", story: "मेरे बारे में", cv: "CV डाउनलोड करें" },
    eyebrow: "फ्रंटएंड इंजीनियर · क्राकूव, पोलैंड",
    titleA: "मैं प्रोडक्ट की जटिलता को बदलता हूँ",
    titleB: "ऐसे इंटरफेस में जिन पर लोग भरोसा करें।",
    intro:
      "3+ वर्षों के अनुभव वाला सॉफ्टवेयर इंजीनियर—React, TypeScript, Node.js, Express और MongoDB से स्केलेबल वेब ऐप बनाता हूँ और पोलैंड में AI में मास्टर्स कर रहा हूँ।",
    status: "पोलैंड में उपलब्ध · फुल-टाइम, B2B और इंटर्नशिप",
    cv: "CV डाउनलोड करें",
    explore: "चुना हुआ काम देखें",
    sceneEyebrow: "इंटरैक्टिव आर्किटेक्चर",
    sceneTitle: "फ्रंटएंड एक जीवंत सिस्टम है।",
    sceneBody: "लेयर्स चुनें या 3D नोड्स पर होवर करें और देखें कि मैं इंटरफेस, स्टेट और सर्विसेज को कैसे जोड़ता हूँ।",
    layers: ["इंटरफेस", "स्टेट", "सर्विसेज"],
    skills: { इंटरफेस: "React", स्टेट: "TypeScript + Redux", सर्विसेज: "REST APIs" },
    workEyebrow: "चुना हुआ काम",
    workTitle: "असल फैसलों के लिए बनाए गए प्रोडक्ट।",
    workBody: "तीन वास्तविक प्रोडक्ट—एमिशन एनालिटिक्स, प्राइवेसी-फर्स्ट लोकल AI और इंटरैक्टिव जियोस्पेशल तुलना।",
    inspect: "आर्किटेक्चर देखें",
    close: "विवरण बंद करें",
    projects: {
      carbon: {
        number: "01",
        title: "Carbon Warrior",
        type: "कार्बन फुटप्रिंट मॉनिटरिंग प्लेटफॉर्म",
        image: "/projects/carbon-warrior-dashboard.webp",
        alt: "एमिशन चार्ट, ऊर्जा इनपुट, ट्रांसपोर्ट मेट्रिक्स और CO2 एनालिटिक्स वाला डार्क कार्बन डैशबोर्ड",
        summary: "LPG, ग्रिड बिजली, डीजल जनरेटर, हीटिंग ऑयल, ट्रांसपोर्ट और वाहनों के साप्ताहिक या मासिक उत्सर्जन को ट्रैक और विज़ुअलाइज़ करता है।",
        outcome: "दिन, सप्ताह, माह और वर्ष की CO₂e एनालिटिक्स बनाई और चार्ट व डेटा एग्रीगेशन के प्रदर्शन में लगभग 40% सुधार किया।",
        flow: ["इनपुट दर्ज करें", "CO₂e जोड़ें", "ट्रेंड देखें"],
        tech: ["React", "TypeScript", "Node.js", "MongoDB", "Chart.js"],
      },
      security: {
        number: "02",
        title: "Local AI Web Security Assistant",
        type: "प्राइवेसी-फर्स्ट RAG + लोकल LLM",
        image: "/projects/local-ai-security-workspace.webp",
        alt: "OWASP लाइब्रेरी, सोर्स-ग्राउंडेड चैट और रिट्रीवल पाइपलाइन वाला प्राइवेसी-फर्स्ट लोकल AI सुरक्षा वर्कस्पेस",
        summary: "RAG और OWASP नॉलेज बेस का उपयोग करके वेब सुरक्षा प्रश्नों का उत्तर देने वाला लोकल AI सहायक।",
        outcome: "संवेदनशील प्रश्नों को डिवाइस पर रखते हुए चुनी हुई सुरक्षा सामग्री पर आधारित उत्तर, Flask बैकएंड और केंद्रित रिस्पॉन्सिव इंटरफेस।",
        flow: ["OWASP इंडेक्स", "कॉन्टेक्स्ट खोजें", "लोकल उत्तर"],
        tech: ["Python", "LangChain", "FAISS", "Flask", "Local LLMs"],
      },
      maps: {
        number: "03",
        title: "Azure Maps Swipe",
        type: "इंटरैक्टिव जियोस्पेशल तुलना",
        image: "/projects/azure-maps-swipe.webp",
        alt: "ड्रैग करने योग्य वर्टिकल स्वाइप से दो जियोस्पेशल लेयर्स की तुलना करता मिडनाइट मैप इंटरफेस",
        summary: "ड्रैग करने योग्य स्वाइप, सिंक्रोनाइज़्ड ज़ूम और लोकेशन कंट्रोल से दो मैप व्यू की तुलना करने वाला इंटरैक्टिव अनुभव।",
        outcome: "मैप लेयर्स, ज़ूम और लोकेशन फीचर्स को एक तेज़ और सीधे नियंत्रित होने वाले तुलना वर्कफ्लो में जोड़ा।",
        flow: ["लेयर्स लोड", "व्यू सिंक", "स्वाइप तुलना"],
        tech: ["React", "TypeScript", "Azure Maps API", "Geospatial UI"],
      },
    },
    aboutEyebrow: "संदर्भ के साथ इंजीनियरिंग",
    aboutTitle: "मैं प्रोडक्ट की सोच और प्रोडक्शन कोड के बीच पुल बनाता हूँ।",
    aboutBody:
      "मैंने Bridgestone के लिए एंटरप्राइज फ्रंटएंड डिलीवर किया, री-यूजेबल कंपोनेंट और कस्टम hooks से मॉड्यूल डेवलपमेंट समय लगभग 30% घटाया और जूनियर डेवलपर्स व इंटर्न्स को मेंटर किया। मेरी मास्टर्स पढ़ाई इस अनुभव को AI, डेटा एनालिटिक्स, RAG और क्लाउड तक बढ़ाती है।",
    stats: [
      ["3+", "वर्ष सॉफ्टवेयर इंजीनियरिंग"],
      ["30%", "तेज़ मॉड्यूल डेवलपमेंट"],
      ["40%", "तेज़ चार्ट डेटा हैंडलिंग"],
    ],
    pathTitle: "अनुभव और शिक्षा",
    path: [
      ["Senior Software Engineer", "Ahaan Web Consulting · जून 2023 — फरवरी 2025"],
      ["Associate App Developer", "Celebal Technologies · जून 2022 — मई 2023"],
      ["MSc Artificial Intelligence", "WSB University · अक्टूबर 2025 — वर्तमान"],
      ["BTech Computer Science", "Poornima College of Engineering · 2018 — 2022 · CGPA 7.9/10"],
    ],
    skillsTitle: "तकनीकी टूलकिट",
    skillGroups: [
      ["Frontend", "React 18 · TypeScript 5 · JavaScript ES6+ · HTML5 · CSS3/SCSS · Tailwind · Bootstrap 5 · Material UI · Chakra UI"],
      ["Application", "Redux Toolkit · Context API · React Router · Axios · React Query · React Hook Form · React Dropzone · ApexCharts"],
      ["Backend और cloud", "Node.js · Express · REST APIs · JWT · MongoDB · Mongoose · MySQL · Azure Web App/DevOps/Maps · AWS VPC/EC2"],
      ["Tools और teamwork", "Git/GitHub/GitLab · Docker · Postman · Figma · Jira · Confluence · Agile/Scrum · Mentorship · English · Polish"],
    ],
    certificationsTitle: "प्रमाणपत्र",
    certifications: ["AWS Cloud Practitioner — जारी", "Microsoft Azure Fundamentals (AZ-900)", "Docker Essential Training", "React — The Complete Guide"],
    closing: "कोई फ्रंटएंड समस्या है जिसे हल करना चाहिए?",
    closingBody: "मैं क्राकूव में हूँ और पोलैंड में फुल-टाइम, B2B या इंटर्नशिप अवसरों के लिए उपलब्ध हूँ। ईमेल करें या पूरी जानकारी के लिए CV खोलें।",
    email: "ईमेल करें",
    linkedin: "LinkedIn",
    github: "GitHub देखें",
    footer: "Rinkle Sharma द्वारा डिजाइन और इंजीनियर किया गया।",
  },
} as const;

const projectIds: ProjectId[] = ["carbon", "security", "maps"];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 3v9m0 0 4-4m-4 4L6 8M4 16h12" />
    </svg>
  );
}

function TechScene({ activeIndex, onActive }: { activeIndex: number; onActive: (index: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ activeIndex, onActive });

  useEffect(() => {
    stateRef.current = { activeIndex, onActive };
  }, [activeIndex, onActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.15, 7.2);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const root = new THREE.Group();
    scene.add(root);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.28, 2),
      new THREE.MeshPhysicalMaterial({
        color: 0x092535,
        emissive: 0x05222c,
        metalness: 0.45,
        roughness: 0.28,
        transparent: true,
        opacity: 0.88,
        wireframe: false,
      }),
    );
    root.add(core);
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.3, 1)),
      new THREE.LineBasicMaterial({ color: 0x59f2ff, transparent: true, opacity: 0.38 }),
    );
    root.add(edges);

    const colors = [0x6ef7d8, 0x8d7dff, 0xffbe67];
    const nodes: THREE.Mesh[] = [];
    const rings: THREE.Mesh[] = [];
    [1.9, 2.35, 2.8].forEach((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, index === 1 ? 0.012 : 0.009, 8, 160),
        new THREE.MeshBasicMaterial({ color: colors[index], transparent: true, opacity: 0.3 }),
      );
      ring.rotation.x = 1.05 + index * 0.23;
      ring.rotation.y = 0.2 + index * 0.45;
      root.add(ring);
      rings.push(ring);

      const node = new THREE.Mesh(
        new THREE.SphereGeometry(index === 1 ? 0.24 : 0.19, 30, 30),
        new THREE.MeshStandardMaterial({ color: colors[index], emissive: colors[index], emissiveIntensity: 1.3, roughness: 0.18 }),
      );
      node.userData.index = index;
      root.add(node);
      nodes.push(node);
    });

    const ambient = new THREE.AmbientLight(0xb9f6ff, 1.2);
    const key = new THREE.PointLight(0x6ef7d8, 18, 14);
    key.position.set(4, 4, 4);
    const fill = new THREE.PointLight(0x8d7dff, 12, 12);
    fill.position.set(-4, -2, 3);
    scene.add(ambient, key, fill);

    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let targetX = 0;
    let targetY = 0;
    let raf = 0;
    let start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetX = pointer.y * 0.22;
      targetY = pointer.x * 0.35;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(nodes)[0];
      canvas.style.cursor = hit ? "pointer" : "grab";
      if (hit) stateRef.current.onActive(hit.object.userData.index as number);
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
      canvas.style.cursor = "grab";
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", handlePointer);
    canvas.addEventListener("pointerleave", handleLeave);
    resize();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = (now: number) => {
      const t = (now - start) / 1000;
      root.rotation.x += (targetX - root.rotation.x) * 0.045;
      root.rotation.y += (targetY - root.rotation.y) * 0.045;
      if (!reduceMotion) {
        core.rotation.y = t * 0.12;
        edges.rotation.y = -t * 0.09;
      }
      rings.forEach((ring, index) => {
        if (!reduceMotion) ring.rotation.z = t * (index % 2 ? -0.1 : 0.08) + index;
        const angle = t * (0.36 - index * 0.06) + index * 2.15;
        const radius = [1.9, 2.35, 2.8][index];
        const vertical = Math.sin(angle * 1.25 + index) * (0.62 + index * 0.08);
        nodes[index].position.set(Math.cos(angle) * radius, vertical, Math.sin(angle) * 0.42);
        const selected = stateRef.current.activeIndex === index;
        const scale = selected ? 1.42 : 1;
        nodes[index].scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
        const material = nodes[index].material as THREE.MeshStandardMaterial;
        material.emissiveIntensity += ((selected ? 3 : 1.2) - material.emissiveIntensity) * 0.09;
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener("pointermove", handlePointer);
      canvas.removeEventListener("pointerleave", handleLeave);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="tech-canvas" aria-hidden="true" />;
}

function ProjectCard({
  project,
  expanded,
  inspect,
  close,
  onToggle,
}: {
  project: (typeof copy)[Lang]["projects"][ProjectId];
  expanded: boolean;
  inspect: string;
  close: string;
  onToggle: () => void;
}) {
  const cardRef = useRef<HTMLElement>(null);

  const handleMove = (event: ReactPointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--rx", `${-y * 4}deg`);
    card.style.setProperty("--ry", `${x * 6}deg`);
    card.style.setProperty("--spot-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--spot-y", `${(y + 0.5) * 100}%`);
  };

  const reset = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <article ref={cardRef} className={`project-card ${expanded ? "is-expanded" : ""}`} onPointerMove={handleMove} onPointerLeave={reset}>
      <div className="project-card__glow" />
      <div className="project-card__top">
        <span className="project-number">{project.number}</span>
        <span className="project-type">{project.type}</span>
      </div>
      <div className="project-visual">
        <img src={project.image} alt={project.alt} loading="lazy" />
        <span className="project-visual__scan" aria-hidden="true" />
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="tech-list" aria-label="Technologies">
        {project.tech.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <button className="inspect-button" onClick={onToggle} aria-expanded={expanded}>
        {expanded ? close : inspect}
        <ArrowIcon />
      </button>
      <div className="project-details" aria-hidden={!expanded}>
        <p>{project.outcome}</p>
        <div className="architecture-flow">
          {project.flow.map((step, index) => (
            <div className="flow-step" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeLayer, setActiveLayer] = useState(0);
  const [expandedProject, setExpandedProject] = useState<ProjectId | null>("carbon");
  const t = copy[lang];
  const skillEntries = useMemo(() => Object.entries(t.skills), [t.skills]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="monogram" href="#top" aria-label="Rinkle Sharma home">
          RS<span>.</span>
        </a>
        <div className="nav-links">
          <a href="#work">{t.nav.work}</a>
          <a href="#about">{t.nav.story}</a>
        </div>
        <div className="nav-actions">
          <div className="language-switcher" aria-label="Language">
            {(["en", "pl", "hi"] as Lang[]).map((item) => (
              <button key={item} className={lang === item ? "active" : ""} onClick={() => setLang(item)} aria-pressed={lang === item}>
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="nav-cv" href="/Rinkle_Sharma_Resume.pdf" download>
            {t.nav.cv}
          </a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span />{t.eyebrow}</p>
          <h1>
            {t.titleA} <em>{t.titleB}</em>
          </h1>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="/Rinkle_Sharma_Resume.pdf" download>
              <DownloadIcon />
              {t.cv}
            </a>
            <a className="button button-ghost" href="#work">
              {t.explore}
              <ArrowIcon />
            </a>
          </div>
          <p className="availability"><span />{t.status}</p>
        </div>

        <div className="scene-card">
          <TechScene activeIndex={activeLayer} onActive={setActiveLayer} />
          <div className="scene-copy">
            <p className="section-kicker">{t.sceneEyebrow}</p>
            <h2>{t.sceneTitle}</h2>
            <p>{t.sceneBody}</p>
          </div>
          <div className="layer-controls">
            {t.layers.map((layer, index) => (
              <button key={layer} className={activeLayer === index ? "active" : ""} onClick={() => setActiveLayer(index)}>
                <span>0{index + 1}</span>
                <strong>{layer}</strong>
                <small>{skillEntries[index]?.[1]}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="work-section shell" id="work">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{t.workEyebrow}</p>
            <h2>{t.workTitle}</h2>
          </div>
          <p>{t.workBody}</p>
        </div>
        <div className="project-grid">
          {projectIds.map((id) => (
            <ProjectCard
              key={id}
              project={t.projects[id]}
              expanded={expandedProject === id}
              inspect={t.inspect}
              close={t.close}
              onToggle={() => setExpandedProject((current) => (current === id ? null : id))}
            />
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="shell about-grid">
          <div className="about-copy">
            <p className="section-kicker">{t.aboutEyebrow}</p>
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutBody}</p>
            <div className="stats">
              {t.stats.map(([value, label]) => (
                <div key={value}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="experience-panel">
            <p className="section-kicker">{t.pathTitle}</p>
            <div className="timeline">
              {t.path.map(([role, org], index) => (
                <div className="timeline-item" key={role}>
                  <span>0{index + 1}</span>
                  <div>
                    <strong>{role}</strong>
                    <p>{org}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="certifications">
              <p className="section-kicker">{t.certificationsTitle}</p>
              <div>
                {t.certifications.map((certification) => (
                  <span key={certification}>{certification}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="shell skills-panel">
          <p className="section-kicker">{t.skillsTitle}</p>
          <div className="skill-groups">
            {t.skillGroups.map(([group, items]) => (
              <article key={group}>
                <h3>{group}</h3>
                <p>{items}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="shell closing-card">
          <div>
            <h2>{t.closing}</h2>
            <p>{t.closingBody}</p>
            <div className="contact-line">
              <a href="mailto:sirrinkle@gmail.com">sirrinkle@gmail.com</a>
              <a href="tel:+48503828223">+48 503 828 223</a>
              <span>Kraków, Poland</span>
            </div>
          </div>
          <div className="closing-actions">
            <a className="button button-primary" href="/Rinkle_Sharma_Resume.pdf" download>
              <DownloadIcon />
              {t.cv}
            </a>
            <a className="button button-ghost" href="mailto:sirrinkle@gmail.com">
              {t.email}
              <ArrowIcon />
            </a>
            <a className="button button-ghost" href="https://www.linkedin.com/in/rinkle-sharma-508b48169" target="_blank" rel="noreferrer">
              {t.linkedin}
              <ArrowIcon />
            </a>
            <a className="button button-ghost" href="https://github.com/megamind294" target="_blank" rel="noreferrer">
              {t.github}
              <ArrowIcon />
            </a>
          </div>
        </div>

        <footer className="shell footer">
          <span className="monogram">RS<span>.</span></span>
          <p>{t.footer}</p>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </section>
    </main>
  );
}
