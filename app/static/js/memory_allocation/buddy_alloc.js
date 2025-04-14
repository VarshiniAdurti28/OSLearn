const MAX_MEMORY = 1024;
let blocks = [{ size: MAX_MEMORY, allocated: false, children: null }];

function nextPowerOf2(n) {
  return Math.pow(2, Math.ceil(Math.log2(n)));
}

function render() {
  const container = document.getElementById('memoryTree');
  container.innerHTML = '';
  blocks.forEach(root => container.appendChild(renderBlock(root)));
}



function renderBlock(block) {
   
  const node = document.createElement('div');
  node.className = 'node';
  node.textContent = `${block.size} KB`;

  if (block.highlight) {
    node.style.borderColor = '#007bff';
    node.style.backgroundColor = '#e6f0ff';
  } else {
    node.style.borderColor = block.allocated ? '#28a745' : block.children ? '#ccc' : '#ffc107';
    node.style.backgroundColor = block.allocated ? '#28a745' : 'white';
  }

  if (block.allocated) node.classList.add('allocated');
  if (!block.allocated && !block.children) node.classList.add('buddy-border');

  if (block.allocated) {
    node.onclick = () => deallocate(block);
  }

  if (block.children) {
    const wrapper = document.createElement('div');
    wrapper.style.textAlign = 'center';

    const childContainer = document.createElement('div');
    childContainer.className = 'children';

    const leftConnector = document.createElement('div');
    leftConnector.className = 'connector left';
    const rightConnector = document.createElement('div');
    rightConnector.className = 'connector right';

    const leftCol = document.createElement('div');
    const rightCol = document.createElement('div');

    leftCol.appendChild(renderBlock(block.children[0]));
    rightCol.appendChild(renderBlock(block.children[1]));

    childContainer.appendChild(leftCol);
    childContainer.appendChild(rightCol);

    wrapper.appendChild(node);
    wrapper.appendChild(leftConnector);
    wrapper.appendChild(rightConnector);
    wrapper.appendChild(childContainer);
    return wrapper;
  }

  return node;
}

function highlightBlock(block) {
    const allNodes = document.querySelectorAll('.node');
    allNodes.forEach(el => {
      if (el.textContent.includes(`${block.size} KB`)) {
        el.style.borderColor = '#007bff';
      }
    });
  }
  
function unhighlightBlock(block) {
    const allNodes = document.querySelectorAll('.node');
    allNodes.forEach(el => {
        if (el.textContent.includes(`${block.size} KB`)) {
        el.style.borderColor = block.allocated ? '#28a745' : (block.children ? '#ccc' : '#ffc107');
        }
    });
}
  

function allocate() {
    const request = parseInt(document.getElementById('requestSize').value);
    if (!request || request <= 0) return alert('Enter a valid memory size.');
    const size = nextPowerOf2(request);
    let path = [];
  
    function findPath(block) {
      if (block.allocated || block.size < size) return false;
  
      path.push(block);
      if (block.size === size && !block.children) return true;
  
      if (!block.children) {
        const half = block.size / 2;
        block.children = [
          { size: half, allocated: false, children: null, parent: block },
          { size: half, allocated: false, children: null, parent: block }
        ];
      }
  
      for (let child of block.children) {
        if (findPath(child)) return true;
      }
  
      path.pop(); 
      return false;
    }
  
    let found = false;
    for (let block of blocks) {
      path = [];
      if (findPath(block)) {
        found = true;
        break;
      }
    }
  
    if (!found) {
      alert('Not enough memory to allocate.');
      return;
    }
  
    let i = 0;
  
    function animateStep() {
      if (i > 0) path[i - 1].highlight = false;
      if (i < path.length) {
        path[i].highlight = true;
        render();
        i++;
        setTimeout(animateStep, 500);
      } else {
        path[path.length - 1].allocated = true;
        path.forEach(p => p.highlight = false);
        render();
        alert('Allocation complete! Click the green block to deallocate.');
      }
    }
  
    animateStep();
  }
  
  

function deallocate(target) {
  target.allocated = false;
  render();

  function tryMerge(block, delay = 500) {
    const parent = block.parent;
    if (!parent) return;

    const [b1, b2] = parent.children;
    if (!b1.allocated && !b2.allocated && !b1.children && !b2.children) {
      highlightBlocks([b1, b2]);

      setTimeout(() => {
        parent.children = null;
        render();
        setTimeout(() => tryMerge(parent), delay);
      }, delay);
    }
  }

  tryMerge(target);
}

function highlightBlocks(blocksToHighlight) {
  const allNodes = document.querySelectorAll('.node');
  blocksToHighlight.forEach(block => {
    allNodes.forEach(el => {
      if (el.textContent.includes(`${block.size} KB`)) {
        el.style.borderColor = '#ff0000';
        setTimeout(() => el.style.borderColor = '#ffc107', 400);
      }
    });
  });
}

render();