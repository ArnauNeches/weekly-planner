import { useState } from "react";

export default function useInputTask(){
  const [newTask, setNewTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleNewInputTask(event){
    setNewTask(event.target.value);
  }

  function resetInputTask(){
    setNewTask("");
  }

  function resetErrorMessage(){
    setErrorMessage("");
  }

  function setInvalidErrorMessage(){
    setErrorMessage("Invalid Input");
  }

  return {newTask, errorMessage, handleNewInputTask, resetInputTask, resetErrorMessage, setInvalidErrorMessage}
}