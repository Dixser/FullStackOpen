const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (exercises) => {
  return (
    <div>
      <Part excercise={exercises.parts[0]} />
      <Part excercise={exercises.parts[1]} />
      <Part excercise={exercises.parts[2]} />
    </div>
  )
}

const Part = ({ excercise }) => {

  return (
    <p key={excercise.name}>
      {excercise.name} {excercise.exercises}
    </p>
  )
}

const Total = (exercises) => {
  console.log(exercises.parts)
  return (
    <p>
      Number of exercises{" "}
      {getTotal(exercises.parts[0].exercises, exercises.parts[1].exercises, exercises.parts[2].exercises)}
    </p>
  )
}
function getTotal(a,b,c) {
  return a+b+c
}

const App = () => {
  const course = "Half Stack application development"
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
