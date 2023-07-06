interface BabyNameCardProps {
  id: number;
  name: string;
  sex: string;
  onClick(): void;
}

export function BabyNameCard({
  id,
  name,
  sex,
  onClick,
}: BabyNameCardProps): JSX.Element {
  return (
    <div
      onClick={onClick}
      onKeyDown={onClick}
      tabIndex={id}
      role="button"
      className={`name-card sex-${sex}`}
    >
      {name}
    </div>
  );
}
