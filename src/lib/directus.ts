import { createDirectus, staticToken, realtime, rest } from '@directus/sdk';

export const directus = createDirectus('https://api.sgmn.dev')
  .with(staticToken('A_tv9U7ukE3l5IRBSqgT60XkCz_eFxJb'))
  .with(rest())
  .with(realtime());
