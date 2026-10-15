/**
 * Contri Landing Page - Interactive Engine
 * Handles the 3D phone tutorial simulator, interactive debt visualizer,
 * screenshot gallery tabs & lightbox, theme toggle, and mobile menu.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initPhoneSimulator();
  initDebtVisualizer();
  initGalleryTabs();
  initFaqAccordion();
  initDownloadSmoothScroll();
});

/* ==========================================================================
   1. Theme Toggle (Light & Dark Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  // Check user preference or system default
  const savedTheme = localStorage.getItem('contri_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const activeTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(activeTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('contri_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        // Moon icon / Sun indicator
        themeIcon.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
      } else {
        themeIcon.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
      }
    }
  }
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   3. Interactive Phone Simulator & Screen Tutorial Engine
   ========================================================================== */
function initPhoneSimulator() {
  const slides = document.querySelectorAll('.screen-slide');
  const stepBtns = document.querySelectorAll('.tour-step-btn');
  const tourPlayBtn = document.getElementById('tourPlayBtn');
  const tourCaption = document.getElementById('tourCaption');

  let currentStep = 0;
  let isPlaying = true;
  let tourInterval = null;
  const tourDelay = 4500; // 4.5 seconds per screen step

  const tourStepsData = [
    {
      title: "1. Executive Net Balance",
      caption: "Track real-time group balances ($1,727.84 receivable) and integrated cash flows at a single glance without spreadsheets."
    },
    {
      title: "2. Group Expense Feed & OCR Scan",
      caption: "Organize trips into groups with transparent expense feeds (Fuel $100, Dinner $500) and beta receipt scanning."
    },
    {
      title: "3. Direct Debt Simplification",
      caption: "Our proprietary algorithm collapses circular debts into minimal direct payments: Ramesh & Mahesh pay Rob Johnson $66.67 directly."
    },
    {
      title: "4. Single-Transfer Calculation Sheet",
      caption: "Inspect mathematical proofs showing how multi-group debts combine into a single direct payment ($66.66) to eliminate circular repayments."
    },
    {
      title: "5. Transparent Settlement History",
      caption: "Every payment is recorded and approved with timestamped receipts, achieving zero pending dues and 100% peace of mind."
    }
  ];

  function showStep(index) {
    currentStep = index;
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });

    stepBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === index);
    });

    if (tourCaption && tourStepsData[index]) {
      tourCaption.innerHTML = `<strong>${tourStepsData[index].title}:</strong> ${tourStepsData[index].caption}`;
    }

    // Trigger number counter animation on step 0
    if (index === 0) {
      animateCounter('mockNetBalance', 1727, 800);
    }
  }

  function nextStep() {
    let next = (currentStep + 1) % slides.length;
    showStep(next);
  }

  function startAutoplay() {
    isPlaying = true;
    if (tourPlayBtn) {
      tourPlayBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
      `;
      tourPlayBtn.setAttribute('title', 'Pause Tutorial');
    }
    clearInterval(tourInterval);
    tourInterval = setInterval(nextStep, tourDelay);
  }

  function pauseAutoplay() {
    isPlaying = false;
    if (tourPlayBtn) {
      tourPlayBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      `;
      tourPlayBtn.setAttribute('title', 'Resume Tutorial');
    }
    clearInterval(tourInterval);
  }

  if (tourPlayBtn) {
    tourPlayBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseAutoplay();
      } else {
        startAutoplay();
      }
    });
  }

  stepBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      pauseAutoplay();
      showStep(idx);
    });
  });

  // Interactive in-phone micro-interactions (clicking authentic buttons inside the phone)

  // 1. Add Expense CTA on Home Screen
  const phoneAddExpenseBtn = document.getElementById('mockAddExpenseBtn');
  if (phoneAddExpenseBtn) {
    phoneAddExpenseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPhoneToast('💡 Add Expense modal opened in Contri app!');
      pauseAutoplay();
      showStep(1); // switch to expenses step
    });
  }

  // 2. Join Group QR button
  const phoneJoinGroupBtn = document.getElementById('mockJoinGroupBtn');
  if (phoneJoinGroupBtn) {
    phoneJoinGroupBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPhoneToast('📷 Point camera at Group QR code to join instantly!');
    });
  }

  // 3. Flip Summary Card Click
  const mockFlipCard = document.getElementById('mockFlipCard');
  if (mockFlipCard) {
    mockFlipCard.addEventListener('click', () => {
      showPhoneToast('🔄 Net Balance: +$1,727.84 across 8 active groups');
    });
  }

  // 4. Click Travel Group item -> Opens group expenses
  const phoneTravelGroup = document.getElementById('mockTravelGroupItem');
  if (phoneTravelGroup) {
    phoneTravelGroup.addEventListener('click', () => {
      showPhoneToast('✈️ Opening Travel Group details...');
      pauseAutoplay();
      showStep(1); // switch to expenses tab
    });
  }

  // 5. Bottom Nav Groups / Center FAB
  const mockNavGroups = document.getElementById('mockNavGroups');
  if (mockNavGroups) {
    mockNavGroups.addEventListener('click', () => {
      pauseAutoplay();
      showStep(1);
    });
  }
  const mockNavCenterFab = document.getElementById('mockNavCenterFab');
  if (mockNavCenterFab) {
    mockNavCenterFab.addEventListener('click', () => {
      showPhoneToast('⚡ Quick Add Expense FAB triggered');
      pauseAutoplay();
      showStep(1);
    });
  }

  // 6. Back buttons from Group screens -> Return to Home Dashboard
  ['mockBackToHomeBtn', 'mockBackToHomeBtn2', 'mockBackToHomeBtn4'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPhoneToast('🏠 Returning to Dashboard');
        pauseAutoplay();
        showStep(0);
      });
    }
  });

  // 7. Group TabBar navigation
  const tabPayments1 = document.getElementById('mockTabPayments1');
  if (tabPayments1) {
    tabPayments1.addEventListener('click', () => {
      pauseAutoplay();
      showStep(2); // Go to payments tab
    });
  }
  const tabSettle1 = document.getElementById('mockTabSettle1');
  if (tabSettle1) {
    tabSettle1.addEventListener('click', () => {
      pauseAutoplay();
      showStep(4); // Go to settle tab
    });
  }
  const tabExpenses2 = document.getElementById('mockTabExpenses2');
  if (tabExpenses2) {
    tabExpenses2.addEventListener('click', () => {
      pauseAutoplay();
      showStep(1); // Go to expenses tab
    });
  }
  const tabSettle2 = document.getElementById('mockTabSettle2');
  if (tabSettle2) {
    tabSettle2.addEventListener('click', () => {
      pauseAutoplay();
      showStep(4); // Go to settle tab
    });
  }
  const tabExpenses4 = document.getElementById('mockTabExpenses4');
  if (tabExpenses4) {
    tabExpenses4.addEventListener('click', () => {
      pauseAutoplay();
      showStep(1); // Go to expenses tab
    });
  }
  const tabPayments4 = document.getElementById('mockTabPayments4');
  if (tabPayments4) {
    tabPayments4.addEventListener('click', () => {
      pauseAutoplay();
      showStep(2); // Go to payments tab
    });
  }

  // 8. Payment Suggestion Cards -> Opens Single-Transfer Calculation Sheet
  ['mockOpenBreakdownCard1', 'mockOpenBreakdownCard2'].forEach(id => {
    const card = document.getElementById(id);
    if (card) {
      card.addEventListener('click', () => {
        showPhoneToast('🔍 Inspecting single-transfer calculation proof...');
        pauseAutoplay();
        showStep(3); // Breakdown calculation sheet
      });
    }
  });

  // 9. Close Calculation Sheet -> Returns to Payments tab
  const mockCloseSheetBtn = document.getElementById('mockCloseSheetBtn');
  if (mockCloseSheetBtn) {
    mockCloseSheetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      pauseAutoplay();
      showStep(2);
    });
  }

  // 10. Record Payment CTA -> Confirms and shows settlement history
  const phoneRecordPaymentBtn = document.getElementById('mockRecordPaymentBtn');
  if (phoneRecordPaymentBtn) {
    phoneRecordPaymentBtn.addEventListener('click', () => {
      showPhoneToast('✅ Payment of $66.66 Recorded & Approved!');
      pauseAutoplay();
      setTimeout(() => showStep(4), 500); // transition to settlement history
    });
  }

  // Initial step setup
  showStep(0);
  startAutoplay();
}

/**
 * Toast popup inside phone mockup
 */
function showPhoneToast(message) {
  let toast = document.getElementById('phoneToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'phoneToast';
    toast.style.position = 'absolute';
    toast.style.bottom = '60px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(15, 23, 42, 0.92)';
    toast.style.color = '#ffffff';
    toast.style.padding = '8px 14px';
    toast.style.borderRadius = '9999px';
    toast.style.fontSize = '0.7rem';
    toast.style.fontWeight = '700';
    toast.style.zIndex = '30';
    toast.style.textAlign = 'center';
    toast.style.width = '88%';
    toast.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
    toast.style.transition = 'all 0.3s ease';
    toast.style.pointerEvents = 'none';
    const phoneScreen = document.querySelector('.phone-screen');
    if (phoneScreen) phoneScreen.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
  }, 2200);
}

/**
 * Number Counter Animation
 */
function animateCounter(id, target, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quart
    const ease = 1 - Math.pow(1 - progress, 4);
    const currentVal = Math.floor(start + (target - start) * ease);
    el.textContent = `$${Number(currentVal).toLocaleString('en-US')}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = `$${Number(target).toLocaleString('en-US')}`;
    }
  }

  requestAnimationFrame(update);
}

/* ==========================================================================
   4. Interactive Debt Simplification Algorithm Visualizer
   ========================================================================== */
function initDebtVisualizer() {
  const toggleRaw = document.getElementById('vizToggleRaw');
  const toggleContri = document.getElementById('vizToggleContri');
  const vizOutput = document.getElementById('vizOutput');
  const vizSavingsBadge = document.getElementById('vizSavingsBadge');

  if (!toggleRaw || !toggleContri || !vizOutput) return;

  toggleRaw.addEventListener('click', () => {
    toggleRaw.classList.add('active');
    toggleContri.classList.remove('active');
    renderDebtFlow('raw');
  });

  toggleContri.addEventListener('click', () => {
    toggleContri.classList.add('active');
    toggleRaw.classList.remove('active');
    renderDebtFlow('contri');
  });

  function renderDebtFlow(mode) {
    if (mode === 'raw') {
      vizSavingsBadge.textContent = '❌ 6 Circular Transfers (High Complexity)';
      vizSavingsBadge.style.background = 'var(--color-accent-red-bg)';
      vizSavingsBadge.style.color = 'var(--color-accent-red-text)';

      vizOutput.innerHTML = `
        <div class="flow-step-item"><span>⚠️</span> <strong>Ramesh</strong> pays <strong>Rob</strong> $66.67</div>
        <div class="flow-step-item"><span>⚠️</span> <strong>Mahesh</strong> pays <strong>Rob</strong> $66.67</div>
        <div class="flow-step-item"><span>⚠️</span> <strong>Arnold</strong> pays <strong>Ramesh</strong> $33.33</div>
        <div class="flow-step-item"><span>⚠️</span> <strong>Arnold</strong> pays <strong>Mahesh</strong> $33.33</div>
        <div class="flow-step-item"><span>⚠️</span> <strong>Abdul</strong> pays <strong>Rahul</strong> $45.00</div>
        <div class="flow-step-item"><span>⚠️</span> <strong>Rahul</strong> pays <strong>Rob</strong> $45.00</div>
      `;
    } else {
      vizSavingsBadge.textContent = '✨ 1 Simple Direct Settlement (83% Fewer Transfers)';
      vizSavingsBadge.style.background = 'var(--color-accent-green-bg)';
      vizSavingsBadge.style.color = 'var(--color-accent-green-text)';

      vizOutput.innerHTML = `
        <div class="flow-step-item" style="color: var(--color-accent-green); font-weight: 700;">
          <span>🎯</span> <strong>Arnold Lobo Premier</strong> pays <strong>Rob Johnson</strong>: <strong>$66.66</strong>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 6px;">
          Contri aggregated balances across 9 members: Rahul & Ramesh debts cancelled each other out automatically!
        </div>
      `;
    }
  }

  // Initial state is Contri optimized
  renderDebtFlow('contri');
}

/* ==========================================================================
   5. Authentic Screenshot Gallery Tabs
   ========================================================================== */
function initGalleryTabs() {
  const tabs = document.querySelectorAll('.gallery-tab-btn');
  const cards = document.querySelectorAll('.gallery-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'slideDown 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all
        faqItems.forEach(i => i.classList.remove('active'));
        // Open clicked if was not active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   7. Smooth Scroll to Download CTA for Top CTA Buttons
   ========================================================================== */
function initDownloadSmoothScroll() {
  const downloadLinks = document.querySelectorAll('a[href="#download"]');
  downloadLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('download');
      if (target) {
        // Close mobile nav drawer if open
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav) mobileNav.classList.remove('open');

        // Smooth scroll to download CTA section
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Gentle highlight pulse on the bottom Google Play button
        const bottomBtn = target.querySelector('.btn-play-store');
        if (bottomBtn) {
          setTimeout(() => {
            bottomBtn.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
            bottomBtn.style.transform = 'scale(1.05)';
            bottomBtn.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.6)';
            setTimeout(() => {
              bottomBtn.style.transform = '';
              bottomBtn.style.boxShadow = '';
            }, 600);
          }, 700);
        }
      }
    });
  });
}
