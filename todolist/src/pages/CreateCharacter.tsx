import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";

interface ICharacter {
  name: string;
  image: string;
  type: string;
  attributes: {
    vitality: number;
    mind: number;
    tenacity: number;
    strength: number;
    dexterity: number;
    intelligence: number;
  };
}

const CreateCharacter = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ICharacter>();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ICharacter> = (data) => {
    setIsLoading(true);
    saveCharacter(data);
    setTimeout(() => {
      setIsLoading(false);
      resetForm()
    }, 1000);
  };

  const saveCharacter = (character: ICharacter) => {
    fetch('http://localhost:5001/characters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(character),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao salvar o personagem');
        }
        return response.json();
      })
      .then(data => {
        console.log('Personagem salvo:', data);
        showNotification('Personagem criado com sucesso!')
      })
      .catch(error => {
        console.error('Erro ao salvar o personagem:', error);
        showNotification('Falha ao criar o personagem. Tente novamente.')
      });
  };

  const showNotification = (text:string) => {
    if (!("Notification" in window)) {
      alert(text);
    }

    else if (Notification.permission === "granted") {
      new Notification(text);
    }

    else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          new Notification(text);
        }
      });
    } else  {
      alert(text);
    }
  }

  const resetForm = () => {
    setValue("name", "");
    setValue("image", "");
    setValue("type", "");
    setValue("attributes.vitality", 0);
    setValue("attributes.mind", 0);
    setValue("attributes.tenacity", 0);
    setValue("attributes.strength", 0);
    setValue("attributes.dexterity", 0);
    setValue("attributes.intelligence", 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Opções de compressão
        const options = {
          maxSizeMB: 1, // Tamanho máximo da imagem em MB
          maxWidthOrHeight: 200, // Redimensiona se maior que 500px
          useWebWorker: true,
        };
  
        // Compressão da imagem
        const compressedFile = await imageCompression(file, options);
  
        // Converte o arquivo comprimido em Base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          setImagePreview(base64);
          setValue("image", base64); // Salva no formulário
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Erro ao comprimir a imagem:", error);
      }
    }
  };

  const attributeFields = [
    { id: "vitality", label: "Vitalidade" },
    { id: "mind", label: "Mente" },
    { id: "tenacity", label: "Tenacidade" },
    { id: "strength", label: "Força" },
    { id: "dexterity", label: "Destreza" },
    { id: "intelligence", label: "Inteligência" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Your Character</h1>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nome do Personagem
          </label>
          <input
            type="text"
            id="name"
            placeholder="Digite o nome do personagem"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("name", { required: "O nome do personagem é obrigatório." })}
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>

        {/* Upload da imagem */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Imagem do Personagem
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleImageUpload}
          />
          {errors.image && <span className="text-red-500">Imagem é obrigatória.</span>}
        </div>

        {/* Preview da imagem */}
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm mb-2">Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-w-xs mx-auto rounded-lg border border-gray-600"
            />
          </div>
        )}

        {/* Tipo de Personagem */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium mb-2">
            Tipo de Personagem
          </label>
          <select
            id="type"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={'DEFAULT'}
            {...register("type", { required: true })}
          >
            <option disabled value="DEFAULT">
              Selecione o tipo
            </option>
            <option value="mago">Mago</option>
            <option value="guerreiro">Guerreiro</option>
            <option value="assassino">Assassino</option>
            <option value="miseravel">Miserável</option>
          </select>
          {errors.type && <span className="text-red-500">Tipo é obrigatório.</span>}
        </div>

        {/* Atributos */}
        <div>
          <h2 className="text-lg font-bold mb-4">Atributos</h2>
          <div className="grid grid-cols-2 gap-4">
            {attributeFields.map(({ id, label }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium mb-2">
                  {label}
                </label>
                <input
                  type="number"
                  id={id}
                  placeholder="0"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={0}
                  min={0}
                  {...register(`attributes.${id}`, {
                    min: { value: 0, message: `A ${label} deve ser maior ou igual a 0.` },
                  })}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg ${isLoading && "opacity-50 cursor-not-allowed"}`}
          disabled={isLoading}
        >
          {isLoading ? "Salvando..." : "Criar Personagem"}
        </button>
      </form>
    </div>
  );
};

export default CreateCharacter;
