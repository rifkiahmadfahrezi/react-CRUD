import React from 'react'
import Skeleton from 'react-loading-skeleton'
import Card from '../card'

export default function CardSkeleton({num = 1}){
    const skeletons = Array(Number(num)).fill(0)
    return skeletons.map((_,i) => {
        return(
              <Card key={i} className="pointer-events-none cursor-default">
                  <Skeleton height={200}/>
                  <Card.Body>
                      <Skeleton count={1.5}/>
                  </Card.Body >
                  <Card.Footer>
                      <Skeleton height={50}/>
                  </Card.Footer>
              </Card>)
  })
}