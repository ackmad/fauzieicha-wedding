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

export default function Home() {
  const [currentLang, setCurrentLang] = useState<"id" | "en">("id");
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [wishes, setWishes] = useState(() => {
    const now = Date.now();
    const mins = (m: number) => new Date(now - m * 60 * 1000);
    return [
      { name: 'Keluarga Besar', text: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.", isAttending: true, createdAt: mins(2) },
      { name: 'Sahabat Fauzie & Icha', text: 'Selamat menempuh hidup baru! Semoga selalu dalam lindungan Allah dan diberkahi kebahagiaan yang tak terkira.', isAttending: true, createdAt: mins(5) },
      { name: 'Teman Kantor Fauzie', text: 'Mabrook ya akhi! Doa terbaik untuk pernikahan yang penuh berkah. Semoga langgeng hingga Jannah.', isAttending: false, createdAt: mins(9) },
      { name: 'Budi & Susi', text: 'Selamat menempuh hidup baru, semoga menjadi keluarga yang bahagia selamanya.', isAttending: true, createdAt: mins(14) },
      { name: 'Alumni SMA 1', text: 'Happy wedding Fauzie & Icha! Lancar-lancar ya acaranya.', isAttending: true, createdAt: mins(18) },
      { name: 'Keluarga Pak RT', text: 'Selamat ya Mas Fauzie, semoga Sakinah Mawaddah Warahmah.', isAttending: true, createdAt: mins(22) },
      { name: 'Siska Amelia', text: 'Ichaaa! Selamat ya cantik, maaf banget gak bisa hadir karena lagi di luar kota. Doa terbaik buat kalian!', isAttending: false, createdAt: mins(27) },
      { name: 'Andra & Family', text: 'Congratulations on your special day! May your love grow stronger every year.', isAttending: true, createdAt: mins(31) },
      { name: 'Om & Tante dari Solo', text: 'Ndherek bingah nggih Mas Fauzie, mugi-mugi dadi keluarga sing rukun.', isAttending: true, createdAt: mins(36) },
      { name: 'Grup Mancing Mania', text: 'Selamat menempuh hidup baru bosku! Habis ini mancingnya libur dulu ya hehe.', isAttending: true, createdAt: mins(41) },
      { name: 'Dini & Rian', text: 'Happy wedding day! Wishing you a lifetime of love and happiness.', isAttending: true, createdAt: mins(45) },
      { name: 'Pak Manajer', text: 'Selamat menempuh hidup baru Fauzie, semoga sukses selalu dalam membina rumah tangga.', isAttending: true, createdAt: mins(50) },
      { name: 'Tante Mirna', text: 'Selamat ya Icha sayang, semoga bahagia terus sama suami.', isAttending: true, createdAt: mins(55) },
      { name: 'Raka (Depok)', text: 'Wih mantap Zie! Selamat ya, lancar sampai hari-H!', isAttending: true, createdAt: mins(60) },
      { name: 'Sepupu Icha', text: 'Duh adekku udah nikah aja, selamat ya Icha & Mas Fauzie!', isAttending: true, createdAt: mins(65) },
      { name: 'Bu Siti (Tetangga)', text: 'Selamat menempuh hidup baru ya mas, semoga berkah keluarga barunya.', isAttending: true, createdAt: mins(70) },
      { name: 'Devi & Suami', text: 'Happy wedding! So happy for both of you.', isAttending: true, createdAt: mins(76) },
      { name: 'Anton Wijaya', text: 'Selamat bro! Maaf berhalangan hadir sedang ada dinas. Samawa ya!', isAttending: false, createdAt: mins(82) },
      { name: 'Grup Futsal', text: 'Golll! Akhirnya sah juga Zie. Selamat menempuh hidup baru!', isAttending: true, createdAt: mins(88) },
      { name: 'Lia & Bayu', text: 'Selamat menempuh hidup baru, semoga selalu bersama sampai kakek nenek.', isAttending: true, createdAt: mins(94) },
      { name: 'Keluarga Solo', text: 'Nderek bingah nggih Mas Fauzie, mugi dadi keluarga sakinah.', isAttending: true, createdAt: mins(100) },
      { name: 'Prata & Rini', text: 'Selamat menempuh hidup baru! Lancar acaranya ya Zie & Icha.', isAttending: true, createdAt: mins(106) },
      { name: 'Alumni Kampus', text: 'Congratulation Fauzie! Semoga dilancarkan segala urusannya.', isAttending: true, createdAt: mins(112) },
      { name: 'Tetangga Depan', text: 'Selamat ya buat Icha dan suami, semoga bahagia selalu.', isAttending: true, createdAt: mins(118) },
      { name: 'Pak Bos', text: 'Selamat menikah Fauzie, semoga cepat dapat momongan yang sholeh/sholehah.', isAttending: true, createdAt: mins(124) },
      { name: 'Grup Mancing Pagi', text: 'Selamat narik joran di pelaminan bro! Mantap!', isAttending: true, createdAt: mins(130) },
      { name: 'Santi & Friends', text: 'Happy wedding! Wish you all the best!', isAttending: true, createdAt: mins(136) },
      { name: 'Paman Hasan', text: 'Barakallahu lakum, selamat ya nak.', isAttending: true, createdAt: mins(142) },
      { name: 'Risma Amelia', text: 'Aaaa selamat Icha! Maaf gak bisa datang ya lagi ada tugas.', isAttending: false, createdAt: mins(148) },
      { name: 'Benni Saputra', text: 'Selamat bro! Maaf berhalangan dapet shift siang.', isAttending: false, createdAt: mins(154) },
      { name: 'Grup Gowes', text: 'Mantap Zie! Selamat menempuh rute baru kehidupan!', isAttending: true, createdAt: mins(160) },
      { name: 'Mbak Dwi', text: 'Selamat ya dek Icha, semoga langgeng terus.', isAttending: true, createdAt: mins(166) },
      { name: 'Mas Agus', text: 'Selamat menempuh hidup baru Fauzie!', isAttending: true, createdAt: mins(172) },
      { name: 'Zian & Tia', text: 'Happy wedding! Terharu banget akhirnya kalian nikah.', isAttending: true, createdAt: mins(178) },
      { name: 'Alumni SMA Grup A', text: 'Selamat Fauzie! Sukses terus ya!', isAttending: true, createdAt: mins(184) },
      { name: 'Keluarga Bogor', text: 'Selamat menempuh hidup baru ya, semoga berkah.', isAttending: true, createdAt: mins(190) },
      { name: 'Dodo (Bandung)', text: 'Maaf Zie gak bisa dateng jauh banget, selamat ya bro!', isAttending: false, createdAt: mins(196) },
      { name: 'Rere & Partners', text: 'Selamat menempuh hidup baru, sukses selalu!', isAttending: true, createdAt: mins(202) },
    ];
  });

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
    const attendanceEl = document.getElementById('wish-attendance') as HTMLSelectElement;
    
    const name = nameEl.value.trim();
    const text = textEl.value.trim();
    const isAttending = attendanceEl.value === 'true';
    
    if (!name || !text) return;
    
    setWishes(prev => [{ name, text, isAttending, createdAt: new Date() }, ...prev]);
    // Form reset is handled in the child component Wishes.tsx handleSubmit
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
      '.reveal-item, .reveal-scale, .reveal-up, .reveal-left, .reveal-right, .reveal-zoom, .reveal-blur, .couple-gunungan-reveal, .couple-and-divider'
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
