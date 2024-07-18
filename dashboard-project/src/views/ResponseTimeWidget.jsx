// src/ResponseTimeWidget.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

const ResponseTimeWidget = () => {
  const data = {
    labels: [
      '1:00 AM', '1:05 AM', '1:10 AM', '1:15 AM', '1:20 AM', '1:25 AM',
      '1:30 AM', '1:35 AM', '1:40 AM', '1:45 AM', '1:50 AM', '1:55 AM', '2:00 AM'
    ],
    datasets: [
      {
        label: 'Response Time (ms)',
        data: [
          100, 150, 50, 200, 100, 150, 50, 200, 100, 150, 50, 100, 150
        ],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        pointRadius: 0,
        lineTension: 0.3,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 250,
        ticks: {
          stepSize: 50,
          fontSize: 10,
        },
        title: {
          display: true,
          text: 'ms',
          fontSize: 12,
        },
      },
      x: {
        ticks: {
          fontSize: 10,
        },
        title: {
          display: true,
          text: 'Time',
          fontSize: 12,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return (
    <Card style={{ width: '100%', maxWidth: '800px', margin: '10px' }}>
      <Card.Body>
        <Card.Title style={{ fontSize: '16px' }}>Response Time</Card.Title>
        <div style={{ height: '150px' }}>
          <Line data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ResponseTimeWidget;
