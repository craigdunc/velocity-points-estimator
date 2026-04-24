import React, { useState } from 'react';
import VelocityHeader from '../components/VelocityHeader';
import IDWelcome from '../components/IDWelcome';
import FlightSearch from '../components/FlightSearch';
import VelocityPointsPanel from '../components/VelocityPointsPanel';
import ForYouPanel from '../components/ForYouPanel';
import YourTrips from '../components/YourTrips';
import UsingYourPoints from '../components/UsingYourPoints';
import WhatsNews from '../components/WhatsNews';
import SiteFooter from '../components/SiteFooter';

export default function NewDesign({ goTo }) {
    const [activeTab, setActiveTab] = useState('My Velocity');

    return (
        <div className="min-h-screen bg-white">
            <VelocityHeader
                pointsBalance={144513}
                memberName="Craig Duncan"
                activeAccountTab={activeTab}
                onAccountTabClick={setActiveTab}
            />

            <main className="sm:px-6 sm:pt-[20px] sm:pb-8">
                <IDWelcome
                    memberName="Craig Duncan"
                    memberNumber="1227 062 631"
                    memberSince="2024"
                    tier="Red"
                />

                <div className="mt-4 sm:mt-6">
                    <FlightSearch />
                </div>

                {/* Two-column grid at lg+, stacked below */}
                <div className="mt-4 sm:mt-6 sm:max-w-[1100px] sm:mx-auto">
                    <div className="min-[1200px]:grid min-[1200px]:grid-cols-[362px_1fr] min-[1200px]:gap-6 min-[1200px]:items-start flex flex-col gap-4">
                        <VelocityPointsPanel points={0} pointsThisMonth={0} />
                        <div>
                            <ForYouPanel />
                            <YourTrips />
                        </div>
                    </div>
                </div>

                <UsingYourPoints />
                <WhatsNews />
            </main>
            <SiteFooter />
        </div>
    );
}
