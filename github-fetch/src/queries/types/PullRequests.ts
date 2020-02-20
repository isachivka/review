/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PullRequests
// ====================================================

export interface PullRequests_repository_pullRequests_nodes_reviews_nodes_author {
  __typename: "EnterpriseUserAccount" | "Organization" | "User" | "Mannequin" | "Bot";
  /**
   * The username of the actor.
   */
  login: string;
}

export interface PullRequests_repository_pullRequests_nodes_reviews_nodes {
  __typename: "PullRequestReview";
  /**
   * The actor who authored the comment.
   */
  author: PullRequests_repository_pullRequests_nodes_reviews_nodes_author | null;
}

export interface PullRequests_repository_pullRequests_nodes_reviews {
  __typename: "PullRequestReviewConnection";
  /**
   * A list of nodes.
   */
  nodes: (PullRequests_repository_pullRequests_nodes_reviews_nodes | null)[] | null;
}

export interface PullRequests_repository_pullRequests_nodes {
  __typename: "PullRequest";
  /**
   * The permalink to the pull request.
   */
  permalink: any;
  /**
   * A list of reviews associated with the pull request.
   */
  reviews: PullRequests_repository_pullRequests_nodes_reviews | null;
}

export interface PullRequests_repository_pullRequests {
  __typename: "PullRequestConnection";
  /**
   * A list of nodes.
   */
  nodes: (PullRequests_repository_pullRequests_nodes | null)[] | null;
}

export interface PullRequests_repository {
  __typename: "Repository";
  /**
   * A list of pull requests that have been opened in the repository.
   */
  pullRequests: PullRequests_repository_pullRequests;
}

export interface PullRequests {
  /**
   * Lookup a given repository by the owner and repository name.
   */
  repository: PullRequests_repository | null;
}

export interface PullRequestsVariables {
  owner: string;
  repository: string;
}
