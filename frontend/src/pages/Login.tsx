import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface IUser {
  email: string;
  senha: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IUser>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { saveLogin } = useAuth();

  useEffect(() => {    
    if (localStorage.getItem('Naruto')) {
      navigate('/my-page');
    }
  }, [navigate]);

  const onSubmit = (data: IUser) => {
    setIsLoading(true);
    handleLogin(data);
  };

  const handleLogin = (user: IUser) => {
    fetch('http://localhost:5001/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao logar');
        }
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        saveToken(data.token);
        saveLogin(data);
        navigate("/my-page");
      })
      .catch(error => {
        console.error('Erro ao logar:', error);
        alert('Erro ao realizar o login. Tente novamente.');
        setIsLoading(false);
      });
  };

  const saveToken = (token: string) => {
    localStorage.setItem("Naruto", token);
  };

  return (
    <div className="flex items-center justify-center mt-[40px] bg-primary">
      <section className="bg-secondary p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primaryDark">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-primaryDark font-bold mb-2" htmlFor="email">E-mail</label>
            <input
              className="shadow appearance-none border-b border-accent-light rounded w-full py-2 px-3 text-primary bg-secondary leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-accent-lightHover"
              id="email"
              type="email"
              placeholder="Seu e-mail"
              {...register("email", {
                required: 'O e-mail é obrigatório',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                  message: 'Por favor insira um e-mail válido',
                },
              })}
            />
            {errors.email && <span className="text-accent text-sm">{errors.email.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-primaryDark font-bold mb-2" htmlFor="senha">Senha</label>
            <input
              className="shadow appearance-none border-b border-accent-light rounded w-full py-2 px-3 text-primary bg-secondary leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-accent-lightHover"
              id="senha"
              type="password"
              placeholder="Sua senha"
              {...register("senha", { 
                required: "A senha é obrigatória.",
              })}
            />
            {errors.senha && <span className="text-accent text-sm">{errors.senha.message}</span>}
          </div>

          <div className="flex items-center justify-center">
            <button 
              className={`bg-accent hover:bg-accent-hover text-primaryDark font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 shadow-md focus:outline-none focus:shadow-outline ${isLoading && 'opacity-50 cursor-not-allowed'}`} 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Aguarde...' : 'Logar'}
            </button>
          </div>
        </form>
      </section>
      {isLoading && (
        <div className="fixed inset-0 bg-primaryDark opacity-90 flex items-center justify-center flex-col text-secondary text-2xl" aria-live="polite">
          <div className="mb-4">Logando...</div>
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-secondary"></div>
        </div>
      )}
    </div>
  );
};

export default Login;
