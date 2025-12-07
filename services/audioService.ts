// Simple synth to avoid loading external assets and ensure sound works immediately
const AudioContext = (window.AudioContext || (window as any).webkitAudioContext);
let ctx: AudioContext | null = null;

const initAudio = () => {
  if (!ctx) ctx = new AudioContext();
};

export const playSound = (type: 'success' | 'click' | 'unlock' | 'error') => {
  try {
    initAudio();
    if (!ctx) return;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    const now = ctx.currentTime;

    if (type === 'success') {
      // Coin sound / Success chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'click') {
      // Woodblock / Click
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'unlock') {
      // Power up
      osc.type = 'square';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.3);
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'error') {
      // Buzzer
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.2);
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }

  } catch (e) {
    console.error("Audio play failed", e);
  }
};