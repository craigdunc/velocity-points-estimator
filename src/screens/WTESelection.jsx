import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import {
  WTEs,
  WTE_HIERARCHY,
  flightsList,
  hotelsList,
  activitiesList,
  marketplaceList,
  giftCardsList,
  entertainmentList,
  calculateGroundSC,
  SC_VALUES
} from '../data';
import CategoryTabs from '../components/CategoryTabs';
import WTEList from '../components/WTEList';
import VelocityHeader from '../components/VelocityHeader';
import SiteFooter from '../components/SiteFooter';
import StickyFooter from '../components/StickyFooter';
import RewardsScreen from './RewardsScreen'; // Import RewardsScreen
import VelocityPointsIcon from '../assets/icons/velocity-points.svg';
import { useViewportMode } from '../hooks/useViewportMode';
import LionSprite from '../components/LionSprite';
import FlightsLogo from '../assets/icons/flights.svg';
import EarnExampleScreen from './EarnExampleScreen';
import FindOutMoreFlight from '../components/FindOutMoreFlight';
import FindOutMoreActivities from '../components/FindOutMoreActivities';
import FindOutMoreHolidays from '../components/FindOutMoreHolidays';
import FindOutMoreTAD from '../components/FindOutMoreTAD';
import FindOutMoreCruises from '../components/FindOutMoreCruises';
import FindOutMoreHotels from '../components/FindOutMoreHotels';
import FindOutMoreCars from '../components/FindOutMoreCars';
import FindOutMoreEveryday from '../components/FindOutMoreEveryday';
import FindOutMoreCards from '../components/FindOutMoreCards';
import FindOutMoreMarketplace from '../components/FindOutMoreMarketplace';
import FindOutMoreWine from '../components/FindOutMoreWine';
import FindOutMoreBinge from '../components/FindOutMoreBinge';
import FindOutMoreBP from '../components/FindOutMoreBP';
import FindOutMoreWellbeing from '../components/FindOutMoreWellbeing';
import FindOutMoreOnlineMall from '../components/FindOutMoreOnlineMall';
import FindOutMoreDirect from '../components/FindOutMoreDirect';
import FindOutMoreNoFeeCards from '../components/FindOutMoreNoFeeCards';
import HTMLTypewriter from '../components/HTMLTypewriter';
const rewardTabs = [
  'Flights', 'Hotels', 'Activities',
  'Marketplace', 'Gift Cards', 'Entertainment'
];

const useRewardsMap = () => useMemo(() => ({
  Flights: flightsList,
  Hotels: hotelsList,
  Activities: activitiesList,
  Marketplace: marketplaceList,
  'Gift Cards': giftCardsList,
  Entertainment: entertainmentList
}), []);

const ONBOARDING_STEPS = [
  {
    title: "Let's get started!",
    text: "Select ways of earning Velocity Points to add to your For You page. You can change your selection at any time.",
    buttonLabel: "Help me"
  },
  {
    title: "Ways to earn",
    text: "There are three main ways to earn in the program. We can take a look at each one-by-one.",
    buttonLabel: "OK"
  },
  {
    title: "Earn with Travel",
    text: "Travel with Virgin and our partners to earn loads of points, and look for ways you might earn with hotels and activities.",
    buttonLabel: "Next"
  },
  {
    title: "Tick it if you like it",
    text: "Tick the ways of earning that you think you might be able to use. These will become targets on your For You page.",
    buttonLabel: "Next"
  },
  {
    title: "Adjust how much",
    text: "You can adjust how much you might use this way of earning from a little to a lot.",
    buttonLabel: "Next"
  },
  {
    title: "Target how much",
    text: "The setting you choose for how much you might earn becomes a target. You can track towards this each month.",
    buttonLabel: "Next"
  },
  {
    title: "Shop everyday",
    text: "The shop category has all kinds of everyday shopping, online, lifestyle and utilities.",
    buttonLabel: "Next"
  },
  {
    title: "Big point bonuses",
    text: "The Banking and Insurance category is an important way of unlocking significant rewards.",
    buttonLabel: "Next"
  },
  {
    title: "Explore Rewards",
    text: "Based on what you have selected, you can see an example reward.",
    buttonLabel: "Next"
  },
  {
    title: "All kinds of rewards",
    text: "Reward flights are the most popular, but there are many kinds of rewards",
    buttonLabel: "Next"
  },
  {
    title: "Choose your own reward",
    text: "Choosing your own reward makes that the target amount of points you want to earn. I'll help you get there.",
    buttonLabel: "Great"
  },
  {
    title: "Good as gold",
    text: "Tiers give access to priority boarding, lounge access and other benefits.",
    buttonLabel: "Next"
  },
  {
    title: "Set things up, for yourself",
    text: "So take a look around and select some ways to earn that look good to you. When you’re set, go to the <b>My Velocity</b> page.",
    buttonLabel: "See you soon"
  }
];

const HOW_TO_EARN_STEPS = {
  shop_init: {
    title: (ptsLeft) => `How to earn ${ptsLeft.toLocaleString()} points.`,
    text: "Let's look at everyday earn to get the points you need.",
    buttons: [{ label: "OK", action: 'shop_1', openCategory: 'shop' }]
  },
  shop_1: {
    title: () => "Three main options",
    text: "Would you consider adding anything from the Everyday Shopping options?",
    buttons: [{ label: "Yes", action: 'shop_1_yes' }, { label: "No", action: 'shop_2' }]
  },
  shop_1_yes: {
    title: () => "Everyday Shopping",
    text: "Take a look at the options. Remember to open the dropdown and choose a target amount of points that looks right for you.",
    buttons: [{ label: "Done", action: 'shop_2' }]
  },
  shop_2: {
    title: () => "Two more options",
    text: "Would you consider Lifestyle, Retail & Entertainment options?",
    buttons: [{ label: "Yes", action: 'shop_2_yes' }, { label: "No", action: 'shop_3' }]
  },
  shop_2_yes: {
    title: () => "Lifestyle, Retail & Entertainment",
    text: "Try adding any of these that look right. Remember, online shopping and direct parthers are home to a range of individual options to explore later.",
    buttons: [{ label: "Done", action: 'shop_3' }]
  },
  shop_3: {
    title: () => "One more option",
    text: "Would you consider Home Utilities? The key option is Red Energy.",
    buttons: [{ label: "Yes", action: 'shop_3_yes' }, { label: "No", action: 'travel_init' }]
  },
  shop_3_yes: {
    title: () => "Home Utilities",
    text: "Try adding Red Energy. Remember to open the dropdown and choose a target amount of points that looks right for you.",
    buttons: [{ label: "Done", action: 'travel_init' }]
  },

  bank_init: {
    title: (ptsLeft) => `How to earn ${ptsLeft.toLocaleString()} points.`,
    text: "Let's look at banking and insurance to get the points you need.",
    buttons: [{ label: "OK", action: 'bank_1', openCategory: 'banking' }]
  },
  bank_1: {
    title: () => "Cards & Banking",
    text: "Would you like to explore credit card earning options?",
    buttons: [{ label: "Yes", action: 'bank_1_yes' }, { label: "No", action: 'bank_2' }]
  },
  bank_1_yes: {
    title: () => "Cards & Banking",
    text: "Take a look at the options. Remember to open the dropdown and choose a target amount of points that looks right for you.",
    buttons: [{ label: "Done", action: 'bank_2' }]
  },
  bank_2: {
    title: () => "Banking & Homeloans",
    text: "Exploring home loan options?",
    buttons: [{ label: "Yes", action: 'bank_2_yes' }, { label: "No", action: 'bank_3' }]
  },
  bank_2_yes: {
    title: () => "Banking & Homeloans",
    text: "Take a look at the options. Remember to open the dropdown and choose a target amount of points that looks right for you.",
    buttons: [{ label: "Done", action: 'bank_3' }]
  },
  bank_3: {
    title: () => "Insurance",
    text: "Do you need health, car or home insurance?",
    buttons: [{ label: "Yes", action: 'bank_3_yes' }, { label: "No", action: 'travel_init' }]
  },
  bank_3_yes: {
    title: () => "Insurance",
    text: "Take a look at the options. Remember to open the dropdown and choose a target amount of points that looks right for you.",
    buttons: [{ label: "Done", action: 'travel_init' }]
  },

  travel_init: {
    title: () => "Upcoming travel",
    text: "Do you have any travel planned in the next year?",
    buttons: [{ label: "Yes", action: 'travel_1', openCategory: 'travel' }, { label: "No", action: 'end' }]
  },
  travel_1: {
    title: () => "Flights",
    text: "Are you likely to take eligible flights?",
    buttons: [{ label: "Yes", action: 'travel_1_yes' }, { label: "No", action: 'travel_2' }]
  },
  travel_1_yes: {
    title: () => "Flights",
    text: "You can select the Virgin Australia & Partner Flights option. Remember to open the dropdown and choose a target amount of points that looks right for you.",
    buttons: [{ label: "Done", action: 'travel_2' }]
  },
  travel_2: {
    title: () => "Hotels & Accommodation",
    text: "Could you earn points on accommodation?",
    buttons: [{ label: "Yes", action: 'travel_2_yes' }, { label: "No", action: 'travel_3' }]
  },
  travel_2_yes: {
    title: () => "Hotels",
    text: "Take a look at the options. Remember to open the dropdown and choose a target amount of points that looks right for you.",
    buttons: [{ label: "Done", action: 'travel_3' }]
  },
  travel_3: {
    title: () => "Holidays, Activities & Experiences",
    text: "Would you consider earning points on holidays, tours and activities, or cruises?",
    buttons: [{ label: "Yes", action: 'travel_3_yes' }, { label: "No", action: 'travel_4' }]
  },
  travel_3_yes: {
    title: () => "Holidays, Activities & Experiences",
    text: "Take a look at the options. Remember to open the dropdown and choose a target amount of points that looks right for you.",
    buttons: [{ label: "Done", action: 'travel_4' }]
  },
  travel_4: {
    title: () => "Ground Transportation",
    text: "Need to rent a car?",
    buttons: [{ label: "Yes", action: 'travel_4_yes' }, { label: "No", action: 'end' }]
  },
  travel_4_yes: {
    title: () => "Ground Transportation",
    text: "Take a look at the options. Remember to open the dropdown and choose a target amount of points that looks right for you.",
    buttons: [{ label: "Done", action: 'end' }]
  },

  end: {
    title: (ptsLeft) => `You have ${Math.max(0, ptsLeft).toLocaleString()} points left!`,
    text: "Try looking through the ways to earn again for good opportunities we have missed.",
    buttons: [{ label: "Thanks", action: 'close' }]
  },

  sc_init: {
    title: () => "Flights for Status Credits.",
    text: "While there are some extra Status Credits earned on the ground, the key to reaching a tier is the qualifying flights you take.",
    buttons: [{ label: "OK", action: 'sc_1', openCategory: 'travel', expandId: 22 }]
  },
  sc_1: {
    title: () => "Set a flights target",
    text: "The slider here allows you to set a Virgin Australia and Partner Flight target to track towards the tier you want.",
    buttons: [{ label: "OK", action: 'sc_2' }]
  },
  sc_2: {
    title: () => "The calculator is your friend",
    text: "You can use the Earn Calculator to see how many status credits are earned on a Virgin Australia flight.",
    buttons: [{ label: "Take me there", action: 'close', url: "https://www.qantas.com/au/en/frequent-flyer/calculators.html" }]
  },

  victory_1: {
    title: () => "You did it!",
    text: "That's it. You have reached the number of points you need for your target reward. Are you happy with your choices?",
    buttons: [{ label: "Yes", action: 'victory_2' }]
  },
  victory_2: {
    title: () => "Give it a shot",
    text: "Remember, these targets are just an indication, and your real-world earn will vary. You can always adjust targets later.",
    buttons: [{ label: "OK, bye!", action: 'close' }]
  }
};

const LeisureIcon = () => (
  <div className="relative w-4 h-4 flex items-center justify-center">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E40000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#E40000] rounded-full border border-white" />
  </div>
);

const BuildingIcon = () => (
  <div className="w-4 h-4 flex items-center justify-center">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#323232" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </svg>
  </div>
);

const SC_GOALS = [0, 300, 700, 1400, 3600];
const SC_NAMES = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Platinum One'];

const toTitleCase = (str) => {
  const map = {
    'FLIGHTS': 'Flights',
    'HOLIDAYS, ACTIVITIES & EXPERIENCES': 'Holidays, Activities & Experiences',
    'HOTELS & ACCOMMODATION': 'Hotels & Accommodation',
    'GROUND TRANSPORTATION': 'Ground Transportation',
    'EVERYDAY SHOPPING': 'Everyday Shopping',
    'LIFESTYLE RETAIL & ENTERTAINMENT': 'Lifestyle Retail & Entertainment',
    'Home Utilities': 'Home Utilities',
    'CARDS & BANKING': 'Cards & Banking',
    'BANKING & HOMELOANS': 'Banking & Homeloans',
    'INSURANCE': 'Insurance'
  };
  return map[str] || str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

const FLIGHT_SC_LABELS = [
  'Low status target',
  'Medium-low status target',
  'Medium status target',
  'Medium-high status target',
  'High status target',
];

const CategoryHeader = ({ subCat, categoryPts, isGround, flightTierIdx = 2 }) => {
  const displayName = toTitleCase(subCat.label);
  const isFull = categoryPts >= 1000;
  const progressPercent = Math.min(100, (categoryPts / 1000) * 100);
  const scAmount = ['utilities', 'cards', 'homeloans', 'insurance'].includes(subCat.id) ? 20 : 10;
  const flightSCLabel = `${FLIGHT_SC_LABELS[flightTierIdx] ?? FLIGHT_SC_LABELS[2]}: ${SC_VALUES[flightTierIdx]?.toLocaleString() ?? 0} SC`;

  return (
    <div className="bg-white px-4 py-4 flex items-start gap-4">
      {/* Icon Box */}
      <div className={`rounded-[16px] bg-[#fdfdfd] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 transition-all duration-300 ${categoryPts === 0 ? 'w-[36px] h-[36px]' : 'w-[52px] h-[52px]'}`}>
        <img
          src={subCat.iconSrc}
          alt={subCat.label}
          className={`object-contain transition-all duration-300 ${categoryPts === 0 ? 'w-5 h-5' : 'w-8 h-8'}`}
        />
      </div>

      {/* Right Content */}
      <div className="flex-1 min-w-0 pt-[2px]">
        <h4 className={`text-[12px] font-medium text-[#323232] truncate leading-normal tracking-tight transition-all duration-300 ${categoryPts === 0 ? 'mb-0 translate-y-1.5' : 'mb-1.5'}`}>
          {displayName}
        </h4>

        {isGround ? (
          <div>
            {categoryPts > 0 && (
              <>
                {/* Progress Bar */}
                <div className="w-full h-[6px] bg-[#EAEAEA] rounded-full mb-2 overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${isFull ? 'bg-[#00a600] animate-celebrate-pop' : 'animate-progress-shimmer'}`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                {/* Bar Labels */}
                <div className="flex justify-between items-center text-[10px] xl:text-[12px]">
                  {isFull ? (
                    <div className="w-full flex items-center font-medium tracking-wide text-[#00a600] animate-counter-bump">
                      <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v1.447l-1 1-1-1V5a1 1 0 00-1-1H7a1 1 0 00-1 1v.447l-1 1-1-1V4zm0 2h1v1.447l-1 1V6zM3 8a1 1 0 00-1 1v2h16V9a1 1 0 00-1-1H3zm2 4v4h10v-4h2v5a1 1 0 01-1 1H4a1 1 0 01-1-1v-5h2z" />
                      </svg>
                      You could earn {scAmount} Status Credits
                    </div>
                  ) : (
                    <>
                      <span className="font-medium tracking-wide text-[#323232]">{categoryPts.toLocaleString()} / 1,000 PTS</span>
                      <span className="font-medium tracking-wide text-[#666] flex items-center">
                        <svg className="w-3.5 h-3.5 mr-1 text-[#888]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v1.447l-1 1-1-1V5a1 1 0 00-1-1H7a1 1 0 00-1 1v.447l-1 1-1-1V4zm0 2h1v1.447l-1 1V6zM3 8a1 1 0 00-1 1v2h16V9a1 1 0 00-1-1H3zm2 4v4h10v-4h2v5a1 1 0 01-1 1H4a1 1 0 01-1-1v-5h2z" />
                        </svg>
                        {scAmount} Status Credits
                      </span>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          categoryPts > 0 && (
            <div className="text-[10px] xl:text-[12px] font-medium tracking-wide text-[#323232] mt-2">
              {flightSCLabel}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default function WTESelection({ goTo, currentStepIndex, navPayload }) {
  // Category tabs for WTE selection - now based on Section Hierarchy
  const categories = useMemo(() => WTE_HIERARCHY.map(section => ({
    key: section.id,
    label: section.label.toUpperCase()
  })), []);

  const {
    slots,
    activeSlotId,
    current,
    updateSelectedRewardId,
    updateSelectedWTEs,
    updateTierIndex,
    updateActiveDuoCard,
    updateIsShowingHow
  } = useSaveSlots();
  const rewardsMap = useRewardsMap();

  const defaultTierIndexById = useMemo(() => {
    const acc = {};
    WTEs.forEach(w => (acc[w.id] = Math.floor((w.tiers?.length || 1) / 2)));
    return acc;
  }, []);

  // Responsive state
  const { viewportMode, isSplitView } = useViewportMode();
  const isMobile = viewportMode === 'mobile';

  // Persisted state or defaults
  const saved = current || {
    selectedWTEs: [],
    tierIndexById: defaultTierIndexById,
    totalAnnualPts: 0,
    selectedWTU: rewardTabs[0],
    selectedRewardId: null
  };

  const selectedWTEs = saved.selectedWTEs;
  const tierIndexById = saved.tierIndexById;
  const activeRewardTab = saved.selectedWTU;
  const selectedRewardIdFromSaved = saved.selectedRewardId;
  const totalAnnualPts = saved.totalAnnualPts;

  // UI state for filtering/list
  const [activeCategory, setActiveCategory] = useState(categories[0].key);
  const [expandedId, setExpandedId] = useState(navPayload?.initialExpandId ? Number(navPayload.initialExpandId) : null);
  const [collapsedCategories, setCollapsedCategories] = useState(new Set());
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [duoExpanded, setDuoExpanded] = useState(false);
  const [duoVisible, setDuoVisible] = useState(false);
  const [userInteractedWithSlider, setUserInteractedWithSlider] = useState(false);
  const [autoSliderTier, setAutoSliderTier] = useState(null); // local tier for instant animation

  // During auto-slider animation, override tier 22 with local state for instant visual update
  const effectiveTierIndexById = autoSliderTier !== null
    ? { ...tierIndexById, 11: autoSliderTier }
    : tierIndexById;
  const [showEarnExample, setShowEarnExample] = useState(false);
  const [showFindOutMore, setShowFindOutMore] = useState(navPayload?.openMoreInfo ?? false);
  const [headlineDone, setHeadlineDone] = useState(false);
  const [typewriterDone, setTypewriterDone] = useState(false);

  const [howPhase, setHowPhase] = useState(null);
  const [victorySeen, setVictorySeen] = useState(false);
  const [isVictoryActive, setIsVictoryActive] = useState(false);

  // If we came here with a specific WTE to expand, ensure the category is also correct
  useEffect(() => {
    if (navPayload?.initialExpandId) {
      const wte = WTEs.find(w => String(w.id) === String(navPayload.initialExpandId));
      if (wte) {
        // Find which top-level section contains this subCategory
        const section = WTE_HIERARCHY.find(s => s.categories.some(c => c.id === wte.subCategory));
        if (section) {
          setActiveCategory(section.id);
          // NEW: Ensure section is uncollapsed in split view
          setCollapsedCategories(prev => {
            const next = new Set(prev);
            next.delete(section.id);
            return next;
          });
        }
        setExpandedId(Number(navPayload.initialExpandId));
        if (navPayload.openMoreInfo) setShowFindOutMore(true);
      }
    }
  }, [navPayload]);

  const tabsRef = useRef(null);
  const rewardsContainerRef = useRef(null);
  const onboardingCardRef = useRef(null);

  useEffect(() => {
    if (current?.activeDuoCard === 'onboarding') {
      const expandTimer = setTimeout(() => setDuoExpanded(true), 300);
      const visibleTimer = setTimeout(() => setDuoVisible(true), 800);
      return () => {
        clearTimeout(expandTimer);
        clearTimeout(visibleTimer);
      };
    } else {
      setDuoExpanded(false);
      setDuoVisible(false);
    }
  }, [current?.activeDuoCard]);

  // Auto-pick best reward
  useEffect(() => {
    if (!current) return;
    if (current.hasSelectedReward) return;
    const pts = current.totalAnnualPts;
    const tabToUse = 'Flights';
    const list = rewardsMap[tabToUse] || [];
    const opts = list.filter(r => typeof r.pts === 'number' && r.pts <= pts);
    const best = opts.sort((a, b) => b.pts - a.pts)[0] || null;
    if (best?.id !== current.selectedRewardId) {
      updateSelectedRewardId(best?.id ?? null, tabToUse, false);
    }
  }, [current, current?.totalAnnualPts, current?.hasSelectedReward, current?.selectedRewardId, rewardsMap, updateSelectedRewardId]);

  const selectedRewardCategory = saved.selectedRewardCategory;
  const selectedReward = useMemo(() => {
    const cat = selectedRewardCategory || activeRewardTab;
    const list = rewardsMap[cat] || [];
    return list.find(r => r.id === selectedRewardIdFromSaved) || null;
  }, [rewardsMap, activeRewardTab, selectedRewardIdFromSaved, selectedRewardCategory]);

  const isTargetMode = Boolean(current?.hasSelectedReward && selectedReward && totalAnnualPts < selectedReward.pts);
  const ptsLeft = selectedReward ? Math.max(0, selectedReward.pts - totalAnnualPts) : 0;
  const progressPercent = selectedReward
    ? Math.min(100, Math.max(0, (totalAnnualPts / selectedReward.pts) * 100))
    : 0;

  const favouriteTierIndex = current?.favouriteTierIndex ?? null;
  const flightTierIndex = tierIndexById[11] ?? 0;

  const groundSC = useMemo(() => calculateGroundSC(selectedWTEs), [selectedWTEs]);

  const isSCTargetMode = favouriteTierIndex !== null && flightTierIndex < favouriteTierIndex;
  const targetSC = favouriteTierIndex !== null ? SC_GOALS[favouriteTierIndex] : 0;
  const currentSC = SC_GOALS[flightTierIndex] + groundSC;
  const scLeft = Math.max(0, targetSC - currentSC);
  const scProgressPercent = targetSC > 0 ? Math.min(100, (currentSC / targetSC) * 100) : 0;

  const prevPtsLeftRef = useRef(ptsLeft);

  useEffect(() => {
    prevPtsLeftRef.current = ptsLeft;
  }, [ptsLeft]);

  // Auto-trigger victory or init flow
  useEffect(() => {
    // If target reached organically (and we haven't seen victory)
    const justReached = prevPtsLeftRef.current > 0 && ptsLeft <= 0;
    if (current?.hasSelectedReward && ptsLeft <= 0 && justReached && !victorySeen && !isVictoryActive) {
      setIsVictoryActive(true);
      setHowPhase('victory_1');
      if (current.isShowingHow && updateIsShowingHow) {
        updateIsShowingHow(false);
      }
      return;
    }

    if (current?.isShowingHow && howPhase === null && !isVictoryActive) {
      if (current?.activeDuoCard === 'tier-guidance' || (isSCTargetMode && !current?.activeDuoCard?.startsWith('reward'))) {
        if (scLeft > 0 || current?.activeDuoCard === 'tier-guidance') {
          setCollapsedCategories(new Set(WTE_HIERARCHY.map(s => s.id))); // Collapse all
          setHowPhase('sc_init');
        } else {
          setHowPhase(null);
          if (updateIsShowingHow) updateIsShowingHow(false);
        }
      } else if (ptsLeft > 0) {
        setCollapsedCategories(new Set(WTE_HIERARCHY.map(s => s.id))); // Collapse all
        if (ptsLeft <= 10000) {
          setHowPhase('shop_init');
        } else {
          setHowPhase('bank_init');
        }
      } else {
        setHowPhase(null);
        if (updateIsShowingHow) updateIsShowingHow(false);
      }
    } else if (!current?.isShowingHow && !isVictoryActive && howPhase !== null) {
      setHowPhase(null);
    }
  }, [current, ptsLeft, scLeft, isSCTargetMode, howPhase, victorySeen, isVictoryActive, updateIsShowingHow]);

  useEffect(() => {
    setHeadlineDone(false);
    setTypewriterDone(false);
  }, [onboardingStep, howPhase]);

  const flightsPts = useMemo(() => {
    const flightWTE = WTEs.find(w => w.id === 11);
    const tierIdx = tierIndexById[11] ?? 2;
    return flightWTE ? (flightWTE.tiers[tierIdx]?.pts ?? 12000) : 12000;
  }, [tierIndexById]);
  const flightsMonthlyTarget = Math.round(flightsPts / 12);
  const earnedThisMonth = 500;
  const trackerPercent = Math.min(100, (earnedThisMonth / flightsMonthlyTarget) * 100);
  const trackerCircumference = 2 * Math.PI * 38;
  const trackerStrokeDashoffset = trackerCircumference - (trackerPercent / 100) * trackerCircumference;

  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const btn = container.querySelector(`[data-key="${activeCategory}"]`);
    if (!btn) return;
    const cw = container.offsetWidth;
    const center = btn.offsetLeft + btn.offsetWidth / 2;
    container.scrollTo({ left: center - cw / 2, behavior: 'smooth' });
  }, [activeCategory]);

  const handleTierChangeRef = useRef(null);

  // Auto-slide effect for onboarding step 4
  useEffect(() => {
    if (onboardingStep !== 4 || current?.activeDuoCard !== 'onboarding' || userInteractedWithSlider) return;

    setExpandedId(11); // Ensure the flights item is open when auto-slider runs
    setAutoSliderTier(2); // Reset to starting position

    let isCancelled = false;
    let timerId = null;
    let currentTier = 2; // Initial position after step 3 is '2'
    let direction = -1; // -1 means moving left, 1 means right

    const playSlider = () => {
      if (isCancelled) return;

      currentTier += direction;
      setAutoSliderTier(currentTier); // drive visual immediately via local state
      if (handleTierChangeRef.current) {
        handleTierChangeRef.current(11, currentTier, true);
      }

      if (currentTier <= 0) {
        currentTier = 0;
        direction = 1;
        timerId = setTimeout(playSlider, 1500); // 1.5s total = 500ms normal step + 1s hold
      } else if (currentTier >= 4) {
        currentTier = 4;
        direction = -1;
        timerId = setTimeout(playSlider, 1500);
      } else {
        timerId = setTimeout(playSlider, 400); // Move "not too fast"
      }
    };

    timerId = setTimeout(playSlider, 1000); // Initial hold before starting movement

    return () => {
      isCancelled = true;
      clearTimeout(timerId);
      setAutoSliderTier(null);
    };
  }, [onboardingStep, current?.activeDuoCard, userInteractedWithSlider]);

  const toggleSelectWTE = useCallback(id => {
    const curr = current?.selectedWTEs || [];
    const tiers = current?.tierIndexById || defaultTierIndexById;
    const exists = curr.some(w => w.id === id);
    const next = exists
      ? curr.filter(w => w.id !== id)
      : [...curr, { id, level: String(tiers[id] ?? defaultTierIndexById[id]) }];
    updateSelectedWTEs(next);
  }, [current, updateSelectedWTEs, defaultTierIndexById]);

  const toggleExpandWTE = useCallback(id => setExpandedId(prev => (prev === id ? null : id)), []);

  const handleTierChange = useCallback((id, idx, isAuto = false) => {
    if (!isAuto && onboardingStep === 4) {
      setUserInteractedWithSlider(true);
    }
    // updateTierIndex now handles both updating the numeric index map 
    // AND ensuring the item is added/updated in the selectedWTEs list.
    updateTierIndex(id, idx);
  }, [updateTierIndex, onboardingStep]);

  // Keep a fresh reference for the auto-slider logic
  useEffect(() => {
    handleTierChangeRef.current = handleTierChange;
  }, [handleTierChange]);

  const handleSeeMoreClick = useCallback(() => {
    scrollToWithOffset(rewardsContainerRef.current);
  }, []);
  const handleAddToDashboard = useCallback(() => goTo(5), [goTo]);

  const scrollToWithOffset = (el) => {
    if (!el) return;
    const nav = document.getElementById('velocity-subnav');
    const offset = (nav ? nav.offsetHeight : 57) + 8;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleOnboardingAction = useCallback(() => {
    if (onboardingStep === 0) {
      if (isSplitView) {
        setCollapsedCategories(new Set(categories.map(c => c.key)));
      } else {
        updateSelectedWTEs([]);
      }
      setOnboardingStep(1);
    } else if (onboardingStep === 1) {
      if (isSplitView) {
        setCollapsedCategories(prev => {
          const next = new Set(prev);
          next.delete('travel');
          return next;
        });
      }
      setOnboardingStep(2);
    } else if (onboardingStep === 2) {
      // Step 2 > Step 3 Transition
      // Demonstrate by selecting 'Virgin Australia & Partner Flights' (id: 11)
      const currWTEs = current?.selectedWTEs || [];
      const hasFlights = currWTEs.some(w => String(w.id) === '11');
      if (!hasFlights) {
        const newSelection = [...currWTEs, { id: 11, level: '2' }]; // Default to middle tier
        updateSelectedWTEs(newSelection);
      }
      setOnboardingStep(prev => prev + 1);
    } else if (onboardingStep === 3) {
      // Step 3 > Step 4 Transition
      // Demonstrate by opening 'Virgin Australia & Partner Flights' card
      if (expandedId !== 11) {
        setExpandedId(11);
      }
      setTimeout(() => {
        scrollToWithOffset(onboardingCardRef.current);
      }, 100);
      setOnboardingStep(prev => prev + 1);
    } else if (onboardingStep === 4) {
      // Step 4 > Step 5 Transition ("Choose a reward")
      if (isSplitView && rewardsContainerRef.current) {
        // Scroll the right column container into view
        scrollToWithOffset(rewardsContainerRef.current);
      }
      setOnboardingStep(prev => prev + 1);
    } else if (onboardingStep === 5) {
      if (isSplitView) {
        setCollapsedCategories(prev => {
          const next = new Set(prev);
          next.add('travel');
          next.delete('shop');
          return next;
        });
      } else {
        setActiveCategory('shop');
      }
      setTimeout(() => {
        scrollToWithOffset(onboardingCardRef.current);
      }, 100);
      setOnboardingStep(prev => prev + 1);
    } else if (onboardingStep === 6) {
      if (isSplitView) {
        setCollapsedCategories(prev => {
          const next = new Set(prev);
          next.add('shop');
          next.delete('banking');
          return next;
        });
      } else {
        setActiveCategory('banking');
      }
      setTimeout(() => {
        scrollToWithOffset(onboardingCardRef.current);
      }, 100);
      setOnboardingStep(prev => prev + 1);
    } else if (onboardingStep === 7) {
      // Step 7 > Step 8 Transition ("Explore Rewards" underneath the Reward Card)
      if (isSplitView) {
        setCollapsedCategories(prev => {
          const next = new Set(prev);
          next.add('banking');
          return next;
        });
        if (rewardsContainerRef.current) {
          scrollToWithOffset(rewardsContainerRef.current);
        }
      }
      setOnboardingStep(prev => prev + 1);
      setTimeout(() => {
        if (rewardsContainerRef.current) {
          scrollToWithOffset(rewardsContainerRef.current);
        }
      }, 100);
    } else if (onboardingStep >= 8 && onboardingStep <= 11) {
      if (onboardingStep === 11) {
        // Return to top-left for the final step
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setOnboardingStep(prev => prev + 1);
    } else if (onboardingStep < ONBOARDING_STEPS.length - 1) {
      setOnboardingStep(prev => prev + 1);
    } else {
      updateActiveDuoCard(null);
      setOnboardingStep(null); // Finish tour
    }
  }, [onboardingStep, isSplitView, categories, updateSelectedWTEs, updateActiveDuoCard, current, expandedId]);

  const handleHowAction = useCallback((action, openCategory, expandId) => {
    setHeadlineDone(false);
    setTypewriterDone(false);
    if (openCategory) {
      setCollapsedCategories(prev => {
        const next = new Set(prev);
        // Collapse all others
        WTE_HIERARCHY.forEach(s => {
          if (s.id !== openCategory) next.add(s.id);
        });
        // Open the target
        next.delete(openCategory);
        return next;
      });
      setTimeout(() => {
        scrollToWithOffset(onboardingCardRef.current);
      }, 100);
    }

    if (expandId !== undefined) {
      setExpandedId(expandId);
    }

    if (action === 'close') {
      setHowPhase(null);
      setIsVictoryActive(false);
      if (howPhase?.startsWith('victory')) {
        setVictorySeen(true);
      }
      if (current?.isShowingHow && updateIsShowingHow) {
        updateIsShowingHow(false);
      }
    } else {
      setHowPhase(action);
    }
  }, [current, updateIsShowingHow, howPhase]);

  const selectedIdsForList = useMemo(() => selectedWTEs.map(w => w.id), [selectedWTEs]);

  const renderHeader = () => (
    <VelocityHeader
      pointsBalance={current?.currentPtsBalance || 0}
      memberName={current?.name || slots.find(s => s.id === activeSlotId)?.name || 'Craig Duncan'}
      activeAccountTab="Earn"
      onAccountTabClick={(tab) => {
        if (tab === 'My Velocity') goTo(5);
        if (tab === 'Profile') goTo(7);
      }}
    />
  );

  const toggleCategory = useCallback((key) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const renderSplitViewSections = () => {
    const allCollapsed = WTE_HIERARCHY.every(s => collapsedCategories.has(s.id));
    const shouldAnimateBounce = onboardingStep === 1 && current?.activeDuoCard === 'onboarding' && allCollapsed;

    return (
      <div className="space-y-4">
        {WTE_HIERARCHY.map((section, idx) => {
          const isCollapsed = collapsedCategories.has(section.id);
          return (
            <section key={section.id} className={shouldAnimateBounce ? `animate-seq-bounce delay-${idx}` : ''}>
              <div
                className={`flex items-center justify-between mb-1.5 px-1 cursor-pointer select-none group`}
                onClick={() => toggleCategory(section.id)}
              >
                <h3 className="text-[12px] font-medium tracking-wide text-[#666] uppercase leading-none group-hover:text-[#323232] transition-colors">
                  {section.label}
                </h3>
                <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {!isCollapsed && (
                <div className="bg-white rounded-[12px] border border-gray-100 overflow-hidden shadow-sm">
                  {section.categories.map((subCat, idx) => {
                    const items = WTEs.filter(w => w.subCategory === subCat.id);
                    if (items.length === 0) return null;

                    const isGround = subCat.id !== 'flights';
                    const categoryPts = items.reduce((sum, w) => {
                      const sel = selectedWTEs.find(s => s.id === w.id);
                      if (sel) {
                        const tierIdx = parseInt(sel.level, 10);
                        return sum + (w.tiers[tierIdx]?.pts || 0);
                      }
                      return sum;
                    }, 0);

                    return (
                      <div key={subCat.id} className={idx > 0 ? "border-t border-gray-100" : ""}>
                        <WTEList
                          WTEs={WTEs}
                          items={items}
                          selectedIds={selectedIdsForList}
                          expandedId={expandedId}
                          tierIndexById={effectiveTierIndexById}
                          onToggleSelect={toggleSelectWTE}
                          onToggleExpand={toggleExpandWTE}
                          onTierChange={handleTierChange}
                          onToggleEarnExample={() => {
                            if (showEarnExample) {
                              setShowEarnExample(false);
                            } else {
                              setShowEarnExample(true);
                              setShowFindOutMore(false);
                              if (isSplitView) {
                                setTimeout(() => {
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }, 100);
                              }
                            }
                          }}
                          isEarnExampleOpen={showEarnExample}
                          onToggleFindOutMore={() => {
                            if (showFindOutMore) {
                              setShowFindOutMore(false);
                            } else {
                              setShowFindOutMore(true);
                              setShowEarnExample(false);
                              if (isSplitView) {
                                setTimeout(() => {
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }, 100);
                              }
                            }
                          }}
                          isFindOutMoreOpen={showFindOutMore}
                          compact={true}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    );
  };

  const renderMobileList = () => {
    const section = WTE_HIERARCHY.find(s => s.id === activeCategory);
    if (!section) return null;
    return (
      <div className="bg-white">
        {section.categories.map((subCat, idx) => {
          const items = WTEs.filter(w => w.subCategory === subCat.id);
          if (items.length === 0) return null;

          const isGround = subCat.id !== 'flights';
          const categoryPts = items.reduce((sum, w) => {
            const sel = selectedWTEs.find(s => s.id === w.id);
            if (sel) {
              const tierIdx = parseInt(sel.level, 10);
              return sum + (w.tiers[tierIdx]?.pts || 0);
            }
            return sum;
          }, 0);

          return (
            <div key={subCat.id} className={`mt-2 ${idx > 0 ? "border-t border-gray-100" : ""}`}>
              <WTEList
                WTEs={WTEs}
                items={items}
                selectedIds={selectedIdsForList}
                expandedId={expandedId}
                tierIndexById={effectiveTierIndexById}
                onToggleSelect={toggleSelectWTE}
                onToggleExpand={toggleExpandWTE}
                onTierChange={handleTierChange}
                onToggleEarnExample={() => {
                  if (showEarnExample) {
                    setShowEarnExample(false);
                  } else {
                    setShowEarnExample(true);
                    setShowFindOutMore(false);
                    if (isSplitView) {
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 100);
                    }
                  }
                }}
                isEarnExampleOpen={showEarnExample}
                onToggleFindOutMore={() => {
                  if (showFindOutMore) {
                    setShowFindOutMore(false);
                  } else {
                    setShowFindOutMore(true);
                    setShowEarnExample(false);
                    if (isSplitView) {
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 100);
                    }
                  }
                }}
                isFindOutMoreOpen={showFindOutMore}
              />
            </div>
          );
        })}
      </div>
    );
  };

  if (!current) return <div className="p-6 text-center">Loading selection...</div>;

  return (
    <div className={`${isSplitView ? 'w-full bg-white min-h-screen flex flex-col' : 'max-w-md mx-auto pb-[500px] relative bg-white'}`}>
      {renderHeader()}
      <div className={isSplitView ? "max-w-[1400px] mx-auto px-4 md:px-6 xl:px-8 mt-4 md:mt-6 mb-20 flex-grow w-full" : ""}>
        {isSplitView && (
          <h1 className="text-[28px] font-bold text-[#323232] mt-4 mb-4" style={{ fontFamily: 'GT America Extended, sans-serif' }}>
            Select my ways to earn and redeem points
          </h1>
        )}

        {/* Selected WTE Chips */}
        {selectedWTEs.length > 0 && (
          <div className="flex overflow-x-auto pb-4 gap-2 mb-2 no-scrollbar px-4 -mx-4 md:px-0 md:mx-0">
            {selectedWTEs.map(w => {
              const fullWTE = WTEs.find(item => item.id === w.id);
              if (!fullWTE) return null;
              return (
                <button
                  key={w.id}
                  onClick={() => toggleSelectWTE(w.id)}
                  className="group flex items-center whitespace-nowrap px-3.5 py-[5px] bg-[#E1F5F5] hover:bg-white text-[#494A62] text-[13px] md:text-[12px] font-medium rounded-[8px] shrink-0 border border-transparent hover:border-[#D4D4E4] transition-colors cursor-pointer"
                  aria-label={`Deselect ${fullWTE.name}`}
                >
                  <svg className="w-[12px] h-[12px] md:w-[11px] md:h-[11px] mr-2 stroke-[3px] group-hover:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.5l4 4L19.5 7" />
                  </svg>
                  {fullWTE.name}
                  <svg className="w-[12px] h-[12px] md:w-[11px] md:h-[11px] ml-2 stroke-[3px] hidden group-hover:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              );
            })}
          </div>
        )}
        <div className={isSplitView ? "flex gap-4 xl:gap-8 items-start" : ""}>
          <div className={isSplitView ? "w-[320px] xl:w-[380px] shrink-0 sticky top-6 h-[calc(100vh-48px)] overflow-y-auto pb-20 pr-[10px]" : ""}>
            {isSCTargetMode && (
              <div className={`${isSplitView ? 'mb-2' : 'px-3 pb-2 bg-gray-100'}`}>
                <div className="bg-white border-b border-gray-100">
                  <div className="flex items-center justify-between px-2 py-2">
                    <div className="flex items-center space-x-3">
                      {/* Heart icon in circle matching WTE icon size */}
                      <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#323232]">
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                      </div>
                      {/* Text aligned with WTE item name */}
                      <div className="flex items-center space-x-1">
                        <span className="text-[12px] text-[#323232]">Target tier:</span>
                        <span className="text-[14px] font-bold text-[#E40000] ml-1 mr-0.5">★</span>
                        <span className="text-[12px] font-medium text-[#323232]">{targetSC.toLocaleString()}</span>
                        <span className="text-[10px] font-medium text-[#999999] uppercase">SC</span>
                      </div>
                    </div>
                    <div className="bg-[#FFF1F1] px-2 py-1 rounded-[6px] flex items-center space-x-1 border border-[#FED7D7]">
                      <span className="text-[11px] font-bold text-[#E40000]">{scLeft.toLocaleString()} left</span>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-gray-100 overflow-hidden">
                    <div className="h-full bg-[#E40000] transition-all duration-500 ease-out" style={{ width: `${scProgressPercent}%` }} />
                  </div>
                </div>
              </div>
            )}
            {isTargetMode && (
              <div className={`${isSplitView ? 'mb-2' : 'px-3 pb-2 bg-gray-100'}`}>
                <div className="bg-white border-b border-gray-100">
                  <div className="flex items-center justify-between px-2 py-2">
                    <div className="flex items-center space-x-3">
                      {/* Heart icon in circle matching WTE icon size */}
                      <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#323232]">
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                      </div>
                      {/* Text aligned with WTE item name */}
                      <div className="flex items-center space-x-1">
                        <span className="text-[12px] text-[#323232]">Target reward:</span>
                        <img alt="" className="w-[15px] h-[17px]" src="data:image/svg+xml,%3csvg%20width='27'%20height='24'%20viewBox='0%200%2027%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M26.0576%2023.6163C26.0794%2023.639%2026.1012%2023.639%2026.1232%2023.639C26.167%2023.639%2026.1891%2023.639%2026.2329%2023.5933C26.2764%2023.5476%2026.2764%2023.4564%2026.2329%2023.4107C23.6278%2020.5556%2020.4319%2018.249%2016.8637%2016.7647C15.7692%2016.3078%2015.7692%2016.3078%2015.7692%2016.3078C15.1999%2016.0563%2014.8279%2015.4856%2014.8279%2014.8232C14.8935%2012.3795%2020.4099%2012.882%2020.9791%2011.7171C21.0668%2011.5116%2021.0668%2011.5116%2021.0668%2011.5116C19.9284%2010.4838%2018.5929%209.73024%2017.1046%209.2964C17.0828%209.36483%2017.0387%209.63882%2017.3451%2010.1641C17.6738%2010.7123%2016.9949%2011.603%2015.988%2010.6439C15.9004%2010.5752%2015.9004%2010.5752%2015.9004%2010.5752C8.58908%203.58648%205.21819%208.19991%200.2491%200.0695199C0.20529%200.000828303%200.139698%20-0.0218967%200.0738597%200.0238116C0.00826853%200.0695199%20-0.0137602%200.137953%200.00826853%200.206386C3.92666%2010.0499%2011.9384%207.97163%2012.8797%2017.1528C12.9235%2017.4955%2013.1644%2017.7695%2013.4926%2017.8152C17.9362%2018.546%2022.2707%2020.4645%2026.0358%2023.6163H26.0576'%20fill='%23E40000'/%3e%3c/svg%3e" />
                        <span className="text-[12px] font-medium text-[#323232]">{selectedReward.pts.toLocaleString()}</span>
                        <span className="text-[10px] font-medium text-[#999999] uppercase">PTS</span>
                      </div>
                    </div>
                    <div className="bg-[#E1F5F5] px-2 py-1 rounded-[6px] flex items-center space-x-1 border border-[#C5EDED]">
                      <span className="text-[11px] font-bold text-[#007A7A]">{ptsLeft.toLocaleString()} left</span>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-gray-100 overflow-hidden">
                    <div className="h-full animate-progress-shimmer transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              </div>
            )}

            {/* The HOW TO EARN Coaching Card */}
            {howPhase && HOW_TO_EARN_STEPS[howPhase] && (
              <div ref={onboardingCardRef} className={`animate-onboarding-expand mb-4 ${isSplitView ? '' : 'px-3'}`}>
                <div className={`onboarding-card-content visible`}>
                  <div className={`bg-[#E2F1F0] rounded-[16px] p-5 flex items-center space-x-4 relative overflow-hidden transition-all duration-300 shadow-sm border border-[#CDE5E3]`}>
                    <button onClick={() => handleHowAction('close')} className="absolute top-1.5 right-1.5 p-1 text-gray-500 hover:text-gray-700 transition-colors z-10" style={{ marginRight: 0, top: 4, right: 4 }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div key={howPhase} className="shrink-0 relative z-10 animate-koala-drop-in" style={{ width: '100px', height: '140px' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <LionSprite
                          variant={howPhase.startsWith('victory') ? 'bling' : (howPhase.includes('travel') || howPhase.includes('sc_')) ? 'travel' : howPhase.includes('bank') ? 'card' : 'shop'}
                          scale={0.33}
                          className="origin-bottom"
                        />
                      </div>
                    </div>
                    <div className="flex-grow pr-4 z-10 pb-1">
                      <div className="text-[18px] text-[#222222] font-medium mb-1.5 leading-tight min-h-[30px]">
                        <HTMLTypewriter
                          key={`${howPhase}-title`}
                          html={HOW_TO_EARN_STEPS[howPhase].title(ptsLeft)}
                          speed={40}
                          onComplete={() => setHeadlineDone(true)}
                        />
                      </div>
                      <div className="min-h-[50px]">
                        <p className={`text-[13px] text-[#222222] leading-[1.3] mb-4 ${headlineDone ? '' : 'invisible'}`}>
                          <HTMLTypewriter
                            key={headlineDone ? `${howPhase}-text` : `${howPhase}-hidden`}
                            html={HOW_TO_EARN_STEPS[howPhase].text}
                            speed={headlineDone ? 30 : 99999}
                            onComplete={headlineDone ? () => setTypewriterDone(true) : undefined}
                          />
                        </p>
                      </div>
                      <div className="flex gap-2 relative min-h-[40px]">
                        {typewriterDone && HOW_TO_EARN_STEPS[howPhase].buttons.map((btn, idx) => (
                          <button
                            key={idx}
                            className={`bg-white text-[15px] font-semibold text-[#E40000] px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-all active:scale-95 shadow-sm inline-flex items-center justify-center whitespace-nowrap animate-button-glow visible`}
                            onClick={() => {
                              if (btn.url) window.open(btn.url, '_blank');
                              handleHowAction(btn.action, btn.openCategory, btn.expandId);
                            }}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(ONBOARDING_STEPS[onboardingStep] && current?.activeDuoCard === 'onboarding' && !howPhase && !isVictoryActive && (onboardingStep < 8 || onboardingStep === 12)) && (
              <div ref={onboardingCardRef} className={`animate-onboarding-expand ${duoExpanded ? 'expanded mb-4' : ''} ${isSplitView ? '' : 'px-3'}`}>
                <div className={`onboarding-card-content ${duoVisible ? 'visible' : ''}`}>
                  <div className={`bg-[#E2F1F0] ${onboardingStep === 5 ? 'rounded-t-[16px]' : 'rounded-[16px]'} p-5 flex items-center space-x-4 relative overflow-hidden transition-all duration-300`}>
                    <button onClick={() => updateActiveDuoCard(null)} className="absolute top-1.5 right-1.5 p-1 text-gray-500 hover:text-gray-700 transition-colors z-10" style={{ marginRight: 0, top: 4, right: 4 }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div key={onboardingStep} className="shrink-0 relative z-10 animate-koala-drop-in" style={{ width: '100px', height: '140px' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%)${(onboardingStep === 0 || onboardingStep === 9) ? ' translateY(20px)' : (onboardingStep === 8) ? ' translateY(30px)' : ''}` }}>
                        <LionSprite
                          variant={['down', 'ah', 'travel', 'tick', 'big', 'map', 'shop', 'card', 'coins', 'down', 'ah', 'bling', 'foryou'][onboardingStep] || 'idle'}
                          scale={onboardingStep === 8 ? 0.28 : (onboardingStep === 0 || onboardingStep === 9) ? 0.30 : (onboardingStep === 1 || onboardingStep === 10) ? 0.26 : 0.33}
                          className="origin-bottom"
                        />
                      </div>
                    </div>
                    <div className="flex-grow pr-4 z-10 pb-1">
                      <div className="text-[18px] text-[#222222] font-medium mb-1.5 leading-tight min-h-[30px]">
                        <HTMLTypewriter
                          key={`heading-${onboardingStep}`}
                          html={onboardingStep === 0 ? (totalAnnualPts > 0 ? "Let's earn more points" : "Let's get started!") : ONBOARDING_STEPS[onboardingStep].title}
                          speed={40}
                          onComplete={() => setHeadlineDone(true)}
                        />
                      </div>
                      <div className="min-h-[50px]">
                        <p className={`text-[13px] text-[#222222] leading-[1.3] mb-4 ${headlineDone ? '' : 'invisible'}`}>
                          <HTMLTypewriter
                            key={headlineDone ? `body-${onboardingStep}` : `hidden-${onboardingStep}`}
                            html={ONBOARDING_STEPS[onboardingStep].text}
                            speed={headlineDone ? 30 : 99999}
                            onComplete={headlineDone ? () => setTypewriterDone(true) : undefined}
                          />
                        </p>
                      </div>
                      <button
                        className={`bg-white text-[15px] font-semibold text-[#E40000] px-6 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-all active:scale-95 shadow-sm inline-flex items-center justify-center whitespace-nowrap ${typewriterDone ? 'animate-button-glow visible' : 'invisible'}`}
                        onClick={handleOnboardingAction}
                        style={{ minWidth: '100px' }}
                      >
                        {ONBOARDING_STEPS[onboardingStep].buttonLabel}
                      </button>
                    </div>
                  </div>
                  {onboardingStep === 5 && (
                    <div className="bg-white rounded-b-[16px] px-6 py-5 shadow-sm flex items-center justify-between relative z-20">
                      <div className="flex flex-col h-full justify-between w-[110px] gap-3">
                        <div className="font-bold text-[13px] text-[#222] leading-tight pr-2">Virgin Australia &amp; Partner Flights</div>
                        <div>
                          <div className="text-[12px] font-medium text-[#222]">{flightsPts.toLocaleString()} pts</div>
                          <div className="text-[11px] font-bold text-[#222] uppercase tracking-tight">Annual Target</div>
                        </div>
                      </div>
                      <div className="relative flex-grow flex justify-center -translate-y-[2px]">
                        <svg width="86" height="86" viewBox="0 0 96 96" className="-rotate-90">
                          <circle cx="48" cy="48" r="38" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                          <circle cx="48" cy="48" r="38" stroke="#E40000" strokeWidth="6" fill="none" strokeDasharray={trackerCircumference} strokeDashoffset={trackerStrokeDashoffset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-1.5">
                          <img src={FlightsLogo} alt="Flight" className="w-[30px] h-[30px] mb-[2px] -translate-x-[2px] translate-y-[0px] opacity-80" />
                          <div className="w-[36px] h-[1px] bg-gray-300"></div>
                          <span className="text-[10px] text-[#666] mt-[2px]">{flightsMonthlyTarget.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col h-full justify-between items-end text-right w-[110px] gap-3">
                        <div>
                          <div className="text-[11px] font-bold text-[#222] uppercase tracking-tight">Monthly Target</div>
                          <div className="text-[12px] font-medium text-[#222] mt-[2px]">{flightsMonthlyTarget.toLocaleString()} pts</div>
                        </div>
                        <div>
                          <div className="text-[12px] font-medium text-[#222]">{earnedThisMonth.toLocaleString()} pts</div>
                          <div className="text-[11px] font-bold text-[#222] uppercase tracking-tight mt-[0px]">Earned this month:</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {current?.activeDuoCard === 'are-you-sure' && (
              <div ref={onboardingCardRef} className={`animate-onboarding-expand expanded mb-4 ${isSplitView ? '' : 'px-3'}`}>
                <div className="onboarding-card-content visible">
                  <div className="bg-[#E2F1F0] rounded-[16px] p-5 flex items-center space-x-4 relative overflow-hidden transition-all duration-300">
                    <button onClick={() => updateActiveDuoCard(null)} className="absolute top-1.5 right-1.5 p-1 text-gray-500 hover:text-gray-700 transition-colors z-10" style={{ marginRight: 0, top: 4, right: 4 }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="shrink-0 relative z-10 animate-koala-drop-in" style={{ width: '130px', height: '140px' }}>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                        <LionSprite
                          variant="ah"
                          scale={0.55}
                          className="origin-bottom"
                        />
                      </div>
                    </div>
                    <div className="flex-grow pr-4 z-10 pb-1">
                      <div className="text-[18px] text-[#222222] font-medium mb-1.5 leading-tight min-h-[30px]">
                        <HTMLTypewriter
                          key="are-you-sure-title"
                          html="Are you sure?"
                          speed={40}
                          onComplete={() => setHeadlineDone(true)}
                        />
                      </div>
                      <div className="min-h-[50px]">
                        {headlineDone && (
                          <p className="text-[13px] text-[#222222] leading-[1.3] mb-4">
                            <HTMLTypewriter
                              key="are-you-sure-text"
                              html="It's much easier to make progress in the program if you choose a few ways to earn. Do you want to take a look?"
                              speed={30}
                              onComplete={() => setTypewriterDone(true)}
                            />
                          </p>
                        )}
                      </div>
                      <button
                        className={`bg-white text-[15px] font-semibold text-[#E40000] px-6 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-all active:scale-95 shadow-sm inline-flex items-center justify-center whitespace-nowrap ${typewriterDone ? 'animate-button-glow visible' : 'invisible'}`}
                        onClick={() => {
                          updateActiveDuoCard('onboarding');
                          setOnboardingStep(0);
                        }}
                        style={{ minWidth: '100px' }}
                      >
                        Show me
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isSplitView ? renderSplitViewSections() : (
              <>
                <div className="pt-2 bg-gray-100">
                  <CategoryTabs categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} ref={tabsRef} variant="default" />
                </div>
                {renderMobileList()}
              </>
            )}
          </div>
          {/* Rewards Container (Stacked on Mobile, Right Panel on Desktop) */}
          <div className={isSplitView ? "flex flex-col flex-grow min-w-0 gap-4" : "flex flex-col w-full gap-4 mt-6 pb-8"}>
            <div
              ref={rewardsContainerRef}
              className={isSplitView
                ? "flex-grow bg-white rounded-[24px] shadow-sm relative overflow-hidden flex flex-col items-stretch outline-none ring-[1px] ring-gray-200"
                : "flex-grow bg-white rounded-t-[24px] shadow-[0_-4px_16px_rgba(0,0,0,0.05)] pt-2 pb-24 relative overflow-hidden flex flex-col items-stretch w-full border-t border-gray-100"
              }
            >
              {isSplitView && showEarnExample && expandedId ? (
                <EarnExampleScreen
                  wte={WTEs.find(w => w.id === expandedId)}
                  tierIdx={tierIndexById[expandedId] ?? 0}
                  onClose={() => setShowEarnExample(false)}
                />
              ) : isSplitView && showFindOutMore && expandedId === 11 ? (
                <FindOutMoreFlight onClose={() => setShowFindOutMore(false)} />
              ) : isSplitView && showFindOutMore && expandedId === 16 ? (
                <FindOutMoreHolidays onClose={() => setShowFindOutMore(false)} />
              ) : isSplitView && showFindOutMore && expandedId === 17 ? (
                <FindOutMoreTAD onClose={() => setShowFindOutMore(false)} />
              ) : isSplitView && showFindOutMore && expandedId === 1 ? (
                <FindOutMoreEveryday onClose={() => setShowFindOutMore(false)} />
              ) : isSplitView && showFindOutMore && expandedId === 6 ? (
                <FindOutMoreNoFeeCards onClose={() => setShowFindOutMore(false)} />
              ) : isSplitView && showFindOutMore && expandedId === 7 ? (
                <FindOutMoreCards onClose={() => setShowFindOutMore(false)} />
              ) : isSplitView && showFindOutMore && expandedId === 12 ? (
                <FindOutMoreHotels onClose={() => setShowFindOutMore(false)} />
              ) : isSplitView && showFindOutMore && expandedId === 15 ? (
                <FindOutMoreCars onClose={() => setShowFindOutMore(false)} />
              ) : isSplitView && showFindOutMore && expandedId === 5 ? (
                <FindOutMoreWine onClose={() => setShowFindOutMore(false)} />
              ) : isSplitView && showFindOutMore && expandedId === 2 ? (
                <FindOutMoreBP onClose={() => setShowFindOutMore(false)} />
              ) : isSplitView && showFindOutMore && expandedId === 4 ? (
                <FindOutMoreOnlineMall onClose={() => setShowFindOutMore(false)} />
              ) : (
                <div className={`w-full h-full overflow-y-auto ${isSplitView ? 'p-4' : 'px-4 pt-2'}`}>
                  <RewardsScreen
                    goTo={goTo}
                    isEmbedded={true}
                    desktopMode={isSplitView}
                    containerRef={rewardsContainerRef}
                    onboardingStep={onboardingStep}
                    onOnboardingAction={handleOnboardingAction}
                    onboardingData={ONBOARDING_STEPS[onboardingStep]}
                  />
                </div>
              )}
            </div>
            <div className="bg-white rounded-[24px] shadow-sm ring-[1px] ring-gray-200 p-6 flex items-center justify-between shrink-0 transition-all duration-300">
              <div className="flex-grow pr-4">
                <h3 className="text-[16px] text-[#323232] font-normal">Your program, your way</h3>
                <p className="text-[13px] text-[#666666]">Track towards your selected options to get more from the your membership.</p>
              </div>
              <button
                onClick={() => {
                  if (selectedWTEs.length <= 1 && current?.activeDuoCard !== 'are-you-sure') {
                    updateActiveDuoCard('are-you-sure');
                    setHeadlineDone(false);
                    setTypewriterDone(false);
                    setTimeout(() => {
                      scrollToWithOffset(onboardingCardRef.current);
                    }, 50);
                  } else {
                    updateActiveDuoCard(null);
                    goTo(5);
                  }
                }}
                className="bg-[#E40000] text-white px-6 py-2.5 rounded-full text-[13px] font-bold flex items-center space-x-2 hover:bg-[#C40000] transition-colors whitespace-nowrap"
              >
                <span>My Velocity</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isSplitView && <SiteFooter />}
      {
        isMobile && (
          <StickyFooter totalPts={totalAnnualPts} selectedReward={selectedReward} hasSelectedReward={current.hasSelectedReward} onExploreRewardsClicked={handleSeeMoreClick} onHomepageClicked={() => {
            if (selectedWTEs.length <= 1 && current?.activeDuoCard !== 'are-you-sure') {
              updateActiveDuoCard('are-you-sure');
              setHeadlineDone(false);
              setTypewriterDone(false);
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 50);
            } else {
              updateActiveDuoCard(null);
              handleAddToDashboard();
            }
          }} initialMinimized={isTargetMode} />
        )
      }

      {/* Mobile Overlays */}
      {
        !isSplitView && showEarnExample && expandedId && (
          <div className="fixed inset-0 z-50 bg-white shadow-xl overflow-hidden flex flex-col items-stretch">
            <EarnExampleScreen
              wte={WTEs.find(w => w.id === expandedId)}
              tierIdx={tierIndexById[expandedId] ?? 0}
              onClose={() => setShowEarnExample(false)}
            />
          </div>
        )
      }

      {
        !isSplitView && showFindOutMore && expandedId === 11 && (
          <div className="fixed inset-0 z-50 bg-white shadow-xl overflow-hidden flex flex-col items-stretch">
            <FindOutMoreFlight onClose={() => setShowFindOutMore(false)} />
          </div>
        )
      }

      {
        !isSplitView && showFindOutMore && expandedId === 16 && (
          <div className="fixed inset-0 z-50 bg-white shadow-xl overflow-hidden flex flex-col items-stretch">
            <FindOutMoreHolidays onClose={() => setShowFindOutMore(false)} />
          </div>
        )
      }

      {
        !isSplitView && showFindOutMore && expandedId === 17 && (
          <div className="fixed inset-0 z-50 bg-white shadow-xl overflow-hidden flex flex-col items-stretch">
            <FindOutMoreTAD onClose={() => setShowFindOutMore(false)} />
          </div>
        )
      }

      {
        !isSplitView && showFindOutMore && expandedId === 1 && (
          <div className="fixed inset-0 z-50 bg-white shadow-xl overflow-hidden flex flex-col items-stretch">
            <FindOutMoreEveryday onClose={() => setShowFindOutMore(false)} />
          </div>
        )
      }

      {
        !isSplitView && showFindOutMore && expandedId === 7 && (
          <div className="fixed inset-0 z-50 bg-white shadow-xl overflow-hidden flex flex-col items-stretch">
            <FindOutMoreCards onClose={() => setShowFindOutMore(false)} />
          </div>
        )
      }

      {
        !isSplitView && showFindOutMore && expandedId === 12 && (
          <div className="fixed inset-0 z-50 bg-white shadow-xl overflow-hidden flex flex-col items-stretch">
            <FindOutMoreHotels onClose={() => setShowFindOutMore(false)} />
          </div>
        )
      }

      {
        !isSplitView && showFindOutMore && expandedId === 15 && (
          <div className="fixed inset-0 z-50 bg-white shadow-xl overflow-hidden flex flex-col items-stretch">
            <FindOutMoreCars onClose={() => setShowFindOutMore(false)} />
          </div>
        )
      }

      {
        !isSplitView && showFindOutMore && expandedId === 5 && (
          <div className="fixed inset-0 z-50 bg-white shadow-xl overflow-hidden flex flex-col items-stretch">
            <FindOutMoreWine onClose={() => setShowFindOutMore(false)} />
          </div>
        )
      }

      {
        !isSplitView && showFindOutMore && expandedId === 2 && (
          <div className="fixed inset-0 z-50 bg-white shadow-xl overflow-hidden flex flex-col items-stretch">
            <FindOutMoreBP onClose={() => setShowFindOutMore(false)} />
          </div>
        )
      }

      {
        !isSplitView && showFindOutMore && expandedId === 4 && (
          <div className="fixed inset-0 z-50 bg-white shadow-xl overflow-hidden flex flex-col items-stretch">
            <FindOutMoreOnlineMall onClose={() => setShowFindOutMore(false)} />
          </div>
        )
      }

      {
        !isSplitView && showFindOutMore && expandedId === 6 && (
          <div className="fixed inset-0 z-50 bg-white shadow-xl overflow-hidden flex flex-col items-stretch">
            <FindOutMoreNoFeeCards onClose={() => setShowFindOutMore(false)} />
          </div>
        )
      }
    </div>
  );
}
