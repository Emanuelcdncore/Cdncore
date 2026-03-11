// Web Worker for BeehivePattern computations
// This moves heavy calculations off the main thread

self.onmessage = function(e) {
  const { type, data } = e.data;
  
  switch(type) {
    case 'generateEdges':
      const edges = generateHexagonalEdges(data.width, data.height, data.hexRadius, data.hexHeight, data.hexWidth);
      self.postMessage({ type: 'edgesGenerated', edges });
      break;
      
    case 'updateMotes':
      const updatedMotes = updateMotesInWorker(data.motes, data.edges, data.deltaTime);
      self.postMessage({ type: 'motesUpdated', motes: updatedMotes });
      break;
      
    default:
      console.warn('Unknown worker message type:', type);
  }
};

function generateHexagonalEdges(width, height, hexRadius, hexHeight, hexWidth) {
  const edges = [];
  const rows = Math.floor(height / hexHeight) + 2;
  const cols = Math.floor(width / hexWidth) + 2;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const offsetX = (row % 2) * (hexWidth / 2);
      const centerX = col * hexWidth + offsetX;
      const centerY = row * hexHeight;
      
      // Generate hexagon edges efficiently
      const hex = generateHexagonEdges(centerX, centerY, hexRadius);
      edges.push(...hex);
    }
  }
  
  return edges;
}

function generateHexagonEdges(x, y, radius) {
  const edges = [];
  const angles = [0, 60, 120, 180, 240, 300];
  
  for (let i = 0; i < 6; i++) {
    const angle1 = (angles[i] * Math.PI) / 180;
    const angle2 = (angles[(i + 1) % 6] * Math.PI) / 180;
    
    const x1 = x + radius * Math.cos(angle1);
    const y1 = y + radius * Math.sin(angle1);
    const x2 = x + radius * Math.cos(angle2);
    const y2 = y + radius * Math.sin(angle2);
    
    edges.push({ x1, y1, x2, y2 });
  }
  
  return edges;
}

function updateMotesInWorker(motes, edges, deltaTime) {
  // Simplified mote update logic for worker
  return motes.map(mote => {
    if (mote.edge) {
      mote.t += mote.speed * mote.direction * deltaTime * 0.001;
      
      if (mote.t > 1) {
        mote.t = 1;
        // Find next edge (simplified logic)
        const randomEdge = edges[Math.floor(Math.random() * edges.length)];
        mote.edge = randomEdge;
        mote.t = 0;
      } else if (mote.t < 0) {
        mote.t = 0;
        mote.direction *= -1;
      }
    }
    
    return mote;
  });
}