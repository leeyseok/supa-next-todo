
// for server module
"use server";

import { createServerSideClient } from "@/lib/supabase";

// SSR


// todoList get
export const getTodos = async () =>  {
    const supabase = await createServerSideClient();    
    const result = await supabase
        .from("todos_with_rls")
        .select("*")
        .is("deleted_at", null)
        .order("id", {
            ascending: false
        })
        return result.data
}

// todoList get with id
export const getTodosById = async(id:number) => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_with_rls")
        .select("*")
        .is("deleted_at", null)
        .eq("id", id)
    return result.data
}
// todoList get with Userid
export const getTodosByUserId = async(userId:string) => {
    const supabase = await createServerSideClient(true);
    const result = await supabase
        .from("todos_with_rls")
        .select("*")
        .is("deleted_at", null)
        .eq("user_id", userId)
    return result.data
}

// todoList search
export const getTodosBySearch = async(terms:string) => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_with_rls")
        .select("*")
        .is("deleted_at", null)
        .like("content", `%${terms}%`)
        .order("id", { ascending: false})
        .limit(500) // 500개까지
    return result.data
}

// todoList create
export const createTodos = async(content:string) => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_with_rls")
        .insert({content})
        .select();
    console.log(result)
    return result.data
}

// todoList update
export const updateTodos = async( id: number, content:string) => {
    const supabase = await createServerSideClient();
    const result = await supabase
    .from("todos_with_rls")
    .update({content, updated_at: new Date().toISOString()})
    .eq("id", id)
    .select()
    console.log(result)
    return result
}

// todoList softDelete
export const deleteTodosSoft = async( id: number ) => {
    const supabase = await createServerSideClient();
    const result = await supabase
    .from("todos_with_rls")
    .update({deleted_at: new Date().toISOString(), updated_at: new Date().toISOString()})
    .eq("id", id)
    .select()
    return result
}

// todoList hardDelete
// export const deleteTodosHard = async( id: number ) => {
//     const supabase = await createServerSideClient();
//     const result = await supabase
//     .from("todos_with_rls")
//     .delete()
//     .eq("id", id) 
//     return result
// }
