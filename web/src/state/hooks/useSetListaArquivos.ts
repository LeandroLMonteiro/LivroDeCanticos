import { useSetRecoilState } from "recoil"
import { listaArquivos } from "../atom"
import { IArquivo } from "../../Interfaces/IArquivo"

export const useSetListaArquivos = () => {
    const setListaArquivos = useSetRecoilState<IArquivo[]>(listaArquivos)
    return setListaArquivos
}