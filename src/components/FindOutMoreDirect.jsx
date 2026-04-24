import React, { useState } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import DirectLinkLogo from '../assets/logos/direct-link-partners.svg';

export default function FindOutMoreDirect({ onClose }) {
    const { current, updateWTEFavourites } = useSaveSlots();
    const favorites = new Set(current?.wteFavourites?.[21] || []);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const directPartners = [
        // Finance
        { id: '1', name: 'Sniip', category: 'Finance', desc: 'Earn points on your bills by paying with Sniip.' },
        { id: '2', name: 'Superhero', category: 'Finance', desc: 'Earn points when you trade shares with Superhero.' },
        { id: '3', name: 'Zip', category: 'Finance', desc: 'Link your account and earn points on your everyday purchases.' },
        // Travel
        { id: '4', name: 'Lotte Duty Free', category: 'Travel', desc: 'Earn points on duty-free shopping before you fly.' },
        { id: '5', name: 'Sydney Airport Parking', category: 'Travel', desc: 'Earn points when you park at Sydney Airport.' },
        // Home & Retail
        { id: '6', name: 'Carpet Court', category: 'Home & Retail', desc: 'Earn points on your new flooring purchases.' },
        { id: '7', name: 'David Jones', category: 'Home & Retail', desc: 'Earn points when you shop select categories at David Jones.' },
        { id: '8', name: 'Forty Winks', category: 'Home & Retail', desc: 'Get a better night sleep and earn points on your new mattress.' },
        { id: '9', name: 'HelloFresh', category: 'Food & Drink', desc: 'Earn points on your weekly meal kit deliveries.' },
        { id: '10', name: 'Luxaflex', category: 'Home & Retail', desc: 'Earn points on premium blinds, shutters, and awnings.' },
        { id: '11', name: 'Pizza Hut', category: 'Food & Drink', desc: 'Link your account to earn points on every pizza order.' },
        { id: '12', name: 'Spotlight', category: 'Home & Retail', desc: 'Earn points on fabric, craft, and party supplies.' },
        // Health, Services & Entertainment
        { id: '13', name: 'Fitness First', category: 'Health & Fitness', desc: 'Earn points when you join and maintain your membership.' },
        { id: '14', name: 'Goodlife Health Clubs', category: 'Health & Fitness', desc: 'Earn points for hitting the gym regularly.' },
        { id: '15', name: 'Mobile Tyre Shop', category: 'Services', desc: 'Earn points on your new tyres with mobile fitting.' },
        { id: '16', name: 'Solargain', category: 'Services', desc: 'Earn points when you switch to solar energy.' },
        { id: '17', name: 'Ticketek', category: 'Entertainment', desc: 'Link to earn points on select concerts and sports events.' },
        // Footwear & Apparel
        { id: '18', name: 'Platypus', category: 'Footwear & Apparel', desc: 'Earn points on the latest sneakers and streetwear.' },
        { id: '19', name: 'Dr Martens', category: 'Footwear & Apparel', desc: 'Earn points on iconic boots and footwear.' },
        { id: '20', name: 'Hype DC', category: 'Footwear & Apparel', desc: 'Earn points on premium sneaker brands.' },
        { id: '21', name: 'The Athlete\'s Foot', category: 'Footwear & Apparel', desc: 'Earn points on performance athletic footwear.' },
        { id: '22', name: 'Skechers', category: 'Footwear & Apparel', desc: 'Earn points on comfortable everyday shoes.' },
        { id: '23', name: 'Vans', category: 'Footwear & Apparel', desc: 'Earn points on classic skate shoes and apparel.' },
        { id: '24', name: 'Timberland', category: 'Footwear & Apparel', desc: 'Earn points on rugged outdoor boots and clothing.' },
        { id: '25', name: 'Stylerunner', category: 'Footwear & Apparel', desc: 'Earn points on premium women\'s activewear.' },
        { id: '26', name: 'Merrell', category: 'Footwear & Apparel', desc: 'Earn points on hiking and outdoor footwear.' },
        { id: '27', name: 'Saucony', category: 'Footwear & Apparel', desc: 'Earn points on performance running shoes.' },
        { id: '28', name: 'Hoka', category: 'Footwear & Apparel', desc: 'Earn points on maximum-cushion running shoes.' },
        { id: '29', name: 'Subtype', category: 'Footwear & Apparel', desc: 'Earn points on curated sneaker and apparel releases.' },
        { id: '30', name: 'The Trybe', category: 'Footwear & Apparel', desc: 'Earn points on kids\' footwear from top brands.' },
        { id: '31', name: 'CAT', category: 'Footwear & Apparel', desc: 'Earn points on durable work and lifestyle boots.' },
        { id: '32', name: 'UGG', category: 'Footwear & Apparel', desc: 'Earn points on classic sheepskin boots and slippers.' },
    ];

    const displayedPartners = selectedCategory === 'All'
        ? directPartners
        : directPartners.filter(p => p.category === selectedCategory);

    const categories = ['All', ...new Set(directPartners.map(p => p.category))];

    const toggleFav = (itemId) => {
        updateWTEFavourites(21, String(itemId));
    };

    return (
        <div className="w-full h-full flex flex-col items-stretch overflow-hidden bg-white text-left">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
                <h2 className="text-[18px] font-light text-[#323232]" style={{ fontFamily: 'GT America Extended, sans-serif' }}>
                    Direct Link Partners
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
                        <img src={DirectLinkLogo} alt="Direct Link Partners" className="w-8 h-8 object-contain" />
                    </div>
                    <h3 className="text-[22px] font-medium text-[#323232]" style={{ fontFamily: 'GT America Extended, sans-serif' }}>
                        Direct Link Partners
                    </h3>
                </div>

                <p className="text-[14px] text-[#222222] mb-6 leading-relaxed">
                    Some partners don't require you to click through Qantas Shopping. Just link your Frequent Flyer account with the partner once, and earn points automatically every time you transact.
                </p>

                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[16px] font-bold text-[#323232]">Featured Partners</h4>
                    <div className="relative">
                        <select
                            className="appearance-none bg-gray-50/80 hover:bg-gray-100 py-1.5 pl-3 pr-8 rounded-[8px] border border-gray-200 text-[13px] font-medium text-[#444] outline-none transition-colors cursor-pointer"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat === 'All' ? 'All Categories' : cat}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {displayedPartners.map(p => {
                        const isFav = favorites.has(String(p.id));
                        return (
                            <div key={p.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-[#F9F9F9] hover:bg-[#F0F8F8] transition-colors">
                                <div className="flex flex-col pr-4">
                                    <span className="text-[14px] font-medium text-[#323232]">{p.name}</span>
                                    <span className="text-[12px] text-[#E40000] font-medium my-0.5">{p.category}</span>
                                    <span className="text-[12px] text-gray-500 leading-snug">{p.desc}</span>
                                </div>
                                <button
                                    onClick={() => toggleFav(p.id)}
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
