import React, { useEffect, useState } from "react";
// import axios from "axios";
const Page = () => {
  const [Apidata, setApidata] = useState();
  const [count, setCount] = useState(12);

 const fetched = async () =>{
   let res =  await fetch(`https://gateway.marvel.com/v1/public/comics?ts=1&hash=ae1895a77e42f57a2ff88de40c57a3e6&apikey=99e9936c87d485c889aa77e299bdda7c&limit=${count}`)
    let data = await res.json();
    setApidata(data?.data?.results);
  } 
 useEffect(()=>{
    fetched();
 },[count])
 console.log("data",Apidata);
 const scrollHandler= ()=>{
     // console.log("fullhieght",document.documentElement.scrollHeight);
     // console.log("pagehieght",window.innerHeight);
     // console.log("scrollhieght",document.documentElement.scrollTop);
     if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
        // Do load more content here!
        setCount((ee)=>ee+10)
    }
    }
    useEffect(()=>{
        window.addEventListener("scroll",scrollHandler)
    //  return ()=>window.removeEventListener("scroll",scrollHandler)
    },[count])
    console.log("count",count);
  return (
    <>
    <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
      {Apidata?.map((x) => {
        const { thumbnail, title} = x;

        const imageSrc = `${thumbnail.path}.${thumbnail.extension}`;
        return (
          <>
            <div
              class="card mt-2 m-lg-5"
              style={{ width: "25%", height: "auto",marginTop:"20px" }}
            >
              <img 
                src={imageSrc}
                class="card-img-top"
                alt="..."
                style={{ width: "300px", height: "300px" }}
              />
              <div class="card-body">
                <h5 class="card-title">{title}</h5>
                <button href="#" class="btn btn-primary">
                  ViewItem
                </button>
                <button
                  href="#"
                  class="btn btn-primary"
                  style={{ marginLeft: "20px" }}
                >
                  RemovetoCart
                </button>
              </div>
            </div>
          </>
        );
      })}
      </div>
    </>
  );
};

export default Page;
