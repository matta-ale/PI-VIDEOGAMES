export const detailDataFormater = (data) => {
    let genreString = ''
    let platformString = ''
    
    data.Genres.forEach(genre => genreString += `${genre.name}, `)
    if(genreString.length>0) genreString = genreString.slice(0, -2);

    data.platforms.forEach(platform=> platformString += `${platform}, `)
    if(platformString.length>0) platformString = platformString.slice(0, -2);
    data.Genres = genreString
    data.platforms = platformString
    return data
}