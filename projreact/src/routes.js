import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import MainLayout from "src/layouts/MainLayout";
import AccountView from "src/views/account/AccountView";
import CustomerListView from "src/views/customer/CustomerListView";
import CustomerInListView from "src/views/customer/CustomerInListView";
import DashboardView from "src/views/reports/DashboardView";
import NotificationView from "src/views/reports/NotificationView";
import LoginView from "src/views/auth/LoginView";
import NotFoundView from "src/views/errors/NotFoundView";
import ProductListView from "src/views/product/ProductListView";
import RegisterView from "src/views/auth/RegisterView";
import SettingsView from "src/views/settings/SettingsView";

const routes = [
	{
		path: "admin",
		element: <DashboardLayout persona="admin" />,
		children: [
			{ path: "account", element: <AccountView /> },
			{ path: "customers", element: <CustomerListView /> },
			{ path: "customers/in_store", element: <CustomerInListView /> },
			{ path: "/", element: <DashboardView /> },
			{ path: "products", element: <ProductListView /> },
			{ path: "settings", element: <SettingsView /> },
			{ path: "notifications", element: <NotificationView /> },
			{ path: "*", element: <Navigate to="/404" /> },
		],
	},
	{
		path: "employee",
		element: <DashboardLayout persona="employee" />,
		children: [
		],
	},

	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "login", element: <LoginView /> },
			{ path: "register", element: <RegisterView /> },
			{ path: "404", element: <NotFoundView /> },
			{ path: "/", element: <Navigate to="/login" /> },
			{ path: "*", element: <Navigate to="/404" /> },
		],
	},
];

export default routes;
