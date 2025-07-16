

import { CreateRoomForm } from '@/components/create-room-form';
import HomeHeader from '@/components/home-header';
import { RoomList } from '@/components/room-list';
import Particles from '@/particles/particles';

export function CreateRoom() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <Particles
          alphaParticles={false}
          disableRotation={true}
          moveParticlesOnHover={true}
          particleBaseSize={400}
          particleColors={['#3F51B5', '#00E676']}
          particleCount={200}
          particleHoverFactor={1}
          particleSpread={8}
          sizeRandomness={1}
          speed={0.3}
        />
      </div>
      <div
        className="h-full"
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <HomeHeader />
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-8">
            <CreateRoomForm />
            <RoomList />
          </div>
        </div>
      </div>
    </div>
  );
}