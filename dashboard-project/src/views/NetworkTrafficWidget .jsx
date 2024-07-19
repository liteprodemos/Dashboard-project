import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, MenuItem, Select } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

const trafficData = {
  HTTP: {
    '192.168.0.1': {
      '192.168.0.2': {
        outgoing: [100, 150, 120, 180, 200, 170, 160, 210],
        incoming: [200, 250, 220, 280, 300, 270, 260, 310],
      },
      '192.168.0.3': {
        outgoing: [110, 140, 130, 170, 210, 180, 170, 220],
        incoming: [210, 260, 230, 290, 310, 280, 270, 320],
      },
    },
    '192.168.0.2': {
      '192.168.0.1': {
        outgoing: [120, 130, 140, 150, 160, 170, 180, 190],
        incoming: [220, 230, 240, 250, 260, 270, 280, 290],
      },
    },
  },
  HTTPS: {
    '192.168.0.1': {
      '192.168.0.2': {
        outgoing: [300, 350, 320, 380, 400, 370, 360, 410],
        incoming: [400, 450, 420, 480, 500, 470, 460, 510],
      },
      '192.168.0.3': {
        outgoing: [310, 340, 330, 370, 410, 380, 370, 420],
        incoming: [410, 460, 430, 490, 510, 480, 470, 520],
      },
    },
    '192.168.0.2': {
      '192.168.0.1': {
        outgoing: [320, 330, 340, 350, 360, 370, 380, 390],
        incoming: [420, 430, 440, 450, 460, 470, 480, 490],
      },
    },
  },
};

const NetworkTrafficWidget = () => {
  const [protocol, setProtocol] = useState('HTTP');
  const [sourceIP, setSourceIP] = useState('192.168.0.1');
  const [destinationIP, setDestinationIP] = useState('192.168.0.2');
  const [filteredData, setFilteredData] = useState({
    labels: Array.from({ length: 8 }, (_, i) => new Date(2024, 6, Math.floor(i / 8) + 1, i % 8)),
    datasets: [],
  });

  useEffect(() => {
    // Check if data exists for the selected protocol, sourceIP, and destinationIP
    const protocolData = trafficData[protocol];
    const sourceData = protocolData ? protocolData[sourceIP] : null;
    const destinationData = sourceData ? sourceData[destinationIP] : null;

    if (destinationData) {
      setFilteredData({
        labels: Array.from({ length: 8 }, (_, i) => new Date(2024, 6, Math.floor(i / 8) + 1, i % 8)),
        datasets: [
          {
            label: `${protocol} Outgoing Traffic`,
            data: destinationData.outgoing,
            borderColor: protocol === 'HTTP' ? 'blue' : 'red',
            fill: false,
          },
          {
            label: `${protocol} Incoming Traffic`,
            data: destinationData.incoming,
            borderColor: protocol === 'HTTP' ? 'green' : 'purple',
            fill: false,
          },
        ],
      });
    } else {
      // Set empty data if no data is available
      setFilteredData({
        labels: Array.from({ length: 8 }, (_, i) => new Date(2024, 6, Math.floor(i / 8) + 1, i % 8)),
        datasets: [
          {
            label: `${protocol} Outgoing Traffic`,
            data: [],
            borderColor: protocol === 'HTTP' ? 'blue' : 'red',
            fill: false,
          },
          {
            label: `${protocol} Incoming Traffic`,
            data: [],
            borderColor: protocol === 'HTTP' ? 'green' : 'purple',
            fill: false,
          },
        ],
      });
    }
  }, [protocol, sourceIP, destinationIP]);

  const handleProtocolChange = (event) => {
    setProtocol(event.target.value);
  };

  const handleSourceIPChange = (event) => {
    setSourceIP(event.target.value);
  };

  const handleDestinationIPChange = (event) => {
    setDestinationIP(event.target.value);
  };

  return (
    <Box sx={{ border: '1px solid gray', borderRadius: '8px', p: 2, bgcolor: '#f0f0f0' }}>
      <Typography variant="h5" gutterBottom>
        Network Traffic Insights
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Select value={protocol} onChange={handleProtocolChange}>
            <MenuItem value="HTTP">HTTP</MenuItem>
            <MenuItem value="HTTPS">HTTPS</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <Select value={sourceIP} onChange={handleSourceIPChange}>
            {Object.keys(trafficData[protocol]).map((ip) => (
              <MenuItem key={ip} value={ip}>
                {ip}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <Select value={destinationIP} onChange={handleDestinationIPChange}>
            {Object.keys(trafficData[protocol][sourceIP] || {}).map((ip) => (
              <MenuItem key={ip} value={ip}>
                {ip}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Line
          data={filteredData}
          options={{
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'hour',
                  tooltipFormat: 'MMM d, yyyy, h:mm a',
                },
                title: {
                  display: true,
                  text: 'Time',
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Traffic Volume',
                },
              },
            },
            plugins: {
              legend: {
                display: true,
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </Box>
    </Box>
  );
};

export default NetworkTrafficWidget;
