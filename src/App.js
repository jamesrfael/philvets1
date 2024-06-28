import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStaffs from "./pages/admin/AdminStaffs";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminReports from "./pages/admin/AdminReports";
import AdminSuppliers from "./pages/admin/AdminSuppliers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminDelivery from "./pages/admin/AdminDelivery";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminSales from "./pages/admin/AdminSales";
import AdminReturns from "./pages/admin/AdminReturns";
import AdminLogs from "./pages/admin/AdminLogs";

import StaffDashboard from "./pages/client/StaffDashboard";
import StaffProfile from "./pages/client/StaffProfile";


function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="content">
          <Switch>
            {/* Default Landing Page */}
            <Route exact path="/" component={LoginPage} />

            {/* Admin Routes */}
            <Route path="/login" component={LoginPage} />
            <Route path="/admin/dashboard" component={AdminDashboard} />
            <Route path="/admin/staffs" component={AdminStaffs} />
            <Route path="/admin/customers" component={AdminCustomers} />
            <Route path="/admin/inventory" component={AdminInventory} />
            <Route path="/admin/reports" component={AdminReports} />
            <Route path="/admin/suppliers" component={AdminSuppliers} />
            <Route path="/admin/orders" component={AdminOrders} />
            <Route path="/admin/delivery" component={AdminDelivery} />
            <Route path="/admin/products" component={AdminProducts} />
            <Route path="/admin/sales" component={AdminSales} />
            <Route path="/admin/returns" component={AdminReturns} />
            <Route path="/admin/logs" component={AdminLogs} />

            {/* Staff Routes */}
            <Route path="/staff/dashboard" component={StaffDashboard} />
            <Route path="/staff/profile" component={StaffProfile} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
