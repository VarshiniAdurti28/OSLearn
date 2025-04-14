# OSLearn
An interactive simulator that helps students grasp and learn concepts of Operating systems quickly and efficiently.
This project is developed as a part of the course CS252 - Operating Systems.
## Team members:
- 231CS201 Aalima Khan
- 231CS202 Abhiram Suresh
- 231CS203 Aditya Suresh
- 231CS204 Adurti V l Varshini
- 231CS205 Advaith Nair
- 231CS206 Aman
- 231CS207 Amrit Lathar
- 231CS208 Ananya A K
- 231CS209 Ankush Choudhary
- 231CS210 Karun Suhas

## Running the Website
### Setting Up
- `cd` into `app`
- Execute `python -m venv .venv` to setup a virtual environment
- Start the virtual environment by executing `.venv/Scripts/activate` or `.venv/bin/activate` (for Linux) 
- Install pip dependencies using `pip install -r ./requirements.txt`
### Running
- Make sure you are in the `app` directory and that you have activated the python virtual environment.
- Execute `flask run`
- Open `localhost:5000` in your browser (the port may be different for your system)

## Concepts Covered
- System Calls
- Process Scheduling
    - FCFS
    - SJF
    - SRTF (Extra)
    - Priority
    - Round Robin
    - LJF (Extra)
- Process Synchronization
    - Dining Philosopher
    - Producer Consumer
    - Reader Writer
    - Sleeping Barber (Extra)
- Disk Scheduling
    - FCFS
    - SCAN
    - CSCAN
    - LOOK
    - CLOOK
    - SSTF
- Memory Management
    - MVT
        - Best Fit
        - Worst Fit
        - First Fit
    - MFT
        - Best Fit
        - Worst Fit
        - First Fit
     
    - Buddy Memory Allocation (Extra)
- Page Replacement Algorithms
    - LRU
    - Optimal
    - FIFO
- File Allocation
    - Linked
    - Sequential
    - Indexed
- Deadlock
    - Banker's Algorithm
