const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = ({ excercises }) => {
  return (
    <div>
      <Part excercise={excercises[0]} />
      <Part excercise={excercises[1]} />
      <Part excercise={excercises[2]} />
    </div>
  )
}

const Part = ({ excercise }) => {
  return (
    <p key={excercise.part}>
      {excercise.part} {excercise.amount}
    </p>
  )
}

const Total = ({ excercises }) => {
  return <p>Number of exercises {getTotal(excercises)}</p>
}
function getTotal(data) {
  let sum = 0
  data.map((excercise) => (sum += excercise.amount))
  return sum
}

const App = () => {
  const course = "Half Stack application development"
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14
  const excercises = [
    {
      part: part1,
      amount: exercises1,
    },
    {
      part: part2,
      amount: exercises2,
    },
    {
      part: part3,
      amount: exercises3,
    },
  ]

  return (
    <div>
      <Header course={course} />
      <Content excercises={excercises} />
      <Total excercises={excercises} />
    </div>
  )
}

export default App
