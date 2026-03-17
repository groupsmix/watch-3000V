"use client";

import { useState, useEffect } from "react";
import { CalendarClock } from "lucide-react";
import Modal from "./Modal";

interface ScheduleModalProps {
  open: boolean;
  onClose: () => void;
  item?: { title: string; scheduledAt: string | null };
  bulkCount?: number;
  onSchedule: (dateIso: string) => void;
}

export default function ScheduleModal({
  open,
  onClose,
  item,
  bulkCount,
  onSchedule,
}: ScheduleModalProps) {
  function getDefaultDate() {
    const now = new Date();
    return item?.scheduledAt
      ? new Date(item.scheduledAt).toISOString().slice(0, 16)
      : new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
  }

  const [dateValue, setDateValue] = useState(getDefaultDate);
  const [error, setError] = useState<string | null>(null);

  // Reset date when modal reopens or item changes
  useEffect(() => {
    if (open) {
      setDateValue(getDefaultDate());
      setError(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, item?.scheduledAt]);

  const handleSubmit = () => {
    if (!dateValue) {
      setError("Please select a date and time.");
      return;
    }
    const selected = new Date(dateValue);
    // Compare against current time at submit, not render time
    if (selected <= new Date()) {
      setError("Scheduled date must be in the future.");
      return;
    }
    setError(null);
    onSchedule(selected.toISOString());
  };

  const title = bulkCount
    ? `Schedule ${bulkCount} Item${bulkCount > 1 ? "s" : ""}`
    : item
      ? `Schedule: ${item.title}`
      : "Schedule Content";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:shadow-lg transition-all"
          >
            <CalendarClock className="w-4 h-4" />
            {item?.scheduledAt ? "Reschedule" : "Schedule"}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Publish Date & Time
          </label>
          <input
            type="datetime-local"
            value={dateValue}
            onChange={(e) => { setDateValue(e.target.value); setError(null); }}
            min={new Date().toISOString().slice(0, 16)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
          />
          {error && (
            <p className="mt-1.5 text-xs text-red-600">{error}</p>
          )}
        </div>

        {bulkCount && bulkCount > 1 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 text-xs text-amber-800">
            All {bulkCount} selected items will be scheduled for the same date and time.
          </div>
        )}

        {item?.scheduledAt && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5 text-xs text-blue-800">
            Currently scheduled for:{" "}
            <strong>
              {new Date(item.scheduledAt).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
                hour: "numeric", minute: "2-digit",
              })}
            </strong>
          </div>
        )}

        <div className="text-xs text-gray-400">
          Content will be automatically published at the scheduled date and time. You can reschedule or publish manually at any time.
        </div>
      </div>
    </Modal>
  );
}
