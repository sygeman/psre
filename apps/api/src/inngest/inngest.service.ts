import { Injectable } from '@nestjs/common';
import { inngest } from '../lib/inngest';
import { InngestExplorerService } from './services/inngest-explorer.service';

@Injectable()
export class InngestService {
  constructor(private readonly inngestExplorer: InngestExplorerService) {}

  getFunctions() {
    return this.inngestExplorer.getFunctions();
  }

  getInngestClient() {
    return inngest;
  }
}
