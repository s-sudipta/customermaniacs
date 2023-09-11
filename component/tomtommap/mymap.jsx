import { useEffect, useRef, useState } from 'react';
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const MyMap = (props) => {
  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(props.longitude);
  const [mapLatitude, setMapLatitude] = useState(props.latitude);
  const [mapZoom, setMapZoom] = useState(18);
  const [map, setMap] = useState({});
  const [marker, setMarker] = useState(null);

  useEffect(() => {

    import('@tomtom-international/web-sdk-maps')
      .then((tt) => {
        const newMap = tt.map({
          key: 'LuXWupcXRpMmpMQKpFC6HEF1HWJjAhFp',
          container: mapElement.current,
          center: [mapLongitude, mapLatitude],
          zoom: mapZoom
        });
        
        const newMarker = new tt.Marker().setLngLat([mapLongitude,mapLatitude ]).addTo(newMap);
        setMarker(newMarker);
        setMap(newMap);
        return () => {
            newMarker.remove();
            newMap.remove();
          };
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (<>
  <div ref={mapElement} className="mapDiv"  style={{"width":"100vw","height":"100vh"}}/>
  </>);
}

export default MyMap