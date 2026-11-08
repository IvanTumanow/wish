import { clamp } from "@/shared/general";
import { useRef, useState } from "react"
import type { PointerEvent, Ref } from "react"

export default function SwipeActions() {
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const MAX_WIDTH_DRAGGING_PX: number = 125;
    const startDraggingX: Ref<number> = useRef<number>(0)

    const [moveOffset, setMoveOffset] = useState<number>(0)

    const onPointerDownHandle = (e: PointerEvent) => {
        setIsDragging(true)

        startDraggingX.current = e.clientX;
    }

    const onPointerUpHandle = () => {
        setIsDragging(false)

        setMoveOffset(Math.sign(moveOffset) * MAX_WIDTH_DRAGGING_PX)
    }

    const onPointerMoveHandle = (e: PointerEvent) => {
        if (!isDragging || !startDraggingX.current) return;

        const currentOffset = e.clientX - startDraggingX.current

        if (Math.abs(currentOffset) < MAX_WIDTH_DRAGGING_PX / 3) {
            setMoveOffset(0);
            return;
        }     

        setMoveOffset(clamp(-MAX_WIDTH_DRAGGING_PX, currentOffset, MAX_WIDTH_DRAGGING_PX))
    }

    const onClickHandle = () => {
        setMoveOffset(0)
        console.log('click')
    }

    return (
        <div
            className={
                `flex border border-red-600 w-fit relative select-none cursor-grab`
            }
            onPointerDown={onPointerDownHandle}
            onPointerUp={onPointerUpHandle}

            onPointerMove={onPointerMoveHandle}
        >
            <button
                className={`border hover:bg-amber-100 absolute bg-green-600 left-0 z-0 h-full`}
                style={{ width: `${MAX_WIDTH_DRAGGING_PX}px` }}
                onClick={onClickHandle}
            >
                ✅
            </button>

            <div
                className="bg-white relative z-1 p-2"
                style={
                    {
                        transform: `translateX(${moveOffset}px)`,
                        transition: 'transform 0.3s ease-out'
                    }}
            >
                Смахни меня и еще какой-то длинный текст
            </div>

            <button
                className={`border hover:bg-amber-100 absolute bg-red-500 right-0 z-0 h-full`}
                style={{ width: `${MAX_WIDTH_DRAGGING_PX}px` }}
                onClick={onClickHandle}
            >
                🗑️
            </button>
        </div>
    )
}
