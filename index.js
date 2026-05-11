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
  // Create a container for list events
  const $ul = document.createElement("ul");
  // Take the events array from state -> transform each element into a DOM object
  const $events = events.map(EventListItem);
  // Populate the $ul with that array
  $ul.replaceChildren(...$events);
  // -> return the list
  return $ul;
}

// Party details component
function SelectedEvent() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event";
    return $p;
  }

  const $event = document.createElement("section");
  $event.innerHTML = `
    <h2>${selectedEvent.name} #${selectedEvent.id}</h2>
    <time datetime= "$selectedParty.date}">
      ${selectedEvent.date.slice(0, 10)} </time>
    <address>${selectedEvent.location}</address>
    <p>${selectedEvent.description}</p>
    `;

  return $event;
}
//      Name & ID, date, location, description, (Optional) guests
//      Message if none selected (guard)
//

// === Render ===

function render() {
  const $app = document.querySelector("#app");
  // Header, party list, party details
  $app.innerHTML = `
    <h1>Event Planner</h1>
    <main>
      <section>
        <h2>Events List</h2>
        <EventList></EventList>
      </section>
      <section id="selected">
        <h2>Event Details</h2>
        <EventDetails></EventDetails>
      </section>
    </main>    
  `;
}

// Pass through state variables

// Render
render();
