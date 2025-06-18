import { BackLayout } from "@/layouts/back-layout";
import { createSignal, Match, Switch } from "solid-js";
import { MATERIALS_CONFIG, WEAPONS_CONFIG, RESOURCES } from "@/constants";
import { accountState } from "@/stores/state";
import { ResourceDisplay } from "@/components/resource-display";

export function ArmoryPage() {
  const [activeTab, setActiveTab] = createSignal<"weapons" | "materials">(
    "weapons",
  );

  // Состояния для материалов
  const [productionProgress, setProductionProgress] = createSignal(0);
  const [timeLeft, setTimeLeft] = createSignal(0);
  const [isProducing, setIsProducing] = createSignal(false);

  // Состояния для оружия
  const [weaponProgress, setWeaponProgress] = createSignal(0);
  const [weaponTimeLeft, setWeaponTimeLeft] = createSignal(0);
  const [isCreatingWeapon, setIsCreatingWeapon] = createSignal(false);

  let productionTimer: number;
  let weaponTimer: number;

  const startWeaponCreation = () => {
    if (isCreatingWeapon()) return;

    setIsCreatingWeapon(true);
    setWeaponTimeLeft(WEAPONS_CONFIG.productionTime);
    setWeaponProgress(0);

    weaponTimer = setInterval(() => {
      setWeaponTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(weaponTimer);
          setIsCreatingWeapon(false);
          setWeaponProgress(100);
          return 0;
        }
        setWeaponProgress(
          ((WEAPONS_CONFIG.productionTime - newTime) /
            WEAPONS_CONFIG.productionTime) *
            100,
        );
        return newTime;
      });
    }, 1000);
  };

  const handleWeaponSpeedUp = () => {
    clearInterval(weaponTimer);
    setIsCreatingWeapon(false);
    setWeaponProgress(100);
    setWeaponTimeLeft(0);
  };

  const collectWeapon = () => {
    // Здесь будет логика получения оружия
    setWeaponProgress(0);
    setWeaponTimeLeft(0);
  };

  const startProduction = () => {
    if (isProducing()) return;

    setIsProducing(true);
    setTimeLeft(MATERIALS_CONFIG.productionTime);
    setProductionProgress(0);

    productionTimer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(productionTimer);
          setIsProducing(false);
          setProductionProgress(100);
          return 0;
        }
        setProductionProgress(
          ((MATERIALS_CONFIG.productionTime - newTime) /
            MATERIALS_CONFIG.productionTime) *
            100,
        );
        return newTime;
      });
    }, 1000);
  };

  const handleSpeedUp = () => {
    clearInterval(productionTimer);
    setIsProducing(false);
    setProductionProgress(100);
    setTimeLeft(0);
  };

  const collectProduction = () => {
    // Здесь будет логика получения запчастей
    setProductionProgress(0);
    setTimeLeft(0);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, "0")}`;
  };

  return (
    <BackLayout
      title="Арсенал"
      rightContent={
        <div class="px-2">
          <ResourceDisplay
            icon={MATERIALS_CONFIG.icon}
            value={accountState.materials}
          />
        </div>
      }
    >
      <div class="flex h-full flex-col">
        {/* Вкладки */}
        <div class="grid grid-cols-2 border-b border-slate-700/25">
          <button
            class={`p-4 text-sm ${
              activeTab() === "weapons"
                ? "border-b-2 border-blue-500 font-medium"
                : "text-slate-400"
            }`}
            onClick={() => setActiveTab("weapons")}
          >
            Изготовление оружия
          </button>
          <button
            class={`p-4 text-sm ${
              activeTab() === "materials"
                ? "border-b-2 border-blue-500 font-medium"
                : "text-slate-400"
            }`}
            onClick={() => setActiveTab("materials")}
          >
            Производство запчастей
          </button>
        </div>

        {/* Контент вкладок */}
        <div class="hide-scrollbar flex-1 overflow-y-auto">
          <Switch>
            <Match when={activeTab() === "weapons"}>
              <div class="flex flex-col h-full">
                <div class="flex-1 p-4">
                  <div class="flex items-center justify-center">
                    <div class="flex h-24 w-24 items-center justify-center rounded-lg bg-slate-800 text-4xl">
                      {WEAPONS_CONFIG.icon}
                    </div>
                  </div>
                  <div class="mt-4 text-center">
                    <div class="text-lg font-medium">{WEAPONS_CONFIG.name}</div>
                    <div class="mt-2 text-sm text-slate-400">
                      Требуется: {MATERIALS_CONFIG.icon}{" "}
                      {WEAPONS_CONFIG.requiredMaterials}
                    </div>
                    {isCreatingWeapon() && (
                      <>
                        <div class="mt-4 px-4">
                          <div class="h-2 w-full overflow-hidden rounded-full bg-slate-700">
                            <div
                              class="h-full bg-blue-500 transition-all duration-300"
                              style={{ width: `${weaponProgress()}%` }}
                            />
                          </div>
                        </div>
                        <div class="mt-2 text-sm text-slate-400">
                          {formatTime(weaponTimeLeft())}
                        </div>
                      </>
                    )}
                    {!isCreatingWeapon() && (
                      <div class="mt-2 text-sm text-slate-400">3:00</div>
                    )}
                  </div>
                </div>
                <div class="flex-shrink-0 p-4 border-t border-slate-700/25">
                  {isCreatingWeapon() ? (
                    <button
                      onClick={handleWeaponSpeedUp}
                      class="w-full rounded-lg bg-purple-500 py-3 text-sm font-medium text-white hover:bg-purple-600"
                    >
                      Ускорить за {RESOURCES.DIAMOND.icon}{" "}
                      {WEAPONS_CONFIG.speedUpCost}
                    </button>
                  ) : (
                    <button
                      onClick={
                        weaponProgress() === 100
                          ? collectWeapon
                          : startWeaponCreation
                      }
                      class="w-full rounded-lg bg-blue-500 py-3 text-sm font-medium text-white hover:bg-blue-600"
                    >
                      {weaponProgress() === 100 ? "Забрать" : "Создать оружие"}
                    </button>
                  )}
                </div>
              </div>
            </Match>

            <Match when={activeTab() === "materials"}>
              <div class="flex flex-col h-full">
                <div class="flex-1 p-4">
                  <div class="flex items-center justify-center">
                    <div class="flex h-24 w-24 items-center justify-center rounded-lg bg-slate-800 text-4xl">
                      {MATERIALS_CONFIG.icon}
                    </div>
                  </div>
                  <div class="mt-4 text-center">
                    <div class="text-lg font-medium">
                      {MATERIALS_CONFIG.name}
                    </div>
                    {isProducing() && (
                      <>
                        <div class="mt-4 px-4">
                          <div class="h-2 w-full overflow-hidden rounded-full bg-slate-700">
                            <div
                              class="h-full bg-blue-500 transition-all duration-300"
                              style={{ width: `${productionProgress()}%` }}
                            />
                          </div>
                        </div>
                        <div class="mt-2 text-sm text-slate-400">
                          {formatTime(timeLeft())}
                        </div>
                      </>
                    )}
                    {!isProducing() && (
                      <div class="mt-2 text-sm text-slate-400">6:00</div>
                    )}
                  </div>
                </div>
                <div class="flex-shrink-0 p-4 border-t border-slate-700/25">
                  {isProducing() ? (
                    <button
                      onClick={handleSpeedUp}
                      class="w-full rounded-lg bg-purple-500 py-3 text-sm font-medium text-white hover:bg-purple-600"
                    >
                      Ускорить за {RESOURCES.DIAMOND.icon}{" "}
                      {MATERIALS_CONFIG.speedUpCost}
                    </button>
                  ) : (
                    <button
                      onClick={
                        productionProgress() === 100
                          ? collectProduction
                          : startProduction
                      }
                      class="w-full rounded-lg bg-blue-500 py-3 text-sm font-medium text-white hover:bg-blue-600"
                    >
                      {productionProgress() === 100 ? "Забрать" : "Изготовить"}
                    </button>
                  )}
                </div>
              </div>
            </Match>
          </Switch>
        </div>
      </div>
    </BackLayout>
  );
}
