import { BabyNameData } from "./sortNames";

export function filterBySex(
  babyNames: BabyNameData[],
  sex: "m" | "f"
): BabyNameData[] {
  return babyNames.filter((babyName) => babyName.sex === sex);
}
