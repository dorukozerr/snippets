import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { deleteSnippet } from '@/actions'

interface SnippetShowPageProps {
  params: {
    id: string
  }
}

const SnippetShowPage = async (props: SnippetShowPageProps) => {
  const snippet = await db.snippet.findUnique({
    where: {
      id: Number(props.params.id)
    }
  })

  if (!snippet) {
    return notFound()
  }

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id)

  return (
    <div>
      <div className='flex m-4 justify-between items-center'>
        <div className='text-xl font-bold'>{snippet.title}</div>
        <div className='flex gap-4'>
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className='p-2 border rounded'>
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className='p-2 border rounded'>Delete</button>
          </form>
        </div>
      </div>
      <pre className='p-3 border rounded bg-gray-200 border-gray-200'>
        <code>{snippet.code}</code>
      </pre>
    </div>
  )
}

export default SnippetShowPage
