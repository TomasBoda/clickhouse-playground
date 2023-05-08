import fs from 'fs';
import { client } from "../index.js";

export function writeToJSON(filename, data) {
  fs.writeFile(filename, JSON.stringify(data), (error, result) => {
    if (error) {
      console.log("Error writing to " + filename);
      return;
    }

    console.log("Written to " + filename);
  });
}

export async function exec(query, log = false) {
    const start = performance.now();
  
    await client.exec({ query });
  
    const end = performance.now();
    const elapsed = (end - start).toFixed(2);
  
    if (log) console.log('Elapsed ' + elapsed + 'ms');
  
    return { elapsed };
  }
  
  export async function query(query, log = false) {
    const start = performance.now();
  
    const response = await client.query({
      query,
      format: 'JSONEachRow'
    });
  
    const end = performance.now();
    const elapsed = (end - start).toFixed(2);
  
    const result = await response.json();
  
    if (log) console.log('Elapsed ' + elapsed + 'ms');
  
    return { elapsed, total: result.length, result };
  }
  
  export async function insert(table, values, log = false) {
    const start = performance.now();
  
    await client.insert({
      table,
      values,
      format: 'JSONEachRow'
    });
  
    const end = performance.now();
    const elapsed = (end - start).toFixed(2);
  
    if (log) console.log('Elapsed ' + elapsed + 'ms');
  
    return { elapsed };
  }