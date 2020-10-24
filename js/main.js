var context = new (window.AudioContext || window.webkitAudioContext)();
var source = null;
var audioBuffer = null;
var analyser = null;

var gainValue = 1,
    detuneValue = 0,
		bassValue = 0,
		reverbValue = 1;
var addReverb = false;


// Load/buffer user-uploaded audio file.
var fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', function(e) {  
  var reader = new FileReader();
  reader.onload = function(e) {
		context.decodeAudioData(this.result).then(function (buffer) {
			// Store audio buffer for repeated use.
			audioBuffer = buffer;
			
			var buttons = document.querySelectorAll('button');
			buttons[0].disabled = false;
			buttons[1].disabled = false;
		}, function (err) {
		console.log('Error decoding audio file :', err);
		});
	};
  reader.readAsArrayBuffer(this.files[0]);
});


function playSound() {
  source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.loop = false;

  analyser = context.createAnalyser();
  analyser.minDecibels = -90;
  analyser.maxDecibels = 0;
  analyser.smoothingTimeConstant = 0.85;

  var tuna = new Tuna(context);
  
  var gainNode = new tuna.Gain({
    gain: gainValue
  });
  var bassFilter = new tuna.Filter({
    frequency: 400,
    Q: 1,
    gain: bassValue,
    filterType: "lowshelf",
    bypass: 0
  });
  var convolverNode = new tuna.Convolver({
    highCut: 22050,
    lowCut: 20,
    dryLevel: 1,
    wetLevel: 1,
    level: reverbValue,
    impulse: "/audio/Tin IR.wav",
    bypass: 0
  });

  source.connect(analyser).connect(gainNode).connect(bassFilter);
  if(addReverb){
    bassFilter.connect(convolverNode);
    convolverNode.connect(context.destination);
  }else{
    bassFilter.connect(context.destination);
  }
  source.detune.value = detuneValue;
  source.start(0);
  visualize(analyser);
}

function stopSound() {
  if (source) {
    source.stop(0);
  }
}


function generate(){
  detuneValue = parseFloat(-100 * Math.floor((Math.random() * 8 + 5))).toFixed(0);
  bassValue = parseFloat(Math.floor((Math.random()*51 +50))/10).toFixed(1);
  reverbValue = parseFloat(Math.floor((Math.random() * 5 + 1))).toFixed(0);
  if(reverbValue <= 2){
    gainValue = 0.5 - (0.1 * parseFloat(Math.floor((4.3/5)).toFixed(0)));
  }else if (reverbValue <= 3){
    gainValue = 0.3 - (0.1 * parseFloat(Math.floor((4.3/5)).toFixed(0)));
  }else if (reverbValue <= 4){
    gainValue = 0.2 - (0.1 * parseFloat(Math.floor((4.3/5)).toFixed(0)));
  }else if (reverbValue <= 5){
    gainValue = 0.1;
  }

  var gainKnob = document.getElementsByClassName('gainKnob')[0];
  var detuneKnob = document.getElementsByClassName('detuneKnob')[0];
  var bassKnob = document.getElementsByClassName('bassKnob')[0];
  var reverbKnob = document.getElementsByClassName('reverbKnob')[0];

  gainKnob.value = gainValue;
  gainKnob.click();
  document.body.click();
  detuneKnob.value = detuneValue;
  detuneKnob.click();
  bassKnob.value = bassValue;
  bassKnob.click();
  reverbKnob.value = reverbValue;
  reverbKnob.click();
  document.getElementById("reverbBtn").checked = true;
  addReverb = true;
}

function setReverb(){
  addReverb = document.getElementById("reverbBtn").checked;
}