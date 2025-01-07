import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    
    if (localStorage.getItem('Naruto')) {
      navigate('/my-page')
    }
    return
  }, [])
  

  const onSubmit: SubmitHandler<IUser> = (data) => {
    setIsLoading(true);
    login(data);
  };

  const login = (user: IUser) => {
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
        navigate("/my-page");
      })
      .catch(error => {
        console.error('Erro ao logar:', error);
        setIsLoading(false);
      });
  };

  const saveToken = (token: string) => {
    localStorage.setItem("Naruto", token);
  };

  return (
    <div className="flex items-center justify-center ">
      <section className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">E-mail</label>
            <input
              className="shadow appearance-none border-b border-cyan-950 rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-cyan-950"
              id="email"
              type="email"
              placeholder="Seu e-mail"
              {...register("email", {
                required: 'O e-mail é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Por favor insira um e-mail válido',
                },
              })}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="senha">Senha</label>
            <input
              className="shadow appearance-none border-b border-cyan-950 rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-cyan-950"
              id="senha"
              type="password"
              placeholder="Sua senha"
              {...register("senha", { 
                required: "A senha é obrigatória.",
              })}
            />
            {errors.senha && <span className="text-red-500 text-sm">{errors.senha.message}</span>}
          </div>

          <div className="flex items-center justify-center">
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg focus:outline-none focus:shadow-outline" type="submit">
              Logar
            </button>
          </div>
        </form>
      </section>
      {isLoading && (
        <div className="absolute bg-black h-full w-full opacity-90 flex items-center justify-center flex-col text-white text-2xl">
          <div className="mb-4">Logando...</div>
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default Login;
