import { calculateFare, calculateTime } from "./utilsMod.mjs";
// import "./utilsMod.mjs";
const tripTimeInHours = 0.5;
const tripTimeInSeconds = tripTimeInHours * 60 * 60;
const distanceInKm = 0.5;
const distanceInMeters = distanceInKm * 1000;

console.log(calculateFare(distanceInMeters, tripTimeInSeconds));
console.log(calculateTime(tripTimeInSeconds));
