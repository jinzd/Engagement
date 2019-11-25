import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
const MyBarChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [options, setOptions] = useState({ scales: {} });

  useEffect(() => {
    console.log("running");
    setData({
      labels: [
        "Anger",
        "Contempt",
        "Disgust",
        "Fear",
        "Happiness",
        "Neutral",
        "Sadness",
        "Surprise"
      ],
      datasets: [
        {
          label: "Emotion",
          data: [0.575, 0, 0.006, 0.008, 0.394, 0.013, 0, 0.004],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
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
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return index + value + "%";
              }
            }
          }
        ]
      }
    });
  }, [setData, setOptions]);
  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};

export default MyBarChart;
