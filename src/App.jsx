import { useRef } from "react";
import { GlobalNav } from "./components/Navs";
import Stage from "./components/Stage";
import Highlights from "./components/Highlights";
import { Overview, ServicesMacro, ServicesGallery, Performance, About } from "./components/Chapters";
import Comparison from "./components/Comparison";
import Pricing from "./components/Pricing";
import { Directory, Footer } from "./components/Ending";
import { ScrollStroke } from "./components/ui/svg-follow-scroll";

export default function App() {
  const mainRef = useRef(null);

  return (
    <>
      <GlobalNav />
      <main ref={mainRef}>
        <Stage />
        <Overview />
        <Highlights />
        <ServicesMacro />
        <ServicesGallery />
        <Performance />
        <About />
        <Comparison />
        <Pricing />
        <Directory />
        <ScrollStroke alvo={mainRef} />
      </main>
      <Footer />
    </>
  );
}
