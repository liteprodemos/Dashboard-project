import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";

const staticData = {
  alerts: [
    "Spending has exceeded the allocated budget for Cloud Costs",
    "Unusual spending patterns detected in Maintenance costs",
    "Potential security breach detected in server ABC",
    "Available disk space on server DEF is below 10%",
  ],
  monthlyCost: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Cost",
        data: [5200, 5800, 6000, 5400, 5800, 6200],
        fill: false,
        borderColor: "#4bc0c0",
      },
    ],
  },
  predictedCost: {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Actual",
        data: [6450, 6500, 6600, 6700, 6750, 6800],
        fill: false,
        borderColor: "#36a2eb",
      },
      {
        label: "Predicted",
        data: [6450, 6550, 6650, 6750, 6850, 6950],
        fill: false,
        borderColor: "#ff6384",
        borderDash: [5, 5],
      },
    ],
  },
  budgetVsActual: {
    labels: [
      "On Premise",
      "Cloud",
      "Maintenance",
      "Power Consumptions",
      "Other",
    ],
    datasets: [
      {
        label: "Budget",
        data: [3000, 3200, 2000, 2200, 500],
        backgroundColor: "green",
      },
      {
        label: "Actual",
        data: [2800, 3500, 2200, 2100, 800],
        backgroundColor: "red",
      },
    ],
  },
  doughnutData: {
    labels: [
      "On premise cost",
      "Cloud cost",
      "Maintenance",
      "Power Consumption",
      "Other Expenses",
    ],
    datasets: [
      {
        data: [3000, 3000, 2000, 1000, 500],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
        ],
      },
    ],
  },
  optimizationSuggestions: [
    "Replace old hardware with energy-efficient servers to lower power consumption and cooling requirements.",
    "Implement predictive maintenance to foresee and address potential failures before they occur, reducing unplanned downtime.",
  ],
};

const styles = {
  card: {
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  header: {
    backgroundColor: "#f8f9fa",
    padding: "10px 15px",
    borderBottom: "2px solid #e0e0e0",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },
  body: {
    padding: "15px",
    backgroundColor: "#ffffff",
  },
};

const CostAnalysisWidget = () => {
  return (
    <Container>
      <Box sx={{ marginTop: 4 , marginBottom:4 }}>
        <Typography variant="h4" component="h1" align="center">
          Server Farm Budget Overview
        </Typography>
      </Box>
      <Row>
        <Col md={6} className="mb-3">
          <Card style={styles.card}>
            <Card.Header style={styles.header}>
              <Typography variant="h6" component="h2">
                Alerts & Notifications
              </Typography>
            </Card.Header>
            <Card.Body style={styles.body}>
              <ul>
                {staticData.alerts.map((alert, index) => (
                  <li key={index}>{alert}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Line data={staticData.predictedCost} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Doughnut data={staticData.doughnutData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <Row>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Doughnut data={staticData.doughnutData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Line data={staticData.predictedCost} />
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
      {/* <Row>
        <Col md={12} className="mb-3">
          <Card>
            <Card.Body>
              <Line data={staticData.monthlyCost} />
            </Card.Body>
          </Card>
        </Col>
      </Row> */}

      <Row>
        <Col md={12} className="mb-3">
          <Card>
            <Card.Body>
              <Bar data={staticData.budgetVsActual} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="mb-3">
          <Card style={styles.card}>
            <Card.Header style={styles.header}>
              <Typography variant="h6" component="h2">
                Optimization Suggestions
              </Typography>
            </Card.Header>
            <Card.Body style={styles.body}>
              <ul>
                {staticData.optimizationSuggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CostAnalysisWidget;
