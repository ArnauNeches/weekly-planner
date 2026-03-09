import { useEffect, useMemo } from "react";
import { X, CheckCircle, Clock, XCircle } from "lucide-react";
import { motion } from "motion/react";

export default function StatisticsModal({ isOpen, onClose, weekData }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const stats = useMemo(() => {
        let pending = 0, completed = 0, cancelled = 0;
        
        Object.values(weekData).forEach(dayTasks => {
            dayTasks.forEach(task => {
                if (task.status === 'pending') pending++;
                if (task.status === 'completed') completed++;
                if (task.status === 'cancelled') cancelled++;
            });
        });

        const total = pending + completed + cancelled;
        return { pending, completed, cancelled, total };
    }, [weekData]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative"
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-slate-800 mb-6">Weekly Stats</h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-700">
                            <Clock className="text-blue-500" size={20} />
                            <span className="font-medium">Pending</span>
                        </div>
                        <span className="text-lg font-bold">{stats.pending}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                        <div className="flex items-center gap-2 text-emerald-700">
                            <CheckCircle className="text-emerald-500" size={20} />
                            <span className="font-medium">Completed</span>
                        </div>
                        <span className="text-lg font-bold text-emerald-700">{stats.completed}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-rose-50 rounded-lg border border-rose-100">
                        <div className="flex items-center gap-2 text-rose-700">
                            <XCircle className="text-rose-500" size={20} />
                            <span className="font-medium">Not Done</span>
                        </div>
                        <span className="text-lg font-bold text-rose-700">{stats.cancelled}</span>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
                    <span>Total Tasks</span>
                    <span className="font-bold">{stats.total}</span>
                </div>
            </motion.div>
        </div>
    );
}