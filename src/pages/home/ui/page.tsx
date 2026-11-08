import { SwipeActions } from "@/entities/swipe-actions"

function Home() {
    return (
        <>
            <h1>Hello! It's home page</h1>

            {/* FIXME: добавить отдельный компонент в widgets/ui/swipe-actions-list */}
            <div className="border border-amber-700 w-fit p-3 m-auto overflow-hidden">
                <SwipeActions />
            </div>
        </>
    )
}

export default Home
