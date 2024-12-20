import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { antPath } from 'leaflet-ant-path';

const AnimatedPolyline = ({ positions, options }) => {
    const map = useMap();

    useEffect(() => {
        const animatedPath = antPath(positions, options);
        animatedPath.addTo(map);

        return () => {
            map.removeLayer(animatedPath);
        };
    }, [map, positions, options]);

    return null;
};

export default AnimatedPolyline;
