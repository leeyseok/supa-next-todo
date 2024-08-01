"useClinet"
import React, { useState } from 'react'

const TodoListItemReadonly = ( {todo } ) => {
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
          <div
          className='flex-1 text-[18px] cursor-pointer'
          >
          {todo?.content}
          </div> 
        </>
      </article>
    </li>
  )
}

export default TodoListItemReadonly