export const generateEarnExample = (wte, tierIdx) => {
    const currentTier = wte.tiers[tierIdx] || wte.tiers[0];
    const spend = currentTier.spend;
    const pts = currentTier.pts;

    // Seed generation to be deterministic
    const seedStr = `${wte.id}-${tierIdx}-${wte.name}`;
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) {
        seed = (seed << 5) - seed + seedStr.charCodeAt(i);
        seed |= 0;
    }
    const random = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    const shuffle = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const firstNames = ['Chris', 'Sarah', 'Michael', 'Emma', 'David', 'Jessica', 'John', 'Laura', 'James', 'Chloe', 'Daniel', 'Mia', 'Matthew', 'Olivia', 'Andrew', 'Sophia'];
    const lastNames = ['Temple', 'Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez'];
    const cities = ['Brisbane', 'Sydney', 'Melbourne', 'Perth', 'Adelaide', 'Hobart', 'Darwin', 'Canberra', 'Gold Coast', 'Newcastle'];

    const fName = firstNames[Math.floor(random() * firstNames.length)];
    const lName = lastNames[Math.floor(random() * lastNames.length)];
    const personaName = `${fName} ${lName}`;
    const city = cities[Math.floor(random() * cities.length)];

    const personaImg = `https://picsum.photos/seed/${Math.abs(seed)}/800/400`;

    // Provide realistic item names depending on the WTE
    const wteLower = wte.name.toLowerCase();
    let baseItems = [];
    if (wteLower.includes('virgin australia') && wteLower.includes('flight')) {
        baseItems = ['Flight to SYD (Economy, Return)', 'Flight to MEL (Economy, One-Way)', 'Flight to BNE (Economy, Return)', 'Flight to PER (Economy, One-Way)', 'Flight to SIN (Economy, Return, Singapore Airlines)', 'Flight to DXB (Economy, Return, Etihad)', 'Baggage Add-on', 'Seat Selection'];
    } else if (wteLower.includes('flybuys') || wteLower.includes('coles')) {
        baseItems = ['Weekly Coles Shop', 'Fresh Produce', 'Household Essentials', 'Pantry Stock-up', 'Weekend Entertaining', 'Liquorland Wine Order', 'First Choice Case Purchase'];
    } else if (wteLower.includes('7-eleven') || wteLower.includes('seven-eleven')) {
        baseItems = ['Premium 95 Fuel Fill', 'Regular Unleaded Fill', 'Diesel Fill', 'In-store Coffee', 'Snacks & Drinks', 'Car Wash'];
    } else if (wteLower.includes('agl')) {
        baseItems = ['Electricity Bill', 'Gas Bill', 'Internet Plan', 'Mobile Plan', 'Switching Bonus'];
    } else if (wteLower.includes('velocity estore') || wteLower.includes('estore')) {
        baseItems = ['THE ICONIC Purchase', 'Myer Online Order', 'Apple Online Purchase', 'Sephora Beauty Order', 'David Jones Online', 'Catch.com.au Purchase', 'Lululemon Order'];
    } else if (wteLower.includes('virgin wines')) {
        baseItems = ['Mixed Dozen Red', 'Mixed Dozen White', 'Premium Shiraz Case', 'Champagne & Sparkling', 'Sauvignon Blanc Case', 'Rosé Selection'];
    } else if (wteLower.includes('card') || wteLower.includes('velocity flyer') || wteLower.includes('credit')) {
        baseItems = ['Monthly Groceries', 'Dining & Entertainment', 'Online Shopping', 'Utility Bills Payment', 'Travel Booking', 'Fuel & Transport', 'Subscription Services'];
    } else if (wteLower.includes('insurance')) {
        baseItems = ['Annual Premium Payment', 'Monthly Premium Instalment', 'Policy Renewal', 'New Customer Bonus Earned'];
    } else if (wteLower.includes('medibank')) {
        baseItems = ['Hospital Cover Premium', 'Extras Cover Premium', 'New Member Bonus Earned', 'Annual Policy Renewal'];
    } else if (wteLower.includes('velocity hotels')) {
        baseItems = ['2-Night Weekend Stay', '3-Night City Escape', '5-Night Holiday Stay', 'Promotional Rate Booking', 'Hotel Dining Add-on'];
    } else if (wteLower.includes('accor')) {
        baseItems = ['Novotel Stay', 'Pullman Stay', 'Mercure Stay', 'ibis Stay', 'Sofitel Stay', 'ALL Reward Points Transfer'];
    } else if (wteLower.includes('hotel transfer')) {
        baseItems = ['Marriott Bonvoy Transfer', 'Hilton Honors Transfer', 'IHG Points Transfer', 'Shangri-La Circle Transfer', 'TFE Hotels Points Transfer'];
    } else if (wteLower.includes('car rental') || wteLower.includes('car rentals')) {
        baseItems = ['Hertz Compact Rental', 'Hertz SUV Rental', 'Europcar Economy Rental', 'Europcar SUV Rental', 'Business Trip Rental'];
    } else if (wteLower.includes('virgin australia holidays')) {
        baseItems = ['Bali Beach Package', 'Fiji Family Package', 'Queensland Island Escape', 'Gold Coast Weekend', 'New Zealand Ski Trip', 'Hawaii Package'];
    } else if (wteLower.includes('luxury escapes')) {
        baseItems = ['Luxury Resort Package', 'Cruise Booking', 'Tour & Adventure Package', 'Private Villa Stay', 'City Hotel Deal'];
    } else {
        baseItems = ['Monthly Usage', 'Standard Purchase', 'Premium Service Use', 'Subscription Renewal', 'General Shopping', 'Partner Offer Purchase'];
    }

    // Pick 2-4 items for the table randomly based on the tier index
    const numItems = Math.floor(random() * 3) + 2; // 2 to 4 items
    const tableRawItems = shuffle(baseItems).slice(0, numItems);

    // Divide spend and points among the items
    let splits = [];
    let splitSum = 0;
    for (let i = 0; i < numItems; i++) {
        const s = random() + 0.5; // weight between 0.5 and 1.5
        splits.push(s);
        splitSum += s;
    }

    // Normalize splits and calculate table data
    let currentSpendSum = 0;
    let currentPtsSum = 0;
    const tableData = [];

    // Generate dates in 2025 in order
    let currentMonth = 1;

    for (let i = 0; i < numItems; i++) {
        const month = currentMonth + Math.floor(random() * (12 / numItems));
        currentMonth = Math.min(12, Math.max(month, currentMonth));
        const day = Math.floor(random() * 28) + 1;

        const dateStr = `${day.toString().padStart(2, '0')} ${new Date(2025, currentMonth - 1, 1).toLocaleString('default', { month: 'short' })} 2025`;

        let itemSpend = Math.round(spend * (splits[i] / splitSum));
        let itemPts = Math.round(pts * (splits[i] / splitSum));

        // Fix rounding errors on last item
        if (i === numItems - 1) {
            itemSpend = spend - currentSpendSum;
            itemPts = pts - currentPtsSum;
        }

        currentSpendSum += itemSpend;
        currentPtsSum += itemPts;

        tableData.push({
            date: dateStr,
            item: tableRawItems[i],
            spend: `$${itemSpend.toLocaleString()}`,
            points: itemPts.toLocaleString()
        });
    }

    // Descriptive text
    let frequencyDesc = 'regular';
    if (tierIdx === 0) frequencyDesc = 'infrequent';
    if (tierIdx >= 3) frequencyDesc = 'frequent';

    const personaDesc = `${fName} lives in ${city} and is a ${frequencyDesc} customer of ${wte.name}. Over the course of 2025, ${fName} made several purchases aligned with their standard spending habits. Across ${numItems} main transaction periods, ${fName} spent approximately $${spend?.toLocaleString() ?? 0} with ${wte.name}, earning an estimated total of ${pts.toLocaleString()} Velocity Points. They hold no active bonus status, so the points reflect the standard base earn rate.`;

    return {
        personaName,
        personaImg,
        personaDesc,
        tableData,
        spendStr: spend.toLocaleString(),
        ptsStr: pts.toLocaleString()
    };
}
