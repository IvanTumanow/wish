import { swipeAction, useSwipeActions } from "@/entities/swipe-actions";

export default function SwipeActions() {
    const { moveOffset, resetMoveOffset, onPointerDownHandle, onPointerMoveHandle, onPointerUpHandle } = useSwipeActions()

    const onClickHandle = () => {
        resetMoveOffset()
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
                style={{ width: `${swipeAction.MAX_WIDTH_DRAGGING_PX}px` }}
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
                style={{ width: `${swipeAction.MAX_WIDTH_DRAGGING_PX}px` }}
                onClick={onClickHandle}
            >
                🗑️
            </button>
        </div>
    )
}
