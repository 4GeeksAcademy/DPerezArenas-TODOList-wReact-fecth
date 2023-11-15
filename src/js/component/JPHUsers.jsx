import React, { useEffect, useState } from "react";


export const JPHUsers = () => {
    const [users, setUsers] = useState('')

    const getUsers = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (response.ok) {
            const data = await response.json();
            setUsers(data);
        } else {
            console.log('Error: ', response.status, response.statusText);
        }
    }

    useEffect(() => {
        getUsers()
    }, []);

    return (
        <div className="container mt-3">
            <h1>Users</h1>
            <div>
                <ul className="list-group">
                    {users ?
                        users.map(item, index => {
                            return (
                                <li className="list-group-item d-flex justify-content-between align-items-center hidden-icon">
                                    {item.name} <span className="fa fa-times"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setUsers(users.filter((t, currentIndex) => index !== currentIndex))} />
                                </li>
                            )
                        })
                        : ''}
                </ul>
            </div>
        </div>
    )
}