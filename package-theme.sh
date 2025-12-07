#!/bin/bash

# Survival Gear Pro - Theme Packaging Script
# Version: 1.0.0

THEME_NAME="survival-gear-pro-theme"
THEME_VERSION="1.0.0"
OUTPUT_FILE="${THEME_NAME}-v${THEME_VERSION}.zip"

echo "╔════════════════════════════════════════╗"
echo "║  📦 Shopify Theme Packaging Script    ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "Theme: ${THEME_NAME}"
echo "Version: ${THEME_VERSION}"
echo "Output: ${OUTPUT_FILE}"
echo ""

# Remove existing ZIP if present
if [ -f "${OUTPUT_FILE}" ]; then
    echo "🗑️  Removing existing package..."
    rm "${OUTPUT_FILE}"
fi

# Create the ZIP package
echo "📦 Creating package..."
zip -r -q "${OUTPUT_FILE}" \
  config/ \
  layout/ \
  templates/ \
  sections/ \
  snippets/ \
  assets/ \
  locales/ \
  -x "*.DS_Store" \
     "*.git*" \
     "*node_modules/*" \
     "*.log" \
     "*/.env*"

# Check if ZIP was created successfully
if [ -f "${OUTPUT_FILE}" ]; then
    SIZE=$(du -h "${OUTPUT_FILE}" | cut -f1)
    FILES=$(unzip -l "${OUTPUT_FILE}" | tail -1 | awk '{print $2}')
    
    echo ""
    echo "✅ Package created successfully!"
    echo ""
    echo "📊 Package Information:"
    echo "   File: ${OUTPUT_FILE}"
    echo "   Size: ${SIZE}"
    echo "   Files: ${FILES}"
    echo ""
    echo "🚀 Ready to upload to Shopify!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Go to your Shopify admin"
    echo "   2. Navigate to Online Store > Themes"
    echo "   3. Click 'Add theme' > 'Upload ZIP file'"
    echo "   4. Select ${OUTPUT_FILE}"
    echo ""
else
    echo ""
    echo "❌ Error: Package creation failed"
    exit 1
fi
