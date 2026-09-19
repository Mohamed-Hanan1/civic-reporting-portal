const STORAGE_KEY = "drainwatch-reports-v1";
const wardCatalog = [
  { name: "Ward 12 · Riverside", lat: 12.9585, lng: 77.5986, zone: "North civic zone", officer: "M. S. Nandini", level: "High" },
  { name: "Ward 18 · Greenfield", lat: 12.9445, lng: 77.5875, zone: "East civic zone", officer: "V. Sharma", level: "Medium" },
  { name: "Ward 06 · Old Town", lat: 12.9692, lng: 77.6112, zone: "Core civic zone", officer: "R. Iyer", level: "High" },
  { name: "Ward 21 · Hillside", lat: 12.9328, lng: 77.5713, zone: "South civic zone", officer: "P. Govind", level: "Medium" }
];

const defaultReports = [
  {
    id: "DWN-2418",
    title: "Blocked drain near school gate",
    category: "Drain blockage",
    description: "Water is pooling at the entrance and creating a slip hazard for students.",
    reporter: "Aisha Rahman",
    latitude: 12.9573,
    longitude: 77.5999,
    status: "Submitted",
    ward: "Ward 12 · Riverside",
    department: "Stormwater maintenance",
    severity: "High",
    photo: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
    ageHours: 14,
    createdAt: Date.now() - 14 * 60 * 60 * 1000,
    timeline: [
      { title: "Report filed", detail: "Issue logged with geolocation and photo evidence." },
      { title: "Ward confirmed", detail: "Matched to Ward 12 · Riverside through civic GIS." },
      { title: "Ticket generated", detail: "Stormwater team notified with priority assignment." }
    ]
  },
  {
    id: "DWN-2435",
    title: "Roadside flooding near market lane",
    category: "Water leak",
    description: "Overflow is creating traffic hindrance and standing water near shops.",
    reporter: "Ibrahim Ali",
    latitude: 12.9445,
    longitude: 77.5875,
    status: "In review",
    ward: "Ward 18 · Greenfield",
    department: "Public works",
    severity: "Medium",
    photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    ageHours: 22,
    createdAt: Date.now() - 22 * 60 * 60 * 1000,
    timeline: [
      { title: "Report filed", detail: "Issue reported with map pin and photo evidence." },
      { title: "Under review", detail: "Field team checking drainage feasibility and site impact." },
      { title: "Awaiting site visit", detail: "Inspection route scheduled with ward engineer." }
    ]
  },
  {
    id: "DWN-2461",
    title: "Streetlight outage on bus corridor",
    category: "Streetlight outage",
    description: "Complete outage on the transport corridor is creating visibility and safety issues after dark.",
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
      { title: "Escalated", detail: "Escalated to the regional maintenance desk after SLA threshold breach." },
      { title: "Dispatch pending", detail: "Replacement parts and dispatch routing in progress." }
    ]
  }
];

const state = {
  reports: loadReports(),
  selectedTicket: null
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

function detectWard(latitude, longitude) {
  const closest = wardCatalog.reduce((best, ward) => {
    const bestDistance = Math.hypot(best.lat - latitude, best.lng - longitude);
    const currentDistance = Math.hypot(ward.lat - latitude, ward.lng - longitude);
    return currentDistance < bestDistance ? ward : best;
  });
  return closest;
}

function statusBadgeClass(status) {
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

function updateWardPreview() {
  const wardNameNode = document.getElementById("wardName");
  const wardZoneNode = document.getElementById("wardZone");
  const wardHintNode = document.getElementById("wardHint");
  const heroWardNode = document.getElementById("heroWard");

  if (wardNameNode) {
    const ward = detectWard(Number(document.getElementById("lat").value), Number(document.getElementById("lng").value));
    wardNameNode.textContent = ward.name;
    wardZoneNode.textContent = `${ward.zone} · service match confidence 98%`;
    if (wardHintNode) wardHintNode.textContent = `${ward.name} will receive this report.`;
  }

  if (heroWardNode) {
    const ward = detectWard(12.9573, 77.5999);
    heroWardNode.textContent = ward.name;
  }
}

function renderDashboard() {
  const openCases = document.getElementById("openCasesValue");
  const escalations = document.getElementById("escalationsValue");
  const resolved = document.getElementById("resolvedValue");
  const sla = document.getElementById("slaValue");

  if (!openCases) return;

  openCases.textContent = state.reports.filter((item) => item.status !== "Resolved").length;
  escalations.textContent = state.reports.filter((item) => item.status === "Escalated").length;
  resolved.textContent = state.reports.filter((item) => item.status === "Resolved").length;
  sla.textContent = state.reports.filter((item) => item.status !== "Resolved" && item.ageHours > 24).length;
}

function renderIssueTable() {
  const target = document.getElementById("issueTable");
  if (!target) return;

  target.innerHTML = state.reports
    .slice(0, 5)
    .map((issue) => `
      <div class="issue-row">
        <div>
          <strong>${issue.title}</strong>
          <small>${issue.ward}</small>
        </div>
        <div>
          <span class="tag ${statusBadgeClass(issue.status)}">${issue.status}</span>
        </div>
        <div>
          <strong>${issue.category}</strong>
        </div>
        <div>
          <strong>${issue.department}</strong>
        </div>
      </div>
    `)
    .join("");
}

function renderPriorityList() {
  const target = document.getElementById("priorityList");
  if (!target) return;

  target.innerHTML = state.reports
    .filter((issue) => issue.status !== "Resolved")
    .sort((a, b) => b.ageHours - a.ageHours)
    .slice(0, 4)
    .map((issue) => `
      <div class="priority-item">
        <strong>${issue.title}</strong>
        <small>${issue.ward} · ${issue.ageHours}h unresolved</small>
      </div>
    `)
    .join("");
}

function handlePhotoUpload() {
  const input = document.getElementById("photo");
  if (!input) return;

  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const preview = document.getElementById("preview");
      if (preview) preview.src = loadEvent.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function bindReportForm() {
  const form = document.getElementById("reportForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value;
    const reporter = document.getElementById("reporter").value.trim();
    const description = document.getElementById("description").value.trim();
    const latitude = Number(document.getElementById("lat").value);
    const longitude = Number(document.getElementById("lng").value);
    const ward = detectWard(latitude, longitude);

    const newIssue = {
      id: `DWN-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      category,
      description,
      reporter,
      latitude,
      longitude,
      status: "Submitted",
      ward: ward.name,
      department: category === "Streetlight outage" ? "Electrical maintenance" : category === "Water leak" ? "Water services" : "Stormwater maintenance",
      severity: ward.level || "High",
      photo: document.getElementById("preview")?.src || "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
      ageHours: 2,
      createdAt: Date.now(),
      timeline: [
        { title: "Report filed", detail: `${reporter} submitted a new civic issue with photo evidence.` },
        { title: "Ward confirmed", detail: `Matched to ${ward.name} via local-town GIS.` },
        { title: "Ticket created", detail: `Ticket ${newIssue.id} assigned to ${category}.` }
      ]
    };

    state.reports.unshift(newIssue);
    saveReports();
    renderDashboard();
    renderIssueTable();
    renderPriorityList();

    const message = document.getElementById("message");
    if (message) {
      message.textContent = `Report submitted. Ticket ${newIssue.id} created.`;
    }

    form.reset();
    document.getElementById("reporter").value = reporter;
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("lat").value = 12.9573;
    document.getElementById("lng").value = 77.5999;
    updateWardPreview();
  });
}

function bindLocationButton() {
  const button = document.getElementById("locateBtn");
  if (!button) return;

  button.addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("Geolocation is unavailable in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        document.getElementById("lat").value = position.coords.latitude;
        document.getElementById("lng").value = position.coords.longitude;
        updateWardPreview();
      },
      () => {
        alert("Location permission was denied.");
      }
    );
  });
}

function init() {
  bindReportForm();
  handlePhotoUpload();
  bindLocationButton();
  updateWardPreview();

  renderDashboard();
  renderIssueTable();
  renderPriorityList();
}

window.addEventListener("DOMContentLoaded", init);
