
# Elixer Deployment Architecture

This diagram illustrates the proposed production deployment architecture for Elixer, including Docker containerization, client applications, backend services, database infrastructure, storage and AI services.

```mermaid
flowchart TD
    SOURCE["Elixer Source Code"]
    CI["CI/CD Pipeline"]

    MOBILE_BUILD["Mobile App Build"]
    WEB_BUILD["Web App Build"]
    ADMIN_BUILD["Admin Dashboard Build"]

    DOCKER_BUILD["Build Docker Images"]
    IMAGE_TEST["Test Docker Images"]
    REGISTRY[("Container Registry")]

    PLAY["Google Play Console"]
    USERS["Mobile App Users"]

    WEB_HOST["Web Hosting"]
    ADMIN_HOST["Admin Hosting"]

    subgraph CLOUD["Production Infrastructure"]
        BACKEND["Elixer Backend Container"]
        AI["AI Inference Container"]
        AUTH["Supabase Authentication"]
        DB[("Supabase PostgreSQL")]
        STORAGE[("Supabase Storage")]
    end

    SOURCE --> CI

    CI --> MOBILE_BUILD
    CI --> WEB_BUILD
    CI --> ADMIN_BUILD
    CI --> DOCKER_BUILD

    DOCKER_BUILD --> IMAGE_TEST
    IMAGE_TEST --> REGISTRY

    MOBILE_BUILD --> PLAY
    PLAY --> USERS

    WEB_BUILD --> WEB_HOST
    ADMIN_BUILD --> ADMIN_HOST

    REGISTRY --> BACKEND
    REGISTRY --> AI

    USERS --> BACKEND
    WEB_HOST --> BACKEND
    ADMIN_HOST --> BACKEND

    BACKEND --> AUTH
    BACKEND --> DB
    BACKEND --> STORAGE
    BACKEND --> AI
```
