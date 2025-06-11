import { Component } from "solid-js";
import { BackLayout } from "@psre/layouts";
import { useNavigate } from "@solidjs/router";

const MiniGames: Component = () => {
  const navigate = useNavigate();

  return (
    <BackLayout title="Мини-игры">
      <div class="flex h-full flex-col">
        <div class="hide-scrollbar flex-1 overflow-y-auto">
          <div class="space-y-2 p-2">
            <div
              class="bg-slate-800/50 rounded-lg overflow-hidden hover:bg-slate-800 transition-colors duration-300 border border-slate-700/25 cursor-pointer"
              onClick={() => navigate("/mini-games/slots")}
            >
              <div class="flex items-center gap-3 p-3">
                <div class="flex-shrink-0 w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">
                  💎
                </div>
                <div>
                  <h2 class="text-lg font-bold text-slate-100">
                    Испытай удачу
                  </h2>
                  <p class="text-sm text-slate-400">
                    Крутите барабаны и выигрывайте до 50,000 ресурсов или 1000
                    алмазов!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackLayout>
  );
};

export default MiniGames;
