import 'cross-fetch/polyfill';
import get from 'lodash/get';
import client, { owner, repository } from './client';
import getBranches from './queries/getBranches';
import { BranchesQuery, BranchesQueryVariables } from './types/graphql';
import { Branches } from './types/shared';

import { githubMap, slackMap } from './authorsMap';

type Page = {
  nodes: Branches;
  hasNextPage: boolean;
  endCursor: string | null | undefined;
};

async function getPage(after: string): Promise<Page> {
  const page = await client.query<BranchesQuery, BranchesQueryVariables>({
    query: getBranches,
    variables: {
      owner,
      repository,
      after: after,
    }
  });
  if (
    page.data.repository &&
    page.data.repository.refs &&
    page.data.repository.refs.nodes
  ) {
    return {
      nodes: page.data.repository.refs.nodes,
      hasNextPage: page.data.repository.refs.pageInfo.hasNextPage,
      endCursor: page.data.repository.refs.pageInfo.endCursor,
    }
  }

  return {
    nodes: [],
    hasNextPage: false,
    endCursor: '',
  };
}

export async function getAllBranches(): Promise<Branches> {
  let after = '';
  const result: Branches = [];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { nodes, hasNextPage, endCursor } = await getPage(after);
    result.push(...nodes);
    if (hasNextPage && endCursor) {
      after = endCursor
    } else {
      return result;
    }
  }
}

export type MappedBranch = {
  branch: string;
  age: number;
  email: string;
  github: string;
  slack: string;
  avatarUrl: string;
};
export type MappedBranches = MappedBranch[];

export function mapBranches(result: Branches): MappedBranches {
  const today = Date.now();
  return result.reduce((acc: MappedBranches, branch): MappedBranches => {
    if (!branch) return acc;
    const email = get(branch, 'target.author.email', '') as string;
    const avatarUrl = get(branch, 'target.author.avatarUrl', '') as string;
    return [...acc, {
      avatarUrl: avatarUrl,
      branch: branch.name,
      email,
      github: get(githubMap, email, undefined) || email,
      slack: get(slackMap, email, undefined) || email,
      age: (today - new Date(get(branch, 'target.author.date', '') as string).getTime())
        / 1000 / 60 / 60 / 24,
        // ms / sec / min / hr = days
    }];
  }, []).sort((a,b) => {return b.age - a.age});
}
