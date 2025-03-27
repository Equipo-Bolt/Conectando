# Welcome to *Conectando+* the perfect web app to create and manage your work objectives.

## To start working you must:


- First, install the depencies of the project:

```sh
npm i
```

- Second, run the development server with the command below:

```sh
npm run dev
```

- Next, open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

*Every code saved inside the src directory will refresh the app*



### General Branch Naming Conventions
- All branch names must be in English.
- Each branch name should have a maximum of three words after the branch divition, like Backend/
- Each word must start with an uppercase letter, except for the main branches (`main` and `staging`).

## Main and Staging Branches
- The project will have only one main branch called `main`.
- The `main` branch can only be updated through pull requests from a `QA` branch.
- Direct changes or pushes to the `main` branch are not allowed.
- The project will have a primary development branch called `staging`.
- The `staging` branch serves to merge completed features to create a functional version.
- The `staging` branch should be frequently updated for the creation of new feature branches.

## QA Branches
- QA branches will be named following the pattern `QA/{sprint number}-{revision number}`.
- The QA team will use these branches to review and test a version before merging it into `main`.
- No development or bug fixes will be performed on QA branches.
- Only tests and incident reports will be conducted on these branches.
- If a version in a QA branch causes critical errors preventing further development, no pull request will be created to merge it into `main`.

**Examples of QA branch names:**
```
QA/1-2   QA/2-4
```

### Feature Branches
- Feature branches will be created from `staging` and named following the pattern: `{layer}/ft/{feature name}`.
- Once a group of functionalities is completed, a QA branch will be created as described earlier for the QA team to review.

**Examples of feature branch names:**
```
Backend/ft/CreateUser   Frontend/ft/Collaborator   Frontend/ft/HomePage
```



### Commit Message Conventions
| Verb      | Definition |
|-----------|------------|
| **ADD**   | When the main changes involve implementing a new feature or adding resources or data necessary for the application. |
| **DELETE** | When the main changes involve removing files, functions, or general code that can be omitted without replacement. |
| **MERGE**  | When changes from another branch are merged. |
| **FIX**    | When fixing a bug or implementing a solution to a test case. |
| **REFACTOR** | When refactoring code without fixing a bug or adding new functionality, only restructuring existing features. |
| **CHORE**  | When making changes unrelated to improvements, features, source files, or test files (e.g., updating project dependencies). |
| **DOCS**   | When updating markdown documents or README files. |
| **REVERT** | When reverting to a previous commit. |
| **CONFIG** | When making configuration-related changes or adding packages to the project. |
| **STYLE**  | When making changes that do not affect code functionality, such as fixing white spaces, missing semicolons, etc. |

