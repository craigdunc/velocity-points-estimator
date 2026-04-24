import React, { useState } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import BingeLogo from '../assets/logos/binge.svg';

export default function FindOutMoreBinge({ onClose }) {
    const { current, updateWTEFavourites } = useSaveSlots();
    const favorites = new Set(current?.wteFavourites?.[7] || []);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const contentCategories = [
        { id: '1', name: 'HBO Originals', category: 'TV Shows', desc: 'World-class series like Succession, The Last of Us, and House of the Dragon.' },
        { id: '2', name: 'Blockbuster Movies', category: 'Movies', desc: 'The latest Hollywood hits, action films, and critically acclaimed cinema.' },
        { id: '3', name: 'True Crime', category: 'Documentaries', desc: 'Gripping docuseries and investigative specials.' },
        { id: '4', name: 'Reality TV', category: 'Reality', desc: 'Binge-worthy drama from The Real Housewives, Below Deck, and more.' },
        { id: '5', name: 'Australian Drama', category: 'TV Shows', desc: 'Award-winning local productions and returning Aussie favorites.' },
        { id: '6', name: 'Comedy Specials', category: 'Comedy', desc: 'Stand-up specials and beloved sitcoms to keep you laughing.' },
        { id: '7', name: 'Lifestyle & Design', category: 'Lifestyle', desc: 'Home renovation, cooking shows, and travel adventures.' },
        { id: '8', name: 'Family & Kids', category: 'Family', desc: 'Entertaining movies and shows perfect for the whole family.' },
    ];

    const displayedContent = selectedCategory === 'All'
        ? contentCategories
        : contentCategories.filter(c => c.category === selectedCategory);

    const toggleFav = (itemId) => {
        updateWTEFavourites(7, String(itemId));
    };

    return (
        <div className="w-full h-full flex flex-col items-stretch overflow-hidden bg-white text-left">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
                <h2 className="text-[18px] font-light text-[#323232]" style={{ fontFamily: 'GT America Extended, sans-serif' }}>
                    Binge
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
                        <img src={BingeLogo} alt="Binge" className="w-8 h-8 object-contain" />
                    </div>
                    <h3 className="text-[22px] font-medium text-[#323232]" style={{ fontFamily: 'GT America Extended, sans-serif' }}>
                        Binge
                    </h3>
                </div>

                <p className="text-[14px] text-[#222222] mb-6 leading-relaxed">
                    Score 1,000 bonus points when you join Binge, plus 50 points every month you stay subscribed. Stream the world's best shows and movies.
                </p>

                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[16px] font-bold text-[#323232]">Content Categories</h4>
                    <div className="relative">
                        <select
                            className="appearance-none bg-gray-50/80 hover:bg-gray-100 py-1.5 pl-3 pr-8 rounded-[8px] border border-gray-200 text-[13px] font-medium text-[#444] outline-none transition-colors cursor-pointer"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="TV Shows">TV Shows</option>
                            <option value="Movies">Movies</option>
                            <option value="Documentaries">Documentaries</option>
                            <option value="Reality">Reality</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Family">Family</option>
                        </select>
                        <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {displayedContent.map(c => {
                        const isFav = favorites.has(String(c.id));
                        return (
                            <div key={c.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-[#F9F9F9] hover:bg-[#F0F8F8] transition-colors">
                                <div className="flex flex-col pr-4">
                                    <span className="text-[14px] font-medium text-[#323232]">{c.name}</span>
                                    <span className="text-[12px] text-[#E40000] font-medium my-0.5">{c.category}</span>
                                    <span className="text-[12px] text-gray-500 leading-snug">{c.desc}</span>
                                </div>
                                <button
                                    onClick={() => toggleFav(c.id)}
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
