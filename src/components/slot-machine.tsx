import { createSignal, For, Index, createEffect, onCleanup } from 'solid-js';
import { SLOTS_CONFIG } from '@/constants/slots';
import { accountState } from '@/stores/state';

const { SYMBOLS, REWARDS, CHANCES, ATTEMPTS, ANIMATION } = SLOTS_CONFIG;

type SlotSymbol = typeof SYMBOLS[number];

export function SlotMachine() {
  const [positions, setPositions] = createSignal([0, 0, 0]);
  const [isSpinning, setIsSpinning] = createSignal(false);
  const [result, setResult] = createSignal('');
  const [attempts, setAttempts] = createSignal<typeof ATTEMPTS.MAX>(ATTEMPTS.MAX);
  const [nextAttemptTime, setNextAttemptTime] = createSignal<number | null>(null);
  const [winningSymbol, setWinningSymbol] = createSignal<SlotSymbol | null>(null);
  const [timeLeft, setTimeLeft] = createSignal('');
  const [progress, setProgress] = createSignal(100);

  // Восстановление попыток
  createEffect(() => {
    if (attempts() < ATTEMPTS.MAX && !nextAttemptTime()) {
      setNextAttemptTime(Date.now() + ATTEMPTS.RESTORE_TIME);
    }
  });

  // Таймер восстановления и обновления UI
  createEffect(() => {
    const time = nextAttemptTime();
    if (!time) {
      setTimeLeft('');
      setProgress(100);
      return;
    }

    const updateUI = () => {
      const now = Date.now();
      const secondsLeft = Math.max(0, Math.ceil((time - now) / 1000));
      setTimeLeft(`${secondsLeft} сек`);
      
      const elapsed = ATTEMPTS.RESTORE_TIME - (time - now);
      setProgress(Math.min(100, Math.max(0, (elapsed * 100) / ATTEMPTS.RESTORE_TIME)));

      if (now >= time) {
        setAttempts(ATTEMPTS.MAX);
        setNextAttemptTime(null);
      }
    };

    updateUI();
    const interval = setInterval(updateUI, 100);
    onCleanup(() => clearInterval(interval));
  });

  const addReward = (symbol: string) => {
    const reward = REWARDS[symbol];
    switch(symbol) {
      case SYMBOLS[0]: // FOOD
        accountState.food += reward.amount;
        break;
      case SYMBOLS[1]: // WOOD
        accountState.wood += reward.amount;
        break;
      case SYMBOLS[2]: // STEEL
        accountState.steel += reward.amount;
        break;
      case SYMBOLS[3]: // FUEL
        accountState.fuel += reward.amount;
        break;
      case SYMBOLS[4]: // DIAMOND
        accountState.diamond += reward.amount;
        break;
    }
    return reward;
  };

  const determineOutcome = () => {
    const chance = Math.random() * 100;
    const totalWinChance = CHANCES.REGULAR + CHANCES.DIAMOND;
    
    // Если не выпал выигрыш - генерируем проигрышную комбинацию
    if (chance >= totalWinChance) {
      const result = [];
      for (let i = 0; i < 3; i++) {
        let symbol;
        do {
          // Используем только обычные ресурсы для проигрышной комбинации
          symbol = SYMBOLS[Math.floor(Math.random() * (SYMBOLS.length - 1))];
        } while (result.length > 0 && result.every(s => s === symbol));
        result.push(symbol);
      }
      return result;
    }
    
    // Определяем тип выигрыша
    let winningSymbol;
    if (chance < CHANCES.REGULAR) {
      winningSymbol = SYMBOLS[Math.floor(Math.random() * (SYMBOLS.length - 1))];
    } else {
      winningSymbol = SYMBOLS[SYMBOLS.length - 1];
    }
    
    return [winningSymbol, winningSymbol, winningSymbol];
  };

  const spinReel = (reelIndex: number, finalSymbol: typeof SYMBOLS[number]) => {
    const startTime = Date.now();
    const totalRotations = 10 + reelIndex * 2;
    const finalIndex = SYMBOLS.indexOf(finalSymbol);
    const finalPosition = (totalRotations * SYMBOLS.length + finalIndex) * ANIMATION.SYMBOL_HEIGHT;
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const duration = ANIMATION.SPIN_DURATION + reelIndex * 500;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentPosition = easeOut * finalPosition;
        
        setPositions(prev => {
          const next = [...prev];
          next[reelIndex] = currentPosition;
          return next;
        });
        
        requestAnimationFrame(animate);
      } else {
        setPositions(prev => {
          const next = [...prev];
          next[reelIndex] = finalPosition;
          return next;
        });

        if (reelIndex === 2) {
          const finalSymbols = [0, 1, 2].map(i => 
            SYMBOLS[Math.floor((positions()[i] / ANIMATION.SYMBOL_HEIGHT) % SYMBOLS.length)]
          );
          if (finalSymbols[0] === finalSymbols[1] && finalSymbols[1] === finalSymbols[2]) {
            const reward = addReward(finalSymbols[0]);
            setWinningSymbol(finalSymbols[0]);
            setResult('Победа');
          } else {
            setWinningSymbol(null);
            setResult('Проигрыш');
          }
          setIsSpinning(false);
        }
      }
    };

    requestAnimationFrame(animate);
  };

  const spin = () => {
    if (isSpinning() || attempts() <= 0) return;
    
    setAttempts(attempts() - 1 as typeof ATTEMPTS.MAX);
    setIsSpinning(true);
    setResult('');
    setWinningSymbol(null);
    
    const outcome = determineOutcome();
    
    outcome.forEach((symbol, index) => {
      setTimeout(() => {
        spinReel(index, symbol);
      }, index * ANIMATION.REEL_DELAY);
    });
  };

  const getVisibleSymbols = (reelPosition: number) => {
    const symbols = [];
    // Показываем 3 символа для создания эффекта прокрутки
    for (let i = -1; i <= 1; i++) {
      const adjustedPosition = Math.floor(reelPosition / ANIMATION.SYMBOL_HEIGHT);
      const symbolIndex = Math.abs((adjustedPosition + i) % SYMBOLS.length);
      symbols.push(SYMBOLS[symbolIndex]);
    }
    return symbols;
  };

  return (
    <div class="flex h-full flex-col">
      <div class="flex-1 flex flex-col justify-center items-center gap-6 p-4">
        {/* Слот-машина */}
        <div class="relative p-6 bg-slate-800/80 rounded-xl shadow-lg overflow-hidden">
          {/* Градиентный фон */}
          <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />
          
          {/* Светящиеся частицы */}
          <div class="absolute inset-0 opacity-30">
            <div class="absolute w-12 h-12 -left-6 -top-6 bg-white/10 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite]" />
            <div class="absolute w-12 h-12 -right-6 -bottom-6 bg-white/10 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite_0.5s]" />
          </div>

          {/* Барабаны */}
          <div class="relative flex gap-2">
            <For each={positions()}>
              {(position, index) => (
                <div class="w-24 h-24 bg-slate-900/90 rounded-lg relative overflow-hidden backdrop-blur-sm shadow-lg">
                  {/* Блики на барабане */}
                  <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                  <div class="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
                  
                  <div 
                    class="absolute left-0 w-full transition-transform"
                    style={{
                      "transform": `translateY(${-position % (ANIMATION.SYMBOL_HEIGHT * SYMBOLS.length)}px)`,
                      "transition-duration": isSpinning() ? "0ms" : "500ms"
                    }}
                  >
                    <Index each={[...SYMBOLS, ...SYMBOLS]}>
                      {(symbol) => (
                        <div class="relative w-full h-24 flex items-center justify-center text-4xl">
                          {/* Фон ячейки */}
                          <div class="absolute inset-0 bg-slate-800/80" />
                          {/* Разделительная линия */}
                          <div class="absolute bottom-0 left-0 right-0 h-px bg-slate-700/50" />
                          {/* Внутреннее свечение */}
                          <div class="absolute inset-1 bg-gradient-to-b from-white/5 to-transparent rounded-sm" />
                          {/* Символ */}
                          <div class="relative drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">
                            {symbol()}
                          </div>
                        </div>
                      )}
                    </Index>
                  </div>

                  {/* Эффект затемнения сверху и снизу */}
                  <div class="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-slate-900/90 to-transparent" />
                  <div class="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-slate-900/90 to-transparent" />
                </div>
              )}
            </For>
          </div>
        </div>
        
        {/* Информация о попытках */}
        <div class="h-[88px] flex flex-col items-center justify-start gap-3">
          {/* Результат */}
          <div class="h-[40px] flex items-center">
            {result() && result() !== '' && (
              <div class={`flex items-center gap-2 text-lg font-medium ${
                result() === 'Победа' && winningSymbol()
                  ? 'bg-green-500/10 text-green-400 px-4 py-1.5 rounded-lg border border-green-500/20' 
                  : 'text-slate-400'
              }`}>
                {result() === 'Победа' && winningSymbol() ? (
                  <>
                    <span class="text-2xl">{winningSymbol()}</span>
                    <span>+{REWARDS[winningSymbol()].amount.toLocaleString('ru-RU')}</span>
                  </>
                ) : result() === 'Проигрыш' ? (
                  <span>Попробуйте еще раз</span>
                ) : null}
              </div>
            )}
          </div>

          {/* Попытки и шкала */}
          <div class="text-sm text-slate-400 flex flex-col items-center gap-1">
            <div>
              Осталось попыток: {attempts()}
              {attempts() < ATTEMPTS.MAX && timeLeft() && ` • Следующая через ${timeLeft()}`}
            </div>
            {attempts() < ATTEMPTS.MAX && nextAttemptTime() && (
              <div class="w-48 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-blue-500 transition-all duration-100"
                  style={{ width: `${progress()}%` }}
                >
                  {/* Блики на прогресс-баре */}
                  <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-white/20" />
                  <div class="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] animate-[shine_2s_ease-in-out_infinite]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Кнопка внизу как в арсенале */}
      <div class="flex-shrink-0 p-4 border-t border-slate-700/25">
        <button
          onClick={spin}
          disabled={isSpinning() || attempts() <= 0}
          class={`relative w-full rounded-lg py-3 text-sm font-medium text-white transition-colors overflow-hidden ${
            isSpinning() || attempts() <= 0
              ? 'bg-slate-600/50 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {/* Блики на кнопке */}
          <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
          <div class="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
          
          {/* Текст кнопки */}
          <span class="relative">
            {isSpinning() 
              ? 'Крутится...' 
              : attempts() <= 0 
                ? 'Нет попыток' 
                : 'Крутить'}
          </span>
        </button>
      </div>
    </div>
  );
} 