
# Elixer Deployment Architecture

This diagram illustrates the proposed production deployment architecture for Elixer, including client applications, backend services, database infrastructure, storage and AI services.

```mermaid
flowchart TD
    SOURCE["Elixer Source Code"]
    CI["CI/CD Pipeline"]

    MOBILE_BUILD["Mobile App Build"]
    WEB_BUILD["Web App Build"]
    ADMIN_BUILD["Admin Dashboard Build"]
    BACKEND_BUILD["Backend Deployment"]
    AI_BUILD["AI Service Deployment"]

    PLAY["Google Play Console"]
    USERS["Mobile App Users"]

    WEB_HOST["Web Hosting"]
    ADMIN_HOST["Admin Hosting"]

    API["Elixer Backend API"]
    AUTH["Supabase Authentication"]
    CORE["Elixer Core Modules"]
    DOMAINS["POI Domain Modules"]
    ORCHESTRATOR["AI Orchestrator"]

    DB[("Supabase PostgreSQL")]
    STORAGE[("Supabase Storage")]

    AI_SERVICE["AI Inference Service"]
    MODEL["Versioned AI Models"]

    SOURCE --> CI

    CI --> MOBILE_BUILD
    CI --> WEB_BUILD
    CI --> ADMIN_BUILD
    CI --> BACKEND_BUILD
    CI --> AI_BUILD

    MOBILE_BUILD --> PLAY
    PLAY --> USERS

    WEB_BUILD --> WEB_HOST
    ADMIN_BUILD --> ADMIN_HOST

    USERS --> API
    WEB_HOST --> API
    ADMIN_HOST --> API

    API --> AUTH
    API --> CORE

    CORE --> DOMAINS
    CORE --> DB
    DOMAINS --> DB
    API --> STORAGE

    CORE --> ORCHESTRATOR
    ORCHESTRATOR --> AI_SERVICE
    AI_SERVICE --> MODEL
```
