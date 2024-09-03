
import { Alert, Button } from '@mui/material';
import React, {  useEffect, useRef, useState } from 'react';
import { useSetArquivo } from '../../state/hooks/useSetArquivo';
import { useArquivo } from '../../state/hooks/useArquivo';
import styles from '../../styles/Tema.module.scss';
import BasicPopover from '../../componentes/Popover';
import {  salvarArquivo } from '../../funcoes/salvar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import PersonIcon from '@mui/icons-material/Person';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import TagIcon from '@mui/icons-material/Tag';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const Carregar: React.FC = () => {
  const setArquivo = useSetArquivo();
  const arquivo = useArquivo();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const grupoInterprete = arquivo.grupoInterprete;
  const quemCanta = arquivo.quemCanta;
  const tags = arquivo.tags;
  const titulo = arquivo.titulo;
  const tom = arquivo.tom;



  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    var file = event.target.files?.[0];
    setErrorMessage('');
    setShowError(false);
    if (file) {
      if (file.type !== 'text/plain') {
        setErrorMessage('Somente arquivos .txt sao permitidos');
        setShowError(true);
        setArquivo(
          { nomeDoArquivo: null, 
            conteudo: null, 
            tom: null, 
            titulo: null, 
            grupoInterprete: '',
            tomModulado: null, 
            conteudoModulado: null, 
            tags: [],
            quemCanta: '',
            semiton: 0});
        
        return;
      }
      try {
        const text = await readFileContent(file);
        const lines = text.split('\n');
        let tom = '';
        let titulo = '';
        let grupoInterprete = '';
        let conteudoArquivo = '';
        let quemCanta = '';
        let tags: string[] = [];

        lines.forEach((linha) => {
          if (linha.slice(0, 4) === '[TT]') {
            titulo = linha.slice(4);
          } else if (linha.slice(0, 4) === '[GR]') {
            grupoInterprete = linha.slice(4);
          } else if (linha.slice(0, 5) === '[TOM]') {
            tom = linha.slice(5).trim();
          } else if (linha.slice(0, 4) === '[QC]') {
            quemCanta = linha.slice(4);
          } else if (linha.slice(0, 5) === '[TAG]') {
            const inputString = linha.slice(5);
            const regex = /#([^#\s]+)/g;
            const matches = inputString.match(regex);
            if (matches) {
              matches.map(match => tags.push(match.slice(1).trim()));
            }

          } else {
            conteudoArquivo = conteudoArquivo + linha + '\n';
          }
        });

        setArquivo(
          { nomeDoArquivo: file.name, 
            conteudo: conteudoArquivo, 
            tom: tom, 
            titulo: titulo, 
            grupoInterprete: grupoInterprete, 
            quemCanta: quemCanta, 
            tags: tags,
            tomModulado: tom,
            conteudoModulado: conteudoArquivo,
            semiton: 0});  

      } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
      }
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        resolve(content);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  };

 const limpar = () => {
   setArquivo({ nomeDoArquivo: null, conteudo: null, tom: null, titulo: null, grupoInterprete: '', conteudoModulado: null, tomModulado: null, semiton: 0, quemCanta: '', tags: undefined});	
   if (fileInputRef.current) fileInputRef.current.value = '';
  }

 const salvaArquivo = () => {
  setArquivo(
    { nomeDoArquivo: arquivo.nomeDoArquivo, 
      conteudo: arquivo.conteudo, 
      tom: tom, 
      titulo: titulo, 
      grupoInterprete: 
      grupoInterprete, 
      quemCanta: quemCanta, 
      tags: tags, 
      tomModulado: null, 
      conteudoModulado: null,
      semiton: 0});
  salvarArquivo(false, arquivo);
 }

 useEffect(() => {
 },[arquivo]);

  return (
    <div className={styles.container}>
      
      {showError ? (
        <Alert severity="error">{errorMessage}</Alert>
      ) : null}

      <label htmlFor="file-input" onClick={() => fileInputRef.current?.click()}>
          <Button variant="text" startIcon={<CloudUploadIcon />}>Selecione Arquivo</Button>
          <input id="file-input" type="file" style={{ display: 'none' }} ref={fileInputRef} accept=".txt" onChange={handleFileUpload} />
      </label>
      <Button variant="text" startIcon={<CleanHandsIcon />} onClick={limpar}>Limpar</Button>
      <Button variant="text" startIcon={<PersonIcon />}><BasicPopover nome="Cantor(es)" campo="quemCanta" conteudo={arquivo.quemCanta??''}/></Button>
      <Button variant="text" startIcon={<InterpreterModeIcon />}><BasicPopover nome="Interprete(s)" campo="grupoInterprete" conteudo={arquivo.grupoInterprete??''}/></Button>
      <Button variant="text" startIcon={<TagIcon />}><BasicPopover nome="Tags" campo="tags" conteudo={arquivo.tags??['']}/></Button>
      <Button variant="text" startIcon={<SaveAltIcon />} onClick={salvaArquivo}>Salvar</Button>

      {titulo && <h2>{titulo}</h2>}
      {tom && <h3>Tom: {tom}</h3>}
      <h4>{grupoInterprete && `Interprete: ${grupoInterprete}`} <br/> {quemCanta && ` Cantores: ${quemCanta}`} <br/> {tags && ` Partes da Missas: ${tags}`}</h4>


      {arquivo.conteudo ? (
        <pre>{arquivo.conteudo}</pre>
      ) : null}
    </div>
  );
};

export default Carregar;