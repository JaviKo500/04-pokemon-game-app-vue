import confetti from 'canvas-confetti';

export const showConfetti = () => {
   confetti({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.6 },
   });
}