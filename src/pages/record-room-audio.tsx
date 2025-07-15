import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


type RoomParams = {
  roomId: string
}

type Chunk = {
  id: string
  transcription: string
}

export function RecordRoomAudio() {
  const navigate = useNavigate()

  const params = useParams<RoomParams>()


  const [isRecording, setIsRecording] = useState(false)
  const [transcriptions, setTranscriptions] = useState<Chunk[]>([])
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)

  async function fetchTranscriptions() {
    const res = await fetch(`https://back-end-nlwagents.onrender.com/rooms/${params.roomId}/chunks`)
    const data = await res.json()
    setTranscriptions(data.chunks)
  }

  function stopRecording() {
    setIsRecording(false)
    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    fetchTranscriptions()
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()
    formData.append('file', audio, 'audio.webm')
    await fetch(`https://back-end-nlwagents.onrender.com/rooms/${params.roomId}/audio`, {
      method: 'POST',
      body: formData,
    })
    fetchTranscriptions()
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.start()
  }

  async function startRecording() {
    if (!navigator.mediaDevices || typeof window.MediaRecorder !== 'function') {
      alert('Navegador não suporta gravação.')
      return
    }

    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({ audio: true })
    createRecorder(audio)

    intervalRef.current = setInterval(() => {
      recorder.current?.stop()
      createRecorder(audio)
    }, 5000)
  }

  useEffect(() => {
    if (params.roomId) {
      fetchTranscriptions()
    }
  }, [params.roomId])

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="relative flex h-screen flex-col items-center justify-center gap-3 px-4">

        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 size-4" />
          Voltar
        </Button>
  

      {isRecording ? (
        <Button onClick={stopRecording}>Pausar gravação</Button>
      ) : (
        <Button onClick={startRecording}>Gravar áudio</Button>
      )}

      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}

      <p className="text-center">Abaixo serão mostradas as transcrições do que você gravar por áudio, utilizando IA:</p>

      {transcriptions.length > 0 && (
        <div className="mt-4 w-full max-w-xl rounded-lg border border-gray-300 bg-gray p-4 shadow">
          <h2 className="mb-2 text-lg font-semibold text-white">Transcrições da sala:</h2>
          <ul className="flex flex-col gap-2 text-sm text-white">
            {transcriptions.map((chunk) => (
              <li key={chunk.id} className="rounded bg-gray-900 p-2 shadow-sm">
                {chunk.transcription}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
