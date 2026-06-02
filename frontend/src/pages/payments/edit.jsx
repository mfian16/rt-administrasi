import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

function PaymentEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [residents, setResidents] = useState([]);
    const [houses, setHouses] = useState([]);
    const [fees, setFees] = useState([]);

    const [form, setForm] = useState({
        resident_id: "",
        house_id: "",
        fee_id: "",
        payment_month: "",
        payment_year: "",
        paid_amount: "",
        payment_date: "",
        payment_status: "",
        payment_description: "",
    });

    const months = [
        { value: 1, label: "Januari" },
        { value: 2, label: "Februari" },
        { value: 3, label: "Maret" },
        { value: 4, label: "April" },
        { value: 5, label: "Mei" },
        { value: 6, label: "Juni" },
        { value: 7, label: "Juli" },
        { value: 8, label: "Agustus" },
        { value: 9, label: "September" },
        { value: 10, label: "Oktober" },
        { value: 11, label: "November" },
        { value: 12, label: "Desember" },
    ];

    const fetchData = async () => {
        try {
            const residentsRes = await api.get("/residents?all=true");
            const housesRes = await api.get("/houses?all=true");
            const feesRes = await api.get("/fees");
            const paymentRes = await api.get(`/payments/${id}`);

            const payment = paymentRes.data.data;

            setResidents(residentsRes.data.data.data ?? residentsRes.data.data);
            setHouses(housesRes.data.data.data ?? housesRes.data.data);
            setFees(feesRes.data.data.data ?? feesRes.data.data);

            setForm({
                resident_id: payment.resident_id,
                house_id: payment.house_id,
                fee_id: payment.fee_id,
                payment_month: payment.payment_month,
                payment_year: payment.payment_year,
                paid_amount: payment.paid_amount,
                payment_date: payment.payment_date ?? "",
                payment_status: payment.payment_status,
                payment_description: payment.payment_description ?? "",
            });
        } catch (error) {
            toast.error("Gagal memuat data pembayaran");
        }
    };

    useEffect(() => {
        fetchData();
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
            paid_amount: rawValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/payments/${id}`, form);

            toast.success("Data pembayaran berhasil diperbarui");
            navigate("/payments");
        } catch (error) {
            toast.error("Gagal memperbarui data pembayaran");
        }
    };

    return (
        <div className="page-card form-card">
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div>
                        <label className="form-label">Penghuni</label>
                        <select
                            name="resident_id"
                            className="form-select"
                            value={form.resident_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Pilih penghuni</option>
                            {residents.map((resident) => (
                                <option key={resident.id} value={resident.id}>
                                    {resident.full_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Rumah</label>
                        <select
                            name="house_id"
                            className="form-select"
                            value={form.house_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Pilih rumah</option>
                            {houses.map((house) => (
                                <option key={house.id} value={house.id}>
                                    {house.house_number}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Jenis Iuran</label>
                        <select
                            name="fee_id"
                            className="form-select"
                            value={form.fee_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Pilih jenis iuran</option>
                            {fees.map((fee) => (
                                <option key={fee.id} value={fee.id}>
                                    {fee.fee_type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Status Pembayaran</label>
                        <select
                            name="payment_status"
                            className="form-select"
                            value={form.payment_status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Pilih status pembayaran</option>
                            <option value="lunas">Lunas</option>
                            <option value="belum_lunas">Belum Lunas</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Periode Bulan</label>
                        <select
                            name="payment_month"
                            className="form-select"
                            value={form.payment_month}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Pilih periode bulan</option>
                            {months.map((month) => (
                                <option key={month.value} value={month.value}>
                                    {month.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Periode Tahun</label>
                        <input
                            type="number"
                            name="payment_year"
                            className="form-control"
                            value={form.payment_year}
                            onChange={handleChange}
                            placeholder="Contoh: 2026"
                            required
                        />
                    </div>

                    <div>
                        <label className="form-label">Nominal</label>
                        <div className="input-prefix">
                            <span>Rp.</span>
                            <input
                                type="text"
                                name="paid_amount"
                                className="form-control prefix-input"
                                value={
                                    form.paid_amount
                                        ? Number(form.paid_amount).toLocaleString("id-ID")
                                        : ""
                                }
                                onChange={handleAmountChange}
                                placeholder="100.000"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label">Tanggal Bayar</label>
                        <input
                            type="date"
                            name="payment_date"
                            className="form-control"
                            value={form.payment_date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="full">
                        <label className="form-label">Deskripsi Pembayaran</label>
                        <textarea
                            name="payment_description"
                            className="form-control"
                            value={form.payment_description}
                            onChange={handleChange}
                            placeholder="Contoh: Pembayaran iuran satpam bulan Januari"
                            rows="4"
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn btn-action-primary">
                        Update
                    </button>

                    <Link to="/payments" className="btn btn-secondary">
                        Kembali
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default PaymentEdit;