import { atom } from "recoil";
import { IItemPagina } from "../Interfaces/IItemPagina";
import { IArquivo } from "../Interfaces/IArquivo";
import { IArquivoLista } from "../Interfaces/ListaArquivo";

export const itemPagina = atom<IItemPagina>({
    key: 'itemPagina', 
    default: { nomePagina: 'Home', menu: ['Home'] }
});

export const arquivo = atom<IArquivo>({
    key: 'arquivo', 
    default: { nomeDoArquivo: null, conteudo: null, titulo: null, tom: null, conteudoModulado: null, tomModulado: null, semiton: 0 }
});

export const listaArquivos = atom<IArquivoLista>({
    key: 'arquivos', 
    default: []
});
