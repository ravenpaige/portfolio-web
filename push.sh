#!/bin/bash
echo
read -p "Enter commit message: " commitMsg

echo "Staging changes..."
git add -A

echo "Committing with message: '$commitMsg'..."
git commit -m "$commitMsg"

echo "Pushing to origin..."
git push

echo "✔ Done!"
