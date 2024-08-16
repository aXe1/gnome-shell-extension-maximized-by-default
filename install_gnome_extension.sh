#!/bin/bash

# Check if argument is given
if [ $# -eq 0 ]; then
    echo "No arguments provided. Please provide the path to the GNOME extension zip file."
    exit 1
fi

# Extension ZIP file path
EXTENSION_ZIP=$1

# Validate if zip file exists
if [ ! -f "$EXTENSION_ZIP" ]; then
    echo "File not found! Please provide a valid zip file."
    exit 1
fi

# Extension directory
EXTENSION_DIR="$HOME/.local/share/gnome-shell/extensions"

# Temporary directory for unzipping
TEMP_DIR=$(mktemp -d)

# Unzip extension to temporary directory
echo "Unpacking the zip file..."
unzip -q $EXTENSION_ZIP -d $TEMP_DIR

# Get the UUID from metadata.json
echo "Extracting the UUID from metadata.json..."
UUID=$(cat $TEMP_DIR/metadata.json | grep uuid | cut -d \" -f4)

# Check if extension already exists
if [ -d "$EXTENSION_DIR/$UUID" ]; then
    echo "Extension with UUID $UUID already exists. Exiting..."
    rm -rf $TEMP_DIR
    exit 1
fi

# Create extension directory
echo "Creating extension directory..."
mkdir -p $EXTENSION_DIR/$UUID

# Move all files to the extension directory
echo "Installing the extension..."
mv $TEMP_DIR/* $EXTENSION_DIR/$UUID

# Remove the temporary directory
echo "Cleaning up..."
rm -rf $TEMP_DIR

echo "Extension $UUID installed successfully."
echo "Please restart GNOME Shell to enable the extension. You can do this by logging out and back in, or if you're using X11, you can also press Alt+F2, then 'r', then Enter."


