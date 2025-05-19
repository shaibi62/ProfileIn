import Sidebar from './Sidebar';


const ManageTemplates = () => {
  const dummyTemplates = [
    { id: 1, name: 'Developer Portfolio' },
    { id: 2, name: 'Designer Showcase' },
  ];

  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="ml-64 p-8 w-full">
        <h1 className="text-2xl font-bold mb-6">Manage Templates</h1>
        <table className="w-full bg-white shadow-md rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Template Name</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyTemplates.map((template) => (
              <tr key={template.id} className="text-center border-b">
                <td className="p-3">{template.id}</td>
                <td className="p-3">{template.name}</td>
                <td className="p-3">
                  <button className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTemplates;
