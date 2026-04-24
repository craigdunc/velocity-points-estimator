import React, { useState } from 'react';
import VelocityLogo from '../assets/logos/Velocity_Stacked.svg';
import SearchIcon from '../assets/icons/search.svg';
import HamburgerIcon from '../assets/icons/hamburger-menu.svg';

// Breakpoint mapping (Tailwind approximations):
//   xl  (≥1280px) → show full main nav, hide hamburger, show avatar chevron
//   lg  (≥1024px) → show full sub-nav tabs, show points display
//   <lg            → collapse sub-nav to "Explore My Velocity", show hamburger
//   <md (< 768px) → hide points display

const ChevronDown = ({ className = '' }) => (
    <svg className={className} width="10" height="7" viewBox="0 0 10 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 1l4 4 4-4" />
    </svg>
);

const ChevronRight = ({ className = '' }) => (
    <svg className={`inline-block ${className}`} width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 1l5 5-5 5" />
    </svg>
);

const MAIN_NAV = [
    { label: 'Book' },
    { label: 'Points', alert: true },
    { label: 'Flying & Status' },
    { label: 'Shop', alert: true },
    { label: 'Cards & Banking' },
    { label: 'Business Flyer' },
];

const ACCOUNT_TABS = [
    { label: 'My Velocity' },
    { label: 'Status' },
    { label: 'Benefits' },
    { label: 'Earn', dropdown: true },
    { label: 'Redeem', dropdown: true },
    { label: 'Profile', dropdown: true },
];

export default function VelocityHeader({
    pointsBalance = 0,
    memberName = 'Craig Duncan',
    activeAccountTab = 'My Velocity',
    onAccountTabClick,
    memberCard = null,
    showTimePasses = false,
    onTimePassesClick,
}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const getInitials = (name) => {
        if (!name) return 'CD';
        const words = name.trim().split(' ').filter(Boolean);
        if (words.length === 1) return name.substring(0, 2).toUpperCase();
        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    };

    const initials = getInitials(memberName);
    const formattedPoints = new Intl.NumberFormat().format(pointsBalance);

    const font = { fontFamily: '"GT America Extended", "Montserrat", arial, sans-serif' };

    return (
        <>
        <header className="w-full bg-white shadow-[0_4px_6px_rgba(0,0,0,0.07)] relative z-[70]" style={font}>

            {/* ── Site Header bar: 58px on mobile, 80px on sm+ ── */}
            <div className="bg-white">
                <div className="w-full px-6 h-[54px] sm:h-[80px] flex items-center justify-between gap-6">

                    {/* Logo — smaller on mobile */}
                    <a href="#" aria-label="Velocity Frequent Flyer" className="shrink-0">
                        <img src={VelocityLogo} alt="Velocity Frequent Flyer" className="h-[34px] sm:h-[51px] w-auto" />
                    </a>

                    {/* Main nav — xl+ only */}
                    <nav className="hidden min-[1200px]:flex items-center gap-8 flex-1 pl-8">
                        {MAIN_NAV.map(({ label, alert }) => (
                            <a key={label} href="#"
                                className="relative text-[15px] font-semibold text-[#1d1c1f] tracking-[0.6px] whitespace-nowrap hover:text-[#E40000] transition-colors">
                                {label}
                                {alert && (
                                    <span className="absolute -top-1.5 -right-2.5 w-[7px] h-[7px] rounded-full bg-[#E40000]" />
                                )}
                            </a>
                        ))}
                    </nav>

                    {/* Right cluster */}
                    <div className="flex items-center gap-3 shrink-0 ml-auto min-[1200px]:ml-0">

                        {/* Search */}
                        <button aria-label="Search" className="flex items-center justify-center w-[26px] h-[26px]">
                            <img src={SearchIcon} alt="" className="w-full h-full" />
                        </button>

                        {/* Divider — lg+ only */}
                        <div className="hidden lg:block w-px h-[34px] bg-gray-200" />

                        {/* Points display — lg+ only */}
                        <div id="header-points-pill" className="hidden lg:flex flex-col items-start leading-tight">
                            <span className="text-[20px] font-semibold text-black tracking-[0.2px]">{formattedPoints}</span>
                            <span className="text-[13px] font-semibold text-black tracking-[0.13px]">Velocity Points</span>
                        </div>

                        {/* Profile avatar */}
                        <button className="flex items-center gap-3 -mt-px" aria-label="Profile">
                            <div className="w-[40px] h-[40px] rounded-full bg-[#E40000] flex items-center justify-center text-white text-[16px] font-bold tracking-[0.16px] shrink-0">
                                {initials}
                            </div>
                            {/* Chevron on avatar — xl+ (no hamburger at that width) */}
                            <ChevronDown className="hidden min-[1200px]:block w-[14px] h-[10px] text-[#1d1c1f]" />
                        </button>

                        {/* Hamburger — hidden at xl+ */}
                        <button
                            className="min-[1200px]:hidden flex items-center justify-center"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            <img src={HamburgerIcon} alt="" className="w-[18px] h-[14px]" />
                        </button>
                    </div>
                </div>
            </div>

        </header>

            {/* ── Sub-nav: full tabs (lg+) ── */}
            <div id="velocity-subnav" className="hidden lg:block border-b border-gray-200 sticky top-0 z-[60] bg-white" style={font}>
                <div className="max-w-[1100px] mx-auto px-6 flex items-stretch">
                    <div className="flex items-end flex-1">
                    {ACCOUNT_TABS.map(({ label, dropdown }) => {
                        const isActive = label === activeAccountTab;
                        return (
                            <button key={label}
                                onClick={() => onAccountTabClick?.(label)}
                                className={`relative flex items-end gap-2 px-4 py-[17px] text-[15px] font-semibold tracking-[0.6px] whitespace-nowrap transition-colors
                                    ${isActive ? 'text-[#1d1c1f]' : 'text-[#1d1c1f] hover:text-[#E40000]'}`}
                            >
                                {label}
                                {dropdown && <ChevronDown className="w-[12px] h-[8px] text-[#1d1c1f] mb-[5px]" />}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[3.5px] bg-[#A78BEE] rounded-t-[2px]" />
                                )}
                            </button>
                        );
                    })}
                    </div>
                    {showTimePasses && (
                        <button
                            onClick={onTimePassesClick}
                            className="flex items-center gap-1.5 ml-4 px-3 py-1.5 my-auto text-[13px] font-semibold text-[#575559] border border-gray-300 rounded-full hover:border-[#E40000] hover:text-[#E40000] transition-colors whitespace-nowrap"
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                            </svg>
                            Time passes
                        </button>
                    )}
                    {memberCard && (
                        <div className="flex items-center ml-4 my-1.5">
                            {memberCard}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Sub-nav: collapsed "Explore" row (<lg) ── */}
            <div id="velocity-subnav" className="lg:hidden border-b border-gray-200 sticky top-0 z-[60] bg-white" style={font}>
                <div className="max-w-[1100px] mx-auto px-8 flex items-center justify-between h-[48px]">
                    <span className="text-[15px] font-semibold text-[#1d1c1f] tracking-[-0.75px]">
                        Explore My Velocity
                    </span>
                    <ChevronRight className="w-[7px] h-[12px] text-[#A78BEE]" />
                </div>
            </div>

            {/* ── Mobile slide-down menu ── */}
            {mobileMenuOpen && (
                <div className="min-[1200px]:hidden bg-white border-t border-gray-100 shadow-lg">
                    <nav className="max-w-[1100px] mx-auto flex flex-col divide-y divide-gray-100">
                        {MAIN_NAV.map(({ label }) => (
                            <a key={label} href="#"
                                className="px-6 py-3.5 text-[15px] font-bold text-[#1d1c1f] hover:bg-gray-50 transition-colors">
                                {label}
                            </a>
                        ))}
                        <div className="border-t border-gray-200" />
                        {ACCOUNT_TABS.map(({ label }) => (
                            <button key={label}
                                onClick={() => { onAccountTabClick?.(label); setMobileMenuOpen(false); }}
                                className="px-6 py-3.5 text-left text-[15px] font-semibold text-[#1d1c1f] hover:bg-gray-50 transition-colors">
                                {label}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
}
