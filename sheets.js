import fs from 'fs';
import path from 'path';
import process from 'process';
import { GoogleSpreadsheet } from 'google-spreadsheet';

class Sheets {
  constructor (sheetId, gid = 0) {
    this.sheetId = sheetId;
    this.gid = gid;
    this.doc = new GoogleSpreadsheet(sheetId);
  }

  async auth() {
    const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
    const credsRaw = await fs.promises.readFile(CREDENTIALS_PATH, 'utf-8');
    const creds = JSON.parse(credsRaw);
    await this.doc.useServiceAccountAuth(creds);
  }

  async loadInfo() {
    await this.doc.loadInfo();
    this.sheet = this.doc.sheetsById[this.gid];
  }


  async getHeaders() {
    await this.sheet.loadHeaderRow();
    return this.sheet.headerValues;
  }

  async addRow(row) {
    await this.sheet.addRow(row)
  } 
}

export default Sheets;
