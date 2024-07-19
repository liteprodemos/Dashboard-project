import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Line, Doughnut } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, TimeScale, Zoom } from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Menu, MenuItem } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, TimeScale, zoomPlugin);

const DetailedCostAnalysisWidget = ({ lineData }) => {
  const [menuPosition, setMenuPosition] = useState(null);
  const [clickedElement, setClickedElement] = useState(null);

  const handleLineClick = (event, elements) => {
    if (elements.length > 0) {
      const { clientX, clientY } = event.native;
      setMenuPosition({ mouseX: clientX, mouseY: clientY });
      const { index } = elements[0];
      setClickedElement({ index, type: 'line' });
    }
  };

  const handleDoughnutClick = (event, elements) => {
    if (elements.length > 0) {
      const { clientX, clientY } = event.native;
      setMenuPosition({ mouseX: clientX, mouseY: clientY });
      const { index } = elements[0];
      setClickedElement({ index, type: 'doughnut' });
    }
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const handleMenuClick = (action) => {
    if (clickedElement) {
      const { index, type } = clickedElement;
      if (type === 'line') {
        if (action === 'moreInfo') {
          alert(`More info on Date: ${lineData.labels[index]} Value: ${lineData.datasets[0].data[index]}`);
        } else if (action === 'remove') {
          alert(`Remove from the chart: Date: ${lineData.labels[index]} Value: ${lineData.datasets[0].data[index]}`);
        }
      } else if (type === 'doughnut') {
        if (action === 'moreInfo') {
          alert(`More info on: ${doughnutData.labels[index]} Value: ${doughnutData.datasets[0].data[index]}`);
        } else if (action === 'remove') {
          alert(`Remove from the chart: ${doughnutData.labels[index]} Value: ${doughnutData.datasets[0].data[index]}`);
        }
      }
    }
    handleClose();
  };

  const handleLineHover = (event, elements) => {
    if (elements.length > 0) {
      const { index } = elements[0];
      console.log(`Hovering over: ${lineData.labels[index]}`);
    }
  };

  const lineOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    onClick: handleLineClick,
    onHover: handleLineHover,
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
        limits: {
          x: { min: '2024-07-01T00:00', max: '2024-07-08T00:00' },
          y: { min: 0, max: 150 },
        },
      },
    },
  };

  const doughnutData = {
    labels: ['ASR', 'MNAZURUESRGROUP'],
    datasets: [
      {
        data: [12.9, 2.44],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const doughnutOptions = {
    onClick: handleDoughnutClick,
  };

  const services = [
    { name: 'Shared App Service Hours - Azure App Service', cost: 21.41 },
    { name: 'VM replicated to Azure - Site Recovery', cost: 12.90 },
    { name: 'Protected Instances - Backup', cost: 2.58 },
    { name: 'Standard IO - Page Blob/Disk (GB) - Geo Redundant', cost: 2.10 },
    { name: 'IP Address Hours - Reserved IP', cost: 1.29 },
    { name: 'Compute Hours - US North Central', cost: 0.92 },
    { name: 'Standard IO - Page Blob/Disk (GB) - Locally Redundant', cost: 0.48 },
    { name: 'Premium Storage - Page Blob/P10 (Units) - US North Central', cost: 0.38 },
    { name: 'Standard IO - Page Blob Write Operation Units (IOPS)', cost: 0.48 },
    { name: 'Azure Endpoints - Traffic Manager', cost: 0.24 },
    { name: 'Standard IO - Block Blob (GB) - Geo Redundant', cost: 0.18 },
    { name: 'Standard IO - Table (GB) - Locally Redundant', cost: 0.15 },
  ];

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Row>
            <Col md={12}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Burn Rate</Card.Title>
                  <Line data={lineData} options={lineOptions} />
                  <p>Starting Credit: 150 USD</p>
                  <p>Credit Remaining: 60 USD</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Costs by Resource</Card.Title>
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                  <p>ASR: 12.90 USD</p>
                  <p>MNAZURUESRGROUP: 2.44 USD</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Costs by Service</Card.Title>
              <p>Total: 43.52 USD</p>
              <ul>
                {services.map((service, index) => (
                  <li key={index}>{service.name}: {service.cost.toFixed(2)} USD</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Menu
        anchorReference="anchorPosition"
        anchorPosition={menuPosition ? { top: menuPosition.mouseY, left: menuPosition.mouseX } : undefined}
        open={Boolean(menuPosition)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuClick('moreInfo')}>More Info</MenuItem>
        <MenuItem onClick={() => handleMenuClick('remove')}>Remove from Chart</MenuItem>
      </Menu>
    </Container>
  );
};

export default DetailedCostAnalysisWidget;
