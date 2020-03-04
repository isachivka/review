import { PullRequests } from '@review/github-fetch/src/types/shared';
import { Generator, GeneratorResult } from '../generateEvents';
import logs from '@review/logs';

const sampleEventGenerator: Generator =
  async (prev: PullRequests, next: PullRequests): Promise<GeneratorResult> => {
    logs.events.log('Sample generator: ', prev, next);
    return [];
  };

export default sampleEventGenerator;
