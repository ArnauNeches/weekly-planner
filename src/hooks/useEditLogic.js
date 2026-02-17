import { useState, useRef, useEffect } from 'react';

export default function useEditLogic(handleEditTask, task, day){
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]); 

  function onSave(){
    if (editValue.trim()) {
        handleEditTask(day, task.id, editValue);
    } else {
        setEditValue(task.name); 
    }
    setIsEditing(false);
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") onSave();
    if (e.key === "Escape") {
        setEditValue(task.name);
        setIsEditing(false);
    }
  };

  function handleInputChange(event){
    setEditValue(event.target.value);
  }

  function handleClickEdit(){
    setIsEditing(true);
  }

  return {isEditing, editValue, inputRef, onSave, handleKeyDown, handleInputChange, handleClickEdit};
}