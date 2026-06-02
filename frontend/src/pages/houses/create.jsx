import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

function HouseCreate() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        house_number: "",
        house_status: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/houses", form);

            toast.success("Data rumah berhasil ditambahkan");
            navigate("/houses");
        } catch (error) {
            const message =
                error.response?.data?.message ?? "Gagal menambahkan data rumah";

            toast.error(message);
        }
    };

    return (
        <div className="page-card form-card">
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div>
                        <label className="form-label">Nomor Rumah</label>
                        <input
                            name="house_number"
                            className="form-control"
                            value={form.house_number}
                            onChange={handleChange}
                            placeholder="Contoh: A-21"
                            required
                        />
                    </div>

                    <div>
                        <label className="form-label">Status Rumah</label>
                        <select
                            name="house_status"
                            className="form-select"
                            value={form.house_status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Pilih status rumah</option>
                            <option value="dihuni">Dihuni</option>
                            <option value="tidak_dihuni">Tidak Dihuni</option>
                        </select>
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn btn-action-primary">
                        Simpan
                    </button>

                    <Link to="/houses" className="btn btn-secondary">
                        Kembali
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default HouseCreate;