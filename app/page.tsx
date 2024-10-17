"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Interpretation {
  $id: string;
  term: string;
  interpretation: string;
}
export default function Home() {

  const [interpretations, setInterpretations] = useState<Interpretation[]>([]);
  const [isloading , setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>();

  useEffect(() => {
    const fetchInterpretations = async () => {
      setIsLoading(true);
      try{
        const response = await fetch("/api/interpretations");
        if(!response.ok){
          throw new Error("Failed to fetch interpretations");
        }
        const data = await response.json();
        setInterpretations(data);
      }catch(error){
        console.error("Error fetching interpretations", error);
        setError("Failed to fetch interpretations please try relaoding the page");
      }finally{
        setIsLoading(false);
      }
    };

    fetchInterpretations();
  }, []);


  const handleDelete = async (id:string) => {
    try{
      await fetch(`/api/interpretations/${id}`,{method: "DELETE"});
      setInterpretations((prevInterpretations) => prevInterpretations.filter((interpretation) => interpretation.$id !== id));
    }catch(error){
      setError("Failed to delete interpretation please try again");
    }
  };
  return (
    <div>
      {error&&<p className="py-4 text-red-500">{error}</p>}
      {isloading?(<p>loading interpretations...</p>):interpretations?.length>0?(
      <div>
        {
          interpretations?.map((interpretation) => (
        <div 
        key={interpretation.$id}
        className="p-4 my-2 rounded-md border-b leading-8">

        <div className="font-bold">{interpretation.term}</div>
        <div>
         {interpretation.interpretation}
        </div>
        <div className="flex gap-4 mt-4 justify-end">
          <Link className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest" href={`/edit/${interpretation.$id}`}>Edit</Link>
          <button
          onClick={() => handleDelete(interpretation.$id)} 
           className="bg-red-500 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest">Delete</button>
        </div>
            </div>
          ))
        }
      </div>):(
        <p>No interpretations found</p>
      )}
      
    </div>
  );
}
