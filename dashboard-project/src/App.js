
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

  const handleSelect = (event) => {
    setSelectedServer(event);
  };

  const DetailedCostAnalysisWidgetData = {
    labels: [
      '2024-07-01T00:00', '2024-07-02T00:00', '2024-07-03T00:00', '2024-07-04T00:00',
      '2024-07-05T00:00', '2024-07-06T00:00', '2024-07-07T00:00', '2024-07-08T00:00'
    ],
    datasets: [
      {
        label: 'Cost',
        data: [90, 120, 110, 100, 90, 80, 70, 60],
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

  const currentServerData = HardwareUsageWidgetData[selectedServer] || {};

  return (
    <Container>
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, mb: 2 }}>
        <Typography variant="h4">Dashboard Sample 1</Typography>
      </Box>

      {/* System Usage */}
      <Box sx={{ mb: 2 }}>
        
        {/* <Typography variant="h6" gutterBottom>
          System Usage
        </Typography> */}
        <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ mt: 0 }}>
        <DropdownButton
          id="dropdown-basic-button"
          title={`Select Server (${selectedServer === 'server1' ? 'Server 1' : 'Server 2'})`}
          onSelect={handleSelect}
          style={{ marginBottom: '10px' }}
        >
          <Dropdown.Item eventKey="server1">Server 1</Dropdown.Item>
          <Dropdown.Item eventKey="server2">Server 2</Dropdown.Item>
        </DropdownButton>
        <Box sx={{ mt: 5 }}>
        <SystemLoadWidget />
        </Box>
            
          </Grid>
          <Grid item xs={12} md={6}>
            {currentServerData.resources ? (
              <HardwareUsageWidget 
                selectedServer={selectedServer}
                data={currentServerData.resources}
                handleServerChange={handleSelect}
              />
            ) : (
              <Typography variant="body1" color="error">No data available for the selected server.</Typography>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Real Time Utilization Widget */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Real Time Utilization
        </Typography>
        <Box sx={{ border: '1px solid black', p: 2 }}>
          <RealTimeUtilizationWidget 
            selectedServer={selectedServer}
            serverData={RealTimeUtilizationWidgetData}
          />
        </Box>
      </Box>

      {/* Detailed Cost Analysis Widget */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Detailed Cost Analysis
        </Typography>
        <Box sx={{ border: '1px solid black', p: 2 }}>
          <DetailedCostAnalysisWidget 
            lineData={DetailedCostAnalysisWidgetData}
          />
        </Box>
      </Box>


      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Network Traffic Analysis
        </Typography>
        <Box sx={{ border: '1px solid black', p: 2 }}>
        <NetworkTrafficWidget />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
