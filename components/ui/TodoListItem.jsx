"useClinet"
import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { CiCircleCheck, CiEdit } from 'react-icons/ci'

const TodoListItem = ( {todo, onDelete = () => {}, onUpdate = () => {}} ) => {
  const [ isEdit, setIsEdit] = useState(false)
  const [ userInput, setUserInput ] = useState(todo.content ?? "")

  const onStartEdit = () => {
    setIsEdit(true)
  }

  // 수정 
  const onFinishEdit = () => {
    onUpdate(todo.id, userInput)
    setIsEdit(false)
  }
  // 삭제
  const onClickDelete = () => {
    onDelete(todo.id)
  }
  return (
    <li
      className='
        min-h-[60px]
      bg-[#8280D9] border border-black rounded-2xl
        font-bold group
      '
    >
      <article
        className='
          min-h-[60px]
          flex flex-col sm:flex-row gap-4
          p-4
          items-center
        '
      >
        <>
        {
          isEdit ? (
            <input 
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value)
              }}
              className='flex-1 text-[18px]'
            ></input>
          ) : (
            <div
            onClick={onStartEdit}
            className='flex-1 text-[18px] cursor-pointer'
            >
            {todo?.content}
            </div>
          )
        }
        </>
          
        <div className='w-fit hidden group-hover:flex self-end gap-[8px]'>
          {
            isEdit ? (
              <div 
                onClick={onFinishEdit}
                className='
                  h-[45px] w-[45px]
                  flex justify-center items-center
                  bg-[#7EBB95] border border-black rounded-2xl
                  cursor-pointer
                '
              >
                <CiCircleCheck size={30}/>
              </div>
            ) : (
              <div
                onClick={onStartEdit}
                className='
                  h-[45px] w-[45px]
                  flex justify-center items-center
                  bg-[#7EBB95] border border-black rounded-2xl
                  cursor-pointer
                '
              >
              <CiEdit size={30} />
              </div>
            )
          }
          <div
            onClick={onClickDelete}
            className='
              h-[45px] w-[45px]
              flex justify-center items-center
              bg-[#db6013] border border-black rounded-2xl
              cursor-pointer
              '
          >
            <AiOutlineDelete />
          </div>
        </div>
      </article>
    </li>
  )
}

export default TodoListItem