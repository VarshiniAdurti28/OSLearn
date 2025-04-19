const container = document.getElementById('container');

    // Loop for 14 rows
    for (let i = 0; i < 21; i++) {
      const row = document.createElement('div');
      row.className = 'row';

      // Loop for 20 divs in each row
      for (let j = 0; j < 24; j++) {
        const box = document.createElement('div');
        box.className = 'hexagon';
        row.appendChild(box);
      }

      container.appendChild(row);
    }

    const cursor = document.querySelector('#cursor');

    const onMouseChangePosition = (event) => {
      cursor.style.left = event.clientX + 'px';
      cursor.style.top = event.clientY + 'px';
    };

    document.addEventListener('mousemove', onMouseChangePosition);