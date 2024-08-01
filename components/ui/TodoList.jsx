"useClient"
import React, { useState } from 'react'
import {  IoShareSocialOutline, IoSearchOutline } from 'react-icons/io5'
import { useCopyToClipboard } from 'usehooks-ts'
import TodoListItem from './TodoListItem'
import TodoListItemReadonly from './TodoListItemReadonly'

const TodoList = ({
  sharedUserFullName = "",
  owerUserId="",
  loading=false,
  todoListData=[],
  isReadOnly=false,
  onUpdate = (id, content) => {},
  onCreate = () => {},
  onDelete = (id) => {},
  onSearch = (terms) => {},
}) => {

  const [ userSearchInput, setUserSearchInput ] = useState("")
  const handleSearchEvent = () => {
    onSearch(userSearchInput)
    setUserSearchInput("")
  }
  
  const [ copiedText, copy ] = useCopyToClipboard() 
  const handleCopy = (text) => {
    const shareLink = `${process.env.NEXT_PUBLIC_AUTH_DIRECT_TO_HOME}/share/${owerUserId}`
    copy(shareLink)
      .then(() => {
        window.alert(`link copied :\n${ shareLink}`)
      })
      .catch((error)=> {
        console.log("Failed to copy", error)
      })
  }

  return (
    <section className="min-h-[70vh] bg-[#69CFCF]">
      <div className='w-full max-w-[800px] p-[20px]  mx-auto'>
        {/* header-logo and share */}
        <article className=' flex flex-row justify-between items-center font-bold text-[32px]'>
          <div className=''> 
            {sharedUserFullName && <div>{sharedUserFullName}</div>}
            Things to do:
          </div>
          <div
            onClick={ () => handleCopy()}
            className='flex flex-row items-center cursor-pointer text-[20px]'>
            share
            <IoShareSocialOutline />
          </div>
        </article>
        {
          !isReadOnly &&
          <article className='flex flex-col sm:flex-row gap-4 mt-8'>
            <div className=' flex flex-1 h-[60px]'>
              <input className='
                p-4
                flex-1
                bg-[#F7CB66]
                rounded-l-2xl
                font-bold
              '
              value={userSearchInput}
              onChange={(e) => {
                setUserSearchInput(e.target.value)
              }}
              onKeyDown={(e) => {
                if(e.key === "Enter"){
                  handleSearchEvent()
                }
              }}
              type="text" />
              <div  className='w-[60px]
                flex justify-center items-center
              bg-black rounded-r-2xl
                cursor-pointer'
                onClick={() => handleSearchEvent()}
              >  
                <IoSearchOutline size={40} color='#FFF'/>
              </div>
              <div 
                className='h-[60px] w-[200px] flex justify-center items-center bg-[#7EBB95] border border-black rounded-2xl font-bold cursor-pointer text-[20px]'
                onClick={onCreate}
              >
                New Task
              </div>
            </div>
          </article>
        }
        <div className='h-[2px] my-[10px] bg-black'></div>
        {
          todoListData?.length >= 1 ? (
          <ul className='flex flex-col gap-6'> 
            { (todoListData ?? []).map((todo) => {
              if (isReadOnly) 
              return <TodoListItemReadonly key={todo?.id} todo={todo} />
              return (
                <TodoListItem key={todo?.id} todo={todo}
                  onUpdate={onUpdate}
                  onDelete={onDelete}/>
              );
            })}
          </ul>) : (
          <div> {loading? "loading..." : "Empty"}</div>
          )
        }
      </div>
    </section>
  )
}

export default TodoList