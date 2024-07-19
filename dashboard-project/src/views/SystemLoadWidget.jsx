// src/SystemLoadWidget.js
// eslint-disable-next-line
import React, { useState } from 'react';
// eslint-disable-next-line
import { Grid, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const SystemLoadWidget = ({selectedServer, serverData}) => {
  // const [selectedServer, setSelectedServer] = useState('server1');

  // const serverData = {
  //   'server1': {
  //     networkUtilization: 75.4, // Example Network utilization value
  //     temperatureMonitoring: 60, // Example temperature monitoring value in Celsius
  //     powerConsumption: 450, // Example power consumption value in Watts
  //   },
  //   'server2': {
  //     networkUtilization: 60.2, // Example Network utilization value
  //     temperatureMonitoring: 55, // Example temperature monitoring value in Celsius
  //     powerConsumption: 400, // Example power consumption value in Watts
  //   },
  // };
// eslint-disable-next-line
  const handleServerChange = (event) => {
    // setSelectedServer(event.target.value);
  };

  const { networkUtilization, temperatureMonitoring, powerConsumption } = serverData[selectedServer];

  // Event Handlers
  const handleClick = (label) => {
    console.log(`Clicked on: ${label}`);
    alert(label);
  };

  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="server-select-label">Select Server</InputLabel>
          <Select
            labelId="server-select-label"
            id="server-select"
            value={selectedServer}
            onChange={handleServerChange}
          >
            <MenuItem value="server1">Server 1</MenuItem>
            <MenuItem value="server2">Server 2</MenuItem>
          </Select>
        </FormControl>
      </Grid> */}

      {/* Network Utilization Gauge */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{ width: '100%', backgroundColor: '#cccccc', color: 'white', height: '250px' }} // Fixed height applied here
          onClick={() => handleClick('Network Utilization is ' + networkUtilization + '%')}
        >
          <CardContent>
            <Typography variant="h7" gutterBottom style={{ color: 'black' }}>
              Network Utilization
            </Typography>
            <div style={{ height: '150px' }}>
              <Gauge
                value={networkUtilization}
                startAngle={-110}
                endAngle={110}
                min={0}
                max={100}
                thickness={22}
                sx={{
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 18,
                    transform: 'translate(0px, 0px)',
                    fill: '#4caf50',
                  },
                }}
                text={({ value }) => `${value}%`}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Temperature Monitoring Gauge */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{ width: '100%', backgroundColor: '#cccccc', color: 'white', height: '250px' }} // Fixed height applied here
          onClick={() => handleClick('Temperature Monitoring is ' + temperatureMonitoring + '°C')}
        >
          <CardContent>
            <Typography variant="h7" gutterBottom style={{ color: 'black' }}>
              Temperature Monitoring
            </Typography>
            <div style={{ height: '150px' }}>
              <Gauge
                value={temperatureMonitoring}
                startAngle={-110}
                endAngle={110}
                min={0}
                max={100}
                thickness={22}
                sx={{
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 18,
                    transform: 'translate(0px, 0px)',
                    fill: '#4caf50',
                  },
                }}
                text={({ value }) => `${value}°C`}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Power Consumption Gauge */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{ width: '100%', backgroundColor: '#cccccc', color: 'white', height: '250px' }} // Fixed height applied here
          onClick={() => handleClick('Power Consumption is ' + powerConsumption + 'W')}
        >
          <CardContent>
            <Typography variant="h7" gutterBottom style={{ color: 'black' }}>
              Power Consumption
            </Typography>
            <div style={{ height: '150px' }}>
              <Gauge
                value={powerConsumption/10}
                startAngle={-110}
                endAngle={110}
                min={0}
                max={500} // Adjusted max value to better fit the range of power consumption
                thickness={22}
                sx={{
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 18,
                    transform: 'translate(0px, 0px)',
                    fill: '#4caf50',
                  },
                }}
                text={({ value }) => `${value * 10}W`}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SystemLoadWidget;
