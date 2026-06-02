import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axios";

function Payments() {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState("");

    const [payments, setPayments] = useState([]);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState(null);

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

    const formatDateIndonesia = (dateString) => {
        if (!dateString) return "-";

        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const fetchPayments = async (page = 1) => {
        try {
            const response = await api.get(
                `/payments?search=${encodeURIComponent(search)}&month=${selectedMonth}&page=${page}`
            );

            setPayments(response.data.data.data ?? response.data.data);
            setPagination(response.data.data);
        } catch (error) {
            toast.error("Gagal memuat data pembayaran");
        }
    };

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchPayments();
        }, 400);

        return () => clearTimeout(delaySearch);
    }, [search, selectedMonth]);

    const handlePageChange = (url) => {
        if (!url) return;

        const page = new URL(url).searchParams.get("page");
        fetchPayments(page);
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus data pembayaran ini?")) return;

        try {
            await api.delete(`/payments/${id}`);

            toast.success("Data pembayaran berhasil dihapus");
            fetchPayments();
        } catch (error) {
            toast.error("Gagal menghapus data pembayaran");
        }
    };

    return (
        <div className="page-card">
            <div className="table-toolbar">
                <div className="table-search">
                    <Search size={18} />
                    <input
                        placeholder="Cari penghuni, rumah, iuran, atau tahun..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select
                    className="table-filter-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="">Semua Bulan</option>
                    {monthNames.slice(1).map((monthName, index) => (
                        <option key={monthName} value={index + 1}>
                            {monthName}
                        </option>
                    ))}
                </select>

                <Link to="/payments/create" className="btn btn-action-primary btn-add">
                    Tambah Pembayaran
                </Link>
            </div>

            <div className="table-responsive-custom">
                <table className="table table-bordered align-middle payment-table">
                    <thead>
                        <tr>
                            <th className="text-center">Penghuni</th>
                            <th className="text-center col-house">Rumah</th>
                            <th className="text-center">Iuran</th>
                            <th className="text-center">Periode</th>
                            <th className="text-center">Nominal</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((payment) => (
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
                                    <div className="table-primary-text">
                                        {monthNames[payment.payment_month]} {payment.payment_year}
                                    </div>
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
                                            {Number(payment.paid_amount).toLocaleString("id-ID")}
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

                                <td className="text-center">
                                    <div className="action-buttons">
                                        <button
                                            type="button"
                                            className="btn btn-action-view btn-sm"
                                            onClick={() => setSelectedPayment(payment)}
                                        >
                                            Detail
                                        </button>

                                        <Link
                                            to={`/payments/edit/${payment.id}`}
                                            className="btn btn-action-edit btn-sm"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            className="btn btn-action-delete btn-sm"
                                            onClick={() => handleDelete(payment.id)}
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination && pagination.links && (
                <div className="pagination-wrapper">
                    {pagination.links.map((link, index) => (
                        <button
                            key={index}
                            className={`pagination-btn ${link.active ? "active" : ""}`}
                            disabled={!link.url}
                            onClick={() => handlePageChange(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}

            {selectedPayment && (
                <div className="modal-overlay" onClick={() => setSelectedPayment(null)}>
                    <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="detail-modal-header">
                            <div className="detail-modal-title">
                                <h5>Detail Pembayaran</h5>
                                <p>Informasi lengkap transaksi pembayaran iuran.</p>
                            </div>

                            <button type="button" onClick={() => setSelectedPayment(null)}>
                                ×
                            </button>
                        </div>

                        <div className="detail-list">
                            <div className="detail-item top">
                                <span>Nama Penghuni</span>
                                <strong>{selectedPayment.resident?.full_name ?? "-"}</strong>
                            </div>

                            <div className="detail-item top">
                                <span>Nomor Rumah</span>
                                <strong>{selectedPayment.house?.house_number ?? "-"}</strong>
                            </div>

                            <div className="detail-item fee">
                                <span>Jenis Iuran</span>
                                <strong>{selectedPayment.fee?.fee_type ?? "-"}</strong>
                            </div>

                            <div className="detail-item period">
                                <span>Periode</span>
                                <strong>
                                    {monthNames[selectedPayment.payment_month]}{" "}
                                    {selectedPayment.payment_year}
                                </strong>
                            </div>

                            <div className="detail-item date">
                                <span>Tanggal Bayar</span>
                                <strong>{formatDateIndonesia(selectedPayment.payment_date)}</strong>
                            </div>

                            <div
                                className={`detail-item ${
                                    selectedPayment.payment_status === "lunas"
                                        ? "status-paid"
                                        : "status-unpaid"
                                }`}
                            >
                                <span>Status Pembayaran</span>
                                <strong>
                                    {selectedPayment.payment_status === "lunas"
                                        ? "Lunas"
                                        : "Belum Lunas"}
                                </strong>
                            </div>

                            <div
                                className={`detail-item full ${
                                    selectedPayment.payment_status === "lunas"
                                        ? "amount-paid"
                                        : "amount-unpaid"
                                }`}
                            >
                                <span>Nominal Pembayaran</span>
                                <strong>
                                    Rp. {Number(selectedPayment.paid_amount).toLocaleString("id-ID")}
                                </strong>
                            </div>

                            <div className="detail-item full top">
                                <span>Deskripsi</span>
                                <strong>{selectedPayment.payment_description ?? "-"}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Payments;