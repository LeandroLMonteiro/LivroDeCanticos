import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Alert, Button } from '@mui/material';
import { useArquivo } from '../../state/hooks/useArquivo';
import { useSetArquivo } from '../../state/hooks/useSetArquivo';
import { linhaModulada as trataLinha, transposeChord as transpor } from '../../funcoes/transposeChord';
import { salvarArquivo } from '../../funcoes/salvar';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import SelecionaTom from '../../componentes/SelecionaTom';

const Transpor: React.FC = () => {
  const setArquivo = useSetArquivo();
  const arquivo = useArquivo();
  
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
    
  
  const soma = (semitonAtual: number, incremento: number) => {
    setErrorMessage('');
    setShowError(false);
    let posicao = semitonAtual+incremento;
    if(posicao>11){
      posicao = posicao-12;
    }
    setArquivo({ ...arquivo, semiton: posicao });
  };

  const subtrai = (semitonAtual: number, decremento: number) => {
    setErrorMessage('');
    setShowError(false);
    let posicao = semitonAtual-decremento;
    if(posicao<-11){
      posicao = 12 + posicao;
    }
    setArquivo({ ...arquivo, semiton: posicao });
  };
  

  const salvaArquivo = () => {
    setErrorMessage('');
    setShowError(false);

    if (arquivo.tom !== arquivo.tomModulado) {
      salvarArquivo(true, arquivo);
      setErrorMessage('');
      setShowError(false);  
    } else {
      setErrorMessage('Música não modulada');
      setShowError(true);
    }

  };

  useEffect(() => {
    var novoArquivo = '';
    var linhas: string[] = [];

    if(!arquivo.conteudo) {
      setErrorMessage('Não há informações');
      setShowError(true);
    } else {
      linhas = arquivo.conteudo.split('\n');;
    }

    linhas.forEach((linha) => {
      novoArquivo = novoArquivo + trataLinha(linha,arquivo.semiton) + '\n';            
    });
   
    setArquivo({...arquivo,conteudoModulado: novoArquivo, tomModulado: arquivo.tom?transpor(arquivo.tom, arquivo.semiton):''});

  }, [arquivo.semiton,showError]);
  
    return (
      <><Box sx={{ '& > :not(style)': { m: 1 } }}>
        <div>
          {showError ? (
            <Alert severity="error">{errorMessage}</Alert>
          ) : null}
        </div>

        <Button size="small" color="primary" startIcon={<KeyboardArrowDownIcon />}       onClick={() => subtrai(arquivo.semiton,1)}> Semiton </Button>
        <Button size="small" color="primary" startIcon={<KeyboardArrowUpIcon />}         onClick={() => soma(arquivo.semiton,1)}> Semiton </Button>
        <Button size="small" color="primary" startIcon={<KeyboardDoubleArrowDownIcon />} onClick={() => subtrai(arquivo.semiton,2)}> Tom </Button>
        <Button size="small" color="primary" startIcon={<KeyboardDoubleArrowUpIcon />}   onClick={() => soma(arquivo.semiton,2)}> Tom </Button>
        <Button size="small" color="primary"   endIcon={<SelecionaTom/>}> Transpor para </Button>
        <Button size="small" color="primary" startIcon={<SaveAltIcon />}                 onClick={salvaArquivo}> Salvar </Button>

        {arquivo.titulo && <h2>{arquivo.titulo}</h2>}
        <h4>{arquivo.grupoInterprete && `Interprete: ${arquivo.grupoInterprete}`} <br/> {arquivo.quemCanta && ` Cantores: ${arquivo.quemCanta}`} <br/> {arquivo.tags && ` Partes da Missas: ${arquivo.tags}`}</h4>

      </Box>
      <div className="container">
        {arquivo.tom && (arquivo.tomModulado!==arquivo.tom && arquivo.tomModulado) && (<div><h3>Tom Original: {arquivo.tom} <br/> Tom Modulado: {arquivo.tomModulado}</h3></div>)}
        {arquivo.tom && (arquivo.tomModulado===arquivo.tom || !arquivo.tomModulado) && <h3>Tom Original: {arquivo.tom}</h3>}
        <pre>
          {arquivo.conteudoModulado && arquivo.conteudoModulado}
          {!arquivo.conteudoModulado && arquivo.conteudo}
        </pre>

      </div></>
    );
};

export default Transpor;