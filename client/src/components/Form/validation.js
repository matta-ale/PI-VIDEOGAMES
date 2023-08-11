export function validation(videogameData) {
    const errors = {}
    
    if(videogameData.name ==='') errors.name = "Name can't be empty"
    if(videogameData.name.length > 255) errors.name = "Name can't have more than 255 characters (corregir esto a menos chars)"
    
    if(videogameData.description ==='') errors.description = "Description can't be empty"
    if(videogameData.description.length < 50) errors.description = "Description must have at least 50 characters"
    
    if(videogameData.platforms.length===0) errors.platforms = "Select at least one platform"
    
    if(videogameData.genreIds.length===0) errors.genreIds = "Select at least one genre"

    if(videogameData.image ==='') errors.image = "Image can't be empty"

    if(videogameData.released ==='') errors.released = "Release date can't be empty"
    
    if(videogameData.rating === '') errors.rating = "Rating can't be empty"
    if (typeof Number(videogameData.rating) !== 'number' || Number(videogameData.rating) < 1 || Number(videogameData.rating) > 5) errors.rating = "Rating must be a number between 1 and 5";
    
        return errors
}