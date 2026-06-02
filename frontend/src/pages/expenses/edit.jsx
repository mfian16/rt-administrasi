import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

function ExpenseEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        expense_title: "",
        expense_type: "",
        expense_amount: "",
        expense_date: "",
        expense_description: "",
    });

    const fetchExpense = async () => {
        try {
            const response = await api.get(`/expenses/${id}`);
            const expense = response.data.data;

            setForm({
                expense_title: expense.expense_title,
                expense_type: expense.expense_type,
                expense_amount: expense.expense_amount,
                expense_date: expense.expense_date,
                expense_description: expense.expense_description ?? "",
            });
        } catch (error) {
            toast.error("Gagal memuat data pengeluaran");
        }
    };

    useEffect(() => {
        fetchExpense();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleAmountChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, "");

        setForm({
            ...form,
            expense_amount: rawValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/expenses/${id}`, form);

            toast.success("Data pengeluaran berhasil diperbarui");
            navigate("/expenses");
        } catch (error) {
            toast.error("Gagal memperbarui data pengeluaran");
        }
    };

    return (
        <div className="page-card form-card">
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div>
                        <label className="form-label">Judul Pengeluaran</label>
                        <input
                            name="expense_title"
                            className="form-control"
                            value={form.expense_title}
                            onChange={handleChange}
                            placeholder="Contoh: Perbaikan selokan"
                            required
                        />
                    </div>

                    <div>
                        <label className="form-label">Jenis Pengeluaran</label>
                        <select
                            name="expense_type"
                            className="form-select"
                            value={form.expense_type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Pilih jenis pengeluaran</option>
                            <option value="rutin">Rutin</option>
                            <option value="tidak_rutin">Tidak Rutin</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Nominal</label>
                        <div className="input-prefix">
                            <span>Rp.</span>
                            <input
                                type="text"
                                name="expense_amount"
                                className="form-control prefix-input"
                                value={
                                    form.expense_amount
                                        ? Number(form.expense_amount).toLocaleString("id-ID")
                                        : ""
                                }
                                onChange={handleAmountChange}
                                placeholder="100.000"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label">Tanggal Pengeluaran</label>
                        <input
                            type="date"
                            name="expense_date"
                            className="form-control"
                            value={form.expense_date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="full">
                        <label className="form-label">Deskripsi Pengeluaran</label>
                        <textarea
                            name="expense_description"
                            className="form-control"
                            value={form.expense_description}
                            onChange={handleChange}
                            placeholder="Contoh: Biaya perbaikan selokan depan pos RT"
                            rows="4"
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn btn-action-primary">
                        Update
                    </button>

                    <Link to="/expenses" className="btn btn-secondary">
                        Kembali
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default ExpenseEdit;