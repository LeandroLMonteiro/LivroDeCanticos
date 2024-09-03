import { useRecoilValue } from "recoil"
import { arquivo } from "../atom"

export const useArquivo = () => {
    return useRecoilValue(arquivo)   
}