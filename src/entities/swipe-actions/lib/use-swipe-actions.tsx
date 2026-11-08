import { clamp } from "@/shared/general"
import { useState, useRef } from "react"
import { swipeAction } from "../config"

import type { PointerEvent, Ref } from "react"

export default function useSwipeActions() {
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const startDraggingX: Ref<number> = useRef<number>(0)

    const [moveOffset, setMoveOffset] = useState<number>(0)

    const resetMoveOffset = () => { setMoveOffset(0) }

    const onPointerDownHandle = (e: PointerEvent) => {
        setIsDragging(true)

        startDraggingX.current = e.clientX;
    }

    const onPointerUpHandle = () => {
        setIsDragging(false)

        setMoveOffset(Math.sign(moveOffset) * swipeAction.MAX_WIDTH_DRAGGING_PX)
    }

    const onPointerMoveHandle = (e: PointerEvent) => {
        if (!isDragging || !startDraggingX.current) return;

        const currentOffset = e.clientX - startDraggingX.current

        if (Math.abs(currentOffset) < swipeAction.MAX_WIDTH_DRAGGING_PX * swipeAction.DELTA_FOR_MOVE_RATIO) {
            resetMoveOffset()
            return;
        }

        setMoveOffset(clamp(-swipeAction.MAX_WIDTH_DRAGGING_PX, currentOffset, swipeAction.MAX_WIDTH_DRAGGING_PX))
    }



    return { moveOffset, resetMoveOffset, onPointerDownHandle, onPointerMoveHandle, onPointerUpHandle }
}