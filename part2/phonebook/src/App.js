import axios from 'axios'
import { useEffect, useState } from 'react'
const Display = (props) => {
  return (
    <div>
      {props.person.name} {props.person.number}
    </div>
  )
}
const Persons = ({ notesToShow }) => {
  return (
    <>{notesToShow.map((person) => <Display person={person} key={person.name} />)}</>
  )

}
const Filter = ({ onChangeHandle, value }) => {
  return (
    <div>filter shown with <input onChange={onChangeHandle} value={value} /></div>
  )

}
const PersonForm = ({ addPersons, onChangeNameHandle, newName, onChangeNumberHandle, newNumber }) => {
  return (
    <form onSubmit={addPersons}>
      <div>
        name: <input onChange={onChangeNameHandle} value={newName} />
      </div>
      <div>
        number: <input onChange={onChangeNumberHandle} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>)
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  useEffect(()=>{
    axios.get("http://localhost:3001/persons").then((response)=>{setPersons(response.data)})
  },[])
  const onChangeNameHandle = (event) => {
    setNewName(event.target.value)
  }
  const onChangeNumberHandle = (event) => {
    setNewNumber(event.target.value)
  }
  const onChangeFilterHandle = (event) => {
    setFilterName(event.target.value)
  }

  const addPersons = (event) => {
    event.preventDefault()
    if (newName === "") {
      alert("name is null")
      return
    }
    const index = persons.findIndex(e => e.name === newName)
    if (index >= 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = { name: newName, number: newNumber }
    setPersons(persons.concat(newPerson))
  }
  const notesToShow = filterName ? persons.filter(e => e.name === filterName) : persons
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChangeHandle={onChangeFilterHandle} value={filterName} />
      <h2>Add New</h2>
      <PersonForm addPersons={addPersons} onChangeNameHandle={onChangeNameHandle} newName={newName} onChangeNumberHandle={onChangeNumberHandle} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons notesToShow={notesToShow} />
    </div>
  )
}

export default App