import { createSignal, For, Index } from 'solid-js';
import { RESOURCES } from '@/constants/resources';
import { accountState } from '@/stores/state';

const SYMBOLS = [
  RESOURCES.FOOD.icon,   // 🌾
  RESOURCES.WOOD.icon,   // 🪵
  RESOURCES.STEEL.icon,  // 🔩
  RESOURCES.FUEL.icon,   // 🛢️
  RESOURCES.DIAMOND.icon // 💎
];

const REWARDS = {
  [RESOURCES.FOOD.icon]: { amount: 10000, name: 'еды' },
  [RESOURCES.WOOD.icon]: { amount: 10000, name: 'древесины' },
  [RESOURCES.STEEL.icon]: { amount: 10000, name: 'стали' },
  [RESOURCES.FUEL.icon]: { amount: 10000, name: 'топлива' },
  [RESOURCES.DIAMOND.icon]: { amount: 100, name: 'алмазов' }
};

const SPIN_DURATION = 2000;
const SYMBOL_HEIGHT = 96; // высота символа в пикселях

export function SlotMachine() {
  const [positions, setPositions] = createSignal([0, 0, 0]);
  const [isSpinning, setIsSpinning] = createSignal(false);
  const [result, setResult] = createSignal('');

  const addReward = (symbol: string) => {
    const reward = REWARDS[symbol];
    switch(symbol) {
      case RESOURCES.FOOD.icon:
        accountState.food += reward.amount;
        break;
      case RESOURCES.WOOD.icon:
        accountState.wood += reward.amount;
        break;
      case RESOURCES.STEEL.icon:
        accountState.steel += reward.amount;
        break;
      case RESOURCES.FUEL.icon:
        accountState.fuel += reward.amount;
        break;
      case RESOURCES.DIAMOND.icon:
        accountState.diamond += reward.amount;
        break;
    }
    return reward;
  };

  const spinReel = (reelIndex: number, finalIndex: number) => {
    const startTime = Date.now();
    const totalRotations = 10 + reelIndex * 2; // Количество полных оборотов + доп. обороты для каждого следующего барабана
    const finalPosition = (totalRotations * SYMBOLS.length + finalIndex) * SYMBOL_HEIGHT;
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const duration = SPIN_DURATION + reelIndex * 500;
      
      if (elapsed < duration) {
        // Нелинейная анимация с замедлением
        const progress = elapsed / duration;
        const easeOut = 1 - Math.pow(1 - progress, 3); // Кубическая функция замедления
        const currentPosition = easeOut * finalPosition;
        
        setPositions(prev => {
          const next = [...prev];
          next[reelIndex] = currentPosition;
          return next;
        });
        
        requestAnimationFrame(animate);
      } else {
        // Установка финальной позиции
        setPositions(prev => {
          const next = [...prev];
          next[reelIndex] = finalPosition;
          return next;
        });

        if (reelIndex === 2) {
          const finalSymbols = [0, 1, 2].map(i => 
            Math.floor((positions()[i] / SYMBOL_HEIGHT) % SYMBOLS.length)
          );
          if (finalSymbols[0] === finalSymbols[1] && finalSymbols[1] === finalSymbols[2]) {
            const winningSymbol = SYMBOLS[finalSymbols[0]];
            const reward = addReward(winningSymbol);
            setResult(`Победа! 🎉 Получено ${reward.amount} ${reward.name}`);
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
    
    const finalPositions = Array.from({ length: 3 }, () => 
      Math.floor(Math.random() * SYMBOLS.length)
    );
    
    finalPositions.forEach((finalPos, index) => {
      setTimeout(() => {
        spinReel(index, finalPos);
      }, index * 200);
    });
  };

  const getVisibleSymbols = (reelPosition: number) => {
    const symbols = [];
    // Показываем 3 символа для создания эффекта прокрутки
    for (let i = -1; i <= 1; i++) {
      const adjustedPosition = Math.floor(reelPosition / SYMBOL_HEIGHT);
      const symbolIndex = Math.abs((adjustedPosition + i) % SYMBOLS.length);
      symbols.push(SYMBOLS[symbolIndex]);
    }
    return symbols;
  };

  return (
    <div class="flex flex-col items-center gap-6">
      <div class="flex gap-2 p-6 bg-slate-800 rounded-xl shadow-lg">
        <For each={positions()}>
          {(position, index) => (
            <div class="w-24 h-24 bg-slate-700 rounded-lg relative overflow-hidden">
              <div 
                class="absolute left-0 w-full transition-transform"
                style={{
                  "transform": `translateY(${-position % (SYMBOL_HEIGHT * SYMBOLS.length)}px)`,
                  "transition-duration": isSpinning() ? "0ms" : "500ms"
                }}
              >
                <Index each={[...SYMBOLS, ...SYMBOLS]}>
                  {(symbol) => (
                    <div class="w-full h-24 flex items-center justify-center text-4xl">
                      {symbol()}
                    </div>
                  )}
                </Index>
              </div>
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