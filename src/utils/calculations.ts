export function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Radius of the Earth in km
  const toRad = (angle: number) => angle * (Math.PI / 180);

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export function getDistanceFromBusinessLocation(lat: number, lng: number) {
  // TODO: THIS SHOULD COME FROM A CONFIG FILE
  const businessLocation = {
    lat: -34.007824899999996,
    lng: 18.463276399999998,
  };
  return getDistance(businessLocation.lat, businessLocation.lng, lat, lng);
}

export function checkIfDeliveryIsAvailable(lat: number, lng: number) {
  const distance = getDistanceFromBusinessLocation(lat, lng);
  // TODO: THIS SHOULD COME FROM A CONFIG FILE
  const maximumDistance = 15; // Maximum delivery distance in km
  if (distance > maximumDistance) {
    return false;
  }
  return true;
}

export function calculateDeliveryCost(distance: number) {
  // TODO: THESE SHOULD COME FROM A CONFIG FILE
  const baseCost = 50; // Base delivery cost
  const costPerKm = 10; // Cost per km
  const baseCostDistance = 5; // Distance for base cost

  if (distance <= baseCostDistance) {
    return baseCost;
  } else {
    return baseCost + (distance - 5) * costPerKm;
  }
}
