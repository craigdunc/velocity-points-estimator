import React, { useState, useEffect } from 'react';
import VelocityLogo from '../assets/logos/qantas.svg'; // TODO: replace with actual Velocity logo
import { useSaveSlots } from '../state/useSaveSlots';

const oneWorldLogo = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#00358E" strokeWidth="2" />
        <circle cx="12" cy="12" r="6" fill="#00358E" />
    </svg>
);

const auFlag = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="#00008B" />
        <path d="M0 0L10 6.6L20 0M0 20L10 13.4L20 20M10 0V20M0 10H20" stroke="white" strokeWidth="1" />
    </svg>
);

const cartIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const ChevronDown = () => (
    <svg className="w-3 h-3 ml-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

export default function Header({ showAccountNav = true, onProfileClick, activeTab = 'Earn and use points', onTabClick, onTimePasses, onSettingsClick }) {
    const { slots, activeSlotId, current } = useSaveSlots() || {};
    const activeSlot = slots?.find(s => s.id === activeSlotId);
    const slotName = activeSlot?.name || 'Craig Duncan';
    const pointsBalance = current?.currentPtsBalance !== undefined ? current.currentPtsBalance : 144513;

    const getInitials = (name) => {
        if (!name) return 'CD';
        const words = name.trim().split(' ').filter(Boolean);
        if (words.length === 1) {
            return name.substring(0, 2).toUpperCase();
        }
        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    };

    const initials = getInitials(slotName);
    const [animatedPts, setAnimatedPts] = useState(pointsBalance);

    useEffect(() => {
        let currentAnimatedPts = 0;
        setAnimatedPts((prev) => {
            currentAnimatedPts = prev;
            return prev;
        });

        if (pointsBalance === currentAnimatedPts) return;
        const diff = pointsBalance - currentAnimatedPts;

        // Don't animate if difference is huge (like initial load vs actual), only smooth small transitions
        if (Math.abs(diff) > 10000) {
            setAnimatedPts(pointsBalance);
            return;
        }

        const duration = 800; // ms
        const startPts = currentAnimatedPts;
        const startTime = performance.now();
        let animationFrame;

        const animate = (time) => {
            let progress = (time - startTime) / duration;
            if (progress > 1) progress = 1;

            // easeOutExpo
            const easeOutProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setAnimatedPts(Math.round(startPts + diff * easeOutProgress));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setAnimatedPts(pointsBalance);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [pointsBalance]);

    const formattedPoints = new Intl.NumberFormat().format(animatedPts);

    return (
        <header className="w-full bg-white font-sans">
            {/* Layer 1: Global Bar */}
            <div className="max-w-[1218px] mx-auto px-4 xl:px-0 py-3 md:py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2 md:space-x-4">
                    <img src={VelocityLogo} alt="Velocity" className="h-6 md:h-10" />
                    <div className="hidden md:block w-px h-8 bg-gray-200" />
                    <div className="hidden md:block">
                        {oneWorldLogo}
                    </div>
                </div>

                <div className="flex items-center space-x-4 md:space-x-6">
                    <div className="hidden md:flex items-center space-x-2 text-[13px] font-medium text-[#323232]">
                        {auFlag}
                        <span>AU | EN</span>
                    </div>

                    <button
                        id="header-points-pill"
                        onClick={onProfileClick}
                        className="flex flex-row-reverse md:flex-row items-center bg-[#E40000] text-white rounded-full pr-1 pl-3 md:pl-1 md:pr-4 py-1.5 md:py-1.5 shadow-sm overflow-hidden hover:bg-red-700 transition-colors cursor-pointer"
                    >
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black/20 flex items-center justify-center text-[10px] md:text-[11px] font-bold border border-white/20 ml-1.5 md:ml-0 md:mr-2">
                            {initials}
                        </div>
                        <span className="text-[14px] md:text-[14px] font-bold tracking-tight">
                            {formattedPoints} <span className="hidden md:inline">points</span><span className="md:hidden">pts</span>
                        </span>
                    </button>

                    <button className="text-gray-600 hover:text-black">
                        {cartIcon}
                    </button>
                </div>
            </div>

            {/* Layer 2: Main Navigation */}
            <div className="hidden md:flex max-w-[1218px] mx-auto px-4 xl:px-0 py-3 justify-between items-center bg-white border-t border-gray-50">
                <nav className="flex items-center space-x-8">
                    {[
                        'Flights', 'Travel', 'Shop', 'Banking & Insurance', 'Frequent Flyer', 'Velocity for Business'
                    ].map((item) => (
                        <button key={item} className="flex items-center text-[15px] text-[#323232] hover:text-[#E40000] font-medium transition-colors">
                            {item}
                            <ChevronDown />
                        </button>
                    ))}
                </nav>
                <button className="text-[14px] text-[#323232] hover:underline font-medium">Help</button>
            </div>

            {/* Layer 3: Account Navigation */}
            {showAccountNav && (
                <div className="w-full bg-[#323232]">
                    <div className="max-w-[1218px] mx-auto px-4 xl:px-0 flex justify-between items-center h-14">
                        <nav className="flex items-center h-full flex-grow overflow-hidden">
                            <button className="pr-4 md:pr-0 md:px-5 text-[15px] text-white font-medium hover:bg-white/10 h-full transition-colors md:border-r md:border-white/10 shrink-0">
                                My Account
                            </button>

                            <span className="text-white/40 md:hidden ml-1 shrink-0">|</span>

                            {/* Desktop Tabs */}
                            <div className="hidden md:flex items-center h-full flex-grow pl-2">
                                {[
                                    'My Velocity', 'Activity statement', 'My trips', 'Earn and use points', 'Status & benefits'
                                ].map((item) => {
                                    const isActive = item === activeTab;
                                    return (
                                        <button
                                            key={item}
                                            onClick={() => onTabClick && onTabClick(item)}
                                            className={`px-5 text-[14px] font-medium h-full transition-colors relative flex items-center shrink-0 ${isActive
                                                ? 'text-white'
                                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {item}
                                            {isActive && (
                                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E40000]" />
                                            )}
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Mobile Active Tab */}
                            <div className="md:hidden flex items-center h-full px-4 relative text-white font-medium text-[15px] shrink-0">
                                {activeTab}
                                <svg className="w-4 h-4 ml-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <div className="absolute bottom-0 left-4 right-10 h-[3px] bg-[#E40000]" />
                            </div>
                        </nav>

                        <div className="flex items-center space-x-3 shrink-0 ml-4">
                            {onTimePasses && (
                                <button
                                    onClick={onTimePasses}
                                    className="hidden md:block border border-white hover:bg-white/10 text-white text-[15px] font-medium px-5 py-1.5 rounded-full transition-colors"
                                >
                                    Time Passes
                                </button>
                            )}
                            <button
                                onClick={onSettingsClick}
                                className="border border-white hover:bg-white/10 text-white text-[14px] md:text-[15px] font-medium px-4 md:px-5 py-1.5 rounded-full transition-colors"
                            >
                                Settings
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
