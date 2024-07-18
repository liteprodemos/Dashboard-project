import React, { useState } from 'react';
import { Box, Typography, TextField, Grid, Switch, FormControlLabel, MenuItem, Select } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

const NetworkTrafficWidget = () => {
  const staticTrafficData = {
    labels: Array.from({ length: 72 }, (_, i) => new Date(2024, 6, Math.floor(i / 24) + 1, i % 24)),
    datasets: [
      {
        label: 'Outgoing Traffic',
        data: [
          500, 600, 550, 700, 800, 750, 600, 700, 850, 900, 950, 800, 700, 600, 750, 800, 850, 700, 650, 600, 700, 750, 800, 700,
          650, 700, 800, 850, 900, 950, 800, 700, 600, 750, 800, 850, 700, 650, 600, 700, 750, 800, 700, 650, 700, 800, 850, 900,
          950, 800, 700, 600, 750, 800, 850, 700, 650, 600, 700, 750, 800, 700, 650, 700, 800, 850, 900, 950, 800, 700, 600, 750
        ],
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Incoming Traffic',
        data: [
          300, 400, 350, 500, 600, 550, 400, 500, 650, 700, 750, 600, 500, 400, 550, 600, 650, 500, 450, 400, 500, 550, 600, 500,
          450, 500, 600, 650, 700, 750, 600, 500, 400, 550, 600, 650, 500, 450, 400, 500, 550, 600, 500, 450, 500, 600, 650, 700,
          750, 600, 500, 400, 550, 600, 650, 500, 450, 400, 500, 550, 600, 500, 450, 500, 600, 650, 700, 750, 600, 500, 400, 550
        ],
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  const [protocol, setProtocol] = useState('HTTP');
  const [sourceIP, setSourceIP] = useState('');
  const [destinationIP, setDestinationIP] = useState('');
  const [trafficData] = useState(staticTrafficData);

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
          <FormControlLabel
            control={<Switch checked={protocol === 'HTTPS'} onChange={handleProtocolChange} />}
            label={protocol}
          />
        </Grid>
        <Grid item>
          <Select value={protocol} onChange={handleProtocolChange}>
            <MenuItem value="HTTP">HTTP</MenuItem>
            <MenuItem value="HTTPS">HTTPS</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <TextField
            label="Source IP"
            variant="outlined"
            size="small"
            value={sourceIP}
            onChange={handleSourceIPChange}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Destination IP"
            variant="outlined"
            size="small"
            value={destinationIP}
            onChange={handleDestinationIPChange}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Line
          data={trafficData}
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
              zoom: {
                pan: {
                  enabled: true,
                  mode: 'xy',
                },
                zoom: {
                  enabled: true,
                  mode: 'xy',
                },
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
