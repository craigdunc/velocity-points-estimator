import React, { useState } from 'react';
import SevenElevenLogo from '../assets/logos/7_eleven_logo.svg';
import FlybuysLogo from '../assets/logos/flybuys_logo.svg';
import DoorDashLogo from '../assets/logos/doordash_logo.svg';
import VelocityAppLogo from '../assets/logos/velocity-app.png';
import VelocityShopLogo from '../assets/logos/velocity-shop-and-earn.svg';
import VirginAppLogo from '../assets/logos/virgin-australia-app.svg';
import FamilyPoolingIcon from '../assets/logos/family_pooling_icon.png';
import BuyPointsIcon from '../assets/logos/buy-points.svg';

const PARTNERS = [
    { logo: SevenElevenLogo, name: '7-Eleven', desc: 'Earn on food, fuel and more', cta: 'Link account' },
    { logo: FlybuysLogo, name: 'Flybuys', desc: 'Transfer Points & earn Status', cta: 'Link account' },
    { logo: DoorDashLogo, name: 'DoorDash', desc: 'Order to earn with DoorDash' },
];

const APPS = [
    { logo: VelocityAppLogo, name: 'Velocity App', desc: 'Download the app' },
    { logo: VelocityShopLogo, name: 'Velocity Shop & Earn', desc: 'Earn Points shopping online' },
    { logo: VirginAppLogo, name: 'Virgin Australia App', desc: 'Your travel partner' },
];

const YOUR_WAY = [
    { logo: FamilyPoolingIcon, name: 'Family Pooling', desc: 'Get rewards & Status fast with your family' },
    { logo: BuyPointsIcon, name: 'Buy Points', desc: 'Get to your dream reward sooner' },
    { logo: VirginAppLogo, name: 'Virgin Australia Business Flyer', desc: 'Run a business? Earn Velocity Points, access discounts and earn rewards.' },
];

const Row = ({ logo, name, desc, cta, last }) => (
    <div className={`flex items-center gap-4 px-4 py-4 ${!last ? 'border-b border-gray-100' : ''}`}>
        <img src={logo} alt={name} className="w-[40px] h-[40px] object-contain rounded-lg shrink-0" />
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3 mb-1">
                <span className="text-[14px] font-semibold text-[#1d1c1f] truncate">{name}</span>
                {cta && (
                    <button className="shrink-0 border border-gray-300 rounded text-[12px] text-[#1d1c1f] whitespace-nowrap transition-colors" style={{ padding: '3px 7px', background: '#FAFAFA' }}>
                        {cta}
                    </button>
                )}
            </div>
            <div className="text-[14px] text-[#575559] truncate">{desc}</div>
        </div>
    </div>
);

const Section = ({ title, rows, footer }) => (
    <div>
        <div className="text-[14px] font-semibold text-[#1d1c1f] mb-3">{title}</div>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            {rows.map((r) => <Row key={r.name} {...r} last={false} />)}
            {footer && (
                <div className="border-t border-gray-200 px-4 py-3">
                    <span className="text-[14px] text-[#4C2F92] font-medium">{footer}</span>
                </div>
            )}
        </div>
    </div>
);

const TwoColumnSections = ({ left, right }) => {
    const rowCount = Math.max(left.rows.length, right.rows.length);
    const gridRows = `repeat(${rowCount + 1}, auto)`; // +1 for footer row

    const Box = ({ title, rows, footer }) => (
        <div
            className="border border-gray-200 rounded-xl overflow-hidden"
            style={{ display: 'grid', gridTemplateRows: 'subgrid', gridRow: `1 / ${rowCount + 2}` }}
        >
            {rows.map((r) => <Row key={r.name} {...r} last={false} />)}
            {footer && (
                <div className="border-t border-gray-200 px-4 py-3 flex items-center">
                    <span className="text-[14px] text-[#4C2F92] font-medium">{footer}</span>
                </div>
            )}
        </div>
    );

    return (
        <div>
            <div className="grid grid-cols-2 gap-5 mb-3">
                <div className="text-[14px] font-semibold text-[#1d1c1f]">{left.title}</div>
                <div className="text-[14px] font-semibold text-[#1d1c1f]">{right.title}</div>
            </div>
            <div className="grid grid-cols-2 gap-5" style={{ gridTemplateRows: gridRows }}>
                <Box {...left} />
                <Box {...right} />
            </div>
        </div>
    );
};

const ChevronLeft = () => (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 1L1 7l6 6" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 1l6 6-6 6" />
    </svg>
);

const SLIDES = [
    { title: 'Link partners', rows: PARTNERS, footer: '+3' },
    { title: 'Install apps', rows: APPS, footer: 'View details' },
    { title: 'Your way to more Velocity Points', rows: YOUR_WAY, footer: '+1' },
];

const DESKTOP_SECTIONS = [
    { title: 'Link partners', rows: PARTNERS, footer: '+3' },
    { title: 'Install apps', rows: APPS, footer: 'View details' },
    { title: 'Your way to more Velocity Points', rows: YOUR_WAY, footer: '+1' },
];
const DESKTOP_PAGE_COUNT = DESKTOP_SECTIONS.length - 1; // 2 pages: 0→[0,1], 1→[1,2]

export default function GetMostOutOfVelocity() {
    const [page, setPage] = useState(0);
    const [desktopPage, setDesktopPage] = useState(0);

    return (
        <div className="mt-8 lg:bg-white lg:rounded-xl lg:border lg:border-gray-200 lg:p-5">
            <h3 className="text-[22px] font-semibold mb-1 px-4 sm:px-0 lg:px-0" style={{ color: '#1C1B1D', fontFamily: 'Montserrat, sans-serif' }}>Get the most out of Velocity</h3>
            <p className="text-[14px] mb-4 px-4 sm:px-0 lg:px-0" style={{ color: '#575559' }}>See how to maximise your Points earning potential</p>

            {/* Desktop: sliding 2-column carousel (window of 2 from 3 sections) */}
            <div className="hidden sm:block">
                <TwoColumnSections
                    left={DESKTOP_SECTIONS[desktopPage]}
                    right={DESKTOP_SECTIONS[desktopPage + 1]}
                />
                <div className="relative flex items-center mt-5">
                    <div className="flex items-center">
                        <button
                            onClick={() => setDesktopPage(p => Math.max(0, p - 1))}
                            disabled={desktopPage === 0}
                            className="flex items-center justify-center text-[#1d1c1f] disabled:opacity-30 transition-colors"
                            style={{ padding: '6px 12px', width: 40, height: 36 }}
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={() => setDesktopPage(p => Math.min(DESKTOP_PAGE_COUNT - 1, p + 1))}
                            disabled={desktopPage === DESKTOP_PAGE_COUNT - 1}
                            className="flex items-center justify-center text-[#1d1c1f] disabled:opacity-30 transition-colors"
                            style={{ padding: '6px 12px', width: 40, height: 36 }}
                        >
                            <ChevronRightIcon />
                        </button>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 flex gap-1 items-center">
                        {Array.from({ length: DESKTOP_PAGE_COUNT }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setDesktopPage(i)}
                                className={`rounded-full transition-all w-[6px] h-[6px] ${i === desktopPage ? 'bg-[#2d054e]' : 'bg-[#beb6c8]'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile: 3-slide carousel */}
            <div className="sm:hidden mx-4">
                <Section {...SLIDES[page]} />

                <div className="relative flex items-center mt-5">
                    <div className="flex items-center">
                        <button
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            disabled={page === 0}
                            className="flex items-center justify-center text-[#1d1c1f] disabled:opacity-30 transition-colors"
                            style={{ padding: '6px 12px', width: 40, height: 36 }}
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={() => setPage(p => Math.min(SLIDES.length - 1, p + 1))}
                            disabled={page === SLIDES.length - 1}
                            className="flex items-center justify-center text-[#1d1c1f] disabled:opacity-30 transition-colors"
                            style={{ padding: '6px 12px', width: 40, height: 36 }}
                        >
                            <ChevronRightIcon />
                        </button>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 flex gap-1 items-center">
                        {SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`rounded-full transition-all w-[6px] h-[6px] ${i === page ? 'bg-[#2d054e]' : 'bg-[#beb6c8]'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
