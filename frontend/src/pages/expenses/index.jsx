import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axios";

function Expenses() {
    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState(null);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const fetchExpenses = async (page = 1) => {
        try {
            const response = await api.get(`/expenses?search=${search}&page=${page}`);

            setExpenses(response.data.data.data ?? response.data.data);
            setPagination(response.data.data);
        } catch (error) {
            toast.error("Gagal memuat data pengeluaran");
        }
    };

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchExpenses();
        }, 400);

        return () => clearTimeout(delaySearch);
    }, [search]);

    const handlePageChange = (url) => {
        if (!url) return;

        const page = new URL(url).searchParams.get("page");
        fetchExpenses(page);
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus data pengeluaran ini?")) return;

        try {
            await api.delete(`/expenses/${id}`);

            toast.success("Data pengeluaran berhasil dihapus");
            fetchExpenses();
        } catch (error) {
            toast.error("Gagal menghapus data pengeluaran");
        }
    };

    const formatDateIndonesia = (dateString) => {
        if (!dateString) return "-";

        const date = new Date(dateString);

        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="page-card">
            <div className="table-toolbar">
                <div className="table-search">
                    <Search size={18} />
                    <input
                        placeholder="Cari judul, jenis, tanggal, atau deskripsi..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <Link to="/expenses/create" className="btn btn-action-primary btn-add">
                    Tambah Pengeluaran
                </Link>
            </div>

            <table className="table table-bordered align-middle expenses-table">
                <thead>
                    <tr>
                        <th className="text-center">Judul</th>
                        <th className="text-center">Jenis</th>
                        <th className="text-center">Nominal</th>
                        <th className="text-center">Tanggal</th>
                        <th className="text-center">Deskripsi</th>
                        <th className="text-center">Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>
                                <div className="table-primary-text table-description">
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
                                        {Number(expense.expense_amount).toLocaleString("id-ID")}
                                    </span>
                                </span>
                            </td>

                            <td className="text-center">
                                <span className="table-primary-text">
                                    {formatDateIndonesia(expense.expense_date)}
                                </span>
                            </td>

                            <td>
                                <span className="table-primary-text expense-description-text">
                                    {expense.expense_description ?? "-"}
                                </span>
                            </td>

                            <td className="text-center">
                                <div className="action-buttons">
                                    <button
                                        type="button"
                                        className="btn btn-action-view btn-sm"
                                        onClick={() => setSelectedExpense(expense)}
                                    >
                                        Detail
                                    </button>

                                    <Link
                                        to={`/expenses/edit/${expense.id}`}
                                        className="btn btn-action-edit btn-sm"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-action-delete btn-sm"
                                        onClick={() => handleDelete(expense.id)}
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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

            {selectedExpense && (
                <div className="modal-overlay" onClick={() => setSelectedExpense(null)}>
                    <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="detail-modal-header">
                            <div className="detail-modal-title">
                                <h5>Detail Pengeluaran</h5>
                                <p>Informasi lengkap data pengeluaran RT.</p>
                            </div>

                            <button onClick={() => setSelectedExpense(null)}>
                                ×
                            </button>
                        </div>

                        <div className="detail-list">
                            <div className="detail-item top full">
                                <span>Judul Pengeluaran</span>
                                <strong>{selectedExpense.expense_title}</strong>
                            </div>

                            <div
                                className={`detail-item ${
                                    selectedExpense.expense_type === "rutin"
                                        ? "status-paid"
                                        : "fee"
                                }`}
                            >
                                <span>Jenis Pengeluaran</span>
                                <strong>
                                    {selectedExpense.expense_type === "rutin"
                                        ? "Rutin"
                                        : "Tidak Rutin"}
                                </strong>
                            </div>

                            <div className="detail-item amount-unpaid">
                                <span>Nominal</span>
                                <strong>
                                    Rp. {Number(selectedExpense.expense_amount).toLocaleString("id-ID")}
                                </strong>
                            </div>

                            <div className="detail-item date">
                                <span>Tanggal Pengeluaran</span>
                                <strong>
                                    {formatDateIndonesia(selectedExpense.expense_date)}
                                </strong>
                            </div>

                            <div className="detail-item top full">
                                <span>Deskripsi</span>
                                <strong>
                                    {selectedExpense.expense_description ?? "-"}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Expenses;