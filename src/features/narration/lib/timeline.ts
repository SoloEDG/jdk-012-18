export type TranscriptSegment = { transcript: string[]; duration: number };
export function captionAt(a: TranscriptSegment, elapsed: number): string {
  return a.transcript[
    Math.min(
      a.transcript.length - 1,
      Math.floor((elapsed / a.duration) * a.transcript.length),
    )
  ];
}
export function segmentStartAt(a: TranscriptSegment, elapsed: number): number {
  const index = Math.min(
    a.transcript.length - 1,
    Math.floor((elapsed / a.duration) * a.transcript.length),
  );
  return (index * a.duration) / a.transcript.length;
}
export function remainingSegments(
  a: TranscriptSegment,
  elapsed: number,
): number {
  return Math.max(
    0,
    a.transcript.length -
      Math.floor((elapsed / a.duration) * a.transcript.length),
  );
}
export function formatTime(seconds: number): string {
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")}`;
}
