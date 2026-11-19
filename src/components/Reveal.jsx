import { useInView } from "../hooks/useInView";

// Envolve um bloco com a animação de entrada suave
export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const [ref, visivel] = useInView();
  return (
    <Tag ref={ref} className={`reveal ${visivel ? "is-visible" : ""} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
