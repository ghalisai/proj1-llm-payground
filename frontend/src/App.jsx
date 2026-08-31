import { useState } from 'react'

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setIsLoading] = useState(false);

  const url = import.meta.env.VITE_API_URL + '/askme';
  const headers = {
    'Content-Type': 'application/json',
  }

  async function sendQuestion() {
    console.log('sendQuestion', question);
    const ask = question.trim();
    if (!ask || loading) return;
    setIsLoading(true);
    await fetch(url, 
      {
        method: 'POST', 
        headers: headers, 
        body: JSON.stringify({question: question})}).then(res => res.json()).then(data => {
          console.log('data', data);
      setAnswer(data.answer);
      setQuestion('');
    }).catch(err => {
      setAnswer(err.message);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendQuestion();
    }
  }



  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <label
        htmlFor="story"
        className="mb-3 text-2xl font-semibold tracking-tight text-black"
      >
        LLM Playground
      </label>
      <textarea
        id="story"
        name="story"
        rows="3"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your question here"
        className="w-full max-w-xl rounded-lg border border-slate-700 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
      {answer && (
  <div className="mt-6 w-full max-w-xl text-left text-slate-800">
    <p className="mb-4 leading-relaxed">{answer}</p>
  </div>
)}

    </div>
  )
}

export default App
