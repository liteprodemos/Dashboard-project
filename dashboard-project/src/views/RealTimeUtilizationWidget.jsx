import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import { Grid, Typography, Menu, MenuItem } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';

// Register required components and plugins
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, TimeScale, zoomPlugin);

const RealTimeUtilizationWidget = ({ serverData, selectedServer }) => {
  const [menuPosition, setMenuPosition] = useState(null);
  const [clickedElement, setClickedElement] = useState(null);

  const handleChartClick = (event, elements, chart) => {
    if (elements.length > 0) {
      const elementIndex = elements[0].index;
      const datasetIndex = elements[0].datasetIndex;
      const label = chart.data.datasets[datasetIndex].label;
      const value = chart.data.datasets[datasetIndex].data[elementIndex];

      setMenuPosition({
        mouseX: event.native.clientX - 2,
        mouseY: event.native.clientY - 4,
      });
      setClickedElement({ label, value });
    }
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const handleMenuClick = (action) => {
    if (clickedElement) {
      if (action === 'moreInfo') {
        alert(`More info on: ${clickedElement.label} - ${clickedElement.value}`);
      } else if (action === 'restart') {
        alert(`Restart the instance: ${clickedElement.label}`);
      } else if (action === 'viewLog') {
        alert(`View log for: ${clickedElement.label}`);
      }
    }
    handleClose();
  };

  const createGraphData = (label, data, color) => ({
    labels: serverData.labels,
    datasets: [
      {
        label,
        data,
        fill: false,
        backgroundColor: color,
        borderColor: color,
        pointRadius: 5,
        pointHoverRadius: 7,
        lineTension: 0.3,
      },
    ],
  });

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        labels: serverData.labels,
        ticks: {
          autoSkip: true,
          maxRotation: 90,
          minRotation: 45,
          font: {
            size: 10,
          },
        },
        min: serverData.labels[40],
        max: serverData.labels[50],
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
          font: {
            size: 10,
          },
        },
        title: {
          display: true,
          text: 'Value',
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
        limits: {
          x: {
            min: 0,
            max: 50,
          },
          y: {
            min: 0,
            max: 150,
          },
        },
      },
    },
    onClick: (event, elements, chart) => handleChartClick(event, elements, chart),
  };

  return (
    <Card style={{ width: '100%', margin: '10px' }}>
      <Card.Body>
        <Card.Title style={{ fontSize: '16px' }}>Real Time Utilization</Card.Title>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center">Response Time</Typography>
            <div style={{ height: '300px' }}>
              <Line
                data={createGraphData('Response Time (ms)', serverData[selectedServer].responseTime, 'rgb(75, 192, 192)')}
                options={chartOptions}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center">Network Traffic</Typography>
            <div style={{ height: '300px' }}>
              <Line
                data={createGraphData('Network Traffic (kbps)', serverData[selectedServer].networkTraffic, 'rgb(255, 99, 132)')}
                options={chartOptions}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center">Instructions Handled</Typography>
            <div style={{ height: '300px' }}>
              <Line
                data={createGraphData('Instructions Handled (k)', serverData[selectedServer].instructionsHandled, 'rgb(54, 162, 235)')}
                options={chartOptions}
              />
            </div>
          </Grid>
        </Grid>
        <Menu
          anchorReference="anchorPosition"
          anchorPosition={menuPosition ? { top: menuPosition.mouseY, left: menuPosition.mouseX } : undefined}
          open={Boolean(menuPosition)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuClick('moreInfo')}>More Info</MenuItem>
          <MenuItem onClick={() => handleMenuClick('restart')}>Restart the Instance</MenuItem>
          <MenuItem onClick={() => handleMenuClick('viewLog')}>View Log</MenuItem>
        </Menu>
      </Card.Body>
    </Card>
  );
};

export default RealTimeUtilizationWidget;
