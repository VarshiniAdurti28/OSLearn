from flask import Flask, render_template

app = Flask(__name__, static_folder='static')
app.debug = True


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/team', methods=['GET'])
def team():
    return render_template('team.html')

@app.route('/deadlock/bankers/', methods=['GET'])
def d_bankers():
    return render_template('deadlock/bankers.html')

@app.route('/disk-scheduling', methods=['GET'])
def disk_scheduling():
    return render_template('disk_scheduling/wiki.html')

@app.route('/disk-scheduling/cscan', methods=['GET'])
def ds_cscan():
    return render_template('disk_scheduling/cscan.html', algo='CSCAN')

@app.route('/disk-scheduling/fcfs', methods=['GET'])
def ds_fcfs():
    return render_template('disk_scheduling/fcfs.html', algo='FCFS')

@app.route('/disk-scheduling/scan', methods=['GET'])
def ds_scan():
    return render_template('disk_scheduling/scan.html', algo='SCAN')

@app.route('/disk-scheduling/look', methods=['GET'])
def ds_look():
    return render_template('disk_scheduling/look.html', algo='LOOK')

@app.route('/disk-scheduling/clook', methods=['GET'])
def ds_clook():
    return render_template('disk_scheduling/clook.html', algo='CLOOK')

@app.route('/disk-scheduling/sstf', methods=['GET'])
def ds_sstf():
    return render_template('disk_scheduling/sstf.html', algo='SSTF')

@app.route('/disk-scheduling/compare', methods=['GET'])
def ds_compare():
    return render_template('disk_scheduling/compare.html', algo='Comparison')

@app.route('/file-allocation', methods=['GET'])
def file_allocation():
    return render_template('file_allocation/wiki.html')

@app.route('/file-allocation/indexed', methods=['GET'])
def fa_indexed():
    return render_template('file_allocation/indexed.html', algo='Indexed')

@app.route('/file-allocation/linked', methods=['GET'])
def fa_linked():
    return render_template('file_allocation/linked.html', algo='Linked')

@app.route('/file-allocation/sequential', methods=['GET'])
def fa_sequential():
    return render_template('file_allocation/sequential.html', algo='Sequential')

@app.route('/memory-allocation', methods=['GET'])
def memory_allocation():
    return render_template('memory_allocation/wiki.html')

@app.route('/memory-allocation/mft/', methods=['GET'])
def memory_allocation_mft():
    return render_template('memory_allocation/mft/wiki.html')

@app.route('/memory-allocation/mft/best-fit', methods=['GET'])
def mft_best_fit():
    return render_template('memory_allocation/mft/best_fit.html', algo='Best Fit')

@app.route('/memory-allocation/mft/first-fit', methods=['GET'])
def mft_first_fit():
    return render_template('memory_allocation/mft/first_fit.html', algo='First Fit')

@app.route('/memory-allocation/mft/worst-fit', methods=['GET'])
def mft_worst_fit():
    return render_template('memory_allocation/mft/worst_fit.html', algo='Worst Fit')

@app.route('/memory-allocation/mvt/', methods=['GET'])
def memory_allocation_mvt():
    return render_template('memory_allocation/mvt/wiki.html')

@app.route('/memory-allocation/mvt/best-fit', methods=['GET'])
def mvt_best_fit():
    return render_template('memory_allocation/mvt/best_fit.html', algo='Best Fit')

@app.route('/memory-allocation/mvt/first-fit', methods=['GET'])
def mvt_first_fit():
    return render_template('memory_allocation/mvt/first_fit.html', algo='First Fit')

@app.route('/memory-allocation/mvt/worst-fit', methods=['GET'])
def mvt_worst_fit():
    return render_template('memory_allocation/mvt/worst_fit.html', algo='Worst Fit')

@app.route('/page-replacement', methods=['GET'])
def page_replacement():
    return render_template('page_replacement/wiki.html')

@app.route('/page-replacement/fifo', methods=['GET'])
def pa_fifo():
    return render_template('page_replacement/fifo.html', algo='FIFO')

@app.route('/page-replacement/lru', methods=['GET'])
def pa_lru():
    return render_template('page_replacement/lru.html', algo='LRU')

@app.route('/page-replacement/optimal', methods=['GET'])
def pa_optimal():
    return render_template('page_replacement/optimal.html', algo='Optimal')

@app.route('/paging', methods=['GET'])
def paging():
    return render_template('paging/wiki.html')

@app.route('/paging/single-level', methods=['GET'])
def p_single_level():
    return render_template('paging/single_level.html')

@app.route('/paging/multi-level', methods=['GET'])
def p_multi_level():
    return render_template('paging/multi_level.html')

@app.route('/process-scheduling', methods=['GET'])
def process_scheduling():
  return render_template('process_scheduling/wiki.html')

@app.route('/process-scheduling/fcfs', methods=['GET'])
def ps_fsfc():
  return render_template('process_scheduling/fcfs.html', algo='FCFS')

@app.route('/process-scheduling/priority', methods=['GET'])
def ps_priority():
  return render_template('process_scheduling/priority.html', algo='Priority (Preemptive)')

@app.route('/process-scheduling/round-robin', methods=['GET'])
def ps_round_robin():
  return render_template('process_scheduling/round_robin.html', algo='Round Robin')

@app.route('/process-scheduling/sjf', methods=['GET'])
def ps_sjf():
  return render_template('process_scheduling/sjf.html', algo='SJF')

@app.route('/process-scheduling/ljf', methods=['GET'])
def ps_ljf():
  return render_template('process_scheduling/ljf.html', algo='LJF')

@app.route('/process-scheduling/srtf', methods=['GET'])
def ps_srtf():
  return render_template('process_scheduling/srtf.html', algo='SRTF')

@app.route('/process-scheduling/hrrn', methods=['GET'])
def ps_hrrn():
  return render_template('process_scheduling/hrrn.html', algo='HRRN')
  
@app.route('/process-scheduling/compare', methods=['GET'])
def ps_compare():
  return render_template('process_scheduling/compare.html', algo='Comparison')

@app.route('/process-sync', methods=['GET'])
def process_sync():
    return render_template('process_sync/wiki.html')

@app.route('/process-sync/dining-philosopher', methods=['GET'])
def ps_dining_philosopher():
    return render_template('process_sync/dining_philosopher.html')

@app.route('/process-sync/reader-writer', methods=['GET'])
def ps_reader_writer():
    return render_template('process_sync/reader_writer.html')

@app.route('/process-sync/producer-consumer', methods=['GET'])
def ps_producer_consumer():
    return render_template('process_sync/producer_consumer.html')

@app.route('/process-sync/sleeping-barber', methods=['GET'])
def ps_sleeping_barber():
    return render_template('process_sync/sleeping_barber.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
