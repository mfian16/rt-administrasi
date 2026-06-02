import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { formatRupiah } from "../../utils/format";

function HouseDetail() {
    const { id } = useParams();

    const [house, setHouse] = useState(null);
    const [activeResidentHistory, setActiveResidentHistory] = useState(null);
    const [residents, setResidents] = useState([]);

    const [form, setForm] = useState({
        resident_id: "",
        start_date: "",
        end_date: "",
        is_active: true,
    });

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

    const fetchHouse = async () => {
        try {
            const response = await api.get(`/houses/${id}`);

            setHouse(response.data.data);
            setActiveResidentHistory(response.data.active_resident_history);
        } catch (error) {
            toast.error("Gagal memuat detail rumah");
        }
    };

    const fetchResidents = async () => {
        try {
            const response = await api.get("/residents?all=true");
            setResidents(response.data.data.data ?? response.data.data);
        } catch (error) {
            toast.error("Gagal memuat data penghuni");
        }
    };

    useEffect(() => {
        fetchHouse();
        fetchResidents();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/house-resident-histories", {
                resident_id: form.resident_id,
                house_id: id,
                start_date: form.start_date,
                end_date: form.end_date || null,
                is_active: form.is_active,
            });

            toast.success("Penghuni rumah berhasil ditetapkan");

            setForm({
                resident_id: "",
                start_date: "",
                end_date: "",
                is_active: true,
            });

            fetchHouse();
        } catch (error) {
            const message =
                error.response?.data?.message ?? "Gagal menetapkan penghuni rumah";

            toast.error(message);
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

    if (!house) {
        return <p className="text-muted">Memuat detail rumah...</p>;
    }

    return (
        <div>
            <div className="detail-summary-grid">
                <div className="detail-summary-card">
                    <span>Nomor Rumah</span>
                    <h3>{house.house_number}</h3>
                </div>

                <div className="detail-summary-card">
                    <span>Status Rumah</span>
                    <h3>
                        <span
                            className={`status-badge ${
                                house.house_status === "dihuni"
                                    ? "success"
                                    : "neutral"
                            }`}
                        >
                            {house.house_status === "dihuni"
                                ? "Dihuni"
                                : "Tidak Dihuni"}
                        </span>
                    </h3>
                </div>

                <div className="detail-summary-card">
                    <span>Penghuni Aktif</span>
                    <h3 className="detail-active-resident">
                        {activeResidentHistory?.resident?.full_name ??
                            "Belum ada penghuni aktif"}
                    </h3>
                </div>
            </div>

            <div className="page-card">
                <div className="section-header">
                    <div>
                        <div className="report-section-title">
                            <h5>Tetapkan Penghuni</h5>
                        </div>
                        <p className="report-section-desc">
                            Tetapkan penghuni aktif untuk rumah ini dan simpan riwayat huniannya.
                        </p>
                    </div>

                    <Link to="/houses" className="btn btn-secondary btn-compact">
                        Kembali
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="house-resident-form-grid">
                        <div className="full">
                            <label className="form-label">Nama Penghuni</label>
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
                            <label className="form-label">Tanggal Mulai</label>
                            <input
                                type="date"
                                name="start_date"
                                className="form-control"
                                value={form.start_date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="form-label">Tanggal Selesai</label>
                            <input
                                type="date"
                                name="end_date"
                                className="form-control"
                                value={form.end_date}
                                onChange={handleChange}
                            />
                            <div className="form-help">
                                Kosongkan jika penghuni masih aktif.
                            </div>
                        </div>

                        <div className="full">
                            <div className="form-check-wrapper compact">
                                <input
                                    type="checkbox"
                                    name="is_active"
                                    className="form-check-input"
                                    checked={form.is_active}
                                    onChange={handleChange}
                                    id="isActive"
                                />
                                <label className="form-check-label" htmlFor="isActive">
                                    Penghuni Aktif
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="btn btn-action-primary">
                            Tetapkan Penghuni
                        </button>
                    </div>
                </form>
            </div>

            <div className="page-card">
                <div className="report-section-title">
                    <h5>Riwayat Penghuni</h5>
                </div>
                <p className="report-section-desc">
                    Riwayat penghuni yang pernah menempati rumah ini.
                </p>

                <table className="table table-bordered align-middle mt-3">
                    <thead>
                        <tr>
                            <th>Penghuni</th>
                            <th className="text-center">Tanggal Mulai</th>
                            <th className="text-center">Tanggal Selesai</th>
                            <th className="text-center">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {house.house_resident_histories?.length > 0 ? (
                            house.house_resident_histories.map((history) => (
                                <tr key={history.id}>
                                    <td>
                                        <div className="table-primary-text">
                                            {history.resident?.full_name ?? "-"}
                                        </div>
                                    </td>

                                    <td className="text-center">
                                        <span className="table-primary-text">
                                            {formatDateIndonesia(history.start_date)}
                                        </span>
                                    </td>

                                    <td className="text-center">
                                        <span className="table-primary-text">
                                            {formatDateIndonesia(history.end_date)}
                                        </span>
                                    </td>

                                    <td className="text-center">
                                        <span
                                            className={`status-badge ${
                                                history.is_active
                                                    ? "success"
                                                    : "neutral"
                                            }`}
                                        >
                                            {history.is_active
                                                ? "Aktif"
                                                : "Tidak Aktif"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Belum ada riwayat penghuni.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="page-card">
                <div className="report-section-title">
                    <h5>Riwayat Pembayaran</h5>
                </div>
                <p className="report-section-desc">
                    Daftar pembayaran iuran yang tercatat pada rumah ini.
                </p>

                <table className="table table-bordered align-middle mt-3">
                    <thead>
                        <tr>
                            <th>Penghuni</th>
                            <th className="text-center">Iuran</th>
                            <th className="text-center">Periode</th>
                            <th className="text-center">Nominal</th>
                            <th className="text-center">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {house.payments?.length > 0 ? (
                            house.payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>
                                        <div className="table-primary-text">
                                            {payment.resident?.full_name ?? "-"}
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
                                        <span className="table-primary-text">
                                            {monthNames[payment.payment_month]}{" "}
                                            {payment.payment_year}
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
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Belum ada riwayat pembayaran.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HouseDetail;