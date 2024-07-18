// src/SystemLoadWidget.js
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const SystemLoadWidget = () => {
  const cpuUtilization = 46.2; // Example CPU utilization value
  const gpuUtilization = 92.5; // Example GPU utilization value
  const cpuTemperature = 65; // Example CPU temperature value in Celsius
  const gpuTemperature = 48; // Example GPU temperature value in Celsius

  // Event Handlers
  const handleClick = (label) => {
    console.log(`Clicked on: ${label}`);
    alert(label);
  };
  // eslint-disable-next-line
  const handleHover = (label) => {
    console.log(`Hovering over: ${label}`);
  };

  return (
    <Grid container spacing={2}>
      {/* CPU Utilization Gauge */}
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{ width: '100%', backgroundColor: '#cccccc', color: 'white' }}
          onClick={() => handleClick('CPU Utilization is '+cpuUtilization+'%')}
          // onMouseOver={() => handleHover('CPU Utilization')}
        >
          <CardContent>
            <Typography variant="h7" gutterBottom style={{ color: 'black' }}>
              CPU Utilization
            </Typography>
            <div style={{ height: '150px' }}>
              <Gauge
                value={cpuUtilization}
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
                text={({ value, max }) => `${value}%`}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* GPU Utilization Gauge */}
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{ width: '100%', backgroundColor: '#cccccc', color: 'white' }}
          onClick={() => handleClick('GPU Utilization is '+gpuUtilization+'%')}
          // onMouseOver={() => handleHover('GPU Utilization')}
        >
          <CardContent>
            <Typography variant="h7" gutterBottom style={{ color: 'black' }}>
              GPU Utilization
            </Typography>
            <div style={{ height: '150px' }}>
              <Gauge
                value={gpuUtilization}
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
                text={({ value, max }) => `${value}%`}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* CPU Temperature Gauge */}
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{ width: '100%', backgroundColor: '#cccccc', color: 'white' }}
          onClick={() => handleClick('CPU Temperature is '+cpuTemperature+'C')}
          // onMouseOver={() => handleHover('CPU Temperature')}
        >
          <CardContent>
            <Typography variant="h7" gutterBottom style={{ color: 'black' }}>
              CPU Temperature
            </Typography>
            <div style={{ height: '150px' }}>
              <Gauge
                value={cpuTemperature}
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
                text={({ value, max }) => `${value}C`}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* GPU Temperature Gauge */}
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{ width: '100%', backgroundColor: '#cccccc', color: 'white' }}
          onClick={() => handleClick('GPU Temperature is '+gpuTemperature+'C')}
          // onMouseOver={() => handleHover('GPU Temperature')}
        >
          <CardContent>
            <Typography variant="h7" gutterBottom style={{ color: 'black' }}>
              GPU Temperature
            </Typography>
            <div style={{ height: '150px' }}>
              <Gauge
                value={gpuTemperature}
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
                text={({ value, max }) => `${value}C`}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SystemLoadWidget;
