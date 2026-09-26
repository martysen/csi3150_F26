# Git & GitHub Cheat Sheet

This guide is a practical reference document explaining how to perform version control with `Git` and using `GitHub` (Github is owned by Microsoft)  as a remote repository, connecting it using SSH (instead of username/password based authentication).

Quick note: if you also prefer video tutorial, you can check this gentleman's video on YouTube: https://www.youtube.com/watch?v=tRZGeaHPoaw

---

## 1. What Git Actually Is (For beginners)

Git is a distributed version control system. That means every developer's local copy of a project is a full repository with its own complete history, not just a snapshot of the latest files. There is no single "master copy" that everyone must be connected to in order to work.

Git tracks changes as a series of **commits**. Commits are snapshots of your project at a point in time, each one linked to the commit before it. This chain of commits forms your project's history. You can inspect, compare, or revert to any point in that history.

A few core concepts to understand:

| Concept | What it means |
|---|---|
| **Repository (repo)** | A project folder that Git is tracking. Contains a hidden `.git` folder holding the entire history. |
| **Working directory** | The actual files on your disk that you are editing right now. |
| **Staging area (the "index")** | A holding area where you place changes you intend to include in your next commit. This two-step process (stage, then commit) lets you commit only part of your changes if you want. |
| **Commit** | A saved snapshot of the staged changes, with a message describing what changed and why. The message is very important and must concisely describe what you have changed in your code. |
| **Branch** | An independent line of development. The default branch is usually called `main` or `master`. Creating a branch lets you work on a feature or fix without touching the stable code until you are ready to merge it back in. |
| **Remote** | A version of your repository hosted elsewhere (like on GitHub or GitLab) that you can push to and pull from. A repo can have zero, one, or several remotes. |
| **Clone** | A full copy of a remote repository, downloaded to your local machine, including its entire history. |
| **HEAD** | A pointer to whatever commit or branch you currently have checked out. Most of the time, "HEAD" just means "where you are right now." |

### How branches actually work
A branch is a lightweight, movable pointer to a commit. When you create a branch, Git does not copy your files, it just adds a new pointer. When you switch branches, Git updates your working directory to match whatever commit that branch's pointer is on. When you make a new commit while on a branch, the branch's pointer automatically moves forward to point at that new commit.

This is why branching in Git is fast and cheap compared to older version control systems. You are not duplicating the project, you are just creating a new named reference in the commit history.

---

## 2. First Time Setup (Do This Once Per Machine)

Once you have downloaded and installed `Git`, before Git will let you commit anything, it needs to know who you are. This information gets attached to every commit you make, and if you skip it, Git will either refuse to commit or attach a placeholder identity that makes your commits untraceable, and GitHub will not correctly associate your commits with your account. Open the git-bash terminal (if you are on Windows search for `git bash`. For Linux or Mac, use your default terminal) and run the following two commands:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Use the same email address here that is registered to your GitHub account, so GitHub can link your commits to your profile.

Other useful one-time configuration:

```bash
git config --global init.defaultBranch main
git config --global core.editor "code --wait"
git config --list
```

- `init.defaultBranch main` sets new repos to use `main` as the default branch name instead of the older `master`. It really does not make a difference except for the fact that GitHub and similar platforms now use `main` instead of the `master`. So for production environments and culturally speaking, use `main`. 
- `core.editor` sets which text editor Git opens for commit messages, etc. (the example above uses VS Code. Note here, to lauch VS Code from the terminal, the command is `code`).
- `git config --list` shows all current settings, useful for confirming your name/email are set correctly. You can also take a look at the other settings Git has at this point and learn more about them if you are interested.

---

## 3. Git Basics: Starting and Tracking a Project

| Command | Description / When to Use |
|---|---|
| `git init` | Turns the current folder into a new Git repository. Run this once, at the root of a new project. |
| `git status` | Shows the current state: which files are staged, unstaged, or untracked. Run this constantly, it is your "what is going on" command. |
| `git add <file>` | Stages a specific file, marking it to be included in the next commit. |
| `git add .` | Stages all changed and new files in the current directory and below. |
| `git add -p` | Interactively stages changes in chunks rather than whole files, useful when a file has multiple unrelated changes you want to split into separate commits. |
| `git commit -m "message"` | Commits the staged changes with a short message. Write messages in the imperative mood ("Add login form" not "Added login form" or "Adds login form"), it is the convention. |
| `git commit -am "message"` | Shortcut that stages all *already-tracked, modified* files and commits in one step. Does not pick up brand new untracked files, those still need `git add` first. |
| `git log` | Shows commit history, newest first, with author, date, and message. |
| `git log --oneline --graph --all` | A compact, visual view of history across branches, very useful once branching enters the picture. |
| `git diff` | Shows unstaged changes, line by line, compared to the last commit. |
| `git diff --staged` | Shows staged changes, line by line, that will be included in the next commit. |
| `.gitignore` file | A plain text file listing patterns of files/folders Git should never track (e.g., `node_modules/`, `.env`, build output). Should be added and committed at the start of a project. |

---

## 4. Branching and Merging ()

For intermediate to advanced. As a beginner you will rarely deal with these. Rarely does not mean ever. So knowing these exists even as a beginner is important.

| Command | Description / When to Use |
|---|---|
| `git branch` | Lists all local branches, with an asterisk on the one you are currently on. |
| `git branch <name>` | Creates a new branch, but does not switch to it. |
| `git switch <name>` | Switches to an existing branch. The modern, clearer replacement for `git checkout <name>`. |
| `git switch -c <name>` | Creates a new branch and switches to it in one step. Equivalent to the older `git checkout -b <name>`. |
| `git branch -d <name>` | Deletes a branch, but only if it has already been merged (safety check). |
| `git branch -D <name>` | Force deletes a branch, even if unmerged. Use with care. |
| `git merge <branch>` | Merges the named branch into your *current* branch. Run this while checked out on the branch you want to merge *into* (commonly `main`). |
| `git rebase <branch>` | Replays your current branch's commits on top of another branch, producing a linear history instead of a merge commit. Useful for keeping history clean, but avoid rebasing commits that have already been pushed and shared with others. |
| Merge conflict | Happens when Git cannot automatically combine changes because the same lines were edited differently on both branches. Git marks the conflicting sections directly in the file with `<<<<<<<`, `=======`, and `>>>>>>>` markers. You edit the file to resolve it, then `git add` the file and `git commit` to finish the merge. |

---

## 5. Connecting Git to GitHub with SSH

When you first try to add a github repo as a remote repository to your local git repo, you will be required to authenticate into your Github Account using your Github account credentials. There are two main methods to do this authentication: HTTPS and SSH based. If you chose the HTTPS method, Git is supposed to lauch a browser with Github sign-in page where you provide your GitHub username and password. I personally like the SSH method. 

Using SSH keys means you authenticate with a cryptographic key pair instead of typing your username and password (or a token) every time you push (local machine -> Github) or pull (Github -> local machine). You generate the key pair once, upload the public half to GitHub, and keep the private half secret on your machine.

### Step 1: Check for an existing SSH key

Remember, if you are on Windows, continue using your git-bash terminal. Use default terminals on Linux/mac. If you get errors on Windows, it is mostly due to the command differences. Please google search the error by telling Google AI mode these commands, the platform and software you are working with, and the error that you are getting, and it will help you resolve them.

```bash
ls -al ~/.ssh
```
Look for files named `id_ed25519` and `id_ed25519.pub` (or the older `id_rsa`/`id_rsa.pub`). If they exist, you can skip to Step 3, or generate a new key specifically for GitHub if you would rather keep them separate. In short, if you have not done this before, start from Step 2 and don't worry about this step.

### Step 2: Generate a new SSH key
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```
- `-t ed25519` selects a modern, fast, secure key type (use `-t rsa -b 4096` instead only if you are on a very old system that does not support ed25519).
- `-C` attaches a comment, typically your email, to help identify the key later.
- When prompted for a file location, press Enter to accept the default.
- When prompted for a passphrase, you can set one for extra security (you will be asked for it when the key is used - so DO NOT FORGET THIS) or leave it blank for convenience. Either is fine for most personal setups.

### Step 3: Start the SSH agent and add your key
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```
The ssh-agent runs in the background and holds your decrypted key in memory so you do not have to re-enter a passphrase constantly. You can skip this step if you are okay typing your passphrase whenever needed. 

### Step 4: Copy the public key
```bash
cat ~/.ssh/id_ed25519.pub
```
Copy the full output (it starts with `ssh-ed25519` and ends with your email comment). **Never share** the private key file (`id_ed25519`, no `.pub` extension), only the `.pub` file's contents.

### Step 5: Add the public key to GitHub
1. Go to GitHub, click your profile photo, then **Settings**.
2. In the left sidebar, click **SSH and GPG keys**.
3. Click **New SSH key**.
4. Give it a descriptive title (e.g., "Work laptop"), paste the key, and click **Add SSH key**.

### Step 6: Test the connection
```bash
ssh -T git@github.com
```
You should see a message confirming successful authentication with your username. This does not open a shell, it just verifies the connection.

### Step 7: Connect a local repo to GitHub as a remote
On GitHub, create a new (empty) repository and copy its **SSH** URL (it looks like `git@github.com:username/repo-name.git`, not an `https://` link). Once you finish creating the repo, Github will provide you some preliminary commands to run on your terminal depending on how you choose to connect (https or ssh). Click ssh and you will find this command you are looking for with your correct repo-name. 

```bash
git remote add origin git@github.com:username/repo-name.git
git remote -v
```
- `git remote add origin <url>` registers the remote under the name `origin` (a convention, not a requirement).
- `git remote -v` confirms the remote was added correctly, showing fetch and push URLs.

If you cloned the repository from GitHub in the first place using the SSH URL, this step is done automatically and you can skip it.

### Step 8: Push your code for the first time
```bash
git push -u origin main OR master
```
The `-u` flag sets `origin main` as the default upstream for your local `main` branch, so future pushes/pulls from that branch can just be `git push` or `git pull` with no arguments.

---

## 6. Everyday Remote Workflow

| Command | Description / When to Use |
|---|---|
| `git clone git@github.com:username/repo-name.git` | Downloads a full copy of a remote repo, using SSH, including all its history and branches. |
| `git push` | Uploads your local commits on the current branch to the remote. |
| `git push origin <branch>` | Pushes a specific branch to the remote, useful the first time you push a new branch (may need `-u` the first time, see above). |
| `git pull` | Downloads and merges changes from the remote branch into your current local branch. Equivalent to `git fetch` followed by `git merge`. |
| `git fetch` | Downloads changes from the remote but does not merge them into your working branch, letting you inspect what changed before integrating it. |
| `git remote -v` | Lists configured remotes and their URLs. |
| Pull Request (PR) | A GitHub feature (not a Git command) for proposing that changes on one branch be merged into another, typically used for code review before merging into `main`. Created on GitHub's website or via the `gh` CLI (see Advanced section). |
| Fork | A personal copy of someone else's repository under your own GitHub account, commonly used to contribute to projects you don't have direct write access to. You fork it, make changes, then open a Pull Request from your fork back to the original. |

---

## 7. Undoing Things (Common Situations)

| Situation | Command |
|---|---|
| Unstage a file (keep the changes) | `git restore --staged <file>` |
| Discard unstaged changes to a file | `git restore <file>` |
| Change the last commit's message or add forgotten files to it | `git commit --amend` |
| Undo the last commit but keep the changes staged | `git reset --soft HEAD~1` |
| Undo the last commit and unstage the changes (keep them in working directory) | `git reset HEAD~1` |
| Undo the last commit and discard the changes entirely | `git reset --hard HEAD~1` (destructive, be sure first) |
| Revert a commit by creating a new "opposite" commit | `git revert <commit-hash>` (safe for shared/pushed history, since it doesn't rewrite existing commits) |
| Temporarily shelve uncommitted changes to switch branches | `git stash`, then later `git stash pop` to bring them back |

---

## 8. Advanced Git Commands

| Command | Description / When to Use |
|---|---|
| `git rebase -i HEAD~n` | Interactive rebase over the last n commits, lets you reorder, squash (combine), edit, or drop commits before they're shared. Powerful for cleaning up messy local history. |
| `git cherry-pick <commit-hash>` | Applies a single specific commit from another branch onto your current branch, without merging the whole branch. |
| `git bisect` | Binary-searches through commit history to find the exact commit that introduced a bug, by marking commits as "good" or "bad." |
| `git reflog` | Shows a log of everywhere HEAD has pointed, including commits that were "lost" by a reset. Often the recovery tool of last resort when you think you've destroyed work. |
| `git tag v1.0.0` | Marks a specific commit with a permanent, human-readable label, typically for release versions. `git push origin v1.0.0` pushes a single tag; `git push --tags` pushes all of them. |
| `git worktree add <path> <branch>` | Checks out another branch into a separate folder on disk simultaneously, letting you work on two branches at once without stashing or switching. |
| `git submodule` | Embeds another Git repository inside your repository as a subdirectory, pinned to a specific commit. Used for pulling in dependencies that are themselves full repos. |
| `git blame <file>` | Shows which commit and author last modified each line of a file, useful for tracking down when and why a change was introduced. |
| `git log -S "search string"` | Finds commits that added or removed a specific string of code, useful for tracking down when a particular line was introduced or deleted. |
| `git clean -fd` | Removes untracked files and directories from the working directory. Combine with `-n` first (dry run) to preview what would be deleted before committing to it. |
| `.git/hooks/` scripts (e.g., `pre-commit`) | Local scripts Git runs automatically at points in the workflow (before a commit, before a push, etc.), commonly used to run linters or tests automatically. |

---

## 9. Advanced GitHub Usage

| Feature | Description / When to Use |
|---|---|
| GitHub CLI (`gh`) | Official command line tool for GitHub, lets you create pull requests, issues, and manage repos without leaving the terminal (e.g., `gh pr create`, `gh issue list`). |
| GitHub Actions | Built-in CI/CD automation, defined in YAML files under `.github/workflows/`, that runs on events like a push or pull request (e.g., automatically running tests, building, or deploying). |
| Branch protection rules | Repository settings that require things like passing status checks or a certain number of approving reviews before a branch (usually `main`) can be merged into, preventing broken or unreviewed code from landing directly. |
| CODEOWNERS file | A file that automatically requests specific people or teams as reviewers when a Pull Request touches certain files or directories. |
| GitHub Issues | Built-in tracker for bugs, tasks, and feature requests, with labels, assignees, and milestones. |
| GitHub Projects | A kanban-style board for organizing Issues and Pull Requests into workflows (e.g., "To Do," "In Progress," "Done"). |
| Draft Pull Requests | A PR marked as not yet ready for review or merging, useful for getting early feedback or running CI checks on work in progress. |
| Squash and merge | A merge option on GitHub that combines all commits in a Pull Request into a single commit on the target branch, keeping the main branch's history clean. |
| GitHub Pages | Free static site hosting directly from a repository (often a `gh-pages` branch or a `/docs` folder), commonly used for project documentation or portfolio sites. |
| Signed commits (GPG/SSH signing) | Cryptographically signs commits to prove they actually came from you, shown as "Verified" on GitHub. Configured separately from the SSH key used for authentication, though SSH keys can now be used for signing too. |
| `git config --global commit.gpgsign true` | Enables automatic signing of every commit, once a signing key is configured. |

---

## 10. Quick Reference: The Everyday Loop

For most day-to-day work, the cycle looks like this (ignore the first two and last two commands for the use case of working by yourself on your own project for the very first time):

```bash
git pull                       # get the latest changes
git switch -c feature/my-task  # create a branch for your work
# ... make changes ...
git add .
git commit -m "Add feature X"
git push -u origin feature/my-task
# open a Pull Request on GitHub, get it reviewed, merge it
git switch main
git pull                       # bring the merged change back into main
```

---

*Keep in mind GitHub's interface changes over time (menu names, settings locations). If a step above doesn't match what you see on screen, search GitHub's own documentation for the current UI, the underlying Git commands rarely change.*
