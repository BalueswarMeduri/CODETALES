import React, { useState } from 'react'
import { Input } from './ui/input'
import { useNavigate } from 'react-router-dom'
import { RouteSearch } from '@/helpers/RouteName'

const Searchbox = () => {
  const navigate = useNavigate()
  const [query, setQuery]=useState()

  const getInput = (e)=>{
      setQuery(e.target.value)
  }
  const handlesumbmit = (e)=>{
    e.preventDefault()
    navigate(RouteSearch(query))
  }
  return (
    <div>
        <form onSubmit={handlesumbmit}>
            <Input name="q" onInput={getInput} placeholder = "Search here..." className="h-9"/> 
        </form>
    </div>
  )
}

export default Searchbox