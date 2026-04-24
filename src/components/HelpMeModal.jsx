import React from 'react';
import { WTEs } from '../data';

export default function HelpMeModal({ wteId, earned, target, onClose }) {
    const wte = WTEs.find(w => w.id === Number(wteId));
    if (!wte) return null;

    const highTierPts = wte.tiers?.[4]?.pts || 0;
    const maxMonthly = Math.round(highTierPts / 12);
    const remainingTarget = Math.max(0, target - earned);
    const remainingMax = Math.max(0, maxMonthly - earned);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 animate-fade-in">
            <div className="bg-white rounded-[16px] max-w-[440px] w-full p-8 relative shadow-2xl transform transition-transform animate-scale-up">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 focus:outline-none transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                        <img src={wte.iconSrc} alt={wte.name} className="w-8 h-8 object-contain" />
                    </div>
                    <h3 className="text-[22px] font-bold text-[#323232] leading-tight" style={{ fontFamily: 'GT America Extended, sans-serif' }}>
                        Help me with<br />{wte.name}
                    </h3>
                </div>

                <p className="text-[15px] text-[#444] mb-6 leading-relaxed">
                    You've earned <strong className="text-[#222]">{earned.toLocaleString()} pts</strong> this month.
                    {remainingTarget > 0 ? (
                        <span> You are <strong className="text-[#222]">{remainingTarget.toLocaleString()} pts</strong> away from your monthly target.</span>
                    ) : (
                        <span className="text-[#00a600] font-medium"> You have reached your monthly target!</span>
                    )}
                </p>

                <div className="bg-[#EEF7F8] border border-[#CDE5E7] text-[#00606B] rounded-[8px] p-4 text-[13.5px] mb-6 leading-relaxed">
                    The highest typical earning target for {wte.name} is <strong className="font-bold">{maxMonthly.toLocaleString()} pts</strong> per month.
                    {remainingMax > 0 && ` We'll help you find ways to earn the remaining ${remainingMax.toLocaleString()} pts.`}
                </div>

                <div className="bg-[#F9F9F9] border border-gray-100 rounded-[8px] p-4 mb-4">
                    <p className="text-[14px] font-bold text-[#E40000] mb-1">Tip 1: Maximise everyday usage</p>
                    <p className="text-[13px] text-[#555] leading-relaxed">Ensure you have thoroughly linked your accounts and explore partner offers to boost your earn rate easily.</p>
                </div>

                <div className="bg-[#F9F9F9] border border-gray-100 rounded-[8px] p-4 mb-8">
                    <p className="text-[14px] font-bold text-[#E40000] mb-1">Tip 2: Look out for multipliers</p>
                    <p className="text-[13px] text-[#555] leading-relaxed">Keep an eye out for promotional bonus points campaigns across {wte.name}.</p>
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-[#E40000] text-white py-3.5 rounded-[8px] font-bold text-[16px] hover:bg-[#C20000] transition-colors"
                >
                    Help me get these points
                </button>
            </div>
        </div>
    );
}
