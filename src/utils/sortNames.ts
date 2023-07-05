export interface BabyNameData {
  id: number;
  name: string;
  sex: string;
}

export function sortNames(babyNameArray: BabyNameData[]): BabyNameData[] {
  return babyNameArray.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
}
