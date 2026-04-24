// src/components/RewardCard.jsx
import React from 'react';
import VelocityPointsIcon from '../assets/icons/velocity-points.svg';

export default function RewardCard({
    reward,
    originCity = 'Sydney',
    onOriginClick,
    isFavorited = false,
    onFavoriteClick,
    variant = 'default'
}) {
    if (!reward) return null;

    const isFlight = reward.type === 'Classic Flight Reward';
    const isMini = variant === 'mini';

    return (
        <div className={`relative w-full ${isMini ? 'h-full' : 'aspect-[1.8/1]'} rounded-[5px] overflow-hidden shadow-lg bg-gray-200 group cursor-pointer block`}>
            {/* Background Image */}
            {reward.imageUrl && (
                <img
                    src={reward.imageUrl}
                    alt={reward.destCity || reward.reward}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            )}

            {/* Favourite Heart Icon - Show solid if favourited, outline on hover if not */}
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    if (onFavoriteClick) onFavoriteClick();
                }}
                className={`absolute top-3 right-3 z-20 cursor-pointer transition-all duration-300 hover:scale-110 ${isFavorited
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
                    }`}
            >
                {isFavorited ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                )}
            </div>

            {/* Dark Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${isMini ? 'from-black/60 to-transparent pointer-events-none' : 'from-black/80 via-black/20 to-black/30'}`}></div>

            {/* Content Container */}
            <div className={`absolute inset-0 ${isMini ? 'p-4' : 'p-3'} flex flex-col justify-between text-white pointer-events-none`}>
                {isMini ? (
                    <>
                        <div />
                        <span className="text-[17px] font-medium drop-shadow-md leading-tight">{reward.destCity || reward.reward}</span>
                    </>
                ) : (
                    <>
                        {/* Top: Badge (if flight) or Icon */}
                        <div className="flex items-start">
                            {isFlight ? (
                                <div className="flex items-center space-x-1.5 bg-white/15 backdrop-blur-md rounded-full px-1.5 py-1 border border-white/20 pointer-events-auto">
                                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shrink-0">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[14px] h-[14px] text-[#E40000]">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.99794 1.33398C10.9434 1.33398 13.3318 3.72162 13.3319 6.66699C13.3319 8.07145 12.7878 9.34814 11.9003 10.3008L13.2724 13.3193C13.4751 13.7664 13.1421 14.2619 12.6679 14.2617L12.5917 14.2578L11.0663 14.0879L10.1493 15.1123C9.83708 15.4606 9.28171 15.3839 9.06728 14.9863L9.0331 14.9131L7.9999 12.3047L6.98622 14.9092C6.81665 15.3443 6.27133 15.4682 5.93056 15.1729L5.87197 15.1162L4.93447 14.0879L3.40517 14.2578C2.91687 14.3119 2.54926 13.8405 2.69716 13.3896L2.72451 13.3193L4.0956 10.3008C3.20848 9.34819 2.66493 8.07125 2.66493 6.66699C2.66511 3.72176 5.05272 1.3342 7.99794 1.33398ZM7.99794 2.66699C5.7891 2.66721 3.99812 4.45814 3.99794 6.66699C3.99794 8.876 5.78899 10.6668 7.99794 10.667C10.2071 10.667 11.9979 8.87613 11.9979 6.66699C11.9978 4.458 10.207 2.66699 7.99794 2.66699ZM7.82509 4.7793C7.89259 4.62989 8.10516 4.62997 8.17275 4.7793L8.66396 5.86719L9.829 5.9873C9.99255 6.00429 10.0588 6.20647 9.9374 6.31738L9.07997 7.10156L9.32509 8.24805C9.35928 8.40933 9.18667 8.53462 9.04384 8.45215L7.99892 7.84766L6.95497 8.45215C6.81214 8.5348 6.63865 8.40934 6.67275 8.24805L6.91884 7.10156L6.06044 6.31738C5.93931 6.20641 6.00632 6.00424 6.16982 5.9873L7.33388 5.86719L7.82509 4.7793Z" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <span className="text-[11px] font-medium leading-[14px]">
                                        Classic Flight Reward
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2.5 pointer-events-auto">
                                    {reward.icon && (
                                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1 shadow-md">
                                            <img src={reward.icon} alt="" className="w-5 h-5" />
                                        </div>
                                    )}
                                    <span className="text-[12px] font-medium tracking-tight">
                                        {reward.type}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Bottom: Destination and Points */}
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col">
                                <button
                                    onClick={(e) => {
                                        if (onOriginClick) {
                                            e.stopPropagation();
                                            onOriginClick();
                                        }
                                    }}
                                    className={`text-[10px] font-semibold opacity-90 drop-shadow-md text-left pointer-events-auto ${onOriginClick ? 'hover:underline cursor-pointer' : ''}`}
                                >
                                    {reward.destCity ? `${originCity} to` : ''}
                                </button>
                                <span className="text-[16px] font-medium drop-shadow-lg leading-tight mb-0.5">
                                    {reward.destCity || reward.reward}
                                </span>
                                {isFlight && (
                                    <span className="text-[10px] font-medium opacity-90">
                                        + $180 charges
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center space-x-1.5 drop-shadow-lg pb-0.5 pointer-events-auto">
                                <img src={VelocityPointsIcon} alt="" className="w-[18px] h-[18px]" />
                                <div className="flex items-baseline space-x-1">
                                    <span className="text-[16px] font-medium uppercase mt-0.5">
                                        {reward.pts.toLocaleString()}
                                    </span>
                                    <span className="text-[9px] font-bold uppercase opacity-80">
                                        PTS
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
