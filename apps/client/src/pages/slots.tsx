import { Component } from "solid-js";
import { BackLayout } from "@/layouts/back-layout";
import { SlotMachinePage } from "@/components/slot-machine-page";
import { accountState } from "@/stores/state";
import { ResourceDisplay } from "@/components/resource-display";

export const SlotsPage: Component = () => {
  return (
    <BackLayout
      title="Испытай удачу"
      rightContent={
        <div class="px-2">
          <ResourceDisplay icon="💎" value={accountState.diamond} />
        </div>
      }
    >
      <SlotMachinePage />
    </BackLayout>
  );
};
