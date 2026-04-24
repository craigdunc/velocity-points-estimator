import React, { useState } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import BpRewardsLogo from '../assets/logos/bp-rewards.svg';

export default function FindOutMoreBP({ onClose }) {
    const { current, updateWTEFavourites } = useSaveSlots();
    const favorites = new Set(current?.wteFavourites?.[4] || []);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const bpOfferings = [
        { id: '1', name: 'Ultimate 98', category: 'Premium Fuel', desc: 'Earn 2 points per litre on BP\'s best dirt-busting, premium performance fuel.' },
        { id: '2', name: 'Premium 95', category: 'Premium Fuel', desc: 'Earn 2 points per litre on BP Premium 95 unleaded petrol.' },
        { id: '3', name: 'Regular Unleaded', category: 'Regular Fuel', desc: 'Earn 1 point per litre on Regular 91 and E10 unleaded petrol.' },
        { id: '4', name: 'BP Diesel', category: 'Regular Fuel', desc: 'Earn 1 point per litre on BP Diesel and BP Ultimate Diesel.' },
        { id: '5', name: 'wildbean cafe Coffee', category: 'In-Store', desc: 'Earn 1 point per $1 spent on barista-made coffee and hot drinks.' },
        { id: '6', name: 'Hot Snacks & Pastries', category: 'In-Store', desc: 'Earn 1 point per $1 on sausage rolls, pies, and hot food.' },
        { id: '7', name: 'Drinks & Groceries', category: 'In-Store', desc: 'Earn 1 point per $1 on cold drinks, snacks, and convenience groceries.' },
        { id: '8', name: 'Car Wash', category: 'Services', desc: 'Earn 1 point per $1 spent on keeping your car looking fresh.' },
    ];

    const displayedOfferings = selectedCategory === 'All'
        ? bpOfferings
        : bpOfferings.filter(o => o.category === selectedCategory);

    const toggleFav = (itemId) => {
        updateWTEFavourites(4, String(itemId));
    };

    return (
        <div className="w-full h-full flex flex-col items-stretch overflow-hidden bg-white text-left">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
                <h2 className="text-[18px] font-light text-[#323232]" style={{ fontFamily: 'GT America Extended, sans-serif' }}>
                    BP Rewards
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
                        <img src={BpRewardsLogo} alt="BP Rewards" className="w-8 h-8 object-contain" />
                    </div>
                    <h3 className="text-[22px] font-medium text-[#323232]" style={{ fontFamily: 'GT America Extended, sans-serif' }}>
                        BP Rewards
                    </h3>
                </div>

                <p className="text-[14px] text-[#222222] mb-6 leading-relaxed">
                    Scan your Velocity card or app at 700+ 7-Eleven locations. Earn 2 Velocity Points per litre on premium fuel, 1 pt per litre on regular, and points on in-store purchases.
                </p>

                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[16px] font-bold text-[#323232]">Ways to Earn at BP</h4>
                    <div className="relative">
                        <select
                            className="appearance-none bg-gray-50/80 hover:bg-gray-100 py-1.5 pl-3 pr-8 rounded-[8px] border border-gray-200 text-[13px] font-medium text-[#444] outline-none transition-colors cursor-pointer"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="All">All Items</option>
                            <option value="Premium Fuel">Premium Fuel</option>
                            <option value="Regular Fuel">Regular Fuel</option>
                            <option value="In-Store">In-Store</option>
                            <option value="Services">Services</option>
                        </select>
                        <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {displayedOfferings.map(o => {
                        const isFav = favorites.has(String(o.id));
                        return (
                            <div key={o.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-[#F9F9F9] hover:bg-[#F0F8F8] transition-colors">
                                <div className="flex flex-col pr-4">
                                    <span className="text-[14px] font-medium text-[#323232]">{o.name}</span>
                                    <span className="text-[12px] text-[#E40000] font-medium my-0.5">{o.category}</span>
                                    <span className="text-[12px] text-gray-500 leading-snug">{o.desc}</span>
                                </div>
                                <button
                                    onClick={() => toggleFav(o.id)}
                                    className="p-1 focus:outline-none focus:scale-110 transition-transform flex-shrink-0"
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
