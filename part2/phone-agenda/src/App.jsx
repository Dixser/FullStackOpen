import { useState, useEffect } from "react"
import { Filter } from "./Filter.jsx"
import { PersonForm } from "./PersonForm.jsx"
import { Persons } from "./Persons.jsx"

import phoneService from "./services/phones.js"

const App = () => {
  const [persons, setPersons] = useState([])
  /*   const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]) */

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    phoneService.getAll().then((response) => {
      setPersons(response.data)
    })
  }, [])

  const deletePhone = (id, name) => {
    if (window.confirm(`Confirm removing ${name} from the list?`)) {
      phoneService.deletePhone(id).then(() => {
        setPersons(persons.filter((n) => n.id !== id))
      })
    }
  }

  const addPhone = (event) => {
    event.preventDefault()
    const phoneExists = persons.find((person) => person.name === newName)

    if (phoneExists) {
      if (
        confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPhone = {
          ...phoneExists,
          number: newNumber,
        }
        phoneService.update(changedPhone.id, changedPhone).then(() => {          
          setPersons(persons.map(person => person.id !== changedPhone.id ? person : changedPhone))
        })
      }
    } else {
      const newPhone = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString(),
      }
      phoneService.create(newPhone).then((response) => {
        setPersons(persons.concat(newPhone))
        console.log(response)
      })
    }
  }

  const handleNumberChange = (event) => {
    const newNumber = event.target.value
    setNewNumber(newNumber)
  }
  const handleNameChange = (event) => {
    const newName = event.target.value
    setNewName(newName)
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
  }
  const filteredPersons =
    filter === ""
      ? persons
      : persons.filter((person) => person.name.includes(filter))
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} action={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPhone={addPhone}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      {/* <PersonForm name={newName} number={newNumber}/> */}
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} action={deletePhone} />
    </div>
  )
}

export default App
