import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const addPhone = (event) => {
    event.preventDefault()
    const newPhone = {
      name: newName
    }
    setPersons(persons.concat(newPhone))
  }
  const handleNameChange = (event) => {
    console.log(event.target.value);
    const newName = event.target.value
    setNewName(newName)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPhone}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={person.name}>{person.name}</p>
      )

      )}
    </div>
  )
}

export default App