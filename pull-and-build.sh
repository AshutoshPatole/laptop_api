#!/bin/bash

# Define variables
REPO_OWNER="AshutoshPatole"
REPO_NAME="laptop_api"
ARTIFACT_NAME="api.zip"
ARTIFACT_DIR="."
GITHUB_TOKEN="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"

# Get the latest run ID for the API build workflow
RUN_ID=$(curl -s -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/workflows/release.yml/runs?status=success" | jq -r '.workflow_runs[0].id')

echo $RUN_ID

# Get the latest artifact ID for the API zip file
ARTIFACT_ID=$(curl -s -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/runs/$RUN_ID/artifacts" | jq -r ".artifacts[0].id")

echo $ARTIFACT_ID

# Download the API zip file to the specified directory
curl -s -H "Authorization: token $GITHUB_TOKEN" -L "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/artifacts/$ARTIFACT_ID/zip" -o "$ARTIFACT_DIR/$ARTIFACT_NAME"
