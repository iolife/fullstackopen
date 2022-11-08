
const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
}
const Part = (props) => {
    return (
        <>
            <p>{props.part.name} {props.part.exercises}</p>
        </>)
}
const Content = (props) => {
    console.log("xxxxxxxxxxx", props)

    return (<>
        {props.parts.map(part => <Part part={part} key={part.id} />)}
    </>)
}
const Total = (props) => {
    const { parts } = props
    console.log(parts)
    const t = parts.reduce(
        (a, b) => {
            a.exercises = a.exercises + b.exercises
            return a
        }, { exercises: 0 }

    )
    return (
        <>
            <p>Number of exercises {t.exercises}</p>
        </>
    )
}
const Course = (props) => {
    console.log(props)
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}
export default Course;