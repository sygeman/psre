import { Buildings } from "./buildings/buildings"

export const Map = () => {
  return (
    <div
      class="h-full w-full relative overflow-hidden"
      style={{
        "background-image": `
          radial-gradient(circle at 50% 50%, rgb(30 41 59), rgb(17 24 39)),
          linear-gradient(135deg,
            rgba(234, 88, 12, 0.25) 0%,
            rgba(59, 130, 246, 0.2) 25%,
            rgba(234, 88, 12, 0.25) 50%,
            rgba(147, 51, 234, 0.2) 75%,
            rgba(239, 68, 68, 0.25) 100%
          ),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0V0zm30 30h30v30H30V30zM0 30h30v30H0V30z' fill='%23374151' fill-opacity='0.3'/%3E%3C/svg%3E")
        `,
        "background-size": "cover, 400% 400%, 60px 60px",
        "background-position": "center",
        animation: "background-pan 30s linear infinite",
      }}
    >
      {/* Основной слой с частицами */}
      <div
        class="absolute inset-0 opacity-40"
        style={{
          "background-image": `
            radial-gradient(circle at 50% 50%, transparent 90%, rgb(17 24 39)),
            radial-gradient(circle at 15% 15%, rgba(234, 88, 12, 0.4) 0%, transparent 35%),
            radial-gradient(circle at 85% 15%, rgba(59, 130, 246, 0.4) 0%, transparent 35%),
            radial-gradient(circle at 15% 85%, rgba(147, 51, 234, 0.4) 0%, transparent 35%),
            radial-gradient(circle at 85% 85%, rgba(234, 88, 12, 0.4) 0%, transparent 35%)
          `,
          "background-size": "cover",
          animation: "pulse 3s ease-in-out infinite",
        }}
      />
      {/* Дополнительный слой с движущимися частицами */}
      <div
        class="absolute inset-0 opacity-30"
        style={{
          "background-image": `
            radial-gradient(circle at 30% 30%, rgba(234, 88, 12, 0.5) 0%, transparent 25%),
            radial-gradient(circle at 70% 70%, rgba(234, 88, 12, 0.5) 0%, transparent 25%),
            radial-gradient(circle at 50% 50%, rgba(234, 88, 12, 0.3) 0%, transparent 35%)
          `,
          "background-size": "100% 100%",
          animation: "particles-move 15s ease-in-out infinite alternate",
        }}
      />
      {/* Дополнительный слой с подсветкой */}
      <div
        class="absolute inset-0 opacity-20"
        style={{
          "background-image": `
            linear-gradient(45deg,
              rgba(234, 88, 12, 0.4) 0%,
              transparent 45%,
              transparent 55%,
              rgba(234, 88, 12, 0.4) 100%
            )
          `,
          "background-size": "200% 200%",
          animation: "background-pan 20s linear infinite",
        }}
      />
      <div class="hide-scrollbar grid grid-cols-1 gap-3 overflow-y-auto h-full py-48 px-4 relative z-10">
        <Buildings />
      </div>
    </div>
  )
}
