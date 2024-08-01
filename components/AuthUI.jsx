"use client"
import React, { useEffect, useState, useCallback } from 'react'
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { createSuperbaseBrowserClient } from '@/lib/client/supabase'
import useHydrate from '@/hooks/useHydrate'
const AuthUI = () => {
  const supabase = createSuperbaseBrowserClient()
  const isMount = useHydrate()
  const [ user, setUser] = useState()

  const getUserInfo = useCallback(
    async () => {
      const result = await supabase.auth.getUser()
      console.log(result)
      if (result?.data.user) setUser(result?.data.user);
    }  
  , [supabase]);

  const handleLogout = async () => {
    supabase.auth.signOut();
    window.location.reload();
  }
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo])

  // 컴포넌트말고 직접 정의할 때 버튼에 바인딩
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_DIRECT_TO,
      }
    })
  }
  // 컴포넌트말고 직접 정의할 때 버튼에 바인딩
  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_DIRECT_TO,
      }
    })
  }
  if (!isMount) return null;
  return (
    <section className='w-full p-10'>
      <div> { user? `login: ${user?.email}` : `logout` }</div>
      <>
      {
       user && <button onClick={handleLogout} className='border-black border-2'>logout</button>
      }
      </>
      <div></div>
      <div className='max-w-[500px] h-100% mx-auto justify-center items-center'>
          <Auth 
            redirectTo={process.env.NEXT_PUBLIC_AUTH_DIRECT_TO}
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
            }}
            onlyThirdPartyProviders
            providers={["google", "github"]}
            />
      </div>
    </section>
  )
}

export default AuthUI