import React, { useState } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import HolidaysLogo from '../assets/logos/holidays.svg';

export default function FindOutMoreHolidays({ onClose }) {
    const { current, updateWTEFavourites } = useSaveSlots();
    const favorites = new Set(current?.wteFavourites?.[28] || []);
    const [selectedDestination, setSelectedDestination] = useState('All');

    const holidayTypes = [
        { id: '1', name: 'Queensland Island Escapes', dest: 'Domestic' },
        { id: '2', name: 'Tasmanian Road Trips', dest: 'Domestic' },
        { id: '3', name: 'Northern Territory Adventures', dest: 'Domestic' },
        { id: '4', name: 'Fiji Family Packages', dest: 'International' },
        { id: '5', name: 'Bali Beach Resorts', dest: 'International' },
        { id: '6', name: 'Hawaii Luxury Stays', dest: 'International' },
        { id: '7', name: 'London City Breaks', dest: 'International' },
        { id: '8', name: 'New York Theatre Tours', dest: 'International' },
        { id: '9', name: 'Maldives Overwater Bungalows', dest: 'International' },
        { id: '10', name: 'New Zealand Ski Trips', dest: 'International' },
    ];

    const displayedHolidays = selectedDestination === 'All'
        ? holidayTypes
        : holidayTypes.filter(h => h.dest === selectedDestination);

    const toggleFav = (itemId) => {
        updateWTEFavourites(28, String(itemId));
    };

    return (
        <div className="w-full h-full flex flex-col items-stretch overflow-hidden bg-white text-left">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
                <h2 className="text-[18px] font-light text-[#323232]" style={{ fontFamily: 'GT America Extended, sans-serif' }}>
                    Holidays
                </h2>
                <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="flex-grow p-6 overflow-y-auto">
                <div className="flex items-center mb-6 pl-1 pr-1">
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full mr-4 flex-shrink-0">
                        <img src={HolidaysLogo} alt="Holidays" className="w-8 h-8" />
                    </div>
                    <h3 className="text-[22px] font-medium text-[#323232]" style={{ fontFamily: 'GT America Extended, sans-serif' }}>
                        Virgin Australia Holidays
                    </h3>
                </div>

                <p className="text-[14px] text-[#222222] mb-6 leading-relaxed">
                    Earn 3 Velocity Points per $1 on eligible flight and hotel packages through Virgin Australia Holidays, powered by Hopper. Occasional double Status Credit promotions. Conditions apply.
                </p>

                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[16px] font-bold text-[#323232]">Popular Packages</h4>
                    <div className="relative">
                        <select
                            className="appearance-none bg-gray-50/80 hover:bg-gray-100 py-1.5 pl-3 pr-8 rounded-[8px] border border-gray-200 text-[13px] font-medium text-[#444] outline-none transition-colors cursor-pointer"
                            value={selectedDestination}
                            onChange={(e) => setSelectedDestination(e.target.value)}
                        >
                            <option value="All">All Regions</option>
                            <option value="Domestic">Domestic</option>
                            <option value="International">International</option>
                        </select>
                        <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {displayedHolidays.map(h => {
                        const isFav = favorites.has(String(h.id));
                        return (
                            <div key={h.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-[#F9F9F9] hover:bg-[#F0F8F8] transition-colors">
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-medium text-[#323232]">{h.name}</span>
                                    <span className="text-[12px] text-gray-500">{h.dest}</span>
                                </div>
                                <button
                                    onClick={() => toggleFav(h.id)}
                                    className="p-1 focus:outline-none focus:scale-110 transition-transform"
                                    title={isFav ? "Remove from favorites" : "Add to favorites"}
                                >
                                    <svg
                                        className={`w-6 h-6 transition-colors ${isFav ? 'text-[#E40000] fill-[#E40000]' : 'text-gray-400 fill-transparent'}`}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
