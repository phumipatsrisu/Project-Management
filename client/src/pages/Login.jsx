import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Email not found or Password is wrong");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={form.email}
          placeholder="email..."
          name="email"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        />
        <input
          type="password"
          value={form.password}
          placeholder="password..."
          name="password"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
