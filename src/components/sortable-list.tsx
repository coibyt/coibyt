"use client";

import { useId, type ReactNode } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/** What a row gets to wire up its drag handle. */
export type DragHandle = { ref: (el: HTMLElement | null) => void; props: Record<string, unknown>; dragging: boolean };

/** One draggable row; `children` gets the drag-handle props. */
function SortableRow({
  id,
  disabled,
  children,
}: {
  id: string;
  disabled: boolean;
  children: (handle: DragHandle) => ReactNode;
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id, disabled });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 20 : undefined, position: "relative" }}
      className={isDragging ? "opacity-90 drop-shadow-xl" : undefined}
    >
      {children({ ref: setActivatorNodeRef, props: { ...attributes, ...listeners }, dragging: isDragging })}
    </div>
  );
}

/** A section of a list whose rows can be dragged into order. */
export function SortableSection({
  items,
  disabled,
  onReorder,
  renderRow,
}: {
  items: { id: string }[];
  disabled: boolean;
  onReorder: (ids: string[]) => void;
  renderRow: (id: string, handle: DragHandle | null) => ReactNode;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  // A stable id keeps dnd-kit's generated aria ids the same on the server
  // and in the browser (otherwise every section is a hydration mismatch).
  const dndId = useId();
  const ids = items.map((i) => i.id);
  function onDragEnd(e: DragEndEvent) {
    if (!e.over || e.active.id === e.over.id) return;
    const from = ids.indexOf(String(e.active.id));
    const to = ids.indexOf(String(e.over.id));
    if (from < 0 || to < 0) return;
    onReorder(arrayMove(ids, from, to));
  }
  if (disabled) return <>{ids.map((id) => renderRow(id, null))}</>;
  return (
    <DndContext id={dndId} sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {ids.map((id) => (
            <SortableRow key={id} id={id} disabled={disabled}>
              {(handle) => renderRow(id, handle)}
            </SortableRow>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
