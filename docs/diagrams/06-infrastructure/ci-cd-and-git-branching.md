
# CI/CD and Git Branching Workflow

This diagram illustrates the Elixer Git workflow and automated continuous integration and delivery pipeline.

```mermaid
flowchart TD
    DEV["Developer"]
    LOCAL["Local Development"]
    FEATURE["feature/* Branch"]
    DEV_BRANCH["dev Branch"]
    PR_DEV["Pull Request to dev"]

    CI["Automated CI Checks"]
    LINT["Linting"]
    TYPE["Type Checking"]
    TEST["Automated Tests"]
    BUILD["Build Validation"]

    REVIEW{"Checks Passed and Review Approved?"}
    FIX["Fix Issues"]

    MAIN["main Branch"]
    RELEASE_PR["Pull Request: dev to main"]
    RELEASE["Approved Release"]

    DEV --> LOCAL
    LOCAL --> FEATURE
    FEATURE --> PR_DEV

    PR_DEV --> CI

    CI --> LINT
    CI --> TYPE
    CI --> TEST
    CI --> BUILD

    LINT --> REVIEW
    TYPE --> REVIEW
    TEST --> REVIEW
    BUILD --> REVIEW

    REVIEW -->|No| FIX
    FIX --> FEATURE

    REVIEW -->|Yes| DEV_BRANCH

    DEV_BRANCH --> RELEASE_PR
    RELEASE_PR --> MAIN
    MAIN --> RELEASE
```
