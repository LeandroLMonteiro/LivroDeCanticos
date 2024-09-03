export interface IArquivo {
    nomeDoArquivo: string | null,
    conteudo: string | null,
    tom: string | null,
    titulo: string | null,
    quemCanta?: string,
    grupoInterprete?: string,
    tags?: string[]
    conteudoModulado: string | null,
    tomModulado: string | null,
    semiton: number
}