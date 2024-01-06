import Link from 'next/link'
import { db } from '@/db'

const HomePage = async () => {
  const snippets = await db.snippet.findMany()

  const renderedSnippets = snippets.map(snippet => {
    return (
      <Link
        href={`/snippets/${snippet.id}`}
        className='flex justify-between items-center p-2 border rounded'
        key={snippet.id}>
        <h3>{snippet.title}</h3>
      </Link>
    )
  })

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Snippets</h1>
        <Link href='/snippets/new' className='p-2 m-4 border rounded'>
          New
        </Link>
      </div>
      <div className='flex flex-col gap-2'>{renderedSnippets}</div>
    </div>
  )
}

export default HomePage
