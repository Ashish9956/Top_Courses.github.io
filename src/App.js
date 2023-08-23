import React from "react";
import Navbar from "./compounents/Navbar";
import Filter from "./compounents/Filter";
import Cards from "./compounents/Cards";
import { apiUrl,filterData } from "./data";
import { toast } from "react-toastify";
import { useState,useEffect } from "react";
import Spinner from "./compounents/Spinner";
import { Toast } from "react-toastify";

const App = () => {

  const[courses,setCourses]=useState(null);
  const[loading,setLoading]=useState(true);
  const[category,setcategory]=useState(filterData[0].title);
  async function fetchData(){
    setLoading(true);
    try{
     let response= await fetch(apiUrl);
     let op=await response.json();
     //output
     setCourses(op.data);
    }
    catch(error){
     toast.error("Problem in Network");
    }
    setLoading(false);
  }
  //jabhi first render ho to fetch data call kar do
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
      <Navbar/>
      </div>
      <div className="  bg-bgDark2">
      <div >
      <Filter filterData={filterData}
      category={category} setcategory={setcategory}/>
     </div>
     <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh] ">
     {
      loading?(<Spinner/>):(<Cards courses={courses} category={category}/>)
     }
     </div>
      </div>
     
    </div>
  );
};

export default App;
