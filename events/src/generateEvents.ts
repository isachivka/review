import { PullRequests } from '@review/github-fetch/src/types/shared';
import logs from '@review/logs';

type Event = {
  type: string;
  // TODO: Specify a different type
  data: any;
}

type Error = string;

export type GeneratorResult = Error | Event[];

export type Generator = (prev: PullRequests, next: PullRequests) => Promise<GeneratorResult>;

const fulfillOnReject = (promise: Promise<GeneratorResult>): Promise<GeneratorResult> =>
  new Promise<GeneratorResult>((resolve) => {
    promise
      .then((data) => resolve(data))
      .catch((error) => resolve(error));
  });

async function generateEvents(
  generators: Generator[],
  prev: PullRequests,
  next: PullRequests
): Promise<Event[]> {
  /**
   * Тут бы не помешал Promise.allSettled, но что есть, то есть. Поэтому все оборачиваем
   * в fulfillOnReject так, чтобы если промис зареджектился, он зафуллфилился
   */
  const generatorsResult = await Promise.all(
    generators.map((generator) => {
      return fulfillOnReject(generator(prev, next));
    }),
  );

  /**
   * Из массива результатов печатаем все ошибки, остальные возвращаем
   */
  const events = generatorsResult.reduce((acc: Event[], result, generatorIndex) => {
    if (typeof result === 'string') {
      logs.events.warn(`Generator (${generators[generatorIndex]}) error: ${result}`);
      return acc;
    }

    return [...acc, ...result];
  }, []);

  return events;
}

export default generateEvents;
