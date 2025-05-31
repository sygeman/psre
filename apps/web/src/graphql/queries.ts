const gql = String.raw;

export const GET_ACCOUNT = gql`
  query GetAccount($id: ID!) {
    psre_account_by_id(id: $id) {
      id
      name
      state {
        id
        level
        action_points
        stamina_points
        food
        wood
        steel
        fuel
        diamond
        power
        serum
        exp
      }
      region_id {
        id
        chat_id {
          id
          messages(limit: 20, sort: "date_created") {
            id
            content
            author {
              id
              name
              date_created
            }
          }
        }
      }
      alliance_id {
        id
        chat_id {
          id
          messages(limit: 20, sort: "date_created") {
            id
            content
            author {
              id
              name
              date_created
            }
          }
        }
      }
    }
  }
`;
