"use client";
import { useRouter } from 'next/navigation';
import React, { ChangeEvent } from 'react'

function CreatePage() {

  const [formData, setFormData] = React.useState({term:"",interpretation:""});
  const [isloading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string|null>(null);

  const router = useRouter();
  const handleInputChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
    console.log(formData);
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!formData.term || !formData.interpretation){
      setError("Please fill in all fields");
      return;
    }
    setError(null);
    setIsLoading(true);
    try{
      const response = await fetch("/api/interpretations",{
        method:"POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type":"application/json"
        }
      });
      if(!response.ok){
        throw new Error("Failed to add interpretation");
      }
      router.push("/");
    }catch(error){
      console.error("Error adding interpretation", error);
      setError("Failed to add interpretation");
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <div>
        <h2 className='text-2xl font-bold my-8'>Add New Interpretation</h2>
        <form onSubmit={handleSubmit} className='flex gap-3 flex-col'>
            <input
                type='text'
                name='term'
                placeholder='term'
                value={formData.term}
                onChange={handleInputChange}
                className='py-1 px-4 border rounded-md'/>
            <textarea 
            name='interpretation'
             rows={4}
             placeholder='interpretation'
             value={formData.interpretation}
             onChange={handleInputChange}
             className='py-1 px-4 border rounded-md resize-none'></textarea>

             <button type='submit' disabled={isloading} className='bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer'>{isloading?"Adding...":"Add Interpretation"}</button>
        </form>
        {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
  )
}

export default CreatePage;