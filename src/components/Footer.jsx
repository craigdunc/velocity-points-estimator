import React from 'react';
import VelocityLogo from '../assets/logos/qantas.svg'; // TODO: replace with actual Velocity logo
import fbIcon from '../assets/icons/fb.svg';
import xIcon from '../assets/icons/x.svg';
import inIcon from '../assets/icons/in.svg';
import tiktokIcon from '../assets/icons/tiktok.svg';
import instaIcon from '../assets/icons/insta.svg';
import youtubeIcon from '../assets/icons/youtube.svg';

const socialIcons = {
    facebook: <img src={fbIcon} alt="Facebook" className="w-12 h-12" />,
    x: <img src={xIcon} alt="X" className="w-12 h-12" />,
    linkedin: <img src={inIcon} alt="LinkedIn" className="w-12 h-12" />,
    tiktok: <img src={tiktokIcon} alt="TikTok" className="w-12 h-12" />,
    instagram: <img src={instaIcon} alt="Instagram" className="w-12 h-12" />,
    youtube: <img src={youtubeIcon} alt="YouTube" className="w-12 h-12" />
};

export default function Footer() {
    return (
        <footer className="w-full bg-[#f3f3f3] text-[#323232] pt-8 font-sans border-t border-gray-200">
            <div className="max-w-[1218px] mx-auto px-4 md:px-6">

                <div className="flex justify-end mb-12">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center text-[14px] text-gray-500 hover:text-[#323232] transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                        Back to top
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
                    <div className="lg:col-span-1">
                        <img src={VelocityLogo} alt="Velocity" className="h-[22px] mb-6 object-contain" />
                    </div>

                    <div>
                        <h4 className="font-medium text-[16px] mb-5">About us</h4>
                        <ul className="space-y-4 text-[#666] text-[14px]">
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">About Virgin Australia</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">oneworld</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">News Room</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Virgin Australia Pilot Academy</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-[16px] mb-5">Virgin Australia Group</h4>
                        <ul className="space-y-4 text-[#666] text-[14px]">
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">About Virgin Australia Group</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Careers</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-[16px] mb-5">Support</h4>
                        <ul className="space-y-4 text-[#666] text-[14px]">
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Help & support</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Contact us</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Travel credits</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Specific needs</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-[16px] mb-5">Virgin Australia App</h4>
                        <ul className="space-y-4 text-[#666] text-[14px]">
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Virgin Australia App iOS</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Virgin Australia App Android</li>
                        </ul>
                    </div>
                </div>

                <div className="mb-12">
                    <h4 className="font-medium text-[16px] mb-5">Connect with us</h4>
                    <div className="flex space-x-4 text-[#323232]">
                        {Object.entries(socialIcons).map(([key, icon]) => (
                            <button key={key} className="hover:text-[#E40000] transition-colors p-1 -ml-1">
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-300 pt-8 pb-12 flex flex-col lg:flex-row justify-between items-start lg:items-center text-[#666] text-[13px]">
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 lg:mb-0">
                        <span className="hover:text-[#E40000] hover:underline cursor-pointer">Privacy & security</span>
                        <span className="hover:text-[#E40000] hover:underline cursor-pointer">Terms of Use</span>
                        <span className="hover:text-[#E40000] hover:underline cursor-pointer">Conditions of Carriage</span>
                        <span className="hover:text-[#E40000] hover:underline cursor-pointer">Modern Slavery Act Statement (PDF)</span>
                        <span className="hover:text-[#E40000] hover:underline cursor-pointer">Reconciliation Action Plan</span>
                        <span className="hover:text-[#E40000] hover:underline cursor-pointer">Access & Inclusion Plan</span>
                        <span className="hover:text-[#E40000] hover:underline cursor-pointer">Fare types</span>
                    </div>
                    <div className="text-right whitespace-nowrap">
                        © Virgin Australia Airlines Pty Ltd ABN 36 090 670 965
                    </div>
                </div>
            </div>

            <div className="bg-[#e6e6e6] py-6 border-t border-gray-300">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 xl:px-8">
                    <p className="text-[13px] text-[#323232] font-semibold">
                        Virgin Australia would like to acknowledge the Traditional Custodians of the local lands and waterways on which we live, work and fly. We pay our respects to Elders past and present.
                    </p>
                </div>
            </div>
        </footer>
    );
}