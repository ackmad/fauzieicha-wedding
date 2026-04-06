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

// Firebase imports
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

export default function Home() {
  const [currentLang, setCurrentLang] = useState<"id" | "en">("id");
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);

  // Fetch wishes from Firebase
  useEffect(() => {
    const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const wishList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamp to Date for the UI
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Wish[];
      setWishes(wishList);
    });

    return () => unsubscribe();
  }, []);

  const [isCoverRemoved, setIsCoverRemoved] = useState(false);
  const [theme, setTheme] = useState<"elegant-jungle" | "royal-java">("elegant-jungle");

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("wedding-theme");
    if (savedTheme === "royal-java" || savedTheme === "elegant-jungle") {
      setTheme(savedTheme as any);
      document.documentElement.setAttribute("data-theme", savedTheme === "royal-java" ? "royal-java" : "default");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "elegant-jungle" ? "royal-java" : "elegant-jungle";
    setTheme(newTheme);
    localStorage.setItem("wedding-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme === "royal-java" ? "royal-java" : "default");
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // --- Audio Logic ---
  const toggleMusic = (forceOn?: boolean) => {
    const shouldPlay = typeof forceOn === 'boolean' ? forceOn : !musicPlaying;
    
    if (shouldPlay) {
      if (!audioRef.current) {
        audioRef.current = new Audio("/sound/love-story.mp3");
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
    
    try {
      await addDoc(collection(db, "wishes"), {
        name,
        text,
        isAttending,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error adding wish: ", error);
      throw error; // Rethrow so component can show error toast
    }
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

      // Specific leaf parallax (retained for direct speed control)
      const leaves = document.querySelectorAll('.story-leaf-1, .gallery-leaf');
      leaves.forEach((leaf, i) => {
        const speed = 0.08 + i * 0.03;
        (leaf as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
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
      <Preloader />
      <FlowerRain />
      <LanguageToggle currentLang={currentLang} toggleLang={toggleLang} />
      
      <MusicButton 
        musicPlaying={musicPlaying} 
        toggleMusic={toggleMusic} 
        invitationOpened={invitationOpened} 
      />

      <ThemeToggle 
        theme={theme} 
        toggleTheme={toggleTheme} 
        invitationOpened={invitationOpened} 
      />

      <Cover 
        isCoverRemoved={isCoverRemoved}
        invitationOpened={invitationOpened}
        openInvitation={openInvitation}
        basics={basics}
        trans={trans}
      />

      <div id="transition-overlay" className={invitationOpened ? "flash" : ""}></div>

      <div id="main" className={invitationOpened ? "visible" : ""} style={{ display: invitationOpened ? 'block' : 'none' }} ref={mainRef}>
        <Couple basics={basics} families={families} currentLang={currentLang} trans={trans} />
        <SectionDivider type="couple-to-events" />
        <Events events={events} basics={basics} currentLang={currentLang} trans={trans} />
        <SectionDivider type="events-to-story" />
        <Story timeline={timeline} currentLang={currentLang} trans={trans} />
        <SectionDivider type="story-to-gallery" />
        <Gallery trans={trans} />
        <SectionDivider type="gallery-to-wishes" />
        <Wishes wishes={wishes} submitWish={submitWish} trans={trans} />
        <SectionDivider type="wishes-to-gift" />
        <Gift bankAccounts={bankAccounts} copyAcc={copyAcc} trans={trans} />
        <SectionDivider type="gift-to-footer" />
        <Footer basics={basics} trans={trans} />
      </div>
    </>
  );
}
