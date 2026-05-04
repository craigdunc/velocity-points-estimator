import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import {
  WTEs,
  flightsList,
  hotelsList,
  activitiesList,
  marketplaceList,
  giftCardsList,
  entertainmentList,
  SC_VALUES,
} from '../data';
import wteSubItems from '../wteSubItems.json';
import VelocityHeader from '../components/VelocityHeader';
import SiteFooter from '../components/SiteFooter';
import FlightSearch from '../components/FlightSearch';
import VelocityPointsPanel from '../components/VelocityPointsPanel';
import ForYouPanel from '../components/ForYouPanel';
import YourTrips from '../components/YourTrips';
import UsingYourPoints from '../components/UsingYourPoints';
import WhatsNews from '../components/WhatsNews';
import ConnectedRewardCard from '../components/ConnectedRewardCard';
import TierCard from '../components/TierCard';
import LionSprite from '../components/LionSprite';
import OnboardingStepper from '../components/OnboardingStepper';
import MonthWrapUpModal from '../components/MonthWrapUpModal';
import ArrowUpImage from '../assets/images/arrow-up.svg';
import LionImg from '../assets/images/VelocityLion.png';
import PanelBgd from '../assets/images/panel-bgd.svg';

import imgRede from '../assets/images/rede.jpg';
import imgCarpetCourt from '../assets/images/carpetcourt.jpg';
import imgSingapore from '../assets/images/singapore.jpg';
import imgQtGoldcoast from '../assets/images/qt-goldcoast.jpg';
import imgFlightMelbourne from '../assets/images/flight-melbourne.jpg';
import logoRede from '../assets/logos/rede.png';
import logoCarpetCourt from '../assets/logos/carpetcourt.png';
import logoEDR from '../assets/logos/EDR.svg';
import imgChoose from '../assets/images/choose.png';
import imgAdd from '../assets/images/add.png';
import imgSetup from '../assets/images/Setup.png';
import logoUpgrade from '../assets/logos/upgrade.svg';
import logoPoints from '../assets/logos/points.svg';
import iconClassicReward from '../assets/icons/classic reward.svg';
import iconLounge from '../assets/icons/lounge.svg';
import iconBoardingPass from '../assets/icons/boarding pass.svg';

import iconHotelBed from '../assets/icons/hotel-bed.svg';
import iconHoliday from '../assets/icons/holiday.svg';
import iconPlaneProtection from '../assets/icons/plane protection.svg';
import iconCreditCards from '../assets/icons/credit cards.svg';
import iconGift from '../assets/icons/gift.svg';
import iconHouseWithDollar from '../assets/icons/runway_icon_detailed_house_with_dollar.svg';
import iconCar from '../assets/icons/car.svg';

import iconArrowRight from '../assets/icons/arrow-right.svg';
import iconCalendar from '../assets/icons/calendar.svg';
import iconWheelsDown from '../assets/icons/wheels-down.svg';
import iconWheelsUp from '../assets/icons/wheels-up.svg';
import iconAdult from '../assets/icons/adult.svg';
import iconFlightCredit from '../assets/icons/Flight-credit.svg';
import iconMap from '../assets/icons/Map.svg';
import iconMultiCity from '../assets/icons/multi-city.svg';
import iconAward from '../assets/icons/award.svg';

const exploreItems = [
  { name: 'Hotels', icon: iconHotelBed },
  { name: 'Holidays', icon: iconHoliday },
  { name: 'Travel Insurance', icon: iconPlaneProtection },
  { name: 'Credit Cards', icon: iconCreditCards },
  { name: 'Marketplace', icon: iconGift },
  { name: 'Home Loans', icon: iconHouseWithDollar },
  { name: 'Car Hire', icon: iconCar },
  { name: 'All products', isAll: true }
];

const CairnsThumb = "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=400";
const MelbourneThumb = "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&q=80&w=600";
const HotelThumb = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400";
const ExperienceThumb = "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=400";

import HTMLTypewriter from '../components/HTMLTypewriter';
import HelpMeModal from '../components/HelpMeModal';

const playSparkleSound = (type) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'shoot') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      let t = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(1200, t + 0.8);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.1, t + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.8);

      osc.start(t);
      osc.stop(t + 0.8);
    } else if (type === 'scatter') {
      const freqs = [1200, 1600, 2400, 3200];
      let t = ctx.currentTime;
      freqs.forEach((freq, i) => {
        let osc = ctx.createOscillator();
        let gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + i * 0.05);
        gain.gain.setValueAtTime(0, t + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.05, t + i * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.05 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + i * 0.05);
        osc.stop(t + i * 0.05 + 0.3);
      });
    }
  } catch { /* ignore */ }
};

/* Confetti burst — colorful pieces that fly outward from circle center */
const ConfettiBurst = React.memo(() => {
  const pieces = useMemo(() => {
    const colors = ['#D7F1F0', '#E40000', '#C3A56E', '#BFF4F2', '#D7F1F0', '#E40000'];
    return [...Array(12)].map((_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const dist = 46 + Math.random() * 22;
      const size = 3 + Math.random() * 3;
      return { angle, dist, size, color: colors[i % colors.length], delay: i * 25 };
    });
  }, []);

  return pieces.map((p, i) => (
    <div
      key={i}
      className="absolute left-1/2 top-1/2 rounded-full z-20 pointer-events-none"
      style={{
        width: p.size,
        height: p.size,
        backgroundColor: p.color,
        animation: `confetti-burst 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay}ms forwards`,
        '--cx': `${Math.cos(p.angle) * p.dist}px`,
        '--cy': `${Math.sin(p.angle) * p.dist}px`,
      }}
    />
  ));
});

/* Points count-up — renders inline text to be placed inside the circle */
const PointsDropAnimation = ({ addedPts }) => {
  const [displayPts, setDisplayPts] = useState(0);

  useEffect(() => {
    playSparkleSound('scatter');
    let startTime = null;
    let animId;
    const duration = 1200;
    const step = (t) => {
      if (!startTime) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayPts(Math.floor(addedPts * ease));
      if (progress < 1) animId = requestAnimationFrame(step);
    };
    setTimeout(() => { animId = requestAnimationFrame(step); }, 50);
    return () => cancelAnimationFrame(animId);
  }, [addedPts]);

  return (
    <span className="text-[15px] font-bold text-[#E40000] leading-none animate-celebrate-pop drop-shadow-[0_1px_2px_rgba(228,0,0,0.25)]">
      +{displayPts.toLocaleString()}
    </span>
  );
};

export default function Dashboard({ goTo }) {
  const { slots, activeSlotId, current, advanceTime, setDashboardIntroDismissed, updateFavouriteTierIndex, saveState } = useSaveSlots();
  const [showOnboardingId, setShowOnboardingId] = useState(null);
  const [showWrapup, setShowWrapup] = useState(false);
  const [lastMonthData, setLastMonthData] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const wteScrollRef = useRef(null);

  const [showMonthlyTargetModal, setShowMonthlyTargetModal] = useState(false);
  const [helpMeWteId, setHelpMeWteId] = useState(null);
  const [helpPhase, setHelpPhase] = useState(0);

  // Gemini state
  const [geminiQuestion, setGeminiQuestion] = useState('');
  const [geminiHistory, setGeminiHistory] = useState([]);
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [geminiError, setGeminiError] = useState(null);
  const [geminiInteractionCount, setGeminiInteractionCount] = useState(0);
  const [geminiIsFinished, setGeminiIsFinished] = useState(false);

  const [displayEarnedByWTE, setDisplayEarnedByWTE] = useState(current?.monthlyEarnedByWTE || {});
  const [animationQueue, setAnimationQueue] = useState([]);
  const [activeAnim, setActiveAnim] = useState(null);
  const prevEarnedRef = useRef(current?.monthlyEarnedByWTE || {});

  useEffect(() => {
    const curr = current?.monthlyEarnedByWTE || {};
    const selectedIds = (current?.selectedWTEs || []).map(w => String(w.id));
    const newItems = [];
    // Iterate in selectedWTEs order (left-to-right on desktop)
    selectedIds.forEach(strId => {
      const o = prevEarnedRef.current[strId] || 0;
      const c = curr[strId] || 0;
      if (c > o) {
        newItems.push({ wteId: strId, addedPts: c - o, finalPts: c });
      }
    });

    if (newItems.length > 0) {
      setAnimationQueue(prev => [...prev, ...newItems]);
    } else {
      setDisplayEarnedByWTE(curr);
    }
    prevEarnedRef.current = curr;
  }, [current?.monthlyEarnedByWTE]);

  useEffect(() => {
    if (!activeAnim && animationQueue.length > 0) {
      const nextAnim = animationQueue[0];
      setAnimationQueue(q => q.slice(1));
      setActiveAnim(nextAnim);

      // Delay the earned value update so the ring animates visibly
      setTimeout(() => {
        setDisplayEarnedByWTE(prev => ({ ...prev, [nextAnim.wteId]: nextAnim.finalPts }));
      }, 400);

      // Clear activeAnim after animation completes to process next in queue
      setTimeout(() => {
        setActiveAnim(null);
      }, 2500);
    }
  }, [activeAnim, animationQueue]);

  const [introPhase, setIntroPhase] = useState(0);
  const [lionVariant, setLionVariant] = useState('idle');
  const [shootSparks, setShootSparks] = useState(null);
  const [scatterSparks, setScatterSparks] = useState(null);
  const [headlineDone, setHeadlineDone] = useState(false);
  const [typewriterDone, setTypewriterDone] = useState(false);
  const introPanelRef = useRef(null);
  const [displayPtsBalance, setDisplayPtsBalance] = useState(null);
  const [completionBurst, setCompletionBurst] = useState(null);

  const isIntroState = !current?.dashboardIntroDismissed;

  const hasResetPoints = useRef(false);
  useEffect(() => {
    if (isIntroState && introPhase === 0 && !hasResetPoints.current) {
      saveState({ currentPtsBalance: 0 });
      hasResetPoints.current = true;
    }
  }, [isIntroState, introPhase, saveState]);

  useEffect(() => {
    if (introPhase === 2) setLionVariant('ah');
    if (introPhase === 3) setLionVariant('think');
  }, [introPhase]);

  const handleAcceptWelcome = (e) => {
    // Start from lion's right paw/shooting position (panel-relative offset)
    const panelRect = introPanelRef.current?.getBoundingClientRect();
    const startX = panelRect ? panelRect.left + 220 : e.currentTarget.getBoundingClientRect().left;
    const startY = panelRect ? panelRect.top + 80 : e.currentTarget.getBoundingClientRect().top;

    const headerBtn = document.getElementById('header-points-pill');
    let targetX = window.innerWidth - 100;
    let targetY = 20;

    if (headerBtn) {
      const hRect = headerBtn.getBoundingClientRect();
      targetX = hRect.left + 20;
      targetY = hRect.top + 12;
    }
    const tx = targetX - startX;
    const ty = targetY - startY;

    // Start lion magic animation immediately
    setLionVariant('magicshot');

    // After 2s (lion animation complete) → fire sparkle towards points
    setTimeout(() => {
      setShootSparks({ startX, startY, tx, ty });
      playSparkleSound('shoot');

      // Sparkle arrives → scatter + animate count up
      setTimeout(() => {
        setShootSparks(null);
        setScatterSparks({ x: targetX, y: targetY });
        playSparkleSound('scatter');
        const duration = 1000;
        const startTime = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayPtsBalance(Math.round(100 * eased));
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setDisplayPtsBalance(null);
            saveState({ currentPtsBalance: 100 });
            setCompletionBurst({ x: targetX, y: targetY });
            playSparkleSound('scatter');
            // Burst plays for 1s, then phase transitions with a small pause
            setTimeout(() => setCompletionBurst(null), 1000);
            setTimeout(() => {
              setLionVariant('idle');
              setIntroPhase(1);
              setHeadlineDone(false);
              setTypewriterDone(false);
            }, 1300);
          }
        };
        requestAnimationFrame(tick);
      }, 700);

      // Clear scatter sparks visuals
      setTimeout(() => {
        setScatterSparks(null);
      }, 1400);

    }, 2000);
  }

  useEffect(() => {
    const checkScroll = () => {
      if (wteScrollRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = wteScrollRef.current;
        setCanScrollLeft(scrollLeft > 0);

        // Add a tiny tolerance to prevent floating point/padding rounding errors from falsely triggering the chevron
        setCanScrollRight(scrollWidth > clientWidth + 2 && scrollLeft + clientWidth < scrollWidth - 2);
      }
    };

    // Check after a brief delay to ensure layout has settled
    setTimeout(checkScroll, 50);
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [current?.selectedWTEs]);

  if (!activeSlotId || !current) return null;
  const slot = slots.find(s => s.id === activeSlotId);

  const {
    selectedWTEs = [],
    selectedWTU,
    selectedRewardId,
    favouriteTierIndex,
    tierIndexById,
  } = current;

  const hasFlights = selectedWTEs?.some((w) => String(w.id) === '11');
  const flightTierIndex = hasFlights ? (tierIndexById?.[11] ?? 2) : 0;



  const rewardsMap = {
    Flights: flightsList,
    Hotels: hotelsList,
    Activities: activitiesList,
    Marketplace: marketplaceList,
    'Gift Cards': giftCardsList,
    Entertainment: entertainmentList,
  };

  const selectedReward = (rewardsMap[selectedWTU] || []).find(r => r.id === selectedRewardId) || null;

  const TIER_LABELS = [
    'Low earn target',
    'Medium-low earn target',
    'Medium earn target',
    'Medium-high earn target',
    'High earn target',
  ];

  /* --- Monthly Sub-Selections --- */
  const toggleMonthlySelection = (wteId, subId) => {
    const wteIdStr = String(wteId);
    const subIdStr = String(subId);
    const monthlySelections = current?.wteMonthlySelections || {};
    const wteMonthlyFavs = monthlySelections[wteIdStr] || [];

    const isSelected = wteMonthlyFavs.includes(subIdStr);
    const updatedWteMonthlyFavs = isSelected
      ? wteMonthlyFavs.filter(id => id !== subIdStr)
      : [...wteMonthlyFavs, subIdStr];

    saveState({
      ...current,
      wteMonthlySelections: {
        ...monthlySelections,
        [wteIdStr]: updatedWteMonthlyFavs
      }
    });
  };

  /* --- Time Passes Link --- */
  const handleTimePasses = () => {
    const currentWeek = current.currentWeek || 1;

    if (currentWeek < 4) {
      // Just advance the week and add points
      advanceTime();
    } else {
      // It's the end of week 4, the month is finishing.
      // Capture data for the wrap-up modal before advancing
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const [, m] = (current.currentMonth || '2025-02').split('-').map(Number);

      const data = {
        monthName: monthNames[m - 1],
        totalEarned: Object.values(current.monthlyEarnedByWTE || {}).reduce((a, b) => a + b, 0),
        totalTarget: Object.values(current.monthlyTargetByWTE || {}).reduce((a, b) => a + b, 0),
        earnedById: current.monthlyEarnedByWTE || {},
        targetsById: current.monthlyTargetByWTE || {},
      };

      setLastMonthData(data);
      advanceTime(); // This triggers the month change
      setShowWrapup(true);
    }
  };

  // Format month for display
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [, dashboardMonth] = (current?.currentMonth || '2025-02').split('-').map(Number);
  const displayMonthName = monthNames[dashboardMonth - 1] || 'February';

  const MonthlyTargetModal = () => {
    const modalRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowMonthlyTargetModal(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const totalTarget = Object.values(current.monthlyTargetByWTE || {}).reduce((a, b) => a + b, 0);

    return (
      <div className="absolute top-0 z-[100]">
        <div
          ref={modalRef}
          className="w-[320px] bg-white rounded-[24px] shadow-[0_12px_48px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="relative px-6 py-4 border-b border-gray-50 flex items-center justify-center">
            <div className="flex items-baseline bg-[#D7F1F0] rounded-full px-[14px] py-[4px]">
              <span className="text-[15px] text-[#323232] mr-1.5 font-normal">{displayMonthName} Target:</span>
              <span className="text-[15px] font-bold text-[#323232] tracking-tight">{totalTarget.toLocaleString()}</span>
              <span className="text-[11px] font-medium text-[#323232] ml-1 uppercase">PTS</span>
            </div>

            <button
              onClick={() => setShowMonthlyTargetModal(false)}
              className="absolute right-5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* List */}
          <div className="p-2">
            {totalTarget === 0 ? (
              <div className="px-6 py-6 pb-2 text-center text-[#555] text-[14px]">
                <p className="mb-6 leading-relaxed">You can set a target by choosing some ways to earn points, and setting a target amount of points for each one.</p>
                <button
                  onClick={() => goTo(3)}
                  className="bg-white text-[15px] font-semibold text-[#E40000] px-6 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-all active:scale-95 shadow-sm inline-flex items-center justify-center whitespace-nowrap"
                >
                  Show me
                </button>
              </div>
            ) : (
              selectedWTEs.map(({ id: stringId }) => {
                const numericId = Number(stringId);
                const wte = WTEs.find(w => w.id === numericId);
                if (!wte) return null;

                const target = (current.monthlyTargetByWTE || {})[numericId] || 0;
                const tierIdx = tierIndexById?.[numericId] ?? 2;
                const tierLabel = TIER_LABELS[tierIdx];

                return (
                  <div key={numericId} className={`px-4 flex flex-col border-b border-gray-100 last:border-0 group py-3`}>
                    {/* Top Line: Name and Points */}
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-[14px] font-medium text-[#323232] truncate pr-4">{wte.name}</h4>
                      <div className="flex items-baseline shrink-0">
                        <img
                          alt=""
                          className="w-[16px] h-[18px] translate-y-[3px] inline-block mr-1.5"
                          src="data:image/svg+xml,%3csvg%20width='27'%20height='24'%20viewBox='0%200%2027%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M26.0576%2023.6163C26.0794%2023.639%2026.1012%2023.639%2026.1232%2023.639C26.167%2023.639%2026.1891%2023.639%2026.2329%2023.5933C26.2764%2023.5476%2026.2764%2023.4564%2026.2329%2023.4107C23.6278%2020.5556%2020.4319%2018.249%2016.8637%2016.7647C15.7692%2016.3078%2015.7692%2016.3078%2015.7692%2016.3078C15.1999%2016.0563%2014.8279%2015.4856%2014.8279%2014.8232C14.8935%2012.3795%2020.4099%2012.882%2020.9791%2011.7171C21.0668%2011.5116%2021.0668%2011.5116%2021.0668%2011.5116C19.9284%2010.4838%2018.5929%209.73024%2017.1046%209.2964C17.0828%209.36483%2017.0387%209.63882%2017.3451%2010.1641C17.6738%2010.7123%2016.9949%2011.603%2015.988%2010.6439C15.9004%2010.5752%2015.9004%2010.5752%2015.9004%2010.5752C8.58908%203.58648%205.21819%208.19991%200.2491%200.0695199C0.20529%200.000828303%200.139698%20-0.0218967%200.0738597%200.0238116C0.00826853%200.0695199%20-0.0137602%200.137953%200.00826853%200.206386C3.92666%2010.0499%2011.9384%207.97163%2012.8797%2017.1528C12.9235%2017.4955%2013.1644%2017.7695%2013.4926%2017.8152C17.9362%2018.546%2022.2707%2020.4645%2026.0358%2023.6163H26.0576'%20fill='%23E40000'/%3e%3c/svg%3e"
                        />
                        <span className="text-[14px] font-medium text-[#323232]">{target.toLocaleString()}</span>
                        <span className="text-[10px] font-medium text-gray-400 uppercase ml-1">PTS</span>
                      </div>
                    </div>
                    {/* Bottom Line: Label and Edit */}
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] text-gray-900 font-normal">{tierLabel}</p>
                      <button
                        onClick={() => goTo(3, { initialExpandId: stringId })}
                        className="text-[12px] text-[#E40000] font-medium underline shrink-0"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Separator */}
          <div className="h-[1px] bg-[#666666] mx-0"></div>

          {/* Footer Total */}
          <div className="px-6 py-5 bg-white flex items-center justify-between">
            <span className="text-[14px] font-medium text-[#323232]">Total</span>
            <div className="flex items-baseline">
              <img
                alt=""
                className="w-[16px] h-[18px] translate-y-[3px] inline-block mr-1.5"
                src="data:image/svg+xml,%3csvg%20width='27'%20height='24'%20viewBox='0%200%2027%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M26.0576%2023.6163C26.0794%2023.639%2026.1012%2023.639%2026.1232%2023.639C26.167%2023.639%2026.1891%2023.639%2026.2329%2023.5933C26.2764%2023.5476%2026.2764%2023.4564%2026.2329%2023.4107C23.6278%2020.5556%2020.4319%2018.249%2016.8637%2016.7647C15.7692%2016.3078%2015.7692%2016.3078%2015.7692%2016.3078C15.1999%2016.0563%2014.8279%2015.4856%2014.8279%2014.8232C14.8935%2012.3795%2020.4099%2012.882%2020.9791%2011.7171C21.0668%2011.5116%2021.0668%2011.5116%2021.0668%2011.5116C19.9284%2010.4838%2018.5929%209.73024%2017.1046%209.2964C17.0828%209.36483%2017.0387%209.63882%2017.3451%2010.1641C17.6738%2010.7123%2016.9949%2011.603%2015.988%2010.6439C15.9004%2010.5752%2015.9004%2010.5752%2015.9004%2010.5752C8.58908%203.58648%205.21819%208.19991%200.2491%200.0695199C0.20529%200.000828303%200.139698%20-0.0218967%200.0738597%200.0238116C0.00826853%200.0695199%20-0.0137602%200.137953%200.00826853%200.206386C3.92666%2010.0499%2011.9384%207.97163%2012.8797%2017.1528C12.9235%2017.4955%2013.1644%2017.7695%2013.4926%2017.8152C17.9362%2018.546%2022.2707%2020.4645%2026.0358%2023.6163H26.0576'%20fill='%23E40000'/%3e%3c/svg%3e"
              />
              <span className="text-[14px] font-medium text-[#323232]">{totalTarget.toLocaleString()}</span>
              <span className="text-[10px] font-medium text-gray-400 uppercase ml-1">PTS</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
        <VelocityHeader
          pointsBalance={displayPtsBalance ?? current?.currentPtsBalance ?? 0}
          memberName={slot?.name || 'Craig Duncan'}
          activeAccountTab="My Velocity"
          onAccountTabClick={(tab) => {
            if (tab === 'Earn') goTo(3);
            if (tab === 'Profile') goTo(7);
          }}
          showTimePasses={selectedWTEs.length > 0}
          onTimePassesClick={handleTimePasses}
        />

        <div className="w-full">
          <div className="w-full max-w-[1218px] mx-auto px-4 xl:px-6 pt-8">


            {/* --- Lower Panel Content --- */}
            <div className="w-full">
              {helpMeWteId ? (() => {
                const numericId = Number(helpMeWteId);
                const wte = WTEs.find(w => w.id === numericId);
                if (!wte) return null;
                const earned = (current.monthlyEarnedByWTE || {})[numericId] || 0;
                const target = (current.monthlyTargetByWTE || {})[numericId] || 1;
                const percent = earned > 0 ? Math.min(100, Math.round((earned / target) * 100)) : 0;

                return (
                  <div className="flex flex-col xl:flex-row gap-8 items-center justify-start mt-8">
                    {/* Left: Circle UI */}
                    <div className="flex-shrink-0 flex flex-col items-center justify-center transform scale-90 ml-2 xl:ml-8">
                      <div className="relative w-[120px] h-[120px] mb-2">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="60" cy="60" r="56" fill="none" stroke="#F3F5F7" strokeWidth="4" />
                          <circle
                            cx="60" cy="60" r="56" fill="none"
                            stroke="#4C2F92"
                            strokeWidth="4"
                            strokeDasharray={351.8}
                            strokeDashoffset={351.8 - (351.8 * percent) / 100}
                            strokeLinecap="round"
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 pt-4">
                          <img src={wte.iconSrc} alt={wte.name} className="w-[36px] h-[36px] object-contain shrink-0 mb-2" />
                          <div className="w-[50px] h-px bg-gray-300 mb-2" />
                          <span className="text-[16px] font-medium text-gray-500 leading-none">{earned > 0 ? earned.toLocaleString() : target.toLocaleString()}</span>
                        </div>
                      </div>
                      <span className="text-[13px] font-medium text-[#323232] text-center max-w-[120px] leading-tight">
                        {wte.name}
                      </span>
                    </div>

                    {/* Middle: Lion */}
                    <div className="flex-shrink-0 flex items-center justify-center -mr-4">
                      <LionSprite variant="idle" targetHeight={160} />
                    </div>

                    {/* Right: Text and buttons */}
                    <div className="flex-grow max-w-[500px] flex flex-col justify-center min-h-[160px]">
                      {helpPhase === 0 ? (
                        <div className="animate-duo-entrance">
                          <h2 className="text-[22px] text-[#323232] font-normal mb-3 leading-snug">
                            Earn {Math.max(0, target - earned).toLocaleString()} pts on {wte.name}
                          </h2>
                          <div className="min-h-[48px]">
                            <p className="text-[15px] text-[#323232] leading-relaxed mb-6 max-w-[400px]">
                              You've earned <strong>{earned.toLocaleString()} pts</strong> this month. {Math.max(0, target - earned) > 0 ? (
                                <span>Let's look at ways to earn the remaining <strong>{Math.max(0, target - earned).toLocaleString()} pts</strong> to hit your target!</span>
                              ) : (
                                <span className="text-[#00a600] font-medium">You have reached your target! Let's maximise it.</span>
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-6">
                            <button
                              className="bg-white text-[#E40000] px-6 py-2 rounded-full border border-[1px] border-red-200 font-semibold text-[15px] hover:bg-red-50 transition-all active:scale-95 shadow-sm"
                              onClick={() => setHelpPhase(1)}
                            >
                              Let's go
                            </button>
                            <button
                              onClick={() => { setHelpMeWteId(null); setHelpPhase(0); }}
                              className="text-[#E40000] text-[15px] font-normal hover:underline"
                            >
                              Skip
                            </button>
                          </div>
                        </div>
                      ) : helpPhase === 1 ? (() => {
                        const favs = current?.wteFavourites?.[wte.id] || [];
                        const hasFavs = favs.length > 0;
                        const subNamesMap = wteSubItems[wte.id] || {};
                        const subSelectionsPossible = Object.keys(subNamesMap).length > 0;

                        return (
                          <div className={`animate-duo-entrance flex items-start ${hasFavs ? 'gap-10 w-full min-w-[700px]' : ''}`}>
                            <div className="flex-1 shrink-0">
                              <h2 className="text-[20px] text-[#323232] font-normal mb-3 leading-snug">
                                {hasFavs ? "Tip 1: Maximise your usage" : "Tip 1: Maximise everyday usage"}
                              </h2>
                              <div className="min-h-[48px]">
                                {hasFavs ? (
                                  <p className="text-[15px] text-[#323232] leading-relaxed mb-6 max-w-[320px]">
                                    Which of these ways to earn might you be able to use this month? Narrow down by selecting some options.
                                  </p>
                                ) : subSelectionsPossible ? (
                                  <p className="text-[15px] text-[#323232] leading-relaxed mb-6 max-w-[400px]">
                                    You haven't made any sub-selections for this category. Go to the Earn and Use points page to make your selections to unlock personalised tips!
                                  </p>
                                ) : (
                                  <p className="text-[15px] text-[#323232] leading-relaxed mb-6 max-w-[400px]">
                                    Ensure you have thoroughly linked your accounts and explore partner offers to boost your earn rate easily.
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-6">
                                <button
                                  className={`bg-white text-[#E40000] px-8 py-2.5 rounded-full border border-[1px] font-medium text-[15px] hover:bg-red-50 transition-all active:scale-95 ${hasFavs ? 'border-gray-200' : 'border-[#E40000] font-semibold shadow-sm'}`}
                                  onClick={() => {
                                    if (!hasFavs && subSelectionsPossible) {
                                      goTo(3, { initialExpandId: Number(wte.id), openMoreInfo: true }); // go to earn and use points with WTE expanded
                                    } else {
                                      setHelpPhase(2);

                                      // Pre-fetch the conversation on entry to Tip 2 so it's ready for Tip 3
                                      setGeminiLoading(true); setGeminiError(null);

                                      const favsInfo = current?.wteFavourites?.[wte.id] || [];
                                      const subNamesInf = wteSubItems[wte.id] || {};
                                      const monthlyFavs = current?.wteMonthlySelections?.[wte.id] || [];
                                      const effectiveFavsInfo = monthlyFavs.length > 0 ? monthlyFavs : favsInfo;
                                      const favNamesInfo = effectiveFavsInfo.map(id => subNamesInf[id]?.name || subNamesInf[id]).join(', ');

                                      const pointsGap = Math.max(0, target - earned);

                                      const targetRewardName = selectedReward ? (selectedReward.destCity || selectedReward.reward) : 'your next reward';
                                      let initialSystemPrompt = `You are the Koala character and a friendly guide for ${slot?.name || 'James'}. You have already introduced yourself and established a rapport earlier. You are curious and friendly, helping them clarify their points-earning plans.
CRITICAL SYSTEM INSTRUCTION: DO NOT GIVE ADVICE. DO NOT MENTION EARNING TABLES, POINTS MECHANICS, FARE CLASSES, OR qantas.com. NEVER advise the user on how to earn points. This is strictly forbidden.
The member explicitly selected these partners: ${favNamesInfo || 'None'}.
The member has a points gap of ${pointsGap.toLocaleString()} points this month on ${wte.name} to help them reach their reward of: ${targetRewardName}.

Your ONLY task is to:
1. Speak as the Koala who has already met the member. Skip introductory filler like "it's fantastic you're focusing on..." or "great that you are looking to earn points...".
2. Briefly acknowledge their selections and the gap of ${pointsGap} pts.
3. Ask ONE clear, engaging, open-ended question about their possible intent for this month—how exactly are they going to spend money through ${wte.name}?

Keep your entire response to EXACTLY 2-3 sentences. ALWAYS end with ONE clear question.`;

                                      const uName = slot?.name || 'James';
                                      fetch('/api/chat', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                          question: `Hi, I am ${uName}. No need for a formal welcome—we've already met earlier. Briefly acknowledge my selected partners and the gap, then ask me an engaging question about how I'm going to spend money with ${wte.name} this month to reach my reward.`,
                                          wteName: wte?.name,
                                          history: [],
                                          systemPrompt: initialSystemPrompt
                                        })
                                      })
                                        .then(r => r.json())
                                        .then(d => {
                                          if (d.error) throw new Error(d.error);
                                          setGeminiHistory([{ role: 'assistant', content: d.answer }]);
                                        })
                                        .catch(err => setGeminiError(err.message))
                                        .finally(() => setGeminiLoading(false));
                                    }
                                  }}
                                >
                                  {(!hasFavs && subSelectionsPossible) ? "Choose" : "Done"}
                                </button>
                                <button
                                  onClick={() => { setHelpMeWteId(null); setHelpPhase(0); setGeminiHistory([]); setGeminiInteractionCount(0); setGeminiIsFinished(false); }}
                                  className="text-[#E40000] text-[15px] font-normal hover:underline"
                                >
                                  Skip
                                </button>
                              </div>
                            </div>

                            {hasFavs && (
                              <div className="flex-1 w-[320px] max-h-[160px] overflow-y-auto pr-4 flex flex-col gap-2 relative scrollbar-hide">
                                {/* Thick pseudo-scrollbar visual track matching figma */}
                                <div className="absolute top-0 right-0 w-[4px] h-full bg-[#E5E5E5] rounded-full" />

                                {favs.map(subId => {
                                  const isSelected = (current?.wteMonthlySelections?.[wte.id] || []).includes(String(subId));
                                  let itemData = subNamesMap[subId] || { name: `Item ${subId}`, category: "" };
                                  if (typeof itemData === 'string') itemData = { name: itemData, category: "" };
                                  return (
                                    <div
                                      key={subId}
                                      onClick={() => toggleMonthlySelection(wte.id, subId)}
                                      className={`px-5 py-3.5 min-h-[64px] flex flex-col justify-center cursor-pointer transition-colors shrink-0 mr-4 border rounded-[4px] ${isSelected ? 'bg-red-50 border-[#E40000]' : 'bg-[#fafafa] border-transparent hover:bg-gray-50 hover:border-gray-200'}`}
                                    >
                                      <div className="flex justify-between items-center w-full">
                                        <div className="flex flex-col pr-4">
                                          <span className={`text-[14px] font-medium leading-tight mb-0.5 ${isSelected ? 'text-[#E40000]' : 'text-[#323232]'}`}>{itemData.name}</span>
                                          {itemData.category && (
                                            <span className={`text-[12px] font-normal leading-none mt-1 ${isSelected ? 'text-[#E40000]/80' : 'text-[#888]'}`}>{itemData.category}</span>
                                          )}
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${isSelected ? 'border-[#E40000] bg-[#E40000]' : 'border-gray-300'}`}>
                                          {isSelected && (
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })() : helpPhase === 2 ? (() => {
                        const favs = current?.wteFavourites?.[wte.id] || [];
                        const subNamesMap = wteSubItems[wte.id] || {};
                        return (
                          <div className="animate-duo-entrance">
                            <h2 className="text-[20px] text-[#323232] font-normal mb-3 leading-snug">
                              Tip 2: Look out for multipliers
                            </h2>
                            <div className="min-h-[48px] mb-4">
                              {favs.length > 0 ? (
                                <div>
                                  <p className="text-[15px] mb-2 text-[#323232]">Here are some current promotions based on your selections:</p>
                                  <ul className="list-disc pl-5 text-[14px] text-[#323232] space-y-2 max-w-[400px]">
                                    {favs.slice(0, 2).map((subId) => {
                                      let itemData = subNamesMap[subId] || { name: `Item ${subId}` };
                                      if (typeof itemData === 'string') itemData = { name: itemData };
                                      return (
                                        <li key={subId}>
                                          <strong>{itemData.name}:</strong> Earn double points this weekend when you link your account.
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              ) : (
                                <p className="text-[15px] text-[#323232] leading-relaxed max-w-[400px]">
                                  Keep an eye out for promotional bonus points campaigns across {wte.name}.
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-6">
                              <button
                                className="bg-white text-[#E40000] px-6 py-2.5 rounded-full border border-[2px] border-[#E40000] font-semibold text-[15px] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                                onClick={() => {
                                  setHelpPhase(3);
                                }}
                              >
                                Next
                              </button>
                              <button
                                onClick={() => { setHelpMeWteId(null); setHelpPhase(0); setGeminiQuestion(''); setGeminiHistory([]); setGeminiInteractionCount(0); setGeminiIsFinished(false); }}
                                className="text-[#E40000] text-[15px] font-normal hover:underline"
                              >
                                Skip
                              </button>
                            </div>
                          </div>
                        );
                      })() : helpPhase === 3 ? (() => {
                        const handleSend = () => {
                          if (!geminiQuestion.trim() || geminiLoading) return;

                          const uName = slot?.name || 'James';
                          setGeminiLoading(true); setGeminiError(null);
                          const newHistory = [...geminiHistory, { role: 'user', content: geminiQuestion }];
                          setGeminiHistory(newHistory);
                          const currentStr = geminiQuestion;
                          setGeminiQuestion('');

                          const favs = current?.wteFavourites?.[wte.id] || [];
                          const subNamesMap = wteSubItems[wte.id] || {};
                          const monthlyFavsDynamic = current?.wteMonthlySelections?.[wte.id] || [];
                          const effectiveFavsDynamic = monthlyFavsDynamic.length > 0 ? monthlyFavsDynamic : favs;
                          const favNames = effectiveFavsDynamic.map(id => subNamesMap[id]?.name || subNamesMap[id]).join(', ');

                          const interactionsDone = geminiInteractionCount + 1;
                          setGeminiInteractionCount(interactionsDone);

                          const pointsGap = Math.max(0, target - earned);
                          const targetRewardName = selectedReward ? (selectedReward.destCity || selectedReward.reward) : 'your next reward';
                          let dynamicSystemPrompt = `You are the friendly Koala guide for ${uName}. You are a curious interviewer, NOT an expert advisor.
CRITICAL SYSTEM INSTRUCTION: DO NOT GIVE ADVICE. DO NOT MENTION EARNING TABLES, POINTS MECHANICS, FARE CLASSES, OR qantas.com. NEVER advise the user on how to earn points. This is strictly forbidden.
The member explicitly selected these partners: ${favNames || 'None'}.
The member has a points gap of ${pointsGap.toLocaleString()} points this month to reach their reward of: ${targetRewardName}.

Your ONLY task is to:
1. Actively listen and briefly validate their previous answer in 1 short sentence.
2. Remind them gently that it takes time for points to reach their account, so the key thing is to keep using Velocity and partners and the points will come in.
3. Make ONE final pass at discovering a specific spend intent. Ask exactly what they are going to do next and when that is (e.g., next week? the week after?).

ALWAYS end your response with ONE clear, engaging question. Keep your entire response to EXACTLY 2-3 sentences.`;

                          let sentQuestion = currentStr;

                          if (interactionsDone === 1) {
                            sentQuestion += `\n\n[SYSTEM INSTRUCTION TO AI: This is round 2! You MUST respond by asking when I am purchasing or what my next actionable step is. DO NOT give advice on earning tables, mechanics, or fare classes. Keep response to exactly 2 sentences, ALWAYS ending with a question.]`;
                          }
                          if (interactionsDone >= 2) {
                            dynamicSystemPrompt = `You are the friendly Koala guide for ${uName}.
CRITICAL INSTRUCTION: This is the final interaction. Briefly validate their plan and express warm confidence in their progress.
Mention that by sticking to this plan and booking or purchasing through ${wte.name} and other partners, they'll be well on their way to ${targetRewardName} by the end of the year.
Keep it encouraging and warm. KEEP IT TO EXACTLY 2 SENTENCES. Do not ask any more questions.`;
                            sentQuestion += `\n\n[SYSTEM INSTRUCTION TO AI: Final interaction! Wrap up warmly. Validate their plan and remind them that they'll reach ${targetRewardName} by sticking to their earn strategy. 2 sentences max. DO NOT ask a question.]`;
                            setGeminiIsFinished(true);
                          }

                          fetch('/api/chat', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              question: sentQuestion,
                              wteName: wte?.name,
                              history: geminiHistory,
                              systemPrompt: dynamicSystemPrompt
                            })
                          })
                            .then(r => r.json())
                            .then(d => {
                              if (d.error) throw new Error(d.error);
                              setGeminiHistory([...newHistory, { role: 'assistant', content: d.answer }]);
                            })
                            .catch(err => setGeminiError(err.message))
                            .finally(() => setGeminiLoading(false));
                        };

                        return (
                          <div className="animate-duo-entrance flex-1">
                            <h2 className="text-[20px] text-[#323232] font-normal mb-3 leading-snug">
                              Earning {Math.max(0, target - earned).toLocaleString()} points with {wte.name} this month
                            </h2>

                            {(geminiHistory.length > 0 || geminiLoading) && (
                              <div className="flex flex-col gap-3 mb-4 max-h-[160px] overflow-y-auto pr-2 scrollbar-hide">
                                {geminiHistory.map((msg, i) => (
                                  <div key={i} className={`p-0 text-[14px] leading-relaxed ${msg.role === 'user' ? 'self-end bg-[#fafafa] px-3 py-2 rounded-lg text-gray-500 max-w-[85%]' : 'self-start text-[#323232]'} `}>
                                    <span dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }} />
                                  </div>
                                ))}
                                {geminiLoading && (
                                  <div className="p-0 text-[14px] self-start text-[#888]">
                                    <em>Coach is thinking...</em>
                                  </div>
                                )}
                              </div>
                            )}

                            {geminiError && (
                              <div className="text-[#E40000] text-[14px] mb-4">
                                {geminiError}
                              </div>
                            )}

                            {!geminiIsFinished ? (
                              <div className="flex gap-3 mb-4 items-center">
                                <div className="flex-1 bg-white border border-gray-200 rounded-full flex items-center pr-1.5 pl-4 py-1 flex-shrink shadow-sm hover:border-[#E40000] focus-within:border-[#E40000] transition-colors relative min-w-0">
                                  <input
                                    type="text"
                                    value={geminiQuestion}
                                    onChange={e => setGeminiQuestion(e.target.value)}
                                    // Make sure it doesn't double trigger
                                    onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                                    placeholder="Answer here"
                                    className="flex-1 text-[14px] text-[#323232] outline-none min-w-0 bg-transparent placeholder-gray-400 italic py-1"
                                    disabled={geminiLoading}
                                  />
                                  <button
                                    onClick={handleSend}
                                    disabled={geminiLoading || !geminiQuestion.trim()}
                                    className="w-[28px] h-[28px] mr-0 ml-2 flex items-center justify-center rounded-full bg-[#E40000] text-white flex-shrink-0 disabled:opacity-50 transition-colors"
                                  >
                                    {geminiLoading ? (
                                      <svg className="animate-spin w-3 h-3 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                      </svg>
                                    ) : (
                                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                      </svg>
                                    )}
                                  </button>
                                </div>
                                <button
                                  onClick={() => { setHelpMeWteId(null); setHelpPhase(0); setGeminiQuestion(''); setGeminiHistory([]); setGeminiInteractionCount(0); setGeminiIsFinished(false); }}
                                  className="text-[#E40000] text-[13px] font-normal hover:underline ml-2"
                                >
                                  Skip
                                </button>
                              </div>
                            ) : (
                              <div className="mt-4 flex">
                                <button
                                  onClick={() => { setHelpMeWteId(null); setHelpPhase(0); setGeminiQuestion(''); setGeminiHistory([]); setGeminiInteractionCount(0); setGeminiIsFinished(false); }}
                                  className="bg-[#E40000] text-white px-8 py-2 rounded-full font-semibold text-[15px] hover:bg-[#c40000] transition-all active:scale-95 shadow-sm"
                                >
                                  Done
                                </button>
                                <button
                                  onClick={() => { setHelpMeWteId(null); setHelpPhase(0); setGeminiQuestion(''); setGeminiHistory([]); setGeminiInteractionCount(0); setGeminiIsFinished(false); }}
                                  className="text-[#E40000] text-[13px] font-normal hover:underline ml-4"
                                >
                                  Close
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })() : null}
                    </div>
                  </div>
                );
              })() : isIntroState ? (
                <div className="w-full max-w-[1100px] mx-auto">
                  <div ref={introPanelRef} className="relative rounded-xl overflow-hidden border border-gray-200" style={{ height: '340px' }}>

                    {/* SVG background */}
                    <img src={PanelBgd} alt="" className="absolute inset-0 w-full h-full" style={{ objectFit: 'fill' }} />

                    {/* Phase 0: member card — stays in DOM to fade out */}
                    <div
                      className="absolute top-5 right-6 hidden sm:flex flex-col justify-between w-[180px] h-[110px] rounded-xl p-4 text-white text-right pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, #7A1515 0%, #C90000 100%)',
                        opacity: introPhase <= 1 ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                      }}
                    >
                      <div className="flex items-center justify-end gap-1.5 text-[11px] font-medium opacity-90">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        {slot?.memberNumber || '1227 062 631'}
                      </div>
                      <div>
                        <p className="text-[10px] text-white/70 mb-0.5">Member since 2024</p>
                        <p className="text-[28px] leading-none" style={{ fontWeight: 100 }}>Red</p>
                      </div>
                    </div>

                    {/* Phases 1-5: Choose / Add / Set up cards — staggered fade-in */}
                    <div className="absolute right-16 hidden sm:flex items-end gap-4" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                      {[
                        { img: imgChoose, label: 'Choose', activeAt: 3 },
                        { img: imgAdd,    label: 'Add',    activeAt: 4 },
                        { img: imgSetup,  label: 'Set up', activeAt: 5 },
                      ].map(({ img, label, activeAt }, idx) => {
                          const isActive = introPhase === activeAt;
                          const isPast   = introPhase > activeAt;
                          return (
                            <div
                              key={label}
                              className={`flex flex-col items-center transition-all duration-300 ${isPast ? 'opacity-40 grayscale' : ''}`}
                              style={{
                                opacity: introPhase >= 2 ? undefined : 0,
                                animation: introPhase >= 2 ? `intro-card-fadein 0.4s ease forwards ${idx * 160}ms` : 'none',
                              }}
                            >
                              <div
                                className={`w-[96px] h-[96px] rounded-[16px] flex items-center justify-center overflow-hidden mb-2 transition-all duration-300 ${isActive ? 'bg-white' : 'bg-[#F3F3F3]'}`}
                                style={isActive ? { outline: '2.5px solid #4C2F92', boxShadow: '0 4px 12px rgba(76,47,146,0.18)' } : {}}
                              >
                                <img src={img} alt={label} className="w-full h-full object-cover" />
                              </div>
                              <span className={`text-[12px] font-semibold ${isActive ? 'text-[#4C2F92]' : 'text-[#aaaaaa]'}`}>{label}</span>
                            </div>
                          );
                        })}
                      </div>

                    {/* Lion — left, bottom-anchored so feet stay fixed across variants */}
                    <div className="absolute" style={{ left: '28px', bottom: lionVariant === 'magicshot' ? '-6px' : '43px', transform: lionVariant === 'magicshot' ? 'translateX(-72px)' : 'translateX(20px)' }}>
                      <LionSprite
                        variant={lionVariant}
                        targetHeight={lionVariant === 'magicshot' ? 345 : 254}
                        maxLoops={lionVariant === 'ah' || lionVariant === 'think' ? 1 : 3}
                        onComplete={lionVariant === 'ah' || lionVariant === 'think' ? () => setLionVariant('idle') : null}
                      />
                    </div>

                    {/* Text block — right boundary shifts when cards are present */}
                    <div className="absolute" style={{ left: '260px', right: introPhase === 0 ? '210px' : '455px', top: '50%', transform: 'translateY(-50%)' }}>

                      {introPhase === 0 && (
                        <>
                          <h2 className="text-[22px] font-bold text-[#1d1c1f] mb-2 leading-tight">
                            Welcome to the program, {slot?.name?.split(' ')[0] || 'Kim'}!
                          </h2>
                          <p className="text-[14px] text-[#575559] mb-5 min-h-[20px]">
                            <HTMLTypewriter html="I'd like to give you 100 pts as a welcome gift." speed={25} />
                          </p>
                          <button
                            onClick={handleAcceptWelcome}
                            className="border border-[#4C2F92] text-[#4C2F92] text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#4C2F92] hover:text-white transition-colors"
                          >Accept 100 pts</button>
                        </>
                      )}

                      {introPhase === 1 && (
                        <>
                          <h2 className="text-[22px] font-bold text-[#1d1c1f] mb-2 leading-tight min-h-[30px]">
                            <HTMLTypewriter html="OK, 100 pts for you!" speed={40} onComplete={() => setHeadlineDone(true)} />
                          </h2>
                          <div className="min-h-[44px] mb-4">
                            {headlineDone && (
                              <p className="text-[14px] text-[#575559] leading-relaxed">
                                <HTMLTypewriter html="That's better. Starting from zero is no fun at all." speed={30} onComplete={() => setTypewriterDone(true)} />
                              </p>
                            )}
                          </div>
                          <div className={`flex items-center gap-5 ${typewriterDone ? 'animate-duo-entrance' : 'invisible'}`}>
                            <button onClick={() => { setIntroPhase(2); setHeadlineDone(false); setTypewriterDone(false); }} className="border border-[#4C2F92] text-[#4C2F92] text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#4C2F92] hover:text-white transition-colors">Thanks!</button>
                            <button onClick={() => setDashboardIntroDismissed(true)} className="text-[13px] text-[#4C2F92] font-medium hover:underline">Skip</button>
                          </div>
                        </>
                      )}

                      {introPhase === 2 && (
                        <>
                          <h2 className="text-[22px] font-bold text-[#1d1c1f] mb-2 leading-tight min-h-[30px]">
                            <HTMLTypewriter html="Let's get you some more points." speed={40} onComplete={() => setHeadlineDone(true)} />
                          </h2>
                          <div className="min-h-[56px] mb-4">
                            {headlineDone && (
                              <p className="text-[14px] text-[#575559] leading-relaxed">
                                <HTMLTypewriter html="One of the best ways to get the most out of your membership is by finding <strong>a few different ways</strong> of earning points.<br/>You can add some to this <strong>My Velocity</strong> page." speed={25} onComplete={() => setTypewriterDone(true)} />
                              </p>
                            )}
                          </div>
                          <div className={`flex items-center gap-5 ${typewriterDone ? 'animate-duo-entrance' : 'invisible'}`}>
                            <button onClick={() => { setIntroPhase(3); setHeadlineDone(false); setTypewriterDone(false); }} className="border border-[#4C2F92] text-[#4C2F92] text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#4C2F92] hover:text-white transition-colors">Show me!</button>
                            <button onClick={() => setDashboardIntroDismissed(true)} className="text-[13px] text-[#4C2F92] font-medium hover:underline">Skip</button>
                          </div>
                        </>
                      )}

                      {introPhase === 3 && (
                        <>
                          <h2 className="text-[22px] font-bold text-[#1d1c1f] mb-2 leading-tight min-h-[30px]">
                            <HTMLTypewriter html="Choose how you want to earn" speed={40} onComplete={() => setHeadlineDone(true)} />
                          </h2>
                          <div className="min-h-[56px] mb-4">
                            {headlineDone && (
                              <p className="text-[14px] text-[#575559] leading-relaxed">
                                <HTMLTypewriter html="You will see lots of <strong>different ways</strong> that you can earn. You can <strong>choose a few</strong> that look good initially. Don't worry, you can change these at any time!" speed={25} onComplete={() => setTypewriterDone(true)} />
                              </p>
                            )}
                          </div>
                          <div className={`flex items-center gap-5 ${typewriterDone ? 'animate-duo-entrance' : 'invisible'}`}>
                            <button onClick={() => { setIntroPhase(4); setHeadlineDone(false); setTypewriterDone(false); setLionVariant('ah'); }} className="border border-[#4C2F92] text-[#4C2F92] text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#4C2F92] hover:text-white transition-colors">OK!</button>
                            <button onClick={() => setDashboardIntroDismissed(true)} className="text-[13px] text-[#4C2F92] font-medium hover:underline">Skip</button>
                          </div>
                        </>
                      )}

                      {introPhase === 4 && (
                        <>
                          <h2 className="text-[22px] font-bold text-[#1d1c1f] mb-2 leading-tight min-h-[30px]">
                            <HTMLTypewriter html="Add your favourite ways to earn" speed={40} onComplete={() => setHeadlineDone(true)} />
                          </h2>
                          <div className="min-h-[56px] mb-4">
                            {headlineDone && (
                              <p className="text-[14px] text-[#575559] leading-relaxed">
                                <HTMLTypewriter html="Adding these ways to earn to your list adds them as <strong>targets.</strong> This gives you a <strong>target number of points</strong> to aim for each month. Then you can imagine what kind of <strong>rewards</strong> you might want." speed={25} onComplete={() => setTypewriterDone(true)} />
                              </p>
                            )}
                          </div>
                          <div className={`flex items-center gap-5 ${typewriterDone ? 'animate-duo-entrance' : 'invisible'}`}>
                            <button onClick={() => { setIntroPhase(5); setHeadlineDone(false); setTypewriterDone(false); setLionVariant('foryou'); }} className="border border-[#4C2F92] text-[#4C2F92] text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#4C2F92] hover:text-white transition-colors">All right!</button>
                            <button onClick={() => setDashboardIntroDismissed(true)} className="text-[13px] text-[#4C2F92] font-medium hover:underline">Skip</button>
                          </div>
                        </>
                      )}

                      {introPhase === 5 && (
                        <>
                          <div className="min-h-[72px] mb-4">
                            <p className="text-[14px] text-[#575559] leading-relaxed">
                              <HTMLTypewriter html="Once you have some target ways to earn, they'll appear on this page — your <strong>My Velocity</strong> page. From here, you can start to learn more about them and I'll help you with <strong>next steps</strong> to set them up.<br/><br/>How does that sound?" speed={25} onComplete={() => setTypewriterDone(true)} />
                            </p>
                          </div>
                          <div className={`flex items-center gap-5 ${typewriterDone ? 'animate-duo-entrance' : 'invisible'}`}>
                            <button onClick={() => { setDashboardIntroDismissed(true); goTo(3); }} className="border border-[#4C2F92] text-[#4C2F92] text-[13px] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#4C2F92] hover:text-white transition-colors">Sounds good</button>
                            <button onClick={() => setDashboardIntroDismissed(true)} className="text-[13px] text-[#4C2F92] font-medium hover:underline">Skip</button>
                          </div>
                        </>
                      )}

                    </div>

                  </div>
                </div>
              ) : selectedWTEs.length === 0 ? (
                <div className="w-full max-w-[1100px] mx-auto">
                  <div className="w-full border border-gray-200 rounded-xl overflow-hidden flex">
                    {/* Left column */}
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex items-center gap-4 px-6 py-5">
                        <div className="w-[60px] h-[60px] rounded-xl bg-[#EDE8F7] flex items-center justify-center shrink-0 overflow-hidden">
                          <img src={LionImg} alt="" className="w-[52px] h-[52px] object-contain" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-[20px] font-bold text-[#1d1c1f]">Good morning, {slot?.name?.split(' ')[0] || 'Kim'}!</h2>
                          <p className="text-[14px] text-[#575559]">Let's get you some points</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-0 divide-x divide-gray-100 px-6 pb-6">
                        <div className="flex flex-col items-center gap-3 pr-6">
                          <button
                            onClick={() => goTo(3)}
                            className="w-[90px] h-[90px] rounded-full border-2 border-[#4C2F92] flex items-center justify-center transition-colors"
                          >
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#4C2F92" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                          </button>
                          <p className="text-[13px] font-semibold text-[#1d1c1f] text-center leading-snug">Add a way<br/>to earn</p>
                          <button onClick={() => goTo(3)} className="text-[13px] text-[#4C2F92] font-bold hover:underline">Edit target ways to earn</button>
                        </div>
                        <div className="flex items-center px-6">
                          <div className="border border-gray-200 rounded-xl p-5 w-full">
                            <p className="text-[15px] font-bold text-[#1d1c1f] mb-2">Did you know?</p>
                            <p className="text-[13px] text-[#575559] leading-relaxed">It's much easier to earn towards rewards quickly when you earn in a few ways.</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-3 pl-6">
                          <div className="w-[90px] h-[90px] rounded-xl border-2 border-[#4C2F92] flex flex-col items-center justify-center gap-2 cursor-pointer" onClick={() => goTo(3)}>
                            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#4C2F92" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                            <p className="text-[11px] font-semibold text-[#1d1c1f]">Select a reward</p>
                          </div>
                          <button onClick={() => goTo(3)} className="text-[13px] text-[#4C2F92] font-bold hover:underline">Edit target reward</button>
                        </div>
                      </div>
                    </div>
                    {/* Right column: red member card with full-height border */}
                    <div className="hidden sm:flex flex-col border-l border-transparent w-[204px] shrink-0 items-center justify-start px-4 pt-[100px] pb-5">
                      <div className="w-[172px] h-[100px] rounded-xl flex-col justify-between p-4 text-white flex"
                           style={{ background: 'linear-gradient(135deg, #7A1515 0%, #C90000 100%)' }}>
                        <div className="flex items-center justify-end gap-1.5 text-[12px] font-medium opacity-90">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                          1227 062 631
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] text-white/70 mb-0.5">Member since 2024</p>
                          <p className="text-[28px] leading-none" style={{ fontWeight: 100 }}>Red</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-[1100px] mx-auto">
                  <div className="w-full border border-gray-200 rounded-xl overflow-hidden flex">
                    {/* Left column */}
                    <div className="flex-1 flex flex-col min-w-0">

                    {/* Card header */}
                    <div className="flex items-center gap-4 px-6 py-5">
                      <div className="w-[72px] h-[60px] rounded-xl bg-[#EDE8F7] shrink-0 overflow-hidden flex items-center justify-center">
                        <LionSprite variant="bubble" targetHeight={60} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-[20px] font-bold text-[#1d1c1f]">Good morning, {slot?.name?.split(' ')[0] || 'Kim'}!</h2>
                        <p className="text-[14px] text-[#575559]">Let's get you some points</p>
                      </div>
                    </div>
                    {/* Card content */}
                    <div className="flex justify-between items-stretch px-6 pb-6 relative">

                  {/* Left: Favourite ways to earn */}
                  <div className="flex-1 min-w-0 mr-8 xl:mr-12 relative flex flex-col gap-0">

                    <div className="relative w-full overflow-hidden pt-2 -mt-2">
                      {/* Left Gradient Mask & Arrow */}
                      {canScrollLeft && (
                        <div className="absolute -left-2 top-0 bottom-0 w-[140px] bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none flex items-center justify-start pb-12 pl-2">
                          <button
                            className="w-8 h-8 flex items-center justify-center text-[#323232] cursor-pointer pointer-events-auto hover:text-[#E40000] hover:scale-110 transition-all font-bold"
                            onClick={() => {
                              const el = document.getElementById('wte-scroll');
                              if (el) el.scrollBy({ left: -(el.clientWidth * 0.8), behavior: 'smooth' });
                            }}
                          >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                          </button>
                        </div>
                      )}

                      {/* Right Gradient Mask & Arrow */}
                      {canScrollRight && (
                        <div className="absolute -right-2 top-0 bottom-0 w-[140px] bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none flex items-center justify-end pb-12">
                          <button
                            className="w-8 h-8 flex items-center justify-center text-[#323232] cursor-pointer pointer-events-auto hover:text-[#E40000] hover:scale-110 transition-all font-bold"
                            onClick={() => {
                              const el = document.getElementById('wte-scroll');
                              if (el) el.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' });
                            }}
                          >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </button>
                        </div>
                      )}

                      <div
                        id="wte-scroll"
                        ref={wteScrollRef}
                        className="flex flex-nowrap overflow-x-auto gap-4 xl:gap-6 pb-2 no-scrollbar pr-12 relative"
                        onScroll={(e) => {
                          const { scrollLeft, scrollWidth, clientWidth } = e.target;
                          setCanScrollLeft(scrollLeft > 0);
                          setCanScrollRight(scrollWidth > clientWidth + 2 && scrollLeft + clientWidth < scrollWidth - 2);
                        }}
                      >
                        {selectedWTEs.map(({ id: stringId }) => {
                          const numericId = Number(stringId);
                          const wte = WTEs.find(w => w.id === numericId);
                          if (!wte) return null;

                          const earned = (displayEarnedByWTE || {})[numericId] || (displayEarnedByWTE || {})[String(numericId)] || 0;
                          const target = (current.monthlyTargetByWTE || {})[numericId] || (current.monthlyTargetByWTE || {})[String(numericId)] || 1;
                          const setupSteps = (current.setupProgressByWTE || {})[numericId] || 0;
                          const isActiveAnim = activeAnim && String(activeAnim.wteId) === String(stringId);

                          const percent = earned > 0
                            ? Math.min(100, Math.round((earned / target) * 100))
                            : (setupSteps / 4) * 100;

                          const isAnimating = activeAnim !== null || animationQueue.length > 0;
                          const metTarget = earned >= target;
                          const showHelpMe = (earned > 0 || current.dashboardIntroDismissed) && !isAnimating && !metTarget && earned > 0;

                          return (
                            <div key={numericId} className={`flex flex-col items-center w-[120px] shrink-0 relative transition-transform duration-500 ease-out ${isActiveAnim ? 'scale-[1.08]' : ''}`}>
                              <div className="relative w-[100px] h-[100px] mb-2">
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="50" cy="50" r="46" fill="none" stroke="#F3F5F7" strokeWidth="4" />
                                  <circle
                                    cx="50" cy="50" r="46" fill="none"
                                    stroke="#4C2F92"
                                    strokeWidth={isActiveAnim ? "5" : "4"}
                                    strokeDasharray={289}
                                    strokeDashoffset={289 - (289 * percent) / 100}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000"
                                    style={isActiveAnim ? { filter: 'drop-shadow(0 0 5px rgba(76,47,146,0.45))' } : {}}
                                  />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 pt-3">
                                  <img src={wte.iconSrc} alt={wte.name} className={`w-[32px] h-[32px] object-contain shrink-0 mb-1 transition-transform duration-300 ${isActiveAnim ? 'scale-110' : ''}`} />
                                  {isActiveAnim ? (
                                    <PointsDropAnimation addedPts={activeAnim.addedPts} />
                                  ) : (
                                    <>
                                      <div className="w-[40px] h-px bg-gray-300 mb-1.5" />
                                      <span className="text-[14px] font-medium text-gray-500 leading-none">{target.toLocaleString()}</span>
                                    </>
                                  )}
                                </div>
                                {/* Confetti burst */}
                                {isActiveAnim && <ConfettiBurst />}
                              </div>
                              <div className="relative mb-2">
                                {showHelpMe && (
                                  <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-[#E40000] rounded-full z-10" />
                                )}
                                <span
                                  className={`text-[13px] font-medium text-[#323232] text-center line-clamp-2 leading-tight block${showHelpMe ? ' cursor-pointer hover:text-[#E40000] transition-colors' : ''}`}
                                  onClick={showHelpMe ? () => { setHelpMeWteId(stringId); setHelpPhase(0); } : undefined}
                                >
                                  {wte.name}
                                </span>
                              </div>
                              {!(earned > 0 || current.dashboardIntroDismissed) && (
                                <div className="flex flex-col items-center h-[34px]">
                                  <button
                                    onClick={() => setShowOnboardingId(stringId)}
                                    className="bg-white border border-[#323232] rounded-[24px] px-5 h-[30px] flex items-center justify-center text-[13px] font-medium text-[#323232] hover:bg-gray-50 transition-colors leading-none pb-[1px]"
                                  >
                                    Set up
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Add New Slot */}
                        <div className="flex flex-col items-center gap-2 w-[120px] shrink-0 cursor-pointer group" onClick={() => goTo(3)}>
                          <div className="w-[90px] h-[90px] rounded-full border-2 border-[#4C2F92] flex items-center justify-center text-[#4C2F92] transition-colors mb-2">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                          <p className="text-[13px] font-semibold text-[#1d1c1f] text-center leading-snug">Add a way<br/>to earn</p>
                        </div>

                        {/* Flexible Promo Slot */}
                        {selectedWTEs.length === 1 && (
                          <div className="flex-1 min-w-[220px] max-w-[500px] border border-gray-200 rounded-xl p-5 ml-4">
                            <p className="text-[15px] font-bold text-[#1d1c1f] mb-2">Did you know?</p>
                            <p className="text-[13px] text-[#575559] leading-relaxed">
                              It's much easier to earn towards rewards quickly when you earn in a few ways.
                            </p>
                          </div>
                        )}
                      </div>
                      <button onClick={() => goTo(3)} className="text-[13px] text-[#4C2F92] font-bold hover:underline w-full text-center block mt-1">Edit target ways to earn</button>
                    </div>
                  </div>

                  {/* Right: Target Reward */}
                  <div className="flex items-stretch shrink-0">
                    <div className="w-px bg-gray-200 h-[120px] self-start"></div>
                    <div className="flex flex-col w-[164px] items-center pl-6">
                      <div className="w-full h-[100px] rounded-xl overflow-hidden cursor-pointer">
                        {selectedReward ? (
                          <ConnectedRewardCard reward={selectedReward} variant="mini" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2 border-2 border-[#4C2F92] rounded-xl" onClick={() => goTo(3)}>
                            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#4C2F92" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                            <p className="text-[13px] font-semibold text-[#1d1c1f]">Select a reward</p>
                          </div>
                        )}
                      </div>
                      {selectedReward && (
                        <p className="text-[13px] font-medium text-[#323232] text-center leading-tight mt-2">Velocity Reward Seat</p>
                      )}
                      <button onClick={() => goTo(3)} className="text-[13px] text-[#4C2F92] font-bold hover:underline w-full text-center mt-8">Edit target reward</button>
                    </div>
                  </div>

                </div>
                    </div>{/* end left column */}
                    {/* Right column: red member card with full-height border */}
                    <div className="hidden sm:flex flex-col border-l border-transparent w-[204px] shrink-0 items-center justify-start px-4 pt-[100px] pb-5">
                      <div className="w-[172px] h-[100px] rounded-xl flex flex-col justify-between p-4 text-white"
                           style={{ background: 'linear-gradient(135deg, #7A1515 0%, #C90000 100%)' }}>
                        <div className="flex items-center justify-end gap-1.5 text-[12px] font-medium opacity-90">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                          {slot?.memberNumber || '1227 062 631'}
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] text-white/70 mb-0.5">Member since 2024</p>
                          <p className="text-[28px] leading-none" style={{ fontWeight: 100 }}>Red</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <main className="sm:px-6 sm:pt-[20px] sm:pb-8">
                <div className="sm:max-w-[1100px] sm:mx-auto flex flex-col gap-4 sm:gap-5">
                    <FlightSearch />
                    <div className="sm:max-w-[1100px] sm:mx-auto w-full">
                        <div className="min-[1200px]:grid min-[1200px]:grid-cols-[362px_1fr] min-[1200px]:gap-6 min-[1200px]:items-start flex flex-col gap-4">
                            <VelocityPointsPanel
                                points={current?.currentPtsBalance || 0}
                                pointsThisMonth={Object.values(current?.monthlyEarnedByWTE || {}).reduce((a, b) => a + b, 0)}
                            />
                            <div>
                                <ForYouPanel />
                                <YourTrips />
                            </div>
                        </div>
                    </div>
                </div>
                <UsingYourPoints />
                <WhatsNews />
        </main>

        <SiteFooter />

      {/* Modals */}
      {showOnboardingId && (
        <OnboardingStepper
          wteId={showOnboardingId}
          onDone={() => setShowOnboardingId(null)}
        />
      )}

      {showWrapup && lastMonthData && (
        <MonthWrapUpModal
          data={lastMonthData}
          onClose={() => setShowWrapup(false)}
        />
      )}
      {/* Sparkle Animations */}
      {shootSparks && (() => {
        const mx = shootSparks.tx / 2;
        const my = shootSparks.ty / 2 - 70;
        return (
        <div className="fixed z-[9999] pointer-events-none" style={{ left: shootSparks.startX, top: shootSparks.startY }}>
          {[
            { delay: 0,   size: 22, blur: 3, bg: 'white',                   shadow: '0 0 22px 10px rgba(255,255,255,0.95), 0 0 44px 18px rgba(253,224,71,0.75)' },
            { delay: 55,  size: 17, blur: 3, bg: '#FEF08A',                  shadow: '0 0 16px 7px rgba(253,224,71,0.85)' },
            { delay: 110, size: 13, blur: 2, bg: '#FDE047',                  shadow: '0 0 12px 5px rgba(253,224,71,0.75)' },
            { delay: 165, size: 9,  blur: 2, bg: '#FCD34D',                  shadow: '0 0 8px 3px rgba(253,224,71,0.65)' },
            { delay: 220, size: 6,  blur: 2, bg: '#F59E0B',                  shadow: '0 0 6px 2px rgba(253,224,71,0.5)' },
            { delay: 275, size: 4,  blur: 1, bg: 'rgba(245,158,11,0.6)',     shadow: '0 0 4px 1px rgba(253,224,71,0.4)' },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute animate-shoot-sparkle"
              style={{
                left: -p.size / 2,
                top: -p.size / 2,
                '--tx': `${shootSparks.tx}px`,
                '--ty': `${shootSparks.ty}px`,
                '--mx': `${mx}px`,
                '--my': `${my}px`,
                animationDelay: `${p.delay}ms`,
              }}
            >
              <div style={{ width: p.size, height: p.size, backgroundColor: p.bg, borderRadius: '50%', filter: `blur(${p.blur}px)`, boxShadow: p.shadow }} />
            </div>
          ))}
        </div>
        );
      })()}
      {scatterSparks && (
        <div className="fixed z-[9999] pointer-events-none" style={{ left: scatterSparks.x, top: scatterSparks.y }}>
          {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const dist = 40 + Math.random() * 30;
            const sx = Math.cos(angle) * dist;
            const sy = Math.sin(angle) * dist;
            return (
              <div
                key={i}
                className="absolute animate-scatter-sparkle"
                style={{
                  left: -5,
                  top: -5,
                  '--sx': `${sx}px`,
                  '--sy': `${sy}px`
                }}
              >
                <div className="w-3 h-3 bg-yellow-300 rounded-full blur-[1px] shadow-[0_0_10px_3px_rgba(253,224,71,0.8)]" />
              </div>
            );
          })}
        </div>
      )}
      {completionBurst && (
        <div className="fixed z-[9999] pointer-events-none" style={{ left: completionBurst.x, top: completionBurst.y }}>
          {[...Array(14)].map((_, i) => {
            const angle = (i / 14) * Math.PI * 2;
            const dist = 30 + Math.random() * 50;
            const sx = Math.cos(angle) * dist;
            const sy = Math.sin(angle) * dist;
            const colors = ['white', '#FEF9C3', '#FDE047', '#FCD34D', '#F59E0B', 'white'];
            const size = 5 + Math.random() * 9;
            return (
              <div
                key={i}
                className="absolute animate-scatter-sparkle"
                style={{
                  left: -size / 2,
                  top: -size / 2,
                  '--sx': `${sx}px`,
                  '--sy': `${sy}px`,
                  animationDuration: `${0.7 + Math.random() * 0.4}s`,
                }}
              >
                <div style={{
                  width: size, height: size,
                  backgroundColor: colors[i % colors.length],
                  borderRadius: '50%',
                  filter: 'blur(1px)',
                  boxShadow: `0 0 ${size * 2}px ${size}px rgba(253,224,71,0.7)`,
                }} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


