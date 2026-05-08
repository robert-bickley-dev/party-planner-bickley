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
let selectedEvent = null;

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
    events.push(result.data);
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
    events = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

//      (Optional) Get guests
//      (Optional) Sort guests

// === Components ===

// Party list item component
function EventListItem(event) {
  const $li = document.createElement("li");
  // Click listener event updates state by fetching single party info from API
  $li.addEventListener("click", () => getEvent(event.id));
  return $li;
  // (Optional) CSS Styling for selected party
}

// Party list component
function EventList(events) {
  const $ul = document.createElement("ul");

  events.map(events.name);
}

// Party details component
//      Name & ID, date, location, description, (Optional) guests
//      Message if none selected (guard)
//

// === Render ===

function render() {
  const $app = document.querySelector("#app");
  // Header, party list, party details
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <PartyList></PartyList>
    <PartyDetails></PartyDetails>
    `;
}

// Pass through state variables

// Render
render();
