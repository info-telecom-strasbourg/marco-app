import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { Preset } from "@/schemas/fouaille/preset";

type PresetStore = {
  presets: Preset[];
};

type PresetActions = {
  addPreset: (preset: Preset) => void;
  removePreset: (presetId: Preset["id"]) => void;
  updatePreset: (update: Partial<Preset>) => void;
};

export const usePresetStore = create<PresetStore & PresetActions>()(
  immer((set) => ({
    presets: [
      { name: "Test", category: 1, id: 1, products: [] },
      { name: "Demo", category: 3, id: 2, products: [] },
      { name: "Poe", category: 4, id: 3, products: [] },
    ],
    addPreset(preset) {
      return set((state) => {
        state.presets.push(preset);
      });
    },

    removePreset(presetId) {
      return set((state) => {
        const target = state.presets.findIndex(
          (preset) => preset.id === presetId,
        );
        state.presets.splice(target, 1);
      });
    },

    updatePreset(update) {
      return set((state) => {
        const presetId = state.presets.findIndex(
          (preset) => preset.id === update.id,
        )!;
        state.presets[presetId] = { ...update, ...state.presets[presetId] };
      });
    },
  })),
);
