
# Data Privacy and Access Control

This diagram illustrates how Elixer protects user data through authentication, authorization, data access policies, consent management and controlled AI data processing.

```mermaid
flowchart TD
    USER["User"]
    APP["Elixer Mobile / Web App"]

    API["Backend API"]
    AUTH["Authentication"]
    ACCESS["Authorization and Ownership Checks"]

    POLICY{"Access Permitted?"}

    RLS["Database Row Level Security"]
    DB[("PostgreSQL Database")]

    CONSENT["User Consent Management"]
    SENSITIVE["Sensitive Personal Data"]
    AI_GATE["AI Data Access and Privacy Gate"]
    MINIMIZE["Data Minimization and Pseudonymization"]
    TRAINING["Approved AI Training Dataset"]
    INFERENCE["AI Inference"]

    LOG["Security and Access Audit Logs"]
    DENIED["Reject Unauthorized Access"]

    USER --> APP
    APP --> API
    API --> AUTH
    AUTH --> ACCESS
    ACCESS --> POLICY

    POLICY -->|No| DENIED
    POLICY -->|Yes| RLS

    RLS --> DB
    DB --> SENSITIVE

    API --> CONSENT
    CONSENT --> AI_GATE
    SENSITIVE --> AI_GATE

    AI_GATE --> MINIMIZE
    MINIMIZE --> TRAINING
    MINIMIZE --> INFERENCE

    ACCESS --> LOG
    DENIED --> LOG
```
