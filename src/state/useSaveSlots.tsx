// src/state/useSaveSlots.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { v4 as uuid } from 'uuid';
import { WTEs } from '../data'; // Import WTEs to get default tiers

// --- Types ---
export interface AppState {
  firstRunCompleted: boolean;
  selectedWTEs: { id: string | number; level: string }[];
  tierIndexById: Record<string | number, number>;
  totalAnnualPts: number;
  selectedWTU: string | null;
  selectedRewardId?: string | number | null;
  selectedRewardCategory?: string | null;
  hasSelectedReward?: boolean;
  currentMonth: string;
  currentWeek?: number;
  monthlyEarnedByWTE: Record<string | number, number>;
  monthlyTargetByWTE: Record<string | number, number>;
  currentPtsBalance: number;
  setupProgressByWTE: Record<string | number, number>;
  originCity: string;
  isShowingHow?: boolean;
  activeDuoCard?: 'onboarding' | 'reward-guidance' | 'tier-guidance' | null;
  dashboardIntroDismissed: boolean;
  favouriteTierIndex?: number | null;
  dismissedCoachings?: string[];
  opaqueSpend?: boolean;
  opaqueEarn?: boolean;
  wteFavourites: Record<string | number, string[]>;
}
interface SaveSlot { id: string; name: string; created: number; state: AppState; }
type Slots = SaveSlot[];
interface SlotsContextValue {
  slots: Slots; activeSlotId: string | null; current: AppState | null;
  createSlot: (name: string, initialState: Partial<AppState>) => void;
  renameSlot: (id: string, newName: string) => void;
  deleteSlot: (id: string) => void; loadSlot: (id: string) => void;
  saveState: (patch: Partial<AppState>) => void;
  updateSelectedWTU: (wtu: string | null) => void;
  updateSelectedRewardId: (id: string | number | null, category?: string | null, isExplicit?: boolean) => void;
  updateSelectedWTEs: (newWTEs: { id: string | number; level: string }[]) => void;
  updateTierIndex: (wteId: string | number, tierIndex: number) => void;
  updateOriginCity: (city: string) => void;
  updateIsShowingHow: (show: boolean) => void;
  updateActiveDuoCard: (card: 'onboarding' | 'reward-guidance' | 'tier-guidance' | null) => void;
  updateDismissedCoachings: (id: string) => void;
  setDashboardIntroDismissed: (dismissed: boolean) => void;
  advanceTime: () => void;
  updateFavouriteTierIndex: (index: number | null) => void;
  setOpaqueSpend: (value: boolean) => void;
  setOpaqueEarn: (value: boolean) => void;
  updateWTEFavourites: (wteId: string | number, subId: string) => void;
}


// --- Constants needed for Defaults ---
const getDefaultTierIndexById = () => WTEs.reduce((acc, w) => {
  acc[w.id] = 2; // Default to middle tier (index 2)
  return acc;
}, {} as Record<string | number, number>);

const rewardTabs = [ // Needed for default state
  'Flights', 'Hotels', 'Activities',
  'Marketplace', 'Gift Cards', 'Entertainment'
];


// --- Context & Provider ---
const STORAGE_KEY = 'qff_save_slots';
const ACTIVE_SLOT_KEY = 'qff_active_slot_id';
const SlotsCtx = createContext<SlotsContextValue | undefined>(undefined);

export function SaveSlotsProvider({ children }: { children: ReactNode }) {
  const [slots, setSlots] = useState<Slots>([]);
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);
  const [current, setCurrent] = useState<AppState | null>(null);

  // --- Effects ---
  // Load from localStorage on first mount
  useEffect(() => {
    const json = localStorage.getItem(STORAGE_KEY);
    let initialSlots: Slots = [];

    if (json) {
      try {
        const saved = JSON.parse(json);
        if (Array.isArray(saved)) initialSlots = saved;
      } catch (err) {
        console.error("Failed to parse slots", err);
      }
    }

    if (initialSlots.length > 0) {
      setSlots(initialSlots);
      const savedActiveId = localStorage.getItem(ACTIVE_SLOT_KEY);
      const activeSlot = initialSlots.find(s => s.id === savedActiveId) || initialSlots[0];
      setActiveSlotId(activeSlot.id);
      setCurrent(activeSlot.state);
    } else {
      createSlot('Kim', {});
    }
  }, []);

  // Persist whenever slots mutate
  useEffect(() => {
    if (slots && slots.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
    } else if (slots && slots.length === 0 && localStorage.getItem(STORAGE_KEY) !== null) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [slots]);

  // Persist activeSlotId
  useEffect(() => {
    if (activeSlotId) {
      localStorage.setItem(ACTIVE_SLOT_KEY, activeSlotId);
    } else {
      localStorage.removeItem(ACTIVE_SLOT_KEY);
    }
  }, [activeSlotId]);


  // --- State Update Functions ---
  const saveState = useCallback((patchOrFn: Partial<AppState> | ((prev: AppState | null) => Partial<AppState>)) => {
    if (!activeSlotId) {
      console.warn("Cannot save state: No active slot ID.");
      return;
    }
    setCurrent(prev => {
      const patch = typeof patchOrFn === 'function' ? patchOrFn(prev) : patchOrFn;

      // Shallow comparison to avoid redundant updates
      let hasChanged = false;
      for (const key in patch) {
        if (patch[key as keyof AppState] !== prev?.[key as keyof AppState]) {
          hasChanged = true;
          break;
        }
      }

      if (!hasChanged && prev !== null) return prev;

      const merged = { ...prev, ...patch } as AppState;
      setSlots(s =>
        s.map(slot =>
          slot.id === activeSlotId ? { ...slot, state: merged } : slot
        )
      );
      return merged;
    });
  }, [activeSlotId]);

  const updateSelectedWTU = useCallback((wtu: string | null) => {
    saveState({ selectedWTU: wtu });
  }, [saveState]);

  const updateSelectedRewardId = useCallback((id: string | number | null, category: string | null = null, isExplicit = false) => {
    saveState({
      selectedRewardId: id,
      selectedRewardCategory: category,
      hasSelectedReward: isExplicit
    });
  }, [saveState]);

  const updateSelectedWTEs = useCallback((newWTEs: { id: string | number; level: string }[]) => {
    saveState(prev => {
      if (!prev) return ({} as Partial<AppState>);
      const currentTierIndexById = prev.tierIndexById || getDefaultTierIndexById();
      const newSelectedIds = newWTEs.map(w => w.id);

      const newTotalAnnualPts = newWTEs.reduce((sum, wteSelection) => {
        const wteDetails = WTEs.find(w => w.id === wteSelection.id);
        const pts = wteDetails ? wteDetails.tiers[Number(wteSelection.level)]?.pts ?? 0 : 0;
        return sum + pts;
      }, 0);

      const monthlyTargetByWTE = newSelectedIds.reduce((acc, id) => {
        const wteDetails = WTEs.find(w => w.id === id);
        const tierIndex = currentTierIndexById[id] ?? 2;
        acc[id] = Math.round((wteDetails ? wteDetails.tiers[tierIndex]?.pts ?? 0 : 0) / 12);
        return acc;
      }, {} as Record<string | number, number>);

      const currentEarned = prev.monthlyEarnedByWTE || {};
      const monthlyEarnedByWTE = newSelectedIds.reduce((acc, id) => {
        acc[id] = currentEarned[id] || 0;
        return acc;
      }, {} as Record<string | number, number>);

      return {
        selectedWTEs: newWTEs,
        totalAnnualPts: newTotalAnnualPts,
        monthlyTargetByWTE,
        monthlyEarnedByWTE,
      };
    });
  }, [saveState]);

  const updateOriginCity = useCallback((city: string) => {
    saveState({ originCity: city });
  }, [saveState]);

  const updateIsShowingHow = useCallback((show: boolean) => {
    saveState({ isShowingHow: show });
  }, [saveState]);

  const updateActiveDuoCard = useCallback((card: 'onboarding' | 'reward-guidance' | 'tier-guidance' | null) => {
    saveState({ activeDuoCard: card });
  }, [saveState]);

  const updateDismissedCoachings = useCallback((id: string) => {
    saveState((prev) => {
      if (!prev) return {};
      const currentObj = prev.dismissedCoachings || [];
      if (!currentObj.includes(id)) {
        return { dismissedCoachings: [...currentObj, id] };
      }
      return {};
    });
  }, [saveState]);

  const updateWTEFavourites = useCallback((wteId: string | number, subId: string) => {
    saveState((prev) => {
      if (!prev) return {};
      const currentFavs = prev.wteFavourites || {};
      const wteFavs = currentFavs[wteId] || [];
      const newWteFavs = wteFavs.includes(subId)
        ? wteFavs.filter(id => id !== subId)
        : [...wteFavs, subId];

      return {
        wteFavourites: {
          ...currentFavs,
          [wteId]: newWteFavs
        }
      };
    });
  }, [saveState]);

  const setDashboardIntroDismissed = useCallback((dismissed: boolean) => {
    saveState({ dashboardIntroDismissed: dismissed });
  }, [saveState]);

  const updateFavouriteTierIndex = useCallback((index: number | null) => {
    saveState({ favouriteTierIndex: index });
  }, [saveState]);

  const setOpaqueSpend = useCallback((value: boolean) => {
    saveState({ opaqueSpend: value });
  }, [saveState]);

  const setOpaqueEarn = useCallback((value: boolean) => {
    saveState({ opaqueEarn: value });
  }, [saveState]);


  const updateTierIndex = useCallback((wteId: string | number, tierIndex: number) => {
    saveState(prev => {
      if (!prev) return ({} as Partial<AppState>);
      const currentWTEs = prev.selectedWTEs || [];
      const currentTierIndexById = prev.tierIndexById || getDefaultTierIndexById();
      const newTierIndexById = { ...currentTierIndexById, [wteId]: tierIndex };

      const exists = currentWTEs.some(w => String(w.id) === String(wteId));
      let newWTEs;
      if (exists) {
        newWTEs = currentWTEs.map(w =>
          String(w.id) === String(wteId) ? { ...w, level: String(tierIndex) } : w
        );
      } else {
        newWTEs = [...currentWTEs, { id: wteId, level: String(tierIndex) }];
      }

      const newSelectedIds = newWTEs.map(w => w.id);

      const newTotalAnnualPts = newWTEs.reduce((sum, wteSelection) => {
        const wteDetails = WTEs.find(w => w.id === wteSelection.id);
        const pts = wteDetails ? wteDetails.tiers[Number(wteSelection.level)]?.pts ?? 0 : 0;
        return sum + pts;
      }, 0);

      const monthlyTargetByWTE = newSelectedIds.reduce((acc, id) => {
        const wteDetails = WTEs.find(w => w.id === id);
        const updatedTierIdx = newTierIndexById[id] ?? 2;
        acc[id] = Math.round((wteDetails ? wteDetails.tiers[updatedTierIdx]?.pts ?? 0 : 0) / 12);
        return acc;
      }, {} as Record<string | number, number>);

      const currentEarned = prev.monthlyEarnedByWTE || {};
      const monthlyEarnedByWTE = newSelectedIds.reduce((acc, id) => {
        acc[id] = currentEarned[id] || 0;
        return acc;
      }, {} as Record<string | number, number>);

      return {
        selectedWTEs: newWTEs,
        tierIndexById: newTierIndexById,
        totalAnnualPts: newTotalAnnualPts,
        monthlyTargetByWTE,
        monthlyEarnedByWTE,
      };
    });
  }, [saveState]);

  const advanceTime = useCallback(() => {
    saveState(prev => {
      if (!prev) return ({} as Partial<AppState>);

      const currentWeek = prev.currentWeek || 1;
      const selectedWTEs = prev.selectedWTEs || [];
      const targetById = prev.monthlyTargetByWTE || {};

      let nextWeekTotal = 0;
      const nextResults: Record<string | number, number> = { ...(prev.monthlyEarnedByWTE || {}) };

      if (currentWeek < 4) {
        // Advance week by adding ~1/4 of target
        selectedWTEs.forEach(w => {
          const tgt = targetById[w.id] ?? 0;
          const weeklyTgt = tgt / 4;
          const actual = Math.floor(weeklyTgt * (0.9 + Math.random() * 0.4));
          nextResults[w.id] = (nextResults[w.id] || 0) + actual;
          nextWeekTotal += actual;
        });

        return {
          currentWeek: currentWeek + 1,
          monthlyEarnedByWTE: nextResults,
          currentPtsBalance: (prev.currentPtsBalance || 0) + nextWeekTotal,
        };
      } else {
        // We're at the end of week 4 -> start of next month (week 1)
        const currentMonth = prev.currentMonth || new Date().toISOString().slice(0, 7);
        const [y, m] = currentMonth.split('-').map(Number);
        const nextMonthNum = m === 12 ? 1 : m + 1;
        const nextYear = m === 12 ? y + 1 : y;
        const nextIso = `${nextYear}-${String(nextMonthNum).padStart(2, '0')}`;

        return {
          currentMonth: nextIso,
          currentWeek: 1, // reset week
          monthlyEarnedByWTE: {}, // reset points for the new month
          // currentPtsBalance carries over
        };
      }
    });
  }, [saveState]);

  // --- Slot Management Functions ---
  const createSlot = useCallback((name: string, initialState: Partial<AppState>) => {
    const defaultState: AppState = {
      firstRunCompleted: false, selectedWTEs: [], tierIndexById: getDefaultTierIndexById(),
      totalAnnualPts: 0, selectedWTU: rewardTabs[0],
      selectedRewardId: null, selectedRewardCategory: null,
      currentMonth: new Date().toISOString().slice(0, 7),
      monthlyEarnedByWTE: {}, monthlyTargetByWTE: {}, currentPtsBalance: 0,
      setupProgressByWTE: {}, originCity: 'Sydney', isShowingHow: false,
      activeDuoCard: 'onboarding', dashboardIntroDismissed: false,
      favouriteTierIndex: null,
      dismissedCoachings: [],
      wteFavourites: {},
      ...initialState
    };
    const newSlot: SaveSlot = { id: uuid(), name, created: Date.now(), state: defaultState };
    setSlots(s => [newSlot, ...s]);
    setActiveSlotId(newSlot.id);
    setCurrent(defaultState);
  }, []); // Dependency array for createSlot

  // *** ADDED FULL IMPLEMENTATIONS FOR rename, delete, load ***
  const renameSlot = useCallback((id: string, newName: string) => {
    setSlots(s =>
      s.map(slot => (slot.id === id ? { ...slot, name: newName } : slot))
    );
  }, []);

  const deleteSlot = useCallback((id: string) => {
    const remaining = slots.filter(slot => slot.id !== id);
    setSlots(remaining);

    // If we deleted the currently active slot, we must switch to another one
    if (activeSlotId === id) {
      if (remaining.length > 0) {
        const nextSlot = remaining[0];
        setActiveSlotId(nextSlot.id);
        setCurrent(nextSlot.state);
      } else {
        // If no slots left, create an initial one safely
        createSlot('Kim', {});
      }
    }
  }, [slots, activeSlotId, createSlot]);

  const loadSlot = useCallback((id: string) => {
    const slot = slots.find(s => s.id === id);
    if (!slot) return;
    setActiveSlotId(id);
    setCurrent(slot.state);
  }, [slots]);


  // --- Provide Context Value ---
  return (
    <SlotsCtx.Provider
      value={{ // Ensure ALL functions are listed here
        slots, activeSlotId, current,
        createSlot, renameSlot, deleteSlot, loadSlot, saveState,
        updateSelectedWTU, updateSelectedRewardId,
        updateSelectedWTEs, updateTierIndex, updateOriginCity, updateIsShowingHow,
        updateActiveDuoCard,
        updateDismissedCoachings,
        setDashboardIntroDismissed, advanceTime,
        updateFavouriteTierIndex,
        setOpaqueSpend,
        setOpaqueEarn,
        updateWTEFavourites,
      }}
    >
      {children}
    </SlotsCtx.Provider>
  );
}

// --- Hook ---
export function useSaveSlots() {
  const ctx = useContext(SlotsCtx);
  if (!ctx) throw new Error('useSaveSlots must be used within SaveSlotsProvider');
  return ctx;
}