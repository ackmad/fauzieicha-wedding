"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import weddingData from "../data.json";

// ── Static imports: only components visible above the fold on open ──
import LanguageToggle from "../components/LanguageToggle";
import MusicButton from "../components/MusicButton";
import Cover from "../components/Cover";
import { motion, AnimatePresence } from "framer-motion";
import { Wish } from "../types";

// ── Preloader: static import (shown immediately) ──
import Preloader from "../components/Preloader";

// ── Dynamic imports: everything below the fold ──
// These are code-split and only downloaded after the invitation is opened
const Couple               = dynamic(() => import("../components/Couple"),               { ssr: false });
const Events               = dynamic(() => import("../components/Events"),               { ssr: false });
const Gallery              = dynamic(() => import("../components/Gallery"),              { ssr: false });
const Story                = dynamic(() => import("../components/Story"),                { ssr: false });
const Wishes               = dynamic(() => import("../components/Wishes"),               { ssr: false });
const Gift                 = dynamic(() => import("../components/Gift"),                 { ssr: false });
const Footer               = dynamic(() => import("../components/Footer"),               { ssr: false });
const SectionDivider       = dynamic(() => import("../components/SectionDivider"),       { ssr: false });
const LanguageSelectorScreen = dynamic(() => import("../components/LanguageSelectorScreen"), { ssr: false });
const FlowerRain           = dynamic(() => import("../components/FlowerRain"),           { ssr: false });

import { db } from "../lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

export default function InvitationClient({ guestName }: { guestName: string }) {
  const [currentLang, setCurrentLang] = useState<"id" | "en">("id");
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [showLanguageScreen, setShowLanguageScreen] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isCoverRemoved, setIsCoverRemoved] = useState(false);

  // Load wishes from Firebase (real-time)
  useEffect(() => {
    const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const firestoreWishes: Wish[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        text: doc.data().text,
        isAttending: doc.data().isAttending,
        createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : new Date(),
      }));
      setWishes(firestoreWishes);
    }, (error) => {
      console.error("Firebase wishes error:", error);
      setWishes(
        (weddingData as any).wishes.map((w: any) => ({
          ...w,
          createdAt: new Date(w.createdAt)
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  // Set default theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "default");
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  // Store observer ref so we can disconnect on unmount
  const scrollObserverRef = useRef<IntersectionObserver | null>(null);

  // --- Audio Logic ---
  const toggleMusic = useCallback((forceOn?: boolean) => {
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
      audioRef.current?.pause();
      setMusicPlaying(false);
    }
  }, [musicPlaying]);

  const openInvitation = useCallback(() => {
    if (invitationOpened) return;
    setInvitationOpened(true);

    setTimeout(() => {
      document.body.style.overflow = '';
      setIsCoverRemoved(true);
      toggleMusic(true);
      // Initialize reveals after DOM is rendered
      setTimeout(() => {
        initScrollReveal();
        initParallax();
      }, 100);
    }, 1100);
  }, [invitationOpened, toggleMusic]);

  const toggleLang = useCallback(() => {
    setCurrentLang(prev => prev === 'id' ? 'en' : 'id');
  }, []);

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
        name, text, isAttending,
        createdAt: serverTimestamp(),
      });
      nameEl.value = '';
      textEl.value = '';
      attendanceEl.value = 'true';
    } catch (error) {
      console.error("Error submitting wish:", error);
      const newWish: Wish = {
        id: `w-${Date.now()}`,
        name, text, isAttending,
        createdAt: new Date()
      };
      setWishes(prev => [newWish, ...prev]);
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

  // ── Optimized Scroll Reveal ──────────────────────────────────────
  // Uses a single shared observer, lower threshold for earlier triggers,
  // and only re-adds class without re-triggering for already-revealed elements
  const initScrollReveal = useCallback(() => {
    // Disconnect any previous observer
    scrollObserverRef.current?.disconnect();

    const SELECTORS = [
      '.reveal-item', '.reveal-scale', '.reveal-up',
      '.reveal-left', '.reveal-right', '.reveal-zoom', '.reveal-blur',
      '.couple-gunungan-reveal', '.couple-and-divider',
      '.std-arch-card', '.story-item', '.gallery-item', '.wishes-card'
    ].join(', ');

    const revealTargets = document.querySelectorAll(SELECTORS);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          // Only remove if not permanently revealed (once: false behaviour)
          entry.target.classList.remove('revealed');
        }
      });
    }, {
      threshold: 0.1,          // Trigger earlier (was 0.15)
      rootMargin: '0px 0px -5% 0px'  // Reveal slightly before fully in view
    });

    revealTargets.forEach(el => observer.observe(el));
    scrollObserverRef.current = observer;
  }, []);

  // ── Optimized Parallax ──────────────────────────────────────────
  // Only runs on non-mobile, uses rAF for smooth 60fps, and
  // avoids setting transforms on elements inside sections with contain:layout
  const initParallax = useCallback(() => {
    // Disable parallax on mobile — handled by CSS instead
    if (window.matchMedia('(max-width: 768px)').matches) return;

    let rafId: number;
    let lastScrollY = window.scrollY;

    const handler = () => {
      const scrollY = window.scrollY;
      if (Math.abs(scrollY - lastScrollY) < 1) return; // Skip tiny movements
      lastScrollY = scrollY;

      // Cancel previous frame before scheduling next
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        document.body.style.setProperty('--scroll-y', `${scrollY}`);

        const parallaxItems = document.querySelectorAll('.story-leaf-1, .gallery-leaf, .parallax-floral');
        parallaxItems.forEach((item) => {
          const speedAttr = (item as HTMLElement).getAttribute('data-speed');
          const speed = speedAttr ? parseFloat(speedAttr) : 0.06;
          (item as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
        });
      });
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => scrollObserverRef.current?.disconnect();
  }, []);

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
            transition={{ duration: 1.2, ease: "easeInOut" }}
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

            {/* Main content — only rendered after invitation is opened */}
            {invitationOpened && (
              <div
                id="main"
                className="visible"
                style={{ willChange: 'opacity' }}
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
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
