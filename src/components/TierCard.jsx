import React from 'react';

const TIERS = [
    { name: 'Red', sc: 0, bgColor: '#E40000', textColor: 'text-white' },
    { name: 'Silver', sc: 250, bgColor: '#A3A5A8', textColor: 'text-white' },
    { name: 'Gold', sc: 500, bgColor: '#C5A059', textColor: 'text-white' },
    { name: 'Platinum', sc: 1000, bgColor: '#2D2D2D', textColor: 'text-white' },
    { name: 'Platinum One', sc: 3600, bgColor: '#EAEAEA', textColor: 'text-[#323232]' },
];

export default function TierCard({ tierIndex = 2, isFavourite = false, onToggleFavourite = null, variant = 'default' }) {
    const safeIndex = Math.max(0, Math.min(4, tierIndex));
    const tier = TIERS[safeIndex];

    const isLightText = tier.textColor === 'text-white';
    const isMini = variant === 'mini';

    return (
        <div
            className={`relative w-full ${isMini ? 'h-full' : 'aspect-[1.8/1]'} rounded-[5px] overflow-hidden shadow-lg p-4 flex flex-col justify-between ${tier.textColor} group cursor-pointer transition-transform active:scale-[0.98] block pointer-events-auto`}
            style={{ backgroundColor: tier.bgColor }}
            onClick={() => {
                if (onToggleFavourite) {
                    onToggleFavourite();
                }
            }}
        >
            {/* Top Row */}
            <div className="flex justify-between items-start z-10">
                {isMini ? <div /> : (
                    <span className="text-[12px] font-medium tracking-tight opacity-90">Velocity Frequent Flyer</span>
                )}
                {/* Favorite Heart - Appears on hover or if isFavourite */}
                <div className={`transition-all duration-300 ${isFavourite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} ${isMini ? '-mt-1 -mr-1' : ''}`}>
                    {isFavourite ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${isLightText ? 'text-white' : 'text-[#323232]'}`}>
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isLightText ? 'text-white' : 'text-[#323232]'}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    )}
                </div>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-end z-10">
                <div className="flex flex-col">
                    {!isMini && <span className="text-[11px] font-medium opacity-90 mb-0.5">Velocity Membership</span>}
                    <span className={`${isMini ? 'text-[17px] font-medium' : 'text-[20px] font-medium'} tracking-tight leading-none`}>{tier.name}</span>
                </div>
                {!isMini && tier.sc >= 0 && (
                    <div className="flex items-center space-x-1 opacity-90">
                        <span className="text-[14px]">★</span>
                        <span className="text-[16px] font-medium">{tier.sc.toLocaleString()}</span>
                        <span className="text-[10px] font-bold uppercase translate-y-[1px]">SC</span>
                    </div>
                )}
            </div>

            {/* Soft gradient shine effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
        </div>
    );
}
