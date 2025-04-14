$(document).ready(function () {
  // RAID 0 Visualization
  zingchart.render({
    id: 'raid0-chart',
    data: {
        type: 'bar',
        title: {
            text: `RAID ${raidLevel} Visualization`
        },
        scaleX: {
            label: { text: "Blocks" },
            labels: Array.from({length: numBlocks}, (_, i) => `Block ${i+1}`)
        },
        scaleY: {
            label: { text: "Block Number" },
            values: "0:10:1" // Adjust range based on numBlocks
        },
        plot: {
            valueBox: {
                visible: true,
                text: "%v",
                fontColor: "#fff"
            }
        },
        series: series.map((s, i) => ({
            values: s.values,
            text: `Disk ${i + 1}`,
            backgroundColor: getColor(i)
        }))
    }
});


  zingchart.render({
    id: 'raid1-chart',
    data: {
        type: 'bar',
        title: {
            text: `RAID ${raidLevel} Visualization`
        },
        scaleX: {
            label: { text: "Blocks" },
            labels: Array.from({length: numBlocks}, (_, i) => `Block ${i+1}`)
        },
        scaleY: {
            label: { text: "Block Number" },
            values: "0:10:1" // Adjust range based on numBlocks
        },
        plot: {
            valueBox: {
                visible: true,
                text: "%v",
                fontColor: "#fff"
            }
        },
        series: series.map((s, i) => ({
            values: s.values,
            text: `Disk ${i + 1}`,
            backgroundColor: getColor(i)
        }))
    }
});


  // RAID 5 Visualization
  zingchart.render({
    id: 'raid5-chart',
    data: {
      type: 'raid',
      series: [
        { values: [1,0,1,'P'], text: "Disk 1" },
        { values: [0,1,'P',1], text: "Disk 2" },
        { values: ['P',1,0,1], text: "Disk 3" }
      ]
    }
  });
});

zingchart.render({
    id: 'raid-chart',
    data: {
        type: 'bar',
        title: {
            text: `RAID 10 - Striping over Mirroring`,
            fontSize: 18
        },
        scaleX: {
            label: { text: "Data Blocks" },
            labels: labels
        },
        scaleY: {
            label: { text: "Disk Usage" },
            values: (0,1,2,3,4) // Custom values for block numbers
        },
        plot: {
            tooltip: {
                text: "Block %v",
                decimals: 0
            }
        },
        series: series.map((s, i) => ({
            values: s.values,
            text: `Disk ${i + 1}`,
            backgroundColor: getStripeColor(s.values) // New color function
        }))
    }
});

function getStripeColor(values) {
    // Returns different colors for different block numbers
    const colors = {
        0: '#e2e8f0',    // Empty
        1: '#3b82f6',    // Block 1
        2: '#10b981',    // Block 2
        3: '#f59e0b',    // Block 3
        4: '#ef4444'     // Block 4
    };
    return values.map(v => colors[v] || '#e2e8f0');
}



