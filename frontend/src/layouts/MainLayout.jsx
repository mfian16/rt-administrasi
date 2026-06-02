import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="main-layout">
            <Sidebar collapsed={collapsed} onLogout={handleLogout} />

            <main className={`main-content ${collapsed ? "sidebar-collapsed" : ""}`}>
                <Topbar onToggleSidebar={() => setCollapsed(!collapsed)} />

                <section className="content-wrapper">
                    <Outlet />
                </section>
            </main>
        </div>
    );
}

export default MainLayout;