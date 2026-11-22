
# AI Data, Training and Deployment Pipeline

This diagram illustrates Elixer's AI model development lifecycle, including data preparation, model training, evaluation, Docker packaging, model versioning and deployment.

```mermaid
flowchart TD
    DATA["Approved and Consented Data"]
    PREP["Data Preparation"]
    CLEAN["Cleaning and Validation"]
    DATASET["Versioned Training Dataset"]

    TRAIN["Model Training"]
    EVAL["Model Evaluation"]
    QUALITY{"Quality and Safety Approved?"}

    IMPROVE["Improve Model or Dataset"]
    REGISTER["Model Registry"]
    VERSION["Versioned Model Artifact"]

    DOCKER["Build AI Docker Image"]
    TEST["Container and Inference Testing"]
    IMAGE["Versioned Docker Image"]
    DEPLOY["Deploy AI Inference Service"]

    MONITOR["Monitor Performance and Drift"]
    ROLLBACK["Rollback to Previous Approved Version"]

    DATA --> PREP
    PREP --> CLEAN
    CLEAN --> DATASET

    DATASET --> TRAIN
    TRAIN --> EVAL
    EVAL --> QUALITY

    QUALITY -->|No| IMPROVE
    IMPROVE --> PREP

    QUALITY -->|Yes| REGISTER
    REGISTER --> VERSION

    VERSION --> DOCKER
    DOCKER --> TEST
    TEST --> IMAGE
    IMAGE --> DEPLOY

    DEPLOY --> MONITOR
    MONITOR -->|Performance issue| ROLLBACK
    MONITOR -->|Improvement opportunity| TRAIN
```
