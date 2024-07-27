import {
  MouseSensor as DnDKitMouseSensor,
  TouchSensor as DnDKitTouchSensor,
  MouseSensorOptions,
  TouchSensorOptions
} from '@dnd-kit/core'

// Block DnD event propagation if element has "data-no-dnd" attribute
const handler = (
  { nativeEvent }: { nativeEvent: MouseEvent | TouchEvent },
  { onActivation }: MouseSensorOptions | TouchSensorOptions
): boolean => {
  let cur: HTMLElement | null = nativeEvent.target as HTMLElement

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false
    }
    cur = cur.parentElement
  }

  return true
}

export class MouseSensor extends DnDKitMouseSensor {
  static activators = [
    {
      eventName: 'onMouseDown' as const,
      handler
    }
  ]
}

export class TouchSensor extends DnDKitTouchSensor {
  static activators = [
    {
      eventName: 'onTouchStart' as const,
      handler
    }
  ]
}
