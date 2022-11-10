import { useEffect, useState } from 'react'
import personService from "./service/phonebook"
import { PersonForm, Persons, Filter, Notification } from './components/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [messgeStyle, setMessageStyle] = useState(null)
  useEffect(() => { personService.getAll().then((initialPerson) => setPersons(initialPerson)) }, [])
  const onChangeNameHandle = (event) => {
    setNewName(event.target.value)
  }
  const onChangeNumberHandle = (event) => {
    setNewNumber(event.target.value)
  }
  const onChangeFilterHandle = (event) => {
    setFilterName(event.target.value)
  }
  const deleteHandle = (name, id) => {
    if (window.confirm(`Delete ${name}`)) {
      personService.deletePerson(id).catch((error) => {
        setMessageStyle("error")
        setMessage(`Person '${name}' was already removed from server`)
        setTimeout(() => setMessage(null), 2000)
      })
      setPersons(persons.filter((e) => { return e.id !== id }))
      setMessageStyle("successful")
      setMessage(`Person '${name}' is already removed from server`)
      setTimeout(() => {
        setMessage(null)
      }, 2000);
    }
  }
  const addPersons = (event) => {
    event.preventDefault()
    if (newName === "") {
      alert("name is null")
      return
    }
    const index = persons.findIndex(e => e.name === newName)
    if (index >= 0) {
      const newObj = { ...persons[index], number: newNumber }
      personService.put(newObj.id, newObj).then((d) => {
        setPersons(persons.map((e) => { return e.name === newName ? newObj : e }))
      })
      setMessageStyle("successful")
      setMessage(`update ${newName} successful`)
      setTimeout(() => {
        setMessage(null)
      }, 2000);
      return
    }
    const newPerson = { name: newName, number: newNumber }
    personService.create(newPerson)
      .then((createPerson) => {
        setPersons(persons.concat(createPerson));
        setNewName("")
      }).catch(() => {
        setMessage(`add ${newName} faild`)
        setMessageStyle("error")
        setTimeout(() => {
          setMessage(null)
        }, 2000);
      })
    setMessage(`add ${newName} successful`)
    setMessageStyle("successful")
    setTimeout(() => {
      setMessage(null)
    }, 2000);
    return
  }
  const notesToShow = filterName ? persons.filter(e => e.name === filterName) : persons
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message}
        styleName={messgeStyle}
      />
      <Filter
        onChangeHandle={onChangeFilterHandle}
        value={filterName} />
      <h2>Add New</h2>
      <PersonForm
        addPersons={addPersons}
        onChangeNameHandle={onChangeNameHandle}
        newName={newName}
        onChangeNumberHandle={onChangeNumberHandle}
        newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons
        notesToShow={notesToShow}
        deleteHandle={deleteHandle} />
    </div>
  )
}

export default App