import React from "react"

const Invitation = ({ invitationMessage, invitationLink }) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Invitation",
          text: invitationMessage,
          url: invitationLink,
        })
      } else {
        // Fallback for browsers that do not support navigator.share
        const shareURL = `${invitationMessage} ${invitationLink}`
        console.log("Share URL:", shareURL) // Replace with your custom share logic
      }
    } catch (error) {
      console.error("Error sharing:", error.message)
    }
  }

  return (
    <div className="invitation-container">
      <h2>Invitation</h2>
      <p>{invitationMessage}</p>
      <button onClick={handleShare}>Share Invitation</button>
    </div>
  )
}

export default Invitation
