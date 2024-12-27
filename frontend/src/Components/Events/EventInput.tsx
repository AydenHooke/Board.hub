import React from 'react'

function EventInput() {
  return (
    <>
        <section className='meetups'>
            <h2>Meetups</h2>
            <button>Add Meeting</button>
            <ul className='meetup-list'>
            </ul>
        </section>

        <section className='tournaments'>
            <h2>Tournaments</h2>
            <button>Add Tournament</button>
            <ul className='tournament-list'>
            </ul>
        </section>
    </>
  )
}

export default EventInput