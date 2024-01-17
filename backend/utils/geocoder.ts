import NodeGeocoder from 'node-geocoder';

const { GEOCODE_API_PROVIDER, GEOCODE_API_KEY } = process.env;

const options = {
    provider: GEOCODE_API_PROVIDER || 'locationiq',
    apiKey: GEOCODE_API_KEY,
    formatter: null,
}

const GeoCoder = NodeGeocoder(options);

export default GeoCoder;