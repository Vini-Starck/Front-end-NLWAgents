import { Mic, MicOff, ArrowLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Aurora from '@/aurora/aurora'

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

  const isRecordingSupported =
    Boolean(navigator.mediaDevices) &&
    typeof navigator.mediaDevices.getUserMedia === 'function' &&
    typeof window.MediaRecorder === 'function'

  async function fetchTranscriptions() {
    const res = await fetch(
      `https://back-end-nlwagents.onrender.com/rooms/${params.roomId}/chunks`,
    )
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

    await fetch(
      `https://back-end-nlwagents.onrender.com/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      },
    )

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
    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação')
      return
    }

    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

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
    <>
      {/* Fundo animado Aurora */}
      <div className="-z-10 pointer-events-none fixed inset-0 rotate-180">
        <Aurora
          amplitude={0.3}
          blend={0.5}
          speed={0.5}
          colorStops={
            isRecording
              ? ['#c42424', '#600101', '#c42424'] // Vermelho para gravação
              : ['#3F51B5', '#00E676', '#3F51B5'] // Azul/Verde suave para pausado
          }
        />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex h-screen flex-col items-center justify-center gap-5 px-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 size-4" />
          Voltar
        </Button>

        {/* Botões e ícones de gravação */}
        <div className="flex flex-col items-center gap-2">
          {isRecording ? (
            <>
              <Mic className="mb-5 text-red-500" size={200} />
              <Button onClick={stopRecording} size="lg">
                Parar gravação
              </Button>
              <p className="text-white">Gravando...</p>
            </>
          ) : (
            <>
              <MicOff className="mb-5 text-white/70" size={200} />
              <Button onClick={startRecording} size="lg">
                Iniciar gravação
              </Button>
              <p className="text-white/70">Pausado</p>
            </>
          )}
        </div>

        {/* Transcrições */}
        <div className="text-center text-white/90 max-w-lg">
          <p className="mb-2">
            Abaixo serão mostradas as transcrições do que você gravar por áudio, utilizando IA:
          </p>

          {transcriptions.length > 0 && (
            <div className="mt-4 w-full max-w-xl rounded-lg border border-white/20 bg-white/5 p-4 shadow">
              <h2 className="mb-2 text-lg font-semibold text-white">
                Transcrições da sala:
              </h2>
              <ul className="flex flex-col gap-2 text-sm text-white/90">
                {transcriptions.map((chunk) => (
                  <li
                    key={chunk.id}
                    className="rounded bg-white/10 p-2 shadow-sm"
                  >
                    {chunk.transcription}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
