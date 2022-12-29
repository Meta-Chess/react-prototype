type Projection = (boardCoordinates: {
  file: number;
  rank: number;
  numberOfFiles: number;
  numberOfRanks: number;
  heightAdjustment?: number;
}) => { position: [number, number, number]; normal: [number, number, number] };
