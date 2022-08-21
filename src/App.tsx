import React, { useEffect, useState, useRef } from 'react';
import ReelsController from './components/ReelsController'
import ReelComponent from './components/Reel'
import AppStyles from './App.module.css';
import {fetchUserById} from "api/fixtures/User"

// import {IntersectHandler} from 'core-ui/intersection-observer/v1'
import { IntersectionObserverHandler } from 'core-ui/intersection-observer/v2'

import API from './api'
import {Users} from 'api/fixtures/User'
import Reel from './model/type/Reel'

import { useDispatch } from "react-redux"
import { PLACEHOLDER_REEL_ID } from 'api/fixtures/Reel';

function App() {
  // Endpoint to fetch reels
  const loadMoreReels = () => {
    API.getNextReel().then((data)=> setReels((prevReels) => [...prevReels, ...data]))
  }

  const dispatch = useDispatch()
  const userId = Users[0]._id
  dispatch({
    type: 'SET_CURRENT_USER',
    value: fetchUserById(userId)
  })

  // list of reels loaded from API
  const [reels, setReels] = useState<Reel[]>([])
  
  // Intersection Observer handler to load more Reels
  const [loadMoreIOEntry, setLoadMoreEntry] = useState<IntersectionObserverEntry>()
  const loadMoreIOHandler = new IntersectionObserverHandler({ notifyInview: setLoadMoreEntry })
  
  // static element used to observe intersection
  const node = useRef<HTMLElement>(null)

  // watch intersection to load more reels
  useEffect(() => {
    if (loadMoreIOEntry && loadMoreIOEntry.isIntersecting)  loadMoreReels()
  }, [loadMoreIOEntry])

  // set node to observe
  useEffect(() => {
    if (node.current) loadMoreIOHandler.observeNode(node.current)
  }, [node])

  // current Reel visible in the screen
  const [currentReel, updateCurrentReel] = useState('')
  const inViewReelHandler = (currentReelEntry: IntersectionObserverEntry) => {
    if (currentReelEntry.isIntersecting) {
      const reelId: string = currentReelEntry.target.getAttribute('data-reel-id') as string
      updateCurrentReel(reelId)
    }
  }
  const reelScrollObserver = new IntersectionObserverHandler({ notifyInview: inViewReelHandler })

  return (
    <div className={`${AppStyles['reels-container']} w-screen h-screen`}>
      <ReelsController isPlaceholder={currentReel === PLACEHOLDER_REEL_ID} />
      {
        reels.map(reel => 
          <ReelComponent
            reel={reel} reelObserver={reelScrollObserver} isCurrentReel={reel._id === currentReel}
          />
        )
      }
      <span id="screenbottom" ref={node}></span>
    </div>
  );
}

export default App;
