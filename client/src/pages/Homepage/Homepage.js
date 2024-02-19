import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header"
import "./Homepage.scss"
const Homepage=()=>{
    const API_URL="http://localhost:8080";
    const [pets,setPets]=useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8080`).then(response=>{
        setPets(response.data);
        console.log(response.data);
    
        }).catch(error => {
            console.log("Error fetching pets: ", error);
          });
    },[]);

    return(<>
    <Header/>
    <section  className="photo-gallery">
        {pets.map(pet=>(
           <Link to={`/${pet.id}`} key={pet.id} className="photo-gallery__item">
            <div >
              <img src={pet.noClothes} alt="" className="photo-gallery__photo"/>
              
            </div>
            </Link>
        ))}
    </section></>)
}
export default Homepage;