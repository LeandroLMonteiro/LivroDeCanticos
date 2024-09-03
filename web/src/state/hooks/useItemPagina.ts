import { useRecoilValue } from "recoil"
import { itemPagina } from "../atom"

export const useItemPagina = () => {
    return useRecoilValue(itemPagina)   
}
