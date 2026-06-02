import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

function ResidentCreate() {
    const navigate = useNavigate();

    const [photoPreview, setPhotoPreview] = useState(null);

    const [form, setForm] = useState({
        full_name: "",
        resident_status: "",
        marital_status: "",
        phone_number: "",
        ktp_photo: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            const file = files[0];

            setForm({
                ...form,
                [name]: file,
            });

            if (file) {
                setPhotoPreview(URL.createObjectURL(file));
            }

            return;
        }

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("full_name", form.full_name);
            formData.append("resident_status", form.resident_status);
            formData.append("marital_status", form.marital_status);
            formData.append("phone_number", form.phone_number);

            if (form.ktp_photo) {
                formData.append("ktp_photo", form.ktp_photo);
            }

            await api.post("/residents", formData);

            toast.success("Data penghuni berhasil ditambahkan");
            navigate("/residents");
        } catch (error) {
            const message =
                error.response?.data?.message ?? "Gagal menambahkan data penghuni";

            toast.error(message);
        }
    };

    return (
        <div className="page-card form-card">
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div>
                        <label className="form-label">Nama Lengkap</label>
                        <input
                            name="full_name"
                            className="form-control"
                            placeholder="Masukkan nama lengkap"
                            value={form.full_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="form-label">Nomor Telepon</label>
                        <input
                            name="phone_number"
                            className="form-control"
                            placeholder="Masukkan nomor telepon"
                            value={form.phone_number}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="form-label">Status Penghuni</label>
                        <select
                            name="resident_status"
                            className="form-select"
                            value={form.resident_status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Pilih status penghuni</option>
                            <option value="tetap">Tetap</option>
                            <option value="kontrak">Kontrak</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Status Menikah</label>
                        <select
                            name="marital_status"
                            className="form-select"
                            value={form.marital_status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Pilih status menikah</option>
                            <option value="menikah">Menikah</option>
                            <option value="belum_menikah">Belum Menikah</option>
                        </select>
                    </div>

                    <div className="full">
                        <label className="form-label">Foto KTP</label>

                        {photoPreview && (
                            <div className="ktp-current-preview">
                                <img src={photoPreview} alt="Preview Foto KTP" />
                            </div>
                        )}

                        <br />

                        <input
                            type="file"
                            name="ktp_photo"
                            className="form-control"
                            accept="image/*"
                            onChange={handleChange}
                            required
                        />

                        <div className="form-help">
                            Upload foto KTP dalam format JPG, JPEG, atau PNG.
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn btn-action-primary">
                        Simpan
                    </button>

                    <Link to="/residents" className="btn btn-secondary">
                        Kembali
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default ResidentCreate;