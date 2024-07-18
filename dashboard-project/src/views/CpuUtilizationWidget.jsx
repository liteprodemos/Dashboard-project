// src/CpuUtilizationWidget.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const CpuUtilizationWidget = () => {
  const utilization = 46.2; // Example utilization value

  return (
    <Card sx={{ width: '100%', maxWidth: 300, margin: 1, backgroundColor: '##cccccc', color: 'white' }}>
      <CardContent>
      <Typography variant="h6" gutterBottom style={{ color: 'black' }}>
        CPU Utilization
      </Typography>
        <div style={{ height: '150px' }}>
          <Gauge
            value={utilization}
            startAngle={-110}
            endAngle={110}
            min={0}
            max={100}
            thickness={22}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 24,
                transform: 'translate(0px, 0px)',
                fill: '#4caf50',
              },
            }}
            // text={({ value, max }) => `${value}%`}
            text={
              ({ value, valueMax }) => `${value} / ${valueMax}`
           }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CpuUtilizationWidget;
