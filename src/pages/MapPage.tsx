import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DirectionsRenderer, DirectionsService, GoogleMap, Marker, useJsApiLoader , LoadScript, StandaloneSearchBox} from '@react-google-maps/api';

import FilterItem from "../components/FilterItem";
import FilterItemSelect from "../components/FilterItemSelect";
import GetFilters from "../domain/useCases/GetFilters";
import Filter from "../domain/entities/Filter";
import style from './MapPage.module.scss';
import Storage from "../domain/useCases/Storage";

import fils from '../mocks/filters.json';
import bikeStations from '../mocks/BikeStations.json';
import Filters from "../components/Filters";
import GetBikeStations from "../domain/useCases/GetBikeStations";


export interface MapPageProps {}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -21.791116,
  lng: -46.569737
};

const pointB = {
  lat: -21.786299,
  lng: -46.569286
};


const filterMock = new Filter(
	"Bairro",
	"neighborhood",
	"multi_select",
	[
		{
			"id": "nOs=",
			"name": "Moema",
			"description": ""
	},
	{
			"id": "on~X",
			"name": "Pinheiros",
			"description": ""
	},
	{
			"id": "XsA_",
			"name": "Consolação",
			"description": ""
	},
	{
			"id": "?iH<",
			"name": "Vila Mariana",
			"description": ""
	}
	]
)


const MapPage = () => {

	const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>()
	const [destination, setDestination] = useState<google.maps.LatLngLiteral | null>()
	const [response, setResponse] = useState<google.maps.DistanceMatrixResponse | null>()
	const [filters, setFilters] = useState<Array<Filter>>()

	const [searchBox, setSearchBox] = React.useState<null | google.maps.places.SearchBox>(null)
	const [map, setMap] = React.useState<google.maps.Map>();

	// const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: "AIzaSyCInglOulrm7ViPoBXW5N6E_lNKNIgVPS4"

	// });

	
	const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setOrigin({ lat: latitude, lng: longitude });
        },

        (error) => {
          console.error("Error get user location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    } 
  };


	const cleanStates = () => {
		setResponse(null)
		setDestination(null)
		setOrigin(null)
	}


	const traceRoute = () => {
			getUserLocation()

			setDestination(pointB)

	}
	// @ts-ignore
	const directionsServiceOptions = useMemo<google.maps.DirectionsRequest>(() => {
		return {
			origin,
			destination,
			travelMode: "DRIVING"
		};
	}, [origin, destination])
	

	const directionsCallback = useCallback((res: any) => {
			if (res !== null && res.status === "OK") {
				setResponse(res)
				return;
			}
			console.log(res)
		}, [])
	

	const directionsRenderOptions = useMemo<any>(() => {
		return {
			directions: response,
		}
	}, [response])

	const handleFilterSubmit = async () => {
		const storage = new Storage();
		const selectedFilters = await storage.getFilterStorage();
		console.log("Clicked handleFilterSubmit")
		console.log(selectedFilters);
	}

	const getFilters = async () => {

		const databaseId = "f5574781ad2e4d5e85990658c3803c5c";
		const service = new GetFilters();

		// const response = await service.execute(databaseId)

	
		console.log(fils)

		setFilters(fils)
	}

	const onLoad = (ref: google.maps.places.SearchBox) => {
		setSearchBox(ref)
	}

	const onPlacesChanged = async () => {
		await getLatLngFromAddress();
		console.log("after that")
		const places = searchBox?.getPlaces();

		const place = places![0];
		
		const location = {
			lat: place?.geometry?.location?.lat() || 0,
			lng: place?.geometry?.location?.lng() || 0,
		}

		map?.panTo(location)
	}

	const getLatLngFromAddress = async () => {
		const places = bikeStations.results
		const place = places![0].properties;

		const address = place.Endereço.rich_text[0].plain_text;

		var geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK)
			{
				console.log(results)
					// do something with the geocoded result
					//
					// results[0].geometry.location.latitude
					// results[0].geometry.location.longitude
			}
		});
	}
	

	const onPlacesInputed = () => {
		// const places = searchBox?.getPlaces();

		// const api = new GetBikeStations();

		// const places = api.execute({})


		const places = bikeStations.results
		console.log(places);

		const place = places![0].properties;

		const address = place.Endereço.rich_text[0].plain_text;


		
		const location = {
			lat: place || 0,
			lng: place || 0,
		}

		// map?.panTo(location)
	}

	const onMapLoad = (map: google.maps.Map) => {
		setMap(map)
	}


	const lugares = [
    "batata",
    "almondega",
    "macarrao",
    // Adicione mais lugares conforme necessário
  ];

  const [searchInput, setSearchInput] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState<Array<string>>([]);

  const handleInputChange = (event: any) => {
    const searchString = event.target.value.toLowerCase();
    const filteredPlaces = lugares.filter(lugar =>
      lugar.toLowerCase().includes(searchString)
    );
    setFilteredPlaces(filteredPlaces);
    setSearchInput(event.target.value);
  };

	const handleSetPlaceOnInput = (event: any) => {

		setSearchInput(event.target.value);
	}


	useEffect(() => {

		getFilters();

	}, [])

  return <div  className={style.mapContainer}>


{/* <>
					<button onClick={traceRoute}>Traçar Rota</button>
						<h1>Geolocation App</h1>
						// create a button that is mapped to the function which retrieves the users location 
						<button onClick={getUserLocation}>Get User Location</button>
						//</div> if the user location variable has a value, print the users location
						{origin && (
							<div>
								<h2>User Location</h2>
								<p>Latitude: {origin.lat}</p>
								<p>Longitude: {origin.lng}</p>
							</div>
						)}

						<div className={style.filtersContainer}>
							<Filters filters={fils}/>

							<FilterItem type="button" onClick={handleFilterSubmit}>
								<p>Filtrar</p>
							</FilterItem>		
						</div>
						
					</>
					 */}

		<LoadScript
     googleMapsApiKey="AIzaSyCInglOulrm7ViPoBXW5N6E_lNKNIgVPS4"
		 libraries={["places", "geocoding"]}
		>

			<GoogleMap
				mapContainerStyle={{ width: "100%",	height: "100%"}}
				center={origin ?? center}
				zoom={15}
				onLoad={onMapLoad}
			>

				<div className={style.inputsContainer}>

				{/* <div>
					<input
						type="text"
						placeholder="Digite o local desejado"
						value={searchInput}
						onChange={handleInputChange}
					/>
					<ul>
						{filteredPlaces.map((lugar, index) => (
							<li key={index} onClick={handleSetPlaceOnInput} value={lugar}>{lugar}</li>
						))}
					</ul>
				</div> */}
				

					<StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged} >
						<input className={style.inputPlaces} placeholder="Digite um endereço">

						</input>
					</StandaloneSearchBox>

					<Filters filters={fils}/>

					<FilterItem type="button" onClick={handleFilterSubmit}>
						<p>Filtrar</p>
					</FilterItem>
				</div>

				{/* <Marker position={origin ?? center} options={{
					label: {
						text: "Estação",
						className: "mapMarker"
						}
					
				}}> 

				</Marker>*/}

				

				{
					!response && 
						<Marker position={origin ?? center}/>
				}


				{
					origin && destination && (
						<DirectionsService 
							options={directionsServiceOptions}
							callback={directionsCallback}
						/>
					)
				}

				{
					response && (
						<DirectionsRenderer options={directionsRenderOptions}/>
					)
				}
			</GoogleMap>

		</LoadScript>
	</div>
}

export default MapPage;
