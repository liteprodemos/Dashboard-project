import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
// eslint-disable-next-line
import { Box, MenuItem, Select, Typography, Grid, Card, CardContent, Menu } from '@mui/material';

const chartOptions = (handleClick) => ({
  plugins: {
    legend: {
      display: false,
    },
  },
  onClick: handleClick,
});

const HardwareUsageWidget = ({ data, selectedServer, handleServerChange }) => {
  const [menuPosition, setMenuPosition] = useState(null);
  const [clickedElement, setClickedElement] = useState(null);

  const handleChartClick = (event, elements) => {
    if (elements.length > 0) {
      const chartElement = elements[0];
      const label = chartElement.element.$context.raw;
      setMenuPosition({ mouseX: event.native.clientX, mouseY: event.native.clientY });
      setClickedElement(label);
    }
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

  const chartData = (used, free) => ({
    datasets: [
      {
        data: [used, free],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverOffset: 4,
      },
    ],
    labels: ['Used', 'Free'],
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Hardware Usage</Typography>
        {/* <Select
          value={selectedServer}
          onChange={handleServerChange}
        >
          <MenuItem value="server1">Server 1</MenuItem>
          <MenuItem value="server2">Server 2</MenuItem>
        </Select> */}
      </Box>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Doughnut data={chartData(data.storage.used, data.storage.free)} options={chartOptions(handleChartClick)} />
              </Box>
              <Typography variant="h6" align="center">Storage</Typography>
              <Typography align="center">Used Space: {data.storage.used} TB</Typography>
              <Typography align="center">Free Space: {data.storage.free} TB</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Doughnut data={chartData(data.vCPU.used, data.vCPU.available)} options={chartOptions(handleChartClick)} />
              </Box>
              <Typography variant="h6" align="center">vCPU</Typography>
              <Typography align="center">Utilized Core Count: {data.vCPU.used}</Typography>
              <Typography align="center">Available Core Count: {data.vCPU.available}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Doughnut data={chartData(data.ip.used, data.ip.available)} options={chartOptions(handleChartClick)} />
              </Box>
              <Typography variant="h6" align="center">IP</Typography>
              <Typography align="center">Used: {data.ip.used}</Typography>
              <Typography align="center">Available: {data.ip.available}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Doughnut data={chartData(data.ram.used, data.ram.free)} options={chartOptions(handleChartClick)} />
              </Box>
              <Typography variant="h6" align="center">RAM</Typography>
              <Typography align="center">Used: {data.ram.used} GB</Typography>
              <Typography align="center">Free: {data.ram.free} GB</Typography>
            </CardContent>
          </Card>
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
    </Box>
  );
};

export default HardwareUsageWidget;
