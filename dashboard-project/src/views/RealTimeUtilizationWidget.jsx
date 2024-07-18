// src/RealTimeUtilizationWidget.js
// eslint-disable-next-line
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line
import { Card, Dropdown, DropdownButton } from 'react-bootstrap';
import { Grid, Typography } from '@mui/material';

const RealTimeUtilizationWidget = ({serverData, selectedServer}) => {
    // const serverData = {
    //     server1: {
    //       responseTime: [100, 150, 50, 200, 250, 100, 300, 80, 220, 160, 140, 180, 120],
    //       networkTraffic: [500, 450, 300, 600, 700, 500, 650, 550, 750, 800, 650, 700, 600],
    //       instructionsHandled: [700, 650, 500, 800, 900, 700, 850, 750, 950, 1000, 850, 900, 800],
    //     },
    //     server2: {
    //       responseTime: [200, 180, 220, 160, 140, 200, 120, 250, 300, 150, 170, 130, 190],
    //       networkTraffic: [250, 300, 400, 350, 450, 300, 500, 370, 450, 400, 350, 500, 320],
    //       instructionsHandled: [400, 450, 550, 500, 600, 450, 650, 520, 600, 550, 500, 650, 470],
    //     },
    //   };
      
      
      

  // const [selectedServer, setSelectedServer] = useState('server1');
  // eslint-disable-next-line
  const handleSelect = (server) => {
    // setSelectedServer(server);
  };

  const createGraphData = (label, data, color) => ({
    labels: [
      '1:00 AM', '1:05 AM', '1:10 AM', '1:15 AM', '1:20 AM', '1:25 AM',
      '1:30 AM', '1:35 AM', '1:40 AM', '1:45 AM', '1:50 AM', '1:55 AM', '2:00 AM'
    ],
    datasets: [
      {
        label,
        data,
        fill: false,
        backgroundColor: color,
        borderColor: color,
        pointRadius: 0,
        lineTension: 0.3,
      },
    ],
  });

  const responseTimeOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 350,
        ticks: {
          stepSize: 50,
          fontSize: 10,
        },
        title: {
          display: true,
          text: 'Response Time (ms)',
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

  const networkTrafficOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 900,
        ticks: {
          stepSize: 100,
          fontSize: 10,
        },
        title: {
          display: true,
          text: 'Network Traffic (kbps)',
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

  const instructionsHandledOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 1000,
        ticks: {
          stepSize: 100,
          fontSize: 10,
        },
        title: {
          display: true,
          text: 'Instructions Handled (k)',
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
    <Card style={{ width: '100%', margin: '10px' }}>
      <Card.Body>
        <Card.Title style={{ fontSize: '16px' }}>Real Time Utilization</Card.Title>
        {/* <DropdownButton
          id="dropdown-basic-button"
          title={`Select Server (${selectedServer === 'server1' ? 'Server 1' : 'Server 2'})`}
          onSelect={handleSelect}
          style={{ marginBottom: '10px' }}
        >
          <Dropdown.Item eventKey="server1">Server 1</Dropdown.Item>
          <Dropdown.Item eventKey="server2">Server 2</Dropdown.Item>
        </DropdownButton> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center">Response Time</Typography>
            <div style={{ height: '300px' }}>
              <Line data={createGraphData('Response Time (ms)', serverData[selectedServer].responseTime, 'rgb(75, 192, 192)')} options={responseTimeOptions} />
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center">Network Traffic</Typography>
            <div style={{ height: '300px' }}>
              <Line data={createGraphData('Network Traffic (kbps)', serverData[selectedServer].networkTraffic, 'rgb(255, 99, 132)')} options={networkTrafficOptions} />
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center">Instructions Handled</Typography>
            <div style={{ height: '300px' }}>
              <Line data={createGraphData('Instructions Handled (k)', serverData[selectedServer].instructionsHandled, 'rgb(54, 162, 235)')} options={instructionsHandledOptions} />
            </div>
          </Grid>
        </Grid>
      </Card.Body>
    </Card>
  );
};

export default RealTimeUtilizationWidget;
