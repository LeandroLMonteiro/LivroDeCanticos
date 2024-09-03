import Banner from '../../componentes/Banner';
import estilos from './Home.module.scss';
import { ReactComponent as LogoImage } from '../../assets/Logo.svg';

function App() {
  return (
    <section>
      <Banner />
      <div className={estilos.MiniBanners}
           style={{ backgroundImage: `url(${new URL('../../assets/FotoGrupoEventos.png', import.meta.url).href})`, 
                    backgroundSize: 'inside', 
                    backgroundPosition: 'inside', 
                    width: 'fit', 
                    height: 'fit'
                  }} >
        <div className={estilos.CardCentral}>
          <LogoImage />
        </div>
      </div>
    </section>
  );
}

export default App;
