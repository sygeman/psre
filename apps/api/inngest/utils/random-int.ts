export function randomInt(n: number) {
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 1) {
      throw new Error('n должно быть цserелым числом больше 0');
    }
    return Math.floor(Math.random() * n) + 1;
  }
