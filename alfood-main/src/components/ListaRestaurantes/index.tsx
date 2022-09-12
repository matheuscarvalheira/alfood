import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { IPaginacao } from "../../interfaces/IPaginacao";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";

// esses são os posséveis parâmetros que podemos enviar para a API
interface IParametrosBusca {
  ordering?: string;
  search?: string;
}

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [paginaAnterior, setPaginaAnterior] = useState("");

  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState("");

  // agora, o carregarDados recebe opcionalmente opções de configuração do axios
  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios
      .get<IPaginacao<IRestaurante>>(url, opcoes)
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  // a cada busca, montamos um objeto de opções
  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const opcoes = {
      params: {} as IParametrosBusca,
    };
    if (busca) {
      opcoes.params.search = busca;
    }
    if (ordenacao) {
      opcoes.params.ordering = ordenacao;
    }
    carregarDados("http://localhost:8000/api/v1/restaurantes/", opcoes);
  };

  useEffect(() => {
    // obter restaurantes
    carregarDados("http://localhost:8000/api/v1/restaurantes/");
  }, []);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {/* sinta-se livre para deixar o formulário mais elegante, aplicando estilos CSS */}
      <form onSubmit={buscar}>
        <div>
          <TextField
            sx={{marginBottom:2}}
            id="outlined-basic"
            label="Escolha um restaurante"
            variant="outlined"
            type="text"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            fullWidth
          />
        </div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" >
            Ordenar por:
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="select-ordenacao"
            value={ordenacao}
            label="Ordenar por"
            onChange={(evento) => setOrdenacao(evento.target.value)}
          >
            <MenuItem value="">Padrão</MenuItem>
            <MenuItem value="id">Por ID</MenuItem>
            <MenuItem value="nome">Por Nome</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Button variant="outlined" type="submit" sx={{marginTop:2}}>
            buscar
          </Button>
        </div>
      </form>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {
        <button
          onClick={() => carregarDados(paginaAnterior)}
          disabled={!paginaAnterior}
        >
          Página Anterior
        </button>
      }
      {
        <button
          onClick={() => carregarDados(proximaPagina)}
          disabled={!proximaPagina}
        >
          Próxima página
        </button>
      }
    </section>
  );
};

export default ListaRestaurantes;
