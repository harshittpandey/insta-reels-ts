import React, { useEffect, useState, useRef } from 'react';
import ReelsController from './components/ReelsController'
import ReelComponent from './components/Reel'
import AppStyles from './App.module.css';

// import {IntersectHandler} from 'core-ui/intersection-observer/v1'
import { IntersectionObserverHandler } from 'core-ui/intersection-observer/v2'

import API from './api'
import Reel from './model/type/Reel'

function App() {
  // Endpoint to fetch reels
  const loadMoreReels = () => {
    API.getNextReel().then((data)=> setReels((prevReels) => [...prevReels, ...data]))
  }

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
  const reelScrollObserver = useRef<IntersectionObserver>(
    new window.IntersectionObserver((entries) => {
      // logging the reel which is rendering currently
      // console.log(
      //   entries.map(entry => `${entry.target.getAttribute('data-reel-id')}: ${entry.isIntersecting}`)
      // )
      const currentReel = entries.find(entry => entry.isIntersecting)
      if (currentReel && currentReel.target.getAttribute('data-reel-id')) {
        const reelId: string = currentReel.target.getAttribute('data-reel-id') as string
        updateCurrentReel(reelId)
      }
    })
  );

  return (
    <div className={`${AppStyles['reels-container']} w-screen h-screen`}>
      <ReelsController />
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
