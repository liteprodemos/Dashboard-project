
// import logo from './logo.svg';
import './App.css';
// eslint-disable-next-line
import HardwareUsageWidget from './views/HardwareUsageWidget';
// eslint-disable-next-line
import TestingViewComponet from './views/TestingViewCompnent';
// eslint-disable-next-line
import ResponseTimeWidget from './views/ResponseTimeWidget';
// eslint-disable-next-line
import CpuUtilizationWidget from './views/CpuUtilizationWidget';
// eslint-disable-next-line
import CostAnalysisWidget from './views/CostAnalysisWidget';
// eslint-disable-next-line
import SystemStateWidget from './views/SystemStateWidget';
// eslint-disable-next-line
import RealTimeUtilizationWidget from './views/RealTimeUtilizationWidget';
// eslint-disable-next-line
import SystemLoadWidget from './views/SystemLoadWidget';
// eslint-disable-next-line
import DetailedCostAnalysisWidget from './views/DetailedCostAnalysisWidget';
// eslint-disable-next-line
import NetworkTrafficWidget from './views/NetworkTrafficWidget ';
import { Container, Grid, Box, Typography } from '@mui/material';
// eslint-disable-next-line
import { Card, Dropdown, DropdownButton } from 'react-bootstrap';

import React, { useState } from 'react';
function App() {
  const [selectedServer, setSelectedServer] = useState('server1');
  const [userRole, setUserRole] = useState('CEO'); // Default role

  const handleServerSelect = (event) => {
    setSelectedServer(event);
  };

  const handleRoleSelect = (event) => {
    setUserRole(event);
  };
  const DetailedCostAnalysisWidgetData = {
    labels: [
      '2024-07-01T00:00', '2024-07-02T00:00', '2024-07-03T00:00', '2024-07-04T00:00',
      '2024-07-05T00:00', '2024-07-06T00:00', '2024-07-07T00:00', '2024-07-08T00:00',
      '2024-07-09T00:00', '2024-07-10T00:00', '2024-07-11T00:00', '2024-07-12T00:00',
      '2024-07-13T00:00', '2024-07-14T00:00', '2024-07-15T00:00', '2024-07-16T00:00',
      '2024-07-17T00:00', '2024-07-18T00:00', '2024-07-19T00:00', '2024-07-20T00:00',
      '2024-07-21T00:00', '2024-07-22T00:00', '2024-07-23T00:00', '2024-07-24T00:00',
      '2024-07-25T00:00', '2024-07-26T00:00', '2024-07-27T00:00', '2024-07-28T00:00',
      '2024-07-29T00:00', '2024-07-30T00:00', '2024-07-31T00:00'
    ],
    datasets: [
      {
        label: 'Cost',
        data: [
          90, 120, 110, 100, 90, 80, 70, 60, 85, 95, 105, 115,
          125, 130, 120, 110, 100, 90, 80, 70, 60, 75, 85, 95,
          105, 115, 125, 135, 120, 110, 100
        ],
        borderColor: 'rgba(75,192,192,1)',
        fill: true,
      },
    ],
  };

  const RealTimeUtilizationWidgetData = {
    server1: {
      responseTime: [100, 150, 50, 200, 250, 100, 300, 80, 220, 160, 140, 180, 120],
      networkTraffic: [500, 450, 300, 600, 700, 500, 650, 550, 750, 800, 650, 700, 600],
      instructionsHandled: [700, 650, 500, 800, 900, 700, 850, 750, 950, 1000, 850, 900, 800],
    },
    server2: {
      responseTime: [200, 180, 220, 160, 140, 200, 120, 250, 300, 150, 170, 130, 190],
      networkTraffic: [250, 300, 400, 350, 450, 300, 500, 370, 450, 400, 350, 500, 320],
      instructionsHandled: [400, 450, 550, 500, 600, 450, 650, 520, 600, 550, 500, 650, 470],
    },
  };

  const HardwareUsageWidgetData = {
    server1: {
        metadata: {
            id: 'server1',
            name: 'Server 1',
            location: 'US-East',
            ip: '192.168.1.1',
            status: 'active'
        },
        resources: {
            storage: { total: 50, used: 32, free: 18 },
            vCPU: { total: 150, used: 60, available: 90 },
            ip: { total: 80, used: 4, available: 76 },
            ram: { total: 1024, used: 870, free: 154 }
        },
        performance: {
            cpuUsage: '75%',
            memoryUsage: '85%',
            diskIO: '120 MB/s',
            networkIO: '1 Gbps'
        }
    },
    server2: {
        metadata: {
            id: 'server2',
            name: 'Server 2',
            location: 'US-West',
            ip: '192.168.1.2',
            status: 'active'
        },
        resources: {
            storage: { total: 50, used: 25, free: 25 },
            vCPU: { total: 150, used: 50, available: 100 },
            ip: { total: 80, used: 6, available: 74 },
            ram: { total: 1000, used: 800, free: 200 }
        },
        performance: {
            cpuUsage: '65%',
            memoryUsage: '80%',
            diskIO: '100 MB/s',
            networkIO: '900 Mbps'
        }
    }
  };

  const SystemLoadWidgetData = {
    'server1': {
      networkUtilization: 24.4, // Example Network utilization value
      temperatureMonitoring: 60, // Example temperature monitoring value in Celsius
      powerConsumption: 450, // Example power consumption value in Watts
    },
    'server2': {
      networkUtilization: 60.2, // Example Network utilization value
      temperatureMonitoring: 55, // Example temperature monitoring value in Celsius
      powerConsumption: 400, // Example power consumption value in Watts
    },
  };

  const currentServerData = HardwareUsageWidgetData[selectedServer] || {};

  return (
    <Container>
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, mb: 2 }}>
        <Typography variant="h4">Dashboard Sample 1</Typography>
      </Box>

      {/* User Role Selection */}
      <Box sx={{ mb: 2 }}>
        <DropdownButton
          id="dropdown-role-button"
          title={`Role: ${userRole}`}
          onSelect={handleRoleSelect}
          style={{ marginBottom: '10px' }}
        >
          <Dropdown.Item eventKey="CEO">CEO</Dropdown.Item>
          <Dropdown.Item eventKey="Tech">Tech</Dropdown.Item>
        </DropdownButton>
      </Box>

      {/* Widgets */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          {userRole === 'CEO' && (
            <Grid item xs={12}>
              <Box sx={{ border: '1px solid black', p: 2 }}>
                <DetailedCostAnalysisWidget 
                  lineData={DetailedCostAnalysisWidgetData}
                />
              </Box>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <DropdownButton
              id="dropdown-basic-button"
              title={`Select Server (${selectedServer === 'server1' ? 'Server 1' : 'Server 2'})`}
              onSelect={handleServerSelect}
              style={{ marginBottom: '10px' }}
            >
              <Dropdown.Item eventKey="server1">Server 1</Dropdown.Item>
              <Dropdown.Item eventKey="server2">Server 2</Dropdown.Item>
            </DropdownButton>
            <Box sx={{ mt: 5 }}>
              <SystemLoadWidget 
                selectedServer={selectedServer}
                serverData={SystemLoadWidgetData}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            {currentServerData.resources ? (
              <HardwareUsageWidget 
                selectedServer={selectedServer}
                data={currentServerData.resources}
                handleServerChange={handleServerSelect}
              />
            ) : (
              <Typography variant="body1" color="error">No data available for the selected server.</Typography>
            )}
          </Grid>

          {userRole === 'Tech' && (
            <>
              <Grid item xs={12}>
                <Box sx={{ border: '1px solid black', p: 2 }}>
                  <RealTimeUtilizationWidget 
                    selectedServer={selectedServer}
                    serverData={RealTimeUtilizationWidgetData}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ border: '1px solid black', p: 2 }}>
                  <NetworkTrafficWidget />
                </Box>
              </Grid>
            </>
          )}

        </Grid>
      </Box>
    </Container>
  );
}

export default App;
