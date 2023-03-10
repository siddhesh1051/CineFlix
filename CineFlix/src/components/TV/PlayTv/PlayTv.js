import React from 'react'
import { useState } from 'react'
import '../TvDetail/TvDetail.css'

const PlayTv = ({id}) => {
    const [episode, setepisode] = useState(1);
    const [season, setseason] = useState(1);
  return (
    <div>
        <div className="seasons">
            <h3>Seasons</h3>
            <div className="seasons__list">
                <div className="seasons__list__item" onClick={() => setseason(1)}>Season 1</div>
                <div className="seasons__list__item" onClick={() => setseason(2)}>Season 2</div>
                <div className="seasons__list__item" onClick={() => setseason(3)}>Season 3</div>
                <div className="seasons__list__item" onClick={() => setseason(4)}>Season 4</div>
                <div className="seasons__list__item" onClick={() => setseason(5)}>Season 5</div>
                <div className="seasons__list__item" onClick={() => setseason(6)}>Season 6</div>
                <div className="seasons__list__item" onClick={() => setseason(7)}>Season 7</div>
                <div className="seasons__list__item" onClick={() => setseason(8)}>Season 8</div>
            </div>
        </div>
        <div className="episodes">
            <h3>Episodes</h3>
            <div className="episodes__list">
                <div className="episodes__list__item" onClick={() => setepisode(1)}>Episode 1</div>
                <div className="episodes__list__item" onClick={() => setepisode(2)}>Episode 2</div>
                <div className="episodes__list__item" onClick={() => setepisode(3)}>Episode 3</div>
                <div className="episodes__list__item" onClick={() => setepisode(4)}>Episode 4</div>
                <div className="episodes__list__item" onClick={() => setepisode(5)}>Episode 5</div>
                <div className="episodes__list__item" onClick={() => setepisode(6)}>Episode 6</div>
                <div className="episodes__list__item" onClick={() => setepisode(7)}>Episode 7</div>
                <div className="episodes__list__item" onClick={() => setepisode(8)}>Episode 8</div>
                <div className="episodes__list__item" onClick={() => setepisode(9)}>Episode 9</div>
                <div className="episodes__list__item" onClick={() => setepisode(10)}>Episode 10</div>
                <div className="episodes__list__item" onClick={() => setepisode(11)}>Episode 11</div>

            </div>
        </div>
        

        <a href={`https://2embed.org/embed/series?tmdb=${id}&s=${season}&e=${episode}`} style={{ textDecoration: "none", color: "white" }} className="trailerbtn">
                        Watch Now<i className="fa fa-play"></i>
                    </a>
    </div>
  )
}

export default PlayTv
