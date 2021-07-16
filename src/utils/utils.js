const startingFee = 7;
const firstHourFee = 17;
const extraHourFee = 8;
const KilometerFee = 3;
function calculateFare(distanceInMeters, durationInSeconds) {
  const distanceInKm = distanceInMeters / 1000;
  const durationInHours = durationInSeconds / (60 * 60);

  const distanceFare = distanceInKm * KilometerFee;

  const durationFare =
    durationInHours < 1
      ? firstHourFee * durationInHours
      : firstHourFee + (durationInHours - 1 * extraHourFee);
  const totalFare = startingFee + distanceFare + durationFare;
  return Math.round(totalFare * 100) / 100;
}
const calculateTime = durationInSeconds => {
  const durationInHours = durationInSeconds / (60 * 60);
  const hours = parseInt(durationInHours);
  const minutes = (durationInHours - hours) * 60;
  return { hours, minutes: Math.round(minutes) };
};
export { calculateTime, calculateFare };
