/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
const events = [
  "bounds_changed",
  "center_changed",
  "click",
  "contextmenu",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "heading_changed",
  "idle",
  "maptypeid_changed",
  "mousemove",
  "mouseout",
  "mouseover",
  "projection_changed",
  "resize",
  "rightclick", // use contextmenu
  "tilesloaded",
  "tilt_changed",
  "zoom_changed",
];

function setupListener(map, name) {
  const eventRow = document.getElementById(name);

  google.maps.event.addListener(map, name, () => {
    eventRow.className = "event active";

    const timeout = setTimeout(() => {
      eventRow.className = "event inactive";
    }, 1000);
  });
}

async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");

  populateTable();

  const mapDiv = document.getElementById("map");
  const map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(37.4419, -122.1419),
    zoom: 13,
    mapTypeId: "roadmap",
  });

  for (let i = 0; i < events.length; i++) {
    setupListener(map, events[i]);
  }
}

// Dynamically create the table of events from the defined hashmap
function populateTable() {
  const eventsTable = document.getElementById("sidebar");
  let content = "";

  for (let i = 0; i < events.length; i++) {
    content +=
      '<div class="event" id="' + events[i] + '">' + events[i] + "</div>";
  }

  eventsTable.innerHTML = content;
}

initMap();
