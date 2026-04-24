import React, { useState } from 'react';

import InspVacHero   from '../assets/images/CS4753_InspiringVacationsLaunch_VFFOffertile_1920x1280px.png';
import MothersHero   from '../assets/images/VFF2096_e-Store_MothersDay_WhatsNews_600x300px.png';
import AmexHero      from '../assets/images/CS3D661-amex-sbs-200k.png';
import UnloanHero    from '../assets/images/Unloan Launch Offer tile 2.png';

import InspVacLogo   from '../assets/logos/Inspiring_Vacations_Primary_CMYK.png';
import eStoreLogo    from '../assets/logos/Velocity-eStore_logo_stacked_RGB.png';
import AmexLogo      from '../assets/logos/AMEX_MagBlueBox_Logo.png';
import UnloanLogo    from '../assets/logos/unloan-logo-black.png';

const ITEMS = [
    {
        hero: InspVacHero, logo: InspVacLogo,
        offerType: 'Offer', offerSub: 'New partner',
        category: 'Bonus Points',
        headline: 'Get up to 3,000 bonus Points with Inspiring Vacations*',
        body: 'Simply link your Inspiring Vacations account with your Velocity Frequent Flyer account by 9 June 2026 and opt into Inspiring Vacations marketing for one year.*',
        cta: 'Earn now',
    },
    {
        hero: MothersHero, logo: eStoreLogo,
        offerType: 'Offer', offerSub: 'Bonus Points',
        category: "Mother's Day",
        headline: "Earn up to 7 Points per $1 spent this Mother's Day*",
        body: "Turn bonus Points into brownie points via the Velocity e-Store.* Offers end 29 April 2026. Excl. and T&Cs apply.",
        cta: 'Shop now',
    },
    {
        hero: AmexHero, logo: AmexLogo,
        offerType: 'Offer', offerSub: 'New offer',
        category: 'Bonus Points',
        headline: 'Get 200,000 bonus Velocity Points*',
        body: 'With the Amex Velocity Business Card. Min spend $6k in first 3 months.* New Amex Card Members only. T&Cs apply.',
        cta: 'Find out more',
        featured: true,
    },
    {
        hero: UnloanHero, logo: UnloanLogo,
        offerType: 'Offer', offerSub: 'Home loan',
        category: 'Bonus Points',
        headline: 'Earn up to 250,000 Points with an Unloan home loan*',
        body: 'You could receive Velocity Points if you apply for and settle an Unloan home loan.*',
        cta: 'Learn more',
    },
];

// Widest visible window = 3 (lg+), step-1 → 2 desktop pages
const DESKTOP_OFFSETS = [0, 1]; // [0,1,2] and [1,2,3]
const PAGE_COUNT = DESKTOP_OFFSETS.length;

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

const OfferBadge = ({ type, sub }) => (
    <div
        className="absolute bottom-0 left-0 py-2 pl-3 pr-6 text-white"
        style={{
            background: '#E40000',
            clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0 100%)',
        }}
    >
        <div className="text-[13px] font-bold leading-tight">{type}</div>
        <div className="text-[11px] leading-tight">{sub}</div>
    </div>
);

const Card = ({ hero, logo, offerType, offerSub, category, headline, body, cta, featured }) => (
    <div className={`flex flex-col rounded-xl overflow-hidden border ${featured ? 'border-[#4C2F92]' : 'border-gray-200'}`}>
        {/* Hero image */}
        <div className="relative h-[180px] shrink-0">
            <img src={hero} alt="" className="w-full h-full object-cover" />
            <OfferBadge type={offerType} sub={offerSub} />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-3">
            {/* Logo + category */}
            <div className="flex items-center justify-between gap-3">
                <img src={logo} alt="" className="h-[28px] w-auto object-contain" />
                <span className="shrink-0 text-[12px] px-2 py-1 border border-gray-300 rounded text-[#1d1c1f]">{category}</span>
            </div>

            {/* Headline */}
            <p className="text-[16px] font-bold text-[#1d1c1f] leading-snug">{headline}</p>

            {/* Body */}
            <p className="text-[13px] text-gray-500 leading-relaxed flex-1">{body}</p>

            {/* T&Cs */}
            <a href="#" className="text-[12px] text-gray-500 underline">Terms and Conditions</a>

            {/* CTA */}
            <button className={`w-full py-2.5 rounded-lg border text-[14px] font-semibold transition-colors ${featured ? 'border-[#4C2F92] text-[#4C2F92] hover:bg-purple-50' : 'border-[#1d1c1f] text-[#1d1c1f] hover:bg-gray-50'}`}>
                {cta}
            </button>
        </div>
    </div>
);

const Controls = ({ page, setPage }) => (
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
                onClick={() => setPage(p => Math.min(PAGE_COUNT - 1, p + 1))}
                disabled={page === PAGE_COUNT - 1}
                className="flex items-center justify-center text-[#1d1c1f] disabled:opacity-30 transition-colors"
                style={{ padding: '6px 12px', width: 40, height: 36 }}
            >
                <ChevronRight />
            </button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-1 items-center">
            {Array.from({ length: PAGE_COUNT }, (_, i) => (
                <button key={i} onClick={() => setPage(i)}
                    className={`rounded-full transition-all w-[6px] h-[6px] ${i === page ? 'bg-[#2d054e]' : 'bg-[#beb6c8]'}`}
                />
            ))}
        </div>
        <div className="ml-auto">
            <a href="#" className="text-[14px] font-semibold text-[#4C2F92] hover:underline whitespace-nowrap">View all offers</a>
        </div>
    </div>
);

export default function WhatsNews() {
    const [page, setPage] = useState(0);

    // lg+ (3 cols): step-1 sliding
    const wideOffset = DESKTOP_OFFSETS[page];
    const wideItems = ITEMS.slice(wideOffset, wideOffset + 3);

    // sm-lg (2 cols): step-2 non-overlapping
    const medItems = ITEMS.slice(page * 2, page * 2 + 2);

    // mobile (1 col): step-2 (page 0 → item 0, page 1 → item 2)
    const mobItems = ITEMS.slice(page * 2, page * 2 + 1);

    return (
        <div className="mt-8 sm:max-w-[1100px] sm:mx-auto">
            <div className="px-4 sm:px-0 mb-5">
                <h3 className="text-[22px] font-semibold text-[#1d1c1f]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    What's news
                </h3>
            </div>

            {/* lg+: 3 columns, step-1 sliding */}
            <div className="hidden lg:grid grid-cols-3 gap-5">
                {wideItems.map((item, i) => <Card key={`w${page}-${i}`} {...item} />)}
            </div>

            {/* sm–lg: 2 columns, step-2 */}
            <div className="hidden sm:grid lg:hidden grid-cols-2 gap-5">
                {medItems.map((item, i) => <Card key={`m${page}-${i}`} {...item} />)}
            </div>

            {/* mobile: 1 column, step-2 */}
            <div className="sm:hidden px-4">
                {mobItems.map((item, i) => <Card key={`s${page}-${i}`} {...item} />)}
            </div>

            <div className="px-4 sm:px-0">
                <Controls page={page} setPage={setPage} />
            </div>
        </div>
    );
}
