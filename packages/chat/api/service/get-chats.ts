import { directus } from "@psre/tools";

const gql = String.raw;

const GET_CHATS_QUERY = gql`
  fragment ChatFields on psre_chats {
    id
    type
    messages(limit: 20, sort: "-date_created") {
      id
      content
      author {
        id
        name
      }
      date_created
    }
  }

  query ChatsByAccountId($psreAccountByIdId: ID!) {
    psre_account_by_id(id: $psreAccountByIdId) {
      region_id {
        chat_id {
          ...ChatFields
        }
      }
      alliance_id {
        chat_id {
          ...ChatFields
        }
      }
    }
  }
`;

export const getChats = async ({
  currentAccountId,
}: {
  currentAccountId: string;
}) => {
  const { psre_account_by_id } = await directus.query(GET_CHATS_QUERY, {
    psreAccountByIdId: currentAccountId,
  });

  const regionChat = psre_account_by_id?.region_id?.chat_id;
  const allianceChat = psre_account_by_id?.alliance_id?.chat_id;

  regionChat?.messages.reverse();
  allianceChat?.messages.reverse();

  return [regionChat, allianceChat];
};
