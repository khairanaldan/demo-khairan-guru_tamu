/**
 * KHAIRAN ALDAN KURNIAWAN — PORTOFOLIO RESMI
 * SMK Telkom Lampung - Rekayasa Perangkat Lunak (RPL)
 * Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. PRELOADER SAMUDRA & PROGRESS COUNTER
  ============================================================ */
  const preloader = document.getElementById('preloader');
  const preloaderPercent = document.getElementById('preloader-percent');
  const preloaderStatus = document.getElementById('preloader-status');
  const preloaderBarFill = document.getElementById('preloader-bar-fill');

  let loadProgress = 0;
  const statusMessages = [
    'Menyelam ke Samudra Kode...',
    'Menginisialisasi Modul RPL...',
    'Memuat Desain Bioluminescent...',
    'Sinkronisasi Sistem SMK Telkom...',
    'Siap Menjelajah!'
  ];

  const preloaderInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 8) + 4;
    if (loadProgress > 100) loadProgress = 100;

    if (preloaderPercent) preloaderPercent.textContent = `${loadProgress}%`;
    if (preloaderBarFill) preloaderBarFill.style.width = `${loadProgress}%`;

    const statusIndex = Math.min(
      Math.floor((loadProgress / 100) * statusMessages.length),
      statusMessages.length - 1
    );
    if (preloaderStatus) preloaderStatus.textContent = statusMessages[statusIndex];

    if (loadProgress >= 100) {
      clearInterval(preloaderInterval);
      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('preloader-hidden');
        }
      }, 400);
    }
  }, 45);


  /* ============================================================
     2. TOP SCROLL PROGRESS BAR & STICKY HEADER
  ============================================================ */
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const mainHeader = document.getElementById('main-header');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollFactor = docHeight > 0 ? scrollTop / docHeight : 0;

    // Scroll progress bar
    if (scrollProgressBar) {
      scrollProgressBar.style.transform = `scaleX(${scrollFactor})`;
    }

    // Sticky Header Glass Background
    if (mainHeader) {
      if (scrollTop > 40) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollTop > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active Section in Navbar
    highlightActiveNav();
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ============================================================
     3. HIGHLIGHT ACTIVE NAV ITEM ON SCROLL
  ============================================================ */
  const navItems = document.querySelectorAll('.nav-links .nav-item');
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveNav() {
    let currentId = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentId}`) {
        item.classList.add('active');
      }
    });
  }


  /* ============================================================
     4. MOBILE MENU DRAWER
  ============================================================ */
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });


  /* ============================================================
     5. GENERATOR GELEMBUNG BIOLUMINESCENT (BUBBLES)
  ============================================================ */
  const bubblesContainer = document.getElementById('bubbles-container');
  if (bubblesContainer) {
    const bubbleCount = 18;
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('span');
      bubble.classList.add('bubble');

      const size = Math.random() * 12 + 6;
      const left = Math.random() * 98;
      const duration = Math.random() * 14 + 10;
      const delay = Math.random() * 12;

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.animationDuration = `${duration}s`;
      bubble.style.animationDelay = `${delay}s`;

      bubblesContainer.appendChild(bubble);
    }
  }


  /* ============================================================
     6. TYPEWRITER EFFECT PADA SUBTITLE HERO
  ============================================================ */
  const typingTarget = document.getElementById('typing-text');
  const roles = [
    'Web Developer',
    'Siswa RPL SMK Telkom',
    'Front-End Specialist',
    'UI/UX Enthusiast',
    'Creative Problem Solver'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    if (!typingTarget) return;

    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingTarget.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 45;
    } else {
      typingTarget.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typeSpeed = 2200; // Jeda saat teks selesai diketik
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();


  /* ============================================================
     7. 3D PERSPECTIVE TILT PADA KARTU PROFIL
  ============================================================ */
  const tiltCard = document.getElementById('interactive-tilt-card');
  const tiltWrapper = document.querySelector('.profile-card-3d-wrapper');

  if (tiltCard && tiltWrapper) {
    tiltWrapper.addEventListener('mousemove', (e) => {
      const rect = tiltWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    tiltWrapper.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }


  /* ============================================================
     8. LO-FI CODING STATION (WEB AUDIO API SYNTHESIZER)
  ============================================================ */
  const lofiPlayerCard = document.querySelector('.lofi-player-card');
  const lofiPlayBtn = document.getElementById('lofi-play-btn');
  const lofiPrevBtn = document.getElementById('lofi-prev-btn');
  const lofiNextBtn = document.getElementById('lofi-next-btn');
  const lofiPlayIcon = document.getElementById('lofi-play-icon');
  const lofiSongTitle = document.getElementById('lofi-song-title');
  const lofiSongSub = document.getElementById('lofi-song-sub');
  const lofiTrackCounter = document.getElementById('lofi-track-counter');
  const lofiProgressBar = document.getElementById('lofi-progress-bar');
  const lofiCurrentTime = document.getElementById('lofi-current-time');
  const lofiTotalTime = document.getElementById('lofi-total-time');
  const lofiStatusLabel = document.getElementById('lofi-status-label');
  const lofiProgressContainer = document.getElementById('lofi-progress-container');

  const tracks = [
    {
      title: 'Chill Waves & RPL Beats',
      artist: 'Bioluminescent Lo-Fi • Khairan Aldan',
      duration: 150, // detik
      frequencies: [220, 277.18, 329.63, 440] // A major / C# / E chord
    },
    {
      title: 'Midnight Coding at SMK Telkom',
      artist: 'Deep Sea Synths • Khairan Aldan',
      duration: 165,
      frequencies: [196, 246.94, 293.66, 392] // G major / B / D chord
    },
    {
      title: 'Algorithmic Ocean Flow',
      artist: 'Lofi Ambient • Telkom Lampung',
      duration: 180,
      frequencies: [174.61, 220, 261.63, 349.23] // F major chord
    }
  ];

  let currentTrackIdx = 0;
  let isPlaying = false;
  let currentTime = 0;
  let audioTimer = null;
  let audioCtx = null;
  let synthGain = null;
  let activeOscillators = [];

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
  }

  function startSynthSound(frequencies) {
    initAudioContext();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    stopSynthSound();

    synthGain = audioCtx.createGain();
    synthGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    synthGain.gain.exponentialRampToValueAtTime(0.07, audioCtx.currentTime + 1.2);

    // Warm Low-pass filter for cozy lofi tape warmth
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, audioCtx.currentTime);

    // Subtle LFO modulation for tape wobble
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.setValueAtTime(0.3, audioCtx.currentTime);
    lfoGain.gain.setValueAtTime(15, audioCtx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    activeOscillators.push(lfo);

    frequencies.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // subtle detune
      osc.detune.setValueAtTime((idx - 1.5) * 6, audioCtx.currentTime);

      osc.connect(filter);
      osc.start();
      activeOscillators.push(osc);
    });

    filter.connect(synthGain);
    synthGain.connect(audioCtx.destination);
  }

  function stopSynthSound() {
    if (synthGain && audioCtx) {
      try {
        synthGain.gain.setValueAtTime(synthGain.gain.value, audioCtx.currentTime);
        synthGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
      } catch (err) {}
    }
    setTimeout(() => {
      activeOscillators.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
      activeOscillators = [];
    }, 450);
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updateTrackDisplay() {
    const track = tracks[currentTrackIdx];
    if (lofiSongTitle) lofiSongTitle.textContent = track.title;
    if (lofiSongSub) lofiSongSub.textContent = track.artist;
    if (lofiTrackCounter) lofiTrackCounter.textContent = `TRACK ${currentTrackIdx + 1}/${tracks.length}`;
    if (lofiTotalTime) lofiTotalTime.textContent = formatTime(track.duration);
    if (lofiCurrentTime) lofiCurrentTime.textContent = formatTime(currentTime);
    if (lofiProgressBar) {
      const pct = (currentTime / track.duration) * 100;
      lofiProgressBar.style.width = `${pct}%`;
    }
  }

  function togglePlay() {
    isPlaying = !isPlaying;

    if (isPlaying) {
      if (lofiPlayerCard) lofiPlayerCard.classList.add('playing');
      if (lofiPlayIcon) {
        lofiPlayIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
      }
      if (lofiStatusLabel) lofiStatusLabel.textContent = '▶ Sedang Memutar Musik Lo-Fi';

      startSynthSound(tracks[currentTrackIdx].frequencies);

      clearInterval(audioTimer);
      audioTimer = setInterval(() => {
        currentTime++;
        if (currentTime >= tracks[currentTrackIdx].duration) {
          nextTrack();
        } else {
          updateTrackDisplay();
        }
      }, 1000);

      showCyberToast('🎵 Lo-Fi Coding Station aktif — selamat menikmati!');
    } else {
      pauseAudio();
    }
  }

  function pauseAudio() {
    isPlaying = false;
    if (lofiPlayerCard) lofiPlayerCard.classList.remove('playing');
    if (lofiPlayIcon) {
      lofiPlayIcon.innerHTML = '<polygon points="6 3 20 12 6 21 6 3"></polygon>';
    }
    if (lofiStatusLabel) lofiStatusLabel.textContent = '⏸ Musik Dijeda';
    clearInterval(audioTimer);
    stopSynthSound();
  }

  function nextTrack() {
    currentTrackIdx = (currentTrackIdx + 1) % tracks.length;
    currentTime = 0;
    updateTrackDisplay();
    if (isPlaying) {
      startSynthSound(tracks[currentTrackIdx].frequencies);
    }
  }

  function prevTrack() {
    currentTrackIdx = (currentTrackIdx - 1 + tracks.length) % tracks.length;
    currentTime = 0;
    updateTrackDisplay();
    if (isPlaying) {
      startSynthSound(tracks[currentTrackIdx].frequencies);
    }
  }

  if (lofiPlayBtn) lofiPlayBtn.addEventListener('click', togglePlay);
  if (lofiNextBtn) lofiNextBtn.addEventListener('click', nextTrack);
  if (lofiPrevBtn) lofiPrevBtn.addEventListener('click', prevTrack);

  if (lofiProgressContainer) {
    lofiProgressContainer.addEventListener('click', (e) => {
      const rect = lofiProgressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      currentTime = Math.floor(ratio * tracks[currentTrackIdx].duration);
      updateTrackDisplay();
    });
  }

  updateTrackDisplay();


  /* ============================================================
     9. FILTER TAB KEAHLIAN (SKILLS)
  ============================================================ */
  const skillFilterBtns = document.querySelectorAll('#skills-filter-group .filter-btn');
  const skillCards = document.querySelectorAll('#skills-grid .skill-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterValue === 'all' || cat === filterValue) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });


  /* ============================================================
     10. FILTER TAB PORTOFOLIO PROYEK
  ============================================================ */
  const projectFilterBtns = document.querySelectorAll('#projects-filter-group .filter-btn');
  const projectCards = document.querySelectorAll('#projects-list .project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-proj-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-proj-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; }, 30);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });


  /* ============================================================
     11. MODAL DETAIL PROYEK
  ============================================================ */
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-proj-img');
  const modalBadge = document.getElementById('modal-proj-badge');
  const modalCat = document.getElementById('modal-proj-cat');
  const modalTitle = document.getElementById('modal-proj-title');
  const modalDesc = document.getElementById('modal-proj-desc');
  const modalFeaturesList = document.getElementById('modal-features-list');
  const modalTechTags = document.getElementById('modal-tech-tags');
  const openModalBtns = document.querySelectorAll('.btn-open-modal');

  const projectData = {
    epresensi: {
      title: 'E-Presensi & Portal Akademik SMK Telkom Lampung',
      category: 'Sistem Manajemen Sekolah',
      badge: '⭐ Proyek Unggulan RPL',
      image: 'assets/project-epresensi.jpg',
      desc: 'Aplikasi web enterprise berskala sekolah untuk pengelolaan presensi digital siswa SMK Telkom Lampung berbasis kode QR. Menggantikan proses manual dengan otomatisasi rekapitulasi data kehadiran harian, grafik statistik absensi berkala, modul pengajuan izin sakit/dispen, dan akses portal multi-role (Siswa, Wali Kelas, Guru BK, dan Admin Sekolah).',
      features: [
        'Pemindaian QR Code unik per siswa untuk absensi datang & pulang',
        'Dashboard metrik kehadiran mingguan dan persentase absensi real-time',
        'Fitur upload bukti surat izin sakit/kegiatan lomba secara daring',
        'Ekspor laporan presensi otomatis dalam format Excel dan PDF',
        'Keamanan autentikasi kata sandi terenkripsi & sesi aman'
      ],
      tech: ['HTML5', 'CSS3 Modern', 'JavaScript ES6+', 'PHP OOP', 'MySQL Database', 'Chart.js', 'QR Scanner API']
    },
    tourism: {
      title: 'Telkom Tourism — Pesona Bahari Lampung',
      category: 'Portal Wisata & Pemandu Interaktif',
      badge: '🌴 Bahari & Budaya',
      image: 'assets/project-tourism.jpg',
      desc: 'Web portal promosi pariwisata bahari dan geospasial Lampung yang mengangkat destinasi ikonik seperti Pantai Gigi Hiu, Teluk Kiluan (Dolphin Tour), dan Pulau Pahawang. Dibangun dengan estetika samudra bioluminescent glassmorphism, peta lokasi interaktif, dan estimasi biaya liburan yang akurat.',
      features: [
        'Katalog destinasi wisata bahari dengan deskripsi detail dan galeri foto',
        'Peta rute interaktif dengan koordinat lokasi dan estimasi jarak tempuh',
        'Kalkulator estimasi biaya liburan (transportasi, penginapan, sewa perahu)',
        'Informasi cuaca dan rekomendasi waktu terbaik berkunjung',
        'Desain super adaptif yang cepat diakses dari ponsel para wisatawan'
      ],
      tech: ['HTML5 Semantik', 'Vanilla CSS', 'JavaScript', 'Leaflet.js Map', 'Bioluminescent UI', 'Responsive Design']
    },
    technostore: {
      title: 'TechnoStore RPL — Katalog Perangkat IT',
      category: 'E-Commerce & IT Catalog',
      badge: '🛒 E-Commerce & Kasir',
      image: 'assets/project-technostore.jpg',
      desc: 'Platform etalase digital interaktif yang dirancang untuk memamerkan dan menjual produk IT, perlengkapan komputer, serta software karya siswa RPL SMK Telkom Lampung. Menyediakan keranjang belanja dinamis, filter spesifikasi produk, dan direct-checkout otomatis via WhatsApp.',
      features: [
        'Katalog produk IT dengan filter kategori (Monitor, Aksesoris, RAM, Headset)',
        'Keranjang belanja interaktif (tambah, kurang, hitung subtotal otomatis)',
        'Sistem checkout pesan instan terformat rapi ke WhatsApp admin toko',
        'Penyimpanan status keranjang belanja menggunakan Web LocalStorage',
        'Panel ringkas visualisasi statistik penjualan mingguan'
      ],
      tech: ['JavaScript ES6+', 'CSS Flexbox & Grid', 'PHP Backend', 'MySQL', 'LocalStorage API', 'WhatsApp API']
    },
    smartlibrary: {
      title: 'Smart Library — Perpustakaan Digital SMK Telkom',
      category: 'Sistem Informasi Perpustakaan',
      badge: '📚 Literasi & Manajemen',
      image: 'assets/project-smartlibrary.jpg',
      desc: 'Sistem otomasi manajemen perpustakaan modern untuk memfasilitasi budaya literasi dan peminjaman buku siswa SMK Telkom Lampung. Memiliki pencarian cepat berbasis judul/penulis/ISBN, sistem barcode peminjaman, serta penghitungan denda keterlambatan secara otomatis.',
      features: [
        'Katalog buku daring dengan status ketersediaan di rak secara realtime',
        'Pencarian instan (instant search) berbasis filter kategori & penulis',
        'Pelacakan riwayat peminjaman buku dan batas waktu pengembalian',
        'Sistem barcode scanner untuk identifikasi kartu anggota siswa',
        'Laporan rekapitulasi buku paling sering dipinjam'
      ],
      tech: ['HTML5', 'Bootstrap 5', 'PHP', 'MySQL Database', 'JavaScript', 'Barcode Scanner API']
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project-id');
      const data = projectData[projId];
      if (!data) return;

      if (modalImg) modalImg.src = data.image;
      if (modalBadge) modalBadge.textContent = data.badge;
      if (modalCat) modalCat.textContent = data.category;
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalDesc) modalDesc.textContent = data.desc;

      if (modalFeaturesList) {
        modalFeaturesList.innerHTML = '';
        data.features.forEach(feat => {
          const li = document.createElement('li');
          li.textContent = feat;
          modalFeaturesList.appendChild(li);
        });
      }

      if (modalTechTags) {
        modalTechTags.innerHTML = '';
        data.tech.forEach(tag => {
          const span = document.createElement('span');
          span.className = 'tech-tag';
          span.textContent = tag;
          modalTechTags.appendChild(span);
        });
      }

      if (projectModal) {
        projectModal.classList.add('open');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('open');
      projectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }


  /* ============================================================
     12. FAQ ACCORDION INTERACTIVITY
  ============================================================ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherTrigger = other.querySelector('.faq-trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });


  /* ============================================================
     13. SALIN ALAMAT EMAIL KE CLIPBOARD & CYBER TOAST
  ============================================================ */
  const copyEmailBtn = document.getElementById('btn-copy-email');
  const emailText = document.getElementById('email-address-text');
  const copyBtnText = document.getElementById('copy-btn-text');

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailText.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        if (copyBtnText) copyBtnText.textContent = 'Tersalin!';
        showCyberToast(`Email ${email} berhasil disalin ke clipboard!`);

        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = 'Salin';
        }, 2500);
      }).catch(() => {
        showCyberToast(`Email: ${email}`);
      });
    });
  }

  function showCyberToast(msg) {
    const toast = document.getElementById('cyber-toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }


  /* ============================================================
     14. FORMULIR KONTAK INTERAKTIF
  ============================================================ */
  const contactForm = document.getElementById('contact-form');
  const contactSubmitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value;
      const email = document.getElementById('contact-email')?.value;
      const subject = document.getElementById('contact-subject')?.value;
      const message = document.getElementById('contact-message')?.value;

      if (!name || !email || !message) {
        showCyberToast('Mohon lengkapi seluruh formulir sebelum mengirim.');
        return;
      }

      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.innerHTML = '<span>Mengirimkan Pesan...</span>';
      }

      setTimeout(() => {
        contactForm.reset();
        if (contactSubmitBtn) {
          contactSubmitBtn.disabled = false;
          contactSubmitBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            <span>Kirim Sekarang</span>
          `;
        }
        showCyberToast(`Terima kasih ${name}! Pesan Anda telah diterima oleh Khairan.`);
      }, 1200);
    });
  }


  /* ============================================================
     15. PLAYABLE MINI GAME: CYBER BUG HUNTER (CANVAS)
  ============================================================ */
  const startMinigameBtn = document.getElementById('start-minigame-btn');
  const minigameModal = document.getElementById('minigame-modal');
  const minigameCloseBtn = document.getElementById('minigame-close-btn');
  const gameCanvas = document.getElementById('game-canvas');
  const gameScoreEl = document.getElementById('game-score');
  const gameLivesEl = document.getElementById('game-lives');
  const gameHighscoreEl = document.getElementById('game-highscore');
  const gameOverlay = document.getElementById('game-overlay');
  const gameOverlayTitle = document.getElementById('game-overlay-title');
  const gameOverlaySub = document.getElementById('game-overlay-sub');
  const gameStartBtn = document.getElementById('game-start-btn');

  let ctx = null;
  if (gameCanvas) {
    ctx = gameCanvas.getContext('2d');
  }

  let gameRunning = false;
  let score = 0;
  let lives = 3;
  let highscore = parseInt(localStorage.getItem('kak_highscore') || '0', 10);
  if (gameHighscoreEl) gameHighscoreEl.textContent = highscore;

  // Player properties
  const player = {
    x: 300,
    y: 200,
    size: 16,
    speed: 5,
    dx: 0,
    dy: 0,
    color: '#00f0ff'
  };

  let bugs = [];
  let orbs = [];
  let animFrameId = null;
  let spawnTimer = 0;

  function resetGame() {
    score = 0;
    lives = 3;
    player.x = gameCanvas.width / 2;
    player.y = gameCanvas.height / 2;
    player.dx = 0;
    player.dy = 0;
    bugs = [];
    orbs = [];
    if (gameScoreEl) gameScoreEl.textContent = score;
    updateLivesDisplay();
  }

  function updateLivesDisplay() {
    if (gameLivesEl) {
      gameLivesEl.textContent = '❤️'.repeat(Math.max(0, lives));
    }
  }

  function spawnBug() {
    const side = Math.floor(Math.random() * 4);
    let x, y;
    if (side === 0) { x = Math.random() * gameCanvas.width; y = -20; }
    else if (side === 1) { x = gameCanvas.width + 20; y = Math.random() * gameCanvas.height; }
    else if (side === 2) { x = Math.random() * gameCanvas.width; y = gameCanvas.height + 20; }
    else { x = -20; y = Math.random() * gameCanvas.height; }

    const angle = Math.atan2(player.y - y, player.x - x);
    const speed = Math.random() * 1.5 + 1.2;

    bugs.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 12,
      color: '#f87171'
    });
  }

  function spawnOrb() {
    orbs.push({
      x: Math.random() * (gameCanvas.width - 60) + 30,
      y: Math.random() * (gameCanvas.height - 60) + 30,
      size: 10,
      color: '#00ffcc',
      pulse: 0
    });
  }

  function gameLoop() {
    if (!gameRunning) return;

    // Clear background
    ctx.fillStyle = '#020710';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    // Draw Grid Lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < gameCanvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, gameCanvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < gameCanvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(gameCanvas.width, y);
      ctx.stroke();
    }

    // Move Player
    player.x += player.dx;
    player.y += player.dy;

    // Boundaries
    if (player.x < player.size) player.x = player.size;
    if (player.x > gameCanvas.width - player.size) player.x = gameCanvas.width - player.size;
    if (player.y < player.size) player.y = player.size;
    if (player.y > gameCanvas.height - player.size) player.y = gameCanvas.height - player.size;

    // Draw Player Drone
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00f0ff';
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fill();

    // Player Eye
    ctx.fillStyle = '#041220';
    ctx.beginPath();
    ctx.arc(player.x, player.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Spawning items
    spawnTimer++;
    if (spawnTimer % 65 === 0) spawnBug();
    if (spawnTimer % 90 === 0 && orbs.length < 5) spawnOrb();

    // Draw & Handle Orbs
    for (let i = orbs.length - 1; i >= 0; i--) {
      const orb = orbs[i];
      orb.pulse += 0.08;

      ctx.shadowBlur = 12;
      ctx.shadowColor = '#00ffcc';
      ctx.fillStyle = orb.color;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.size + Math.sin(orb.pulse) * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Collision with player
      const dist = Math.hypot(player.x - orb.x, player.y - orb.y);
      if (dist < player.size + orb.size) {
        score += 10;
        if (gameScoreEl) gameScoreEl.textContent = score;
        if (score > highscore) {
          highscore = score;
          localStorage.setItem('kak_highscore', highscore);
          if (gameHighscoreEl) gameHighscoreEl.textContent = highscore;
        }
        orbs.splice(i, 1);
      }
    }

    // Draw & Handle Bugs
    for (let i = bugs.length - 1; i >= 0; i--) {
      const bug = bugs[i];
      bug.x += bug.vx;
      bug.y += bug.vy;

      ctx.shadowBlur = 12;
      ctx.shadowColor = '#ef4444';
      ctx.fillStyle = bug.color;
      ctx.beginPath();
      ctx.arc(bug.x, bug.y, bug.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Bug Collision with Player
      const dist = Math.hypot(player.x - bug.x, player.y - bug.y);
      if (dist < player.size + bug.size) {
        lives--;
        updateLivesDisplay();
        bugs.splice(i, 1);

        if (lives <= 0) {
          endGame();
          return;
        }
      }
    }

    animFrameId = requestAnimationFrame(gameLoop);
  }

  function startGame() {
    resetGame();
    gameRunning = true;
    if (gameOverlay) gameOverlay.classList.add('hidden');
    animFrameId = requestAnimationFrame(gameLoop);
  }

  function endGame() {
    gameRunning = false;
    cancelAnimationFrame(animFrameId);
    if (gameOverlay) {
      gameOverlay.classList.remove('hidden');
      if (gameOverlayTitle) gameOverlayTitle.textContent = 'GAME OVER!';
      if (gameOverlaySub) {
        gameOverlaySub.textContent = `Skor Akhir Anda: ${score} poin. Kerja bagus, terus asah insting koding Anda!`;
      }
      if (gameStartBtn) gameStartBtn.textContent = 'MAIN LAGI';
    }
  }

  // Keyboard controls
  window.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    if (['ArrowUp', 'KeyW'].includes(e.code)) { player.dy = -player.speed; e.preventDefault(); }
    if (['ArrowDown', 'KeyS'].includes(e.code)) { player.dy = player.speed; e.preventDefault(); }
    if (['ArrowLeft', 'KeyA'].includes(e.code)) { player.dx = -player.speed; e.preventDefault(); }
    if (['ArrowRight', 'KeyD'].includes(e.code)) { player.dx = player.speed; e.preventDefault(); }
  });

  window.addEventListener('keyup', (e) => {
    if (['ArrowUp', 'KeyW', 'ArrowDown', 'KeyS'].includes(e.code)) player.dy = 0;
    if (['ArrowLeft', 'KeyA', 'ArrowRight', 'KeyD'].includes(e.code)) player.dx = 0;
  });

  // Touch controls for mobile on canvas
  if (gameCanvas) {
    gameCanvas.addEventListener('touchmove', (e) => {
      if (!gameRunning) return;
      const rect = gameCanvas.getBoundingClientRect();
      const touch = e.touches[0];
      const scaleX = gameCanvas.width / rect.width;
      const scaleY = gameCanvas.height / rect.height;

      player.x = (touch.clientX - rect.left) * scaleX;
      player.y = (touch.clientY - rect.top) * scaleY;
      e.preventDefault();
    }, { passive: false });
  }

  function openMinigame() {
    if (minigameModal) {
      minigameModal.classList.add('open');
      minigameModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      resetGame();
      if (gameOverlay) {
        gameOverlay.classList.remove('hidden');
        if (gameOverlayTitle) gameOverlayTitle.textContent = 'CYBER BUG HUNTER';
        if (gameOverlaySub) gameOverlaySub.textContent = 'Kendalikan drone diver, kumpulkan energi cyan, dan hindari serbuan bug!';
        if (gameStartBtn) gameStartBtn.textContent = 'MULAI MAIN';
      }
    }
  }

  function closeMinigame() {
    if (minigameModal) {
      minigameModal.classList.remove('open');
      minigameModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      gameRunning = false;
      cancelAnimationFrame(animFrameId);
    }
  }

  if (startMinigameBtn) startMinigameBtn.addEventListener('click', openMinigame);
  if (minigameCloseBtn) minigameCloseBtn.addEventListener('click', closeMinigame);
  if (gameStartBtn) gameStartBtn.addEventListener('click', startGame);
  if (minigameModal) {
    minigameModal.addEventListener('click', (e) => {
      if (e.target === minigameModal) closeMinigame();
    });
  }

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeMinigame();
      closeDrawer();
    }
  });

});
