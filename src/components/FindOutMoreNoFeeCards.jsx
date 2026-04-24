import React, { useState } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import NoFeeCardLogo from '../assets/logos/no-annual-fee-card.svg';

export default function FindOutMoreNoFeeCards({ onClose }) {
    const { current, updateWTEFavourites } = useSaveSlots();
    const favorites = new Set(current?.wteFavourites?.[3] || []);

    const cardOptions = [
        {
            id: '1',
            name: 'Virgin Money Velocity Flyer Card',
            provider: 'American Express',
            earnRate: 'Up to 0.75 PTS per $1 spent',
            annualFee: '$0',
            bonus: 'N/A'
        },
        {
            id: '2',
            name: 'BOQ Specialist Platinum Card',
            provider: 'BOQ Specialist',
            earnRate: 'Up to 0.5 PTS per $1 spent',
            annualFee: '$0',
            bonus: 'N/A'
        }
    ];

    const toggleFav = (itemId) => {
        updateWTEFavourites(3, String(itemId));
    };

    return (
        <div className="w-full h-full flex flex-col items-stretch overflow-hidden bg-white text-left">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
                <h2 className="text-[18px] font-light text-[#323232]" style={{ fontFamily: 'GT America Extended, sans-serif' }}>
                    No Annual Fee Credit Card
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
                        <img src={NoFeeCardLogo} alt="No Annual Fee Credit Card" className="w-8 h-8 object-contain" />
                    </div>
                    <h3 className="text-[22px] font-medium text-[#323232]" style={{ fontFamily: 'GT America Extended, sans-serif' }}>
                        No Annual Fee Cards
                    </h3>
                </div>

                <p className="text-[14px] text-[#222222] mb-6 leading-relaxed">
                    Collect points on your everyday spend without the worry of an annual fee. Here are the latest cards with earning potential.
                </p>

                <div className="flex flex-col gap-4">
                    {cardOptions.map(c => {
                        const isFav = favorites.has(String(c.id));
                        return (
                            <div key={c.id} className="flex flex-col p-4 border border-gray-100 rounded-lg bg-[#F9F9F9] hover:bg-[#F0F8F8] transition-colors relative">
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={() => toggleFav(c.id)}
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

                                <div className="flex flex-col mb-3 pr-8">
                                    <span className="text-[16px] font-bold text-[#323232]">{c.name}</span>
                                    <span className="text-[12px] text-[#E40000] font-medium mt-1">{c.provider}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div className="flex flex-col bg-white p-3 rounded-lg border border-gray-100">
                                        <span className="text-[11px] text-gray-500 uppercase font-semibold">Earn Rate</span>
                                        <span className="text-[13px] text-[#323232] mt-1 break-words">{c.earnRate}</span>
                                    </div>
                                    <div className="flex flex-col bg-white p-3 rounded-lg border border-gray-100">
                                        <span className="text-[11px] text-gray-500 uppercase font-semibold">Annual Fee</span>
                                        <span className="text-[18px] font-bold text-[#323232] mt-0.5">{c.annualFee}</span>
                                    </div>
                                    <div className="flex flex-col bg-white p-3 rounded-lg border border-gray-100 col-span-2">
                                        <span className="text-[11px] text-gray-500 uppercase font-semibold">Bonus Points</span>
                                        <span className="text-[14px] text-[#323232] mt-1">{c.bonus}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
