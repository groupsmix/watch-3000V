"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, CalendarClock, Star, PenSquare, BookOpen, FileText } from "lucide-react";

type ContentType = "Blog" | "Review" | "Guide" | "Comparison" | "Brand Spotlight";
type ContentStatus = "Draft" | "Scheduled" | "Published";

interface CalendarItem {
  id: number;
  title: string;
  type: ContentType;
  status: ContentStatus;
  scheduledAt: string | null;
  author: string;
  [key: string]: unknown;
}

interface CalendarViewProps<T extends CalendarItem = CalendarItem> {
  items: T[];
  onItemClick: (item: T) => void;
  onSchedule: (item: T) => void;
}

const STATUS_DOT: Record<ContentStatus, string> = {
  Draft: "bg-gray-400",
  Scheduled: "bg-blue-500",
  Published: "bg-emerald-500",
};

const TYPE_ICONS: Record<ContentType, React.ReactNode> = {
  Blog: <PenSquare className="w-3 h-3" />,
  Review: <Star className="w-3 h-3" />,
  Guide: <BookOpen className="w-3 h-3" />,
  Comparison: <FileText className="w-3 h-3" />,
  "Brand Spotlight": <FileText className="w-3 h-3" />,
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarView<T extends CalendarItem>({ items, onItemClick, onSchedule }: CalendarViewProps<T>) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDow = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: { date: number; isCurrentMonth: boolean; fullDate: Date }[] = [];

    // Previous month padding
    const prevMonthLast = new Date(year, month, 0).getDate();
    for (let i = startDow - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLast - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonthLast - i),
      });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        date: d,
        isCurrentMonth: true,
        fullDate: new Date(year, month, d),
      });
    }

    // Next month padding
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      days.push({
        date: d,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, d),
      });
    }

    return days;
  }, [year, month]);

  const itemsByDate = useMemo(() => {
    const map = new Map<string, T[]>();
    for (const item of items) {
      if (!item.scheduledAt) continue;
      const d = new Date(item.scheduledAt);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    }
    return map;
  }, [items]);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const goToToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  };

  const isToday = (d: Date) =>
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate();

  // Unscheduled items
  const unscheduled = items.filter((i) => !i.scheduledAt);

  return (
    <div className="space-y-4">
      {/* Calendar header */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900 font-heading">
              {MONTH_NAMES[month]} {year}
            </h2>
            <button
              onClick={goToToday}
              className="px-2.5 py-1 text-xs font-medium text-gold bg-gold/10 hover:bg-gold/20 rounded-lg transition-colors"
            >
              Today
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAY_NAMES.map((day) => (
            <div key={day} className="px-2 py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, i) => {
            const dateKey = `${day.fullDate.getFullYear()}-${day.fullDate.getMonth()}-${day.fullDate.getDate()}`;
            const dayItems = itemsByDate.get(dateKey) || [];
            const isTodayCell = isToday(day.fullDate);

            return (
              <div
                key={i}
                className={`min-h-[100px] border-b border-r border-gray-100 p-1.5 ${
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50"
                } ${i % 7 === 0 ? "border-l-0" : ""}`}
              >
                <div className={`text-xs font-medium mb-1 ${
                  isTodayCell
                    ? "w-6 h-6 rounded-full bg-gold text-white flex items-center justify-center"
                    : day.isCurrentMonth ? "text-gray-700" : "text-gray-300"
                }`}>
                  {day.date}
                </div>
                <div className="space-y-0.5">
                  {dayItems.slice(0, 3).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onItemClick(item)}
                      className={`w-full text-left px-1.5 py-0.5 rounded text-xs truncate flex items-center gap-1 transition-colors ${
                        item.status === "Published"
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : item.status === "Scheduled"
                            ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      title={item.title}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[item.status]}`} />
                      <span className="truncate">{item.title}</span>
                    </button>
                  ))}
                  {dayItems.length > 3 && (
                    <span className="text-xs text-gray-400 px-1.5">+{dayItems.length - 3} more</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Unscheduled items */}
      {unscheduled.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-900">Unscheduled Drafts</h3>
            <span className="text-xs text-gray-400">({unscheduled.length})</span>
          </div>
          <div className="divide-y divide-gray-50">
            {unscheduled.map((item) => (
              <div key={item.id} className="px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-gray-400">{TYPE_ICONS[item.type]}</span>
                  <span className="text-sm text-gray-700 truncate">{item.title}</span>
                </div>
                <button
                  onClick={() => onSchedule(item)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors shrink-0"
                >
                  <CalendarClock className="w-3 h-3" />
                  Schedule
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 px-1">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-400" /> Draft</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Scheduled</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Published</span>
      </div>
    </div>
  );
}
