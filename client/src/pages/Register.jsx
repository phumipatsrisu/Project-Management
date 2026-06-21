import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", form);
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("This email is taken");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.name}
          placeholder="name..."
          name="name"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
