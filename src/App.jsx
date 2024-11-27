import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [images,setImages]=useState([])
  const [index,setIndex]=useState(0)
  const [loading,setLoading]=useState(false)

  const fetchImages = async () => {
    
    const url = 'https://www.reddit.com/r/aww/top/.json?t=all';
    const res = await fetch(url);
    const result = await res.json();
    const data = result.data.children;
    // console.log(data);
    const list = data.filter(
      (item) =>
        item.data.url_overridden_by_dest.includes('.jpg'))
      .map((item) => item.data.url_overridden_by_dest);
    setImages(list);
    setLoading(true)
  }

  useEffect(()=>{
    fetchImages()
  },[])

  function handleClick(dir){
    const last=images.length-1;
    if(dir==='left'){
      if(index===0){
        setIndex(last)
      }
      else{
        setIndex((idx)=>idx-1)
      }
    }else if(dir==='right'){
      if (index===last){
        setIndex(0)
      }
      else{
        setIndex((idx)=>idx+1)
      }
    }
  }

  useEffect(()=>{
    let tid;
    tid=setInterval(()=>handleClick('right'),4000)
    return ()=>clearInterval(tid)
  },[index])

  
  return (

    <div className='App'>
      { loading ? <div>
      <button className='left' onClick={()=>handleClick('left')}>{'<'}</button>
      <img src={images[index]} alt='hi there'/>
      <button className='right' onClick={()=>handleClick('right')}>{'>'}</button>
      </div> : <div> Loading...</div>
      }
      
    </div>
  )
}

export default App
