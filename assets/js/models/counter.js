function Counter(counterId, onCount, startIntervalMillis) {
  this.display = document.querySelector('#' + counterId + ' .display');;
  
  this.countUpBtn = document.querySelector('#' + counterId + ' [data-action="up"]');
  this.countUpBtn.addEventListener('click', this.onClickCountUp.bind(this));

  this.countDownBtn = document.querySelector('#' + counterId + ' [data-action="down"]');
  this.countDownBtn.addEventListener('click', this.onClickCountDown.bind(this));

  this.resetBtn = document.querySelector('#' + counterId + ' [data-action="reset"]');
  this.resetBtn.addEventListener('click', this.onClickReset.bind(this));

  this.startBtn = document.querySelector('#' + counterId + ' [data-action="start"]');
  this.startBtn.addEventListener('click', this.onClickStart.bind(this));
  
  this.count = 0;
  this.startIntervalMillis = startIntervalMillis || 500;
  this.onCount = onCount;
}

Counter.prototype.onClickCountDown = function () {
  this.countDown();
  this.updateDisplay();
}

Counter.prototype.onClickCountUp = function () {
  this.countUp();
  this.updateDisplay();
}

Counter.prototype.onClickStart = function () {
  this.start();
}

Counter.prototype.onClickReset = function () {
  this.reset();
  this.updateDisplay();
}

Counter.prototype.start = function() {
  if (!this.intervalId) {
    this.intervalId = setInterval(
      this.onClickCountUp.bind(this),
      this.startIntervalMillis);
  } else {
    this.stop();
  }
}

Counter.prototype.stop = function () {
  clearInterval(this.intervalId);
  this.intervalId = undefined;
}

Counter.prototype.countDown = function () {
  this.count = Math.max(0, this.count - 1);
  this.onCount(this.count);
  return this.count;
}

Counter.prototype.countUp = function() {
  this.count = Math.min(99, this.count + 1);
  this.onCount(this.count);
  return this.count;
}

Counter.prototype.reset = function() {
  this.count = 0;
}

Counter.prototype.updateDisplay = function() {
  this.display.innerHTML = '';
  var text = this.count >= 10 ? this.count.toString() : '0' + this.count.toString();
  this.display.appendChild(document.createTextNode(text));
}
