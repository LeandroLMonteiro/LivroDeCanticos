export function transposeChord(chord: string, semitones: number): string {
  const chordMap: Record<string, string> = {
    'C': 'C',
    'C#': 'C#',
    'D': 'D',
    'D#': 'D#',
    'E': 'E',
    'F': 'F',
    'F#': 'F#',
    'G': 'G',
    'G#': 'G#',
    'A': 'A',
    'A#': 'A#',
    'B': 'B'
  };
   
  const chordMapb: Record<string, string> = {
    'C': 'C',
    'Db': 'Db',
    'D': 'D',
    'Eb': 'Eb',
    'E': 'E',
    'F': 'F',
    'Gb': 'Gb',
    'G': 'G',
    'Ab': 'Ab',
    'A': 'A',
    'Bb': 'Bb',
    'B': 'B'
  };
  
  if (chordMap[chord]) {
    const transposedChord = chordMap[chord];
    const transposedSemitones = (semitones + 12) % 12;
    let transposedChordIndex = 0;
    if((Object.keys(chordMap).indexOf(transposedChord) + transposedSemitones)>12){
      transposedChordIndex = ((Object.keys(chordMap).indexOf(transposedChord) + transposedSemitones) - 12) % 12;
    }else {
      transposedChordIndex = (Object.keys(chordMap).indexOf(transposedChord) + transposedSemitones) % 12;
    }
    const finalChord = Object.keys(chordMap)[transposedChordIndex]; 
    return finalChord;
  }else {
    if(chordMapb[chord]){
      const transposedChord = chordMapb[chord];
      const transposedSemitones = (semitones + 12) % 12;
      let transposedChordIndex = 0;
      if((Object.keys(chordMapb).indexOf(transposedChord) + transposedSemitones)>12){
        transposedChordIndex = ((Object.keys(chordMapb).indexOf(transposedChord) + transposedSemitones) - 12) % 12;
      }else {
        transposedChordIndex = (Object.keys(chordMapb).indexOf(transposedChord) + transposedSemitones) % 12;
      }
      const finalChord = Object.keys(chordMapb)[transposedChordIndex]; 
      return finalChord;
    }
    else {
      return chord;
    }
  }
}
export function linhaModulada(linha: string, semiton: number):string { 
//    const regex1 = /\[([A-Za-z0-9º\-\+#\/]+)\]/gi;
    const regex2 = /([CDEFGAB][#b]?)/gm;
    
    let matchAcorde;

    function aplicaTranspose(regex: RegExp, acorde: string, semiton: number):string {
        let novo_acorde = '';
        while ((matchAcorde = regex.exec(acorde)) !== null) {
          novo_acorde = acorde.replace(matchAcorde[1],transposeChord(matchAcorde[1], semiton));
        }
      return novo_acorde;
    }

    let posicaoInicial = 0;
    let posicaoFinal = 0;
    let nova_linha = '';
    let pos_relativa = 0;
    let tamanho_acorde = 0;
    for (let i = 0; i < linha.length; i++) {
      
      nova_linha = nova_linha + linha[i];
      pos_relativa = pos_relativa + 1;
      
      if (linha[i] === '[') {
        posicaoInicial = i;
      }
      if (linha[i] === ']') {
        posicaoFinal = i;

        let acorde_modulado = '';
        const acordes = linha.slice(posicaoInicial+1, posicaoFinal).split('/');
        for (let j = 0; j < acordes.length; j++) {
          if(aplicaTranspose(regex2, acordes[j], semiton)===''){
            acorde_modulado = acorde_modulado + '/' + acordes[j];
          } else {
            acorde_modulado = acorde_modulado + '/' + aplicaTranspose(regex2, acordes[j], semiton);
          }
        }
        
        acorde_modulado = acorde_modulado.slice(1);

        tamanho_acorde = posicaoFinal - posicaoInicial - 1;
        pos_relativa = pos_relativa - tamanho_acorde - 2;
        nova_linha = nova_linha.slice(0, pos_relativa) + '[' + acorde_modulado + ']';
        pos_relativa = pos_relativa + acorde_modulado.length + 2;

      }

      //alert(posicaoInicial + ' ! ' + posicaoFinal + ' ! ' + tamanho_acorde + ' ! ' + pos_relativa + ' ! ' + ' {' + nova_linha + '}');

    }

    return nova_linha;
      
};
