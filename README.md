# n8n Trigger Setup

This repository contains an n8n workflow setup with API triggers.

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Node.js (for API trigger)

### Running n8n

1. **Copy environment variables:**
   ```bash
   cp .env.example .env
   ```

2. **Start n8n:**
   ```bash
   docker-compose up -d
   ```

3. **Access n8n:**
   - Open http://localhost:5678 in your browser
   - Create your account on first launch

4. **Import workflow:**
   - In n8n, go to Workflows → Import from File
   - Select `api/N8N-Workflow.json`

### Stopping n8n

```bash
docker-compose down
```

### View logs

```bash
docker-compose logs -f n8n
```

## API Trigger

The `api/trigger.js` file provides a webhook endpoint that forwards requests to n8n.

### Configuration

Update `.env` with your webhook details:
- `N8N_WEBHOOK_URL`: Your n8n webhook URL
- `N8N_TRIGGER_SECRET`: Secret key for authentication

### Usage

The trigger expects POST requests and forwards them to your n8n webhook.

## Workflows

Workflows are stored in the `workflows/` directory and automatically mounted to the n8n container.

## Data Persistence

All n8n data is stored in a Docker volume (`n8n_data`) and persists between container restarts.
