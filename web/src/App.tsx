/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaBaseSubMenu from './componentes/PaginaBase/SubMenu';
import Home from './paginas/Home';
import NotFound from './paginas/NotFound';
import PaginaBase from './componentes/PaginaBase';
import React, { Suspense } from 'react';
import { paginaBase } from './types/Pagina';
import { useItemPagina } from './state/hooks/useItemPagina';

function App() {
  const itemsPagina = useItemPagina()

  return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<PaginaBase />} >
              <Route index element={<Home />} />
              <Route path={`${paginaBase}`} element={<PaginaBaseSubMenu />} >
                {itemsPagina.menu.map(item => {
                  const Component = React.lazy(() => import(`./paginas/PaginasSubMenu/${item}`));
                  return (
                      <Route
                        key={`${itemsPagina.nomePagina}${item}`}
                        path={`${paginaBase}/${item}`}
                        element={<Component />} />
                  );
                })}
              </Route>
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
  );
}

export default App;
