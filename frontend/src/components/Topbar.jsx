import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

function Topbar({ onToggleSidebar }) {
    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname;

        if (path.startsWith("/dashboard")) return "Dashboard";

        if (path === "/residents") return "Penghuni";
        if (path === "/residents/create") return "Penghuni | Tambah Penghuni";
        if (path.startsWith("/residents/edit")) return "Penghuni | Edit Penghuni";

        if (path === "/houses") return "Rumah";
        if (path === "/houses/create") return "Rumah | Tambah Rumah";
        if (path.startsWith("/houses/edit")) return "Rumah | Edit Rumah";
        if (path.includes("/houses/") && path.includes("/detail")) return "Rumah | Detail Rumah";

        if (path === "/payments") return "Pembayaran";
        if (path === "/payments/create") return "Pembayaran | Tambah Pembayaran";
        if (path.startsWith("/payments/edit")) return "Pembayaran | Edit Pembayaran";

        if (path === "/expenses") return "Pengeluaran";
        if (path === "/expenses/create") return "Pengeluaran | Tambah Pengeluaran";
        if (path.startsWith("/expenses/edit")) return "Pengeluaran | Edit Pengeluaran";

        if (path === "/reports") return "Laporan";

        return "Admin RT";
    };

    return (
        <header className="topbar">
            <div className="topbar-left">
                <button className="menu-toggle" onClick={onToggleSidebar}>
                    <Menu size={20} />
                </button>

                <h5>{getPageTitle()}</h5>
            </div>

            <div className="topbar-profile">
                <div className="profile-avatar">RT</div>
                <span>Admin RT</span>
            </div>
        </header>
    );
}

export default Topbar;