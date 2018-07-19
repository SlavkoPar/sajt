import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ code, image, isWinner }) => (
  <div>
      {isWinner
        ?<img src={image} width="38" height="38" alt={code} style={{border:'2px solid maroon'}}/>
        :<img src={image} width="38" height="38" alt={code} />
    }
  </div>
)


export default Card
