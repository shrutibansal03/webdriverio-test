import GoogleMapsPage from "../pageobjects/GoogleMapsPage"

const assert = require('assert')

/*
Define Destiatiion, Midpoint, StartingPoint and Route
*/
let destination = "San Francisco, California"
let midpoint = "Denver, Colorado"
let startingPoint = "Philadelphia, Pennsylvania"
let route = "I-70 W"

/*
Define Expected Results
*/
let expectedGoogleMapsTitle = "Google Maps";
let expectedRouteTitle = "Philadelphia, Pennsylvania to San Francisco, California - Google Maps";
let expectedMileage = "2,978 miles";
let expectedTravelTimeWithoutTraffic = "45 h";

/*
Misc
*/
const enterKey = "\uE007" // Enter key ascii

/*
Open URL and Check Maps Page Title
*/
let page = new GoogleMapsPage()
page.open("http://maps.google.com")

describe('home page', () => {
  it('should have the right title', () => {

    let googleMapsTitle = page.getTitle()
    console.log("Google Maps Page Title: " + googleMapsTitle)

    // Asset Google Maps page title to confirm we are in the right place
    assert.strictEqual(googleMapsTitle, expectedGoogleMapsTitle, "Google Maps page title " + googleMapsTitle + " is NOT correct!")

  })
})

/*
Enter Route and Check Page Title
*/
describe('route page', () => {
  it('should have the right title', () => {

    // Search for midpoint stop
    page.searchMidpoint.setValue(midpoint)
    page.submitSearch()

    // Select directions and submit starting point
    page.submitDirections()
    page.startingPoint.setValue(startingPoint)
    page.submitDrivingDirections()

    // Add final destination
    page.submitAddDestination()

    //
    // After adding support for Firefox, I found it necessary to send unicode for the "Enter" key
    // as follows when typing the destination. Works for Chrome too
    //
    // page.submitDestinationSearch()
    // page.destination.setValue(destination + "\uE007")
    page.destination.setValue(destination + enterKey)

    page.submitRoute(route)

    let routeTitle = page.getTitle()
    console.log("Route Page Title: " + routeTitle)

    // Assert page title
    assert.strictEqual(routeTitle, expectedRouteTitle, "Route page title " + routeTitle + " is NOT correct!")

  })
})

/*
Verify Final Route
*/
describe('route page', () => {
  it('should have the correct route', () => {

    let finalRoute = page.finalRoute.getText()
    console.log("Route: " + finalRoute)

    // Asset final route
    assert.strictEqual(finalRoute, route, "Route " + finalRoute + " is NOT correct!")

  })
})

/*
Verify Mileage
*/
describe('route page', () => {
  it('should have the correct mileage', () => {

    let mileage = page.mileage.getText()
    console.log("Mileage: " + mileage)

    // Assert mileage
    assert.strictEqual(mileage, expectedMileage, "Mileage " + mileage + " is NOT correct!")

  })
})

/*
Verify Travel Time
*/
describe('route page', () => {
  it('should have the correct travel time without traffic', () => {

    let travelTimeWithoutTraffic = page.travelTimeWithoutTraffic.getText()
    console.log("Travel Time Without Traffic: " + travelTimeWithoutTraffic)

    // Asset travel time
    assert.strictEqual(travelTimeWithoutTraffic, expectedTravelTimeWithoutTraffic, "Travel Time Without Traffic " + travelTimeWithoutTraffic + " is NOT correct!")

  })
})
