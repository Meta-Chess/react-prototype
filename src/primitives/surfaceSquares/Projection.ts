type Projection = (
  x: number,
  y: number,
  xCount: number,
  yCount: number
) => { position: [number, number, number]; normal: [number, number, number] };
