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
  const setErrorNotification = (error) => {
    setMessageStyle("error")
    setMessage(error.response.data.error)
    setTimeout(() => setMessage(null), 2000)
  }
  const setSucessfulNotification = (message) => {
    setMessageStyle("successful")
    setMessage(`update ${message} successful`)
    setTimeout(() => {
      setMessage(null)
    }, 2000);
  }

  const deleteHandle = (name, id) => {
    if (window.confirm(`Delete ${name}`)) {
      personService.deletePerson(id).then(() => {
        setSucessfulNotification(name)
      }).catch((error) => {
        setErrorNotification(error)
      })
      personService
        .getAll()
        .then(initialPerson => setPersons(initialPerson))
        .catch(error => setErrorNotification(error))
    }
  }

  const addPersons = (event) => {
    event.preventDefault()
    const index = persons.findIndex(e => e.name === newName)
    if (index >= 0) {
      const newObj = { ...persons[index], number: newNumber }
      personService.put(newObj.id, newObj).then((d) => {
        setSucessfulNotification(newName)
        personService
          .getAll()
          .then(initialPerson => setPersons(initialPerson))
          .catch(error => setErrorNotification(error))
      }).catch((error) => {
        setErrorNotification(error)
      })

      return
    }
    const newPerson = { name: newName, number: newNumber }
    personService.create(newPerson)
      .then(() => {
        setNewName("")
        setNewNumber("")
        setSucessfulNotification(newName)
        personService
          .getAll()
          .then(data => setPersons(data))
          .catch(error => setErrorNotification(error))
      }).catch((error) => {
        setErrorNotification(error)
      })
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