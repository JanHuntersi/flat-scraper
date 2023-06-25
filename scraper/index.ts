const { Worker: MyWorker } = require('worker_threads');
const url = 'https://www.sreality.cz/en/search/for-sale/apartments';


// Create a function to run the worker
function runWorker(start_index: number) {
    // Create a new worker instance
    const worker = new MyWorker('./worker.ts', { workerData: start_index });
    worker.on('error', (error) => {
        console.error('Worker error:', error);
    });

    // Handle the worker's exit
    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error('Worker stopped with exit code', code);
        }
    });
}

// Call the runWorker() function to start running the worker
runWorker(1);
//runWorker(4);
//runWorker(7);

