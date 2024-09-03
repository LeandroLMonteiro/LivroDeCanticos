import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useSetArquivo } from '../state/hooks/useSetArquivo';
import { useArquivo } from '../state/hooks/useArquivo';
import { linhaModulada as trataLinha} from '../funcoes/transposeChord';


export default function SelecionaTom() {

  const notas = [
    'C',
    'C# / Db',
    'D',
    'D# / Eb',
    'E',
    'F',
    'F# / Gb',
    'G',
    'G# / Ab',
    'A',
    'A# / Bb',
    'B',
  ];


  const setArquivo = useSetArquivo();
  const arquivo = useArquivo()
  const [tomSelecionado, setTomSelecionado] = useState('C');

  function devolveIndice(nota: string): number {
    var tomRelativo = nota;
    var indice = 0;
    if(tomRelativo) {
      if(tomRelativo === 'C') {
        indice = 0;
      } else if(tomRelativo === 'C#' || tomRelativo === 'Db') {
        indice = 1;
      } else if(tomRelativo === 'D') {
        indice = 2;
      } else if(tomRelativo === 'D#' || tomRelativo === 'Eb') {
        indice = 3;
      } else if(tomRelativo === 'E') {
        indice = 4;
      } else if(tomRelativo === 'F') {
        indice = 5;
      } else if(tomRelativo === 'F#' || tomRelativo === 'Gb') {
        indice = 6;
      } else if(tomRelativo === 'G') {
        indice = 7;
      } else if(tomRelativo === 'G#' || tomRelativo === 'Ab') {
        indice = 8;
      } else if(tomRelativo === 'A') {
        indice = 9;
      } else if(tomRelativo === 'A#' || tomRelativo === 'Bb') {
        indice = 10;
      } else if(tomRelativo === 'B') {
        indice = 11;
      }
    }
    return indice;
  }

  const handleChange = (event: SelectChangeEvent) => {
    const IndiceEscolhido = Number(event.target.value);
    const IndiceTom = devolveIndice(arquivo.tom??'C');
    const dif1 = IndiceTom - IndiceEscolhido
    const dif2 = IndiceEscolhido - IndiceTom;
    var diferenca = (dif1 < 0) ? dif1*(-1) : dif2;

    const novoSemiton = diferenca;
    var linhas:string[] = [];
    var novoArquivo = '';
    if(arquivo.conteudo) {
      linhas = arquivo.conteudo.split('\n');;
    }

    linhas.forEach((linha) => {
      novoArquivo = novoArquivo + trataLinha(linha,novoSemiton) + '\n';            
    });

    setTomSelecionado(notas[Number(event.target.value)]);
    setArquivo({
      ...arquivo,
      tomModulado: notas[Number(event.target.value)].toString(),
      semiton: (diferenca),
      conteudoModulado: novoArquivo
    });

  };


  useEffect(() => {
    var tomRelativo = arquivo.tomModulado??arquivo.tom;
    if(tomRelativo) {
      var indice = devolveIndice(tomRelativo);    
      setTomSelecionado(notas[indice]);
    }
  }, [arquivo.tomModulado,arquivo.semiton,arquivo.conteudoModulado]);


  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, textTransform: 'capitalize'}} size="small" color='primary'>
        <Select
          value={notas.indexOf(tomSelecionado).toString()}
          onChange={handleChange}
          autoWidth
          color='primary'
        >
          {notas.map((nota, index) => (
          <MenuItem key={index} value={index}>
            {nota}
          </MenuItem>
        ))}

        </Select>
      </FormControl>
    </div>
  );
}