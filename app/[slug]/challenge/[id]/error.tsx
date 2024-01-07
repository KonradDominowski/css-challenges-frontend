"use client";

export default function Error({ error }: { error: Error }) {
  return <h1>There was an error fetching this task</h1>;
}
