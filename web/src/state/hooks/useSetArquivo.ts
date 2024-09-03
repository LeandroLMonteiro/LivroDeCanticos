import { useSetRecoilState } from "recoil"
import { arquivo } from "../atom"
import { IArquivo } from "../../Interfaces/IArquivo"

export const useSetArquivo = () => {
    const setArquivo = useSetRecoilState<IArquivo>(arquivo)
    return setArquivo
}