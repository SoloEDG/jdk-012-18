import { useState, useEffect } from "react";
import { loadDocument, saveDocument } from "../../../shared/storage";
import { artworkById, partById } from "../../../shared/catalog";
export function useCollection() {
  const [document, setDocument] = useState(loadDocument);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    setStorageError(!saveDocument(document));
  }, [document]);
  return {
    document,
    storageError,
    toggle: (id: string) =>
      setDocument((d) => ({
        ...d,
        favorites: d.favorites.includes(id)
          ? d.favorites.filter((x) => x !== id)
          : [...d.favorites, id],
      })),
    note: (id: string, text: string) =>
      setDocument((d) => ({ ...d, notes: { ...d.notes, [id]: text } })),
    record: (id: string, seconds: number, partId?: string | null) => {
      const a = artworkById(id);
      if (!a) return;
      const part = partId ? partById(a, partId) : undefined;
      setDocument((d) => {
        const previous = d.visits.find((v) => v.id === id);
        if (!previous)
          return {
            ...d,
            visits: [
              ...d.visits,
              {
                id,
                seconds,
                at: Date.now(),
                ...(part ? { parts: { [part.id]: seconds } } : {}),
              },
            ],
          };
        return {
          ...d,
          visits: d.visits.map((v) =>
            v.id === id
              ? {
                  ...v,
                  seconds: v.seconds + seconds,
                  parts: part
                    ? {
                        ...(v.parts ?? {}),
                        [part.id]: (v.parts?.[part.id] ?? 0) + seconds,
                      }
                    : v.parts,
                }
              : v,
          ),
        };
      });
    },
  };
}
