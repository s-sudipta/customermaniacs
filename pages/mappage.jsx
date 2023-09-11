
import MyMap from '../component/tomtommap/mymap';
import { parseCookies } from 'nookies';
function MapPage() {
  const cookie = parseCookies();
  return (
      <MyMap latitude={cookie.gpslat} longitude={cookie.gpslon}/>
  );
}

export default MapPage;
