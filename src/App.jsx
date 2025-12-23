import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

function ChartWidget({ title, chartData }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: title },
        },
      },
    });

    chartRef.current = chart;
    return () => chart.destroy();
  }, [chartData, title]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    chart.data = chartData;
    chart.update();
  }, [chartData]);

  return <canvas ref={canvasRef} />;
}

function App() {
  const [year, setYear] = useState("2024");

  const datasets = {
    2024: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue 2024 ($k)",
          data: [40, 55, 48, 62, 70, 90],
          borderColor: "rgba(54,162,235,1)",
          backgroundColor: "rgba(54,162,235,0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    2025: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue 2025 ($k)",
          data: [60, 75, 72, 88, 95, 120],
          borderColor: "rgba(255,99,132,1)",
          backgroundColor: "rgba(255,99,132,0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
  };

  return (
    <div style={{ maxWidth: 750, margin: "40px auto" }}>
      <button
        onClick={() => setYear(year === "2024" ? "2025" : "2024")}
        style={{ padding: "8px 16px", marginBottom: 16 }}
      >
        Switch Year ({year})
      </button>

      <div style={{ height: 420 }}>
        <ChartWidget title="Company Revenue Trend" chartData={datasets[year]} />
      </div>
    </div>
  );
}

export default App;
