$(document).ready(function () {
  // RAID 0 Visualization
  zingchart.render({
    id: 'raid0-chart',
    data: {
      type: 'raid',
      series: [
        { values: [1,0,1,0], text: "Disk 1" },
        { values: [0,1,0,1], text: "Disk 2" }
      ]
    }
  });

  // RAID 1 Visualization
  zingchart.render({
    id: 'raid1-chart',
    data: {
      type: 'raid',
      series: [
        { values: [1,1,1,1], text: "Disk 1" },
        { values: [1,1,1,1], text: "Disk 2" }
      ]
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
