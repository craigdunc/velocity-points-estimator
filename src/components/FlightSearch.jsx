import React from 'react';
import CarIcon from '../assets/icons/hire-cars.svg';
import HotelIcon from '../assets/icons/book-hotels.svg';
import ExperiencesIcon from '../assets/icons/experiences.svg';
import PlaneIcon from '../assets/icons/plane.svg';
import VelocityGlyph from '../assets/icons/velocity-points.svg';

const PlaneCircle = () => (
    <div className="w-[32px] h-[32px] rounded-full bg-[#4C2F92] flex items-center justify-center shrink-0">
        <img src={PlaneIcon} alt="" className="w-[17px] h-[17px]" style={{ filter: 'brightness(0) invert(1)' }} />
    </div>
);

export default function FlightSearch({ showOffer = false }) {
    return (
        <div className="sm:max-w-[1100px] sm:mx-auto w-full">

            {/* Card */}
            <div className="sm:rounded-xl border border-gray-200 bg-white overflow-hidden">

                {/* Desktop top row: two input boxes + plane circle overlapping both */}
                <div className="hidden sm:flex items-center gap-1 p-3">
                    <div className="flex-1 min-w-0 rounded-[4px] px-6 py-3" style={{ backgroundColor: '#F6F4F9' }}>
                        <div className="text-[13px] font-normal text-[#1d1c1f] mb-0.5">Fly from</div>
                        <div className="text-[22px] font-medium text-[#4C2F92]">Airport / city</div>
                    </div>
                    <div className="relative z-10 mx-[-14px] shrink-0">
                        <PlaneCircle />
                    </div>
                    <div className="flex-1 min-w-0 rounded-[4px] px-6 py-3" style={{ backgroundColor: '#F6F4F9' }}>
                        <div className="text-[13px] font-normal text-[#1d1c1f] mb-0.5">Fly to</div>
                        <div className="text-[22px] font-medium text-[#4C2F92]">somewhere</div>
                    </div>
                </div>

                {/* Mobile top row: Search / Book flights */}
                <div className="flex sm:hidden items-center justify-between mx-3 mt-3 px-6 py-4 rounded-xl" style={{ backgroundColor: '#F6F4F9' }}>
                    <div>
                        <div className="text-[13px] font-normal text-[#1d1c1f] mb-0.5">Search</div>
                        <div className="text-[22px] font-medium text-[#4C2F92]">Book flights</div>
                    </div>
                    <PlaneCircle />
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200" />

                {/* Desktop bottom row */}
                <div className="hidden sm:flex items-center px-8 py-[14px] gap-5">
                    {showOffer && (
                        <button className="flex items-center gap-2 text-[13px] font-semibold text-white px-4 py-1.5 rounded-md whitespace-nowrap shrink-0" style={{ backgroundColor: '#4C2F92' }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
                            </svg>
                            1 Offer Available!
                        </button>
                    )}
                    <button className="flex items-center gap-2 text-[14px] text-[#1d1c1f] hover:text-[#4C2F92] transition-colors whitespace-nowrap">
                        <img src={CarIcon} alt="" className="w-[18px] h-[18px]" />
                        Hire Cars
                    </button>
                    <button className="flex items-center gap-2 text-[14px] text-[#1d1c1f] hover:text-[#4C2F92] transition-colors whitespace-nowrap">
                        <img src={HotelIcon} alt="" className="w-[18px] h-[18px]" />
                        Book Hotels
                    </button>
                    <button className="flex items-center gap-2 text-[14px] text-[#1d1c1f] hover:text-[#4C2F92] transition-colors whitespace-nowrap">
                        <img src={ExperiencesIcon} alt="" className="w-[18px] h-[18px]" />
                        Experiences
                    </button>
                    <div className="ml-auto">
                        <button className="text-[14px] text-[#1d1c1f] hover:underline whitespace-nowrap">
                            Link an upcoming trip
                        </button>
                    </div>
                </div>

                {/* Mobile bottom rows */}
                <div className="sm:hidden">
                    <div className="flex divide-x divide-gray-200">
                        <button className="flex-1 flex flex-col items-center gap-2 py-4 text-[13px] text-[#1d1c1f]">
                            <img src={CarIcon} alt="" className="w-[22px] h-[22px]" />
                            Hire Cars
                        </button>
                        <button className="flex-1 flex flex-col items-center gap-2 py-4 text-[13px] text-[#1d1c1f]">
                            <img src={HotelIcon} alt="" className="w-[22px] h-[22px]" />
                            Book Hotels
                        </button>
                        <button className="flex-1 flex flex-col items-center gap-2 py-4 text-[13px] text-[#1d1c1f]">
                            <img src={ExperiencesIcon} alt="" className="w-[22px] h-[22px]" />
                            Experiences
                        </button>
                    </div>
                    <div className="border-t border-gray-200 px-6 py-4">
                        <button className="text-[14px] text-[#1d1c1f]">Link an upcoming trip</button>
                    </div>
                </div>
            </div>

            {/* Earn and Redeem row */}
            <div className="flex items-center gap-2 px-4 sm:px-0 mt-3">
                <img src={VelocityGlyph} alt="" className="w-[18px] h-[18px]" />
                <span className="text-[13px] text-[#1d1c1f]">Earn and Redeem your Velocity Points</span>
            </div>
        </div>
    );
}
