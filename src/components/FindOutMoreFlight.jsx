import React, { useState } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import FlightsLogo from '../assets/logos/flights.svg';

export default function FindOutMoreFlight({ onClose }) {
    const { current, updateWTEFavourites } = useSaveSlots();
    const favorites = new Set(current?.wteFavourites?.[22] || []);

    const partners = [
        { name: 'SkyTrans', id: 'skytrans' },
        { name: 'Virgin Australia', id: 'virgin' },
        { name: 'Jetstar', id: 'jetstar' },
        { name: 'Air France', id: 'airfrance' },
        { name: 'Air New Zealand', id: 'airnewzealand' },
        { name: 'Air Tahiti Nui', id: 'airtahitinui' },
        { name: 'Aircalin', id: 'aircalin' },
        { name: 'Alaska Airlines', id: 'alaska' },
        { name: 'American Airlines', id: 'aa' },
        { name: 'Bangkok Airways', id: 'bangkok' },
        { name: 'British Airways', id: 'ba' },
        { name: 'Cathay Pacific', id: 'cathay' },
        { name: 'China Airlines', id: 'chinaairlines' },
        { name: 'China Eastern', id: 'chinaeastern' },
        { name: 'EL AL', id: 'elal' },
        { name: 'Emirates', id: 'emirates' },
        { name: 'Fiji Airways', id: 'fiji' },
        { name: 'Finnair', id: 'finnair' },
        { name: 'Iberia', id: 'iberia' },
        { name: 'IndiGo', id: 'indigo' },
        { name: 'Japan Airlines', id: 'jal' },
        { name: 'KLM', id: 'klm' },
        { name: 'LATAM', id: 'latam' },
        { name: 'Malaysia Airlines', id: 'malaysia' },
        { name: 'Qatar Airways', id: 'qatar' },
        { name: 'Royal Air Maroc', id: 'royalairmaroc' },
        { name: 'Royal Jordanian', id: 'royaljordanian' },
        { name: 'SriLankan Airlines', id: 'srilankan' },
        { name: 'WestJet', id: 'westjet' },
        { name: 'Hawaiian Airlines', id: 'hawaiian' }
    ];

    const toggleFav = (itemId) => {
        updateWTEFavourites(22, String(itemId));
    };

    return (
        <div className="w-full h-full flex flex-col items-stretch overflow-hidden bg-white text-left">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
                <h2 className="text-[18px] font-light text-[#323232]" style={{ fontFamily: 'GT America Extended, sans-serif' }}>
                    Flights
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
                        <img src={FlightsLogo} alt="Flights" className="w-8 h-8" />
                    </div>
                    <h3 className="text-[22px] font-medium text-[#323232]" style={{ fontFamily: 'GT America Extended, sans-serif' }}>
                        Virgin Australia &amp; Partner Flights
                    </h3>
                </div>

                <p className="text-[14px] text-[#222222] mb-6 leading-relaxed">
                    Your Velocity Frequent Flyer benefits extend beyond Virgin Australia flights. Velocity partners with over 10 major airlines, including Singapore Airlines, Qatar Airways, Etihad, Delta, United, Air Canada, ANA and more. When flying with a Velocity partner airline, earn Velocity Points on every eligible flight and enjoy seamless travel across the globe.
                </p>

                <h4 className="text-[16px] font-bold text-[#323232] mb-4">Eligible Airlines</h4>

                <div className="flex flex-col gap-3">
                    {partners.map(p => {
                        const isFav = favorites.has(String(p.id));
                        return (
                            <div key={p.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-[#F9F9F9] hover:bg-[#F0F8F8] transition-colors">
                                <span className="text-[14px] font-medium text-[#323232]">{p.name}</span>
                                <button
                                    onClick={() => toggleFav(p.id)}
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
