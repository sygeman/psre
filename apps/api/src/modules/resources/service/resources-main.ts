import { directus } from "@/lib/directus";

const gql = String.raw;

const MAIN_RESOURCES_QUERY = gql`
  query MainResourcesQuery($psreAccountByIdId: ID!) {
    psre_account_by_id(id: $psreAccountByIdId) {
      id
      state {
        id
        food
        wood
        steel
        fuel
        diamond
      }
    }
  }
`;

export const resourcesMain = async ({
  currentAccountId,
}: {
  currentAccountId: string;
}) => {
  const { psre_account_by_id } = await directus.query(MAIN_RESOURCES_QUERY, {
    psreAccountByIdId: currentAccountId,
  });

  return psre_account_by_id.state?.[0];
};
