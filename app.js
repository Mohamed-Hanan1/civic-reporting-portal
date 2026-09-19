:root {
  --bg: #06141f;
  --bg-2: #0d1d2d;
  --card: rgba(11, 24, 35, 0.7);
  --card-strong: rgba(13, 29, 42, 0.86);
  --line: rgba(145, 171, 193, 0.2);
  --text: #edf7ff;
  --muted: #9cb9ce;
  --primary: #7cf0d6;
  --secondary: #89a0ff;
  --amber: #f7c772;
  --danger: #ff7b7b;
  --success: #6FE7B1;
  --info: #6bbaf9;
  --shadow: 0 28px 70px rgba(0, 0, 0, 0.34);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  background:
    radial-gradient(circle at top left, rgba(124, 240, 214, 0.11), transparent 24%),
    radial-gradient(circle at top right, rgba(137, 160, 255, 0.12), transparent 28%),
    linear-gradient(180deg, #051219 0%, #0a1d2d 44%, #0b1520 100%);
  color: var(--text);
}

img {
  max-width: 100%;
  display: block;
}

button, input, select, textarea {
  font: inherit;
}

.shell {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
}

.bg-grid {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: radial-gradient(circle at center, black 42%, transparent 100%);
  opacity: 0.4;
}

.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.2;
  pointer-events: none;
}

.orb-one {
  width: 320px;
  height: 320px;
  background: #5fe6ff;
  top: 80px;
  left: 8%;
}

.orb-two {
  width: 420px;
  height: 420px;
  background: #7d95ff;
  right: 6%;
  top: 180px;
}

.orb-three {
  width: 300px;
  height: 300px;
  background: #6ee7b7;
  left: 40%;
  bottom: 50px;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0 10px;
  backdrop-filter: blur(12px);
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-weight: 800;
  color: #06181a;
  background: linear-gradient(135deg, #7cf0d6, #93c5fd);
  box-shadow: 0 8px 18px rgba(124, 240, 214, 0.5);
}

.brand-name {
  font-weight: 800;
  letter-spacing: -0.05em;
}

.brand-tag {
  font-size: 0.72rem;
  color: var(--muted);
}

.topnav {
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 12px 18px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(8, 18, 27, 0.45);
}

.topnav a {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;
}

.topnav a:hover {
  color: var(--text);
}

.ghost-btn,
.primary-btn,
.secondary-btn {
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ghost-btn,
.secondary-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line);
  color: var(--text);
  padding: 11px 18px;
  border-radius: 14px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
}

.primary-btn {
  background: linear-gradient(135deg, var(--primary), #94c3ff);
  color: #07141d;
  padding: 14px 22px;
  border-radius: 14px;
  font-weight: 700;
  box-shadow: 0 12px 30px rgba(124, 240, 214, 0.35);
}

.large-btn {
  min-width: 200px;
}

.small-btn {
  padding: 8px 12px;
  font-size: 0.8rem;
}

.primary-btn:hover,
.secondary-btn:hover,
.ghost-btn:hover {
  transform: translateY(-1px);
}

.hero {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 28px;
  align-items: center;
  padding: 42px 0 28px;
}

.eyebrow {
  margin: 0 0 8px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
  font-size: 0.72rem;
  font-weight: 700;
}

.eyebrow.inline {
  letter-spacing: 0.08em;
}

.hero-copy h1 {
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 5rem);
  line-height: 0.98;
  letter-spacing: -0.08em;
}

.lede {
  max-width: 620px;
  margin: 16px 0 0;
  color: var(--muted);
  font-size: 1.04rem;
  line-height: 1.7;
}

.cta-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 28px;
}

.hero-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 28px;
}

.metric-card {
  min-width: 150px;
  padding: 16px 18px;
  border-radius: 18px;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--line);
}

.metric-card strong {
  display: block;
  font-size: 1.6rem;
  letter-spacing: -0.05em;
}

.metric-card span {
  display: block;
  margin-top: 6px;
  color: var(--muted);
  font-size: 0.8rem;
}

.glass-panel {
  background: linear-gradient(180deg, rgba(12, 23, 31, 0.9), rgba(10, 20, 29, 0.76));
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
}

.hero-visual {
  border-radius: 28px;
  padding: 18px 18px 22px;
  position: relative;
  overflow: hidden;
}

.visual-head {
  display: flex;
  gap: 8px;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  display: inline-block;
}

.dot.green { background: #6ee7b7; }
.dot.orange { background: #f7c772; }
.dot.blue { background: #7cb8ff; }

.mini-dashboard {
  padding-top: 18px;
}

.mini-card {
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px;
  background: rgba(255,255,255,0.02);
}

.mini-card.highlight {
  background: linear-gradient(135deg, rgba(124, 240, 214, 0.1), rgba(137, 160, 255, 0.06));
  border-color: rgba(124, 240, 214, 0.2);
}

.mini-card small,
.mini-stats small {
  display: block;
  color: var(--muted);
  margin-bottom: 8px;
}

.mini-card strong {
  font-size: 1.1rem;
}

.mini-stats {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.mini-stats > div {
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 14px 16px;
}

.signal-line {
  margin-top: 18px;
  display: flex;
  align-items: end;
  gap: 8px;
  height: 88px;
  padding: 12px 8px 0;
}

.bar {
  display: block;
  width: 14%;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(180deg, #7cf0d6, #6bbaf9);
  animation: pulseBars 1.4s ease-in-out infinite alternate;
}

.b1 { height: 25%; }
.b2 { height: 42%; animation-delay: 0.1s; }
.b3 { height: 68%; animation-delay: 0.2s; }
.b4 { height: 58%; animation-delay: 0.3s; }
.b5 { height: 88%; animation-delay: 0.4s; }
.b6 { height: 70%; animation-delay: 0.5s; }

.mini-status-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.pill,
.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border: 1px solid transparent;
}

.pill.success,
.status-badge.success { background: rgba(110, 231, 177, 0.12); color: #9af2c6; border-color: rgba(110, 231, 177, 0.25); }
.pill.warning,
.status-badge.warning { background: rgba(247, 199, 114, 0.12); color: #f8d188; border-color: rgba(247, 199, 114, 0.25); }
.pill.info,
.status-badge.info { background: rgba(107, 186, 249, 0.12); color: #9dd5ff; border-color: rgba(107, 186, 249, 0.25); }
.pill.danger,
.status-badge.danger { background: rgba(255, 123, 123, 0.12); color: #ffb0b0; border-color: rgba(255, 123, 123, 0.25); }
.status-badge.neutral { background: rgba(255,255,255,0.04); color: var(--muted); border-color: rgba(255,255,255,0.04); }

.report-panel,
.board-panel,
.map-panel,
.escalation-panel,
.card-panel {
  margin-top: 28px;
  padding: 22px 22px 26px;
  border-radius: 28px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.section-heading.compact {
  margin-bottom: 16px;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(1.7rem, 2vw, 2.3rem);
  letter-spacing: -0.06em;
}

.report-form {
  display: grid;
  gap: 18px;
}

.input-grid {
  display: grid;
  gap: 16px;
}

.two-col {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

label {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 0.88rem;
}

input,
select,
textarea {
  width: 100%;
  padding: 13px 14px;
  border-radius: 14px;
  background: rgba(9, 21, 31, 0.8);
  color: var(--text);
  border: 1px solid rgba(145, 171, 193, 0.18);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus,
select:focus,
textarea:focus {
  border-color: rgba(124, 240, 214, 0.7);
  box-shadow: 0 0 0 4px rgba(124, 240, 214, 0.08);
}

.location-panel {
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.02);
  border-radius: 18px;
  padding: 16px;
}

.location-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
}

.location-header h3 {
  margin: 0;
  font-size: 1.08rem;
}

.file-panel {
  display: grid;
  grid-template-columns: minmax(240px, 0.9fr) minmax(240px, 1.1fr);
  gap: 18px;
  align-items: center;
}

.upload-box {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 220px;
  border-radius: 20px;
  border: 1px dashed rgba(124, 240, 214, 0.5);
  background: linear-gradient(135deg, rgba(124, 240, 214, 0.08), rgba(137, 160, 255, 0.06));
}

.upload-box input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.upload-label {
  display: grid;
  place-items: center;
  gap: 10px;
  text-align: center;
  pointer-events: none;
  color: var(--text);
  font-weight: 600;
}

.upload-ico {
  width: 55px;
  height: 55px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  font-size: 2rem;
  color: #07141d;
  background: linear-gradient(135deg, var(--primary), #abdcff);
}

.preview-area {
  min-height: 220px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: rgba(0,0,0,0.2);
}

.preview-area img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.submit-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.status-text {
  color: var(--primary);
  font-size: 0.93rem;
  font-weight: 600;
  min-height: 24px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.ward-result {
  border: 1px solid var(--line);
  background: linear-gradient(135deg, rgba(124, 240, 214, 0.06), rgba(137, 160, 255, 0.04));
  border-radius: 20px;
  padding: 18px;
}

.ward-title-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ward-pin {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  font-size: 1.4rem;
  background: rgba(124, 240, 214, 0.14);
  color: var(--primary);
}

.ward-title-wrap h3 {
  margin: 0;
  font-size: 1.4rem;
  letter-spacing: -0.05em;
}

.ward-title-wrap p {
  margin: 4px 0 0;
  color: var(--muted);
}

.ward-meta {
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
  display: grid;
  gap: 10px;
  color: var(--muted);
}

.mini-map,
#openMap {
  height: 260px;
  margin-top: 18px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--line);
}

.ticket-box {
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgba(255,255,255,0.02);
  overflow: hidden;
}

.ticket-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
  background: rgba(124, 240, 214, 0.04);
}

.ticket-label {
  color: var(--muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.ticket-head strong {
  font-size: 1.1rem;
  letter-spacing: -0.04em;
}

.ticket-body {
  padding: 16px;
}

.ticket-body p {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
}

.ticket-meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  color: var(--muted);
  margin-top: 16px;
}

.timeline {
  margin-top: 18px;
  display: grid;
  gap: 14px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 12px;
  align-items: start;
}

.timeline-bullet {
  width: 12px;
  height: 12px;
  margin-top: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  box-shadow: 0 0 0 4px rgba(124, 240, 214, 0.12);
}

.timeline-item h4 {
  margin: 0;
  font-size: 0.94rem;
}

.timeline-item p {
  margin: 6px 0 0;
  color: var(--muted);
  line-height: 1.6;
}

.status-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.status-item {
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.02);
  border-radius: 18px;
  padding: 16px;
}

.status-item .top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.status-item h3 {
  margin: 0;
  font-size: 1.2rem;
  letter-spacing: -0.05em;
}

.status-item p {
  margin: 14px 0 0;
  color: var(--muted);
  line-height: 1.6;
}

.map-panel {
  padding-bottom: 18px;
}

.escalation-list {
  display: grid;
  gap: 12px;
}

.escalation-item {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr auto;
  gap: 16px;
  align-items: center;
  padding: 16px 18px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgba(255,255,255,0.02);
}

.escalation-head {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.escalation-head strong {
  font-size: 1.04rem;
}

.escalation-head span {
  color: var(--muted);
  font-size: 0.86rem;
}

.escalation-item .meta {
  color: var(--muted);
  font-size: 0.9rem;
}

.escalate-btn {
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 123, 123, 0.32);
  background: rgba(255, 123, 123, 0.08);
  color: #ffb0b0;
  cursor: pointer;
  font-weight: 700;
}

.leaflet-container {
  width: 100%;
  height: 100%;
  background: #081b28;
}

.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
  background: rgba(8, 18, 27, 0.95);
  color: var(--text);
}

@keyframes pulseBars {
  0% { transform: scaleY(0.9); opacity: 0.85; }
  100% { transform: scaleY(1.08); opacity: 1; }
}

@media (max-width: 980px) {
  .hero,
  .info-grid,
  .file-panel,
  .status-list {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-wrap: wrap;
    gap: 12px;
  }

  .topnav {
    order: 3;
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 620px) {
  .two-col,
  .submit-row,
  .location-header,
  .section-heading,
  .escalation-item {
    grid-template-columns: 1fr;
    display: grid;
  }

  .topnav {
    gap: 10px;
    font-size: 0.8rem;
    flex-wrap: wrap;
  }

  .cta-row {
    flex-direction: column;
    align-items: stretch;
  }

  .primary-btn,
  .secondary-btn, .ghost-btn {
    width: 100%;
    text-align: center;
  }
}


























































































