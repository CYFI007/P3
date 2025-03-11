const AudioContext1 = new AudioContext()
let oscillator, carrier, gainNode;
let isPlaying = false;


const startbutton = document.getElementById("startbtn");
const stopbutton = document.getElementById("stopbtn");
const carrierfreqslider = document.getElementById("carrierfreq");
const freqvalue = document.getElementById("freqvalue");
const gain1 = document.getElementById("gainwheel");
const gainvalue = document.getElementById("gainvalue")

let myGain = AudioContext1.createGain();  
myGain.gain.value = 0.5; 

const updateGain = function ()  {
    let gainVal = parseFloat(gain1.value)
    let scaledGain = gainVal / 10
    myGain.gain.value = scaledGain;
};

gain1.addEventListener("input", updateGain);

startbutton.addEventListener("click", () => {
if (isPlaying) return;






oscillator = AudioContext1.createOscillator();        //osc creating
oscillator.type = "sine";
oscillator.frequency.value = 440;

carrier = AudioContext1.createOscillator();
carrier.type = "sine";
carrier.frequency.value = parseFloat(carrierfreqslider.value)

carrier.connect(myGain);
oscillator.connect(myGain);
myGain.connect(AudioContext1.destination);

oscillator.start();
carrier.start();
isPlaying = true;
});

stopbutton.addEventListener("click", () =>  {
    if (!isPlaying) return;
    oscillator.stop()
    carrier.stop()
    isPlaying = false
});

carrierfreqslider.addEventListener("input", (event) =>  {
    const value = parseFloat(event.target.value);
    freqvalue.textContent = value;
    if (carrier)   {
        carrier.frequency.setValueAtTime(value, AudioContext1.currentTime);
    }
});


