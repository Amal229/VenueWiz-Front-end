import React from "react"
import { Routes, Route } from "react-router-dom"
import Invitation from "./components/Invitation"

const App = () => {
  return (
    <div>
      {/* nav */}
      <main>
        <div className="App">
          <Routes>
            <Route
              path="/invitation"
              element={
                <Invitation
                  invitationMessage="You are invited!"
                  invitationLink="https://imgur.com/a/p6rcdic"
                />
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
