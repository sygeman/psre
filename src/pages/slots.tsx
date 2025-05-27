import { Component } from "solid-js";
import { BackLayout } from '@/layouts/back-layout';
import { SlotMachinePage } from '@/components/slot-machine-page';

const SlotsPage: Component = () => {
  return (
    <BackLayout title="Испытай удачу">
      <SlotMachinePage />
    </BackLayout>
  );
};

export default SlotsPage; 