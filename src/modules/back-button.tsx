import { useNavigate } from "@solidjs/router";

export function BackButton() {
  const navigate = useNavigate();

  return (
      <button class="px-4 cursor-pointer" onClick={() => navigate(-1)}>
        Назад
      </button>
  
  );
}