const wards = [
  { name: "Ward 12 · Riverside", zone: "North civic zone", lat: 12.9585, lng: 77.5986 },
  { name: "Ward 18 · Greenfield", zone: "East civic zone", lat: 12.9445, lng: 77.5875 },
  { name: "Ward 06 · Old Town", zone: "Core civic zone", lat: 12.9692, lng: 77.6112 },
  { name: "Ward 21 · Hillside", zone: "South civic zone", lat: 12.9328, lng: 77.5713 }
];

const key = "urbancare-reports";
const seed = [
  { id: "CVC-2418", title: "Broken manhole cover near school gate", category: "Road damage", ward: "Ward 12 · Riverside", status: "Submitted", age: 14 },
  { id: "CVC-2435", title: "Drain blockage near market lane", category: "Drain blockage", ward: "Ward 18 · Greenfield", status: "In review", age: 18 },
  { id: "CVC-2461", title: "Streetlight outage on bus corridor", category: "Streetlight outage", ward: "Ward 06 · Old Town", status: "Escalated", age: 52 }
];

let reports = JSON.parse(localStorage.getItem(key) || "null") || seed;
let selected = reports[0];

const $ = (id) => document.getElementById(id);

function ward(lat, lng) {
  return wards.reduce((best, current) => {
    const bestDist = Math.hypot(best.lat - lat, best.lng - lng);
    const currentDist = Math.hypot(current.lat - lat, current.lng - lng);
    return currentDist < bestDist ? current : best;
  });
}

function save() {
  localStorage.setItem(key, JSON.stringify(reports));
}

function cls(status) {
  if (status === "Escalated") return "red";
  if (status === "In review") return "blue";
  if (status === "Resolved") return "green";
  return "amber";
}

function renderWard() {
  const w = ward(Number($("lat").value), Number($("lng").value));
  $("wardName").textContent = w.name;
  $("wardZone").textContent = `${w.zone} · 98% match`;
  $("heroWard").textContent = w.name;
  $("wardHint").textContent = `${w.name} will receive this report.`;
  $("ticketWard").textContent = w.name;
}

function renderTicket() {
  if (!selected) return;

  $("ticketId").textContent = selected.id;
  $("ticketTitle").textContent = selected.title;
  $("ticketStatus").textContent = selected.status;
  $("ticketStatus").className = `badge ${cls(selected.status)}`;

  $("timeline").innerHTML =
    "<div><b>Report filed</b><span>Issue logged with photo evidence and location.</span></div>" +
    "<div><b>Ward confirmed</b><span>Matched to " + selected.ward + " through civic GIS.</span></div>" +
    "<div><b>" + selected.status + "</b><span>Ticket assigned to the responsible civic team.</span></div>";
}

function renderLists() {
  $("openCount").textContent = reports.filter((r) => r.status !== "Resolved").length;

  $("statusList").innerHTML = reports
    .slice(0, 6)
    .map(
      (r) =>
        `<article class="card"><b>${r.category}</b><span class="${cls(r.status)}">${r.status}</span><p>${r.title}<br><small>${r.ward}</small></p></article>`
    )
    .join("");

  $("escalationList").innerHTML = reports
    .filter((r) => r.status !== "Resolved")
    .sort((a, b) => b.age - a.age)
    .map(
      (r) =>
        `<div class="escalation"><div><strong>${r.title}</strong><small>${r.ward} · ${r.age}h unresolved</small></div><span class="badge ${r.age > 48 ? "red" : "amber"}">${r.status}</span><button data-id="${r.id}">Escalate</button></div>`
    )
    .join("");

  document.querySelectorAll(".escalation button").forEach((button) => {
    button.onclick = () => {
      const r = reports.find((x) => x.id === button.dataset.id);
      r.status = "Escalated";
      save();
      selected = r;
      render();
    };
  });
}

function render() {
  renderWard();
  renderTicket();
  renderLists();
}

$("reportForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const w = ward(Number($("lat").value), Number($("lng").value));
  const id = "CVC-" + Math.floor(1000 + Math.random() * 9000);

  selected = {
    id,
    title: $("title").value,
    category: $("category").value,
    ward: w.name,
    status: "Submitted",
    age: 0
  };

  reports.unshift(selected);
  save();
  render();

  $("message").textContent = `Report submitted. Public ticket ${id} created.`;
  location.hash = "ticket";
});

$("photo").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => ($("preview").src = reader.result);
    reader.readAsDataURL(file);
  }
});

["lat", "lng"].forEach((id) =>
  $(id).addEventListener("input", renderWard)
);

$("locate").onclick = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is unavailable.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      $("lat").value = position.coords.latitude;
      $("lng").value = position.coords.longitude;
      renderWard();
    },
    () => alert("Location permission was not granted.")
  );
};

render();
