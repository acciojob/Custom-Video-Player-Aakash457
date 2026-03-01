// Toggle Play / Pause
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// Update Play Button Icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Skip Forward / Backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle Volume & Playback Rate
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update Progress Bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Seek Video (Click or Drag)
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Error Handling
function handleError() {
  alert("Error loading video. Please check if download.mp4 exists.");
}

// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('error', handleError);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

// Progress bar click & drag
let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);