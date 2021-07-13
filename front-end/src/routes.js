import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import LogoutView from 'src/views/auth/LogoutView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import MonitoringView from 'src/views/monitoring/MonitoringView';
import MonitoringMaterial from 'src/views/monitoring/material/MonitoringMaterial';
import ClassifierView from 'src/views/classifier';
import BaseCollectionsListView from 'src/views/gesn/BaseCollectionsListView';
import CollectionsListView from 'src/views/gesn/CollectionsListView';
import GesnTableView from 'src/views/gesn';
import Structure from 'src/views/structure';
import CustomMap from 'src/views/geo/Map';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      // Geo
      { path: 'geo/quarry', element: <CustomMap /> },
      // Structure
      { path: 'structure', element: <Structure /> },
      // GESN
      { path: 'gesn', element: <BaseCollectionsListView /> },
      { path: 'gesn/:pk', element: <CollectionsListView /> },
      { path: 'gesn/:collectionId/table/:pk', element: <GesnTableView /> },
      // CLASSSIFIER
      { path: 'classifier', element: <ClassifierView /> },
      // MONITORING
      { path: 'monitoring', element: <MonitoringView /> },
      { path: 'monitoring/material/:pk', element: <MonitoringMaterial /> },
      { path: 'monitoring/material/create', element: <MonitoringMaterial /> },
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'logout', element: <LogoutView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/structure" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
