import { SubmitHandler, useForm } from "react-hook-form";
import InputMask from "@mona-health/react-input-mask";
import { validarCPF } from "../components/utils/validate";
import { useState } from "react";

interface IUser {
  name: string,
  email: string,
  cpf: string,
  telefone: string,
  senha: string,
  confirmSenha?: string
}

const SignUp = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IUser>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const password = watch("senha");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<IUser> = (data) => {
    setIsLoading(true);
    data.cpf = data.cpf.replace(/[^\d]/g, '');
    data.telefone = data.telefone.replace(/[^\d]/g, '');
    const { confirmSenha, ...userWithoutPassword } = data;
    saveUser(userWithoutPassword);
  };

  const saveUser = (user: IUser) => {
    fetch('http://localhost:5001/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao salvar');
        }
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        resetForm();
        console.log('Personagem salvo:', data);
      })
      .catch(error => {
        console.error('Erro ao salvar:', error);
      });
  };

  const resetForm = () => {
    setValue("name", "");
    setValue("email", "");
    setValue("cpf", "");
    setValue("telefone", '');
    setValue("senha", '');
    setValue("confirmSenha", '');
  };

  const renderValidationMessage = (condition: boolean, message: string) => (
    <span className={`flex items-center text-sm ${condition ? 'text-green-700' : 'text-red-500'}`}>
      {condition ? '✔️' : '❌'} {message}
    </span>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <section className="bg-primaryDark p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-secondary">Cadastro</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-secondary font-bold mb-2" htmlFor="nome">Nome</label>
            <input
              className="shadow appearance-none border-b border-accent rounded w-full py-2 px-3 text-secondary bg-primary leading-tight focus:outline-none focus:ring-2 focus:ring-accent"
              id="nome"
              type="text"
              placeholder="Seu nome"
              {...register("name", { required: "O nome é obrigatório." })}
            />
            {errors.name && <span className="text-accent-light text-sm">{errors.name.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-secondary font-bold mb-2" htmlFor="email">E-mail</label>
            <input
              className="shadow appearance-none border-b border-accent rounded w-full py-2 px-3 text-secondary bg-primary leading-tight focus:outline-none focus:ring-2 focus:ring-accent"
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
            {errors.email && <span className="text-accent-light text-sm">{errors.email.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-secondary font-bold mb-2" htmlFor="cpf">CPF</label>
            <InputMask
              mask="999.999.999-99"
              maskPlaceholder={null}
              {...register("cpf", {
                required: "O CPF é obrigatório.",
                validate: (value) => validarCPF(value) || 'CPF inválido'
              })}
              className="shadow appearance-none border-b border-accent rounded w-full py-2 px-3 text-secondary bg-primary leading-tight focus:outline-none focus:ring-2 focus:ring-accent"
              id="cpf"
              type="text"
              placeholder="Seu CPF"
            />
            {errors.cpf && <span className="text-accent-light text-sm">{errors.cpf.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-secondary font-bold mb-2" htmlFor="telefone">Telefone</label>
            <InputMask
              mask="(99) 99999-9999"
              maskPlaceholder={null}
              {...register("telefone", {
                required: "O telefone é obrigatório.",
                minLength: {
                  value: 15,
                  message: 'Por favor, insira um telefone válido.',
                },
              })}
              className="shadow appearance-none border-b border-accent rounded w-full py-2 px-3 text-secondary bg-primary leading-tight focus:outline-none focus:ring-2 focus:ring-accent"
              id="telefone"
              type="tel"
              placeholder="Seu telefone"
            />
            {errors.telefone && <span className="text-accent-light text-sm">{errors.telefone.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-secondary font-bold mb-2" htmlFor="senha">Senha</label>
            <input
              className="shadow appearance-none border-b border-accent rounded w-full py-2 px-3 text-secondary bg-primary leading-tight focus:outline-none focus:ring-2 focus:ring-accent"
              id="senha"
              type="password"
              placeholder="Sua senha"
              {...register("senha", {
                required: "A senha é obrigatória.",
                minLength: {
                  value: 8,
                  message: 'A senha deve ter pelo menos 8 caracteres.',
                },
                validate: {
                  hasUpperCase: (value) => /[A-Z]/.test(value) || 'A senha deve ter pelo menos uma letra maiúscula.',
                  hasLowerCase: (value) => /[a-z]/.test(value) || 'A senha deve ter pelo menos uma letra minúscula.',
                  hasNumber: (value) => /[0-9]/.test(value) || 'A senha deve ter pelo menos um número.',
                  hasSpecialChar: (value) => /[!@#$%^&*]/.test(value) || 'A senha deve ter pelo menos um caractere especial.',
                },
              })}
            />
            <div className="flex flex-col mt-2 space-y-1">
              {renderValidationMessage(password?.length >= 8, '8 caracteres')}
              {renderValidationMessage(/[A-Z]/.test(password), '1 letra maiúscula')}
              {renderValidationMessage(/[a-z]/.test(password), '1 letra minúscula')}
              {renderValidationMessage(/[0-9]/.test(password), '1 número')}
              {renderValidationMessage(/[!@#$%^&*]/.test(password), '1 caractere especial')}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-secondary font-bold mb-2" htmlFor="confirmacao-senha">Confirmação de Senha</label>
            <input
              className="shadow appearance-none border-b border-accent rounded w-full py-2 px-3 text-secondary bg-primary leading-tight focus:outline-none focus:ring-2 focus:ring-accent"
              id="confirmacao-senha"
              type="password"
              placeholder="Confirme sua senha"
              {...register("confirmSenha", {
                required: "A confirmação de senha é obrigatória.",
                validate: (val: string) => {
                  if (watch('senha') != val) {
                    return "As senhas não coincidem";
                  }
                },
              })}
            />
            {errors.confirmSenha && <span className="text-accent-light text-sm">{errors.confirmSenha.message}</span>}
          </div>

          <div className="flex items-center justify-center">
            <button className="bg-accent hover:bg-accent-hover text-primaryDark font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg focus:outline-none" type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </section>
      {isLoading && (
        <div className="absolute bg-primaryDark h-full w-full opacity-90 flex items-center justify-center flex-col text-secondary text-2xl">
          <div className="mb-4">Cadastrando...</div>
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-accent"></div>
        </div>
      )}
    </div>

  );
};

export default SignUp;
