import mongoose from 'mongoose'

async function connectDb() {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/Notes_DB`)
        console.log(`connected to database:${connection.connection.host}`)
    } catch (error) {
        console.log(`error while connecting database ${error}`)
    }
}

export default connectDb;