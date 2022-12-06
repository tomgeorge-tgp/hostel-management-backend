import UserRoutes from './userRoutes.js'
import HostelRoutes from './hostelRoutes.js'

export default function(app)
{
    app.use('/user', UserRoutes);
    app.use('/hostel', HostelRoutes);
};