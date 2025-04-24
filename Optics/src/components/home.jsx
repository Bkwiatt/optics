import React from "react";
import { Box, Grid, Paper, Divider, Typography, useTheme } from "@mui/material";
import "../../Styles/App.css";


const getPaperStyles = (theme) => ({
  padding: 3,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 2,
  height: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[2],
});

const StatisticCard = ({ title, value, theme }) => (
  <Paper sx={getPaperStyles(theme)}>
    <Typography variant="h6" sx={{ color: theme.palette.text.primary, marginBottom: "16px" }}>
      {title}
    </Typography>
    <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
      {value}
    </Typography>
  </Paper>
);

const Dashboard = ({ user }) => {
  const theme = useTheme();

  return (
    <Box className="dashboard-container" data-theme={theme.palette.mode}>
      {/* Dashboard Header */}
      <Box sx={{ display: "flex", paddingTop: '60px', flexDirection: "column", ml: -0.5, mb: -1 }}>
        <Typography variant="h4" sx={{ color: theme.palette.text.primary, marginLeft: "40px" }}>
          Dashboard
        </Typography>
      </Box>

      {/* Dashboard Subheader */}
      <Typography variant="h6" sx={{ marginLeft: "40px", color: theme.palette.text.primary, marginBottom: "2rem" }}>
        Overview
      </Typography>
      <Divider sx={{ mb: 6, ml: 2, mr: 2 }} />

      {/* Grid Layout for Sections */}
      <Grid container spacing={3} sx={{ padding: "0 2rem" }}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={getPaperStyles(theme)}>
            <Typography variant="h5" sx={{ color: theme.palette.text.primary, marginBottom: "8px" }}>
              Welcome, {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.success.main, fontWeight: "600", margin: 0 }}>
              Here is your dashboard overview.
            </Typography>
          </Paper>
        </Grid>

        {/* Statistics Section */}
        <Grid item xs={12} md={6}>
          <StatisticCard title="Active Projects" value="5" theme={theme} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatisticCard title="Pending Work Orders" value="12" theme={theme} />
        </Grid>

        {/* Additional Boxes for Future Components */}
        <Grid item xs={12} md={6}>
          <StatisticCard title="Graph Placeholder" value="📊" theme={theme} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatisticCard title="Calendar Placeholder" value="📅" theme={theme} />
        </Grid>

        {/* Recent Activities Section */}
        <Grid item xs={12}>
          <Paper sx={getPaperStyles(theme)}>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, marginBottom: "16px" }}>
              Recent Activities
            </Typography>
            <ul style={{ color: theme.palette.text.primary, paddingLeft: "20px", margin: 0 }}>
              <li>Project X: New work order created.</li>
              <li>Project Y: Completed milestone 3.</li>
              <li>Project Z: Proposal sent to client.</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;