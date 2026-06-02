import React, { useEffect, useRef, useState, useMemo } from "react";
import { Chart, registerables } from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactionReport } from "../../redux/slice/transactionUserSlice";

Chart.register(...registerables);

function TransactionChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const dispatch = useDispatch();

  const [filterType, setFilterType] = useState("both");
  const [filterRange, setFilterRange] = useState(7);

  const { chartData = [] } = useSelector((state) => state.dashboard); 

  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - filterRange);

    const formatDate = (date) => {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    };

    const params = {
      type: filterType,
      start_date: formatDate(startDate),
      end_date: formatDate(endDate)
    };

    dispatch(fetchTransactionReport(params));
  }, [dispatch, filterType, filterRange]);

  const labels = useMemo(() => {
    return chartData.map(item => {
      if (!item.date) return "";
      const d = new Date(item.date);
      return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
    });
  }, [chartData]);

  const incomeData = useMemo(() => chartData.map(item => item.total_income || 0), [chartData]);
  const expenseData = useMemo(() => chartData.map(item => item.total_expense || 0), [chartData]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const datasets = [];

    if (filterType === "both" || filterType === "income") {
      datasets.push({
        label: "Income",
        data: incomeData, 
        backgroundColor: "#2948FF",
        borderRadius: 6,
        borderWidth: 0,
      });
    }

    if (filterType === "both" || filterType === "expense") {
      datasets.push({
        label: "Expense",
        data: expenseData, 
        backgroundColor: "#FF2929",
        borderRadius: 6,
        borderWidth: 0,
      });
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: labels, 
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: "top", align: "end", labels: { usePointStyle: true, boxWidth: 8 } },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(context.parsed.y);
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: { 
            beginAtZero: true, 
            ticks: { 
              color: "#6B7280",
              callback: function(value) {
                if (value >= 1000000) {
                  return (value / 1000000) + 'M';
                } else if (value >= 1000) {
                  return (value / 1000) + 'k';
                }
                return value;
              }
            }, 
            grid: { color: "#F3F4F6" } 
          },
          x: { grid: { display: false }, ticks: { color: "#6B7280" } },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [filterType, labels, incomeData, expenseData]);

  return (
    <div className="mx-4 my-10 mt-6 rounded-xl bg-white p-6 md:mx-0 md:p-10">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h3 className="text-xl font-bold text-gray-800">Statistik Transaksi</h3>
        
        <div className="flex w-full gap-2 sm:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 sm:w-auto"
          >
            <option value="both">Income & Expense</option>
            <option value="income">Income Only</option>
            <option value="expense">Expense Only</option>
          </select>

          <select
            value={filterRange}
            onChange={(e) => setFilterRange(Number(e.target.value))}
            className="w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 sm:w-auto"
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 1 Month</option>
          </select>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default TransactionChart;