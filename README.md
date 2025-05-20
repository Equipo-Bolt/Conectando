# Welcome to *Conectando+* the perfect web app to create and manage your work objectives.

## To start working you must:


- First, install the depencies of the project:

```sh
npm i --force
```
$~$

- Next input the following command to establish connection with your local DB 

***For this step you should have the uncommited secure folder in your project root and your database connection url in a .env file**

```sh prisma
npx prisma migrate dev --skip-generate
```
You should see the following message after naming your migration if prompted:

*The seed command has been executed.*
$~$

***If the console does not display the  message, run this command**
```sh prisma
npx prisma db seed
```
And you should see:

*Catalogs and Dummy data seeded.*

$~$
- Third, run the development project with the command below:

```sh
npm run dev
```

- Next, open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

*Every code saved inside the src directory will refresh the app*

$~$

## VSCODE Extensions :pencil2:
Install the following VSCODE Extensions:
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [BetterComments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
- [TailwindInterface](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

$~$
# Developing Conventions

## General Branch Naming Conventions :mag:
- All branch names must be in English.
- Each branch name should have a maximum of three words after the branch division, like Backend/
- Each word must start with an uppercase letter, except for the main branches (`main` and `staging`).

$~$

## Main and Staging Branches :lock:
- The project will have only one main branch called `main`.
- The `main` branch can only be updated through pull requests from a `QA` branch.
- Direct changes or pushes to the `main` branch are not allowed.
- The project will have a primary development branch called `staging`.
- The `staging` branch serves to merge completed features to create a functional version.
- The `staging` branch should be frequently updated for the creation of new feature branches.

$~$

## QA Branches :wrench:
- QA branches will be named following the pattern `QA/{sprint number}-{revision number}`.
- The QA team will use these branches to review and test a version before merging it into `main`.
- No development or bug fixes will be performed on QA branches.
- Only tests and incident reports will be conducted on these branches.
- If a version in a QA branch causes critical errors preventing further development, no pull request will be created to merge it into `main`.

**Examples of QA branch names:**
```
QA/1-2   QA/2-4
```

$~$

### Feature Branches
- Feature branches will be created from `staging` and named following the pattern: `{layer}/ft/{feature name}`.
- Once a group of functionalities is completed, a QA branch will be created as described earlier for the QA team to review.

**Examples of Feature branch names:**
```
Backend/ft/CreateUser   Frontend/ft/Collaborator   Frontend/ft/HomePage
```

$~$

### Hotfix Branches 
- Similar to Feature Branches, these branches will be created from `staging` and named following the pattern: `{layer}/hotfix/{fix name}`.
- If no new functionality is developed or the main purpose is to refactor or redo a large amount of code, it should be done in a Hotfix branch.

**Examples of Hotfix branch names:**
```
Backend/hotfix/CodeComments   Frontend/hotfix/ZodSchema   Backend/hotfix/CreateAction
```

$~$

## Coding And Commenting Language Convention :bowtie:
- All coding logic like .ts files, variable names and functions will be written in **English**
- Comments, Commit Messages and Pull Requests will be written in **English**
- All user interface components and modules; like error messages, alerts, pages, routes and page-based components should be in **Spanish**

$~$

## Commit Message Conventions :incoming_envelope:
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

