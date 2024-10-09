// taskProcessor.js
class TaskProcessor {
  constructor(maxRetries = 3, delayBetweenRetries = 2000) {
    this.taskQueue = [];
    this.maxRetries = maxRetries;
    this.delayBetweenRetries = delayBetweenRetries;
  }
  // Add a new task to the queue
  addTask(taskFn) {
    this.taskQueue.push({
      taskFn,
      retries: 99,
    });
  }

  // Process the task queue
  async processQueue() {
    while (this.taskQueue.length > 0) {
      const task = this.taskQueue.shift();
      await this._processTask(task);
    }
  }

  // Process individual tasks with retry logic
  async _processTask({ taskFn, retries }) {
    try {
      await taskFn();
      console.log("Task completed successfully.");
    } catch (error) {
      if (retries < this.maxRetries) {
        console.log(`Task failed. Retrying (${retries + 1}/${this.maxRetries})...`);
        await this._delay(this.delayBetweenRetries);
        this.addTask(() => taskFn()); // Add it back to the queue with retry
      } else {
        console.error("Task failed after maximum retries.", error);
      }
    }
  }

  // Helper function for delay
  _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = TaskProcessor;
