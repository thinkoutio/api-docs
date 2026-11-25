# Issue tracker: Linear

Issues and specs for this repo live in Linear, workspace ThinkOut, team TKO. Agents read and write them through the Linear MCP tools: the project `linear` server in `.mcp.json`, or a claude.ai Linear connector pointed at the ThinkOut workspace. `.claude/hooks/linear-team-guard.mjs` denies issue, comment, and project writes aimed at any other team.

The efforts under `.scratch/` predate the move to Linear. Read them as history, and start every new effort in Linear.

## Conventions

- Issue ids look like `TKO-21`. A branch for an issue starts with the lower-case form, `tko-21-<slug>`. Not all work is in Linear, and a branch without an issue can take any name.
- Statuses: Backlog, Todo, In Progress, In develop, Done, Canceled, Duplicate. In develop means the work is finished into develop and waits for a release. Done means it is released.
- Labels: Bug, Feature, Improvement. The label picks the branch type.
- Comments and conversation history go in the issue's comments.

## Git flow moves the issue

Linear has no Azure DevOps integration, so nothing moves an issue on its own. The agent that runs the git flow step also moves the issue. Each change below applies only when the branch has an issue: its name starts with `tko-<n>`, or for a hotfix, its commits mention `TKO-<n>`. A branch without an issue changes nothing in Linear.

| Git flow step | Linear change |
| --- | --- |
| `git flow feature start tko-21-<slug>` (Feature, Improvement) or `git flow bugfix start tko-34-<slug>` (Bug for the next release) | In Progress, assigned to whoever started the branch |
| `git flow hotfix start v4.18.12` (Bug fixed in production now) | In Progress, assigned to whoever started the branch. The branch is named by version, so each commit mentions `TKO-<n>`. |
| Feature or bugfix finished into develop | In develop, with a comment that names the merge commit |
| Release or hotfix finished | Done, with the comment "Released in v4.x.y" |
| Side branch started or finished (`git flow feature start <name>-api feature/<name>`) | No change |

`.agents/playbooks/finishing-a-branch.md` and `.agents/playbooks/release.md` carry the finish and release steps.

## When a skill says "publish to the issue tracker"

Create an issue in team TKO with `save_issue`. Give it a title, a description, and one label (Bug, Feature, or Improvement). Leave it in Backlog unless the user names another status. A spec that spans several issues becomes a Linear project in TKO, with the spec as the project description and each implementation issue in that project.

## When a skill says "fetch the relevant ticket"

Read the issue with `get_issue`, and its comments with `list_comments`. The user normally passes the id. On a feature or bugfix branch named after an issue, the id is also in the branch name.
