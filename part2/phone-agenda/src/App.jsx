import { useState, useEffect } from "react"
import { Filter } from "./Filter.jsx"
import { PersonForm } from "./PersonForm.jsx"
import { Persons } from "./Persons.jsx"
import axios from "axios"

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
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data);
        setPersons(response.data);
      })
  }, [])
  const addPhone = (event) => {
    event.preventDefault()
    const phoneExists = persons.find((person) => person.name === newName)

    if (phoneExists) {
      alert(`${newName} is already on the list`)
    } else {
      const newPhone = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(newPhone))
    }
  }
  const handleNumberChange = (event) => {
    const newNumber = event.target.value
    console.log(newNumber)

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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
