import React, { useState, useEffect } from "react";


export const JPHTodos = () => {
    const [inputValue, setInputValue] = useState('');
    const [user, setUser] = useState('Daniel');
    const [todos, setTodos] = useState([]);
    const base_url = 'https://playground.4geeks.com/apis/fake/todos';


    // Crear Usuario
    const createUser = async () => {
        const url = base_url + '/user/' + user;
        const options = {
            method: 'POST',
            body: JSON.stringify([]),
            headers: { "Content-Type": 'application/json' }
        }
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.log('Error: ', response.status, response.statusText)
        }
    }

    // Listar Todos
    const getTodos = async () => {
        const url = base_url + '/user/' + user;
        const options = {
            method: 'GET',
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setTodos(data);
        } else {
            console.log('Error: ', response.status, response.statusText)
        }
    }

    // Actualizar Todos
    const updateTodos = async (newTask) => {
        const url = base_url + '/user/' + user;
        const options = {
            method: 'PUT',
            body: JSON.stringify([...todos, newTask]),
            headers: {
                "Content-Type": 'application/json',
            }
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const data = await response.json();
            setTodos(data);
        } else {
            console.log('Error: ', response.status, response.statusText)
            const errorData = await response.json();
            console.log('Detalles del error:', errorData);
        }
    };

    // Delete Todos
    const deleteUser = async () => {
        const url = base_url + '/user/' + user;
        const options = {
            method: 'DELETE',
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const data = await response.json();
            setTodos([])
        } else {
            console.log('Error: ', response.status, response.statusText)
        }
    };

    useEffect(() => {
        getTodos()
    }, []);

    const deleteTaskApi = async (newTodos) => {
        const url = base_url + '/user/' + user;
        const options = {
            method: 'PUT',
            body: JSON.stringify(newTodos),
            headers: {
                "Content-Type": 'application/json',
            }
        }
        const response = await fetch(url, options)
        if (response.ok) {
            const data = await response.json();
            setTodos(data);
        } else {
            console.log('Error: ', response.status, response.statusText)
            const errorData = await response.json();
            console.log('Detalles del error:', errorData);
        }
    };

    const deleteTask = (id) => {
        setTodos(todos.filter((item, currentIndex) => {
            return id !== item.id;
        }));
        deleteTaskApi(todos);
    };

    const handleOnSubmit = (event) => {
        event.preventDefault()
        const newTask = { label: inputValue, done: true }
        // setTodos([...todos, newTask])
        updateTodos(newTask)
        // setTodos()
        setInputValue('');
    }


    return (
        <div className="container my-3">
            <h1>Todos</h1>
            <button className="btn btn-success m-2" onClick={createUser}>Crear Usuario</button>
            {/* <button className="btn btn-warning m-2" onClick={getTodos}>Actualizar Tareas</button> */}
            <button className="btn btn-danger m-2" onClick={deleteUser}>Eliminar Usuario</button>
            <div>
                <form className="list-group-item" onSubmit={handleOnSubmit}>
                    <input className="form-control p-0" type="text" placeholder="¿Qué necesitas hacer?"
                        value={inputValue} onChange={e => { setInputValue(e.target.value) }}
                    />
                </form>
                <h3 className="text-primary">
                    {user} Todo List
                </h3>
                <ul className="list-group">
                    {todos.map((item) => {
                        return (
                            <li className="list-group-item d-flex justify-content-between align-items-center hidden-icon"
                                key={item.id}>
                                {item.label} - {item.done ? 'Terminado' : 'Pendiente'} <span className="fa fa-times"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => { deleteTask(index) }} />
                            </li>
                        )
                    })
                    }
                </ul>
                <div>{todos.length === 0 ? 'No hay tareas, añadir tareas' : todos.length === 1 ? '1 Tarea por hacer' : todos.length + ' Tareas por hacer'}</div>
            </div>
        </div>
    )
}