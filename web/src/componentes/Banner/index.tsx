import estilos from './Banner.module.scss';

const Banner = () => {
  
  return (<section className={estilos.BannerArea}>
    <div className={estilos.Container}>
      <div className={estilos.AnimatedText}>
        O Espírito Santo sopra onde quer
      </div>
    </div>
  </section>)
}

export default Banner