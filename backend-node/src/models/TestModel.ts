import connection from "./mysql";

export interface Test {
  number: number;
  string: string;
}

export const getAllTest = (): Promise<Test[]> => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM test', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
