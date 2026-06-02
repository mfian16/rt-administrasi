import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

function ResidentEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentPhotoUrl, setCurrentPhotoUrl] = useState(null);
    const [newPhotoPreview, setNewPhotoPreview] = useState(null);

    const [form, setForm] = useState({
        full_name: "",
        resident_status: "tetap",
        marital_status: "menikah",
        phone_number: "",
        ktp_photo: null,
    });

    const fetchResident = async () => {
        try {
            const response = await api.get(`/residents/${id}`);
            const resident = response.data.data;

            setForm({
                full_name: resident.full_name,
                resident_status: resident.resident_status,
                marital_status: resident.marital_status,
                phone_number: resident.phone_number,
                ktp_photo: null,
            });

            setCurrentPhotoUrl(resident.ktp_photo_url);
        } catch (error) {
            toast.error("Gagal memuat data penghuni");
        }
    };

    useEffect(() => {
        fetchResident();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            const file = files[0];

            setForm({
                ...form,
                [name]: file,
            });

            if (file) {
                setNewPhotoPreview(URL.createObjectURL(file));
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
            formData.append("_method", "PUT");
            formData.append("full_name", form.full_name);
            formData.append("resident_status", form.resident_status);
            formData.append("marital_status", form.marital_status);
            formData.append("phone_number", form.phone_number);

            if (form.ktp_photo) {
                formData.append("ktp_photo", form.ktp_photo);
            }

            await api.post(`/residents/${id}`, formData);

            toast.success("Data penghuni berhasil diperbarui");
            navigate("/residents");
        } catch (error) {
            const message =
                error.response?.data?.message ?? "Gagal memperbarui data penghuni";

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
                        >
                            <option value="">Pilih status menikah</option>
                            <option value="menikah">Menikah</option>
                            <option value="belum_menikah">Belum Menikah</option>
                        </select>
                    </div>

                    <div className="full">
                        <label className="form-label">Foto KTP Saat Ini</label>

                        <div className="ktp-current-preview">
                            {currentPhotoUrl ? (
                                <img src={currentPhotoUrl} alt="Foto KTP Saat Ini" />
                            ) : (
                                <div className="ktp-placeholder">
                                    Belum ada foto KTP
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="full">
                        <label className="form-label">Ganti Foto KTP</label>

                        {newPhotoPreview && (
                            <div className="ktp-current-preview">
                                <img src={newPhotoPreview} alt="Foto KTP Baru" />
                            </div>
                        )}

                        <br />

                        <input
                            type="file"
                            name="ktp_photo"
                            className="form-control"
                            accept="image/*"
                            onChange={handleChange}
                        />

                        <div className="form-help">
                            Kosongkan jika tidak ingin mengganti foto KTP.
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn btn-action-primary">
                        Update
                    </button>

                    <Link to="/residents" className="btn btn-secondary">
                        Kembali
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default ResidentEdit;