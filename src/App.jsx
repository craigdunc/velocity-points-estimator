// src/App.jsx
import React, { useState } from 'react';
import SlotSelect from './screens/SlotSelect';
import Intro1 from './screens/Intro1';
import Intro2 from './screens/Intro2';
import WTESelection from './screens/WTESelection';
import RewardsScreen from './screens/RewardsScreen'; // Import the new screen
import Dashboard from './screens/Dashboard';
import MonthChange from './components/MonthChange'; // Assuming this acts like a screen
import SettingsScreen from './screens/SettingsScreen';
import NewDesign from './screens/NewDesign';

const steps = [
  SlotSelect,    // 0
  Intro1,        // 1
  Intro2,        // 2
  WTESelection,  // 3
  () => null,    // 4 <-- Removed RewardsScreen page
  Dashboard,     // 5
  MonthChange,   // 6
  SettingsScreen, // 7
  NewDesign,     // 8
];

// Simple helper to get the index of a component in the steps array

export default function App() {
  const [stepIndex, setStepIndex] = useState(1);
  const [prevStepIndex, setPrevStepIndex] = useState(1);
  const [navPayload, setNavPayload] = useState(null);
  const Screen = steps[stepIndex];

  // New navigation function: goes directly to a specific step index
  // Optional payload is passed as navPayload prop to the target screen
  const goTo = (targetIndex, payload = null) => {
    if (targetIndex >= 0 && targetIndex < steps.length) {
      setPrevStepIndex(stepIndex);
      setNavPayload(payload);
      setStepIndex(targetIndex);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      console.warn(`Attempted to navigate to invalid step index: ${targetIndex}`);
    }
  };

  const goBack = () => goTo(prevStepIndex);

  // Pass the current index and the goTo function to the current screen
  return <Screen currentStepIndex={stepIndex} goTo={goTo} goBack={goBack} navPayload={navPayload} />;
}