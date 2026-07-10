import { SpaceShell } from '../components/SpaceShell'
import type { PersonaId } from '../theme/personas'
import { EngineerSpace } from '../spaces/Engineer/EngineerSpace'
import { PoetSpace } from '../spaces/Poet/PoetSpace'
import { ArtistSpace } from '../spaces/Artist/ArtistSpace'
import { AudiophileSpace } from '../spaces/Audiophile/AudiophileSpace'
import { GeekSpace } from '../spaces/Geek/GeekSpace'

const SPACES: Record<PersonaId, React.ComponentType> = {
  engineer: EngineerSpace,
  poet: PoetSpace,
  artist: ArtistSpace,
  audiophile: AudiophileSpace,
  geek: GeekSpace,
}

export function SpaceRoot({ id }: { id: PersonaId }) {
  const Space = SPACES[id]
  return (
    <SpaceShell id={id} key={id}>
      <Space />
    </SpaceShell>
  )
}
