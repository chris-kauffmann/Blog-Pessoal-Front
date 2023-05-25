import Tema from "./Tema";
import User from "./User";

interface Postagem {
  id: number;
  titulo: string;
  texto: string;
  tema?: Tema | null;
  usuario?: User | null; //linha adc para vincular um usuario
}

export default Postagem;
