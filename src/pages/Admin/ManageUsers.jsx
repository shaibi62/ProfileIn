import Sidebar from './Sidebar';


const ManageUsers = () => {
  const dummyUsers = [
    { id: 1, name: 'Zeeshan Ahmad', email: 'zee@example.com' },
    { id: 2, name: 'Shoaib Khan', email: 'shoaib@example.com' },
  ];

  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="ml-64 p-8 w-full">
        <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
        <table className="w-full bg-white shadow-md rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyUsers.map((user) => (
              <tr key={user.id} className="text-center border-b">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
