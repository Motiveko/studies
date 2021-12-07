declare let csv: string;

function parseCSV(input: string): { [columnName: string]: string }[] {
  const lines = input.split("\n");
  const [header, ...rows] = lines;
  const headerColumns = header.split(",");

  return rows.map((rowStr) => {
    const row: { [columnName: string]: string } = {};
    rowStr.split(",").forEach((v, i) => {
      row[headerColumns[i]] = v;
    });
    return row;
  });
}

parseCSV(csv);

type Vec3D = Record<"x" | "y" | "z", number>;
const v3: Vec3D = {
  x: 1,
};
