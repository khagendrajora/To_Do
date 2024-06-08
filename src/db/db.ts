import mongoose from 'mongoose'

mongoose.connect(process.env.DATABASE as string)
    .then(() => console.log('database connected'))
    .catch(err => console.log(err))

