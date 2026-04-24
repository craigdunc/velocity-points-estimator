import React, { useState } from 'react';
import CopyIconSvg from '../assets/icons/copy.svg';

// Wrapped in a div so absolute inset-0 stretches the container,
// then the SVG fills it with w-full h-full — avoids intrinsic-size conflict.
const TailFin = () => (
    <div className="absolute top-[30px] left-0 bottom-0 w-[800px] pointer-events-none">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 720 190"
            preserveAspectRatio="none"
            fill="none"
            style={{ display: 'block', width: '100%', height: '100%' }}
        >
            <path d="M418.285 0C455.517 0 477.895 5.78922 506.017 27.0122L719.999 190H0V0H418.285Z" fill="url(#tailFinGradient)" />
            <defs>
                <linearGradient id="tailFinGradient" x1="719.999" y1="0" x2="626.25" y2="355.261" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E10A0A" />
                    <stop offset="1" stopColor="#5D0404" />
                </linearGradient>
            </defs>
        </svg>
    </div>
);

const CopyIcon = () => (
    <img src={CopyIconSvg} alt="" width="16" height="16" style={{ filter: 'brightness(0) invert(1)' }} />
);

export default function IDWelcome({
    memberName = 'Craig Duncan',
    memberNumber = '1227 062 631',
    memberSince = '2024',
    tier = 'Red',
}) {
    const [copied, setCopied] = useState(false);

    const firstName = memberName.split(' ')[0];

    const handleCopy = () => {
        navigator.clipboard.writeText(memberNumber.replace(/\s/g, ''));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="sm:max-w-[1100px] sm:mx-auto w-full">
            {/* Card */}
            <div className="relative overflow-hidden sm:rounded-xl" style={{ minHeight: 220 }}>

                {/* Layer 1: gradient base */}
                <div
                    className="absolute inset-0"
                    style={{ backgroundImage: 'linear-gradient(135deg, rgb(225,10,10) 0px, rgb(93,4,4) 100%)' }}
                />

                {/* Layer 2: tailfin SVG wave */}
                <TailFin />

                {/* Layer 3: content */}
                <div
                    className="relative flex items-stretch gap-[30px] px-6 sm:px-10 py-8"
                    style={{ minHeight: 220 }}
                >
                    {/* Left: welcome pushed down 40px, member info grouped at bottom */}
                    <div className="flex-1 flex flex-col">
                        <h1
                            className="text-white"
                            style={{ marginTop: 40 }}
                        >
                            <span className="max-[480px]:block text-[30px] max-[480px]:text-[14px] font-medium max-[480px]:font-normal leading-[38px] max-[480px]:leading-[22px]">
                                Welcome back,{' '}
                            </span>
                            <span className="max-[480px]:block text-[30px] max-[480px]:text-[37px] font-medium max-[480px]:font-bold leading-[38px] max-[480px]:leading-[37px]">
                                {firstName}
                            </span>
                        </h1>

                        {/* Member number + since grouped at bottom */}
                        <div className="mt-auto">
                            <div className="relative mb-1">
                                <button
                                    onClick={handleCopy}
                                    title={copied ? 'Copied!' : 'Copy membership number to clipboard'}
                                    aria-label="Copy membership number to clipboard"
                                    className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
                                >
                                    <CopyIcon />
                                    <span className="text-[15px] font-medium">{memberNumber}</span>
                                </button>
                                {copied && (
                                    <span className="absolute -top-7 left-0 text-[11px] bg-black text-white px-2 py-0.5 rounded whitespace-nowrap">
                                        Copied!
                                    </span>
                                )}
                            </div>
                            <p className="text-white text-[15px]">Member since {memberSince}</p>
                        </div>
                    </div>

                    {/* Right: tier level — bottom-aligned with "Member since" */}
                    <div className="flex items-end shrink-0">
                        <span
                            className="text-white"
                            style={{
                                fontFamily: "'GT America Extended', 'Montserrat', arial, sans-serif",
                                fontSize: 40,
                                fontWeight: 100,
                                lineHeight: '40px',
                                textShadow: 'rgba(0,0,0,0.25) 0px 2px 10px',
                            }}
                        >
                            {tier}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
