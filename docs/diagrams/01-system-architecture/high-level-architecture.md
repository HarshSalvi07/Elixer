
# Elixer™ — High-Level System Architecture

## 1. Overview

Elixer is a personal evolution platform built around independent
Points of Improvement (POIs), a centralized Core, and AI-assisted
personalization.

## 2. Architecture Diagram

```mermaid
flowchart TB
    subgraph CLIENTS["Presentation Layer"]
        MOBILE["Mobile Application<br/>React Native + Expo"]
        WEB["User Web Application<br/>Next.js"]
        ADMIN["Admin Dashboard<br/>Next.js"]
    end

    STORE["Google Play Store<br/>Android Distribution"]

    subgraph BACKEND["Elixer Backend — Modular Monolith"]
        API["API Layer"]
        AUTH["Authentication & Authorization"]

        subgraph CORE["Elixer Core"]
            USERS["User Management"]
            POICAT["POI Catalogue"]
            CAPACITY["Capacity Engine"]
            TASKS["Task Engine"]
            PROGRESS["Progress Engine"]
            CC["CC Engine"]
            STREAK["Streak Engine"]
        end

        subgraph DOMAINS["Independent POI Domains"]
            DIET["Diet"]
            SPORTS["Sports"]
            LEARNING["Self Learning"]
            PHYSIQUE["Physique"]
            PSYCHOLOGY["Psychology"]
            ACADEMICS["Academics"]
            FINANCE["Personal Finance"]
        end

        ORCHESTRATOR["AI Orchestrator"]
    end

    subgraph DATA["Data and Platform Services"]
        DB[("PostgreSQL Database")]
        STORAGE["Supabase Storage"]
        SUPAAUTH["Supabase Auth"]
    end

    subgraph AI["AI Infrastructure"]
        PREP["Data Preparation"]
        TRAIN["Model Training"]
        EVAL["Model Evaluation"]
        INFERENCE["Model Inference API"]
    end

    MOBILE --> STORE
    MOBILE --> API
    WEB --> API
    ADMIN --> API

    API --> AUTH
    AUTH --> SUPAAUTH

    API --> CORE
    CORE --> DOMAINS

    CORE <-->|"Defined contracts and events"| DOMAINS

    CORE --> DB
    DOMAINS --> DB
    API --> STORAGE

    CORE --> ORCHESTRATOR
    ORCHESTRATOR --> INFERENCE

    PREP --> TRAIN
    TRAIN --> EVAL
    EVAL --> INFERENCE
</mermaid>
```

## 3. Important Architectural Decisions

- Elixer starts as a modular monolith, not microservices.
- POIs are independently developed functional domains.
- Official POIs are managed by Elixer administrators.
- Users select from the official POI catalogue.
- Core and POI domains communicate through defined contracts and events.
- AI development and model training are separated from the main application backend.
- The mobile application is distributed through Google Play Store.
- PostgreSQL is the central relational data store.
