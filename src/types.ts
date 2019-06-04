
import { Calendar, CalendarDay, CalendarEvent, DaySpan } from 'dayspan';
import Vue from 'vue';


export interface VEvent
{
  title: string;
  color?: string;
  calendar?: string;
}

export type VCalendar = Calendar<VEvent, any>;

export type VCalendarDay = CalendarDay<VEvent, any>;

export type VCalendarEvent = CalendarEvent<VEvent, any>;

export interface VComponentEvent
{
  type: string;
  mouseEvent?: VComponentEvent;
  calendarEvent?: VCalendarEvent;
  calendar: VCalendar;
  span?: DaySpan;
  details: VEvent;
  
  left?: boolean;

  right?: boolean;
  placeholder?: VCalendarEvent;
  clearPlaceholder?: () => void;

  handled: boolean;

  $event: Event;

  $vm: Vue;

  $element: HTMLElement;
}