import { useRef, useState } from "react"
import { setTrainerSlice } from "../store/slices/trainer.slices"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  
  const [changeDark, setChangeDark] = useState(false)
  const inputTrainer = useRef()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleTrainer = (e) => {
    e.preventDefault()
    dispatch(setTrainerSlice(inputTrainer.current.value.trim()))
    navigate('/pokedex')
  }
  const handleDark = () => {
    setChangeDark(!changeDark)
  }


  return (
    <div className={`${changeDark ? 'home__dark' : 'home'}`}>
      <div className="homePage">
        <img className="homePage__img" src="./pokedex.png" alt="" />
        <h2 className="homePage__title">¡Hi Trainer!</h2>
        <p className="homePage__text">To start, please, enter your trainer nickname</p>
        <form className="homePage__form" onSubmit={handleTrainer}>
          <input className="homePage__form--input" ref={inputTrainer} type="text" placeholder="Please, Enter your name"/>
          <button className="homePage__form--btn">Start!</button>
        </form>
      </div>
      
      <div className="homePage__footer">
        <div className="homePage__footer--uno"></div>
        <div className="homePage__footer--dos"></div>
        <img className="homePage__footer--img" src="./pokeball.png" alt="" />
        
        <div className="darkMode__homePage">
          <input type="checkbox" className="l" onChange={handleDark} checked={changeDark}/>
        </div>
      </div>
    </div>
    
  )
}

export default HomePage
