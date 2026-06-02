import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axios";

function Houses() {
    const [houses, setHouses] = useState([]);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState(null);

    const fetchHouses = async (page = 1) => {
        try {
            const response = await api.get(`/houses?search=${search}&page=${page}`);

            setHouses(response.data.data.data ?? response.data.data);
            setPagination(response.data.data);
        } catch (error) {
            toast.error("Gagal memuat data rumah");
        }
    };

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchHouses();
        }, 400);

        return () => clearTimeout(delaySearch);
    }, [search]);

    const handlePageChange = (url) => {
        if (!url) return;

        const page = new URL(url).searchParams.get("page");
        fetchHouses(page);
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus data rumah ini?")) return;

        try {
            await api.delete(`/houses/${id}`);

            toast.success("Data rumah berhasil dihapus");
            fetchHouses();
        } catch (error) {
            const message =
                error.response?.data?.message ?? "Gagal menghapus data rumah";

            toast.error(message);
        }
    };

    return (
        <div className="page-card">
            <div className="table-toolbar">
                <div className="table-search">
                    <Search size={18} />
                    <input
                        placeholder="Cari nomor rumah atau status..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <Link to="/houses/create" className="btn btn-action-primary btn-add">
                    Tambah Rumah
                </Link>
            </div>

            <table className="table table-bordered align-middle">
                <thead>
                    <tr>
                        <th className="text-center">Nomor Rumah</th>
                        <th className="text-center">Status Rumah</th>
                        <th className="text-center">Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    {houses.map((house) => (
                        <tr key={house.id}>
                            <td className="text-center">
                                <div className="table-primary-text">
                                    {house.house_number}
                                </div>
                            </td>

                            <td className="text-center">
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
                            </td>

                            <td className="text-center">
                                <div className="action-buttons">
                                    <Link
                                        to={`/houses/${house.id}/detail`}
                                        className="btn btn-action-view btn-sm"
                                    >
                                        Detail
                                    </Link>

                                    <Link
                                        to={`/houses/edit/${house.id}`}
                                        className="btn btn-action-edit btn-sm"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        type="button"
                                        className="btn btn-action-delete btn-sm"
                                        onClick={() => handleDelete(house.id)}
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
    );
}

export default Houses;