import { sleep } from '@/lib/utils';
import React from 'react';
import { getProfileById } from '@/actions/auth/user.action';
import { permanentRedirect } from 'next/navigation';
import TodoContainer from './components/todoContainer';
interface SharePage {
  params: { user_id:string };
  searchParams: {};
}

const page = async ( props:SharePage ) => {
  console.log('props', props)
  const userId = props?.params?.user_id
  const profile = await getProfileById({ serverComponet: true, userId})
  const userNmae = profile?.username
  if (!profile) {
    permanentRedirect("/");
    console.log("profile없음")
  }
  console.log(userId)
  return <div>
    <TodoContainer sharedUserFullName={userNmae ?? ""}
    owerUserId={userId}/>
  </div>
}

export default page