const gql = String.raw;

export const GET_ACCOUNT_STATE = gql`
  query GetAccountState($id: ID!) {
    psre_account_state_by_id(id: $id) {
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
  }
`;
