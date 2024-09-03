import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useSetArquivo } from '../state/hooks/useSetArquivo';
import { useArquivo } from '../state/hooks/useArquivo';
import { TextField } from '@mui/material';

interface IProps {
    nome: string;
    campo: string;
    conteudo: string | string[];
}
export default function BasicPopover({nome, campo, conteudo}: IProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const setArquivo = useSetArquivo();
  const arquivo = useArquivo();


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(Array.isArray(conteudo)) {      
      setArquivo({ ...arquivo, [campo]: event.target.value.split(',') });
    } else
      setArquivo({ ...arquivo, [campo]: event.target.value });
  }


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Button onClick={handleClick}>
        {nome}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <TextField defaultValue={conteudo} onChange={handleUpdate}></TextField>
      </Popover>
    </>
  );
}