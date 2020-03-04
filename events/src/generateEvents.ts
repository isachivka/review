import { PullRequests } from '@review/github-fetch/src/types/shared';

type Event = {
  eventType: string;
  // TODO: Specify a different type
  eventData: any;
}

type Error = string;

export type GeneratorResult = Error | Event[];

export type Generator = (prev: PullRequests, next: PullRequests) => Promise<GeneratorResult>;

const fulfillOnReject = (promise: Promise<GeneratorResult>) =>
  new Promise<GeneratorResult>((resolve) => {
    promise
      .then((data) => resolve(data))
      .catch((error) => resolve(error));
  });

async function generateEvents(
  generators: Generator[],
  prev: PullRequests,
  next: PullRequests
) {
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
   * Из массива результатов печатаем все опибки, остальные возвращаем
   */
  const events = generatorsResult.reduce((acc: Event[], result) => {
    if (typeof result === 'string') {
      console.warn(`[@review/events] generator error: ${result}`);
      return acc;
    }

    return [...acc, ...result];
  }, []);

  return events;
}

export default generateEvents;
