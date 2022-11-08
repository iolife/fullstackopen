import { useState } from 'react'
const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}
const StatisticLine = (props) => {
  const { text, value } = props
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  const { good, neutral, bad } = props
  if (good === 0 && neutral === 0 && bad === 0) {
    return (<tfoot><tr><td>no feedback given</td></tr></tfoot>)
  }
  return (
    <tfoot>
      <tr>
        <td>all</td>
        <td>{good + neutral + bad}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{(good + bad + neutral) / 3.0}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{(good * 1 + bad * 0 + neutral * -1) / (good + bad + neutral)} %</td>
      </tr>
    </tfoot>


  )

}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <p>give feedback</p>
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <p>statistics</p>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
        </tbody>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </table>


    </div>
  )
}

export default App