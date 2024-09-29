import { A, useLocation } from "@solidjs/router";
import { createMemo } from "solid-js";

export const BottomMenu = () => {
  const location = useLocation();
  const home = createMemo(() => location.pathname === "/");

  return (
    <div class="h-16 grid grid-cols-7 w-full bg-slate-800">
      <A
        href={home() ? "/region" : "/"}
        class="flex justify-center items-center"
      >
        {home() ? "Мир" : "Домой"}
      </A>
      <div class="flex justify-center items-center">Герои</div>
      <div class="flex justify-center items-center">Квесты</div>
      <div class="flex justify-center items-center">Сумка</div>
      <div class="flex justify-center items-center">Почта</div>
      <div class="flex justify-center items-center">Альянс</div>
      <div class="flex justify-center items-center">Ещё</div>
    </div>
  );
};
