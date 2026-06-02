import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Users,
    Home,
    TrendingUp,
    TrendingDown,
    Wallet,
    ReceiptText,
    Plus,
    FileText,
    CircleOff,
} from "lucide-react";
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import api from "../../api/axios";
import { formatRupiah } from "../../utils/format";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);

    const fetchDashboard = async () => {
        try {
            const response = await api.get("/dashboard");
            setDashboard(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (!dashboard) {
        return <p className="text-muted">Memuat data dashboard...</p>;
    }

    const occupancyPercentage = dashboard.total_houses
        ? Math.round((dashboard.occupied_houses / dashboard.total_houses) * 100)
        : 0;

    const formatNumber = (value) => {
        return Number(value || 0).toLocaleString("id-ID");
    };

    const DashboardCard = ({ title, value, description, icon: Icon, className }) => {
        return (
            <div className={`modern-summary-card ${className}`}>
                <div className="summary-icon">
                    <Icon size={22} />
                </div>

                <div>
                    <span>{title}</span>
                    <h3 className={String(value).includes("Rp") ? "summary-money" : ""}>
                        {value}
                    </h3>
                    <p>{description}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="dashboard-layout">
            <div
                className={`dashboard-balance-card ${
                    Number(dashboard.remaining_balance) < 0 ? "danger" : "success"
                }`}
            >
                <div>
                    <span>Saldo</span>
                    <h2>{formatRupiah(dashboard.remaining_balance)}</h2>
                    <p>
                        {Number(dashboard.remaining_balance) < 0
                            ? "Saldo mengalami defisit."
                            : "Saldo dalam kondisi sehat."}
                    </p>
                </div>

                <div className="balance-icon">
                    <Wallet size={34} />
                </div>
            </div>

            <div className="dashboard-row finance">
                <DashboardCard
                    title="Total Pemasukan"
                    value={formatRupiah(dashboard.total_income)}
                    description="Pembayaran iuran lunas"
                    icon={TrendingUp}
                    className="card-green"
                />

                <DashboardCard
                    title="Total Pengeluaran"
                    value={formatRupiah(dashboard.total_expense)}
                    description="Pengeluaran RT tercatat"
                    icon={TrendingDown}
                    className="card-red"
                />

                <DashboardCard
                    title="Total Pembayaran"
                    value={dashboard.total_payments}
                    description="Transaksi pembayaran"
                    icon={ReceiptText}
                    className="card-orange"
                />
            </div>

            <div className="dashboard-row overview">
                <div className="dashboard-panel">
                    <div className="dashboard-panel-header">
                        <h5>Status Hunian</h5>
                        <p>Ringkasan kondisi rumah saat ini.</p>
                    </div>

                    <div className="occupancy-stats">
                        <div>
                            <strong>{dashboard.occupied_houses}</strong>
                            <span>Rumah Dihuni</span>
                        </div>

                        <div>
                            <strong>{dashboard.vacant_houses}</strong>
                            <span>Rumah Kosong</span>
                        </div>
                    </div>

                    <div className="occupancy-progress">
                        <div
                            className="occupancy-progress-bar"
                            style={{ width: `${occupancyPercentage}%` }}
                        />
                    </div>

                    <p className="occupancy-percent">
                        {occupancyPercentage}% rumah saat ini dihuni.
                    </p>
                </div>

                <div className="dashboard-panel">
                    <div className="dashboard-panel-header">
                        <h5>Aksi Cepat</h5>
                        <p>Akses fitur yang sering digunakan.</p>
                    </div>

                    <div className="quick-actions-grid">
                        <Link to="/payments/create" className="quick-action-card">
                            <Plus size={18} />
                            <span>Pembayaran Baru</span>
                        </Link>

                        <Link to="/expenses/create" className="quick-action-card">
                            <Plus size={18} />
                            <span>Pengeluaran Baru</span>
                        </Link>

                        <Link to="/residents/create" className="quick-action-card">
                            <Users size={18} />
                            <span>Penghuni Baru</span>
                        </Link>

                        <Link to="/reports" className="quick-action-card">
                            <FileText size={18} />
                            <span>Lihat Laporan</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="dashboard-row analysis">
                <div className="dashboard-mini-grid">
                    <DashboardCard
                        title="Total Penghuni"
                        value={dashboard.total_residents}
                        description="Penghuni terdaftar"
                        icon={Users}
                        className="card-blue dashboard-mini-card"
                    />

                    <DashboardCard
                        title="Total Rumah"
                        value={dashboard.total_houses}
                        description="Unit rumah tersedia"
                        icon={Home}
                        className="card-indigo dashboard-mini-card"
                    />

                    <DashboardCard
                        title="Rumah Dihuni"
                        value={dashboard.occupied_houses}
                        description="Sedang ditempati"
                        icon={Home}
                        className="card-green dashboard-mini-card"
                    />

                    <DashboardCard
                        title="Rumah Kosong"
                        value={dashboard.vacant_houses}
                        description="Belum ditempati"
                        icon={CircleOff}
                        className="card-gray dashboard-mini-card"
                    />
                </div>

                <div className="dashboard-panel">
                    <div className="dashboard-panel-header">
                        <h5>Grafik</h5>
                        <p>Pemasukan, pengeluaran, dan saldo 6 bulan terakhir.</p>
                    </div>

                    <div className="dashboard-chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={dashboard.cash_trend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2c2e33" />
                                <XAxis
                                    dataKey="month"
                                    stroke="#6c7293"
                                    fontSize={12}
                                />
                                <YAxis
                                    stroke="#6c7293"
                                    fontSize={12}
                                    tickFormatter={(value) =>
                                        Number(value).toLocaleString("id-ID")
                                    }
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: "#191c24",
                                        border: "1px solid #2c2e33",
                                        borderRadius: "10px",
                                        color: "#ffffff",
                                    }}
                                    formatter={(value) => `Rp. ${formatNumber(value)}`}
                                />
                                <Legend />

                                <Bar
                                    dataKey="income"
                                    name="Pemasukan"
                                    fill="#00d25b"
                                    radius={[6, 6, 0, 0]}
                                />

                                <Bar
                                    dataKey="expense"
                                    name="Pengeluaran"
                                    fill="#fc424a"
                                    radius={[6, 6, 0, 0]}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="balance"
                                    name="Saldo"
                                    stroke="#ffab00"
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;