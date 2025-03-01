import { createEffect, createSignal, onCleanup } from "solid-js";
import { directus } from "../lib/directus";
import { readItem } from "@directus/sdk";
import { PointsProgressBar } from "../components/points-progress-bar";

export const PersonPanel = () => {
  const stateId = '5fd7059b-fb52-40e9-92b0-2ddbd4b2d2f6';
  const collection = 'psre_account_state';
  const fields = ['action_points', 'stamina_points', 'level'];

  const [level, setLevel] = createSignal(0);
  const [actionPoints, setActionPoints] = createSignal(0);
  const [staminaPoints, setStaminaPoints] = createSignal(0);

  createEffect(() => {
    let unsubscribe: () => void;

    (async () => {
      const data = await directus.request(readItem(collection, stateId, { fields }));

      setActionPoints(data?.action_points);
      setStaminaPoints(data?.stamina_points);
      setLevel(data?.level)

      // console.log(data);

      const subData = await directus.subscribe(collection, {
        query: {
          filter: { id: { _eq: stateId } },
          fields
        },
        event: 'update',
        uid: 'update-state-panel'
      });

      unsubscribe = subData.unsubscribe;
      
      for await (const item of subData.subscription) {
        if (item.event === 'update') {
          const {action_points, stamina_points, level} = item.data[0];
          setActionPoints(action_points);
          setStaminaPoints(stamina_points);
          setLevel(level)
        }
      }
    })()

    onCleanup(() => unsubscribe?.())
  })

  return (
    <div class="text-sm bg-slate-800 w-24">
      <div class="flex size-24 bg-slate-700 relative">
        <div class="absolute left-1 top-1 bg-black px-1 rounded">{level()}</div>
      </div>

      <PointsProgressBar points={staminaPoints} label="SP" color="bg-orange-500" />
      <PointsProgressBar points={actionPoints} label="AP" color="bg-blue-500" />
    </div>
  );
};
