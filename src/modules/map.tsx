import { createSignal, For } from 'solid-js';
import { LaboratoryBuilding } from '@/components/laboratory-building';
import { SawmillBuilding } from '@/components/sawmill-building';
import { FarmBuilding } from '@/components/farm-building';
import { GasStationBuilding } from '@/components/gas-station-building';
import { SteelPlantBuilding } from '@/components/steel-plant-building';

type Building = {
  id: string;
  type: 'laboratory' | 'sawmill' | 'farm' | 'gasStation' | 'steelPlant';
};

export const Map = () => {
  const [buildings] = createSignal<Building[]>([
    { id: '1', type: 'laboratory' },
    { id: '2', type: 'sawmill' },
    { id: '3', type: 'farm' },
    { id: '4', type: 'gasStation' },
    { id: '5', type: 'steelPlant' },
  ]);

  const getBuildingComponent = (building: Building) => {
    const commonProps = {
      onCollect: () => console.log(`Collecting from ${building.type}`),
    };

    switch (building.type) {
      case 'laboratory':
        return <div class="shrink-0 w-40"><LaboratoryBuilding {...commonProps} /></div>;
      case 'sawmill':
        return <div class="shrink-0 w-40"><SawmillBuilding {...commonProps} /></div>;
      case 'farm':
        return <div class="shrink-0 w-40"><FarmBuilding {...commonProps} /></div>;
      case 'gasStation':
        return <div class="shrink-0 w-40"><GasStationBuilding {...commonProps} /></div>;
      case 'steelPlant':
        return <div class="shrink-0 w-40"><SteelPlantBuilding {...commonProps} /></div>;
    }
  };

  return (
    <div 
      class="flex h-full w-full items-center"
      style={{
        "background-image": `
          linear-gradient(to bottom right, rgb(17 24 39), rgb(31 41 55), rgb(17 24 39)),
          url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23374151' fill-opacity='0.4'/%3E%3C/svg%3E")
        `,
        "background-repeat": "repeat",
      }}
    >
      <div class="scrollbar flex gap-8 overflow-x-auto px-8 py-4 w-full">
        <For each={buildings()}>
          {(building) => getBuildingComponent(building)}
        </For>
      </div>
    </div>
  );
};
