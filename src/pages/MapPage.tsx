import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';


import './MapPage.css';

export interface MapPageProps {}

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -23.546611,
  lng: -46.635200
};


const  MapPage = () => {

	const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCInglOulrm7ViPoBXW5N6E_lNKNIgVPS4"

	});

  return <div>
		{isLoaded ? (
				<div>
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={center}
						zoom={15}
					>


						<Marker position={center} options={{
							label: {
								text: "Estação",
								className: "mapMarker"
							 }
							
						}}>

						</Marker>

					</GoogleMap>
				</div>
			) : (
				<></>
		)}
	</div>
}

export default MapPage;
