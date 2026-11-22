
# Elixer™ — Database Schema Organization

## 1. Overview

Elixer uses PostgreSQL as its central relational database.

The database is logically organized into Core tables and independent POI domain tables.

Each module owns its data and exposes information to other modules through defined interfaces.

## 2. Database Organization Diagram

```mermaid
flowchart TB

    DB[("Elixer PostgreSQL Database")]

    subgraph CORE["Elixer Core Schema"]
        USERS["users"]
        PROFILES["user_profiles"]
        CATALOGUE["poi_catalogue"]
        USERPOIS["user_pois"]
        TASKS["tasks"]
        COMPLETIONS["task_completions"]
        WALLETS["cc_wallets"]
        TRANSACTIONS["cc_transactions"]
        STREAKS["streak_records"]
        DAILY["daily_progress"]
    end

    subgraph DOMAINS["POI Domain Schemas"]
        subgraph DIET["Diet Schema"]
            MEALS["meals"]
            FOOD["food_items"]
            NUTRITION["nutrition_records"]
        end

        subgraph SPORTS["Sports Schema"]
            ACTIVITIES["activities"]
            SESSIONS["practice_sessions"]
            PERFORMANCE["performance_records"]
        end

        subgraph LEARNING["Self Learning Schema"]
            SUBJECTS["learning_subjects"]
            SESSIONS2["learning_sessions"]
            SKILLS["skill_progress"]
        end

        subgraph PHYSIQUE["Physique Schema"]
            MEASUREMENTS["body_measurements"]
            FITNESS["fitness_records"]
        end

        subgraph PSYCHOLOGY["Psychology Schema"]
            REFLECTIONS["reflections"]
            WELLBEING["wellbeing_records"]
        end

        subgraph ACADEMICS["Academics Schema"]
            COURSES["courses"]
            EXAMS["exams"]
            RESULTS["academic_results"]
        end

        subgraph FINANCE["Personal Finance Schema"]
            EXPENSES["expenses"]
            BUDGETS["budgets"]
            SAVINGS["savings_records"]
        end
    end

    DB --> CORE
    DB --> DOMAINS
```

## 3. Core Database Ownership

Elixer Core owns shared platform data:

- User accounts and profiles.
- Official POI catalogue.
- User-selected POIs.
- Tasks and task completions.
- Consistency Credit wallets and transactions.
- Streak records.
- Overall progress summaries.

## 4. POI Domain Database Ownership

Each POI domain owns its specialized records.

### Diet

- Meals.
- Food items.
- Nutrition records.

### Sports

- Activities.
- Practice sessions.
- Performance records.

### Self Learning

- Learning subjects.
- Learning sessions.
- Skill progress.

### Physique

- Body measurements.
- Fitness records.

### Psychology

- Reflections.
- Wellbeing records.

### Academics

- Courses.
- Exams.
- Academic results.

### Personal Finance

- Expenses.
- Budgets.
- Savings records.

These are illustrative table groups. The final schema will be designed as each POI's functionality is specified.

## 5. Database Architecture Rules

1. Core owns shared platform tables.
2. Each POI owns its domain-specific tables.
3. One PostgreSQL database can host all these schemas initially.
4. A module must not directly modify another module's internal records.
5. Cross-module communication should use defined interfaces and contracts.
6. Database access must enforce user authorization.
7. Sensitive information requires additional protection.
8. Database migrations should be version-controlled.
9. Domain ownership should remain clear even when modules share database infrastructure.
```

## Step 3 — Save and verify

In Nano:

1. `Ctrl + O`
2. `Enter`
3. `Ctrl + X`

Then check:

```bash
git status --short
```

Open the file in your Mermaid preview tool and verify the diagram.

**One architectural note:** These are logical ownership boundaries, not a commitment to create seven separate database servers. We can use PostgreSQL schemas to enforce clearer separation while keeping infrastructure manageable.

Tell me `done` when it renders correctly. Next we'll create **Diagram 9 — Data Flow Diagram (DFD)**.
