// src/components/MonthChange.jsx
import React, { useState } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import { WTEs } from '../data';
// NOTE: We might need Dashboard reference if dynamically getting index later
// import Dashboard from '../screens/Dashboard';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Changed props: accepting goTo and currentStepIndex instead of goBack
export default function MonthChange({ goTo }) {
  const { current, saveState } = useSaveSlots();

  /* --- Get current slot data --- */
  // Ensure current exists and provide defaults
  const currentSafe = current || {};
  const selectedIds = (currentSafe.selectedWTEs || []).map(x =>
    typeof x === 'object' ? x.id : x
  );
  const targetById = currentSafe.monthlyTargetByWTE || {};
  const [y, initialM] = (currentSafe.currentMonth || new Date().toISOString().slice(0, 7)).split('-').map(Number);

  /* --- Local UI state --- */
  const [monthNum, setMonthNum] = useState(initialM || 1);
  const [earnedById, setEarnedById] = useState({});
  const [hasAdvanced, setHasAdvanced] = useState(false);

  /* --- Derived state for next month --- */
  const currentYear = parseInt(y, 10); // Ensure year is number
  const nextMonthNum = monthNum === 12 ? 1 : monthNum + 1;
  const nextYear = monthNum === 12 ? currentYear + 1 : currentYear;
  const nextIso = `${nextYear}-${String(nextMonthNum).padStart(2, '0')}`;

  // --- Advance month logic ---
  const advance = () => {
    // Ensure current state is available
    if (!current) {
      console.error("Cannot advance month: current slot state is missing.");
      return;
    }

    /* 1️⃣ generate earned ±20 % around each WTE target */
    const results = {};
    let total = 0;
    selectedIds.forEach(id => {
      const tgt = targetById[id] ?? 0;
      const actual = Math.floor(tgt * (0.8 + Math.random() * 0.4));
      results[id] = actual;
      total += actual;
    });

    /* 2️⃣ persist back into this slot */
    saveState({
      ...current, // Spread the existing state
      currentMonth: nextIso,
      monthlyEarnedByWTE: results,
      wteMonthlySelections: {}, // Forget the selections made for the month when the month ticks over
      currentPtsBalance: (current.currentPtsBalance || 0) + total
    });

    /* 3️⃣ update local UI */
    setMonthNum(nextMonthNum);
    setEarnedById(results);
    setHasAdvanced(true);
  };

  // --- Go To Dashboard Handler ---
  const handleGoToDashboard = () => {
    const dashboardIndex = 5; // Based on steps in App.jsx
    goTo(dashboardIndex);
  };

  // --- Render ---
  return (
    <div className="p-6 space-y-6 max-w-md mx-auto"> {/* Added max-width */}
      <h2 className="text-xl font-bold">
        {/* Display year if it might change */}
        Month: {monthNames[monthNum - 1]} {currentYear !== new Date().getFullYear() ? currentYear : ''}
      </h2>

      {/* Display targets and earned points */}
      <ul className="space-y-2">
        {selectedIds.length > 0 ? selectedIds.map(id => {
          const wte = WTEs.find(w => w.id === id) || { name: `ID ${id}` };
          const tgt = targetById[id] ?? 0;
          const earn = earnedById[id]; // Will be undefined before advancing

          return (
            <li key={id} className="flex justify-between text-sm">
              <span>{wte.name}</span>
              {hasAdvanced
                ? <span>Target {tgt} → Earned {earn} pts</span>
                : <span>Target: {tgt} pts / month</span>}
            </li>
          );
        }) : (
          <li className="text-sm text-gray-500">No Ways to Earn selected.</li>
        )}
      </ul>

      {/* Action Buttons */}
      <div className="space-y-6">
        <button
          onClick={advance}
          disabled={hasAdvanced} // Disable after advancing once
          className="w-full py-3 text-black font-semibold border tracking-widest rounded-full disabled:opacity-50"
        >
          Advance Month
        </button>

        {/* Updated onClick handler */}
        <button
          onClick={handleGoToDashboard}
          className="w-full py-3 text-white bg-gray-600 font-semibold border tracking-widest rounded-full disabled:opacity-50"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}