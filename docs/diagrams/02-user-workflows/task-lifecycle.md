
# Elixer™ — Task Lifecycle

## 1. Overview

The Task Engine manages the lifecycle of tasks created for a user's selected POIs.

Tasks move through defined stages, from creation and scheduling to completion, validation and progress recording.

The backend validates task completion and determines whether rewards are eligible.

## 2. Task Lifecycle Diagram

```mermaid
flowchart TD

    START([Task Creation])

    SOURCE["Task Source"]
    MANUAL["User-Created Task"]
    RECOMMENDED["AI-Recommended Task"]
    SYSTEM["System-Generated Task"]

    DETAILS["Define Task Details"]
    POI["Associate Task with POI"]
    DIFFICULTY["Assign Difficulty and Reward Eligibility"]
    SCHEDULE["Schedule Task"]

    LOCK["Lock Daily Plan at Day Start"]
    ACTIVE["Task Becomes Active"]

    COMPLETE{"Did User Complete Task?"}

    SUBMIT["Submit Completion"]
    VALIDATE["Backend Validates Completion"]

    VALID{"Is Completion Valid?"}

    REJECT["Reject Completion / Request Correction"]
    RECORD["Record Verified Completion"]

    REWARD{"Is Task Eligible for CC?"}
    CC["Calculate and Award CC"]
    NOCC["Record Completion Without CC"]

    PROGRESS["Update POI and Overall Progress"]
    STREAK["Evaluate Daily Success Conditions"]

    END([Task Lifecycle Complete])

    START --> SOURCE
    SOURCE --> MANUAL
    SOURCE --> RECOMMENDED
    SOURCE --> SYSTEM

    MANUAL --> DETAILS
    RECOMMENDED --> DETAILS
    SYSTEM --> DETAILS

    DETAILS --> POI
    POI --> DIFFICULTY
    DIFFICULTY --> SCHEDULE
    SCHEDULE --> LOCK
    LOCK --> ACTIVE

    ACTIVE --> COMPLETE

    COMPLETE -->|Yes| SUBMIT
    COMPLETE -->|No| END

    SUBMIT --> VALIDATE
    VALIDATE --> VALID

    VALID -->|No| REJECT
    REJECT --> ACTIVE

    VALID -->|Yes| RECORD
    RECORD --> REWARD

    REWARD -->|Yes| CC
    REWARD -->|No| NOCC

    CC --> PROGRESS
    NOCC --> PROGRESS

    PROGRESS --> STREAK
    STREAK --> END
```

## 3. Task Lifecycle Stages

### Stage 1 — Task Creation

Tasks may originate from:

- User-created tasks.
- AI recommendations.
- System-generated tasks.

All tasks must have a defined purpose and measurable completion criteria.

### Stage 2 — Task Configuration

Each task can contain:

- Task title and description.
- Associated POI.
- Difficulty level.
- Expected duration.
- Scheduled date and time.
- Completion criteria.
- CC reward eligibility.

### Stage 3 — Scheduling and Locking

The Task Engine schedules tasks according to:

- User availability.
- POI priorities.
- Capacity Engine recommendations.
- Recovery requirements.

The daily plan is locked at the agreed day-start cutoff.

After locking, users cannot retroactively change task difficulty or reward eligibility to manipulate CC rewards.

### Stage 4 — Completion and Validation

When a user completes a task:

1. The user submits completion.
2. The backend validates the completion criteria.
3. Invalid submissions are rejected or returned for correction.
4. Valid completions are recorded.

### Stage 5 — CC Rewards

The backend determines whether the completed task qualifies for CC.

Important rules:

- CC is awarded only once per eligible task.
- Reward difficulty is locked before task execution.
- Duplicate rewards must be prevented.
- Daily reward limits must be enforced.
- AI cannot directly award or modify CC.

### Stage 6 — Progress and Streak Updates

After completion:

- POI progress is updated.
- Overall progress is recalculated.
- Daily success conditions are evaluated.
- Streak records are updated according to the Streak Engine's rules.

## 4. Important Architectural Rules

1. Task creation and task completion are separate operations.
2. Completion must be validated by the backend.
3. CC rewards are calculated by deterministic backend logic.
4. AI cannot directly modify CC or streak records.
5. The same task cannot generate duplicate rewards.
6. Daily plans follow defined locking rules.
7. Task completion and daily success are not necessarily the same thing.
8. Streak evaluation must consider the complete daily success policy, not just one completed task.
