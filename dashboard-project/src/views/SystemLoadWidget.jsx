import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Menu, MenuItem } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const SystemLoadWidget = ({ selectedServer, serverData }) => {
  const [menuPosition, setMenuPosition] = useState(null);
  const [clickedElement, setClickedElement] = useState(null);

  const handleCardClick = (event, label) => {
    const { clientX, clientY } = event;
    setMenuPosition({ mouseX: clientX, mouseY: clientY });
    setClickedElement(label);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const handleMenuClick = (action) => {
    if (clickedElement) {
      if (action === 'moreInfo') {
        alert(`More info on: ${clickedElement}`);
      } else if (action === 'restart') {
        alert(`Restart the instance: ${clickedElement}`);
      } else if (action === 'viewLog') {
        alert(`View log for: ${clickedElement}`);
      }
    }
    handleClose();
  };

  const { networkUtilization, temperatureMonitoring, powerConsumption } = serverData[selectedServer];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{ width: '100%', backgroundColor: '#cccccc', color: 'white', height: '250px' }}
          onClick={(event) => handleCardClick(event, 'Network Utilization is ' + networkUtilization + '%')}
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

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{ width: '100%', backgroundColor: '#cccccc', color: 'white', height: '250px' }}
          onClick={(event) => handleCardClick(event, 'Temperature Monitoring is ' + temperatureMonitoring + '°C')}
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

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{ width: '100%', backgroundColor: '#cccccc', color: 'white', height: '250px' }}
          onClick={(event) => handleCardClick(event, 'Power Consumption is ' + powerConsumption + 'W')}
        >
          <CardContent>
            <Typography variant="h7" gutterBottom style={{ color: 'black' }}>
              Power Consumption
            </Typography>
            <div style={{ height: '150px' }}>
              <Gauge
                value={powerConsumption / 10}
                startAngle={-110}
                endAngle={110}
                min={0}
                max={500}
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
    </Grid>
  );
};

export default SystemLoadWidget;
