import React, { useState, useEffect } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import VelocityLogo from '../assets/logos/Velocity_Stacked.svg';
import CongratsImg from '../assets/images/congratulations.png';
import VelocitySpinner from '../components/VelocitySpinner';

import sprIdle      from '../assets/images/sprites/lion-idle.png';
import sprDown      from '../assets/images/sprites/lion-down.png';
import sprAh        from '../assets/images/sprites/lion-ah.png';
import sprTravel    from '../assets/images/sprites/lion-travel.png';
import sprTick      from '../assets/images/sprites/lion-tick.png';
import sprBig       from '../assets/images/sprites/lion-big.png';
import sprMap       from '../assets/images/sprites/lion-map.png';
import sprShop      from '../assets/images/sprites/lion-shop.png';
import sprCard      from '../assets/images/sprites/lion-card.png';
import sprCoins     from '../assets/images/sprites/lion-coins.png';
import sprBling     from '../assets/images/sprites/lion-bling.png';
import sprForYou    from '../assets/images/sprites/lion-foryou.png';
import sprMagic     from '../assets/images/sprites/lion-magic.png';
import sprMagicShot from '../assets/images/sprites/lion-magic-shot.png';
import sprBubble    from '../assets/images/sprites/lion-bubble.png';
import sprThink     from '../assets/images/sprites/lion-think.png';

const SPRITES = [
    sprIdle, sprDown, sprAh, sprTravel, sprTick, sprBig, sprMap,
    sprShop, sprCard, sprCoins, sprBling, sprForYou, sprMagic, sprMagicShot, sprBubble, sprThink,
];

function usePreload(srcs) {
    const [loaded, setLoaded] = useState(0);
    const total = srcs.length;
    useEffect(() => {
        let count = 0;
        srcs.forEach(src => {
            const img = new Image();
            img.onload = img.onerror = () => { count++; setLoaded(count); };
            img.src = src;
        });
    }, []);
    return { done: loaded >= total, loaded, total };
}

const CHECKBOXES = [
    { id: 'c1', label: <>I own a small or medium sized business</> },
    { id: 'c2', label: <>I fly for work</> },
    { id: 'c3', label: <>I fly for leisure</> },
    { id: 'c4', label: <>I travel with <span className="text-[#4C2F92]">my</span> family</> },
    { id: 'c5', label: <>I will earn most of <span className="text-[#4C2F92]">my Points</span> from <span className="text-[#4C2F92]">everyday spending</span></> },
    { id: 'c6', label: <>I will use most of <span className="text-[#4C2F92]">my Points</span> on <span className="text-[#4C2F92]">everyday items</span></> },
];

export default function Intro1({ goTo }) {
    const { slots, activeSlotId } = useSaveSlots();
    const currentSlot = slots.find(s => s.id === activeSlotId);
    const userName = currentSlot?.name || 'Kim';

    const [showPanel, setShowPanel] = useState(true);
    const [checked, setChecked] = useState({});
    const { done: spritesReady, loaded, total } = usePreload(SPRITES);

    const toggle = id => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

    if (!spritesReady) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-8" style={{ background: '#fff' }}>
                <img src={VelocityLogo} alt="Velocity Frequent Flyer" className="h-[44px] w-auto opacity-20" />
                <VelocitySpinner size={88} color="#BBBBBF" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center" style={{ background: '#280D4B', fontFamily: '"GT America Extended", Montserrat, Arial, sans-serif' }}>

            {/* Logo — centered, no header bar */}
            <div className="flex justify-center pt-8 pb-2">
                <img
                    src={VelocityLogo}
                    alt="Velocity Frequent Flyer"
                    className="h-[52px] w-auto"
                    style={{ filter: 'brightness(0) invert(1)' }}
                />
            </div>

            {/* Hero image */}
            <div className="flex justify-center px-6 mt-2">
                <img src={CongratsImg} alt="Congratulations" className="max-w-[440px] w-full object-contain" />
            </div>

            {/* Heading + subtitle */}
            <h1 className="text-[32px] font-bold text-white text-center mt-4 mb-1">
                Congratulations!
            </h1>
            <p className="text-white/80 text-[16px] text-center mb-6 px-4">
                You are now a Velocity Frequent Flyer member.
            </p>

            {/* White card — square corners */}
            <div className="w-full max-w-[420px] bg-white shadow-xl mb-10">

                {/* Member NO. — clickable → SlotSelect */}
                <button
                    onClick={() => goTo(0)}
                    className="w-full flex flex-col items-center py-5 hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                    <span className="text-[10px] font-bold tracking-[0.15em] text-[#1d1c1f] uppercase mb-1">Member No.</span>
                    <span className="text-[28px] font-bold text-[#1d1c1f] tracking-wide">1256 701 793</span>
                </button>

                {/* Before you go panel */}
                {showPanel && (
                    <div className="mx-4 my-4 rounded-lg p-5 relative" style={{ background: '#EDE8F7' }}>

                        {/* Close button */}
                        <button
                            onClick={() => setShowPanel(false)}
                            className="absolute top-3 right-3 text-[#1d1c1f]/50 hover:text-[#1d1c1f] text-[18px] leading-none"
                            aria-label="Close"
                        >
                            ×
                        </button>

                        {/* Title */}
                        <p className="text-[15px] font-bold text-[#4C2F92] text-center mb-3">
                            Before you go...
                        </p>

                        {/* Body */}
                        <p className="text-[12px] text-[#1d1c1f] text-center leading-relaxed mb-3">
                            Want a more <span className="text-[#4C2F92]">personalised</span>{' '}
                            <span className="text-[#4C2F92]">Welcome Journey</span>? Share how you like to travel
                            and earn so we can tailor your experience to what matters most. Select all that apply.
                        </p>

                        {/* Disclaimer */}
                        <p className="text-[11px] text-[#575559] text-center italic leading-snug mb-4">
                            Marketing preferences managed separately. You can update those in your profile.
                        </p>

                        {/* Checkboxes */}
                        <div className="flex flex-col gap-2 mb-4">
                            {CHECKBOXES.map(({ id, label }) => (
                                <label key={id} className="flex items-start gap-2.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={!!checked[id]}
                                        onChange={() => toggle(id)}
                                        className="mt-[2px] w-[14px] h-[14px] shrink-0 accent-[#4C2F92]"
                                    />
                                    <span className="text-[12px] text-[#1d1c1f] leading-snug">{label}</span>
                                </label>
                            ))}
                        </div>

                        {/* Submit — non-functional, right-aligned */}
                        <div className="flex justify-end">
                            <button className="bg-[#E40000] text-white text-[13px] font-semibold px-5 py-1.5 rounded">
                                Submit
                            </button>
                        </div>

                    </div>
                )}

                {/* Log in to My Velocity */}
                <div className="flex justify-center px-6 py-5">
                    <button
                        onClick={() => goTo(5)}
                        className="w-full py-3.5 rounded-lg text-[15px] font-bold text-white flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
                        style={{ background: '#4C2F92' }}
                    >
                        Log in to My Velocity
                    </button>
                </div>

            </div>
        </div>
    );
}
