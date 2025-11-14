#!/bin/bash

# Image Optimization Script for Portfolio Website
# This script optimizes images for web delivery while maintaining quality

echo "🚀 Starting image optimization..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Installing via Homebrew..."
    brew install imagemagick
fi

# Create backup directory
BACKUP_DIR="static/images/backup_$(date +%Y%m%d_%H%M%S)"
echo "📦 Creating backup at $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Function to optimize image
optimize_image() {
    local file="$1"
    local quality="$2"
    local max_width="$3"
    
    # Skip if file is already optimized (under 500KB)
    local size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    if [ "$size" -lt 512000 ]; then
        echo "⏭️  Skipping $file (already optimized)"
        return
    fi
    
    echo "🔧 Optimizing: $file"
    
    # Backup original
    cp "$file" "$BACKUP_DIR/"
    
    # Get file extension
    ext="${file##*.}"
    ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    
    # Optimize based on file type
    if [ "$ext_lower" = "png" ]; then
        # Convert PNG to JPG if it's a photo (not transparent)
        if ! identify -format '%A' "$file" | grep -q 'True'; then
            # No alpha channel, convert to JPG
            new_file="${file%.png}.jpg"
            convert "$file" -strip -quality "$quality" -resize "${max_width}x>" "$new_file"
            rm "$file"
            echo "  ✅ Converted to JPG: $new_file"
        else
            # Has transparency, optimize as PNG
            convert "$file" -strip -quality "$quality" -resize "${max_width}x>" "$file"
            echo "  ✅ Optimized PNG: $file"
        fi
    else
        # Optimize JPG
        convert "$file" -strip -quality "$quality" -resize "${max_width}x>" "$file"
        echo "  ✅ Optimized: $file"
    fi
}

echo ""
echo "📸 Optimizing portfolio hero images..."
find static/images/portfolio -maxdepth 1 -type f \( -name "*.jpg" -o -name "*.png" \) | while read file; do
    optimize_image "$file" 85 2000
done

echo ""
echo "🖼️  Optimizing portfolio gallery images..."
find static/images/portfolio/*/. -type f \( -name "*.jpg" -o -name "*.png" \) | while read file; do
    optimize_image "$file" 82 1600
done

echo ""
echo "🏆 Optimizing award certificates..."
find static/images/awards -type f \( -name "*.jpg" -o -name "*.png" \) | while read file; do
    optimize_image "$file" 80 1200
done

echo ""
echo "🎨 Optimizing logos..."
find static/images/logos -type f \( -name "*.jpg" -o -name "*.png" \) | while read file; do
    optimize_image "$file" 90 800
done

echo ""
echo "✨ Optimization complete!"
echo ""
echo "📊 Size comparison:"
du -sh "$BACKUP_DIR"
du -sh static/images/portfolio
du -sh static/images/awards
du -sh static/images/logos

echo ""
echo "💡 Tip: Test the website thoroughly. If you're happy with the results,"
echo "   you can delete the backup directory: $BACKUP_DIR"
