const dataBySection = {
  overview: {
    title: "Vue globale",
    revenue: [950, 1280, 1100, 1450, 1700, 1620, 1900],
    customers: [18, 24, 20, 27, 31, 29, 35],
    orders: [41, 56, 49, 60, 69, 64, 75],
    conversion: 3.4,
  },
  sales: {
    title: "Ventes",
    revenue: [760, 840, 910, 1020, 1200, 1350, 1410],
    customers: [11, 14, 16, 17, 21, 23, 24],
    orders: [29, 31, 34, 37, 40, 44, 47],
    conversion: 4.1,
  },
  traffic: {
    title: "Trafic",
    revenue: [450, 520, 610, 700, 740, 790, 880],
    customers: [43, 48, 52, 58, 66, 70, 77],
    orders: [12, 15, 17, 18, 20, 23, 26],
    conversion: 2.3,
  },
};

const titleEl = document.getElementById("section-title");
const chartEl = document.getElementById("chart");
const metricSelect = document.getElementById("metric-select");
const navButtons = document.querySelectorAll(".nav-btn");
const themeToggle = document.getElementById("theme-toggle");

const kpiRevenue = document.getElementById("kpi-revenue");
const kpiCustomers = document.getElementById("kpi-customers");
const kpiConversion = document.getElementById("kpi-conversion");
const kpiOrders = document.getElementById("kpi-orders");

let currentSection = "overview";

function euro(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function updateKPIs(section) {
  const d = dataBySection[section];
  kpiRevenue.textContent = euro(d.revenue[d.revenue.length - 1]);
  kpiCustomers.textContent = d.customers[d.customers.length - 1];
  kpiConversion.textContent = `${d.conversion}%`;
  kpiOrders.textContent = d.orders[d.orders.length - 1];
}

function renderChart(metric) {
  const values = dataBySection[currentSection][metric];
  const max = Math.max(...values);

  chartEl.innerHTML = "";
  values.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${Math.round((value / max) * 100)}%`;

    const label = document.createElement("span");
    label.textContent = value;
    bar.appendChild(label);

    chartEl.appendChild(bar);
  });
}

function switchSection(section) {
  currentSection = section;
  titleEl.textContent = dataBySection[section].title;
  updateKPIs(section);
  renderChart(metricSelect.value);

  navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.section === section);
  });
}

metricSelect.addEventListener("change", () => renderChart(metricSelect.value));

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => switchSection(btn.dataset.section));
});

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeToggle.checked);
});

switchSection(currentSection);
