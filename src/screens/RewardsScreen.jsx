// src/screens/RewardsScreen.jsx
import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect
} from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import ConnectedRewardCard from '../components/ConnectedRewardCard';
import {
  flightsList,
  hotelsList,
  activitiesList,
  marketplaceList,
  giftCardsList,
  entertainmentList,
  ORIGIN_CITY,
  SC_VALUES,
  SC_NAMES,
  calculateGroundSC
} from '../data';
import CategoryTabs from '../components/CategoryTabs';
import VelocityPointsIcon from '../assets/icons/velocity-points.svg';
import LeafletMap from '../components/LeafletMap';
import RewardCard from '../components/RewardCard';
import LionSprite from '../components/LionSprite';
import TierCard from '../components/TierCard';
import { maskPts } from '../utils/maskPts';
import HTMLTypewriter from '../components/HTMLTypewriter';

// Reward tab config
const rewardTabsConfig = [
  { key: 'Flights', label: 'REWARD FLIGHTS' },
  { key: 'Hotels', label: 'VELOCITY HOTELS' },
  { key: 'Activities', label: 'EXPERIENCES' },
  { key: 'Marketplace', label: 'MARKETPLACE' },
  { key: 'Gift Cards', label: 'GIFT CARDS' },
  { key: 'Entertainment', label: 'ENTERTAINMENT' },
];
const rewardTabKeys = rewardTabsConfig.map(t => t.key);
// Combine lists into a map
const useRewardsMap = () =>
  useMemo(
    () => ({
      Flights: flightsList,
      Hotels: hotelsList,
      Activities: activitiesList,
      Marketplace: marketplaceList,
      'Gift Cards': giftCardsList,
      Entertainment: entertainmentList
    }),
    []
  );

const TIER_BENEFITS_DATA = {
  0: [ // Bronze
    { id: 1, icon: 'lightning', text: 'Earn Velocity Points on Virgin Australia and partner airlines' },
    { id: 2, icon: 'chair', text: 'Access to Velocity Frequent Flyer member offers' },
    { id: 3, icon: 'award', text: 'Use points for Velocity Reward Seats' },
    { id: 4, icon: 'plane', text: 'Manage your bookings easily with the Virgin Australia App' },
    { id: 5, icon: 'bag', text: 'Earn Status Credits on eligible flights' },
    { id: 6, icon: 'ticket', text: 'Access to the Velocity Store for merchandise and gift cards' },
  ],
  1: [ // Silver
    { id: 1, icon: 'lightning', text: 'Earn 50% more Velocity Points on Virgin Australia and partner flights' },
    { id: 2, icon: 'chair', text: 'One Virgin Australia lounge invitation each year' },
    { id: 3, icon: 'award', text: 'Priority check-in counters' },
    { id: 4, icon: 'plane', text: 'Extra checked baggage allowance' },
    { id: 5, icon: 'bag', text: 'Priority baggage tagging' },
    { id: 6, icon: 'ticket', text: 'Waitlist priority for domestic and international flights' },
  ],
  2: [ // Gold
    { id: 1, icon: 'lightning', text: 'Earn 75% more Velocity Points on Virgin Australia and partner flights' },
    { id: 2, icon: 'chair', text: 'Access to over 600 lounges globally' },
    { id: 3, icon: 'award', text: 'Early access to Velocity Reward Seats' },
    { id: 4, icon: 'plane', text: 'On departure upgrades for domestic Virgin Australia operated flights when you use points' },
    { id: 5, icon: 'bag', text: 'Fast track to ALL - Accor Live Limitless Silver status after one eligible stay***' },
    { id: 6, icon: 'ticket', text: 'Premium boarding' },
  ],
  3: [ // Platinum
    { id: 1, icon: 'lightning', text: 'Earn 100% more Velocity Points on Virgin Australia and partner flights' },
    { id: 2, icon: 'chair', text: 'Access to Virgin Australia Business Class lounges' },
    { id: 3, icon: 'award', text: 'Highest priority for Velocity Reward Seats' },
    { id: 4, icon: 'plane', text: 'Highest priority for flight upgrades' },
    { id: 5, icon: 'bag', text: 'Priority First Class check-in' },
    { id: 6, icon: 'ticket', text: 'Priority baggage tagging (First)' },
  ],
  4: [ // Platinum (extended — unused in 4-tier Velocity system)
    { id: 1, icon: 'lightning', text: 'Earn points at the highest status bonus rate' },
    { id: 2, icon: 'chair', text: 'The highest priority for domestic and international flight upgrades' },
    { id: 3, icon: 'award', text: 'Platinum One Team available 24/7' },
    { id: 4, icon: 'plane', text: 'Complimentary Platinum status for a partner' },
    { id: 5, icon: 'bag', text: 'No fees for reward flight changes or cancellations' },
    { id: 6, icon: 'ticket', text: 'Complimentary Virgin Wines membership' },
  ],
  5: [ // Lifetime Tiers
    { id: 1, icon: 'lightning', text: 'Lifetime Silver at 7,000 Status Credits — status that never expires' },
    { id: 2, icon: 'chair', text: 'Lifetime Gold at 14,000 Status Credits' },
    { id: 3, icon: 'award', text: 'Lifetime Platinum at 75,000 Status Credits' },
    { id: 4, icon: 'plane', text: 'Status that never expires' },
    { id: 5, icon: 'bag', text: 'Enjoy benefits even when you fly less' },
    { id: 6, icon: 'ticket', text: 'A true mark of loyalty' },
  ]
};

const BenefitIcon = ({ name, className }) => {
  if (name === 'lightning') return (
    <div className={`w-12 h-12 rounded-full bg-[#B5A16E]/20 flex items-center justify-center ${className}`}>
      <svg className="w-6 h-6 text-[#B5A16E]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 10V3L4 14H11V21L20 10H13Z" />
      </svg>
    </div>
  );
  if (name === 'chair') return (
    <div className={`w-12 h-12 rounded-full bg-[#B5A16E]/20 flex items-center justify-center ${className}`}>
      <svg className="w-6 h-6 text-[#B5A16E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19 21V15M19 15V13C19 11.8954 18.1046 11 17 11H7C5.89543 11 5 11.8954 5 13V15M19 15H5M5 15V21M7 11V3M17 11V3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
  if (name === 'award') return (
    <div className={`w-12 h-12 rounded-full bg-[#B5A16E]/20 flex items-center justify-center ${className}`}>
      <svg className="w-6 h-6 text-[#B5A16E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="7" />
        <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
  if (name === 'plane') return (
    <div className={`w-12 h-12 rounded-full bg-[#B5A16E]/20 flex items-center justify-center ${className}`}>
      <svg className="w-6 h-6 text-[#B5A16E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 13L20 22L12 19L4 22L9 13M15 13L12 3L9 13M15 13H9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
  if (name === 'bag') return (
    <div className={`w-12 h-12 rounded-full bg-[#B5A16E]/20 flex items-center justify-center ${className}`}>
      <svg className="w-6 h-6 text-[#B5A16E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="7" width="18" height="13" rx="3" />
        <path d="M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7" />
      </svg>
    </div>
  );
  if (name === 'ticket') return (
    <div className={`w-12 h-12 rounded-full bg-[#B5A16E]/20 flex items-center justify-center ${className}`}>
      <svg className="w-6 h-6 text-[#B5A16E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M12 5V19M2 12H12M12 12H22M7 5V19M17 5V19" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
  return null;
};

export default function RewardsScreen({
  goTo,
  isEmbedded = false,
  desktopMode = false,
  containerRef = null,
  onboardingStep = null,
  onOnboardingAction = null,
  onboardingData = null
}) {
  const {
    current,
    updateSelectedWTU,
    updateSelectedRewardId,
    updateIsShowingHow,
    updateActiveDuoCard,
    updateFavouriteTierIndex,
    updateDismissedCoachings
  } = useSaveSlots();
  const rewardsMap = useRewardsMap();

  const [headlineDone, setHeadlineDone] = useState(false);
  const [typewriterDone, setTypewriterDone] = useState(false);

  useEffect(() => {
    setHeadlineDone(false);
    setTypewriterDone(false);
  }, [onboardingStep]);

  // Global state
  const totalAnnualPts = current?.totalAnnualPts ?? 0;
  const activeTabKey = current?.selectedWTU ?? rewardTabKeys[0];
  const globalSelectedRewardId = current?.selectedRewardId ?? null;
  const globalSelectedRewardCategory = current?.selectedRewardCategory ?? null;
  const favouriteTierIndex = current?.favouriteTierIndex ?? null;

  const hasFlights = current?.selectedWTEs?.some((w) => String(w.id) === '22');
  const flightTierIndex = hasFlights ? (current?.tierIndexById?.[22] ?? 2) : 0;
  const groundSC = calculateGroundSC(current?.selectedWTEs);
  const totalAnnualSC = SC_VALUES[Math.max(0, Math.min(4, flightTierIndex))] + groundSC;

  // Build flightPoints array for map (just flat list of flights)
  const flightPoints = useMemo(
    () => flightsList
      .filter(f => f.destCoords)
      .map(f => ({ ...f, lon: f.destCoords.lon, lat: f.destCoords.lat })),
    []
  );

  // Affordable flights for map
  const affordableFlightIds = useMemo(
    () => flightsList.filter(f => f.pts <= totalAnnualPts).map(f => f.id),
    [totalAnnualPts]
  );

  const [selectedHotelCity, setSelectedHotelCity] = useState('All');
  const [selectedActivityLocation, setSelectedActivityLocation] = useState('All');
  const [selectedMarketCategory, setSelectedMarketCategory] = useState('All');

  // All rewards for list view (sorted: affordable first, then unaffordable)
  const allRewards = useMemo(
    () => {
      let rewards = [...(rewardsMap[activeTabKey] || [])];
      if (activeTabKey === 'Hotels' && selectedHotelCity !== 'All') {
        rewards = rewards.filter(r => r.city === selectedHotelCity);
      }
      if (activeTabKey === 'Activities' && selectedActivityLocation !== 'All') {
        rewards = rewards.filter(r => r.city === selectedActivityLocation);
      }
      if (activeTabKey === 'Marketplace' && selectedMarketCategory !== 'All') {
        rewards = rewards.filter(r => r.marketCategory === selectedMarketCategory);
      }
      return rewards.sort((a, b) => {
        const aAffordable = a.pts <= totalAnnualPts;
        const bAffordable = b.pts <= totalAnnualPts;
        if (aAffordable && !bAffordable) return -1;
        if (!aAffordable && bAffordable) return 1;
        return a.pts - b.pts;
      });
    },
    [activeTabKey, totalAnnualPts, rewardsMap, selectedHotelCity, selectedActivityLocation, selectedMarketCategory]
  );

  // UI state
  const [expandedId, setExpandedId] = useState(null);
  const [pendingRewardId, setPendingRewardId] = useState(null);
  const [pendingRewardCategory, setPendingRewardCategory] = useState(null);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const [explorerMode, setExplorerMode] = useState((desktopMode || isEmbedded) ? null : 'rewards');
  const [explorerTierIndex, setExplorerTierIndex] = useState(null);

  useEffect(() => {
    if (explorerTierIndex === null && flightTierIndex !== null) {
      setExplorerTierIndex(flightTierIndex);
    }
  }, [flightTierIndex, explorerTierIndex]);

  const selectedRewardObj = useMemo(() => {
    const cat = globalSelectedRewardCategory || activeTabKey;
    const list = rewardsMap[cat] || [];
    return list.find(r => r.id === globalSelectedRewardId) || null;
  }, [rewardsMap, activeTabKey, globalSelectedRewardId, globalSelectedRewardCategory]);

  // Get the pending reward object for the modal
  const pendingRewardObj = useMemo(() => {
    if (!pendingRewardId || !pendingRewardCategory) return null;
    const list = rewardsMap[pendingRewardCategory] || [];
    return list.find(r => r.id === pendingRewardId) || null;
  }, [rewardsMap, pendingRewardId, pendingRewardCategory]);

  const isSelectedAffordable = useMemo(() => {
    return selectedRewardObj ? selectedRewardObj.pts <= totalAnnualPts : false;
  }, [selectedRewardObj, totalAnnualPts]);

  // Minimization state for mobile
  const [isMinimized, setIsMinimized] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);

  // Constants for minimizing logic
  const DRAGGABLE_HEIGHT = 420;
  const MINIMIZED_THRESHOLD = 120;
  const MINIMIZED_Y = DRAGGABLE_HEIGHT - 110;

  const toggleMinimized = () => setIsMinimized(!isMinimized);

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    let newOffset = isMinimized ? MINIMIZED_Y + diff : diff;
    if (newOffset < -30) newOffset = -30;
    if (newOffset > MINIMIZED_Y + 50) newOffset = MINIMIZED_Y + 50;
    setDragOffset(newOffset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (isMinimized) {
      if (dragOffset < MINIMIZED_Y - 50) setIsMinimized(false);
    } else {
      if (dragOffset > MINIMIZED_THRESHOLD) setIsMinimized(true);
    }
    setDragOffset(0);
  };

  const getTransform = () => {
    if (isDragging) return `translateY(${dragOffset}px)`;
    return isMinimized ? `translateY(${MINIMIZED_Y}px)` : 'translateY(0px)';
  };

  // Auto-minimize on mobile map view
  useEffect(() => {
    if (!desktopMode && !isEmbedded && activeTabKey === 'Flights') {
      setIsMinimized(true);
    } else {
      setIsMinimized(false);
    }
  }, [activeTabKey, desktopMode, isEmbedded]);

  const selectedRewardPts = pendingRewardObj?.pts ?? 0;
  const activeDuoCard = current?.activeDuoCard ?? null;

  // Sync ActiveDuoCard with favorites and affordability
  useEffect(() => {
    if (!(desktopMode || isEmbedded) || current?.isShowingHow) return;

    // 1. If active one becomes affordable or unset, clear it
    if (activeDuoCard === 'reward-guidance') {
      const isAffordable = totalAnnualPts >= selectedRewardPts;
      if (isAffordable || !globalSelectedRewardId) {
        updateActiveDuoCard(null);
      }
    } else if (activeDuoCard === 'tier-guidance') {
      const isAffordable = flightTierIndex >= (favouriteTierIndex ?? 999);
      if (isAffordable || favouriteTierIndex === null) {
        updateActiveDuoCard(null);
      }
    }

    // 2. Auto-trigger if nothing is active and something is newly unaffordable/favorited
    // (This handles the case where user favorites something then adjusts points)
    if (!activeDuoCard) {
      if (current?.hasSelectedReward && totalAnnualPts < selectedRewardPts) {
        const cid = `reward-${globalSelectedRewardId}`;
        if (!current?.dismissedCoachings?.includes(cid)) {
          updateActiveDuoCard('reward-guidance');
        }
      } else if (favouriteTierIndex !== null && flightTierIndex < favouriteTierIndex) {
        const cid = `tier-${favouriteTierIndex}`;
        if (!current?.dismissedCoachings?.includes(cid)) {
          updateActiveDuoCard('tier-guidance');
        }
      }
    }
  }, [totalAnnualPts, globalSelectedRewardId, favouriteTierIndex, flightTierIndex, activeDuoCard, selectedRewardPts, desktopMode, isEmbedded, current?.isShowingHow, current?.hasSelectedReward, current?.dismissedCoachings, updateActiveDuoCard]);

  // Handlers
  const handleTabChange = useCallback(key => {
    updateSelectedWTU(key);
    setExpandedId(null);
    // Clear pending state when switching tabs to avoid "ghost" highlights
    setPendingRewardId(null);
    setPendingRewardCategory(null);
  }, [updateSelectedWTU]);

  // Auto-set explorerMode when onboarding steps change
  useEffect(() => {
    if (onboardingStep === 9 || onboardingStep === 10) {
      setExplorerMode('rewards');
    } else if (onboardingStep === 11) {
      setExplorerMode('tiers');
    } else {
      setExplorerMode(null);
    }
  }, [onboardingStep]);

  const handleToggleExpand = useCallback(id => {
    setExpandedId(prev => (prev === id ? null : id));
  }, []);

  const handleSelectRewardOnMap = useCallback(id => {
    if (globalSelectedRewardId === id || pendingRewardId === id) {
      updateSelectedRewardId(null, null, false);
      setPendingRewardId(null);
      setPendingRewardCategory(null);
      updateActiveDuoCard(null);
      return;
    }

    // Check affordability
    const reward = flightPoints.find(r => r.id === id);
    const isAffordable = reward && reward.pts <= totalAnnualPts;

    // Always update the selected reward to reflect the user's latest choice
    updateSelectedRewardId(id, 'Flights', true);
    setUserHasInteracted(true);

    if (isAffordable) {
      // Clear any pending modal state
      setPendingRewardId(null);
      setPendingRewardCategory(null);
      // Only clear if we're not currently in an onboarding flow
      if (activeDuoCard !== 'onboarding') {
        updateActiveDuoCard(null);
      }
    } else {
      // Unaffordable - set pending for Duo guidance
      setPendingRewardId(id);
      setPendingRewardCategory('Flights');
      updateActiveDuoCard('reward-guidance');

      // Dismiss onboarding steps if active
      if ((onboardingStep >= 8 && onboardingStep <= 10) && onOnboardingAction) {
        onOnboardingAction();
      }

      // Animated transition: scroll to top first
      if ((desktopMode || isEmbedded) && containerRef?.current) {
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [flightPoints, totalAnnualPts, globalSelectedRewardId, pendingRewardId, updateSelectedRewardId, desktopMode, isEmbedded, containerRef, updateActiveDuoCard, onboardingStep, onOnboardingAction, activeDuoCard]);

  const handleSelectRewardInList = useCallback((id) => {
    if ((globalSelectedRewardId === id && globalSelectedRewardCategory === activeTabKey) ||
      (pendingRewardId === id && pendingRewardCategory === activeTabKey)) {
      updateSelectedRewardId(null, null, false);
      setPendingRewardId(null);
      setPendingRewardCategory(null);
      updateActiveDuoCard(null);
      return;
    }

    // Check affordability
    const list = rewardsMap[activeTabKey] || [];
    const reward = list.find(r => r.id === id);
    const isAffordable = reward && reward.pts <= totalAnnualPts;

    // Always update the selected reward to reflect the user's latest choice
    updateSelectedRewardId(id, activeTabKey, true);
    setUserHasInteracted(true);

    if (isAffordable) {
      // If affordable, select it immediately as explicit favourite
      setPendingRewardId(null);
      setPendingRewardCategory(null);
      // Only clear if we're not currently in an onboarding flow
      if (activeDuoCard !== 'onboarding') {
        updateActiveDuoCard(null);
      }
    } else {
      setPendingRewardId(id);
      setPendingRewardCategory(activeTabKey);
      updateActiveDuoCard('reward-guidance');

      // Dismiss onboarding steps if active
      if ((onboardingStep >= 8 && onboardingStep <= 10) && onOnboardingAction) {
        onOnboardingAction();
      }

      // Animated transition: scroll to top first
      if ((desktopMode || isEmbedded) && containerRef?.current) {
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [activeTabKey, rewardsMap, totalAnnualPts, globalSelectedRewardId, globalSelectedRewardCategory, pendingRewardId, pendingRewardCategory, updateSelectedRewardId, desktopMode, isEmbedded, containerRef, updateActiveDuoCard, onboardingStep, onOnboardingAction, activeDuoCard]);

  const handleCloseModal = useCallback(() => {
    setPendingRewardId(null);
    setPendingRewardCategory(null);
    // If we're still in the onboarding flow (steps 8 to 10), revert back to onboarding card
    if (onboardingStep !== null && onboardingStep <= 10) {
      updateActiveDuoCard('onboarding');
    } else {
      updateActiveDuoCard(null);
    }
  }, [updateActiveDuoCard, onboardingStep]);

  const handleShowMe = useCallback(() => {
    // First, set the selected reward
    if (pendingRewardId && pendingRewardCategory) {
      updateSelectedRewardId(pendingRewardId, pendingRewardCategory, true);
    }
    // Toggle the guidance to show on the left panel
    updateIsShowingHow(true);
    // Then navigate to WTE selection (step 3)
    if (!isEmbedded) goTo(3);
  }, [pendingRewardId, pendingRewardCategory, updateSelectedRewardId, goTo, isEmbedded, updateIsShowingHow]);

  const handleConfirmFavourite = useCallback(() => {
    // Confirm the currently selected reward (globalSelectedRewardId) as explicit
    if (globalSelectedRewardId && globalSelectedRewardCategory) {
      updateSelectedRewardId(globalSelectedRewardId, globalSelectedRewardCategory, true);
    }
    // Navigate back
    if (!isEmbedded) goTo(3);
  }, [globalSelectedRewardId, globalSelectedRewardCategory, updateSelectedRewardId, goTo, isEmbedded]);

  const handleGoBack = useCallback(() => !isEmbedded && goTo(3), [goTo, isEmbedded]);


  if (!current) return <div className="p-6 text-center">Loading rewards...</div>;

  const renderMapSection = () => {
    if (activeTabKey !== 'Flights') return null;
    const mapShellClass = desktopMode
      ? 'relative border border-gray-200 rounded-[12px] overflow-hidden h-[340px] lg:h-[380px] bg-white shrink-0'
      : 'flex-grow relative border-t border-b border-gray-200 min-h-[300px] shrink-0';
    return (
      <div className={`flex flex-col w-full ${desktopMode ? '' : 'h-full flex-grow'}`}>
        <div className={mapShellClass}>
          <LeafletMap
            flights={flightPoints}
            origin={ORIGIN_CITY.coords}
            selectedFlightId={globalSelectedRewardId}
            pendingFlightId={pendingRewardId}
            affordableIds={affordableFlightIds}
            onFlightClick={handleSelectRewardOnMap}
            isSelectionExplicit={current.hasSelectedReward || userHasInteracted}
          />
        </div>

        <div className={`mt-5 flex flex-wrap gap-2.5 shrink-0 ${desktopMode ? '' : 'px-4'}`}>
          <button className="bg-[#323232] text-white px-4 py-[7px] rounded-full text-[13px] font-medium leading-tight">Velocity Reward Seats</button>
          <button className="bg-white text-[#323232] border border-[#323232] px-4 py-[7px] rounded-full text-[13px] font-medium leading-tight hover:bg-gray-50 transition-colors">Any Seat Rewards</button>
          <button className="bg-white text-[#323232] border border-[#323232] px-4 py-[7px] rounded-full text-[13px] font-medium leading-tight hover:bg-gray-50 transition-colors">Points Plus Pay</button>
          <button className="bg-white text-[#323232] border border-[#323232] px-4 py-[7px] rounded-full text-[13px] font-medium leading-tight hover:bg-gray-50 transition-colors">Upgrades</button>
        </div>

        <p className={`mt-4 text-[13px] text-[#222] leading-relaxed shrink-0 max-w-[1000px] pb-6 ${desktopMode ? '' : 'px-4'}`}>
          Velocity Reward Seats are typically the best value reward seats you can book with Velocity Points, but availability is limited. For the best chance of booking a Velocity Reward Seat, be flexible with dates and times.
        </p>
      </div>
    );
  };

  const renderSelectedRewardPreview = () => {
    const cat = globalSelectedRewardCategory || activeTabKey;
    const list = rewardsMap[cat] || [];
    const sel = list.find(r => r.id === globalSelectedRewardId);

    if (!sel) return (
      <button
        onClick={() => setExplorerMode('rewards')}
        className="w-full aspect-[1.8/1] flex flex-col items-center justify-center p-6 text-[#758195] text-center text-[15px] font-medium border-2 border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors rounded-[14px] cursor-pointer"
      >
        Choose a reward
      </button>
    );

    return <ConnectedRewardCard key={globalSelectedRewardId || 'none'} reward={sel} />;
  };

  // Helper for coaching/Duo card
  const renderCoachingCard = (type) => {
    if (!(desktopMode || isEmbedded) || current?.isShowingHow) return null;

    const isReward = type === 'reward';

    // Character logic: Duo can only be in one place
    const isVisible = isReward
      ? (current?.activeDuoCard === 'reward-guidance')
      : (current?.activeDuoCard === 'tier-guidance');

    if (!isVisible) return null;

    const rewardId = pendingRewardObj?.id;
    const tierIndex = favouriteTierIndex;

    const coachingId = isReward ? `reward-${rewardId}` : `tier-${tierIndex}`;
    const alreadyDismissed = current?.dismissedCoachings?.includes(coachingId);

    if (alreadyDismissed) return null;

    const selectedRewardPts = pendingRewardObj?.pts ?? 0;
    const isUnaffordable = isReward
      ? (pendingRewardObj && selectedRewardPts > totalAnnualPts)
      : (favouriteTierIndex !== null && flightTierIndex < favouriteTierIndex);

    if (!isUnaffordable) return null;

    const title = isReward
      ? <>This reward is <span className="font-bold">{pendingRewardObj.pts.toLocaleString()}</span><span className="text-[10px] font-bold text-[#999999] ml-1 uppercase transition-colors group-hover:text-[#E40000]">PTS</span></>
      : <>This tier is <span className="font-bold">{SC_VALUES[favouriteTierIndex].toLocaleString()}</span><span className="text-[10px] font-bold text-[#999999] ml-1 uppercase">SC</span></>;

    const subtitle = isReward
      ? "I'll show you how you can earn the points, in one year."
      : "I'll show you how you can earn the status credits, in one year.";

    return (
      <div className={`mt-4 w-full animate-duo-entrance`}>
        <div className={`bg-[#E2F1F0] rounded-[16px] p-5 flex items-center space-x-4 relative overflow-hidden transition-all duration-300 shadow-sm border border-[#CDE5E3]`}>
          <button
            onClick={() => {
              updateDismissedCoachings(coachingId);
              // If we're still in the onboarding flow, revert back to onboarding card
              if (onboardingStep !== null && onboardingStep <= 10) {
                updateActiveDuoCard('onboarding');
              } else {
                updateActiveDuoCard(null);
              }
            }}
            className="absolute top-1.5 right-1.5 p-1 text-gray-500 hover:text-gray-700 transition-colors z-10"
            style={{ marginRight: 0, top: 4, right: 4 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="shrink-0 relative z-10" style={{ width: '130px', height: '140px' }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[10%]">
              <LionSprite variant="magic" scale={0.4} className="origin-bottom" />
            </div>
          </div>

          <div className="flex-grow pr-4 z-10 pb-1">
            <div className="text-[18px] text-[#222222] font-medium mb-1.5 leading-tight">
              {title}
            </div>
            <p className="text-[13px] text-[#222222] leading-[1.3] mb-4">
              {subtitle}
            </p>
            <button
              onClick={() => {
                if (isReward && pendingRewardId && pendingRewardCategory) {
                  updateSelectedRewardId(pendingRewardId, pendingRewardCategory, true);
                }
                updateIsShowingHow(true);
                if (!isEmbedded) goTo(3);
              }}
              className="bg-white text-[13px] font-bold text-[#E40000] px-5 py-2 rounded-full hover:bg-gray-50 transition-all active:scale-95 shadow-sm inline-flex items-center justify-center whitespace-nowrap"
              style={{ minWidth: '100px' }}
            >
              Show me how
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTierExplorer = () => {
    const activeTier = explorerTierIndex ?? 2;
    const benefits = TIER_BENEFITS_DATA[activeTier] || [];
    const tierOptions = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'PLATINUM ONE', 'LIFETIME TIERS'];

    return (
      <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white min-h-[500px]">
        {/* Tier Tabs */}
        <div className="w-full border-b border-gray-100 bg-white overflow-x-auto no-scrollbar shrink-0">
          <div className="inline-flex space-x-8 whitespace-nowrap px-8">
            {tierOptions.map((name, idx) => (
              <button
                key={name}
                onClick={() => setExplorerTierIndex(idx)}
                className={`text-[12px] whitespace-nowrap pb-3 transition-colors duration-300 relative ${activeTier === idx
                  ? 'text-red-600 font-medium'
                  : 'text-gray-800 font-normal hover:text-[#323232]'}`}
              >
                {name}
                {activeTier === idx && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600" />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-8" /> {/* Spacer */}

        {/* Benefits Section */}
        <div className="w-full px-8 pb-20 max-w-[1100px] mx-auto relative">
          <div className="flex items-center justify-center mb-12 relative w-full mx-auto">
            <h2 className="text-center text-[18px] font-medium text-[#323232]">
              Key benefits of {tierOptions[activeTier].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')} status
            </h2>

            {/* Heart Icon Toggle - Positioned top right of container */}
            <button
              onClick={() => {
                if (activeTier === 5) return; // Skip Lifetime Tiers
                if (favouriteTierIndex === activeTier) {
                  updateFavouriteTierIndex(null);
                  updateActiveDuoCard(null);
                } else {
                  updateFavouriteTierIndex(activeTier);
                  // Duo moves to the tier guidance if it's unaffordable
                  if (flightTierIndex < activeTier) {
                    updateActiveDuoCard('tier-guidance');

                    if (onboardingStep === 8 && onOnboardingAction) {
                      onOnboardingAction();
                    }

                    // Scroll to top to see Duo
                    if ((desktopMode || isEmbedded) && containerRef?.current) {
                      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }
                }
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 group transition-transform active:scale-95 z-20"
            >
              {favouriteTierIndex === activeTier ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[#E40000] animate-heart-burst">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-300 group-hover:text-gray-400 transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              )}
            </button>
          </div>


          <div className="grid grid-cols-3 gap-y-12 gap-x-8">
            {benefits.map(benefit => (
              <div key={benefit.id} className="flex flex-col items-center text-center group">
                <BenefitIcon name={benefit.icon} className="mb-4 transition-transform group-hover:scale-110 duration-300" />
                <p className="text-[12px] text-[#222222] leading-[1.6] max-w-[210px] regular">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDesktopHeaderContent = () => {
    return (
      <div className="flex flex-col xl:flex-row gap-8 p-6 mb-4">
        {/* Top/Left Column (Rewards) */}
        <div className="flex flex-col w-full xl:w-1/2 min-w-0 max-w-[440px]">
          {/* Target PTS Line */}
          <div className="flex items-center text-left mb-4">
            <span className="text-[14px] text-[#323232]">Target</span>
            <img src={VelocityPointsIcon} alt="" className="w-[16px] h-[18px] translate-y-[1px] inline mx-1.5" />
            <span className="text-[15px] font-bold text-[#323232]">
              {current?.opaqueEarn ? maskPts(totalAnnualPts) : totalAnnualPts.toLocaleString()} <span className="text-[10px] font-bold text-[#999999] uppercase">PTS</span>
            </span>
            <span className="text-[14px] text-[#323232] ml-1.5">a year from selected</span>
          </div>

          <div className="mb-2 text-[14px] text-[#323232]">
            {current?.hasSelectedReward ? 'Target reward' : 'Example reward'}
          </div>
          <div className="flex-grow">
            {renderSelectedRewardPreview()}
          </div>
          {renderCoachingCard('reward')}

          {(onboardingStep >= 8 && onboardingStep <= 10) && onboardingData && activeDuoCard === 'onboarding' && (
            <div className={`mt-4 w-full animate-duo-entrance`}>
              <div className={`bg-[#E2F1F0] rounded-[16px] p-5 flex items-center space-x-4 relative overflow-hidden transition-all duration-300 shadow-sm border border-[#CDE5E3]`}>
                <button onClick={() => updateActiveDuoCard(null)} className="absolute top-1.5 right-1.5 p-1 text-gray-500 hover:text-gray-700 transition-colors z-10" style={{ marginRight: 0, top: 4, right: 4 }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="shrink-0 relative z-10 animate-koala-drop-in" style={{ width: '130px', height: '140px' }}>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <LionSprite variant={onboardingStep >= 9 ? "down" : "coins"} scale={onboardingStep >= 9 ? 0.55 : 0.4} className="origin-bottom" />
                  </div>
                </div>
                <div className="flex-grow pr-4 z-10 pb-1">
                  <div className="text-[18px] text-[#222222] font-medium mb-1.5 leading-tight min-h-[30px]">
                    <HTMLTypewriter
                      html={onboardingData.title}
                      speed={40}
                      onComplete={() => setHeadlineDone(true)}
                    />
                  </div>
                  <div className="min-h-[50px]">
                    {headlineDone && (
                      <p className="text-[13px] text-[#222222] leading-[1.3] mb-4">
                        <HTMLTypewriter
                          html={onboardingData.text}
                          speed={30}
                          onComplete={() => setTypewriterDone(true)}
                        />
                      </p>
                    )}
                  </div>
                  <button
                    className={`bg-white text-[15px] font-semibold text-[#E40000] px-6 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-all active:scale-95 shadow-sm inline-flex items-center justify-center whitespace-nowrap ${typewriterDone ? 'animate-button-glow visible' : 'invisible'}`}
                    onClick={onOnboardingAction}
                    style={{ minWidth: '100px' }}
                  >
                    {onboardingData.buttonLabel}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-5 text-left">
            <button
              onClick={() => setExplorerMode(prev => prev === 'rewards' ? null : 'rewards')}
              className={`px-6 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 ${explorerMode === 'rewards' ? 'bg-[#323232] text-white shadow-md' : 'bg-white text-[#323232] border border-gray-200 hover:border-gray-300'}`}
            >
              Explore rewards
            </button>
          </div>
        </div>

        {/* Divider: Vertical on xl screens, Horizontal below xl */}
        <div className="hidden xl:block w-px bg-gray-200 shrink-0"></div>
        <div className="block xl:hidden h-px bg-gray-200 w-full shrink-0 -my-2"></div>

        {/* Bottom/Right Column (Tiers) */}
        <div className="flex flex-col w-full xl:w-1/2 min-w-0 max-w-[440px]">
          {/* Target SC Line */}
          <div className="flex items-center text-left mb-4">
            <span className="text-[14px] text-[#323232]">Target</span>
            <span className="text-[14px] font-bold text-[#E40000] ml-1.5 mr-0.5">★</span>
            <span className="text-[15px] font-bold text-[#323232]">
              {totalAnnualSC.toLocaleString()} <span className="text-[10px] font-bold text-[#999999] uppercase">SC</span>
            </span>
            <span className="text-[14px] text-[#323232] ml-1.5">a year from selected</span>
          </div>

          <div className="mb-2 text-[14px] text-[#323232]">
            {favouriteTierIndex !== null ? 'Target tier' : 'Example tier'}
          </div>
          <div className="flex-grow flex flex-col" style={{ alignSelf: 'stretch' }}>
            <TierCard
              tierIndex={favouriteTierIndex !== null ? favouriteTierIndex : flightTierIndex}
              isFavourite={favouriteTierIndex !== null}
              onToggleFavourite={() => {
                if (favouriteTierIndex !== null) {
                  updateFavouriteTierIndex(null);
                  updateActiveDuoCard(null);
                } else {
                  updateFavouriteTierIndex(flightTierIndex);
                }
              }}
            />
          </div>
          {renderCoachingCard('tier')}

          {onboardingStep === 11 && onboardingData && activeDuoCard === 'onboarding' && (
            <div className={`mt-4 w-full animate-duo-entrance`}>
              <div className={`bg-[#E2F1F0] rounded-[16px] p-5 flex items-center space-x-4 relative overflow-hidden transition-all duration-300 shadow-sm border border-[#CDE5E3]`}>
                <button
                  onClick={() => updateActiveDuoCard(null)}
                  className="absolute top-1.5 right-1.5 p-1 text-gray-500 hover:text-gray-700 transition-colors z-10"
                  style={{ marginRight: 0, top: 4, right: 4 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="shrink-0 relative z-10 animate-koala-drop-in" style={{ width: '130px', height: '140px' }}>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <LionSprite variant="bling" scale={0.55} className="origin-bottom" />
                  </div>
                </div>
                <div className="flex-grow pr-4 z-10 pb-1">
                  <div className="text-[18px] text-[#222222] font-medium mb-1.5 leading-tight min-h-[30px]">
                    <HTMLTypewriter
                      html={onboardingData.title}
                      speed={40}
                      onComplete={() => setHeadlineDone(true)}
                    />
                  </div>
                  <div className="min-h-[50px]">
                    {headlineDone && (
                      <p className="text-[13px] text-[#222222] leading-[1.3] mb-4">
                        <HTMLTypewriter
                          html={onboardingData.text}
                          speed={30}
                          onComplete={() => setTypewriterDone(true)}
                        />
                      </p>
                    )}
                  </div>
                  {typewriterDone && (
                    <button
                      className="bg-white text-[15px] font-semibold text-[#E40000] px-6 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-all active:scale-95 shadow-sm inline-flex items-center justify-center whitespace-nowrap animate-button-glow"
                      onClick={onOnboardingAction}
                      style={{ minWidth: '100px' }}
                    >
                      {onboardingData.buttonLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-5 text-left">
            <button
              onClick={() => setExplorerMode(prev => prev === 'tiers' ? null : 'tiers')}
              className={`px-6 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 ${explorerMode === 'tiers' ? 'bg-[#323232] text-white shadow-md' : 'bg-white text-[#323232] border border-gray-200 hover:border-gray-300'}`}
            >
              Explore tiers
            </button>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className={`${isEmbedded ? 'w-full' : 'fixed inset-0 bg-white z-40 flex flex-col h-full overflow-hidden'}`}>
      {/* Header - Only hide if embedded AND not desktop (or handled by parent) */}
      {!isEmbedded && (
        <div className="bg-white shadow-sm p-4 py-4 flex items-center shrink-0">
          <button onClick={handleGoBack} className="mr-4 text-gray-500 hover:text-red-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="text-[19px] font-medium text-[#323232]">
            Ways to use points
          </h1>
          <div className="flex-grow text-right">
            <button className="text-gray-400">
              <svg className="w-6 h-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 16v-4m0-4h.01" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Top Section */}
      {(desktopMode || isEmbedded) && (
        <div className="px-0 pt-0 shrink-0">
          {renderDesktopHeaderContent()}
        </div>
      )}

      {/* Tabs / Tier Explorer Header */}
      {explorerMode === 'rewards' ? (
        <div className={`shrink-0 py-0 border-b border-gray-100 bg-white ${isEmbedded ? '' : ''}`}>
          <CategoryTabs
            categories={rewardTabsConfig}
            activeCategory={activeTabKey}
            onCategoryChange={handleTabChange}
          />
        </div>
      ) : null}

      {/* Main Content (Map or List or Tier Explorer) */}
      <div className={`${isEmbedded ? 'w-full bg-gray-50' : 'flex-grow flex flex-col min-h-0 bg-gray-50 overflow-y-auto'}`}>
        {explorerMode === 'tiers' ? (
          renderTierExplorer()
        ) : explorerMode === 'rewards' ? (
          activeTabKey === 'Flights' ? (
            renderMapSection()
          ) : (
            <div>
              {activeTabKey === 'Hotels' && (
                <div className="bg-white px-4 py-3 border-b border-gray-100 flex justify-end sticky top-0 z-10 shrink-0">
                  <div className="relative">
                    <select
                      className="appearance-none bg-gray-50/80 hover:bg-gray-100 py-1.5 pl-3 pr-8 rounded-[8px] border border-gray-200 text-[13px] font-medium text-[#444] outline-none transition-colors cursor-pointer"
                      value={selectedHotelCity}
                      onChange={(e) => setSelectedHotelCity(e.target.value)}
                    >
                      <option value="All">All Cities</option>
                      <option value="Sydney">Sydney Hotels</option>
                      <option value="Melbourne">Melbourne Hotels</option>
                      <option value="Brisbane">Brisbane Hotels</option>
                      <option value="Perth">Perth Hotels</option>
                      <option value="Tokyo">Tokyo Hotels</option>
                      <option value="Bali">Bali Hotels</option>
                      <option value="Singapore">Singapore Hotels</option>
                      <option value="London">London Hotels</option>
                    </select>
                    <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              {activeTabKey === 'Activities' && (
                <div className="bg-white px-4 py-3 border-b border-gray-100 flex justify-end sticky top-0 z-10 shrink-0">
                  <div className="relative">
                    <select
                      className="appearance-none bg-gray-50/80 hover:bg-gray-100 py-1.5 pl-3 pr-8 rounded-[8px] border border-gray-200 text-[13px] font-medium text-[#444] outline-none transition-colors cursor-pointer"
                      value={selectedActivityLocation}
                      onChange={(e) => setSelectedActivityLocation(e.target.value)}
                    >
                      <option value="All">All Destinations</option>
                      <option value="Melbourne">Melbourne</option>
                      <option value="Las Vegas">Las Vegas</option>
                      <option value="Rome">Rome</option>
                      <option value="Paris">Paris</option>
                      <option value="London">London</option>
                      <option value="New York City">New York City</option>
                      <option value="Washington DC">Washington DC</option>
                      <option value="Cancun">Cancun</option>
                      <option value="Florence">Florence</option>
                      <option value="Barcelona">Barcelona</option>
                      <option value="Oahu">Oahu</option>
                    </select>
                    <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              {activeTabKey === 'Marketplace' && (
                <div className="bg-white px-4 py-3 border-b border-gray-100 flex justify-end sticky top-0 z-10 shrink-0">
                  <div className="relative">
                    <select
                      className="appearance-none bg-gray-50/80 hover:bg-gray-100 py-1.5 pl-3 pr-8 rounded-[8px] border border-gray-200 text-[13px] font-medium text-[#444] outline-none transition-colors cursor-pointer"
                      value={selectedMarketCategory}
                      onChange={(e) => setSelectedMarketCategory(e.target.value)}
                    >
                      <option value="All">All Categories</option>
                      <option value="Appliances">Appliances</option>
                      <option value="Home">Home</option>
                      <option value="Travel">Travel</option>
                      <option value="Sports, fitness and adventure">Sports, fitness and adventure</option>
                      <option value="Outdoor living">Outdoor living</option>
                      <option value="Women's fashion">Women's fashion</option>
                      <option value="Men's fashion">Men's fashion</option>
                      <option value="Baby, kids and toys">Baby, kids and toys</option>
                      <option value="Beauty, health and personal care">Beauty, health and personal care</option>
                      <option value="Virgin Australia merchandise">Virgin Australia merchandise</option>
                      <option value="Electronics">Electronics</option>
                    </select>
                    <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              {allRewards.map(r => {
                const isExpanded = expandedId === r.id;
                // Category-aware selection check
                const isSelected = globalSelectedRewardId === r.id && globalSelectedRewardCategory === activeTabKey;
                const isPending = pendingRewardId === r.id && pendingRewardCategory === activeTabKey;
                const isAffordable = r.pts <= totalAnnualPts;

                return (
                  <div key={r.id} className={`border-b border-gray-100 transition-colors duration-300 
                  ${isExpanded || isSelected || isPending ? 'bg-[#EEF7F8]' : isAffordable ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                    {/* Header Row */}
                    <div
                      className={`flex items-center cursor-pointer hover:bg-[#EEF7F8]/50 transition-colors group ${desktopMode ? 'py-2 px-3' : 'p-4'}`}
                      onClick={() => handleSelectRewardInList(r.id)}
                    >
                      {/* Selection Indicator / Icon Area */}
                      <div
                        className={`${desktopMode ? 'w-7 h-7 mr-3' : 'w-10 h-10 mr-4'} flex-shrink-0 flex items-center justify-center relative`}
                      >
                        {(isSelected || isPending) ? (
                          <div className={`${desktopMode ? 'w-[24px] h-[24px]' : 'w-10 h-10'} rounded-full flex items-center justify-center shadow-md animate-in fade-in zoom-in duration-200 ${isAffordable ? 'bg-[#E40000]' : 'bg-gray-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${desktopMode ? 'w-3.5 h-3.5' : 'w-6 h-6'} text-white`}>
                              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                          </div>
                        ) : (
                          <img src={r.icon} alt="" className={`${desktopMode ? 'w-full h-full' : 'w-8 h-8'} transition-opacity group-hover:opacity-100 ${isAffordable ? 'opacity-80' : 'opacity-40'}`} />
                        )}
                      </div>

                      {/* Reward Name Area (Selectable) */}
                      <div className="flex-grow pr-2">
                        <div className={`text-[12px] font-medium ${isAffordable ? 'text-[#323232]' : 'text-gray-400'}`}>{r.reward}</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center space-x-1.5 mb-1">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">USE</span>
                          <img src={VelocityPointsIcon} className={`w-3.5 h-3.5 ${isAffordable ? '' : 'opacity-40'}`} />
                          <span className={`text-[12px] font-medium ${isAffordable ? 'text-[#323232]' : 'text-gray-400'}`}>{r.pts.toLocaleString()}</span>
                          <span className={`text-[10px] font-bold ${isAffordable ? 'text-[#999999]' : 'text-gray-400'}`}>PTS</span>
                        </div>
                      </div>

                      {/* Arrow Glyph Area (Exclusive Expand) */}
                      <div
                        className={`ml-3 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleExpand(r.id);
                        }}
                      >
                        <svg className={desktopMode ? "w-4 h-4" : "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="px-4 pb-6 pl-[72px]">
                        {/* Description */}
                        {r.desc && (
                          <p className={`text-[12px] leading-relaxed mb-3 whitespace-pre-line ${isAffordable ? 'text-[#323232]' : 'text-gray-400'}`}>
                            {r.desc}
                          </p>
                        )}

                        {/* Link */}
                        {activeTabKey === 'Hotels' && r.propertyId ? (
                          <a
                            href={`https://www.qantas.com/hotels/properties/${r.propertyId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[12px] text-red-600 font-medium hover:underline flex items-center mb-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View property on qantas.com
                          </a>
                        ) : activeTabKey === 'Activities' && r.activityId ? (
                          <a
                            href={`https://activities.qantas.com.au/activity/${r.activityId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[12px] text-red-600 font-medium hover:underline flex items-center mb-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View activity on qantas.com
                          </a>
                        ) : activeTabKey === 'Marketplace' && r.marketplaceId ? (
                          <a
                            href={`https://marketplace.qantas.com/p/${r.marketplaceId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[12px] text-red-600 font-medium hover:underline flex items-center mb-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View item on Velocity eStore
                          </a>
                        ) : r.linkText ? (
                          <button
                            className="text-[12px] text-red-600 font-medium hover:underline flex items-center mb-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {r.linkText}
                          </button>
                        ) : null}

                        {/* Disclaimer */}
                        <div className="mt-4 border-t border-gray-100 pt-3">
                          <p className="text-[10px] text-gray-400 font-normal leading-relaxed">
                            Points shown are an illustrative example only. Actual points required may vary and are subject to availability, date, demand, and applicable booking or purchase conditions. Items, services, or experiences may not be available at all times. Taxes, fees or additional charges may apply.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {allRewards.length === 0 && (
                <div className="text-center text-gray-500 py-10 px-6">
                  No rewards available in this category.
                </div>
              )}
              {/* Bottom spacer for footer visibility */}
              <div className="h-[320px]"></div>
            </div>
          )
        ) : null}
      </div>

      {/* Footer Container - Hidden in desktopMode or embedded */}
      {!(desktopMode || isEmbedded) && (
        <div
          className={isEmbedded
            ? 'shrink-0 bg-white overflow-hidden pb-12'
            : 'shrink-0 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] rounded-t-[24px] relative z-[9000] transform transition-all duration-300 ease-out'
          }
          style={isEmbedded ? {} : {
            transform: getTransform(),
            transitionDuration: isDragging ? '0ms' : '400ms'
          }}
        >
          {/* Drag Handle */}
          {!isEmbedded && (
            <div
              className="flex justify-center pt-3 pb-1 cursor-pointer touch-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={toggleMinimized}
            >
              <div className="w-[40px] h-1.5 bg-gray-200 rounded-full" />
            </div>
          )}

          <div className="px-6 pb-6 pt-1">
            {/* Estimator Line */}
            <div className="text-center mb-4 flex justify-center items-center">
              {totalAnnualPts > 0 ? (
                <div className="flex items-baseline space-x-1 flex-wrap justify-center">
                  <span className="text-[15px] text-[#323232]">Target</span>
                  <img src={VelocityPointsIcon} alt="" className="w-[16px] h-[18px] translate-y-0.5" />
                  <span className="text-[16px] font-medium text-[#323232] leading-none">
                    {current?.opaqueEarn ? maskPts(totalAnnualPts) : totalAnnualPts.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-[#999999] uppercase">PTS</span>
                  <span className="text-[15px] text-[#323232] ml-1">a year from selected</span>
                </div>
              ) : (
                <span className="text-[15px] text-[#323232]">No ways to earn selected.</span>
              )}
            </div>

            {/* Conditional Content: Show reward selection panel OR normal favourite reward content */}
            {current?.activeDuoCard === 'reward-guidance' && pendingRewardObj ? (
              /* Reward Selection Panel + Grey Button */
              <>
                <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm relative mb-4">
                  {/* Close Button */}
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="p-5">
                    <div className="flex items-center space-x-4">
                      {/* Koala Sprite */}
                      <div className="shrink-0 flex items-end justify-center z-10" style={{ width: '130px', height: '140px' }}>
                        <LionSprite variant="down" scale={0.55} className="origin-bottom" />
                      </div>

                      {/* Content */}
                      <div className="flex-grow pr-4 z-10 pb-1">
                        <div className="text-[18px] text-[#222222] font-medium mb-1.5 leading-tight">
                          This reward is <span className="font-bold">{pendingRewardObj.pts.toLocaleString()}</span>
                          <span className="text-[14px] font-bold text-[#999999] ml-1">PTS</span>
                        </div>
                        <p className="text-[13px] text-[#222222] leading-[1.3] mb-4">
                          I'll show you how you can earn the points, in one year.
                        </p>
                      </div>
                    </div>

                    {/* Show Me Button */}
                    <button
                      onClick={handleShowMe}
                      className="w-full mt-5 py-4 bg-white border border-gray-100 text-[#E40000] font-bold tracking-[0.15em] text-[16px] rounded-[12px] active:scale-[0.98] transition-all uppercase shadow-md hover:bg-gray-50"
                    >
                      SHOW ME
                    </button>
                  </div>
                </div>

                {/* Grey Favourite Reward Button */}
                <button
                  disabled
                  className="w-full py-4 bg-gray-400 font-medium tracking-[0.1em] text-white text-[16px] rounded-[8px] uppercase flex items-center justify-center space-x-2 opacity-50 cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  <span>TARGET REWARD</span>
                </button>
              </>
            ) : (
              /* Normal Favourite Reward Content */
              <>
                {/* Labels Row */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[14px] font-medium text-[#323232]">
                    {current.hasSelectedReward ? 'Target reward' : 'Example reward'}
                  </span>
                  <button
                    onClick={handleGoBack}
                    className="text-[14px] font-medium text-red-600 hover:underline"
                  >
                    Explore ways to earn
                  </button>
                </div>

                {/* Card Preview */}
                <div className="mb-5">
                  {renderSelectedRewardPreview()}
                </div>

                {/* Main CTA */}
                <button
                  onClick={handleConfirmFavourite} // Confirm selection and navigate
                  disabled={!isSelectedAffordable}
                  className={`w-full py-4 bg-[#E40000] font-medium tracking-[0.1em] text-white text-[16px] rounded-[8px] active:scale-[0.98] transition-all uppercase flex items-center justify-center space-x-2
                        ${!isSelectedAffordable ? 'opacity-50 cursor-not-allowed bg-gray-400' : 'hover:bg-red-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  <span>TARGET REWARD</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Desktop Modal for Selection Guidance - REMOVED, now inline */}
    </div>
  );
}
