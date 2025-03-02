// Set of possible cameras which can be used
export const cameraSet: Record<number, string> = {
  0: 'Red',
  1: 'Orange',
  2: 'Yellow',
  3: 'Green',
  4: 'Blue',
  5: 'Indigo',
  6: 'Violet',
  7: 'Ultraviolet',
}

// Type to store the state for a given photo slot
export interface PhotoSlotState {
  // Name of the slot (i.e. "Photo Slot #1")
  name: string,
  // Optional description of the photo
  description: string,
  // List of camera ids selected (e.g. 0, ..., 7)
  cameras: number[],
}

// Set of states for each individual photo slot
export type PhotoSetState = Record<number, PhotoSlotState>;
export const numberOfCameras = 16;