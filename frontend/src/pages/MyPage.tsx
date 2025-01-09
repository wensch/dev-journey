import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const MyPage = () => {
  const navigate = useNavigate();
  const {userPeople, saveLogout} = useAuth();
  
  return (
    <>
      <h1>Usuário logado - {userPeople?.user.nome}</h1>

      <button onClick={() => {
        localStorage.removeItem('Naruto')
        navigate("/");
        saveLogout();
      }}>Sair </button>
    </>
  )
}

export default MyPage