import { Component } from "solid-js";
import { BackLayout } from '@/layouts/back-layout';
import { useNavigate } from '@solidjs/router';

const MiniGames: Component = () => {
  const navigate = useNavigate();

  return (
    <BackLayout title="Мини-игры">
      <div class="flex h-full flex-col">
        <div class="hide-scrollbar flex-1 overflow-y-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            <div 
              class="bg-slate-800/50 rounded-lg overflow-hidden hover:bg-slate-800 transition-colors duration-300 border border-slate-700/25 cursor-pointer"
              onClick={() => navigate('/mini-games/slots')}
            >
              <div class="aspect-video bg-slate-700 flex items-center justify-center text-6xl">
                🎰
              </div>
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-2 text-slate-100">Испытай удачу</h2>
                <p class="text-slate-400 mb-4">
                  Крутите барабаны и выигрывайте ценные ресурсы: 10,000 еды, древесины, стали или топлива, а также 100 алмазов!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackLayout>
  );
};

export default MiniGames;