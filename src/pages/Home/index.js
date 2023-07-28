import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../FirebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/admin", { replace: true });
        })
        .catch((error) => {
          console.error("ERROR:", error);
        });
    } else {
      alert("Preencha todos os campos.");
    }
  }

  return (
    <div className="home-container">
      <h1>Lista de Tarefas</h1>
      <span>Gerencie sua agenda de forma fácil...</span>

      <form className="form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Digite o seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Acessar</button>
      </form>

      <Link to="/register" className="button-link">
        Não possui uma conta? Então cadastra-se
      </Link>
    </div>
  );
}
