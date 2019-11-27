import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
const MyBarChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [], time: [] });
  const [options, setOptions] = useState({ scales: {} });

  useEffect(() => {
    console.log("running");
    setData({
      labels: [
        ["01:00"],
        ["02:00"],
        ["03:00"],
        ["04:00"],
        ["05:00"],
        ["06:00"],
        ["07:00"],
        ["08:00"],
        ["09:00"],
        ["01:00"],
        ["02:00"],
        ["03:00"],
        ["04:00"],
        ["05:00"],
        ["06:00"],
        ["07:00"],
        ["08:00"],
        ["09:00"],
        ["01:00"],
        ["02:00"],
        ["03:00"],
        ["04:00"],
        ["05:00"],
        ["06:00"],
        ["07:00"],
        ["08:00"],
        ["09:00"],
        ["01:00"],
        ["02:00"],
        ["03:00"],
        ["04:00"],
        ["05:00"],
        ["06:00"],
        ["07:00"],
        ["08:00"],
        ["09:00"],
        ["10:00"]
      ],
      datasets: [
        {
          label: "Engagement",
          data: [
            0,
            0.2,
            0.2,
            0.3,
            0.5,
            0.6,
            0,
            0.2,
            0.2,
            0.3,
            0.5,
            0.6,
            0,
            0.2,
            0.2,
            0.3,
            0.5,
            0.6,
            0,
            0.2,
            0.2,
            0.3,
            0.5,
            0.6,
            1
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    });
    setOptions({
      scales: {
        yAxes: [
          {
            ticks: {
              max: 1,
              min: 0,
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return index + value * 100 + "%";
              }
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              callback: function(value) {
                return value + "Min";
              }
            }
          }
        ]
      }
    });
  }, [setData, setOptions]);
  return (
    <>
      <div className="d-inline-block w-75">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default MyBarChart;
