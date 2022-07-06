import React, { useEffect, useState, useRef } from 'react';
import ReelsController from './components/ReelsController'
import ReelComponent from './components/Reel'
import AppStyles from './App.module.css';

import {IntersectHandler} from 'core-ui/intersection-observer/v1'

import API from './api'
import Reel from './model/type/Reel'

function App() {
  // list of reels loaded from API
  const [reels, setReels] = useState<Reel[]>([])
  // Intersection Observer handler to load more Reels
  const { setNode: setLoadMoreNode, entry: loadMoreEntry } = IntersectHandler({})
  // static element used to observe intersection
  const node = useRef<HTMLElement>(null)
  // method to load more reels
  const loadMoreReels = () => {
    API.getNextReel().then((data)=> {
      setReels((prevReels) => [...prevReels, ...data])
    })
  }

  // watch intersection to load more reels
  useEffect(() => {
    // console.log('loadMoreEntry', loadMoreEntry)
    if (loadMoreEntry && loadMoreEntry.isIntersecting) {
      loadMoreReels()
    }
  }, [loadMoreEntry])

  // set node to observe
  useEffect(() => {
    if (node.current) setLoadMoreNode(node.current)
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
