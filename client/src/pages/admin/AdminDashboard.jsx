import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <Link to="/admin/users" className="block">
            <h3 className="text-lg font-medium mb-2">User Management</h3>
            <p className="text-gray-600">View and manage all users</p>
          </Link>
        </Card>
        
        <Card>
          <Link to="/admin/reported" className="block">
            <h3 className="text-lg font-medium mb-2">Reported Content</h3>
            <p className="text-gray-600">Review reported posts</p>
          </Link>
        </Card>
        
        <Card>
          <h3 className="text-lg font-medium mb-2">System Analytics</h3>
          <p className="text-gray-600">Coming soon</p>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;