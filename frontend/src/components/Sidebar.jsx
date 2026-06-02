import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Home,
    CreditCard,
    Wallet,
    BarChart3,
    LogOut,
} from "lucide-react";

function Sidebar({ collapsed, onLogout }) {
    const menus = [
        { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { path: "/residents", label: "Penghuni", icon: Users },
        { path: "/houses", label: "Rumah", icon: Home },
        { path: "/payments", label: "Pembayaran", icon: CreditCard },
        { path: "/expenses", label: "Pengeluaran", icon: Wallet },
        { path: "/reports", label: "Laporan", icon: BarChart3 },
    ];

    return (
        <aside className={`sidebar ${ collapsed ? "collapsed" : "" }`}>
            <div className="sidebar-brand">
                <div className="brand-icon">RT</div>
                {!collapsed && (
                    <div>
                        <h4>Admin RT</h4>
                    </div>
                )}
            </div>

            <nav>
                {menus.map((menu) => {
                    const Icon = menu.icon;

                    return (
                        <NavLink
                            key={menu.path}
                            to={menu.path}
                            className={({ isActive }) =>
                                isActive ? "sidebar-link active" : "sidebar-link"
                            }
                        >
                            <Icon size={19} />
                            {!collapsed && (
                                <span>{menu.label}</span>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            <button className="sidebar-logout" onClick={onLogout}>
                <LogOut size={18} />
                {!collapsed && (
                    <span>Logout</span>
                )}
            </button>
        </aside>
    );
}

export default Sidebar;