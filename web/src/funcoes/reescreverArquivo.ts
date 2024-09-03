import { IArquivo } from "../Interfaces/IArquivo";
export function reescreverArquivo(arquivo: IArquivo): Blob | null {
    if (arquivo) {
            const novoTitulo = '[TT] ' + arquivo.titulo;
            const novoGrupo = '[GR] ' + arquivo.grupoInterprete;
            const novoQuemCanta = '[QC] ' + arquivo.quemCanta;
            let novaTag:string = '';
            let novoConteudo = '';
            if(arquivo.tags) {
                arquivo.tags.forEach((tag: string) => {
                    novaTag = novaTag + '#' + tag + ' ';
                });
            };
            const novasTags = '[TAG] ' + novaTag;
            let novoTom = '';
            if (arquivo.tomModulado) {
                novoTom = '[TOM] ' + arquivo.tomModulado;
                novoConteudo = novoTitulo + '\n' + novoGrupo + '\n' + novoQuemCanta + '\n' + novoTom + '\n' + novasTags + '\n' + arquivo.conteudoModulado;          
            } else {
                novoTom = '[TOM] ' + arquivo.tom;
                novoConteudo = novoTitulo + '\n' + novoGrupo + '\n' + novoQuemCanta + '\n' + novoTom + '\n' + novasTags + '\n' + arquivo.conteudo;          
            };

            const blob = new Blob([novoConteudo], { type: 'text/plain' });
            return blob;
    }else{
        return null;
    }
}
