export default function CGVPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Conditions Générales de Vente</h1>
        
        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Objet</h2>
            <p>
              Les présentes conditions générales de vente (CGV) régissent les ventes de produits 
              proposés sur le site SurvivalGear. Toute commande implique l'acceptation sans réserve 
              de ces CGV.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Prix</h2>
            <p>
              Les prix sont indiqués en euros (€) toutes taxes comprises (TTC). Nous nous réservons 
              le droit de modifier nos prix à tout moment, mais les produits seront facturés sur la 
              base des tarifs en vigueur au moment de la validation de la commande.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Livraison</h2>
            <p>
              Les produits sont livrés à l'adresse indiquée lors de la commande. Le délai de livraison 
              moyen est de 2 semaines. Les frais de port sont les suivants:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>France: 4.99€</li>
              <li>Union Européenne: 9.99€</li>
              <li>Livraison gratuite pour toute commande supérieure à 100€</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Droit de rétractation</h2>
            <p>
              Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours à compter 
              de la réception de votre commande pour exercer votre droit de rétractation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
