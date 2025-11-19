#!/bin/bash

# Install Python dependencies
echo "Installing Python dependencies..."
pip3 install -r requirements.txt

# Generate thumbnails
echo "Generating PDF thumbnails..."
python3 public/presentations/thumbs.py

# Build Next.js
echo "Building Next.js application..."
next build
