import { redirect } from 'next/navigation'
import { db } from '@/db'

const SnippetCreatePage = () => {
  const createSnippet = async (formData: FormData) => {
    'use server'

    const title = formData.get('title')
    const code = formData.get('code')

    const snippet = await db.snippet.create({
      data: {
        title: title as string,
        code: code as string
      }
    })

    console.log('snippet =>', snippet)

    redirect('/')
  }

  return (
    <form action={createSnippet}>
      <h3 className='font-bold m-3'>Create a Snippet</h3>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <label className='w-12' htmlFor='title'>
            Title
          </label>
          <input
            type='text'
            name='title'
            className='border rounded p-2 w-full'
            id='title'
          />
        </div>
        <div className='flex gap-4'>
          <label className='w-12' htmlFor='code'>
            Code
          </label>
          <textarea
            name='code'
            className='border rounded p-2 w-full'
            id='code'
          />
        </div>
        <button type='submit' className='rounded p-2 bg-blue-200'>
          Create
        </button>
      </div>
    </form>
  )
}

export default SnippetCreatePage
