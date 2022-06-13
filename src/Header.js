import React, { useState } from 'react'
import axios from "axios";

const baseURL = "http://universities.hipolabs.com/search?country="

const Header = () => {
    const countryList = ["India", "Australia", "Pakistan", "Nepal"];
    const [post, setPost] = React.useState([]);
    const [userInput, setUserInput] = React.useState('');
    const [stateProvinceList, setstateProvinceList] = React.useState([]);
    const [showStateList, setShowStatelist]=useState([]);
    const [showContent, setContent] = useState([])

    function showItem(a) {
        console.log(a)
        axios.get(baseURL + a).then(response => { setPost(response.data); console.log(post); setstateProvinceList(response.data.map(item => item['state-province'])); });

    }
    function userSuggestionList(i)
    {
        setUserInput(i);
        console.log(i);

        if (userInput.length>=1)
        {
      
            setShowStatelist(stateProvinceList.filter(item => {

                if (item?.toLowerCase()?.includes(userInput.toLowerCase())) {
                    return item;
                }
            }))
                
        }
    }
    function show(a){
        console.log(a)
        setContent(post.filter(item=>{
            if (item['state-province']==a)
            {
                console.log(item);
                return item;
            }
        }))
        // console.log(showContent)
    }
    console.log("SHOW STATE", showStateList)
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <input type="text" placeholder='Enter your state' onChange={(e) => { userSuggestionList(e.target.value) }} />
                        {userInput && <ul>{showStateList.map(stateName => (<li onClick={() => { show(stateName)}}>{stateName}</li>))}</ul>}
                    </div>
                    <div className='col'>
                        <select onChange={(e) => { showItem(e.target.value) }} def>
                            <option disabled selected hidden>Choose your country</option>
                            {countryList.map(item => (<option>{item}</option>))}
                        </select>
                    </div>
                </div>
            </div>
            <div>
                {showContent && <table>
                    <tr>
                        <th>Institute name</th>
                        <th>Institute Website</th>
                        <th>State</th>
                    </tr>
                    {
                        showContent.map(item=>(
                        <>
                                <td>{item.name}</td>
                                <td>{item.web_pages[0]}</td>
                                <td>{item['state-province']}</td>
                        </>
                            
                        ))
                    }
                    </table>}
            </div>
            
            
        </>

    )
}

export default Header