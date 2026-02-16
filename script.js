const dsiData = {
  global: {
    title: "Vue DSI",
    description: "Suivi consolidé des services numériques et de la performance IT.",
    kpis: [
      { label: "Disponibilité SI", value: "99,92%" },
      { label: "Incidents critiques", value: "3" },
      { label: "Tickets résolus (J)", value: "126" },
      { label: "Projets dans les délais", value: "87%" },
    ],
    metrics: {
      "Disponibilité (%)": [99.7, 99.8, 99.9, 99.8, 99.9, 99.95, 99.92],
      "Incidents critiques": [5, 4, 4, 3, 4, 2, 3],
      "Satisfaction support (%)": [81, 83, 84, 86, 85, 88, 89],
    },
  },
  infrastructure: {
    title: "Infrastructure",
    description: "État des serveurs, capacité et continuité de service.",
    kpis: [
      { label: "Serveurs supervisés", value: "214" },
      { label: "Capacité CPU moyenne", value: "63%" },
      { label: "Sauvegardes OK", value: "98,6%" },
      { label: "Pannes majeures (M)", value: "1" },
    ],
    metrics: {
      "Utilisation CPU (%)": [58, 61, 64, 60, 66, 68, 63],
      "Stockage utilisé (%)": [71, 72, 73, 74, 75, 74, 76],
      "Disponibilité serveurs (%)": [99.3, 99.5, 99.6, 99.4, 99.7, 99.8, 99.7],
    },
  },
  security: {
    title: "Cybersécurité",
    description: "Suivi des vulnérabilités, alertes SOC et conformité.",
    kpis: [
      { label: "Alertes traitées (J)", value: "74" },
      { label: "Vulnérabilités critiques", value: "6" },
      { label: "Postes conformes", value: "94%" },
      { label: "Phishing bloqués", value: "132" },
    ],
    metrics: {
      "Alertes SOC": [69, 72, 70, 76, 80, 73, 74],
      "Vulnérabilités critiques": [9, 8, 8, 7, 7, 6, 6],
      "Taux de conformité (%)": [90, 91, 92, 92, 93, 94, 94],
    },
  },
  support: {
    title: "Support utilisateurs",
    description: "Performance du service desk et qualité de résolution.",
    kpis: [
      { label: "Tickets ouverts (J)", value: "148" },
      { label: "SLA respecté", value: "92%" },
      { label: "Temps moyen de résolution", value: "6h12" },
      { label: "Backlog > 7 jours", value: "18" },
    ],
    metrics: {
      "Tickets entrants": [120, 132, 141, 137, 150, 146, 148],
      "Tickets résolus": [112, 125, 134, 130, 143, 140, 142],
      "Respect SLA (%)": [89, 90, 91, 92, 92, 93, 92],
    },
  },
};

const titleEl = document.getElementById("section-title");
const descriptionEl = document.getElementById("section-description");
const chartTitleEl = document.getElementById("chart-title");
const chartEl = document.getElementById("chart");
const footnoteEl = document.getElementById("chart-footnote");
const metricSelect = document.getElementById("metric-select");
const navButtons = document.querySelectorAll(".nav-btn");
const themeToggle = document.getElementById("theme-toggle");

const kpiLabels = [
  document.getElementById("kpi-1-label"),
  document.getElementById("kpi-2-label"),
  document.getElementById("kpi-3-label"),
  document.getElementById("kpi-4-label"),
];

const kpiValues = [
  document.getElementById("kpi-1-value"),
  document.getElementById("kpi-2-value"),
  document.getElementById("kpi-3-value"),
  document.getElementById("kpi-4-value"),
];

let currentSection = "global";

function setMetricOptions(section) {
  const metricNames = Object.keys(dsiData[section].metrics);
  metricSelect.innerHTML = "";

  metricNames.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    metricSelect.appendChild(option);
  });
}

function updateKPIs(section) {
  const kpis = dsiData[section].kpis;

  kpis.forEach((kpi, index) => {
    kpiLabels[index].textContent = kpi.label;
    kpiValues[index].textContent = kpi.value;
  });
}

function formatValue(metricName, value) {
  if (metricName.includes("%")) {
    return `${value}%`;
  }

  return String(value);
}

function renderChart(metricName) {
  const values = dsiData[currentSection].metrics[metricName];
  const max = Math.max(...values);

  chartEl.innerHTML = "";

  values.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${Math.max(12, Math.round((value / max) * 100))}%`;

    const label = document.createElement("span");
    label.textContent = formatValue(metricName, value);
    bar.appendChild(label);

    chartEl.appendChild(bar);
  });

  chartTitleEl.textContent = `Tendance hebdomadaire — ${metricName}`;
  footnoteEl.textContent = `Périmètre: ${dsiData[currentSection].title}. Données simulées sur 7 jours.`;
}

function switchSection(section) {
  currentSection = section;

  titleEl.textContent = dsiData[section].title;
  descriptionEl.textContent = dsiData[section].description;

  updateKPIs(section);
  setMetricOptions(section);
  renderChart(metricSelect.value);

  navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.section === section);
  });
}

metricSelect.addEventListener("change", () => {
  renderChart(metricSelect.value);
});

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    switchSection(btn.dataset.section);
  });
});

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeToggle.checked);
});

switchSection(currentSection);
