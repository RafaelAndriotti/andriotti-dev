import { GlobalNav } from "./components/Navs";
import Stage from "./components/Stage";
import Highlights from "./components/Highlights";
import { Overview, ServicesMacro, ServicesGallery, Performance, About } from "./components/Chapters";
import Comparison from "./components/Comparison";
import Pricing from "./components/Pricing";
import { Directory, Footer } from "./components/Ending";

export default function App() {
  return (
    <>
      <GlobalNav />
      <main>
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
      </main>
      <Footer />
    </>
  );
}
