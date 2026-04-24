import React, { useState } from 'react';
import RightArrow from '../assets/icons/right-arrow.svg';

import FlightsImg from '../assets/images/MyVelocity_Homepage_Content_UsingyourPoints_Feb25-1-Flights.png';
import RewardsImg from '../assets/images/MyVelocity_Homepage_Content_UsingyourPoints_Feb25-3-VelocityRewardsStore.png';
import MyerImg from '../assets/images/CS4435-Myer-Shop-With-Points-Launch-Web-Offer-1920x1080.png';
import CarhireImg from '../assets/images/MyVelocity_Homepage_Content_UsingyourPoints_Feb25-4-Carhire.png';
import HotelsImg from '../assets/images/MyVelocity_Homepage_Content_UsingyourPoints_Feb25-5-Hotels.png';
import VirginWinesImg from '../assets/images/MyVelocity_Homepage_Content_UsingyourPoints_Feb25-6-VirginWines.png';
import ExpOzImg from '../assets/images/MyVelocity_Homepage_Content_UsingyourPoints_Feb25-7-ExperienceOz.png';
import HolidaysImg from '../assets/images/VA_Holidays _Generic_5.png';
import UpgradeImg from '../assets/images/MyVelocity_Homepage_Content_UsingyourPoints_Feb25-8-UpgradeMe.png';
import PWPImg from '../assets/images/PWP_Hero_banner_1280x700.png';

// Items stored column-first (col0: Flights/Myer, col1: Rewards/Carhire, ...)
// so that the 2-column sliding window reveals correct pairs
const ITEMS = [
    { img: FlightsImg,      title: 'Flights',             desc: 'Use your Points for Reward Seats' },
    { img: MyerImg,         title: 'Shop with Myer',      desc: 'In-store and online' },
    { img: RewardsImg,      title: 'Rewards Store',       desc: 'Gift cards, tech, travel and more' },
    { img: CarhireImg,      title: 'Car hire',            desc: 'Use your Points for your car hire' },
    { img: HotelsImg,       title: 'Hotels',              desc: 'Book hotels worldwide' },
    { img: VirginWinesImg,  title: 'Virgin Wines',        desc: 'Shop a lovely drop using your Points' },
    { img: ExpOzImg,        title: 'Experience Oz',       desc: 'Choose from over 4,000 experiences' },
    { img: HolidaysImg,     title: 'Holidays',            desc: 'Flight and hotel packages' },
    { img: UpgradeImg,      title: 'Upgrade with Points', desc: 'Experience Business Class with UpgradeMe' },
    { img: PWPImg,          title: 'Pay with Points',     desc: 'Onboard select Virgin Australia flights' },
];

const ROWS = 2;
const WINDOW = 2; // columns visible at once
const totalCols = Math.ceil(ITEMS.length / ROWS); // 5

// Build page offsets: step 2 each time, ensure last offset = totalCols - WINDOW
const buildOffsets = () => {
    const maxOffset = totalCols - WINDOW;
    const offsets = [];
    for (let o = 0; o <= maxOffset; o += 2) offsets.push(o);
    if (offsets[offsets.length - 1] < maxOffset) offsets.push(maxOffset);
    return offsets; // [0, 2, 3] for 10 items
};
const PAGE_OFFSETS = buildOffsets();

// Extract items for desktop (2-col grid) at a given column offset
const getDesktopItems = (colOffset) => {
    const result = [];
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < WINDOW; col++) {
            const idx = (colOffset + col) * ROWS + row;
            if (idx < ITEMS.length) result.push(ITEMS[idx]);
        }
    }
    return result;
};

const ChevronLeft = () => (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 1L1 7l6 6" />
    </svg>
);
const ChevronRight = () => (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 1l6 6-6 6" />
    </svg>
);

const Card = ({ img, title, desc }) => (
    <div className="flex border border-gray-200 rounded-xl overflow-hidden">
        <div className="shrink-0 w-[130px] sm:w-[140px] min-h-[160px]">
            <img src={img} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col p-4 min-w-0">
            <p className="text-[15px] font-bold text-[#1d1c1f] mb-1">{title}</p>
            <p className="text-[13px] text-gray-500 leading-snug">{desc}</p>
            <div className="mt-auto pt-3 flex justify-end">
                <img src={RightArrow} alt="" className="w-[18px] h-[18px] object-contain" />
            </div>
        </div>
    </div>
);

export default function UsingYourPoints() {
    const [page, setPage] = useState(0);
    const [mobilePage, setMobilePage] = useState(0);
    const colOffset = PAGE_OFFSETS[page];
    const pageItems = getDesktopItems(colOffset);
    // Mobile: one column per page, 5 pages total
    const mobileItems = [ITEMS[mobilePage * ROWS], ITEMS[mobilePage * ROWS + 1]].filter(Boolean);

    return (
        <div className="mt-8 sm:max-w-[1100px] sm:mx-auto">
            <div className="px-4 sm:px-0 mb-4">
                <h3 className="text-[22px] font-semibold text-[#1d1c1f] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Using your Points
                </h3>
                <p className="text-[14px]" style={{ color: '#575559' }}>Fast track your wonderful with Velocity</p>
            </div>

            <div className="lg:bg-white lg:rounded-xl lg:border lg:border-gray-200 lg:p-5">
                {/* Mobile: 1 col, 2 items, 5 pages */}
                <div className="sm:hidden grid grid-cols-1 gap-4 px-4">
                    {mobileItems.map((item, i) => <Card key={`mob-${mobilePage}-${i}`} {...item} />)}
                </div>
                {/* Desktop: 2-col grid */}
                <div className="hidden sm:grid grid-cols-2 gap-4">
                    {pageItems.map((item, i) => <Card key={`${page}-${i}`} {...item} />)}
                </div>

                {/* Mobile controls — 5 pages */}
                <div className="sm:hidden relative flex items-center mt-5 px-4">
                    <div className="flex items-center">
                        <button onClick={() => setMobilePage(p => Math.max(0, p - 1))} disabled={mobilePage === 0}
                            className="flex items-center justify-center text-[#1d1c1f] disabled:opacity-30 transition-colors"
                            style={{ padding: '6px 12px', width: 40, height: 36 }}><ChevronLeft /></button>
                        <button onClick={() => setMobilePage(p => Math.min(totalCols - 1, p + 1))} disabled={mobilePage === totalCols - 1}
                            className="flex items-center justify-center text-[#1d1c1f] disabled:opacity-30 transition-colors"
                            style={{ padding: '6px 12px', width: 40, height: 36 }}><ChevronRight /></button>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 flex gap-1 items-center">
                        {Array.from({ length: totalCols }, (_, i) => (
                            <button key={i} onClick={() => setMobilePage(i)}
                                className={`rounded-full transition-all w-[6px] h-[6px] ${i === mobilePage ? 'bg-[#2d054e]' : 'bg-[#beb6c8]'}`} />
                        ))}
                    </div>
                </div>

                {/* Desktop controls — 3 pages */}
                <div className="hidden sm:flex relative items-center mt-5">
                    <div className="flex items-center">
                        <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                            className="flex items-center justify-center text-[#1d1c1f] disabled:opacity-30 transition-colors"
                            style={{ padding: '6px 12px', width: 40, height: 36 }}><ChevronLeft /></button>
                        <button onClick={() => setPage(p => Math.min(PAGE_OFFSETS.length - 1, p + 1))} disabled={page === PAGE_OFFSETS.length - 1}
                            className="flex items-center justify-center text-[#1d1c1f] disabled:opacity-30 transition-colors"
                            style={{ padding: '6px 12px', width: 40, height: 36 }}><ChevronRight /></button>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 flex gap-1 items-center">
                        {PAGE_OFFSETS.map((_, i) => (
                            <button key={i} onClick={() => setPage(i)}
                                className={`rounded-full transition-all w-[6px] h-[6px] ${i === page ? 'bg-[#2d054e]' : 'bg-[#beb6c8]'}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
