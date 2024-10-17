import React from 'react'

function EditPage() {
  return (
    <div>
    <h2 className='text-2xl font-bold my-8'>Edit Interpretation</h2>
    <form className='flex gap-3 flex-col'>
        <input
            type='text'
            name='term'
            placeholder='term'
            className='py-1 px-4 border rounded-md'/>
        <textarea 
        name='interpretation'
         rows={4}
         placeholder='interpretation'
         className='py-1 px-4 border rounded-md resize-none'></textarea>

         <button className='bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer'>Update Interpretation</button>
    </form>
    </div>
  )
}

export default EditPage;