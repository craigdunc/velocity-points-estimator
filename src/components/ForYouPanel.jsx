import React from 'react';
import UnloanLogo from '../assets/logos/unloan_logo.png';
import GetMostOutOfVelocity from './GetMostOutOfVelocity';

export default function ForYouPanel() {
    return (
        <div>
            {/* For you section — outer card at lg+, no outer card below lg */}
            <div className="mt-8 min-[1200px]:mt-0 lg:bg-white lg:rounded-xl lg:border lg:border-gray-200 lg:p-5">
                <h2 className="text-[22px] font-semibold text-[#1d1c1f] mb-4 px-4 sm:px-0 lg:px-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>My Velocity</h2>

                <div className="mx-4 sm:mx-0 bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                        <img src={UnloanLogo} alt="unloan." className="w-[60px] h-[48px] object-contain" />
                        <span className="text-[15px] font-medium text-[#1d1c1f]">
                            Earn up to 250k Points with a home loan*
                        </span>
                    </div>
                    <p className="text-[14px] text-gray-600 mb-5">
                        You could receive Velocity Points if you apply for and settle an Unloan home loan.*
                    </p>
                    <div className="flex items-end justify-between gap-4">
                        <a href="#" className="text-[13px] text-[#4C2F92] hover:underline">
                            *T&Cs and excl. apply
                        </a>
                        <button className="shrink-0 px-5 py-2 rounded border border-[#4C2F92] text-[#4C2F92] text-[14px] font-medium hover:bg-purple-50 transition-colors">
                            Learn more
                        </button>
                    </div>
                </div>
            </div>

            {/* Get the most out of Velocity */}
            <GetMostOutOfVelocity />
        </div>
    );
}
