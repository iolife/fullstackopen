const Display = (props) => {
    return (
        <div>
            {props.person.name} {props.person.number}
            <button onClick={() => props.deleteHandle(props.person.name, props.person.id)}>delete</button>
        </div>
    )
}
const Persons = ({ notesToShow, deleteHandle }) => {
    return (
        <>
            {
                notesToShow.map(
                    (person) => <Display
                        person={person}
                        key={person.id}
                        deleteHandle={deleteHandle} />
                )
            }
        </>
    )

}
const Filter = ({ onChangeHandle, value }) => {
    return (
        <div>
            filter shown with <input onChange={onChangeHandle} value={value} />
        </div>
    )

}
const PersonForm = ({ addPersons, onChangeNameHandle, newName, onChangeNumberHandle, newNumber }) => {
    return (
        <form onSubmit={addPersons}>
            <div>
                name: <input onChange={onChangeNameHandle} value={newName} />
            </div>
            <div>
                number: <input onChange={onChangeNumberHandle} value={newNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>)
}
const Notification = ({ message, styleName }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={styleName}>
            {message}
        </div>
    )
}
export { Filter, PersonForm, Persons, Notification }
export default Persons
