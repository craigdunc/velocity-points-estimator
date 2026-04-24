import React, { useState } from 'react';
import EmptyDepartureBoard from '../assets/images/empty-departure-board.svg';

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

const TABS = ['Upcoming trips', 'Pinned trips'];

const LINKS = [
    ['Find flights', 'Link an existing trip'],
    ['Flights specials', 'Fly using your points'],
];

export default function YourTrips() {
    const [activeTab, setActiveTab] = useState('Upcoming trips');

    return (
        <div className="mt-8 lg:bg-white lg:rounded-xl lg:border lg:border-gray-200 lg:p-5">

            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-0 mb-4">
                <h3 className="text-[22px] font-semibold text-[#1d1c1f]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Your trips
                </h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-end">
                        {TABS.map(tab => {
                            const isActive = tab === activeTab;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative px-3 py-2 text-[15px] font-semibold whitespace-nowrap transition-colors ${isActive ? 'text-[#1d1c1f]' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    {tab}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1d1c1f] rounded-t-sm" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    <button className="shrink-0 px-4 py-2 border border-gray-300 rounded-lg text-[14px] font-semibold text-[#1d1c1f] hover:bg-gray-50 transition-colors whitespace-nowrap">
                        Add +
                    </button>
                </div>
            </div>

            {/* Empty state card */}
            <div className="mx-4 sm:mx-0 border border-gray-200 rounded-xl p-5 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <p className="text-[16px] font-bold text-[#1d1c1f] mb-1">Your departure board is empty</p>
                    <p className="text-[14px] text-gray-500 mb-4">You don't have any upcoming trips linked let's change that!</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                        {LINKS.flat().map(link => (
                            <a key={link} href="#" className="text-[14px] text-[#4C2F92] hover:underline">{link}</a>
                        ))}
                    </div>
                </div>
                <img
                    src={EmptyDepartureBoard}
                    alt=""
                    className="shrink-0 w-[110px] h-[110px] object-contain"
                />
            </div>

            {/* Controls */}
            <div className="relative flex items-center mt-4 px-4 sm:px-0">
                <div className="flex items-center">
                    <button
                        disabled
                        className="flex items-center justify-center text-[#1d1c1f] disabled:opacity-30"
                        style={{ padding: '6px 12px', width: 40, height: 36 }}
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        disabled
                        className="flex items-center justify-center text-[#1d1c1f] disabled:opacity-30"
                        style={{ padding: '6px 12px', width: 40, height: 36 }}
                    >
                        <ChevronRight />
                    </button>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 flex gap-1 items-center">
                    <div className="rounded-full w-[6px] h-[6px] bg-[#2d054e]" />
                </div>
                <div className="ml-auto">
                    <a href="#" className="text-[14px] font-semibold text-[#4C2F92] hover:underline">Link a trip</a>
                </div>
            </div>
        </div>
    );
}
