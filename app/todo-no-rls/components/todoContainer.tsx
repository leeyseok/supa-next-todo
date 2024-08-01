"use client"
import { getTodos } from '@/apis/todo-no-rls'
import React, { useEffect } from 'react'
import useTodosController from '../hooks/useTodosController'
import TodoList from '@/components/ui/TodoList'

interface TodoContainerProps {
  owerUserId?: string;
}
const TodoContainer = ({owerUserId}:TodoContainerProps) => {
  
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onUpdateTodos,
    onDeleteTodos,
    onSearchTodos,
  } = useTodosController() 
  return (
    <div>
      <TodoList
        sharedUserFullName=''
        owerUserId={owerUserId}
        loading={loading}
        todoListData={todos}
        isReadOnly={false}
        // onUpdate={(id, content ) => {
        //   onUpdateTodos(id, content)
        //   console.log("id, content", id, content)
        // }}
        onUpdate={onUpdateTodos}
        onCreate={onCreateEmptyTodos}
        onDelete={onDeleteTodos}
        onSearch={onSearchTodos}
      />
    </div>
  )
}

export default TodoContainer