export default function TaskItem({name, status, createdAt}) {
    return (
        <div className="w-sm min-h-12 bg-gray-100 rounded-xl flex items-center justify-between pl-4 group">
            <span className="text-lg font-medium">{name}</span>
            <select name="status" id="version-select" className="bg-gray-200 rounded-md border border-black cursor-pointer">
                <option value="Pending">Pending</option>
                <option value="Completed">Done</option>
                <option value="Not completed">Not done</option>
            </select>
            <button className="text-red-600 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-120 relative">
                <svg className="absolute -top-2 -left-6 w-7 h-7 fill-current">
                    <use href="src/assets/svg/icons.svg#delete"></use>
                </svg>
            </button>
        </div>
    )
}