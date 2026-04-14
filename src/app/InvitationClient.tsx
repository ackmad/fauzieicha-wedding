"use client";

import { useEffect, useState, useRef } from "react";
import weddingData from "../data.json";

// Import Components
import LanguageToggle from "../components/LanguageToggle";
import MusicButton from "../components/MusicButton";
import FlowerRain from "../components/FlowerRain";
import Cover from "../components/Cover";
import Couple from "../components/Couple";
import Events from "../components/Events";
import Gallery from "../components/Gallery";
import Story from "../components/Story";
import Wishes from "../components/Wishes";
import Gift from "../components/Gift";
import Footer from "../components/Footer";
import SectionDivider from "../components/SectionDivider";
import ThemeToggle from "../components/ThemeToggle";
import Preloader from "../components/Preloader";
import LanguageSelectorScreen from "../components/LanguageSelectorScreen";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../lib/firebase";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { Wish } from "../types";

export default function InvitationClient({ guestName }: { guestName: string }) {
  const [currentLang, setCurrentLang] = useState<"id" | "en">("id");
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [showLanguageScreen, setShowLanguageScreen] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  // Load dummy wishes on mount to avoid hydration mismatch
  useEffect(() => {
    setWishes(
      (weddingData as any).wishes.map((w: any) => ({
        ...w,
        createdAt: new Date(w.createdAt)
      }))
    );
  }, []);

  // useEffect for Firebase is now disabled for dummy mode
  /*
  useEffect(() => {
    const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => { ... });
    return () => unsubscribe();
  }, []);
  */

  const [isCoverRemoved, setIsCoverRemoved] = useState(false);

  // Set default theme to Elegant Jungle
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "default");
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // --- Audio Logic ---
  const toggleMusic = (forceOn?: boolean) => {
    const shouldPlay = typeof forceOn === 'boolean' ? forceOn : !musicPlaying;
    
    if (shouldPlay) {
      if (!audioRef.current) {
        audioRef.current = new Audio("/sound/wist-list-swifts-settled-down.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
      }
      
      audioRef.current.play().catch(e => console.error("Playback error:", e));
      setMusicPlaying(true);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setMusicPlaying(false);
    }
  };

  const openInvitation = () => {
    if (invitationOpened) return;
    setInvitationOpened(true);
    
    setTimeout(() => {
      document.body.style.overflow = '';
      setIsCoverRemoved(true); 
      toggleMusic(true);
      setTimeout(() => {
        initScrollReveal();
        initParallax();
      }, 50);
    }, 1100);
  };

  const toggleLang = () => {
    setCurrentLang(prev => prev === 'id' ? 'en' : 'id');
  };

  const submitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameEl = document.getElementById('wish-name') as HTMLInputElement;
    const textEl = document.getElementById('wish-text') as HTMLTextAreaElement;
    const attendanceEl = document.getElementById('wish-attendance') as HTMLSelectElement;
    
    const name = nameEl.value.trim();
    const text = textEl.value.trim();
    const isAttending = attendanceEl.value === 'true';
    
    if (!name || !text) return;
    
    // Using Dummy Logic instead of Firebase addDoc
    const newWish: Wish = {
      id: `w-${Date.now()}`,
      name,
      text,
      isAttending,
      createdAt: new Date()
    };
    
    setWishes(prev => [newWish, ...prev]);
    return Promise.resolve(); // Match expected return type
  };

  const copyAcc = (num: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    navigator.clipboard.writeText(num.replace(/\s/g, '')).then(() => {
      btn.classList.add('copied');
      const span = btn.querySelector('span');
      if (span) {
        const prev = span.textContent;
        span.textContent = currentLang === 'id' ? 'Tersalin ✓' : 'Copied ✓';
        setTimeout(() => {
          btn.classList.remove('copied');
          span.textContent = prev;
        }, 2200);
      }
    });
  };

  const initScrollReveal = () => {
    const revealTargets = document.querySelectorAll(
      '.reveal-item, .reveal-scale, .reveal-up, .reveal-left, .reveal-right, .reveal-zoom, .reveal-blur, .couple-gunungan-reveal, .couple-and-divider, .std-arch-card, .story-item, .gallery-item, .wishes-card'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          // Remove to allow repeat animation when scrolling back
          entry.target.classList.remove('revealed');
        }
      });
    }, { threshold: 0.15, rootMargin: '-5% 0px' });

    revealTargets.forEach(el => observer.observe(el));
  };

  const initParallax = () => {
    const handler = () => {
      const scrollY = window.scrollY;
      
      // Global parallax variable
      document.body.style.setProperty('--scroll-y', `${scrollY}`);

      // Specific leaf & floral parallax
      const parallaxItems = document.querySelectorAll('.story-leaf-1, .gallery-leaf, .parallax-floral');
      parallaxItems.forEach((item) => {
        const speedAttr = (item as HTMLElement).getAttribute('data-speed');
        const speed = speedAttr ? parseFloat(speedAttr) : 0.08;
        // For footer florals, we might want to offset based on their position
        (item as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  };

  useEffect(() => {
    if (!invitationOpened) {
      document.body.style.overflow = 'hidden';
    }
  }, [invitationOpened]);

  const trans = weddingData.translations[currentLang];
  const { basics, families, events, timeline, bankAccounts } = weddingData;

  return (
    <>
      <AnimatePresence>
        {!isPreloaderDone && (
          <Preloader onComplete={() => setIsPreloaderDone(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showLanguageScreen ? (
          <LanguageSelectorScreen key="lang-screen" onSelect={(lang) => {
            setCurrentLang(lang);
            setShowLanguageScreen(false);
          }} />
        ) : (
          <motion.div 
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="main-app-container" 
            style={{ willChange: 'opacity' }}
          >
            <LanguageToggle currentLang={currentLang} toggleLang={toggleLang} />
            
            <MusicButton 
              musicPlaying={musicPlaying} 
              toggleMusic={toggleMusic} 
              invitationOpened={invitationOpened} 
            />

            <Cover 
              isCoverRemoved={isCoverRemoved}
              invitationOpened={invitationOpened}
              openInvitation={openInvitation}
              basics={basics}
              trans={trans}
              guestName={guestName}
            />

            <div id="transition-overlay" className={invitationOpened ? "flash" : ""}></div>

            <div 
              id="main" 
              className={invitationOpened ? "visible" : ""} 
              style={{ 
                display: invitationOpened ? 'block' : 'none',
                willChange: 'transform, opacity'
              }} 
              ref={mainRef}
            >
              <Couple basics={basics} families={families} currentLang={currentLang} trans={trans} />
              <SectionDivider type="couple-to-events" />
              <Events events={events} basics={basics} currentLang={currentLang} trans={trans} />
              <SectionDivider type="events-to-story" />
              <Story timeline={timeline} currentLang={currentLang} trans={trans} />
              <SectionDivider type="story-to-gallery" />
              <Gallery trans={trans} />
              <SectionDivider type="gallery-to-gift" />
              <Gift bankAccounts={bankAccounts} copyAcc={copyAcc} trans={trans} />
              <SectionDivider type="gift-to-wishes" />
              <Wishes wishes={wishes} submitWish={submitWish} trans={trans} />
              <SectionDivider type="wishes-to-footer" />
              <Footer basics={basics} trans={trans} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
