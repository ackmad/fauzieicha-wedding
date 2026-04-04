#!/bin/bash
# Move to the directory where this script is located
cd "$(dirname "$0")"

echo "🚀 Starting Wedding Invitation Project..."
echo "----------------------------------------"

# Check if node_modules exists, if not install
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies first..."
  npm install
fi

# Multi-platform open command (macOS: open, Linux: xdg-open, Windows: start)
OPEN_CMD="open"
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  OPEN_CMD="xdg-open"
elif [[ "$OSTYPE" == "msys" ]]; then
  OPEN_CMD="start"
fi

echo "🌟 Opening dev server at http://localhost:3000"

# Start the browser with a slight delay to let the dev server initialize
(sleep 3 && $OPEN_CMD http://localhost:3000) &

# Run dev server
npm run dev