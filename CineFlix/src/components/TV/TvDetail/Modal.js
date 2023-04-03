import React from 'react'
import { useState } from 'react'
import './TvDetail.css'

const Modal = ({showModal,setshowModal, id}) => {

    const [season, setseason] = useState(1);
    const [episode, setepisode] = useState(1);
  return (
    <>
      <div className='modal-wrapper' onClick={()=>setshowModal(!showModal)}></div>
      <div className="modal-container">
        <button className='close' onClick={()=>setshowModal(!showModal)} >Close</button>
        <div>
            <h2 className='modalTitle'>Enter Season Number</h2>
            <div className="md:w-[100%] w-[100%] text-center px-5 py-4 flex items-center bg-[#292929] rounded-xl justify-center drop-shadow-2xl" >
            <input type="text" className="SearchBar text-xl bg-[#292929] text-slate-300 w-[60%] flex-1 duration-500 outline-none focus:outline-none placeholder:text-[#454F51]" placeholder="Enter Season Number" value={season===1?null:season} onChange={(e)=>setseason(e.target.value)} />
            </div>
        </div>
        <div style={{marginTop:"1rem"}}>
            <h2 className='modalTitle'>Enter Episode Number</h2>
            <div className="md:w-[100%] w-[100%] text-center px-5 py-4 flex items-center bg-[#292929] rounded-xl justify-center drop-shadow-2xl" >
                        <input type="text" className="SearchBar text-xl bg-[#292929] text-slate-300 w-[60%] flex-1 duration-500 outline-none focus:outline-none placeholder:text-[#454F51]" placeholder="Enter Episode Number" value={episode===1?null:episode} onChange={(e)=>setepisode(e.target.value)} />

                    </div>
        </div>
        <a href={`https://2embed.org/embed/series?tmdb=${id}&s=${season}&e=${episode}`} style={{ textDecoration: "none", color: "white", marginTop:"1.5rem"}} className="trailerbtn" target='_blank'>
                        Play<i className="fa fa-play"></i>
                    </a>
                          </div>
    </>
  )
}

export default Modal
