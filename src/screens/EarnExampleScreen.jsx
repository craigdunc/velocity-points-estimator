import React from 'react';

import { generateEarnExample } from '../utils/generateEarnExample';
import { maskSpend } from '../utils/maskSpend';
import { maskPts } from '../utils/maskPts';
import { useSaveSlots } from '../state/useSaveSlots';

export default function EarnExampleScreen({ wte, tierIdx, onClose }) {
    const { current } = useSaveSlots();
    const opaqueSpend = current?.opaqueSpend ?? false;
    const opaqueEarn = current?.opaqueEarn ?? false;
    const displaySpend = (str) => opaqueSpend ? maskSpend(str) : str;
    const displayPts = (str) => opaqueEarn ? maskPts(str) : str;

    if (!wte) return null;

    const exampleData = generateEarnExample(wte, tierIdx);
    const { personaName, personaImg, personaDesc, tableData, spendStr, ptsStr } = exampleData;
    return (
        <div className="w-full h-full flex flex-col bg-white overflow-y-auto no-scrollbar relative animate-duo-entrance">
            <div className="flex items-center justify-between pb-4 pt-2 sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-4">
                <h2 className="text-[24px] font-medium text-[#222]" style={{ fontFamily: 'GT America Extended, sans-serif' }}>Earn Example</h2>
                <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800 transition-colors bg-gray-50 rounded-full hover:bg-gray-100">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="px-4 pb-12 pt-2">
                <div className="mb-8 pl-1">
                    <p className="font-bold text-[#222] text-[15px] mb-1 leading-snug">{wte.name}: {displayPts(ptsStr)} Velocity Points in 2025</p>
                    <p className="text-[#666] text-[14px] leading-snug">{opaqueSpend ? `${displaySpend(spendStr)} ${wte.name} spent in 2025` : `Approximately $${displaySpend(spendStr)} ${wte.name} spent in 2025`}</p>
                </div>

                <h3 className="font-bold text-[18px] text-[#222] mb-4 pl-1" style={{ fontFamily: 'GT America Extended, sans-serif' }}>Meet {personaName}</h3>
                <img src={personaImg} alt={personaName} className="w-full aspect-[2/1] object-cover rounded-[4px] mb-6" />

                <p className="text-[13px] text-[#444] leading-[1.6] mb-8 pr-4">
                    {personaDesc}
                </p>

                <h3 className="font-bold text-[16px] text-[#222] mb-5 pl-1" style={{ fontFamily: 'GT America Extended, sans-serif' }}>{personaName}'s {wte.name} in 2025</h3>

                <div className="w-full overflow-x-auto mb-10 pl-1 pr-6">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead>
                            <tr className="border-b-[1.5px] border-[#222]">
                                <th className="py-2.5 px-1 text-[11px] font-bold text-[#222] uppercase tracking-wide">Date</th>
                                <th className="py-2.5 px-1 text-[11px] font-bold text-[#222] uppercase tracking-wide">Item</th>
                                <th className="py-2.5 px-1 text-[11px] font-bold text-[#222] uppercase tracking-wide text-right">Spend</th>
                                <th className="py-2.5 px-1 text-[11px] font-bold text-[#222] uppercase tracking-wide text-right">Velocity Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, i) => (
                                <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-1 text-[12px] text-[#222] font-medium align-top w-[110px]">{row.date}</td>
                                    <td className="py-3 px-1 text-[12px] text-[#444] align-top">{row.item}</td>
                                    <td className="py-3 px-1 text-[12px] text-[#444] align-top text-right w-[90px]">{displaySpend(row.spend)}</td>
                                    <td className="py-3 px-1 text-[12px] text-[#222] font-medium align-top text-right w-[110px]">{displayPts(row.points)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="text-[10px] text-[#888] leading-relaxed pl-1 pr-4">
                    Important Information: The information presented in this example is for illustrative purposes only and does not constitute financial, travel, or loyalty advice. Points earn rates, partner eligibility, and promotional offers are subject to change and may vary depending on date of purchase, partner, and current promotions. Points shown reflect estimated base earn under the applicable Velocity Frequent Flyer earning rates at the time of publication and do not include status bonuses or tier multipliers. Bonus points shown for eligible WTEs are one-time (Year 1 only) and subject to offer availability and expiry. Actual points earned may differ. Always refer to the official Velocity Frequent Flyer program terms and conditions before transacting.
                </div>
            </div>
        </div>
    );
}
