interface CharacterAvatarProps {
  class?: string;
}

export function CharacterAvatar(props: CharacterAvatarProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      class={props.class}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Фоновый круг */}
      <circle cx="12" cy="12" r="11" class="fill-slate-800" />

      {/* Внешнее кольцо */}
      <circle
        cx="12"
        cy="12"
        r="10"
        class="stroke-cyan-500"
        stroke-width="0.5"
        stroke-dasharray="2 1"
      />

      {/* Внутренний шестиугольник */}
      <path
        d="M12 6L16.5 8.5V15.5L12 18L7.5 15.5V8.5L12 6Z"
        class="stroke-purple-500"
        stroke-width="0.5"
        fill="none"
      />

      {/* Вертикальная линия */}
      <line
        x1="12"
        y1="7"
        x2="12"
        y2="17"
        class="stroke-cyan-500"
        stroke-width="0.25"
      />

      {/* Горизонтальная линия */}
      <line
        x1="8"
        y1="12"
        x2="16"
        y2="12"
        class="stroke-purple-500"
        stroke-width="0.25"
      />

      {/* Центральный круг */}
      <circle
        cx="12"
        cy="12"
        r="2"
        class="fill-slate-900 stroke-cyan-500"
        stroke-width="0.5"
      />

      {/* Точки на пересечениях */}
      <circle cx="12" cy="8" r="0.5" class="fill-purple-500" />
      <circle cx="12" cy="16" r="0.5" class="fill-purple-500" />
      <circle cx="8.5" cy="12" r="0.5" class="fill-cyan-500" />
      <circle cx="15.5" cy="12" r="0.5" class="fill-cyan-500" />
    </svg>
  );
}
