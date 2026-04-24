import React from 'react';
import FooterGlyph      from '../assets/icons/footer-glyph.svg';
import LinkOut          from '../assets/icons/link-out.svg';
import FacebookIcon     from '../assets/icons/footer_red_facebook_small.svg';
import InstagramIcon    from '../assets/icons/footer_red_instagram_small.svg';
import LinkedInIcon     from '../assets/icons/footer_red_linkedin_small.svg';
import ChromeCTA        from '../assets/logos/Add_to_Google_Chrome_CTA_2x.png';
import AppStore         from '../assets/logos/App_Store_download_2x.png';
import PlayStore        from '../assets/logos/Play_store_download_2x.png';
import VelocityLogo     from '../assets/logos/Velocity_Stacked_Logo_red_and_black.svg';
import VirginLockup     from '../assets/logos/Virgin_Velocity_lockup_logo.svg';

const HEADING = 'text-[15px] font-semibold text-[#2d054e] mb-3';
const LINK    = 'block text-[14px] text-[#1d1c1f] hover:underline mb-2';
const LINK_P  = 'block text-[14px] text-[#4C2F92] hover:underline mb-2';

const HELP_LINKS = [
    { label: 'Contact Us',     purple: false },
    { label: 'Help centre',    purple: true  },
    { label: 'Accessibility',  purple: false },
    { label: 'Velocity Log in',purple: true  },
    { label: 'MFA Help Hub',   purple: true  },
];

const BLOG_LINKS = [
    { label: 'View by Velocity',   purple: true },
    { label: 'Travel Inspiration', purple: true },
];

const SOCIAL = [
    { icon: FacebookIcon,  label: 'Facebook'  },
    { icon: InstagramIcon, label: 'Instagram' },
    { icon: LinkedInIcon,  label: 'LinkedIn'  },
];

const LEGAL_LINKS = ['Terms and conditions', 'Terms of Use', 'Privacy', 'Media centre'];

export default function SiteFooter() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="relative bg-white border-t border-gray-200 mt-12">

                    {/* Scroll to top — straddles the footer top border */}
                    <button
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        className="absolute -top-[20px] right-6 w-[40px] h-[40px] rounded-full border-2 border-[#E40000] text-[#E40000] bg-white flex items-center justify-center p-0 hover:bg-red-50 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" style={{ transform: 'rotate(-90deg)' }}>
                            <path fill="none" fillRule="evenodd" stroke="#E40000" strokeLinecap="square" strokeWidth="2" d="M2 2l4 4-4 4"/>
                        </svg>
                    </button>

            <div className="max-w-[1100px] mx-auto px-6 py-10">

                {/* ── Top links grid ── */}
                <div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">

                        {/* Help and Support */}
                        <div>
                            <p className={HEADING}>Help and Support</p>
                            {HELP_LINKS.map(({ label, purple }) => (
                                <a key={label} href="#" className={purple ? LINK_P : LINK}>{label}</a>
                            ))}
                        </div>

                        {/* Read Our Blogs */}
                        <div>
                            <p className={HEADING}>Read Our Blogs</p>
                            {BLOG_LINKS.map(({ label }) => (
                                <a key={label} href="#" className={LINK_P}>{label}</a>
                            ))}
                        </div>

                        {/* Get Velocity Shop & Earn */}
                        <div>
                            <p className={HEADING}>Get Velocity Shop &amp; Earn</p>
                            <a href="#">
                                <img src={ChromeCTA} alt="Available for Google Chrome" className="h-[44px] w-auto" />
                            </a>
                        </div>

                        {/* Get the Velocity App */}
                        <div>
                            <p className={HEADING}>Get the Velocity App</p>
                            <div className="flex flex-wrap gap-2">
                                <a href="#"><img src={AppStore}  alt="Download on the App Store" className="h-[44px] w-auto" /></a>
                                <a href="#"><img src={PlayStore} alt="Get it on Google Play"     className="h-[44px] w-auto" /></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="border-t border-gray-200 mt-8 pt-6 space-y-5">

                    {/* Social links */}
                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                        {SOCIAL.map(({ icon, label }) => (
                            <a key={label} href="#" className="flex items-center gap-1.5 text-[14px] text-[#1d1c1f] hover:underline">
                                <img src={icon} alt="" className="w-[20px] h-[20px]" />
                                {label}
                                <img src={LinkOut} alt="" className="w-[12px] h-[12px] opacity-60" />
                            </a>
                        ))}
                    </div>

                    {/* Reconciliation statement */}
                    <p className="text-[13px] text-[#1d1c1f] leading-relaxed max-w-[780px]">
                        In the spirit of reconciliation Virgin Australia acknowledges the traditional custodians of country throughout Australia and their
                        connections to land, sea, sky and community. We pay our respect to their Elders past and present and extend that respect to all{' '}
                        <a href="#" className="text-[#4C2F92] hover:underline">Aboriginal and Torres Strait Islander peoples today</a>.
                    </p>

                    {/* Copyright + logos */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <p className="text-[13px] text-[#1d1c1f] leading-relaxed">
                            © Velocity Frequent Flyer Pty Limited ACN 601 408 824
                            {LEGAL_LINKS.map(link => (
                                <span key={link}>
                                    {' '}<span className="text-gray-400">|</span>{' '}
                                    <a href="#" className="hover:underline">{link}</a>
                                </span>
                            ))}
                        </p>
                        <div className="flex items-center gap-3 shrink-0">
                            <img src={VelocityLogo} alt="Velocity Frequent Flyer" className="h-[40px] w-auto" />
                            <img src={VirginLockup} alt="Virgin Australia" className="h-[40px] w-auto" />
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
