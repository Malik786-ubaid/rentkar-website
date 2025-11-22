import React from "react";

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dashboard Overview</h1>

      <div style={styles.cardsWrapper}>
        
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Total Products</h2>
          <p style={styles.cardValue}>120</p>
        </div>

        <div style={{ ...styles.card, background: "#2563eb" }}>
          <h2 style={styles.cardTitle}>Total Orders</h2>
          <p style={styles.cardValue}>85</p>
        </div>

        <div style={{ ...styles.card, background: "#16a34a" }}>
          <h2 style={styles.cardTitle}>Active Users</h2>
          <p style={styles.cardValue}>42</p>
        </div>

        <div style={{ ...styles.card, background: "#dc2626" }}>
          <h2 style={styles.cardTitle}>Pending Approvals</h2>
          <p style={styles.cardValue}>7</p>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    background: "#f3f4f6",
    minHeight: "100vh",
  },
  heading: {
    marginBottom: "20px",
    color: "#111827",
    fontSize: "28px",
    fontWeight: "700",
  },
  cardsWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#1f2937",
    padding: "25px",
    borderRadius: "10px",
    color: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
  cardTitle: {
    fontSize: "18px",
    opacity: "0.9",
    marginBottom: "10px",
  },
  cardValue: {
    fontSize: "32px",
    fontWeight: "700",
  }
};
styles.card["&:hover"] = {
  transform: "scale(1.05)",
};

export default Dashboard;
