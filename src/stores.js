import { writable } from "svelte/store"

export const FilesStore = writable([])

export const PerFileStore = writable([])

export const FileCidStore = writable("")