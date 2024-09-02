export const Course = ({course}) => {
    const total = course.parts.map(part => part.exercises).reduce((sum, num) => sum + num, 0);  
  
    return <>
    <Header name={course.name}/>
    {course.parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
    <Total total={total}/>
    </>
  }
  const Header = ({name}) => {
    return (<h1>{name}</h1>)
  }
  const Part = ({name, exercises}) => {
    return <p>{name} {exercises}</p>
  }
  const Total = ({total}) => {
    return <p><strong>Total of {total} exercises</strong></p>
  }