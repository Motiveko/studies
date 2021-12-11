interface ScatterProps {
  xs: number[];
  ys: number[];

  xRange: [number, number];
  yRange: [number, number];
  color: string;

  onClick: (x: number, y: number, index: number) => void;
  // hi: string;
}

function shouldUpdate(
  oldProps: ScatterProps,
  newProps: ScatterProps
): boolean {
  let key: keyof ScatterProps;
  for(key in oldProps) {
    if(oldProps[key] !== newProps[key] && REQUIRES_UPDATE[key] ) {
      return true;
    }
  }
  return false;
}


const REQUIRES_UPDATE: {[key in keyof ScatterProps]: boolean} ={
  xs: true,
  ys: true,
  xRange: true,
  yRange: true,
  color: true,
  onClick: false
}