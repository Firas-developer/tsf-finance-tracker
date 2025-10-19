// Component to format AI messages nicely without showing markdown symbols
const MessageFormatter = ({ content }) => {
  // Process the content to format it nicely
  const formatContent = (text) => {
    // Remove markdown bold symbols but keep the text bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    
    // Remove markdown italic symbols but keep the text italic
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>')
    
    // Remove markdown headers but keep the text larger
    text = text.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-3 mb-2">$1</h3>')
    text = text.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
    text = text.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-3">$1</h1>')
    
    // Convert bullet points to nice list items
    text = text.replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">• $1</li>')
    text = text.replace(/^• (.+)$/gm, '<li class="ml-4 mb-1">• $1</li>')
    
    // Convert numbered lists
    text = text.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 mb-1">$1</li>')
    
    // Wrap lists
    text = text.replace(/(<li.*?<\/li>\n?)+/g, '<ul class="my-2">$&</ul>')
    
    // Convert line breaks to paragraphs
    const paragraphs = text.split('\n\n').filter(p => p.trim())
    
    return paragraphs.map((para, index) => {
      // If it's already HTML, return as is
      if (para.includes('<')) {
        return para
      }
      // Otherwise wrap in paragraph
      return `<p class="mb-3 leading-relaxed">${para.replace(/\n/g, '<br/>')}</p>`
    }).join('')
  }

  const formattedContent = formatContent(content)

  return (
    <div 
      className="prose prose-sm max-w-none text-inherit"
      dangerouslySetInnerHTML={{ __html: formattedContent }}
      style={{
        lineHeight: '1.6',
      }}
    />
  )
}

export default MessageFormatter
