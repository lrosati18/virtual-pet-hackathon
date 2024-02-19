import { useState, useEffect } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import './PetPage.scss';
import dogfood from "../../pic/dogfood.png"
import toy from "../../pic/tenniesball.png"


const PetPage=()=>{
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
 
    const [petData, setPetData] = useState('');
    // const [status, setStatus] = useState('sad'); 
    const [message, setMessage] = useState('I am hungry');
    const [isDressed, setIsDressed] = useState(false);
    const [showDogFood, setShowDogFood] = useState(false); 
    const [showDogToy, setShowDogToy] = useState(false); 

    const [isMessagePaused, setIsMessagePaused] = useState(false);
    let showMessageHappy=false;
    let showMessageFull=false;
    let showMessageBeauty=false;
    let showMessage=true;

    useEffect(() => {
        axios.get(`http://localhost:8080/${id}`)
            .then(response => {
                setPet(response.data);
            })
            .catch(error => {
                console.log('Error fetching pet details:', error);
            });

            // const messageInterval = setInterval(() => {
            //     if(!isMessagePaused){
            //     setMessage(prevMessage => {
            //         if (!prevMessage || prevMessage === 'I am lonely') {
            //             return 'I\'m hungry';
            //         } else {
            //             return 'I am lonely, please play with me';
            //         }
            //     });
            //     }
            // }, 3000);  
            // // Clean up interval on component unmount
            // return () => {
            //     clearInterval(messageInterval);
            // };

    }, [id]);


    const [emotionLoopStarted, setEmotionLoopStarted] = useState(false);

    useEffect(() => {
        let intervalId;

        if(emotionLoopStarted){
            const updateMessage = () => {
                setMessage((prevMessage) => {
                    if(!prevMessage || prevMessage === "I am lonely"){
                        return "I am hungry";
                    } else {
                        return "I am lonely, please play with me";
                    }
                })
            }

            intervalId = setInterval(() => {
                if(!isMessagePaused){
                    updateMessage();
                }
            }, 3000);
        }

        return () => {
            clearInterval(intervalId);
        }
    }, [emotionLoopStarted, isMessagePaused]);


    const handleFeed = () => {
        showMessageFull = true;
        setIsMessagePaused(true);

        setTimeout(() => {
            setMessage("I am full, thank you!");
        }, 3000);

        setShowDogFood(true);
        setTimeout(()=> {
            setMessage("");
            setShowDogFood(false);
            
            
        setTimeout(() => {
            setMessage("I am lonely, please play with me");
        }, 3000);   
        
        setTimeout(() => {
            setIsMessagePaused(false);
        }, 5000);
        }, 6000);

        axios.post(`http://localhost:8080/${id}/feed`)
        .then(response => {
            setPet(response.data); 
            navigate(`/${id}/feed`);
        })
        .catch(error => {
            console.log('Error feeding pet:', error);
        }); 
    }

    const handlePlay = () => {
        showMessageHappy = true;
        setMessage('I am happy, thank you!');
        setShowDogToy(true);
        setTimeout(() => {
          setMessage('');
          setShowDogToy(false);
    
          // After 3 seconds, change the message back to "I am hungry"
          setTimeout(() => {
            setMessage('I am hungry');
          }, 3000);
        }, 3000);

        axios.post(`http://localhost:8080/${id}/play`)
        .then(response => {
            setPet(response.data); 
            navigate(`/${id}/play`);
        })
        .catch(error => {
            console.log('Error playing with pet:', error);
        });

    }

  
   function handleName(e){
        e.preventDefault();
        const petName = e.target.petName.value;
        const petData={
            name: petName,
        }
      axios.post(`http://localhost:8080/${id}`, petData)
      .then(response => {
        console.log('Error changing name: ',response.data);
        setPet(response.data)
      })
      .catch(error => {
        console.error("Error adding comment: ", error);
      })
   }

    // const handleFeed = () => {
    //     showMessageFull=true;
    //     setIsMessagePaused(true); 

    //     setTimeout(() => {
    //     setMessage('I am full, thank you!');
    // }, 1000); 

    //     setShowDogFood(true);
    //     setTimeout(() => {
    //       setMessage('');
    //       setShowDogFood(false);
    //       /////new
    //       setTimeout(()=>{
    //         setIsMessagePaused(false); 
    //       },5000)
    //     },6000); 
    //     //navigate(`/${id}/feed`);
    //     axios.post(`http://localhost:8080/${id}/feed`)
    //     .then(response => {
    //         setPet(response.data); 
    //         navigate(`/${id}/feed`);
    //     })
    //     .catch(error => {
    //         console.log('Error feeding pet:', error);
    //     });
    //   };

      const handleCloth = () => {
        showMessageBeauty=true;
        setMessage('I am sooooo beautiful, thank you!');
        setTimeout(() => {
          setMessage('');
        }, 5000); 
        //navigate('/clothes')
        axios.get(`http://localhost:8080/${id}/clothes`)
            .then(response => {
                setPet(response.data); 
                setIsDressed(true); 
                navigate(`/${id}/clothes`);
            })
            .catch(error => {
                console.log('Error dressing pet:', error);
            });
    };

    // const handlePlay = () => {
    //     showMessageHappy=true;
    //     setMessage('I am happy, thank you!');
    //     setShowDogToy(true);
    //     setTimeout(() => {
    //       setMessage('');
    //       setShowDogToy(false);
    //     }, 3000); 
    //     //navigate(`/${id}/feed`);
    //     axios.post(`http://localhost:8080/${id}/play`)
    //     .then(response => {
    //         setPet(response.data); 
    //         navigate(`/${id}/play`);
    //     })
    //     .catch(error => {
    //         console.log('Error playing with pet:', error);
    //     });
    // };

    if (!pet) {
        return <div>Loading...</div>;
    }
    const imageSrc = isDressed && pet.clothes ? pet.clothes : pet.noClothes;
    return (
        <div className="petpage">
            <Link to={`/`} className="petpage__link"><button>back</button></Link>
            <div className="petpage__imagecontainer">
            {message && <div className="petpage__message">{message}</div>}

                <img src={imageSrc} alt={pet.name} className="petpage__image" />
                <p className='petpage__name'>Hello, my name is {pet.name}!</p>
            </div>

            <div className="petpage__controls">
                <form className='petpage__input--container' onSubmit={handleName}>
                    <input type="text" name="petName" className="petpage__nameinput" placeholder="Name your pet"/>
                    <button type="submit" className="petpage__button" >Save</button>
                </form>
                
                <div className="petpage__container--small">
                    <button className="petpage__button petpage__button--feed" onClick={handleFeed}>Feed me</button>
                
                    <button className="petpage__button petpage__button--cloth" onClick={handleCloth}>Dress me</button>
                    <button className="petpage__button petpage__button--play" onClick={handlePlay}>Play with me</button>
                </div>
            </div>
                <div className="petpage__button--container">
                    {showDogFood && <img src={dogfood} alt="Dog Food" className="petpage__dogfood" />}
                    {showDogToy && <img src={toy} alt="Toy" className="petpage__dogtoy" />}
                </div>
        </div>
    );
}
export default PetPage;