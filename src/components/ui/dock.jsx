import { Children, cloneElement, isValidElement, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

// Efeito "dock": cada item cresce conforme o cursor se aproxima dele.
// Adaptado para JSX + CSS puro (sem Tailwind/TypeScript) e para itens de texto:
// em vez de animar a largura, anima a escala.
const PADRAO_ESCALA = 1.35;
const PADRAO_DISTANCIA = 120;

export function Dock({ as = "div", className = "", magnification = PADRAO_ESCALA, distance = PADRAO_DISTANCIA, children, ...rest }) {
  const mouseX = useMotionValue(Infinity);
  const reduz = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={`dock ${className}`.trim()}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      {...rest}
    >
      {Children.map(children, (child) =>
        isValidElement(child) && child.type === DockItem
          ? cloneElement(child, { mouseX, magnification: reduz ? 1 : magnification, distance })
          : child
      )}
    </Tag>
  );
}

export function DockItem({ mouseX, magnification = PADRAO_ESCALA, distance = PADRAO_DISTANCIA, className = "", children, ...rest }) {
  const ref = useRef(null);
  const semDock = useMotionValue(Infinity);

  const distanciaAteCentro = useTransform(mouseX ?? semDock, (x) => {
    const r = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - r.x - r.width / 2;
  });
  const escalaAlvo = useTransform(distanciaAteCentro, [-distance, 0, distance], [1, magnification, 1]);
  const scale = useSpring(escalaAlvo, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.a ref={ref} style={{ scale }} className={`dock__item ${className}`.trim()} {...rest}>
      {children}
    </motion.a>
  );
}
