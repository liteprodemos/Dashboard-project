
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const chartSetting = {
  yAxis: [
    {
      label: 'Cost ($)',
      labelPadding: 30, // Add padding to make the label fully visible
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-10px, 0)', // Adjust transform to ensure full visibility
    },
  },
};

const valueFormatter = (value) => `$${value}`;

const CostAnalysisWidget = () => {
    const costDataset = [
        { month: 'January', instance1: 500, instance2: 600, instance3: 450 },
        { month: 'February', instance1: 520, instance2: 610, instance3: 460 },
        { month: 'March', instance1: 530, instance2: 620, instance3: 470 },
        { month: 'April', instance1: 540, instance2: 630, instance3: 480 },
        { month: 'May', instance1: 550, instance2: 640, instance3: 490 },
        { month: 'June', instance1: 560, instance2: 650, instance3: 500 },
      ];
  return (
    <Card sx={{ width: '100%', maxWidth: 600, margin: 1, backgroundColor: '#ffffff', color: 'black' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Monthly Cost Analysis
        </Typography>
        <div style={{ height: '300px' }}>
          <BarChart
            dataset={costDataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              { dataKey: 'instance1', label: 'Instance 1', valueFormatter },
              { dataKey: 'instance2', label: 'Instance 2', valueFormatter },
              { dataKey: 'instance3', label: 'Instance 3', valueFormatter },
            ]}
            {...chartSetting}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CostAnalysisWidget;
