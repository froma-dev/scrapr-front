const {PUBLIC_SCRAPE_URL} = import.meta.env

async function scrapePdfFrom(url, params) {
    return await fetch(PUBLIC_SCRAPE_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            url,
            ...params
        })
    }).then(response => response.json())
        .then(parseScrapePdf)
        .catch(parseScrapePdfError)
}

function parseScrapePdf(data) {
    return data
}

function parseScrapePdfError(data) {
    return {title: 'no-title', list: [], error: 'error downloading parsed data'}
}

function parseScrape({title, evaluations}) {
    const parsedEvaluations = evaluations
        .filter((el, index) => index > 0)

    return {
        title,
        evaluations: parsedEvaluations
    }
}

export default {
    scrapePdfFrom
}