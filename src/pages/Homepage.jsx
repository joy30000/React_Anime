// import React from 'react'
// import { useState, useEffect } from 'react';

// function Homepage() {
//   const [data, setData] = useState(null);  // State to store the data
//   const [loading, setLoading] = useState(true);  // Loading state

//   useEffect(() => {
//     // Fetch data from Flask API
//     fetch('http://127.0.0.1:5000/home') // Flask API endpoint
//       .then(response => response.json())
//       .then(data => {
//         setData(data);  // Update state with the fetched data
//         setLoading(false);
        
//           // Set loading to false when data is fetched
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setError('Failed to load data.');
//         setLoading(false);
//       });
//   }, []); // Empty dependency array means this runs once on component mount

//   if (loading) {
//     return <div>Loading...</div>;  // Show loading text while waiting for data
//   }
  

//   return (
//   <>
//   <ul>
//     <h1>chutiye</h1>
//    </ul>    
//   </>
    
//   )
// }

// export default Homepage





import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import play from '../assets/images/play-removebg-preview.png'

function Homepage() {
  const [data, setData] = useState(null);  // State to store the data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Fetch data from Flask API using axios
    axios.get('http://127.0.0.1:5000/home')  // Flask API endpoint
      .then(response => {
        console.log(response.data);  // Debugging: Log the fetched data
        setData(response.data);  // Update state with the fetched data
        setLoading(false); 
        console.log(data);
         // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) {
    return <div>Loading...</div>;  // Show loading text while waiting for data
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if data fetching fails
  }

  // Check if the expected data is present
  if (!data[0] || !data[0].action_movies) {
    return <div>No action movies available.</div>;  // Show message if no data or actionMovies
  }

  return (
    // <div>
     

    //   {/* Display action movies */}
    //   <h2>Action Movies:</h2>
    //   <ul>
    //     {data[0].action_movies.map((movie,index) => (
    //       <li key={index}>
    //         <strong>{movie.title}</strong> ({movie.language})
    //       </li>
    //     ))}
    //   </ul>
    // </div>



    <>


{/* <!-- ----------------BANNER SECTION------------------------------   --> */}
  <section>
    <div id='carouselExampleInterval' className='carousel slide' data-bs-ride='carousel'>
      <div className='carousel-inner'>
      {data[0].banner.map((item,index) => (
       
        <div 
  key={index} 
  className={`carousel-item ${index === 0 ? 'active' : ''}`}
  data-bs-interval={index === 0 ? '10000' : '2000'}
>
          <div
            className='border-2 border-red-500   bg-cover bg-center  w-full flex items-center h-[50vh]  sm:h-[60vh] lg:h-[80vh] '
            style={{backgroundImage: `url(${item.background_img})`}}>
            <div className='ml-5  flex flex-col gap-[3px] md:gap-[7px]  lg:gap-[9px]'>
              <div>
                <h1 id='h1-border'
                  className='font-bold text-2xl text-white z-50 underline  underline-offset-8 sm:text-3xl md:text-4xl lg:text-5xl' style={{
                    textShadow: "1px 1px 0px #e50914, -1px -1px 0px #e50914, 1px -1px 0px #e50914, -1px 1px 0px #e50914, 0px 1px 0px #e50914, 0px -1px 0px #e50914, 1px 0px 0px #e50914, -1px 0px 0px #e50914"
                  }}>{
                  item.title }</h1>
              </div>
              <div id='desc-border' className='text-white mt-3  w-4/5 overflow-hidden  font-semibold md:text-2xl' style={{
                    textShadow: " 1px 1px 0px #535c60, 1px -1px 0px #535c60, -1px 1px 0px #535c60, 0px 1px 0px #535c60, 0px -1px 0px #535c60, 1px 0px 0px #535c60, -1px 0px 0px #535c60"}} >{item.description}</div>
              <Link  to={`/anime_detail?category=${item.link}`}>
                <div
                  className='border-2 border-red-500 text-black  bg-white w-[20vh] rounded-md font-semibold mt-3 flex justify-center items-center p-1 sm:w-[25vh]  sm:h-[7vh] lg:text-2xl '>
                  <img className='h-4 w-4' src={play} alt='' /> &nbsp;Play
                </div>
              </Link>
            </div>

          </div>
        </div>
      ))}
      </div>

      {/* <!-- Previous Button --> */} 
      <button class='carousel-control-prev h-[fit-content] bg-red-500 absolute hidden mt-[43vh] ml-32 sm:mt-[50vh] lg:mt-[70vh] lg:block hidden md:block' type='button' data-bs-target='#carouselExampleInterval'
        data-bs-slide='prev'>
        <span class='carousel-control-prev-icon' aria-hidden='true'></span>
        <span class='visually-hidden'>Previous</span>
      </button>

      {/* <!-- Next Button --> */}
       <button class='carousel-control-next h-[fit-content] bg-red-500 absolute hidden mt-[43vh] mr-32 sm:mt-[50vh] lg:mt-[70vh] lg:block hidden md:block ' type='button' data-bs-target='#carouselExampleInterval'
        data-bs-slide='next'>
        <span class='carousel-control-next-icon' aria-hidden='true'></span>
        <span class='visually-hidden'>Next</span>
      </button>
      <div class='fadeBottom'  style={{ height: '120px', background: 'linear-gradient(180deg, transparent, rgba(37, 37, 37, .61), #141414)', position: 'absolute', left: '0', bottom: '0', width:'100%'}}>

      </div>
    </div>
   

  </section>



    {/*-------------- POPULAR ANIME------------------------------ */}
    <section className='popular relative w-full overflow-x-hidden mt-4'>

   <div className='flex  justify-between items-center font-semibold text-white ml-6'>
  <h1 className='text-2xl'>Action Anime Movies</h1>
  <Link to="/home_cat?category=popular_anime" className='text-1xl text-red-500'>View All</Link>
</div>

<div id='slider_action' className='flex gap-4 overflow-x-auto p-4 '  style={{scrollBehavior: 'smooth'}}>
{/* <!-- Card  --> */}
{data[0].popular_anime.map((panime,index) => (
<Link  to={`/anime_episode?url=${panime.link}`}  key={index} className='bg-[#2f2f2f] h-[fit-content] w-[fit-content] rounded-lg block transition-transform duration-300 ease-in-out transform hover:scale-[1.2]'>
 <div className='flex-none w-[20vh] h-[28vh] bg-blue-500 text-white rounded-lg p-4 shadow-lg bg-cover'
    style={{backgroundImage: `url(${ panime.img })`  }} >
    </div>
    <h3 className='p-2  h-[8vh] overflow-hidden font-semibold text-white '>{ panime.title }</h3>
        <div className='p-2 flex justify-between mt-1 text-white '>
          <p className='w-8 text-center p-1 font-bold rounded-md text-[12px]  bg-[#e50914]'>{ panime.language }</p>
          <p className='w-10 text-center p-1 font-bold rounded-md text-[12px]  bg-[#e50914]'>{ panime.series }</p>
        </div>
   </Link>
  

))}

</div>
{/* <!-- Navigation Buttons --> */}
{/* <button onclick='moveSlider(-1,'slider_action')'
  className='absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 focus:outline-none hidden md:block'>
  &#10094;
</button>
<button onclick='moveSlider(1,'slider_action')'
  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 focus:outline-none hidden md:block'>
  &#10095;
</button> */}

</section>


  {/*-------------- ACTION ANIME MOVIES------------------------------- */}
  <section className='popular relative w-full overflow-x-hidden mt-4'>

<div className='flex  justify-between items-center font-semibold text-white ml-6'>
<h1 className='text-2xl'>Action Anime Movies</h1>
<Link to='/home_cat?category=action_movies' className='text-1xl text-red-500'>View All</Link>
</div>

<div id='slider_action' className='flex gap-4 overflow-x-auto p-4 '  style={{scrollBehavior: 'smooth'}}>
{/* <!-- Card  --> */}
{data[0].action_movies.map((acanime,index) => (
<Link  to={`/anime_detail?category=${acanime.link}`}  key={index} className='bg-[#2f2f2f] h-[fit-content] w-[fit-content] rounded-lg block transition-transform duration-300 ease-in-out transform hover:scale-[1.2]'>
 <div className='flex-none w-[20vh] h-[28vh] bg-blue-500 text-white rounded-lg p-4 shadow-lg bg-cover'
    style={{backgroundImage: `url(${ acanime.img })`  }} >
 </div>
 <h3 className='p-2  h-[8vh] overflow-hidden font-semibold text-white '>{ acanime.title }</h3>
     <div className='p-2 flex justify-between mt-1 text-white '>
       <p className='w-8 text-center p-1 font-bold rounded-md text-[12px]  bg-[#e50914]'>{ acanime.language }</p>
       <p className='w-10 text-center p-1 font-bold rounded-md text-[12px]  bg-[#e50914]'>{ acanime.series }</p>
     </div>
</Link>


))}

</div>
{/* <!-- Navigation Buttons --> */}
{/* <button onclick='moveSlider(-1,'slider_action')'
className='absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 focus:outline-none hidden md:block'>
&#10094;
</button>
<button onclick='moveSlider(1,'slider_action')'
className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 focus:outline-none hidden md:block'>
&#10095;
</button> */}

</section>



{/*-------------- ACTION ADVENTURE ANIME------------------------------ */}
<section className='popular relative w-full overflow-x-hidden mt-4'>

<div className='flex  justify-between items-center font-semibold text-white ml-6'>
<h1 className='text-2xl'>Action Adventure Anime </h1>
<Link to='/home_cat?category=action_adventure_anime' className='text-1xl text-red-500'>View All</Link>
</div>

<div id='slider_action' className='flex gap-4 overflow-x-auto p-4 '  style={{scrollBehavior: 'smooth'}}>
{/* <!-- Card  --> */}
{data[0].action_adventure_anime.map((adanime,index) => (
<Link  to={`/anime_detail?category=${adanime.link}`}   key={index} className='bg-[#2f2f2f] h-[fit-content] w-[fit-content] rounded-lg block transition-transform duration-300 ease-in-out transform hover:scale-[1.2]'>
 <div className='flex-none w-[20vh] h-[28vh] bg-blue-500 text-white rounded-lg p-4 shadow-lg bg-cover'
    style={{backgroundImage: `url(${ adanime.img })`  }} >
 </div>
 <h3 className='p-2  h-[8vh] overflow-hidden font-semibold text-white '>{ adanime.title }</h3>
     <div className='p-2 flex justify-between mt-1 text-white '>
       <p className='w-8 text-center p-1 font-bold rounded-md text-[12px]  bg-[#e50914]'>{ adanime.language }</p>
       <p className='w-10 text-center p-1 font-bold rounded-md text-[12px]  bg-[#e50914]'>{ adanime.series }</p>
     </div>
</Link>


))}

</div>
{/* <!-- Navigation Buttons --> */}
{/* <button onclick='moveSlider(-1,'slider_action')'
className='absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 focus:outline-none hidden md:block'>
&#10094;
</button>
<button onclick='moveSlider(1,'slider_action')'
className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 focus:outline-none hidden md:block'>
&#10095;
</button> */}

</section>
    </>
  );
}

export default Homepage;