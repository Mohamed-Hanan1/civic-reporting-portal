const STORAGE_KEY = "urban-care-reports-v1";

const wardCatalog = [
  { name: "Ward 12 · Riverside", lat: 12.9585, lng: 77.5986, zone: "North civic zone", officer: "M. S. Nandini", level: "High" },
  { name: "Ward 18 · Greenfield", lat: 12.9445, lng: 77.5875, zone: "East civic zone", officer: "V. Sharma", level: "Medium" },
  { name: "Ward 06 · Old Town", lat: 12.9692, lng: 77.6112, zone: "Core civic zone", officer: "R. Iyer", level: "High" },
  { name: "Ward 21 · Hillside", lat: 12.9328, lng: 77.5713, zone: "South civic zone", officer: "P. Govind", level: "Medium" },
  { name: "Ward 09 · Lakeview", lat: 12.9808, lng: 77.5842, zone: "West civic zone", officer: "S. Nair", level: "Low" }
];

const defaultReports = [
  {
    id: "CVC-2418",
    title: "Broken manhole cover near school gate",
    category: "Road damage",
    description: "Large metal cover is cracked and unsafe for pedestrians. Traffic is diverted around the area during school pickup hours.",
    reporter: "Aisha Rahman",
    latitude: 12.9573,
    longitude: 77.5999,
    status: "Submitted",
    ward: "Ward 12 · Riverside",
    department: "Public works",
    severity: "High",
    photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    ageHours: 14,
    createdAt: Date.now() - 14 * 60 * 60 * 1000,
    timeline: [
      { title: "Report filed", detail: "Issue logged with photo evidence and geolocation." },
      { title: "Ward confirmed", detail: "Matched to Ward 12 · Riverside through civic GIS data." },
      { title: "Ticket generated", detail: "Public works team notified with priority assignment." }
    ]
  },
  {
    id: "CVC-2435",
    title: "Drain blockage near market lane",
    category: "Drain blockage",
    description: "Stormwater drainage is clogged, causing water accumulation and a serious slip hazard during rain.",
    reporter: "Ibrahim Ali",
    latitude: 12.9445,
    longitude: 77.5875,
    status: "In review",
    ward: "Ward 18 · Greenfield",
    department: "Stormwater maintenance",
    severity: "Medium",
    photo: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
    ageHours: 18,
    createdAt: Date.now() - 18 * 60 * 60 * 1000,
    timeline: [
      { title: "Report filed", detail: "Issue reported with photo and map pin." },
      { title: "Under review", detail: "Field team checking drainage feasibility and site impact." },
      { title: "Awaiting site visit", detail: "Inspection route scheduled with the ward engineer." }
    ]
  },
  {
    id: "CVC-2461",
    title: "Streetlight outage on bus corridor",
    category: "Streetlight outage",
    description: "A complete outage on the public transport corridor is creating a visibility and safety issue after dark.",
    reporter: "Nina Joseph",
    latitude: 12.9692,
    longitude: 77.6112,
    status: "Escalated",
    ward: "Ward 06 · Old Town",
    department: "Electrical maintenance",
    severity: "High",
    photo: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=900&q=80",
    ageHours: 52,
    createdAt: Date.now() - 52 * 60 * 60 * 1000,
    timeline: [
      { title: "Report filed", detail: "Public lighting issue reported at night." },
      { title: "Escalated", detail: "Unresolved after 48 hours; advanced to regional maintenance team." },
      { title: "Dispatch pending", detail: "Replacement parts and crew scheduling in progress." }
    ]
  }
];

const state = {
  reports: loadReports(),
  selectedTicket: null,
  map: null,
  openMap: null
};

function loadReports() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultReports));
    return [...defaultReports];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultReports];
  } catch (error) {
    return [...defaultReports];
  }
}

function saveReports() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.reports));
}

function formatTicketId() {
  const next = Math.floor(Math.random() * 9000) + 1000;
  return `CVC-${next}`;
}

function haversineDistance(lat1, lng1, lat2, lng2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const earthRadius = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return 2 * earthRadius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function detectWard(latitude, longitude) {
  let closest = wardCatalog[0];
  let minDistance = Number.POSITIVE_INFINITY;

  wardCatalog.forEach((ward) => {
    const distance = haversineDistance(latitude, longitude, ward.lat, ward.lng);
    if (distance < minDistance) {
      minDistance = distance;
      closest = ward;
    }
  });

  return closest;
}

function setSubmissionMessage(message) {
  const node = document.getElementById("submissionStatus");
  node.textContent = message;
}

function renderWardResult(latitude, longitude) {
  const ward = detectWard(latitude, longitude);
  const result = document.getElementById("wardResult");
  result.innerHTML = `
    <div class="ward-title-wrap">
      <span class="ward-pin">◎</span>
      <div>
        <h3>${ward.name}</h3>
        <p>${ward.zone} · service match confidence 98%</p>
      </div>
    </div>
    <ul class="ward-meta">
      <li>Ward officer: ${ward.officer}</li>
      <li>Service area: ${ward.zone}</li>
      <li>Priority: ${ward.level}</li>
    </ul>
  `;

  document.getElementById("miniWard").textContent = ward.name;

  if (window.wardMap) {
    window.wardMap.setView([ward.lat, ward.lng], 13);
    if (window.wardMarker) {
      window.wardMarker.setLatLng([ward.lat, ward.lng]);
    } else {
      window.wardMarker = L.marker([ward.lat, ward.lng]).addTo(window.wardMap);
      window.wardMarker.bindPopup(`<strong>${ward.name}</strong><br>${ward.zone}`);
    }
  }
}

function initializeWardMap() {
  const el = document.getElementById("wardMap");
  const map = L.map(el, { zoomControl: true }).setView([12.9573, 77.5999], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  window.wardMap = map;

  const initial = detectWard(12.9573, 77.5999);
  window.wardMarker = L.marker([initial.lat, initial.lng]).addTo(map);
  window.wardMarker.bindPopup(`<strong>${initial.name}</strong><br>${initial.zone}`);
}

function buildTimeline(report) {
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = report.timeline
    .map(
      (step, index) => `
      <div class="timeline-item">
        <span class="timeline-bullet" style="opacity:${index === report.timeline.length - 1 ? 1 : 0.9}"></span>
        <div>
          <h4>${step.title}</h4>
          <p>${step.detail}</p>
        </div>
      </div>
    `
    )
    .join("");
}

function renderTicket(report) {
  document.getElementById("ticketCode").textContent = report.id;
  document.getElementById("ticketSummary").textContent = report.title;
  document.getElementById("ticketWard").textContent = report.ward;
  document.getElementById("ticketDept").textContent = report.department;

  const badge = document.getElementById("ticketStateBadge");
  badge.textContent = report.status;
  badge.className = `status-badge ${statusClass(report.status)}`;

  buildTimeline(report);
}

function statusClass(status) {
  switch (status) {
    case "Resolved":
      return "success";
    case "Escalated":
      return "danger";
    case "In review":
      return "info";
    default:
      return "warning";
  }
}

function renderStatusList() {
  const list = document.getElementById("statusList");
  const sorted = [...state.reports].sort((a, b) => b.ageHours - a.ageHours);

  list.innerHTML = sorted
    .slice(0, 4)
    .map(
      (report) => `
      <article class="status-item">
        <div class="top">
          <h3>${report.category}</h3>
          <span class="pill ${statusClass(report.status)}">${report.status}</span>
        </div>
        <p>${report.title}</p>
      </article>
    `
    )
    .join("");
}

function renderEscalationList() {
  const list = document.getElementById("escalationList");
  const unresolved = state.reports.filter((report) => ["Submitted", "In review", "Escalated"].includes(report.status));

  list.innerHTML = unresolved
    .sort((a, b) => b.ageHours - a.ageHours)
    .slice(0, 4)
    .map(
      (report) => `
      <div class="escalation-item">
        <div class="escalation-head">
          <strong>${report.title}</strong>
          <span>${report.ward}</span>
        </div>
        <div class="meta">${report.department} · ${report.ageHours}h</div>
        <button class="escalate-btn" data-id="${report.id}" type="button">Escalate</button>
      </div>
    `
    )
    .join("");

  document.querySelectorAll(".escalate-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const report = state.reports.find((item) => item.id === button.dataset.id);
      if (!report) return;
      report.status = "Escalated";
      report.timeline.push({
        title: "Escalated",
        detail: "Issue escalated to regional governance unit due to unresolved status beyond SLA threshold."
      });
      saveReports();
      renderAll();
    });
  });
}

function initializeOpenMap() {
  const element = document.getElementById("openMap");
  const map = L.map(element).setView([12.9573, 77.5999], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  state.openMap = map;

  state.reports.forEach((report) => {
    const marker = L.marker([report.latitude, report.longitude]).addTo(map);
    marker.bindPopup(`<strong>${report.title}</strong><br>${report.ward}<br><span style="color:#96d7ff">${report.status}</span>`);
  });
}

function renderAll() {
  const current = state.selectedTicket || state.reports[0];
  state.selectedTicket = current;
  renderTicket(current);
  renderStatusList();
  renderEscalationList();
  renderWardResult(current.latitude, current.longitude);

  if (state.openMap) {
    state.openMap.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        layer.remove();
      }
    });

    state.reports.forEach((report) => {
      const marker = L.marker([report.latitude, report.longitude]).addTo(state.openMap);
      marker.bindPopup(`<strong>${report.title}</strong><br>${report.ward}<br><span style="color:#96d7ff">${report.status}</span>`);
    });
  }
}

function handlePhotoUpload() {
  const input = document.getElementById("photoInput");
  const preview = document.getElementById("photoPreview");

  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      preview.src = loadEvent.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function bindReportForm() {
  const form = document.getElementById("reportForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("issueTitle").value.trim();
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value.trim();
    const reporter = document.getElementById("reporterName").value.trim();
    const latitude = Number(document.getElementById("latitude").value);
    const longitude = Number(document.getElementById("longitude").value);
    const photo = document.getElementById("photoPreview").src;
    const ward = detectWard(latitude, longitude);

    const issue = {
      id: formatTicketId(),
      title,
      category,
      description,
      reporter,
      latitude,
      longitude,
      status: "Submitted",
      ward: ward.name,
      department: category === "Streetlight outage" ? "Electrical maintenance" : category === "Water leak" ? "Water services" : "Public works",
      severity: ward.level,
      photo,
      ageHours: 2,
      createdAt: Date.now(),
      timeline: [
        { title: "Report filed", detail: `${reporter} submitted a new civic issue with photo evidence.` },
        { title: "Ward confirmed", detail: `Matched to ${ward.name} via local-body GIS.` },
        { title: "Ticket created", detail: `Ticket ${formatTicketId()} assigned to ${category}.` }
      ]
    };

    state.reports.unshift(issue);
    state.selectedTicket = issue;
    saveReports();
    renderAll();
    setSubmissionMessage("Report submitted successfully. Ticket created and status is now public.");
    form.reset();
    document.getElementById("reporterName").value = reporter;
    document.getElementById("issueTitle").value = "";
    document.getElementById("description").value = "";
    document.getElementById("latitude").value = 12.9573;
    document.getElementById("longitude").value = 77.5999;
  });
}

function bindLocationButton() {
  document.getElementById("useLocationBtn").addEventListener("click", () => {
    if (!navigator.geolocation) {
      setSubmissionMessage("Geolocation is not available in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        document.getElementById("latitude").value = latitude;
        document.getElementById("longitude").value = longitude;
        renderWardResult(latitude, longitude);
        setSubmissionMessage("Your location was detected and the local-body ward has been matched.");
      },
      () => {
        setSubmissionMessage("Location access was denied. Please use coordinates manually.");
      }
    );
  });
}

function bindCoordinateChanges() {
  ["latitude", "longitude"].forEach((id) => {
    document.getElementById(id).addEventListener("input", () => {
      const lat = Number(document.getElementById("latitude").value);
      const lng = Number(document.getElementById("longitude").value);
      if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
        renderWardResult(lat, lng);
      }
    });
  });
}

function initialize() {
  initializeWardMap();
  initializeOpenMap();
  handlePhotoUpload();
  bindReportForm();
  bindLocationButton();
  bindCoordinateChanges();
  state.selectedTicket = state.reports[0];
  renderAll();
}

window.addEventListener("DOMContentLoaded", initialize);











































































































































