import 'cross-fetch/polyfill';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import client, { owner, repository } from './client';
import getBranches from './queries/getBranches';
import { BranchesQuery, BranchesQueryVariables } from './types/graphql';
import { Branches } from './types/shared';

import logs from '@review/logs';
import { githubMap, slackMap } from './authorsMap';

async function getPage(after: string) {
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

async function getAllBranches() {
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

type MappedBranch = {
  branch: string;
  age: number;
  email: string;
  github: string;
  slack: string;
};
type MappedBranches = MappedBranch[];

function mapBranches(result: Branches): MappedBranches {
  const today = Date.now();
  return result.reduce((acc: MappedBranches, branch): MappedBranches => {
    if (!branch) return acc;
    const email = get(branch, 'target.author.email', '') as string;
    return [...acc, {
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

function group(branches: MappedBranches) {
  return groupBy(branches, 'github');
}

function markdownIt(authorsBranches: Record<string, MappedBranches>) {
  let markdown = '';
  Object.entries(authorsBranches).forEach(([author, branches]) => {
    markdown += `### ${author}: ${branches.length}

`;
    branches.forEach(branch => {
      markdown += `${branch.branch}, age - ${branch.age.toFixed(1)} days
`;
    });
    markdown += `
`;
  });
  return markdown;
}

getAllBranches()
  .then(mapBranches)
  .then(group)
  .then(markdownIt)
  .then((result) => {
    logs.githubFetch.log(result);
    return result;
  });