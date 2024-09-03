import FileSaver from "file-saver";
import { reescreverArquivo } from "./reescreverArquivo";
import { IArquivo } from "../Interfaces/IArquivo";

export function salvarArquivo(salvarComo: boolean = false, arquivo:IArquivo) {
    
    if (arquivo.conteudoModulado || (salvarComo===false && arquivo.conteudo)) {
        const novoArquivo = reescreverArquivo(arquivo);
        if (novoArquivo) {
            const nomeDoArquivo = arquivo.nomeDoArquivo ? arquivo.nomeDoArquivo : 'default_filename';
            if (salvarComo) {
                FileSaver.saveAs(novoArquivo, nomeDoArquivo + '_modulado.txt');	
            } else {
                FileSaver.saveAs(novoArquivo, nomeDoArquivo);
            }
        }
    }  
}
