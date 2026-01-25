import {ListPlus} from "lucide-react"

export default function NewItem(){
    return (
      <div className="bg-slate-100 p-2 rounded-xl hover:shadow-md flex justify-between items-start">
        <input className="bg-slate-300 border-2 border-black rounded-xl p-1" type="text" />
        <button className="text-black transition-all cursor-pointer hover:scale-125">
          <ListPlus size={18} />
        </button>
      </div>
    );
}