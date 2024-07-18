import React from 'react';
import { Container, ProgressBar } from 'react-bootstrap';
import { Grid, Box, Typography } from '@mui/material';
import computinguniticon from '../images/86166-200.png';
import networkingicon from '../images/networkingicon.png';
import storageicon from '../images/storageicon.png';

const SystemStateWidget = () => {
  const computeUnits = { inUse: 8, available: 25, reserved: 0 };
  const networking = { inUse: 6, standby: 3, available: 1 };
  const storage = { inUsePercent: 40, availablePercent: 56, reservedPercent: 4 };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box textAlign="center" p={1} border={1} borderRadius={4}>
            <Typography variant="h6">Compute Units</Typography>
            <img src={computinguniticon} alt="Compute" style={{ width: '50px', height: '50px' }} />
            <Typography>{computeUnits.inUse} In Use</Typography>
            <Typography>{computeUnits.available} Available</Typography>
            <ProgressBar>
              <ProgressBar variant="success" now={(computeUnits.inUse / (computeUnits.inUse + computeUnits.available)) * 100} key={1} />
              <ProgressBar variant="warning" now={(computeUnits.reserved / (computeUnits.inUse + computeUnits.available)) * 100} key={2} />
              <ProgressBar variant="info" now={(computeUnits.available / (computeUnits.inUse + computeUnits.available)) * 100} key={3} />
            </ProgressBar>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box textAlign="center" p={1} border={1} borderRadius={4}>
            <Typography variant="h6">Networking</Typography>
            <img src={networkingicon} alt="Networking" style={{ width: '50px', height: '50px' }} />
            <Typography>{networking.inUse} In Use</Typography>
            <Typography>{networking.standby} In Standby</Typography>
            <ProgressBar>
              <ProgressBar variant="success" now={(networking.inUse / (networking.inUse + networking.standby + networking.available)) * 100} key={1} />
              <ProgressBar variant="warning" now={(networking.standby / (networking.inUse + networking.standby + networking.available)) * 100} key={2} />
              <ProgressBar variant="info" now={(networking.available / (networking.inUse + networking.standby + networking.available)) * 100} key={3} />
            </ProgressBar>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box textAlign="center" p={1} border={1} borderRadius={4}>
            <Typography variant="h6">Storage & Data</Typography>
            <img src={storageicon} alt="Storage" style={{ width: '50px', height: '50px' }} />
            <Typography>{storage.inUsePercent}% In Use</Typography>
            <Typography>{storage.availablePercent}% Available</Typography>
            <ProgressBar>
              <ProgressBar variant="success" now={storage.inUsePercent} key={1} />
              <ProgressBar variant="warning" now={storage.reservedPercent} key={2} />
              <ProgressBar variant="info" now={storage.availablePercent} key={3} />
            </ProgressBar>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SystemStateWidget;
