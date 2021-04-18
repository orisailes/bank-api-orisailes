import React from 'react'

export default function Card ({user}){

    return(
        <div>
            <h2>User Name: {user.name}</h2>
            <h4>id: {user.id}</h4>
            <p>Cash: {user.cash}</p>
            <p>Credit: {user.credit}</p>
        </div>
        )
    
}