
# Elixer™ — Data Flow Diagram

## 1. Overview

This diagram illustrates how data moves through Elixer's major components.

It covers user input, authentication, Core processing, POI domain operations, database storage, progress aggregation and AI-assisted recommendations.

## 2. Data Flow Diagram

```mermaid
flowchart TD

    USER["User"]
    ADMIN["Elixer Administrator"]

    subgraph CLIENT["Presentation Layer"]
        MOBILE["Mobile Application"]
        WEB["User Web Application"]
        DASHBOARD["Admin Dashboard"]
    end

    subgraph BACKEND["Elixer Backend — Modular Monolith"]
        API["API Layer"]
        AUTH["Authentication and Authorization"]

        subgraph CORE["Elixer Core"]
            PROFILE["User and Profile Management"]
            CATALOGUE["Official POI Catalogue"]
            USERPOIS["User POI Management"]
            TASKS["Task Engine"]
            CAPACITY["Capacity Engine"]
            PROGRESS["Progress Engine"]
            CC["CC Engine"]
            STREAK["Streak Engine"]
            AI["AI Orchestrator"]
        end

        subgraph DOMAINS["POI Domains"]
            DIET["Diet"]
            SPORTS["Sports"]
            LEARNING["Self Learning"]
            PHYSIQUE["Physique"]
            PSYCHOLOGY["Psychology"]
            ACADEMICS["Academics"]
            FINANCE["Personal Finance"]
        end
    end

    subgraph STORAGE["Data Layer"]
        DB[("PostgreSQL")]
        FILES[("Supabase Storage")]
    end

    subgraph AIINFRA["AI Infrastructure"]
        INFERENCE["Model Inference API"]
    end

    USER -->|"Input and actions"| MOBILE
    USER -->|"Input and actions"| WEB
    ADMIN -->|"Catalogue management"| DASHBOARD

    MOBILE -->|"API requests"| API
    WEB -->|"API requests"| API
    DASHBOARD -->|"Admin API requests"| API

    API --> AUTH
    AUTH --> PROFILE
    AUTH --> CATALOGUE

    PROFILE --> DB
    CATALOGUE --> DB
    USERPOIS --> DB

    API --> CORE
    USERPOIS --> DOMAINS

    TASKS --> DB
    CAPACITY --> DB
    DOMAINS -->|"Domain-specific records"| DB

    DOMAINS -->|"Standardized progress"| PROGRESS
    PROGRESS --> DB
    PROGRESS --> CC
    PROGRESS --> STREAK

    AI --> INFERENCE
    AI -->|"Approved contextual data"| DOMAINS

    API --> FILES

    CORE -->|"Results and updates"| API
    API -->|"Response"| MOBILE
    API -->|"Response"| WEB
    API -->|"Response"| DASHBOARD
```

## 3. Main Data Flow Stages

### Stage 1 — User Input

Users interact with Elixer through the mobile or web application.

Examples:

- Selecting POIs.
- Creating tasks.
- Logging activities.
- Updating goals.
- Recording progress.

Administrators use the Admin Dashboard to manage the official POI catalogue.

### Stage 2 — API and Authentication

The API Layer receives requests.

Authentication and authorization determine:

- Who is making the request.
- Whether the user is authenticated.
- Whether the requested action is permitted.
- Whether the user can access the requested data.

### Stage 3 — Core Processing

Elixer Core processes shared functionality.

Examples:

- User profile management.
- POI selection.
- Capacity assessment.
- Task scheduling.
- CC validation.
- Streak evaluation.
- Overall progress aggregation.

### Stage 4 — POI Domain Processing

The selected POI domain processes specialized information.

For example, a Diet activity is processed by the Diet domain rather than by the Sports domain.

Each domain owns its specialized data.

### Stage 5 — Data Storage

PostgreSQL stores structured relational data.

Supabase Storage stores appropriate files and media.

Sensitive data must have appropriate access controls and retention policies.

### Stage 6 — AI Processing

The AI Orchestrator coordinates approved AI requests.

The inference service returns recommendations or analysis to the backend.

AI must not directly modify authoritative CC, streak or financial records.

### Stage 7 — Results

The backend returns authorized results to the relevant application.

Users can see updated tasks, POI progress, overall progress and recommendations.

## 4. Important Data Flow Rules

1. Applications communicate with the backend through authorized APIs.
2. The backend validates requests before processing them.
3. Each POI domain owns its specialized data.
4. Core receives standardized progress information.
5. Sensitive data must only be shared with AI services when permitted.
6. Database writes must follow module ownership rules.
7. The backend controls authoritative progress, CC and streak records.
8. Users must only access data they are authorized to view.
