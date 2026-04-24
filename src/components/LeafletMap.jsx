// src/components/LeafletMap.jsx
import React, { useMemo } from 'react';
import { MapContainer, GeoJSON, Circle, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import worldData from '../assets/world-countries.json';

// Fix for default marker icons in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Dot Icon for non-selected affordable items to match old style slightly? 
// Or stick to standard pins. User said "The only labels we want is from our app with our labels for destinations."
// pins are good.

const geoStyle = {
    fillColor: '#ffffff', // White fill
    weight: 0,            // No border for cleaner look
    opacity: 1,
    color: '#ffffff',
    fillOpacity: 1,
    interactive: false
};

// Component to handle View changes
function MapController({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

// Create a custom DivIcon with heart for pending/selected state
const createHeartIcon = (fillColor) => {
    return L.divIcon({
        className: 'custom-heart-marker',
        html: `
            <div style="
                width: 48px;
                height: 48px;
                background-color: ${fillColor};
                border: 3px solid white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style="width: 24px; height: 24px;">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
            </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 24]
    });
};

const createDotIcon = (fillColor, isSelected) => {
    const size = isSelected ? 24 : 12; // Corresponding to radius 12 and 6
    const border = isSelected ? '2px solid white' : 'none';
    return L.divIcon({
        className: 'custom-dot-marker',
        html: `
            <div style="
                width: ${size}px;
                height: ${size}px;
                background-color: ${fillColor};
                border: ${border};
                border-radius: 50%;
                box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                pointer-events: auto;
            "></div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
    });
};

export default function LeafletMap({
    flights,
    origin,
    selectedFlightId,
    pendingFlightId,
    affordableIds,
    onFlightClick,
    isSelectionExplicit = true // Default to true if not specified
}) {
    const sydney = [origin.lat, origin.lon];

    // Calculate radius for affordability circle
    // Find the max distance (approx) of affordable flights
    const maxAffordableDistance = useMemo(() => {
        let maxDist = 0;
        const originLatLng = L.latLng(origin.lat, origin.lon);

        flights.forEach(f => {
            if (affordableIds.includes(f.id)) {
                const dist = originLatLng.distanceTo(L.latLng(f.lat, f.lon));
                if (dist > maxDist) maxDist = dist;
            }
        });
        // Add a bit of padding (e.g., 500km)
        return maxDist > 0 ? maxDist + 500000 : 0;
    }, [flights, affordableIds, origin]);

    return (
        <div className="relative w-full h-full overflow-hidden rounded-lg" style={{ background: 'linear-gradient(180deg, #e8d5e0 0%, #d5e0eb 50%, #c5dbe8 100%)' }}>
            {/* Gradient background for ocean */}
            <MapContainer
                center={sydney}
                zoom={2}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%', background: 'transparent' }}
                attributionControl={false} // Clean look
                zoomControl={false} // Clean look, can add back if needed
            >
                <GeoJSON data={worldData} style={geoStyle} />

                {/* Affordability Circle */}
                {maxAffordableDistance > 0 && (
                    <Circle
                        center={sydney}
                        radius={maxAffordableDistance}
                        pathOptions={{
                            color: 'white',
                            fillColor: 'white',
                            fillOpacity: 0.2,
                            weight: 2,
                            dashArray: '5, 10', // optional styling
                            interactive: false
                        }}
                    />
                )}

                {/* Markers */}
                {flights.map(f => {
                    const isAffordable = affordableIds.includes(f.id);
                    const isSelected = f.id === selectedFlightId;
                    const isPending = f.id === pendingFlightId;

                    // 1. Pending Selection OR Explicit Favourite: Heart Icon
                    if (isPending || (isSelected && isSelectionExplicit)) {
                        const heartColor = isAffordable ? '#e61c2e' : '#888888';
                        return (
                            <Marker
                                key={f.id}
                                position={[f.lat, f.lon]}
                                icon={createHeartIcon(heartColor)}
                                zIndexOffset={1000}
                                eventHandlers={{
                                    click: () => onFlightClick && onFlightClick(f.id),
                                }}
                            />
                        );
                    }

                    // 2. Implicit Selection (Example Reward): Large Dot without Heart
                    // 3. Normal Dot
                    return (
                        <Marker
                            key={f.id}
                            position={[f.lat, f.lon]}
                            icon={createDotIcon(isAffordable ? '#e61c2e' : '#999999', isSelected)}
                            zIndexOffset={isSelected ? 500 : 0}
                            eventHandlers={{
                                click: () => onFlightClick && onFlightClick(f.id),
                            }}
                        />
                    );
                })}
            </MapContainer>

            {/* City Name Label Overlay */}
            {(() => {
                const focusedFlight = flights.find(f => f.id === (pendingFlightId || selectedFlightId));
                const cityName = focusedFlight ? (focusedFlight.destCity || focusedFlight.city) : '';
                if (!cityName) return null;
                return (
                    <div className="absolute bottom-0 left-0 bg-white px-8 py-5 rounded-tr-[36px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] z-[1000] min-w-[200px] border-t border-r border-gray-50 flex items-center">
                        <span className="text-[34px] font-medium text-[#222] tracking-tight" style={{ fontFamily: 'GT America Extended, sans-serif' }}>
                            {cityName}
                        </span>
                    </div>
                );
            })()}
        </div>
    );
}
