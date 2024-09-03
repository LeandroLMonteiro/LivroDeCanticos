import NavBar from '../NavBar';
import Rodape from '../Rodape';
import { Outlet } from 'react-router-dom';

function PaginaBase() {

  return (
    <>
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Rodape />
    </>
  );
}

export default PaginaBase;