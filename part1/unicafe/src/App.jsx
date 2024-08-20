import { useState } from "react"

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const getAverage = () => {
    return (good + bad * -1) / all
  }
  const getGood = () => {
    return (good * 100) / all
  }

  return (
    <div>
      <h1>statistics</h1>
      {all > 0 ? (
        <table>
          <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={getAverage()} />
          <StatisticLine text='positive' value={getGood() + ' %'} />
          </tbody>
        </table>
      )
      : <p>No feedback given</p>
    }
    </div>
  )
}
const Button = ({text, action}) => {
  return (
    <button onClick={action}>{text}</button>
  )
}
const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button text='good' action={handleGoodClick} />
        <Button text='neutral' action={handleNeutralClick} />
        <Button text='bad' action={handleBadClick} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
