#!/bin/bash
set -e

echo "Setting up Python virtual environment..."
python3 -m venv .venv
source .venv/bin/activate

echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Generating PDF thumbnails..."
python public/presentations/thumbs.py

echo "Building Next.js application..."
next build