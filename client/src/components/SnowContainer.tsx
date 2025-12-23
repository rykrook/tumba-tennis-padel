import Snowfall from 'react-snowfall'

const SnowContainer = () => {
  return (
    <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
      <Snowfall
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
      />
    </div>
  )
}

export default SnowContainer