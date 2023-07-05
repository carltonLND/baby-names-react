interface BabyNameCardProps {
  name: string;
  sex: string;
}

export function BabyNameCard({ name, sex }: BabyNameCardProps): JSX.Element {
  return <div className={`name-card sex-${sex}`}>{name}</div>;
}
