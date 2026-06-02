import { useEffect, useState } from "react";
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

const monthNames = [
    "",
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
];

function Reports() {
    const [year, setYear] = useState(2026);
    const [month, setMonth] = useState(1);

    const [selectedYear, setSelectedYear] = useState(2026);
    const [selectedMonth, setSelectedMonth] = useState(1);

    const [summary, setSummary] = useState([]);
    const [monthlyDetail, setMonthlyDetail] = useState(null);

    const formatDateIndonesia = (dateString) => {
        if (!dateString) return "-";

        const date = new Date(dateString);

        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const formatNumber = (value) => {
        return Number(value || 0).toLocaleString("id-ID");
    };

    const fetchYearlySummary = async (selectedReportYear = selectedYear) => {
        const response = await api.get(
            `/reports/yearly-summary?year=${selectedReportYear}`
        );

        const formattedData = response.data.data.map((item) => ({
            ...item,
            month_name: monthNames[item.month],
            income: Number(item.income),
            expense: Number(item.expense),
            balance: Number(item.balance),
        }));

        setSummary(formattedData);
    };

    const fetchMonthlyDetail = async (
        selectedReportMonth = selectedMonth,
        selectedReportYear = selectedYear
    ) => {
        const response = await api.get(
            `/reports/monthly-detail?month=${selectedReportMonth}&year=${selectedReportYear}`
        );

        setMonthlyDetail(response.data);
    };

    useEffect(() => {
        fetchYearlySummary(2026);
        fetchMonthlyDetail(1, 2026);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        setSelectedYear(year);
        setSelectedMonth(month);

        fetchYearlySummary(year);
        fetchMonthlyDetail(month, year);
    };

    return (
        <div>
            <div className="page-card">
                <div className="section-header">
                    <div>
                        <div className="report-section-title">
                            <h5>Filter Laporan</h5>
                        </div>
                        <p>
                            Pilih tahun dan bulan untuk menampilkan data laporan.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="report-filter">
                    <div className="report-filter-item">
                        <label className="form-label">Tahun</label>
                        <input
                            type="number"
                            className="form-control"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="Contoh: 2026"
                        />
                    </div>

                    <div className="report-filter-item">
                        <label className=" form-label">Bulan</label>
                        <select
                            className="form-select"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            {monthNames.slice(1).map((monthName, index) => (
                                <option key={monthName} value={index + 1}>
                                    {monthName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="report-filter-action">
                        <button className="btn btn-action-primary btn-add report-filter-button">
                            Tampilkan Laporan
                        </button>
                    </div>
                </form>
            </div>

            <div className="page-card">
                <div className="section-header">
                    <div>
                        <div className="report-section-title">
                            <h5>Grafik Keuangan Tahunan</h5>
                        </div>
                        <p>
                            Pemasukan, pengeluaran, dan saldo sepanjang tahun{" "}
                            {selectedYear}.
                        </p>
                    </div>
                </div>

                <div className="chart-wrapper">
                    {summary.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={summary}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2c2e33" />
                                <XAxis dataKey="month_name" stroke="#6c7293" />
                                <YAxis stroke="#6c7293" />
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
                    ) : (
                        <p className="text-muted">Data grafik belum tersedia.</p>
                    )}
                </div>
            </div>

            <div className="page-card">
                <div className="section-header">
                    <div>
                        <div className="report-section-title">
                            <h5>Rekap Keuangan Bulanan</h5>
                        </div>
                        <p>Tabel rekap bulanan tahun {" "}{selectedYear}</p>
                    </div>
                </div>
                <table className="table table-bordered align-middle">
                    <thead>
                        <tr>
                            <th className="text-center">Bulan</th>
                            <th className="text-center">Pemasukan</th>
                            <th className="text-center">Pengeluaran</th>
                            <th className="text-center">Saldo</th>
                        </tr>
                    </thead>

                    <tbody>
                        {summary.map((item) => (
                            <tr key={item.month}>
                                <td>
                                    <div className="table-primary-text">
                                        {item.month_name}
                                    </div>
                                </td>

                                <td className="text-center">
                                    <span className="money-cell paid">
                                        <span className="currency">Rp.</span>
                                        <span className="amount">
                                            {formatNumber(item.income)}
                                        </span>
                                    </span>
                                </td>

                                <td className="text-center">
                                    <span className="money-cell unpaid">
                                        <span className="currency">Rp.</span>
                                        <span className="amount">
                                            {formatNumber(item.expense)}
                                        </span>
                                    </span>
                                </td>

                                <td className="text-center">
                                    <span
                                        className={`money-cell ${
                                            item.balance >= 0 ? "paid" : "unpaid"
                                        }`}
                                    >
                                        <span className="currency">Rp.</span>
                                        <span className="amount">
                                            {formatNumber(item.balance)}
                                        </span>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {monthlyDetail && (
                <div className="page-card">
                    <div className="section-header">
                        <div>
                            <div className="report-section-title">
                                <h5>Rincian Transaksi Bulanan</h5>
                            </div>
                            <p>
                                Data pemasukan dan pengeluaran bulan{" "}
                                {monthNames[selectedMonth]} {selectedYear}.
                            </p>
                        </div>
                    </div>

                    <div className="detail-summary-grid">
                        <div className="detail-summary-card">
                            <span>Pemasukan</span>
                            <h3 className="text-success">
                                Rp. {formatNumber(monthlyDetail.summary.income)}
                            </h3>
                        </div>

                        <div className="detail-summary-card">
                            <span>Pengeluaran</span>
                            <h3 className="text-danger">
                                Rp. {formatNumber(monthlyDetail.summary.expense)}
                            </h3>
                        </div>

                        <div className="detail-summary-card">
                            <span>Saldo</span>
                            <h3
                                className={
                                    Number(monthlyDetail.summary.balance) >= 0
                                        ? "text-success"
                                        : "text-danger"
                                }
                            >
                                Rp. {formatNumber(monthlyDetail.summary.balance)}
                            </h3>
                        </div>
                    </div>
                    <div className="report-section-title">
                        <h5>Pemasukan</h5>
                    </div><p></p>

                    <table className="table table-bordered align-middle mb-4">
                        <thead>
                            <tr>
                                <th className="text-center">Penghuni</th>
                                <th className="text-center">Rumah</th>
                                <th className="text-center">Iuran</th>
                                <th className="text-center">Nominal</th>
                                <th className="text-center">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {monthlyDetail.payments.length > 0 ? (
                                monthlyDetail.payments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td>
                                            <div className="table-primary-text">
                                                {payment.resident?.full_name ?? "-"}
                                            </div>
                                        </td>

                                        <td className="text-center">
                                            <div className="table-primary-text">
                                                {payment.house?.house_number ?? "-"}
                                            </div>
                                        </td>

                                        <td className="text-center">
                                            <span
                                                className={`fee-badge ${
                                                    payment.fee?.fee_type === "Satpam"
                                                        ? "security"
                                                        : "cleaning"
                                                }`}
                                            >
                                                {payment.fee?.fee_type ?? "-"}
                                            </span>
                                        </td>

                                        <td className="text-center">
                                            <span
                                                className={`money-cell ${
                                                    payment.payment_status === "lunas"
                                                        ? "paid"
                                                        : "unpaid"
                                                }`}
                                            >
                                                <span className="currency">Rp.</span>
                                                <span className="amount">
                                                    {formatNumber(payment.paid_amount)}
                                                </span>
                                            </span>
                                        </td>

                                        <td className="text-center">
                                            <span
                                                className={`status-badge ${
                                                    payment.payment_status === "lunas"
                                                        ? "success"
                                                        : "danger"
                                                }`}
                                            >
                                                {payment.payment_status === "lunas"
                                                    ? "Lunas"
                                                    : "Belum Lunas"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="table-primary-text text-center">
                                        Tidak ada data pemasukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="report-section-title">
                        <h5>Pengeluaran</h5>
                    </div><p></p>

                    <table className="table table-bordered align-middle">
                        <thead>
                            <tr>
                                <th className="text-center">Judul</th>
                                <th className="text-center">Jenis</th>
                                <th className="text-center">Nominal</th>
                                <th className="text-center">Tanggal</th>
                                <th className="text-center">Deskripsi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {monthlyDetail.expenses.length > 0 ? (
                                monthlyDetail.expenses.map((expense) => (
                                    <tr key={expense.id}>
                                        <td>
                                            <div className="table-primary-text">
                                                {expense.expense_title}
                                            </div>
                                        </td>

                                        <td className="text-center">
                                            <span
                                                className={`expense-badge ${
                                                    expense.expense_type === "rutin"
                                                        ? "routine"
                                                        : "non-routine"
                                                }`}
                                            >
                                                {expense.expense_type === "rutin"
                                                    ? "Rutin"
                                                    : "Tidak Rutin"}
                                            </span>
                                        </td>

                                        <td className="text-center">
                                            <span className="money-cell unpaid">
                                                <span className="currency">Rp.</span>
                                                <span className="amount">
                                                    {formatNumber(expense.expense_amount)}
                                                </span>
                                            </span>
                                        </td>

                                        <td className="text-center">
                                            <span className="table-primary-text">
                                                {formatDateIndonesia(expense.expense_date)}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="table-description table-primary-text">
                                                {expense.expense_description ?? "-"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="table-primary-text text-center">
                                        Tidak ada data pengeluaran.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Reports;