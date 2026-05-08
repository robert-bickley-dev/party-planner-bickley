// === State ===

/**
 * @typedef Event
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {date} date
 * @property {string} location
 */

// State variables
//      Party List [] containing Party shaped objects
let events = [];
let selectedEvent;

// Fetch functions for the base API
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "2604-ROBERT";
const API = BASE + COHORT;

// State functions
//      Get single party (w/render)
async function getEvent(id) {
  // Try & Catch
  try {
    // Locate API endpoint (single ID)
    const response = await fetch(API + "/events" + "/" + id);
    console.debug(response);
    // Receive data and update state
    const result = await response.json();
    console.debug(result);
    events.push(result);
    // Render
    render();
  } catch (error) {
    console.error(error);
  }
}

//      Get all parties (w/render)
async function getEvents() {
  try {
    const response = await fetch(API + "/events");
    console.debug(response);
    const result = await response.json();
    console.debug(result);
    events = result;
    render();
  } catch (error) {
    console.error(error);
  }
}

//      (Optional) Get guests
//      (Optional) Sort guests

// === Components ===

// Party list component
//      Click listener event updates state by fetching single party info from API
//      (Optional) CSS Styling for selected party

// Party details component
//      Name & ID, date, location, description, (Optional) guests
//      Message if none selected (guard)
//

// === Render ===

// Header
// Party list
// Party details

// Pass through state variables

// Render
render();
