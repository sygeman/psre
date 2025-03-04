import { directus } from "@/lib/directus";
import { updateStateFromData } from "@/stores/state";

export const accountStateSubscription = async (stateId: string) => {
    const { subscription } = await directus.subscribe('psre_account_state', {
        query: { filter: { id: { _eq: stateId } } },
        event: 'update',
        uid: 'update-account-state',
    });

    for await (const item of subscription) {
        if (
        item.event === 'update' &&
        Array.isArray(item.data) &&
        item.data.length > 0
        ) {
        updateStateFromData(item.data[0]);
        }
    }
}