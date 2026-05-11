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
// Party List [] containing Party shaped objects
let events = [];
let selectedEvent;
let rsvps = [];

// Fetch functions for the base API
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2604-ROBERT";
const API = BASE + COHORT;

// State functions
// Get single party (w/render)
async function getEvent(id) {
  // Try & Catch
  try {
    // Locate API endpoint (single ID)
    const response = await fetch(API + "/events" + "/" + id);
    console.debug(response);
    // Receive data and update state
    const result = await response.json();
    console.debug(result);
    selectedEvent = result.data;
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
async function getRsvps() {
  try {
    const response = await fetch(API + "/rsvps");
    const result = await response.json();
    rsvps = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}
//      (Optional) Sort guests

// === Components ===

// Party list item component
function EventListItem(event) {
  const $li = document.createElement("li");

  if (event.id === selectedEvent?.id) {
    $li.classList.add("selected");
  }

  $li.innerHTML = `
    <a href="#selected">${event.name}</a>
  `;
  // Click listener event updates state by fetching single party info from API
  $li.addEventListener("click", () => getEvent(event.id));
  return $li;
  // (Optional) CSS Styling for selected party
}

// Party list component
function EventsList(events) {
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
// Message if none selected (guard)
function SelectedEvent() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event";
    return $p;
  }

  const $event = document.createElement("section");
  // Name & ID, date, location, description, (Optional) guests
  $event.innerHTML = `
    <h2>${selectedEvent.name} #${selectedEvent.id}</h2>
    <time datetime= "$selectedParty.date}">
      ${selectedEvent.date.slice(0, 10)} </time>
    <address>${selectedEvent.location}</address>
    <p>${selectedEvent.description}</p>
    `;

  return $event;
}

// === Render ===

function render() {
  const $app = document.querySelector("#app");
  // Header, party list, party details
  $app.innerHTML = `
    <h1>Event Planner</h1>
    <main>
      <section>
        <h2>Events List</h2>
        <EventsList></EventsList>
      </section>
      <section id="selected">
        <h2>Event Details</h2>
        <EventDetails></EventDetails>
      </section>
    </main>    
  `;
  // Pass through state variables
  $app.querySelector("EventsList").replaceWith(EventsList());
  $app.querySelector("SelectedParty").replaceWith(SelectedEvent());
}

// === Render ===

render();
