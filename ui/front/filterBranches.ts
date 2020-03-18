import { MappedBranches, MappedBranch } from '@review/github-fetch/src/branches';

const reserved = /^develop|master|release\/\d+(\.\d+){1,2}$/;
const valid = /^(feature|bugfix)(\/\d+(\.\d+){1,2})?\/(JSF|SNF)[^/]+$/;

const isValid = (branch: { branch: string }) => valid.test(branch.branch);
const isntReserved = (branch: { branch: string }) => !reserved.test(branch.branch);

function mapBranches(branches: MappedBranches): (MappedBranch & { invalid?: boolean })[] {
  return branches
    .filter(isntReserved)
    .map((branch) => {
      if (isValid(branch)) {
        return branch;
      }

      return { ...branch, invalid: true };
    });
}

export function getMarkdownFromGroupedBranches(authorsBranches: Record<string, (MappedBranch & { invalid?: boolean })[]>): string {
  let markdown = '';
  Object.entries(authorsBranches).forEach(([author, branches]) => {
    const mBranches = mapBranches(branches);
    markdown += `### ${author}: ${mBranches.length}

`;
    mBranches.forEach(branch => {
      if (isValid(branch)) {
        markdown += `${branch.branch}, age - ${branch.age.toFixed(1)} days
`;
      } else {
        markdown += `🆘 (invalid name) ${branch.branch}, age - ${branch.age.toFixed(1)} days
`;
      }
    });
    markdown += `
`;
  });
  return markdown;
}

export default mapBranches;

