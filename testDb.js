const db = require('./models')


const referenceCrud = async ()=> {
    try {

        //CREATE (associating)

        //have an instance of a user and an instance of a post(through creation or finding)
        const newFavoriteMovie = await db.FavoriteMovie.findById('64535e757bf12c96fbbf3701')
        console.log("fave movie::::", newFavoriteMovie.title)
        
        const foundUser = await db.User.findOne({name : 'test 11'})
        console.log('found User', foundUser.favorites)
        
        // const newFave = {
        //     title: 'LOTR',
        //     poster: 'www.x.com',
        //     rating: 'a'
        // }

       const push = foundUser.favorites.push(newFavoriteMovie.id)
        console.log("this is pushed:::::", push)
        await foundUser.save()
        

        //addpost to users array of post id's
        //add the user to the poster fields

        //save the user
        //save the post

        //READING( querying with relationships)

    }catch(err){
        console.log(err)
    }
}
referenceCrud()