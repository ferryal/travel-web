#!/bin/bash

# SkyHigh Travel Web - GCP Deployment Script
# Project: artix-labs-99
# Registry: gcr.io/artix-labs-99

set -e

# Configuration
PROJECT_ID="artix-labs-99"
REGION="asia-southeast1"
SERVICE_NAME="internal-travel-web"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"
IMAGE_TAG="${IMAGE_TAG:-latest}"
# Default API URL if not set in environment
DEFAULT_API_URL="https://api.skyhigh.travel/api/v1"
API_URL="${VITE_API_URL:-$DEFAULT_API_URL}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 SkyHigh Internal Travel Web Deployment${NC}"
echo "================================="
echo -e "Target Project: ${PROJECT_ID}"
echo -e "Target Region:  ${REGION}"
echo -e "API URL:        ${API_URL}"
echo "================================="

# Check if gcloud is configured
echo -e "${YELLOW}📋 Checking gcloud configuration...${NC}"
gcloud config set project ${PROJECT_ID}

# Build for linux/amd64 (required for Cloud Run)
echo -e "${YELLOW}🔨 Building Docker image for linux/amd64...${NC}"
# Use DOCKER_DEFAULT_PLATFORM to ensure correct platform if buildx not explicitly used or configured
export DOCKER_DEFAULT_PLATFORM=linux/amd64

docker build \
  --platform linux/amd64 \
  --build-arg VITE_API_URL="${API_URL}" \
  -t ${IMAGE_NAME}:${IMAGE_TAG} \
  -t ${IMAGE_NAME}:latest \
  .

# Push to GCR
echo -e "${YELLOW}📤 Pushing image to GCR...${NC}"
docker push ${IMAGE_NAME}:${IMAGE_TAG}
docker push ${IMAGE_NAME}:latest

# Deploy to Cloud Run
echo -e "${YELLOW}🌐 Deploying to Cloud Run...${NC}"
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME}:${IMAGE_TAG} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --port 8080

# Get the service URL
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --platform managed --region ${REGION} --format 'value(status.url)')

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "🌐 Service URL: ${SERVICE_URL}"
echo ""
