class Logger {
  log(message) {
    console.log(`[LOG] ${message}`);
  }

  info(message) {
    console.info(`[INFO] ${message}`);
  }

  error(message) {
    console.error(`[ERROR] ${message}`);
  }

  warn(message) {
    console.warn(`[WARN] ${message}`);
  }
}

module.exports = new Logger();
