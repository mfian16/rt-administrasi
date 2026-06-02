import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axios";

function Residents() {
    const [residents, setResidents] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [pagination, setPagination] = useState(null);

    const fetchResidents = async (page = 1) => {
        try {
            const response = await api.get(`/residents?search=${search}&page=${page}`);

            setResidents(response.data.data.data ?? response.data.data);
            setPagination(response.data.data);
        } catch (error) {
            toast.error("Gagal memuat data penghuni");
        }
    };

    const handlePageChange = (url) => {
        if (!url) return;

        const page = new URL(url).searchParams.get("page");
        fetchResidents(page);
    };

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchResidents();
        }, 400);

        return () => clearTimeout(delaySearch);
    }, [search]);

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus data penghuni ini?")) return;

        try {
            await api.delete(`/residents/${id}`);

            toast.success("Data penghuni berhasil dihapus");
            fetchResidents();
        } catch (error) {
            const message =
                error.response?.data?.message ?? "Gagal menghapus data penghuni";

            toast.error(message);
        }
    };

    return (
        <div>
            <div className="page-card">
                <div className="table-toolbar">
                    <div className="table-search">
                        <Search size={18} />
                        <input
                            placeholder="Cari nama, telepon, atau status..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <Link to="/residents/create" className="btn btn-action-primary btn-add">
                        Tambah Penghuni
                    </Link>
                </div>

                {selectedPhoto && (
                    <div className="modal-overlay" onClick={() => setSelectedPhoto(null)}>
                        <div className="image-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="image-modal-header">
                                <h5>Foto KTP</h5>

                                <button onClick={() => setSelectedPhoto(null)}>
                                    <X size={18} />
                                </button>
                            </div>

                            <img src={selectedPhoto} alt="Foto KTP" />
                        </div>
                    </div>
                )}

                <table className="table table-bordered align-middle residents-table">
                    <thead>
                        <tr>
                            <th className="text-center">Nama Lengkap</th>
                            <th className="text-center">No. Telepon</th>
                            <th className="text-center">Status Penghuni</th>
                            <th className="text-center">Status Menikah</th>
                            <th className="text-center">Foto KTP</th>
                            <th className="text-center">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {residents.map((resident) => (
                            <tr key={resident.id}>
                                <td>
                                    <div className="table-primary-text">
                                        {resident.full_name}
                                    </div>
                                </td>

                                <td>
                                    <span className="table-phone table-primary-text">
                                        {resident.phone_number}
                                    </span>
                                </td>

                                <td className="text-center">
                                    <span
                                        className={`status-badge ${
                                            resident.resident_status === "tetap"
                                                ? "success"
                                                : "warning"
                                        }`}
                                    >
                                        {resident.resident_status === "tetap"
                                            ? "Tetap"
                                            : "Kontrak"}
                                    </span>
                                </td>

                                <td className="text-center">
                                    <span
                                        className={`status-badge ${
                                            resident.marital_status === "menikah"
                                                ? "info"
                                                : "neutral"
                                        }`}
                                    >
                                        {resident.marital_status === "menikah"
                                            ? "Menikah"
                                            : "Belum Menikah"}
                                    </span>
                                </td>

                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-action-view btn-sm"
                                        onClick={() => setSelectedPhoto(resident.ktp_photo_url)}
                                    >
                                        Lihat
                                    </button>
                                </td>

                                <td className="text-center">
                                    <div className="action-buttons">
                                        <Link
                                            to={`/residents/edit/${resident.id}`}
                                            className="btn btn-action-edit btn-sm"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            className="btn btn-action-delete btn-sm"
                                            onClick={() => handleDelete(resident.id)}
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
            </div>
        </div>
    );
}

export default Residents;