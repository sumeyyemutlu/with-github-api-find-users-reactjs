import React,{useState, useEffect} from "react";
import { BiUser } from 'react-icons/bi';
import {RiGitRepositoryFill} from'react-icons/ri';
import './App.css';


function App() {
  const [name, setName] = useState('')
  const [userName, setUserName] =  useState('')
  const [followers, setFollowers] = useState('')
  const [following, setFollowing] = useState('')
  const [repos, setRepos] = useState('')
  const [avatar, setAvatar] = useState('')
  const [userInput, setUserInput] = useState('')
  const [error, setError] = useState(null)

  useEffect(()=> {
    fetch("https://api.github.com/users/example")
    .then(res => res.json())
    .then(data => {
      setData(data);
    })
  }, [])

  const setData = ({name, login, followers, following, public_repos, avatar_url}) => {
    setName(name);
    setUserName(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url)
  }

  const handleSearch = (e) => {
    setUserInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${userInput}`)
    .then(res => res.json())
    .then(data => {
      if(data.message) {
        setError(data.message)
      }
      else {
        setData(data);
        setError(null)
      }
    })
  }

  return (
    <div>
      <div className="navbar">
        Github User Search
      </div>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input placeholder="Enter Github Username" name="github user" onChange={handleSearch}/>
          <button>Search</button>
        </form>
      </div>
      {error ? (<h1>{error}</h1>): (
        <div className="card">
        <div className="card-alt">
          <div className="image">
            <img src={avatar} alt="img" width="270px" height="220px"/>
          </div>
          <div className="card-content">
            <h3> {name}</h3>
            <h3>{userName}</h3>
          </div>
          <div className="card-content">
            <a> 
              <BiUser className="icon"/> 
              {followers} Followers
            </a>
          </div>
          <div className="card-content">
            <a> 
              <RiGitRepositoryFill className="icon"/> 
              {repos} Repos
            </a>
          </div>
          <div className="card-content end">
            <a> 
              <BiUser className="icon"/> 
              {following} Following
            </a>
          </div>
          <div className="profile-url">
              <a href={`https://github.com/${userInput}`}>Profile gitmek için <i><b>tıklayınız.</b></i></a>
          </div>
        
        </div>
      </div>
      )}
      
    </div>
  );
}

export default App;
