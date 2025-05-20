import { useRef, useEffect } from "react";

interface SquaresProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

export function Squares({
  direction = "right",
  speed = 1,
  borderColor = "#333",
  squareSize = 40,
  hoverFillColor = "#222",
  className,
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number | null>(null);
  const numSquaresY = useRef<number | null>(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.style.background = "#060606";

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const currentSquareSize = Math.max(squareSize, 1);
      numSquaresX.current = Math.ceil(canvas.width / currentSquareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / currentSquareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentSquareSize = Math.max(squareSize, 1);

      const conceptualGridStartX = Math.floor(
        gridOffset.current.x / currentSquareSize
      );
      const conceptualGridStartY = Math.floor(
        gridOffset.current.y / currentSquareSize
      );

      ctx.lineWidth = 0.5;

      for (
        let xGridIdx = 0;
        xGridIdx < (numSquaresX.current || 0);
        xGridIdx++
      ) {
        for (
          let yGridIdx = 0;
          yGridIdx < (numSquaresY.current || 0);
          yGridIdx++
        ) {
          const squareX =
            xGridIdx * currentSquareSize -
            (gridOffset.current.x % currentSquareSize);
          const squareY =
            yGridIdx * currentSquareSize -
            (gridOffset.current.y % currentSquareSize);

          const currentConceptualX = conceptualGridStartX + xGridIdx;
          const currentConceptualY = conceptualGridStartY + yGridIdx;

          const currentHover = hoveredSquareRef.current;
          if (
            currentHover &&
            currentConceptualX === currentHover.x &&
            currentConceptualY === currentHover.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(
              squareX,
              squareY,
              currentSquareSize,
              currentSquareSize
            );
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(
            squareX,
            squareY,
            currentSquareSize,
            currentSquareSize
          );
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / 2
      );
      gradient.addColorStop(0, "rgba(6, 6, 6, 0)");
      gradient.addColorStop(1, "#060606");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      const currentSquareSize = Math.max(squareSize, 1);

      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + currentSquareSize * 1000) %
            currentSquareSize;
          break;
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + currentSquareSize * 1000) %
            currentSquareSize;
          break;
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + currentSquareSize * 1000) %
            currentSquareSize;
          break;
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + currentSquareSize * 1000) %
            currentSquareSize;
          break;
        case "diagonal":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + currentSquareSize * 1000) %
            currentSquareSize;
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + currentSquareSize * 1000) %
            currentSquareSize;
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const currentSquareSize = Math.max(squareSize, 1);

      const effectiveMouseX = mouseX + gridOffset.current.x;
      const effectiveMouseY = mouseY + gridOffset.current.y;

      const hoveredSquareX = Math.floor(effectiveMouseX / currentSquareSize);
      const hoveredSquareY = Math.floor(effectiveMouseY / currentSquareSize);

      hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full border-none block ${className}`}
    />
  );
}
