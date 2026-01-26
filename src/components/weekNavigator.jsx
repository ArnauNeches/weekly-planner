import { ArrowLeft, ArrowRight } from "lucide-react";

export default function WeekNavigator({children, prevWeek, nextWeek}){
    return (
        <div className="flex items-center justify-between gap-4 bg-slate-100 border border-slate-200 rounded-lg px-4 py-2 w-full max-w-md transition hover:shadow-md">
          <button
            onClick={prevWeek}
            className="p-1 text-slate-600 transition hover:scale-125 hover:text-slate-900"
            aria-label="Previous week"
          >
            <ArrowLeft />
          </button>

          <h3 className="text-md font-medium text-slate-800 text-center whitespace-nowrap">
            {children}
          </h3>

          <button
            onClick={nextWeek}
            className="p-1 text-slate-600 transition hover:scale-125 hover:text-slate-900"
            aria-label="Next week"
          >
            <ArrowRight />
          </button>
        </div>
    );
}