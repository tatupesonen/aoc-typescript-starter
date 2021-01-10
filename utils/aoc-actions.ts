require('dotenv').config(); //Get SESSION_COOKIE from .env
import https from 'https';
import cheerio from 'cheerio';

export const downloadInputForYearAndDay = (day: string, year: string) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'adventofcode.com',
            path: `/${year}/day/${day}/input`,
            method: 'GET',
            port: '443',
            headers: {
                'Cookie': `session=${process.env.SESSION_COOKIE}`,
            }
        }
        let data = '';
        https.get(options, (res: any) => {
            res.on('data', (dataChunk: any) => {
                data += dataChunk;
            });
            res.on('error', (err: Error) => {
                reject(err);
            });
            res.on('close', (done: any) => resolve(data))
        })
    });
}

export const getPuzzleDescription = (year: string, day: string) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'adventofcode.com',
            path: `/${year}/day/${day}`,
            method: 'GET',
            port: '443',
            headers: {
                'Cookie': `session=${process.env.SESSION_COOKIE}`,
            }
        }
        let data = '';
        https.get(options, (res: any) => {
            res.on('data', (dataChunk: any) => {
                data += dataChunk;
            });
            res.on('error', (err: Error) => {
                reject(err);
            });
            res.on('close', (done: any) => {
                //Regex to filter out <main> for us
                resolve(getReadmePage(data))
            })
        })
    });
}

export const getReadmePage = (page: any) => {
    const $ = cheerio.load(page);
    let nodes = $('.day-desc').children().toArray()
    let markdown = nodes.map(n => cheerio.html(n)).join("");
    return markdown
}
