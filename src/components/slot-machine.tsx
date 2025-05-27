import { createSignal, createEffect, For } from 'solid-js';

const SYMBOLS = ['🍎', '🍋', '🍇', '🍊', '🍒', '💎', '7️⃣'];
const SPIN_DURATION = 2000; // 2 секунды на вращение

export function SlotMachine() {
  const [reels, setReels] = createSignal([0, 0, 0]);
  const [isSpinning, setIsSpinning] = createSignal(false);
  const [result, setResult] = createSignal('');

  const spinReel = (reelIndex: number, finalIndex: number) => {
    const startTime = Date.now();
    const initialPosition = reels()[reelIndex];
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      if (elapsed < SPIN_DURATION + reelIndex * 500) {
        // Разная скорость для каждого барабана
        const speed = 10 - (elapsed / SPIN_DURATION) * 8;
        setReels(prev => {
          const newReels = [...prev];
          newReels[reelIndex] = (newReels[reelIndex] + speed) % SYMBOLS.length;
          return newReels;
        });
        requestAnimationFrame(animate);
      } else {
        // Остановка на финальном символе
        setReels(prev => {
          const newReels = [...prev];
          newReels[reelIndex] = finalIndex;
          return newReels;
        });

        // Проверка результата после остановки последнего барабана
        if (reelIndex === 2) {
          const finalReels = reels();
          if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
            setResult('Победа! 🎉');
          } else {
            setResult('Попробуйте еще раз');
          }
          setIsSpinning(false);
        }
      }
    };

    requestAnimationFrame(animate);
  };

  const spin = () => {
    if (isSpinning()) return;
    
    setIsSpinning(true);
    setResult('');
    
    // Генерируем случайные конечные позиции для каждого барабана
    const finalPositions = Array.from({ length: 3 }, () => 
      Math.floor(Math.random() * SYMBOLS.length)
    );
    
    // Запускаем анимацию для каждого барабана с небольшой задержкой
    finalPositions.forEach((finalPos, index) => {
      spinReel(index, finalPos);
    });
  };

  return (
    <div class="flex flex-col items-center gap-6">
      <div class="flex gap-2 p-6 bg-slate-800 rounded-xl shadow-lg">
        <For each={reels()}>
          {(reelPos, index) => (
            <div class="w-24 h-24 bg-slate-700 rounded-lg flex items-center justify-center text-4xl overflow-hidden">
              {SYMBOLS[Math.floor(reelPos)]}
            </div>
          )}
        </For>
      </div>
      
      <div class="h-[40px] flex items-center">
        {result() && (
          <div class={`text-xl font-medium ${
            result().includes('Победа') ? 'text-green-500' : 'text-slate-400'
          }`}>
            {result()}
          </div>
        )}
      </div>

      <button
        onClick={spin}
        disabled={isSpinning()}
        class={`px-8 py-3 rounded-lg text-white font-medium transition-colors ${
          isSpinning()
            ? 'bg-slate-600 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {isSpinning() ? 'Крутится...' : 'Крутить'}
      </button>
    </div>
  );
} 