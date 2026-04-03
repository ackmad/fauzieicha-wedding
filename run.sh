#!/bin/bash

echo "🚀 Starting Wedding Invitation Project..."
echo "----------------------------------------"

# Check if node_modules exists, if not install
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies first..."
  npm install
fi

# Run dev server
echo "🌟 Opening dev server at http://localhost:3000"
npm run dev