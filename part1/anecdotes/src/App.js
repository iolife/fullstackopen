import { useState } from 'react'

const Button = ({ text, onclick }) => {
  return (
    <button onClick={onclick}>
      {text}
    </button>
  )
}
const MostVote = ({ text, value }) => {
  if (value === 0) {
    return (<></>)
  }
  return (
    <div>
      <h1>anecdotes with most votes</h1>
      <p>{text}</p>
      <p>has votes {value}</p>
    </div>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVote, setmostVote] = useState({ index: 0, value: 0 })
  const votesHandle = () => {
    const copy = [...votes]
    copy[selected]++
    if (copy[selected] > mostVote.value) {
      const newmostVote = { index: selected, value: copy[selected] }
      setmostVote(newmostVote)
    }
    setVotes(copy)
  }
  const [selected, setSelected] = useState(0)
  const nextClickHandle = () => {
    const number = Math.floor(Math.random() * anecdotes.length)
    setSelected(number)
  }

  return (
    <div>
      <h1>anecdotes a days</h1>
      {anecdotes[selected]}
      <br />
      <p>has {votes[selected]} votes </p>
      <Button text="vote" onclick={votesHandle} />
      <Button text="next" onclick={nextClickHandle} />
      <MostVote text={anecdotes[mostVote.index]} value={mostVote.value} />
    </div>
  )
}

export default App