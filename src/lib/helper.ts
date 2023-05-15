export const serialize = (payload: any) => JSON.parse(JSON.stringify(payload));

export const uploadLocation = (id: string) =>
  `${process.env.NEXTAUTH_URL}/api/v2/uploads/${id}`;

export const findPermutations = (n: number) => {
  const results: any[][] = [];

  function backtrack(permutation: any[]) {
    if (permutation.length === n) {
      results.push(permutation);
      return;
    }

    backtrack(permutation.concat("0")); // Add 0 to the permutation
    backtrack(permutation.concat("1")); // Add 1 to the permutation
  }

  backtrack([]);

  return results;
};
