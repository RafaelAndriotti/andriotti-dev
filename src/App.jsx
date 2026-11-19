import { GlobalNav, LocalNav } from "./components/Navs";
import Stage from "./components/Stage";
import Highlights from "./components/Highlights";
import { Overview, ServicesMacro, ServicesGallery, Performance, About } from "./components/Chapters";
import Comparison from "./components/Comparison";
import Pricing from "./components/Pricing";
import { Directory, Footer } from "./components/Ending";
import { useInView } from "./hooks/useInView";

export default function App() {
  // A barra flutuante aparece quando a abertura sai da tela
  const [stageRef, stageVisivel] = useInView({ threshold: 0.15, once: false });

  return (
    <>
      <GlobalNav />
      <LocalNav visivel={!stageVisivel} />
      <main>
        <Stage ref={stageRef} />
        <Overview />
        <Highlights />
        <ServicesMacro />
        <ServicesGallery />
        <Performance />
        <About />
        <Comparison />
        <Pricing />
        <Directory />
      </main>
      <Footer />
    </>
  );
}
