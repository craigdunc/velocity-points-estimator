import React from 'react';
import Header from '../components/Header';
import { useSaveSlots } from '../state/useSaveSlots';

export default function SettingsScreen({ goTo, goBack }) {
    const { current, setOpaqueSpend, setOpaqueEarn } = useSaveSlots();
    const opaqueSpend = current?.opaqueSpend ?? false;
    const opaqueEarn = current?.opaqueEarn ?? false;

    return (
        <div className="min-h-screen bg-[#F3F5F7] font-sans text-[#323232] flex flex-col items-center">
            <div className="w-full max-w-[1440px] relative flex flex-col pb-20">
                <Header
                    isMobile={false}
                    onProfileClick={() => goTo(0)}
                    activeTab=""
                    onTabClick={(tab) => {
                        if (tab === 'My Velocity') goTo(5);
                        if (tab === 'Earn and use points') goTo(3);
                    }}
                    onSettingsClick={() => goBack()}
                />

                <div className="w-full max-w-[1218px] mx-auto px-4 xl:px-0 pt-10">
                    <h1 className="text-[28px] font-normal text-[#323232] mb-8">Settings</h1>

                    {/* Settings Panel 1 */}
                    <div className="bg-white rounded-[8px] shadow-sm p-8 mb-16">
                        <h2 className="text-[16px] font-medium text-[#323232] mb-6">
                            Specify Example Earn
                        </h2>

                        <div className="flex items-center space-x-12 mb-10">
                            <span className="text-[14px] text-[#323232] w-[180px]">{opaqueEarn ? 'Opaque Example Earn' : 'Specific Example Earn'}</span>
                            <button
                                className={`w-[46px] h-[24px] rounded-full p-0.5 flex items-center transition-colors border border-gray-300 ${opaqueEarn ? 'bg-white' : 'bg-white'}`}
                                onClick={() => setOpaqueEarn(!opaqueEarn)}
                            >
                                <div
                                    className={`w-5 h-5 rounded-full shadow-sm transform transition-transform ${opaqueEarn ? 'translate-x-[22px] bg-[#323232]' : 'translate-x-0 bg-[#323232]'}`}
                                />
                            </button>
                        </div>

                        <h2 className="text-[16px] font-medium text-[#323232] mb-6">
                            Specify Example Spend
                        </h2>

                        <div className="flex items-center space-x-12">
                            <span className="text-[14px] text-[#323232] w-[180px]">{opaqueSpend ? 'Opaque Example Spend' : 'Specific Example Spend'}</span>
                            <button
                                className={`w-[46px] h-[24px] rounded-full p-0.5 flex items-center transition-colors border border-gray-300 ${opaqueSpend ? 'bg-white' : 'bg-white'}`}
                                onClick={() => setOpaqueSpend(!opaqueSpend)}
                            >
                                <div
                                    className={`w-5 h-5 rounded-full shadow-sm transform transition-transform ${opaqueSpend ? 'translate-x-[22px] bg-[#323232]' : 'translate-x-0 bg-[#323232]'}`}
                                />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
