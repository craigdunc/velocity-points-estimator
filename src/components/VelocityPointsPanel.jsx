import React, { useState } from 'react';
import YouIcon from '../assets/icons/you-icon.svg';
import CornerBg from '../assets/icons/corner.svg';
import ActivityIcon from '../assets/icons/activity.svg';
import MilestonesIcon from '../assets/icons/milestones.svg';
import ErrorStateImg from '../assets/icons/error-state.svg';

export default function VelocityPointsPanel({ points = 0, pointsThisMonth = 0 }) {
    const [activeTab, setActiveTab] = useState('activity');

    return (
        <div className="flex flex-col gap-3">

            {/* Points card */}
            <div className="bg-white rounded-xl border border-gray-200 relative overflow-hidden">
                {/* Corner decoration */}
                <div className="absolute top-0 right-0" style={{ width: 86, height: 56 }}>
                    <img src={CornerBg} alt="" className="absolute inset-0 w-full h-full" />
                    <img src={YouIcon} alt="" style={{ position: 'absolute', top: '50%', left: 'calc(50% + 15px)', transform: 'translate(-50%, -50%)', width: 24, height: 24, filter: 'brightness(0) invert(1)' }} />
                </div>

                <div className="px-6 py-5 pr-[80px]">
                    <div className="text-[15px] text-gray-500 mb-1">Velocity Points</div>
                    <div className="text-[30px] font-bold text-[#1d1c1f] leading-tight">
                        {points} <span className="text-[20px] font-normal">pts</span>
                    </div>
                    <div className="text-[13px] text-gray-500 mt-1">+{pointsThisMonth} points earned this month</div>
                </div>
            </div>

            {/* Activity / Milestones tabs */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden min-[1200px]:border-0 min-[1200px]:rounded-none min-[1200px]:bg-transparent min-[1200px]:border-b">
                <div className="flex">
                    {[
                        { id: 'activity', label: 'Activity', icon: ActivityIcon },
                        { id: 'milestones', label: 'Milestones', icon: MilestonesIcon },
                    ].map(({ id, label, icon }, i) => {
                        const isActive = activeTab === id;
                        return (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`relative flex-1 flex flex-col items-center gap-1.5 py-[9px] text-[14px] font-medium transition-colors
                                    ${i === 0 ? 'border-r border-gray-200 min-[1200px]:border-r-0' : ''}
                                    ${isActive ? 'text-[#1d1c1f]' : 'text-[#1d1c1f] min-[1200px]:text-gray-400'}`}
                            >
                                <img src={icon} alt="" className="w-[20px] h-[20px] min-[1200px]:hidden" />
                                {label}
                                {isActive && (
                                    <span className="hidden min-[1200px]:block absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1d1c1f]" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Activity empty state — only in two-column layout */}
                {activeTab === 'activity' && (
                    <div className="hidden min-[1200px]:flex flex-col items-center text-center px-6 pt-8 pb-6 border-t border-gray-100">
                        <img src={ErrorStateImg} alt="" className="w-[110px] h-[110px] mb-4" />
                        <p className="text-[15px] font-medium text-[#1d1c1f] mb-2">You currently have no transactions</p>
                        <p className="text-[14px] text-gray-500 mb-6">
                            Get started by viewing and activating one of our offers
                        </p>
                        <button className="w-full py-3 rounded-lg border border-[#4C2F92] text-[#4C2F92] text-[15px] font-medium hover:bg-purple-50 transition-colors">
                            Start Earning
                        </button>
                    </div>
                )}

                {/* Milestones empty state placeholder — only in two-column layout */}
                {activeTab === 'milestones' && (
                    <div className="hidden min-[1200px]:flex flex-col items-center text-center px-6 py-10 border-t border-gray-100">
                        <p className="text-[14px] text-gray-400">No milestones yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
