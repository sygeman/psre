import { createEffect, createSignal, onCleanup } from "solid-js";
import { directus } from "../lib/directus";
import { readItem } from "@directus/sdk";

const formatter = new Intl.NumberFormat('en', { 
  notation: 'compact', 
  compactDisplay: 'short' // или 'long' (1.2K → 1.2 thousand)
});

export const ResourcesPanel = () => {
  const stateId = '5fd7059b-fb52-40e9-92b0-2ddbd4b2d2f6';
  const collection = 'psre_account_state';
  const fields = ['food', 'wood', 'steel', 'fuel', 'diamond'];

  const [food, setFood] = createSignal(0);
  const [wood, setWood] = createSignal(0);
  const [steel, setSteel] = createSignal(0);
  const [fuel, setFuel] = createSignal(0);
  const [diamond, setDiamond] = createSignal(0);

  createEffect(() => {
    let unsubscribe: () => void;

    (async () => {
      const data = await directus.request(readItem(collection, stateId, { fields }));

      setFood(data?.food);
      setWood(data?.wood);
      setSteel(data?.steel);
      setFuel(data?.fuel);
      setDiamond(data?.diamond);

      // console.log(data);

      const subData = await directus.subscribe(collection, {
        query: {
          filter: { id: { _eq: stateId } },
          fields
        },
        event: 'update',
        uid: 'update-resources-panel'
      });

      unsubscribe = subData.unsubscribe;
      
      for await (const item of subData.subscription) {
        // console.log(item)
        if (item.event === 'update') {
          const {food, wood, steel, fuel, diamond} = item.data[0];
          setFood(food);
          setWood(wood);
          setSteel(steel);
          setFuel(fuel)
          setDiamond(diamond);
        }
      }
    })()

    onCleanup(() => unsubscribe?.())
  })

  return (
    <div class="grid px-4 w-full h-8 grid-cols-5">
      <div class="flex items-center">F {formatter.format(food())}</div>
      <div class="flex items-center">W {formatter.format(wood())}</div>
      <div class="flex items-center">S {formatter.format(steel())}</div>
      <div class="flex items-center">F {formatter.format(fuel())}</div>
      <div class="flex items-center">D {formatter.format(diamond())}</div>
    </div>
  );
};
