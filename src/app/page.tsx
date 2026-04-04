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
import Story from "../components/Story";
import Wishes from "../components/Wishes";
import Gift from "../components/Gift";
import Footer from "../components/Footer";

export default function Home() {
  const [currentLang, setCurrentLang] = useState<"id" | "en">("id");
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [wishes, setWishes] = useState([
    { name: 'Keluarga Besar', text: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah." },
    { name: 'Sahabat Fauzie & Icha', text: 'Selamat menempuh hidup baru! Semoga selalu dalam lindungan Allah dan diberkahi kebahagiaan yang tak terkira.' },
    { name: 'Teman Kantor Fauzie', text: 'Mabrook ya akhi! Doa terbaik untuk pernikahan yang penuh berkah. Semoga langgeng hingga Jannah.' }
  ]);

  const [isCoverRemoved, setIsCoverRemoved] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeOscNodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);
  const mainRef = useRef<HTMLDivElement>(null);

  // --- Audio Logic ---
  const toggleMusic = (forceOn?: boolean) => {
    const shouldPlay = typeof forceOn === 'boolean' ? forceOn : !musicPlaying;
    
    if (shouldPlay) {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();

      const notes = [
        { freq: 261.63, delay: 0,   dur: 8, gain: 0.035 },
        { freq: 329.63, delay: 1.5, dur: 8, gain: 0.028 },
        { freq: 392.00, delay: 3,   dur: 8, gain: 0.022 },
        { freq: 523.25, delay: 4.5, dur: 8, gain: 0.018 },
        { freq: 220.00, delay: 0,   dur: 16, gain: 0.02  },
      ];

      activeOscNodesRef.current = [];
      notes.forEach(n => {
        if (!audioCtxRef.current) return;
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        const filter = audioCtxRef.current.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.value = 1200;
        filter.Q.value = 0.5;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtxRef.current.destination);

        osc.type = 'sine';
        osc.frequency.value = n.freq;
        gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime + n.delay);
        gain.gain.linearRampToValueAtTime(n.gain, audioCtxRef.current.currentTime + n.delay + 2);
        osc.start(audioCtxRef.current.currentTime + n.delay);
        activeOscNodesRef.current.push({ osc, gain });
      });
      setMusicPlaying(true);
    } else {
      activeOscNodesRef.current.forEach(({ osc, gain }) => {
        if (!audioCtxRef.current) return;
        gain.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1);
        osc.stop(audioCtxRef.current.currentTime + 1.2);
      });
      activeOscNodesRef.current = [];
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

  const submitWish = (e: React.FormEvent) => {
    e.preventDefault();
    const nameEl = document.getElementById('wish-name') as HTMLInputElement;
    const textEl = document.getElementById('wish-text') as HTMLTextAreaElement;
    const name = nameEl.value.trim();
    const text = textEl.value.trim();
    
    if (!name || !text) {
      const form = document.getElementById('wish-form');
      if (form) {
        form.style.animation = 'none';
        void (form as HTMLElement).offsetWidth;
        form.style.animation = 'shake 0.5s ease';
      }
      return;
    }
    
    setWishes(prev => [{ name, text }, ...prev]);
    nameEl.value = '';
    textEl.value = '';
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
      '.reveal-item, .reveal-scale, .reveal-item-side-left, .reveal-item-side-right, .couple-gunungan-reveal, .couple-and-divider'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '10% 0px' });

    revealTargets.forEach(el => observer.observe(el));
  };

  const initParallax = () => {
    const handler = () => {
      const scrollY = window.scrollY;
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
      <FlowerRain />
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
      />

      <div id="transition-overlay" className={invitationOpened ? "flash" : ""}></div>

      <div id="main" className={invitationOpened ? "visible" : ""} style={{ display: invitationOpened ? 'block' : 'none' }} ref={mainRef}>
        <Couple basics={basics} families={families} currentLang={currentLang} trans={trans} />
        <Events events={events} basics={basics} currentLang={currentLang} trans={trans} />
        <Story timeline={timeline} currentLang={currentLang} trans={trans} />
        <Wishes wishes={wishes} submitWish={submitWish} trans={trans} />
        <Gift bankAccounts={bankAccounts} copyAcc={copyAcc} trans={trans} />
        <Footer basics={basics} trans={trans} />
      </div>
    </>
  );
}
