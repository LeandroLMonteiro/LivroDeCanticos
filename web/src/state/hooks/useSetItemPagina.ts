import { useSetRecoilState } from "recoil"
import { itemPagina } from "../atom"
import { IItemPagina } from "../../Interfaces/IItemPagina"

export const useSetItemPagina = () => {
    const setItemPagina = useSetRecoilState<IItemPagina>(itemPagina)
    return setItemPagina
}