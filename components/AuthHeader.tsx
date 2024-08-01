"use client"
import React from 'react'
import { User } from '@supabase/supabase-js'
import { createSuperbaseBrowserClient } from '@/lib/client/supabase'
// import { useRouter } from 'next/router' under  next.js ver12
import { useRouter } from 'next/navigation'
import { AiOutlineLogout } from 'react-icons/ai'
import { FcTodoList, FcGoogle } from 'react-icons/fc'

interface AuthHeaderProps {
    user?: User | null
}

const AuthHeader = ( {user}: AuthHeaderProps ) => {  
  const isLoggedIn = !!user?.email;
  const supabase = createSuperbaseBrowserClient();
  const router = useRouter()

  const goToHome = () => {
    router.push("/");
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_DIRECT_TO,
      }
    })
  }
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <header className='h-[50px] bg-white'>
      <section className='px-6 h-full'>
        <div className='h-full flex flex-row justify-between items-center'>
          <div  
            onClick={goToHome}
            className='flex flex-row items-center cursor-pointer gap-4 '>
            TODO <FcTodoList size={30}/>
          </div>

          {isLoggedIn ? (
              <div
                onClick={handleLogout}
                className='flex flex-row items-center cursor-pointer gap-2'
              >
                Logout
                <AiOutlineLogout size={30}/>
              </div>
            ) : (
              <div
                onClick={handleGoogleLogin}
                className='flex flex-row items-center cursor-pointer gap-2'
              >
                Login
                <FcGoogle size={30}/>
              </div>
            ) 
          }
        </div>
      </section>
    </header>
  ) 
}

export default AuthHeader