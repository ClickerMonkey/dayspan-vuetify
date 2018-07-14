# Components
- [ds-schedule-actions](#ds-schedule-actions)


## ds-schedule-actions

A component which takes an [event occurrence](#CalendarEvent) and [schedule](#Schedule) and provides a menu for the user to perform common actions on them.

### Properties
- `schedule` [Schedule](#Schedule) **required**: The schedule to perform actions on.
- `calendar-event` [CalendarEvent](#CalendarEvent) **required**: The event instance to perform actions on.
- `calendar` [Calendar](#Calendar): The optional calendar to update/refresh as actions are performed on the schedule.
- `labels` *object*: The labels to use in the component.
```javascript
{ // Defaults
  remove:     'Remove this event',
  exclude:    'Remove this occurrence',
  cancel:     'Cancel this occurrence',
  uncancel:   'Undo cancellation',
  move:       'Move this occurrence',
  include:    'Add new occurrence'
}
```
- `allow-remove` *boolean* **(default=true)**: If the menu allows the event to be removed from the calendar.
- `allow-exclude` *boolean* **(default=true)**: If the menu allows the event occurrence to be removed from the schedule.
- `allow-cancel` *boolean* **(default=true)**: If the menu allows the event occurrence to be cancelled in the schedule.
- `allow-uncancel` *boolean* **(default=true)**: If the menu allows the event occurrence to be uncancelled in the schedule.
- `allow-move` *boolean* **(default=true)**: If the menu allows the event occurrence to be moved in the schedule.
- `allow-include` *boolean* **(default=true)**: If the menu allows the event occurrence to be duplicated in the schedule.

### Events
- `remove` [ScheduleActionsEvent](#ScheduleActionsEvent): Occurs when the user selects "remove event". If any listening components don't mark `handled` = `true` then this component will proceed with normal removal behavior.
- `exclude` [ScheduleActionsEvent](#ScheduleActionsEvent): Occurs when the user selects "remove event occurrence". If any listening components don't mark `handled` = `true` then this component will proceed with normal exclusion behavior.
- `cancel` [ScheduleActionsEvent](#ScheduleActionsEvent): Occurs when the user has chosen to cancel the event occurrence. If any listening components don't mark `handled` = `true` then this component will proceed with normal cancelling behavior.
- `uncancel` [ScheduleActionsEvent](#ScheduleActionsEvent): Occurs when the user has chosen to uncancel the event occurrence. If any listening components don't mark `handled` = `true` then this component will proceed with normal uncancelling behavior.
- `move` [ScheduleActionsEvent](#ScheduleActionsEvent): Occurs when the user has chosen to move the event occurrence. If any listening components don't mark `handled` = `true` then this component will proceed with normal moving behavior.
- `include` [ScheduleActionsEvent](#ScheduleActionsEvent): Occurs when the user has chosen to duplicate the event occurrence. If any listening components don't mark `handled` = `true` then this component will proceed with normal duplicate behavior.
- `finish` [ScheduleActionsEvent](#ScheduleActionsEvent): Occurs when any of the actions have been performed.

### Slots
- `default`: The component which triggers the actions menu.
- `scheduleActionsAdditional` {schedule, calendarEvent, calendar}: An additional set of [v-list-tile](#VList)s to add to the menu.

### Methods
- `remove` *void*: Removes the event from the calendar.
- `exclude` *void*: Removes the event occurrence from the schedule.
- `cancel` *void*: Marks the event occurrence as cancelled.
- `uncancel` *void*: Removes the cancel status from the event occurrence.
- `moveStart` *void*: Starts the process of moving the event occurrence to a different day & time.
- `includeStart` *void*: Starts the process of duplicating the event occurrence to a different day & time.

### Data
- `movingDate` *boolean*: If the user is selecting a day to move the event occurrence to.
- `movingTime` *boolean*: If the user is selecting a time to move the event occurrence to.
- `includingDate` *boolean*: If the user is selecting a day to duplicate the event occurrence to.
- `includingTime` *boolean*: If the user is selecting a time to duplicate the event occurrence to.
- `targetDate` [Day](#Day): The day selected for moving or duplicating.
- `targetTime` [Time](#Time): The time selected for moving or duplicating.

### Computed
- `repeats` *boolean*: If the schedule has multiple events.
- `event` [Event](#Event): The event being acted on.
- `canRemove` *boolean*: If the event can be removed from the calendar.
- `canExclude` *boolean*: If the event occurrence can be removed from the schedule.
- `canCancel` *boolean*: If the event occurrence can be cancelled.
- `canUncancel` *boolean*: If the event occurrence can be un-cancelled.
- `canMove` *boolean*: If the event occurrence can be moved.
- `canInclude` *boolean*: If the event occurrence can be duplicated.
- `moving` *boolean*: If the user is in the middle of moving the event occurrence.
- `including` *boolean*: If the user is in the middle of duplicating the event occurrence.

# Types

## ScheduleActionsEvent
- `type` *string*: The name of the event.
- `schedule` [Schedule](#Schedule): The schedule performing an action on.
- `calendarEvent` [CalendarEvent](#CalendarEvent): The instance of an event being acted on.
- `calendar` [Calendar](#Calendar): The optional calendar that the schedule and event exist in.
- `event` [Event](#Event): The event which contains data and schedule information.
- `handled` *boolean* **(default=false)**: If the action has been handled by any listeners. If this is not marked `true` then this component will try to perform the action itself.
- `refresh` *boolean* **(default=true)**: If the action should refresh the calendar (if provided).
- `target` [Day](#Day): The day & time to move or duplicate an event to.
- `$vm` [Vue](#Vue): The instance of the component.
- `$element` [HTMLElement](#HTMLElement): The element of the component.

# Externals

#### [Schedule](https://clickermonkey.github.io/dayspan/docs/classes/schedule.html)
#### [Calendar](https://clickermonkey.github.io/dayspan/docs/classes/calendar.html)
#### [CalendarEvent](https://clickermonkey.github.io/dayspan/docs/classes/calendarevent.html)
#### [Event](https://clickermonkey.github.io/dayspan/docs/classes/event.html)
#### [Day](https://clickermonkey.github.io/dayspan/docs/classes/day.html)
#### [Time](https://clickermonkey.github.io/dayspan/docs/classes/time.html)
#### [Vue](https://vuejs.org/v2/guide/instance.html)
#### [VList](https://vuetifyjs.com/en/components/lists)
#### [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
