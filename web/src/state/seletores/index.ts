import {  selector } from "recoil";
import { arquivo, itemPagina, listaArquivos } from "../atom";

export const itemPaginaGet = selector({
  key: 'itemPagina',
  get: ({ get }) => get(itemPagina)
});

export const arquivoGet = selector({
  key: 'arquivo',
  get: ({ get }) => get(arquivo)
});

export const listaArquivosGet = selector({
  key: 'listaArquivos',
  get: ({ get }) => get(listaArquivos)
});