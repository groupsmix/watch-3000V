#!/usr/bin/env bash
#
# Content backup script for WristNerd.
#
# Creates a timestamped archive of all content (Markdown files)
# and stores it in the backups/ directory.
#
# Usage:
#   ./scripts/backup-content.sh
#   ./scripts/backup-content.sh /custom/backup/dir
#
# Recommended: run via cron daily
#   0 2 * * * /path/to/watch-3000V/scripts/backup-content.sh >> /var/log/wristnerd-backup.log 2>&1

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CONTENT_DIR="$PROJECT_ROOT/content"
BACKUP_DIR="${1:-$PROJECT_ROOT/backups}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
ARCHIVE_NAME="wristnerd-content-${TIMESTAMP}.tar.gz"

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

if [ ! -d "$CONTENT_DIR" ]; then
  echo "[ERROR] Content directory not found: $CONTENT_DIR"
  exit 1
fi

echo "[$(date -Iseconds)] Starting content backup..."
echo "  Source:  $CONTENT_DIR"
echo "  Target:  $BACKUP_DIR/$ARCHIVE_NAME"

# Create compressed archive
tar -czf "$BACKUP_DIR/$ARCHIVE_NAME" -C "$PROJECT_ROOT" content/

# Verify the archive
if tar -tzf "$BACKUP_DIR/$ARCHIVE_NAME" > /dev/null 2>&1; then
  SIZE=$(du -h "$BACKUP_DIR/$ARCHIVE_NAME" | cut -f1)
  echo "[$(date -Iseconds)] Backup completed successfully ($SIZE)"
else
  echo "[ERROR] Backup verification failed!"
  exit 1
fi

# Prune old backups (keep last 30)
BACKUP_COUNT=$(ls -1 "$BACKUP_DIR"/wristnerd-content-*.tar.gz 2>/dev/null | wc -l)
if [ "$BACKUP_COUNT" -gt 30 ]; then
  REMOVE_COUNT=$((BACKUP_COUNT - 30))
  echo "[$(date -Iseconds)] Pruning $REMOVE_COUNT old backup(s)..."
  ls -1t "$BACKUP_DIR"/wristnerd-content-*.tar.gz | tail -n "$REMOVE_COUNT" | xargs rm -f
fi

echo "[$(date -Iseconds)] Backup process complete."
