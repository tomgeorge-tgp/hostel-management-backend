import UserRoutes from './userRoutes.js'

export default function(app)
{
    app.use('/user', UserRoutes);
   
};