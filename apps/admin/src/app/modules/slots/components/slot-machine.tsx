'use client';

import { useState, useEffect, useCallback } from 'react';
import { SLOTS_CONFIG } from '../constants/slots';

const { SYMBOLS, REWARDS, CHANCES, ATTEMPTS, ANIMATION } = SLOTS_CONFIG;

type SlotSymbol = typeof SYMBOLS[number];

export function SlotMachine() {
  const [positions, setPositions] = useState([0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState('');
  const [attempts, setAttempts] = useState<typeof ATTEMPTS.MAX>(ATTEMPTS.MAX);
  const [nextAttemptTime, setNextAttemptTime] = useState<number | null>(null);
  const [winningSymbol, setWinningSymbol] = useState<SlotSymbol | null>(null);
  const [winningAmount, setWinningAmount] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(100);
  
  // Ресурсы игрока (простое состояние)
  const [resources, setResources] = useState({
    food: 50000,
    wood: 50000,
    steel: 50000,
    fuel: 50000,
    diamond: 500,
  });

  // Восстановление попыток
  useEffect(() => {
    if (attempts < ATTEMPTS.MAX && !nextAttemptTime) {
      setNextAttemptTime(Date.now() + ATTEMPTS.RESTORE_TIME);
    }
  }, [attempts, nextAttemptTime]);

  // Таймер восстановления и обновления UI
  useEffect(() => {
    if (!nextAttemptTime) {
      setTimeLeft('');
      setProgress(100);
      return;
    }

    const updateUI = () => {
      const now = Date.now();
      const secondsLeft = Math.max(0, Math.ceil((nextAttemptTime - now) / 1000));
      setTimeLeft(`${secondsLeft} сек`);
      
      const elapsed = ATTEMPTS.RESTORE_TIME - (nextAttemptTime - now);
      setProgress(Math.min(100, Math.max(0, (elapsed * 100) / ATTEMPTS.RESTORE_TIME)));

      if (now >= nextAttemptTime) {
        setAttempts(prev => Math.min(prev + 1, ATTEMPTS.MAX));
        setNextAttemptTime(null);
      }
    };

    updateUI();
    const interval = setInterval(updateUI, 100);
    return () => clearInterval(interval);
  }, [nextAttemptTime]);

  const getRandomAmount = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const addReward = (symbol: SlotSymbol) => {
    const reward = REWARDS[symbol];
    const amount = getRandomAmount(reward.range.min, reward.range.max);

    switch(symbol) {
      case SYMBOLS[0]: // FOOD
        setResources(prev => ({ ...prev, food: prev.food + amount }));
        break;
      case SYMBOLS[1]: // WOOD
        setResources(prev => ({ ...prev, wood: prev.wood + amount }));
        break;
      case SYMBOLS[2]: // STEEL
        setResources(prev => ({ ...prev, steel: prev.steel + amount }));
        break;
      case SYMBOLS[3]: // FUEL
        setResources(prev => ({ ...prev, fuel: prev.fuel + amount }));
        break;
      case SYMBOLS[4]: // DIAMOND
        setResources(prev => ({ ...prev, diamond: prev.diamond + amount }));
        break;
    }

    return { ...reward, amount };
  };

  const determineOutcome = (): SlotSymbol[] => {
    const chance = Math.random() * 100;
    const totalWinChance = CHANCES.REGULAR + CHANCES.DIAMOND;
    
    // Если не выпал выигрыш - генерируем проигрышную комбинацию
    if (chance >= totalWinChance) {
      const result: SlotSymbol[] = [];
      for (let i = 0; i < 3; i++) {
        let symbol: SlotSymbol;
        do {
          // Используем только обычные ресурсы для проигрышной комбинации
          symbol = SYMBOLS[Math.floor(Math.random() * (SYMBOLS.length - 1))] as SlotSymbol;
        } while (result.length > 0 && result.every(s => s === symbol));
        result.push(symbol);
      }
      return result;
    }
    
    // Определяем тип выигрыша
    let winningSymbol: SlotSymbol;
    if (chance < CHANCES.REGULAR) {
      winningSymbol = SYMBOLS[Math.floor(Math.random() * (SYMBOLS.length - 1))] as SlotSymbol;
    } else {
      winningSymbol = SYMBOLS[SYMBOLS.length - 1] as SlotSymbol;
    }
    
    return [winningSymbol, winningSymbol, winningSymbol];
  };

  const spinReel = useCallback((reelIndex: number, finalSymbol: SlotSymbol, isWin: boolean) => {
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
          // Показываем результат только после завершения всех барабанов
          if (isWin) {
            setResult('Победа');
          } else {
            setResult('Проигрыш');
          }
          setIsSpinning(false);
        }
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const spin = () => {
    if (isSpinning) return;
    
    if (attempts <= 0) {
      if (resources.diamond < 100) {
        return;
      }
      setResources(prev => ({ ...prev, diamond: prev.diamond - 100 }));
    } else {
      setAttempts(attempts - 1 as typeof ATTEMPTS.MAX);
    }
    
    setIsSpinning(true);
    setResult('');
    setWinningSymbol(null);
    setWinningAmount(null);
    
    const outcome = determineOutcome();
    const isWin = outcome[0] === outcome[1] && outcome[1] === outcome[2];
    
    // Если выигрыш - добавляем награду сразу
    if (isWin) {
      const { amount } = addReward(outcome[0]);
      setWinningSymbol(outcome[0]);
      setWinningAmount(amount);
    }
    
    outcome.forEach((symbol, index) => {
      setTimeout(() => {
        spinReel(index, symbol, isWin);
      }, index * ANIMATION.REEL_DELAY);
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 flex flex-col p-4">
        {/* Центральная часть с барабанами и результатом */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {/* Слот-машина */}
          <div className="relative p-6 bg-slate-800/80 rounded-xl shadow-lg overflow-hidden">
            {/* Градиентный фон */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />
            
            {/* Светящиеся частицы */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute w-12 h-12 -left-6 -top-6 bg-white/10 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite]" />
              <div className="absolute w-12 h-12 -right-6 -bottom-6 bg-white/10 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite_0.5s]" />
            </div>

            {/* Барабаны */}
            <div className="relative flex gap-2">
              {positions.map((position, index) => (
                <div key={index} className="w-24 h-24 bg-slate-900/90 rounded-lg relative overflow-hidden backdrop-blur-sm shadow-lg">
                  {/* Блики на барабане */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
                  
                  <div 
                    className="absolute left-0 w-full transition-transform"
                    style={{
                      transform: `translateY(${-position % (ANIMATION.SYMBOL_HEIGHT * SYMBOLS.length)}px)`,
                      transitionDuration: isSpinning ? "0ms" : "500ms"
                    }}
                  >
                    {[...SYMBOLS, ...SYMBOLS].map((symbol, symbolIndex) => (
                      <div key={symbolIndex} className="relative w-full h-24 flex items-center justify-center text-4xl">
                        {/* Фон ячейки */}
                        <div className="absolute inset-0 bg-slate-800/80" />
                        {/* Разделительная линия */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-700/50" />
                        {/* Внутреннее свечение */}
                        <div className="absolute inset-1 bg-gradient-to-b from-white/5 to-transparent rounded-sm" />
                        {/* Символ */}
                        <div className="relative drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">
                          {symbol}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Эффект затемнения сверху и снизу */}
                  <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-slate-900/90 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-slate-900/90 to-transparent" />
                </div>
              ))}
            </div>
          </div>

          {/* Результат */}
          <div className="h-[40px] flex items-center">
            {result && result !== '' && (
              <div className={`flex items-center gap-2 text-lg font-medium ${
                result === 'Победа' && winningSymbol
                  ? 'bg-green-500/10 text-green-400 px-4 py-1.5 rounded-lg border border-green-500/20' 
                  : 'text-slate-400'
              }`}>
                {result === 'Победа' && winningSymbol ? (
                  <>
                    <span className="text-2xl">{winningSymbol}</span>
                    <span>+{winningAmount?.toLocaleString('ru-RU')}</span>
                  </>
                ) : result === 'Проигрыш' ? (
                  <span>Попробуйте еще раз</span>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* Попытки и шкала внизу */}
        <div className="h-[60px] text-sm text-slate-400 flex flex-col items-center gap-1 mt-auto">
          <div>Осталось попыток: {attempts}</div>
          {attempts < ATTEMPTS.MAX && nextAttemptTime && (
            <div className="relative w-48 h-6 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-100 flex items-center justify-center text-xs text-white/90 font-medium"
                style={{ width: `${progress}%` }}
              >
                {/* Блики на прогресс-баре */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/20" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] animate-[shine_2s_ease-in-out_infinite]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white/90">
                +1 попытка через {timeLeft}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Кнопка внизу */}
      <div className="flex-shrink-0 p-4 border-t border-slate-700/25">
        <button
          onClick={spin}
          disabled={isSpinning || (attempts <= 0 && resources.diamond < 100)}
          className={`relative w-full rounded-lg py-3 text-sm font-medium text-white transition-colors overflow-hidden ${
            isSpinning || (attempts <= 0 && resources.diamond < 100)
              ? 'bg-slate-600/50 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {/* Блики на кнопке */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
          
          {/* Текст кнопки */}
          <span className="relative">
            {isSpinning 
              ? 'Крутится...' 
              : attempts <= 0 
                ? resources.diamond < 100
                  ? 'Недостаточно алмазов'
                  : '100 💎 за прокрутку'
                : 'Крутить'}
          </span>
        </button>
      </div>
    </div>
  );
} 