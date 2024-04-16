import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import './chart.css'

const LineGraph = (props) => {
    const chartRef = useRef(null);
    let myChart = null;

    useEffect(() => {
        if (chartRef.current) {
            // Destroy previous chart if it exists
            if (myChart) {
                myChart.destroy();
            }

            // Data for the graph
            const data = {
                labels: props.data.date,
                datasets: [
                    {
                        label: props.data.pose,
                        data: props.data.time,
                        borderColor: "blue",
                        borderWidth: 1,
                        fill: false,
                    },
                ],
            };

            // Options for the graph
            const options = {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            };

            // Create the line chart
            const ctx = chartRef.current.getContext('2d');
            myChart = new Chart(ctx, {
                type: "line",
                data: data,
                options: options,
            });
        }
    }, [props.data]); // Run this effect whenever props.data changes

    return (
        <div className="graph-container">
            <canvas id="myChart" ref={chartRef}></canvas>
        </div>
    );
};

export default LineGraph;
