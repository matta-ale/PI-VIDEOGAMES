
const apiDataFormater = (rawArray) => {
    console.log(rawArray);
    if (rawArray) {
    let platforms = []
    let genres = []
    let array = []
    rawArray.forEach((videogame) => {
      if (videogame.platforms) {
      videogame.platforms.forEach(platform => {
        platforms.push(platform.platform.name)
      })}
      if (videogame.genres) {
      videogame.genres.forEach(genre => {
        genres.push({id:genre.id,name:genre.name})
      })}
      array.push(
        {id:videogame.id,
        name:videogame.name,
        genres: genres,
        description:videogame.description?videogame.description:"",
        platforms:platforms,
        image:videogame.background_image,
        released:videogame.released,
        rating:videogame.rating}
      );
      platforms = []
      genres= []
    });
    return array
  } else {
    return []
  }
}

module.exports = apiDataFormater;