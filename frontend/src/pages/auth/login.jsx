import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Lock, Mail } from "lucide-react";
import api from "../../api/axios";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/login", form);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            navigate("/dashboard");
        } catch (error) {
            setError("Email atau password salah");
        }
    };

    return (
        <div className="login-page">
            <div className="login-wrapper">
                <div className="login-brand-section">
                    <div className="login-logo">
                        RT
                    </div>

                    <h1>Admin RT</h1>
                    <p>
                        Sistem administrasi untuk mengelola data penghuni,
                        rumah, pembayaran iuran, pengeluaran, dan laporan kas RT.
                    </p>

                    <div className="login-feature-list">
                        <div>
                            <Home size={18} />
                            <span>Manajemen rumah dan penghuni</span>
                        </div>

                        <div>
                            <Lock size={18} />
                            <span>Login aman untuk admin</span>
                        </div>
                    </div>
                </div>

                <div className="login-card">
                    <div className="login-card-header">
                        <h3>Masuk ke Dashboard</h3>
                        <p>Silakan login untuk mengakses sistem Admin RT.</p>
                    </div>

                    {error && (
                        <div className="login-alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="login-form-group">
                            <label>Email</label>

                            <div className="login-input-wrapper">
                                <Mail size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="login-form-group">
                            <label>Password</label>

                            <div className="login-input-wrapper">
                                <Lock size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Masukkan password"
                                    required
                                />
                            </div>
                        </div>

                        <button className="btn btn-action-primary login-button">
                            Login
                        </button>
                    </form>

                    <div className="login-demo-info">
                        <span>Akun Demo</span>
                        <p>Email: admin@example.com</p>
                        <p>Password: password</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;