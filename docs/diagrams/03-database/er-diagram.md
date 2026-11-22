
# Elixer™ — Entity Relationship Diagram (ERD)

## 1. Overview

This diagram describes the initial logical database structure of Elixer.

The database uses PostgreSQL.

Official POI definitions are managed by administrators, while users select POIs and maintain their own progress and goals.

## 2. Entity Relationship Diagram

```mermaid
erDiagram

    USERS ||--|| USER_PROFILES : has
    USERS ||--o{ USER_POIS : selects
    POI_CATALOGUE ||--o{ USER_POIS : defines

    USERS ||--o{ TASKS : owns
    USER_POIS ||--o{ TASKS : generates

    TASKS ||--o{ TASK_COMPLETIONS : has
    USERS ||--o{ TASK_COMPLETIONS : submits

    USERS ||--|| CC_WALLETS : owns
    CC_WALLETS ||--o{ CC_TRANSACTIONS : records
    TASK_COMPLETIONS ||--o| CC_TRANSACTIONS : may_reward

    USERS ||--|| STREAK_RECORDS : has
    USERS ||--o{ DAILY_PROGRESS : records
    USER_POIS ||--o{ POI_PROGRESS : tracks

    USERS {
        uuid id PK
        string email
        timestamp created_at
    }

    USER_PROFILES {
        uuid id PK
        uuid user_id FK
        string display_name
        date date_of_birth
        timestamp updated_at
    }

    POI_CATALOGUE {
        uuid id PK
        string name
        string description
        string category
        boolean is_active
        timestamp created_at
    }

    USER_POIS {
        uuid id PK
        uuid user_id FK
        uuid poi_id FK
        string baseline
        string target
        string priority
        string status
        timestamp created_at
    }

    TASKS {
        uuid id PK
        uuid user_id FK
        uuid user_poi_id FK
        string title
        string difficulty
        integer cc_reward
        timestamp scheduled_at
        string status
    }

    TASK_COMPLETIONS {
        uuid id PK
        uuid task_id FK
        uuid user_id FK
        timestamp completed_at
        string validation_status
    }

    CC_WALLETS {
        uuid id PK
        uuid user_id FK
        integer balance
        timestamp updated_at
    }

    CC_TRANSACTIONS {
        uuid id PK
        uuid wallet_id FK
        uuid task_completion_id FK
        integer amount
        string transaction_type
        timestamp created_at
    }

    STREAK_RECORDS {
        uuid id PK
        uuid user_id FK
        integer current_streak
        integer best_streak
        date last_successful_day
    }

    DAILY_PROGRESS {
        uuid id PK
        uuid user_id FK
        date progress_date
        decimal completion_rate
        boolean successful_day
    }

    POI_PROGRESS {
        uuid id PK
        uuid user_poi_id FK
        decimal progress_value
        timestamp recorded_at
    }
```

## 3. Main Entity Descriptions

### User Management

- USERS: stores account-level user references.
- USER_PROFILES: stores additional profile information.

### POI Management

- POI_CATALOGUE: stores official POI definitions.
- USER_POIS: stores each user's selected POIs and personal configurations.

### Task Management

- TASKS: stores scheduled tasks.
- TASK_COMPLETIONS: stores submitted and validated completion records.

### Consistency Credits

- CC_WALLETS: stores the user's current CC balance.
- CC_TRANSACTIONS: maintains an auditable record of CC changes.

### Progress and Streaks

- STREAK_RECORDS: stores current and best streak information.
- DAILY_PROGRESS: stores daily completion and success results.
- POI_PROGRESS: stores historical progress measurements for individual POIs.

## 4. Important Database Rules

1. Each official POI is defined once in POI_CATALOGUE.
2. Users select official POIs through USER_POIS.
3. Users cannot modify official POI definitions.
4. Each task belongs to a user and can be associated with a selected POI.
5. Task completion records must be auditable.
6. CC transactions must be protected against duplicate rewards.
7. Wallet updates and corresponding transactions must be atomic.
8. Historical progress records should be preserved.
9. Sensitive domain data must be protected through appropriate authorization and database access policies.

## 5. Implementation Note

This is an initial logical ERD, not the final production database schema.

Individual POI domains will have their own specialized tables.

Additional entities, constraints, indexes, audit records and relationships will be added during database design.

