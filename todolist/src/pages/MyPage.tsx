import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <h1>Usuário logado - </h1>

      <button onClick={() => {
        localStorage.removeItem('Naruto')
        navigate("/");
      }}>Sair </button>
    </>
  )
}

export default MyPage