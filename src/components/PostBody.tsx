import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface PostBodyProps {
  content: string;
}

export default function PostBody({ content }: PostBodyProps) {
  return (
    <article className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({children}) => <h1 className="text-3xl font-bold mb-4 text-gray-900">{children}</h1>,
          h2: ({children}) => <h2 className="text-2xl font-bold mb-3 text-gray-800">{children}</h2>,
          h3: ({children}) => <h3 className="text-xl font-bold mb-2 text-gray-800">{children}</h3>,
          p: ({children}) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
          ul: ({children}) => <ul className="list-disc list-inside mb-4 pl-4 space-y-2">{children}</ul>,
          ol: ({children}) => <ol className="list-decimal list-inside mb-4 pl-4 space-y-2">{children}</ol>,
          li: ({children}) => <li className="text-gray-700">{children}</li>,
          code: ({children}) => <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-pink-700">{children}</code>,
          pre: ({children}) => <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">{children}</pre>,
          a: ({children, href}) => <a href={href} className="text-blue-600 hover:text-blue-800 underline break-all">{children}</a>,
          blockquote: ({children}) => <blockquote className="border-l-4 border-primary-600 pl-4 italic my-4 text-gray-700">{children}</blockquote>,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
