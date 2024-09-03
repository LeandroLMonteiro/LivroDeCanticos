import { useRecoilValue } from "recoil"
import { listaArquivos } from "../atom"

export const useListaArquivos = () => {
    return useRecoilValue(listaArquivos)   
}