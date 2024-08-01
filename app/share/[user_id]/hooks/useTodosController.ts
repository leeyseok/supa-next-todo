import {
    createTodos,
    deleteTodosSoft,
    getTodos,
    getTodosBySearch,
    getTodosByUserId,
    updateTodos
} from "@/actions/todo/todo.action";
import { Database } from "@/types/supabase";
import { useState, useEffect, useCallback } from "react"

type TodoDto = Database["public"]["Tables"]["todos_no_rls"]["Row"];

type PostgrestSingleResponse<T> = { data: T | null; error: any };

const useTodosController = (userId="") => {
    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState<TodoDto[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    const onGetTodos = useCallback(
        async () => {
            setLoading(true)
            try {
                const resultTodos = await getTodosByUserId(userId);
                if (resultTodos ) setTodos(resultTodos)
                    
                // const response = await getTodos();   
                // if (response.error) {
                //   setError(response.error.message || "An error occurred");
                //   console.error("Error fetching todos:", response.error);
                // } else if (response.data) {
                //     // 데이터가 있으면 변환하여 상태에 설정
                //     const searchedTodos: TodoDto[] = response.data.map(todo => ({
                //         id: todo.id,
                //         content: todo.content,
                //         created_at: todo.created_at,
                //         deleted_at: todo.deleted_at,
                //         updated_at: todo.updated_at
                //     }));
                //     setTodos(searchedTodos);
                // } else {
                //     console.error("No data returned");
                // }
            } catch (error) {
                 console.log(error)
            } finally {
                setLoading(false)
            }
    }, [userId])
    useEffect(() => {
        onGetTodos()
    }, [onGetTodos])
    // todo create
    const onCreateEmptyTodos = async() => {
        await createTodos("");
        await onGetTodos();
    };

    // todo update
    const onUpdateTodos = async(id: number, content:string) => {
        await updateTodos(id, content)
        await onGetTodos()
    };

    // todo delete
    const onDeleteTodos = async(id: number ) => {
        await deleteTodosSoft(id)
        await onGetTodos()
    };

    // todo search
    const onSearchTodos = async(terms:string) => {
        if (terms) {
            const todoResult = await getTodosBySearch(terms)
            if(todoResult) {
                setTodos(todoResult)
            }
        } else {
            await onGetTodos()
        }
    }
    return { loading, todos, onCreateEmptyTodos, onUpdateTodos, onDeleteTodos, onSearchTodos }
}

export default useTodosController