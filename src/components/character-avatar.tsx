interface CharacterAvatarProps {
  class?: string;
}

export function CharacterAvatar(props: CharacterAvatarProps) {
  return (
    <img 
      src="/avatar.webp" 
      alt="Character Avatar"
      class={props.class}
    />
  );
}
