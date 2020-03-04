import { PullRequests } from '@review/github-fetch/src/types/shared';
import { Generator, GeneratorResult } from '../generateEvents';

const sampleEventGenerator: Generator =
  async (prev: PullRequests, next: PullRequests): Promise<GeneratorResult> => {
    console.log(prev, next);
    return [];
  };

export default sampleEventGenerator;
