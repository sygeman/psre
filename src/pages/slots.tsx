import { Component } from "solid-js";
import { BackLayout } from '@/layouts/back-layout';
import { SlotMachine } from '@/components/slot-machine';

const SlotsPage: Component = () => {
  return (
    <BackLayout title="Слоты">
      <div class="flex h-full flex-col">
        <div class="hide-scrollbar flex-1 overflow-y-auto">
          <div class="flex justify-center items-center h-full">
            <SlotMachine />
          </div>
        </div>
      </div>
    </BackLayout>
  );
};

export default SlotsPage; 