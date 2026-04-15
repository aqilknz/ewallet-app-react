import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function IncomeChart() {
    const ref = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        chartInstance.current = new Chart(ref.current, {
            type: "bar",
            data: {
                labels: ["Sat", "Sun", "Mon", "Tue", "We", "Thu", "Fri"],
                datasets: [
                    {
                        label: "Income",
                        data: [15000, 5000, 85000, 30000, 40000, 20000, 15000],
                        borderWidth: 1,
                        backgroundColor: "#2948FF",
                        borderRadius: 6,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: { 
                    y: { 
                        beginAtZero: true,
                        ticks: { color: "#2948FF" } 
                    },
                    x: {
                        grid: { display: false }
                    }
                },
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="bg-white p-10 rounded-xl mt-6 mx-4 my-10 md:mx-0">
            <div className="flex justify-between mb-4 items-center">
                <h3 className="font-bold text-xl">Income Chart</h3>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition cursor-pointer">Income</button>
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm cursor-pointer transition">7 Days</button>
                </div>
            </div>

            <div className="h-100">
                <canvas ref={ref}></canvas>
            </div>
        </div>
    );
}

export default IncomeChart;