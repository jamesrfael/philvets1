import React from "react";

const StaffProfile = () => {
  // Sample data for key metrics
  const totalSales = 1500;
  const pendingOrders = 10;
  const lowStockItems = 5;
  const recentDeliveries = 20;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <h1>Welcome back, Admin!</h1>
        <div className="key-metrics">
          <div className="metric">
            <h2>Total Sales</h2>
            <p>{totalSales}</p>
          </div>
          <div className="metric">
            <h2>Pending Orders</h2>
            <p>{pendingOrders}</p>
          </div>
          <div className="metric">
            <h2>Low Stock Items</h2>
            <p>{lowStockItems}</p>
          </div>
          <div className="metric">
            <h2>Recent Deliveries</h2>
            <p>{recentDeliveries}</p>
          </div>
        </div>
        <div className="charts">{/* Add graphs and charts here */}</div>
        <div className="quick-links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="/admin/staff">Manage staff</a>
            </li>
            <li>
              <a href="/admin/products">Manage Products</a>
            </li>
            <li>
              <a href="/admin/orders">View Orders</a>
            </li>
            {/* Add more quick links as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;
