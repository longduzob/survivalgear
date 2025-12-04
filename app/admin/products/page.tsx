import Link from "next/link";

export default function AdminProductsPage() {
  // Mock products data
  const products = [
    {
      id: "1",
      name: "Tente 2 Places Ultra-Légère Pro",
      category: "Tentes & Abris",
      price: 79.99,
      stock: 45,
      active: true,
    },
    {
      id: "2",
      name: "Sac à Dos Tactique 40L",
      category: "Sacs à Dos",
      price: 49.99,
      stock: 12,
      active: true,
    },
    {
      id: "3",
      name: "Couteau de Survie Multifonction",
      category: "Outils & Couteaux",
      price: 34.99,
      stock: 8,
      active: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Gestion des Produits</h1>
            <Link href="/admin" className="text-sm hover:underline">
              ← Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold">Tous les produits</h2>
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition">
              + Ajouter un produit
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded mr-3"></div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {product.price.toFixed(2)}€
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${product.stock < 10 ? "text-orange-600 font-medium" : "text-gray-500"}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.active 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {product.active ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-primary hover:underline">Modifier</button>
                      <button className="text-red-600 hover:underline">Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
