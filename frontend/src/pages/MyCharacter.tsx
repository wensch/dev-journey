import { useEffect, useState } from "react";

interface ICharacter {
  id: string;
  name: string;
  image: string;
  type: string;
  vitality: number;
  mind: number;
  tenacity: number;
  strength: number;
  dexterity: number;
  intelligence: number;
}

const MyCharacter = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5001/characters')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar personagens');
        }
        return response.json();
      })
      .then((data) => {
        if (data.character && Array.isArray(data.character)) {
          setCharacters(data.character);
        } else {
          throw new Error('Estrutura de dados inesperada');
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erro:', error);
        setError('Falha ao carregar personagens. Tente novamente mais tarde.');
        setIsLoading(false);
      });
  }, []);

  const removeCharacter = (id: string) => {
    setIsDeleting(id);
    fetch(`http://localhost:5001/characters/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao excluir o personagem');
        }
        setCharacters((prev) => prev.filter((character) => character.id !== id));
        setIsDeleting(null);
      })
      .catch((error) => {
        console.error('Erro ao excluir o personagem:', error);
        setIsDeleting(null);
      });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-primaryDark text-secondary rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-8 text-center text-secondary">Seus Personagens</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(characters.length <= 0 || characters == undefined) && (
          <p className="text-center mt-8 text-accent-light">Nenhum personagem encontrado.</p>
        )}
        {characters.map((el, ind) => (
          <div key={ind} className="bg-primary border border-accent rounded-lg shadow-lg overflow-hidden">
            <img src={el.image} alt="Personagem" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-accent-lightHover">{el.name}</h2>
              <p className="text-sm text-secondary mt-2 mb-4">
                <span className="font-bold">Tipo:</span> {el.type}
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm text-secondary">
                <p>
                  <span className="font-bold">Vitality:</span> {el.vitality}
                </p>
                <p>
                  <span className="font-bold">Mind:</span> {el.mind}
                </p>
                <p>
                  <span className="font-bold">Tenacity:</span> {el.tenacity}
                </p>
                <p>
                  <span className="font-bold">Strength:</span> {el.strength}
                </p>
                <p>
                  <span className="font-bold">Dexterity:</span> {el.dexterity}
                </p>
                <p>
                  <span className="font-bold">Intelligence:</span> {el.intelligence}
                </p>
              </div>
              <div className="mt-4">
                <button
                  aria-label={`Excluir o personagem ${el.name}`}
                  className={`bg-accent hover:bg-accent-hover text-primaryDark font-bold py-2 px-4 rounded ${isDeleting === el.id && "opacity-50 cursor-not-allowed"
                    }`}
                  onClick={() => removeCharacter(el.id)}
                  disabled={isDeleting === el.id}
                >
                  {isDeleting === el.id ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="text-center mt-8">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-accent-lightHover">Carregando personagens...</p>
        </div>
      )}
    </div>

  );
};

export default MyCharacter;
