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
      date_created
      date_updated
    }
  }
`;

export const UPDATE_ACCOUNT_STATE = gql`
  mutation UpdateAccountState(
    $id: ID!
    $data: update_psre_account_state_input!
  ) {
    update_psre_account_state_item(id: $id, data: $data) {
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
      date_created
      date_updated
    }
  }
`;
