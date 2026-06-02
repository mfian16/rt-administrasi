import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/auth/login";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/dashboard";

import Residents from "./pages/residents";
import ResidentCreate from "./pages/residents/create";
import ResidentEdit from "./pages/residents/edit";

import Houses from "./pages/houses";
import HouseCreate from "./pages/houses/create";
import HouseEdit from "./pages/houses/edit";
import HouseDetail from "./pages/houses/detail";

import Payments from "./pages/payments";
import PaymentCreate from "./pages/payments/create";
import PaymentEdit from "./pages/payments/edit";

import Expenses from "./pages/expenses";
import ExpenseCreate from "./pages/expenses/create";
import ExpenseEdit from "./pages/expenses/edit";

import Reports from "./pages/reports";

function App() {
    return (
        <BrowserRouter>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 2500,
                    style: {
                        background: "#191c24",
                        color: "#ffffff",
                        border: "1px solid #2c2e33",
                        borderRadius: "10px",
                        fontWeight: "600",
                    },
                    success: {
                        iconTheme: {
                            primary: "#00d25b",
                            secondary: "#ffffff",
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: "#fc424a",
                            secondary: "#ffffff",
                        },
                    },
                }}
            />

            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />

                <Route
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/residents" element={<Residents />} />
                    <Route path="/residents/create" element={<ResidentCreate />} />
                    <Route path="/residents/edit/:id" element={<ResidentEdit />} />

                    <Route path="/houses" element={<Houses />} />
                    <Route path="/houses/create" element={<HouseCreate />} />
                    <Route path="/houses/edit/:id" element={<HouseEdit />} />
                    <Route path="/houses/:id/detail" element={<HouseDetail />} />

                    <Route path="/payments" element={<Payments />} />
                    <Route path="/payments/create" element={<PaymentCreate />} />
                    <Route path="/payments/edit/:id" element={<PaymentEdit />} />

                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/expenses/create" element={<ExpenseCreate />} />
                    <Route path="/expenses/edit/:id" element={<ExpenseEdit />} />

                    <Route path="/reports" element={<Reports />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;