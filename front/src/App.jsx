import './App.css'
import MessageForm from './components/MessageForm'
import Messages from './components/Messages'

function App() {

  return (
    <>
      <div className="appCenter">
        <MessageForm />
        <Messages />
      </div>
    </>
  )
}

export default App
