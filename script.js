// Load the dataset containing ALL reports
async function loadData() {
  const id = new URLSearchParams(location.search).get("id");

  if (!id) {
    document.getElementById("content").innerHTML = "<p style='color: red;'>❌ Missing ?id= in URL.</p>";
    return;
  }

  try {
    const allReports = await fetch("./data/allReports.json").then(r => r.json());

    const report = allReports[id];
    if (!report) {
      document.getElementById("content").innerHTML = "<p style='color: red;'>❌ Report not found for ID: " + id + "</p>";
      return;
    }

    window.currentReport = report;
    document.getElementById("page-title").innerText = "Evaluation Report — " + id;

    renderTab("tongquan");

  } catch (err) {
    document.getElementById("content").innerHTML = "<p style='color: red;'>❌ Unable to load reports.</p>";
  }
}

// Render a specific tab
function renderTab(tabName) {
  const rep = window.currentReport;

  const htmlBlocks = {
    tongquan: rep.tbTongQuan,
    tbtckv: rep.tbTBTCKV,
    cbql: rep.tbCBQL,
    hv: rep.tbHV
  };

  document.getElementById("content").innerHTML = htmlBlocks[tabName];

  document.querySelectorAll(".tab-button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });
}

// Tab click events
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tab-button").forEach(btn => {
    btn.addEventListener("click", () => {
      renderTab(btn.dataset.tab);
    });
  });

  loadData();
});
